---
title: "London Tube and Rail Map"
date: 2026-10-16
excerpt: "Interactive map of London's rail network, with journey times and reachable areas from any station."
thumbnail: /images/projects/london-map.jpg
language: JavaScript
link: https://timothywong731.github.io/london-map/
---

London Tube and Rail Map is an interactive web map of London's rail network. It covers the Underground, the Elizabeth line, the six Overground lines, the DLR, Trams, the IFS Cloud Cable Car and National Rail services within London, all in TfL's line colours. Fare zones, 3D buildings and animated trains can be switched on. Pick any of the roughly 700 stations, and the map shades everywhere you can reach by rail within 15, 30, 45, 60 and 90 minutes, plus up to 20 minutes on foot. The planned HS2 and West London Orbital routes are drawn too, and can be included in the journey times.

The data is prepared ahead of time by Node scripts. They read the TfL Unified API and OpenStreetMap and save the results as static JSON. Track geometry comes from OpenStreetMap route relations, matched to TfL lines by name. Lines that share track are spaced a few metres apart, so they sit side by side as on the TfL map. Fare zones are not published as shapes, so Tim derived them from station zones on a 160 m grid. He then traced smooth boundaries with d3-contour.

Journey times come from a Dijkstra search over (station, line) states, with its own binary heap. Each hop costs a dwell time plus the distance at the mode's running speed. Boarding adds a platform walk and half the typical wait between trains, so changing lines has a real cost. Stations within 500 m are linked on foot. The reachable area is a 100 m grid, warped to line up with the Web Mercator map and outlined with d3-contour.

The site is static: ES modules with no bundler, MapLibre GL JS and an OpenFreeMap basemap. A GitHub Actions workflow checks sample journeys against typical TfL Journey Planner ranges before every deploy. For example, Oxford Circus to Victoria must come out at 6 to 12 minutes.

<p class="actions">
  <a href="https://timothywong731.github.io/london-map/" class="button">Open the map</a>
  <a href="https://github.com/timothywong731/london-map" class="button button--quiet" rel="noopener">{% include icon.html name="github" %}<span>Source on GitHub</span></a>
</p>
