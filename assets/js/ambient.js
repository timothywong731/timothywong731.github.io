// Latent Drift: the ambient background. Points drift on a curl-noise field around slowly moving centroids,
// a nearest-neighbour graph re-forms every frame, and queries walk it greedily towards a target, the way a
// search moves through a vector index. Plain canvas, no dependencies. DESIGN.md has the rationale.
(function () {
  'use strict';

  var DEFAULTS = {
    density: 1.1,       // points per 10,000 CSS px² of viewport (~140 on a laptop, ~36 on a phone)
    minPoints: 28,
    maxPoints: 160,
    clusters: 5,
    spread: 0.17,       // cluster radius, as a fraction of the shorter viewport side
    neighbours: 3,      // k in the k-nearest-neighbour graph
    linkRadius: 0.11,   // longest edge, as a fraction of the viewport diagonal
    flow: 16,           // curl-noise speed, px per second
    flowScale: 0.0016,  // noise frequency per px
    flowTime: 0.035,    // how fast the field itself evolves
    cohesion: 0.22,     // pull towards a point's anchor in its cluster, per second
    longLinks: 6,       // sparse links between clusters (the "small world" layer)
    queryEvery: 3.4,    // mean seconds between queries
    hopTime: 0.3,       // seconds per hop
    trailLife: 2.6,     // seconds a lit path takes to fade
    edgeAlpha: 0.22,
    nodeAlpha: 0.45,
    longLinkAlpha: 0.1,
    signalAlpha: 0.9
  };

  // Seeded PRNG (mulberry32): the same seed always gives the same space.
  function prng(seed) {
    var a = seed >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // Improved Perlin noise in 3D, permutation shuffled by the seeded PRNG. Returns roughly -1..1.
  function perlin(rand) {
    var p = new Uint8Array(512), perm = [], i;
    for (i = 0; i < 256; i++) perm[i] = i;
    for (i = 255; i > 0; i--) { var j = Math.floor(rand() * (i + 1)), s = perm[i]; perm[i] = perm[j]; perm[j] = s; }
    for (i = 0; i < 512; i++) p[i] = perm[i & 255];
    function fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
    function lerp(a, b, t) { return a + t * (b - a); }
    function grad(h, x, y, z) {
      h &= 15;
      var u = h < 8 ? x : y, v = h < 4 ? y : (h === 12 || h === 14 ? x : z);
      return ((h & 1) ? -u : u) + ((h & 2) ? -v : v);
    }
    return function (x, y, z) {
      var X = Math.floor(x) & 255, Y = Math.floor(y) & 255, Z = Math.floor(z) & 255;
      x -= Math.floor(x); y -= Math.floor(y); z -= Math.floor(z);
      var u = fade(x), v = fade(y), w = fade(z);
      var A = p[X] + Y, AA = p[A] + Z, AB = p[A + 1] + Z, B = p[X + 1] + Y, BA = p[B] + Z, BB = p[B + 1] + Z;
      return lerp(
        lerp(lerp(grad(p[AA], x, y, z), grad(p[BA], x - 1, y, z), u), lerp(grad(p[AB], x, y - 1, z), grad(p[BB], x - 1, y - 1, z), u), v),
        lerp(lerp(grad(p[AA + 1], x, y, z - 1), grad(p[BA + 1], x - 1, y, z - 1), u), lerp(grad(p[AB + 1], x, y - 1, z - 1), grad(p[BB + 1], x - 1, y - 1, z - 1), u), v),
        w);
    };
  }

  function create(width, height, seed, overrides) {
    var P = {}, k;
    for (k in DEFAULTS) P[k] = DEFAULTS[k];
    for (k in overrides || {}) P[k] = overrides[k];

    var W, H, rand, noise, t, points, centroids, longLinks, adj, edges, queries, trails, rings, nextQuery;

    function gauss() { return (rand() + rand() + rand() - 1.5) * 1.15; }

    function reseed(s) {
      rand = prng(s);
      noise = perlin(rand);
      t = 0;
      points = []; centroids = []; queries = []; trails = []; rings = [];
      for (var c = 0; c < P.clusters; c++) {
        // Bias centroids to the right and top, where the page is quietest; the CSS mask does the rest.
        centroids.push({ bx: 0.3 + 0.68 * rand(), by: 0.04 + 0.86 * rand(), x: 0, y: 0, o: rand() * 100 });
      }
      placeCentroids();
      var n = Math.round(Math.min(P.maxPoints, Math.max(P.minPoints, W * H * P.density / 1e4)));
      var r = Math.min(W, H) * P.spread;
      for (var i = 0; i < n; i++) {
        var home = Math.floor(rand() * P.clusters), cc = centroids[home];
        // Each point keeps its own anchor offset inside the cluster, so clusters hold their shape instead of
        // collapsing onto the centroid; the curl field makes them breathe around it.
        var ox = gauss() * r, oy = gauss() * r;
        points.push({ x: cc.x + ox, y: cc.y + oy, ox: ox, oy: oy, vx: 0, vy: 0, home: home, act: 0 });
      }
      longLinks = [];
      for (var l = 0; l < P.longLinks; l++) {
        var a = Math.floor(rand() * n), b = Math.floor(rand() * n);
        if (a !== b && points[a].home !== points[b].home) longLinks.push([a, b]);
      }
      nextQuery = 1 + rand() * P.queryEvery;
      buildGraph();
    }

    function placeCentroids() {
      for (var c = 0; c < centroids.length; c++) {
        var cc = centroids[c];
        cc.x = (cc.bx + 0.14 * noise(cc.o, t * 0.02, 3.1)) * W;
        cc.y = (cc.by + 0.14 * noise(cc.o, t * 0.02, 9.7)) * H;
      }
    }

    // k-nearest-neighbour graph, rebuilt from scratch each frame.
    // ponytail: O(n²) neighbour search, fine up to maxPoints=160; use a spatial grid if that ever grows.
    function buildGraph() {
      var n = points.length, R = Math.hypot(W, H) * P.linkRadius, R2 = R * R, K = P.neighbours, i, j;
      adj = []; edges = [];
      for (i = 0; i < n; i++) adj.push([]);
      var seen = new Set();
      for (i = 0; i < n; i++) {
        var best = [], bestD = [];
        for (j = 0; j < n; j++) {
          if (i === j) continue;
          var dx = points[j].x - points[i].x, dy = points[j].y - points[i].y, d2 = dx * dx + dy * dy;
          if (d2 > R2) continue;
          if (best.length < K) { best.push(j); bestD.push(d2); }
          else {
            var worst = 0;
            for (var q = 1; q < K; q++) if (bestD[q] > bestD[worst]) worst = q;
            if (d2 < bestD[worst]) { best[worst] = j; bestD[worst] = d2; }
          }
        }
        for (var b = 0; b < best.length; b++) {
          var a1 = Math.min(i, best[b]), a2 = Math.max(i, best[b]), key = a1 * 4096 + a2;
          if (seen.has(key)) continue;
          seen.add(key);
          edges.push([a1, a2, Math.sqrt(bestD[b]) / R]);
          adj[a1].push(a2); adj[a2].push(a1);
        }
      }
      for (var l = 0; l < longLinks.length; l++) { adj[longLinks[l][0]].push(longLinks[l][1]); adj[longLinks[l][1]].push(longLinks[l][0]); }
    }

    function dist2(i, x, y) { var dx = points[i].x - x, dy = points[i].y - y; return dx * dx + dy * dy; }

    // Greedy routing: step to whichever neighbour is closest to the target; stop when none is closer.
    function nextHop(q) {
      var cur = q.at, best = -1, bestD = dist2(cur, q.tx, q.ty);
      for (var i = 0; i < adj[cur].length; i++) {
        var nb = adj[cur][i], d = dist2(nb, q.tx, q.ty);
        if (d < bestD) { bestD = d; best = nb; }
      }
      return best;
    }

    function step(dt) {
      t += dt;
      placeCentroids();
      var s = P.flowScale, z = t * P.flowTime, e = 0.5, n = points.length;
      for (var i = 0; i < n; i++) {
        var p = points[i], c = centroids[p.home];
        // Curl of a scalar noise potential: divergence-free, so points never pile into sinks.
        var dpdy = (noise(p.x * s, (p.y + e) * s, z) - noise(p.x * s, (p.y - e) * s, z)) / (2 * e * s);
        var dpdx = (noise((p.x + e) * s, p.y * s, z) - noise((p.x - e) * s, p.y * s, z)) / (2 * e * s);
        var tx = dpdy * P.flow + (c.x + p.ox - p.x) * P.cohesion;
        var ty = -dpdx * P.flow + (c.y + p.oy - p.y) * P.cohesion;
        p.vx += (tx - p.vx) * Math.min(1, dt * 1.5);
        p.vy += (ty - p.vy) * Math.min(1, dt * 1.5);
        p.x += p.vx * dt; p.y += p.vy * dt;
        p.act *= Math.exp(-dt / 1.4);
      }
      buildGraph();

      nextQuery -= dt;
      if (nextQuery <= 0 && n > 1) {
        var start = Math.floor(rand() * n);
        queries.push({ at: start, to: -1, prog: 0, tx: W * (0.1 + 0.85 * rand()), ty: H * (0.05 + 0.9 * rand()) });
        points[start].act = 1;
        nextQuery = P.queryEvery * (0.6 + 0.8 * rand());
      }
      for (var qi = queries.length - 1; qi >= 0; qi--) {
        var q = queries[qi];
        if (q.to < 0) {
          q.to = nextHop(q);
          if (q.to < 0) { rings.push({ i: q.at, age: 0 }); queries.splice(qi, 1); continue; }
        }
        q.prog += dt / P.hopTime;
        if (q.prog >= 1) {
          trails.push({ a: q.at, b: q.to, age: 0 });
          points[q.to].act = 1;
          q.at = q.to; q.to = -1; q.prog = 0;
        }
      }
      for (var ti = trails.length - 1; ti >= 0; ti--) if ((trails[ti].age += dt) > P.trailLife) trails.splice(ti, 1);
      for (var ri = rings.length - 1; ri >= 0; ri--) if ((rings[ri].age += dt) > 1.1) rings.splice(ri, 1);
    }

    function render(ctx, colours, strength) {
      var g = strength == null ? 1 : strength, i;
      ctx.clearRect(0, 0, W, H);
      ctx.lineCap = 'round';

      // Long-range links: faint arcs between clusters.
      ctx.strokeStyle = colours.ink; ctx.lineWidth = 1; ctx.globalAlpha = P.longLinkAlpha * g;
      ctx.beginPath();
      for (i = 0; i < longLinks.length; i++) {
        var a = points[longLinks[i][0]], b = points[longLinks[i][1]];
        var mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2, nx = -(b.y - a.y) * 0.18, ny = (b.x - a.x) * 0.18;
        ctx.moveTo(a.x, a.y); ctx.quadraticCurveTo(mx + nx, my + ny, b.x, b.y);
      }
      ctx.stroke();

      // Local edges, batched into four opacity bands; opacity falls with the square of length.
      for (var band = 0; band < 4; band++) {
        ctx.globalAlpha = P.edgeAlpha * g * Math.pow(1 - band / 4 - 0.125, 2);
        ctx.beginPath();
        for (i = 0; i < edges.length; i++) {
          if (Math.min(3, Math.floor(edges[i][2] * 4)) !== band) continue;
          var p1 = points[edges[i][0]], p2 = points[edges[i][1]];
          ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y);
        }
        ctx.stroke();
      }

      // Nodes, brightened briefly when a query passes through.
      ctx.fillStyle = colours.ink;
      for (i = 0; i < points.length; i++) {
        var p = points[i];
        ctx.globalAlpha = (P.nodeAlpha + 0.4 * p.act) * g;
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.3 + 1.2 * p.act, 0, 6.2832); ctx.fill();
      }

      // Signal: lit paths, travelling pulses and arrival rings, the only use of the accent colour.
      ctx.strokeStyle = colours.signal; ctx.fillStyle = colours.signal; ctx.lineWidth = 1.25;
      for (i = 0; i < trails.length; i++) {
        var tr = trails[i], ta = points[tr.a], tb = points[tr.b];
        ctx.globalAlpha = 0.6 * P.signalAlpha * g * Math.pow(1 - tr.age / P.trailLife, 1.6);
        ctx.beginPath(); ctx.moveTo(ta.x, ta.y); ctx.lineTo(tb.x, tb.y); ctx.stroke();
      }
      for (i = 0; i < queries.length; i++) {
        var q = queries[i];
        if (q.to < 0) continue;
        var qa = points[q.at], qb = points[q.to], f = q.prog * q.prog * (3 - 2 * q.prog);
        var x = qa.x + (qb.x - qa.x) * f, y = qa.y + (qb.y - qa.y) * f;
        ctx.globalAlpha = 0.6 * P.signalAlpha * g;
        ctx.beginPath(); ctx.moveTo(qa.x, qa.y); ctx.lineTo(x, y); ctx.stroke();
        ctx.globalAlpha = 0.16 * P.signalAlpha * g;
        ctx.beginPath(); ctx.arc(x, y, 6, 0, 6.2832); ctx.fill();
        ctx.globalAlpha = P.signalAlpha * g;
        ctx.beginPath(); ctx.arc(x, y, 2.2, 0, 6.2832); ctx.fill();
      }
      for (i = 0; i < rings.length; i++) {
        var rg = rings[i], rp = points[rg.i], k2 = rg.age / 1.1;
        ctx.globalAlpha = 0.7 * P.signalAlpha * g * (1 - k2);
        ctx.beginPath(); ctx.arc(rp.x, rp.y, 3 + 15 * (1 - Math.pow(1 - k2, 3)), 0, 6.2832); ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }

    function resize(w, h) {
      if (W && H) for (var i = 0; i < points.length; i++) {
        var sx = w / W, sy = h / H, pt = points[i];
        pt.x *= sx; pt.y *= sy; pt.ox *= sx; pt.oy *= sy;
      }
      W = w; H = h;
      if (centroids) { placeCentroids(); buildGraph(); }
    }

    W = width; H = height;
    reseed(seed);
    return { step: step, render: render, resize: resize, reseed: reseed, params: P };
  }

  window.LatentDrift = { create: create, DEFAULTS: DEFAULTS };

  // ---- Mount as the page background ------------------------------------------------------------------
  if (window.LATENT_DRIFT_NO_MOUNT) return;

  function mount() {
    var canvas = document.createElement('canvas');
    canvas.className = 'ambient';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.prepend(canvas);
    var ctx = canvas.getContext('2d');
    if (!ctx) return;

    var root = document.documentElement;
    var still = matchMedia('(prefers-reduced-motion: reduce)');
    var dark = matchMedia('(prefers-color-scheme: dark)');
    var saveData = navigator.connection && navigator.connection.saveData;

    // Every page gets its own space, the same one on every visit: base seed 731, mixed with the path.
    var seed = 731;
    for (var i = 0; i < location.pathname.length; i++) seed = Math.imul(seed ^ location.pathname.charCodeAt(i), 2654435761);

    var w = innerWidth, h = innerHeight, dpr = Math.min(devicePixelRatio || 1, 2);
    var engine = window.LatentDrift.create(w, h, seed);
    var colours, strength;

    function readColours() {
      var cs = getComputedStyle(root);
      colours = { ink: cs.getPropertyValue('--ink').trim() || '#16213D', signal: cs.getPropertyValue('--data').trim() || '#2A78D6' };
      strength = parseFloat(cs.getPropertyValue('--ambient-strength')) || 1;
    }

    function size() {
      w = innerWidth; h = innerHeight; dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      engine.resize(w, h);
    }

    function paint() {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      engine.render(ctx, colours, strength);
    }

    // Reduced motion or Save-Data: let the system settle off-screen, then show one still frame.
    function settle() {
      for (var s = 0; s < 240; s++) engine.step(1 / 30);
      paint();
    }

    var last = 0, raf = 0;
    function frame(now) {
      raf = requestAnimationFrame(frame);
      if (now - last < 1000 / 30) return;          // 30 fps is plenty for drift and keeps laptops cool
      engine.step(Math.min(0.1, (now - (last || now)) / 1000) || 1 / 30);
      last = now;
      paint();
    }

    function start() {
      cancelAnimationFrame(raf);
      if (still.matches || saveData) settle();
      else { last = 0; raf = requestAnimationFrame(frame); }
    }

    readColours(); size(); start();

    var resizeTimer;
    addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () { size(); if (still.matches || saveData) paint(); }, 150);
    });
    // Theme changes swap ink and signal colours without restarting the simulation.
    new MutationObserver(function () { readColours(); paint(); }).observe(root, { attributes: true, attributeFilter: ['data-theme'] });
    dark.addEventListener('change', function () { readColours(); paint(); });
    still.addEventListener('change', start);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
