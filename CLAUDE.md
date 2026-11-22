# Repository guidance

Timothy Wong's personal Jekyll portfolio uses the Academic Pages template. Read `README.md` for the content model and build commands, and `DESIGN.md` for the current presentation.

- Preserve factual content, collections, permalinks, redirects, `social.links`, search verification and existing assets.
- All eight visible profile links come from `social.links` in `_config.yml`; the same list feeds JSON-LD.
- The original uploaded photo is `images/photo.png`; display cropping lives in `assets/css/portfolio.css`.
- Template presentation is in `_includes`, `_layouts`, `_sass` and `assets/css/main.scss`. Keep the five documented Ruby Sass compatibility adaptations until moving off the GitHub Pages branch builder.
- Retained collection metadata is rendered by `entry-facts.html` and `work-meta.html`. `work.html` lists entries newest first without year headings: citations for talks, publications and patents, titles only for tutorials and courses. Project descriptions and buttons remain in their original content files.
- `assets/js/main.min.js` is the committed upstream module bundle; maintain it alongside its source files. Gallery behaviour is in `assets/js/gallery.js`.
- No test suite or dependency installation is required for a content-only edit. Build with Jekyll and verify affected pages, links, mobile navigation, light/dark themes, horizontal overflow and accessibility.
- Work on `feature/*` branches and land through a GitHub PR with a merge commit. Push and merge when authorized by the user's task.
