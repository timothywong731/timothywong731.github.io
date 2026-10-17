# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Timothy Wong's personal site, https://timothywong731.github.io. Jekyll 3.10 through the `github-pages` gem, built and deployed by GitHub Pages on every push to `master`; there is no Actions workflow of our own. The repo began as an academicpages / Minimal Mistakes fork but has been fully redesigned: `README.md` and most of the commented keys in `_config.yml` are upstream template leftovers, not a description of the current site.

## Commands

There is no local Ruby. Development runs in a Docker container named `tw-site` that mounts the repo:

```sh
# first time (gems are cached in the tw-gems volume)
docker run -d --name tw-site -p 4000:4000 -p 35729:35729 \
  -v "$PWD":/srv/site -v tw-gems:/usr/local/bundle -w /srv/site ruby:3.3 \
  bash -c "bundle install --quiet && bundle exec jekyll serve --host 0.0.0.0 --config _config.yml,_config.dev.yml --destination /tmp/_site --force_polling --livereload"

docker start tw-site      # afterwards; serves http://localhost:4000 with livereload
```

Production build check (run inside the container; a fresh container lacks the gems):

```sh
docker exec -e JEKYLL_ENV=production tw-site bash -c "cd /srv/site && bundle exec jekyll build -s /srv/site -d /tmp/prod --quiet"
```

Lint the design system after editing `DESIGN.md` (expect 0 errors, 0 warnings):

```sh
npx -y -p @google/design.md designmd lint DESIGN.md
```

There are no automated tests. Changes are verified in a browser: run axe-core (4.10.2 from cdnjs) on the affected pages in both light and dark themes, check a 412×915 viewport (Pixel) for horizontal scroll, and check desktop at 1280×800. Browser screenshots go in `.playwright-mcp/`, which is gitignored.

## Architecture

**Design system.** `DESIGN.md` is the source of truth for colours, type, spacing, components and the ambient background. Change a value there first, then mirror it in `assets/css/site.css`. Its Do's and Don'ts (sentence case, metadata written as prose, no all-caps labels, one primary button per group, 44px targets, light and dark designed together) apply to every UI change.

**Styling and scripts are plain files.** There is no Sass or bundler. `_includes/head.html` loads `site.css`, `site.js` and `ambient.js` with `?v=<build time>` so each deploy busts caches.
- `site.css` tokens: light values on `:root`, and dark values twice, once under `@media (prefers-color-scheme: dark)` as `:root:not([data-theme="light"])` and again as `:root[data-theme="dark"]`. Edit both dark blocks together.
- The `theme-color` metas in `head.html` are hard-coded to the paper colours; `site.js` rewrites them from `--paper` when the theme toggles. Keep them in step with the tokens.
- `head.html` also has an inline script that applies the saved theme (`localStorage.theme`) before first paint.
- `ambient.js` is the "Latent Drift" canvas behind every page. It reads `--ink`, `--data`, `--glow`, `--ambient-strength` and `color-scheme` from CSS, exposes `window.LatentDrift`, and also paints the covers for project tiles without a thumbnail (`canvas.tile__art`). Setting `window.LATENT_DRIFT_NO_MOUNT` before it loads skips the page background.

**Content model.** Each kind of work is a Jekyll collection (`_talks`, `_publications`, `_patents`, `_tutorials`, `_teaching`, `_projects`), registered in `_config.yml` with layout defaults. `_data/navigation.yml` ties them together: a nav item with `collection` and `singular` makes that collection a "kind of work".
- Section pages (`_pages/talks.html` and siblings) use the `archive` layout and `{% include work.html only="<collection>" %}`, which groups items by year. The one-line metadata under each item comes from `_includes/work-meta.html`, which switches on the collection and reads `type`, `venue`, `location` or `filedref`.
- Item pages use the `single` layout (`talk` is a pass-through to it). When a page's collection matches a nav item, it gets the "All talks" back link, `_includes/entry-facts.html` and share buttons. A `citation` front-matter field adds the citation block, and `paperurl` adds "Read the paper".
- Patents need `date:` equal to `fileddate` so they sort correctly.
- Projects are tiles on `_pages/projects.html`, newest first. Front matter is `title`, `date`, `excerpt`, `language`, plus an optional `link` (the tile goes off-site) and an optional `thumbnail` (960×600 JPEG in `images/projects/`).
- The home page is `_pages/about.md` (`permalink: /`, `layout: home`): the introduction only. New content gets its own page in the nav, not a home-page section.
- Gallery photos are listed in `_data/gallery.yml`, with thumbnails in `images/gallery/thumbs/`.
- Profile links come from `social.links` in `_config.yml`, which also feeds the JSON-LD `sameAs`. `author.bio` is the one-liner in the author card.

**SEO and machine-readable output.** `_includes/seo.html` renders titles, Open Graph and JSON-LD. A page's `seo_title` replaces the whole `<title>`, and `og_image` overrides the share image. `llms.txt` is a Liquid template that lists the collections; update it when adding a new kind of work.

**Excluded leftovers.** `_posts`, `_drafts`, `markdown_generator/`, `talkmap*` and the demo pages listed under `exclude` in `_config.yml` are not built.

## Workflow

Work happens on `feature/*` branches and lands on `master` through a GitHub PR merged with a merge commit; the Pages deploy follows automatically. Push, open PRs and merge only when the user asks.
