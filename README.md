# Timothy Wong's portfolio

Personal portfolio at <https://timothywong731.github.io/>, using the [Academic Pages](https://github.com/academicpages/academicpages.github.io) template.

The presentation was migrated from upstream commit `c433dbd4f9f8295b9c010e33d764699220abf83b`. Existing biography, talks, publications, patents, tutorials, projects, teaching, gallery data, URLs and assets are retained. `images/photo.png` is the original uploaded profile photograph; CSS crops its display without modifying the file.

## Content

- `_pages/about.md`: biography and home page.
- `_talks`, `_publications`, `_patents`, `_tutorials`, `_projects`, `_teaching`: work entries.
- `_data/navigation.yml`: section navigation.
- `_data/gallery.yml`: gallery photographs and captions.
- `_config.yml`: site identity, collections, search metadata and social profiles. `social.links` supplies the visible profile links and JSON-LD.

## Build and deployment

GitHub Pages builds `master` from the repository root with its existing branch builder and `github-pages` gem. No custom Actions workflow or Node installation is required. Work is committed on `feature/*` branches and merged into `master` through a pull request.

With the existing Ruby dependencies available:

```sh
bundle exec jekyll build --safe
ruby scripts/check_site.rb
bundle exec jekyll serve --config _config.yml,_config.dev.yml
```

The imported Sass uses equivalent Ruby Sass division in five files for compatibility with the Pages builder. `assets/js/main.min.js` contains the upstream navigation, main and theme modules concatenated in that order, with accessible disclosure state added. If changing those sources, update this deployed bundle too. Despite its upstream filename, the committed bundle is not minified.

`assets/css/portfolio.css` adapts the retained collection views, project links and gallery to the template. `assets/js/gallery.js` retains the gallery dialog, keyboard and swipe controls. The former `site.css`, `site.js` and `ambient.js` remain in the repository as legacy assets and are not loaded.

Demo pages, draft posts and sample files remain excluded. The original SEO include, search verification, canonical URLs, redirects, social metadata and favicons are retained.

Academic Pages derives from Minimal Mistakes, copyright 2016 Michael Rose, under the MIT license; see `LICENSE`. Imported Font Awesome assets retain their upstream license notices.
