---
version: alpha
name: Timothy Wong
description: Personal portfolio of a data science, machine learning and AI engineering professional. Navy ink on cool paper, one typeface with a variable width axis, and a home page that is an introduction and nothing more.
colors:
  primary: "#16213D"
  paper: "#F6F7F9"
  surface: "#FFFFFF"
  ink: "#16213D"
  ink-2: "#46506A"
  muted: "#5D6680"
  rule: "#DCE0E7"
  rule-strong: "#C3C9D5"
  data: "#2A78D6"
  paper-dark: "#0E1424"
  surface-dark: "#151C2F"
  ink-dark: "#E9ECF3"
  ink-2-dark: "#B9C1D2"
  muted-dark: "#929CB2"
  rule-dark: "#2A3450"
  rule-strong-dark: "#3B4766"
  data-dark: "#3987E5"
typography:
  display:
    fontFamily: Archivo
    fontSize: 5.25rem
    fontWeight: 720
    lineHeight: 0.95
    letterSpacing: -0.035em
    fontVariation: '"wdth" 125'
  page-title:
    fontFamily: Archivo
    fontSize: 4.25rem
    fontWeight: 700
    lineHeight: 1
    letterSpacing: -0.03em
    fontVariation: '"wdth" 112'
  entry-title:
    fontFamily: Archivo
    fontSize: 3.25rem
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: -0.03em
    fontVariation: '"wdth" 112'
  heading:
    fontFamily: Archivo
    fontSize: 1.625rem
    fontWeight: 650
    lineHeight: 1.15
  tagline:
    fontFamily: Archivo
    fontSize: 1.625rem
    fontWeight: 450
    lineHeight: 1.3
  item-title:
    fontFamily: Archivo
    fontSize: 1.125rem
    fontWeight: 600
    lineHeight: 1.35
  body:
    fontFamily: Archivo
    fontSize: 1.0625rem
    fontWeight: 400
    lineHeight: 1.6
  small:
    fontFamily: Archivo
    fontSize: 0.875rem
    fontWeight: 500
    lineHeight: 1.5
  caption:
    fontFamily: Archivo
    fontSize: 0.8125rem
    fontWeight: 500
    lineHeight: 1.35
    fontFeature: '"tnum"'
rounded:
  s: 4px
  control: 6px
  m: 8px
  icon: 112px
  full: 9999px
spacing:
  "1": 4px
  "2": 8px
  "3": 12px
  "4": 16px
  "5": 24px
  "6": 32px
  "7": 48px
  "8": 72px
  "9": 104px
  gutter: 40px
  wrap: 1184px
components:
  page:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
  page-dark:
    backgroundColor: "{colors.paper-dark}"
    textColor: "{colors.ink-dark}"
  secondary-text:
    textColor: "{colors.ink-2}"
  secondary-text-dark:
    textColor: "{colors.ink-2-dark}"
  metadata:
    textColor: "{colors.muted}"
    typography: "{typography.small}"
  metadata-dark:
    textColor: "{colors.muted-dark}"
  divider:
    backgroundColor: "{colors.rule}"
    height: 1px
  divider-dark:
    backgroundColor: "{colors.rule-dark}"
    height: 1px
  control-border:
    backgroundColor: "{colors.rule-strong}"
    width: 1px
  control-border-dark:
    backgroundColor: "{colors.rule-strong-dark}"
    width: 1px
  focus-ring:
    backgroundColor: "{colors.data}"
    width: 2px
  focus-ring-dark:
    backgroundColor: "{colors.data-dark}"
    width: 2px
  code-block:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.s}"
    padding: 16px
  code-block-dark:
    backgroundColor: "{colors.surface-dark}"
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.small}"
    rounded: "{rounded.control}"
    padding: 10px 18px
    height: 44px
  button-primary-hover:
    backgroundColor: "{colors.ink-2}"
    textColor: "{colors.paper}"
  button-quiet:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.small}"
    rounded: "{rounded.control}"
    padding: 10px 18px
    height: 44px
  photo:
    rounded: "{rounded.s}"
  portrait:
    rounded: "{rounded.m}"
  author-photo:
    rounded: "{rounded.full}"
    size: 128px
  site-icon:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.paper}"
    rounded: "{rounded.icon}"
    size: 512px
---

# Timothy Wong design system

The site's styles live in `assets/css/site.css`, and its tokens are CSS custom properties at the top of that file. This document is the source of truth for those values. Change a value here first, then mirror it in the CSS.

## Overview

The site is a portfolio for IT professionals who arrive by searching Timothy's name or a topic he has worked on. In ten seconds a visitor should know who he is and what he does ("Data science, machine learning and AI engineering."), and have an obvious next step.

The home page is deliberately just an introduction: name, tagline, bio, two calls to action (talks and publications), profile links and a portrait. Everything else is one click away in the navigation.

The personality is that of a Chartered Statistician and Chartered Engineer: exact, calm and quietly confident. Nothing is decorated. Two choices give the site its voice:

- **One typeface, two widths.** Archivo's width axis runs from 62% to 125%. The name and page titles use the expanded cut (112% to 125%), which reads as engineered and confident. Body text uses the normal width.
- **Navy ink.** The text colour is taken from the navy suit in Timothy's portrait, not a generic near-black, so the site and the photo belong together. The site icon uses the same navy.

## Colors

The palette is neutral surfaces, navy ink and a single blue for links and focus. Light and dark themes are designed as a pair: the dark values are chosen for the dark surface and checked against it, not inverted.

- **Paper (#F6F7F9 / #0E1424):** the page background. Light is a cool, barely-grey white. Dark is a deep night navy.
- **Surface (#FFFFFF / #151C2F):** code blocks. It is used sparingly, because the site has no cards.
- **Ink / primary (#16213D / #E9ECF3):** headings, body text and primary buttons. It reaches 14.9:1 on paper.
- **Ink 2 (#46506A / #B9C1D2):** the tagline, secondary copy and navigation (7.5:1).
- **Muted (#5D6680 / #929CB2):** metadata, captions and the footer line. At 5.3:1 it still passes AA for small text.
- **Rule (#DCE0E7 / #2A3450) and Rule strong (#C3C9D5 / #3B4766):** hairlines between rows and quiet button borders.
- **Data (#2A78D6 / #3987E5):** the only hue. It marks link underlines, the current-page underline, focus rings and the travelling queries in the ambient background. It is never used for body text or as a button fill: white on data is 4.4:1, below AA.

## Typography

Archivo (Google Fonts, variable: `wdth` 62–125, `wght` 100–900) is the only typeface. Monospace appears only inside code blocks.

- **Display:** the name on the home page, at 125% width and weight 720, set tight (-0.035em, line-height 0.95). It sizes fluidly from 2.75rem to 5.25rem.
- **Page title:** section and page H1s, at 112% width and weight 700. They share their row with the author card, so they top out at 4.25rem, one step below the home display size (2.5rem to 4.25rem).
- **Entry title:** H1s for talks, papers and patents, whose titles are long. These are one step down (2rem to 3.25rem) and capped at 24ch.
- **Tagline:** 1.625rem, weight 450, in Ink 2.
- **Body:** 17px, line-height 1.6. Prose measure is capped at 66ch, and the home bio at 62ch.
- **Small and caption:** metadata, buttons and fact labels, at 14px and 13px.

Sentence case everywhere. No all-caps labels, no letter-spaced eyebrows above headings.

## Layout

- **Container:** max 74rem (1184px), with gutters that scale from 16px to 40px (`clamp(1rem, 4vw, 2.5rem)`).
- **Alignment:** everything is left-aligned to a single edge. Nothing is centred except the lightbox caption.
- **Rhythm:** spacing comes from a 4px-based scale (4, 8, 12, 16, 24, 32, 48, 72, 104). The footer sits 104px below content.
- **Home:** from 64rem up, the introduction and a 17rem portrait sit side by side, vertically centred, and fill the first screen. Below 64rem the portrait shrinks to a 7rem square above the name.
- **Inner pages:** from 64rem up, a 13rem author card column sits to the left of the content, 72px apart, and stays in view as you scroll. Below 64rem the card becomes a one-row strip above the page title.
- **Section pages:** an 8.5rem year column beside the list of items. Below 48rem the year sits above its items.
- **Breakpoints:** 48rem (year groups stack, phone hero, two-column gallery) and 64rem (two-column hero, author card column, inline nav instead of the menu button, static header).

```
┌ Timothy Wong ──── Talks Publications Patents Tutorials Project Teaching Gallery ◐ ┐
│                                                                                     │
│  Timothy Wong                                                     ┌──────────┐      │
│  Data science, machine learning and AI engineering.               │          │      │
│                                                                   │ portrait │      │
│  Bio paragraph (62ch)                                             │          │      │
│                                                                   └──────────┘      │
│  [ View talks ]  [ View publications ]                                              │
│  LinkedIn  GitHub  Hugging Face  ORCID  X  Ollama                                   │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  © 2026 Timothy Wong   Sitemap   llms.txt                                           │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

## Elevation & Depth

The site is flat. Hierarchy comes from type size, width and weight, and from hairline rules. There are no drop shadows and no cards. There are two layers besides the page itself:

- **Below:** the ambient background, a fixed full-screen canvas at `z-index: -1` behind all content.
- **Above:** the gallery lightbox, a native `<dialog>` over a 92% navy scrim.

## Shapes

Corner radius encodes what a thing is, not a single house radius:

- **4px:** photos and code blocks.
- **6px:** buttons and icon buttons.
- **8px:** the home page portrait.
- **Circle:** the author card photo.
- **22% (112px on the 512px grid):** the site icon.

## Components

- **Header:** the name on the left, the nav on the right, then the theme toggle. The menu order is set in `_data/navigation.yml`: Talks, Publications, Patents, Tutorials, Projects, Teaching, Gallery. The current section is underlined in data blue, 2px. Below 64rem the nav collapses behind a "Menu" button that swaps to a close icon.
- **Calls to action:** "View talks" (primary) and "View publications" (quiet) on the home page. Use one primary button per group. Buttons are at least 44px tall.
- **Profile links:** an icon plus a text label, from `site.social.links` in `_config.yml`. The same list feeds the JSON-LD `sameAs`. Brand marks are from Simple Icons (CC0), rendered in the current text colour. They appear on the home page and in the footer of every other page.
- **Author card:** on every page except home: a circle-cropped photo (8rem on desktop, 3.5rem on phones), the name linking home, and the one-liner from `site.author.bio` in `_config.yml`. It keeps the person in view on deep pages that visitors reach straight from search.
- **Footer:** the copyright line plus links to the sitemap and `llms.txt`. On inner pages it also has the profile links.
- **Work list (section pages):** grouped by year. Each item has a title link plus one line of prose metadata ("Talk at EARL 2024, Brighton, United Kingdom"), never fragments joined by separators.
- **Project tiles (`/projects/`):** a grid of tiles, newest first, three across on desktop and one on phones (`minmax(14rem, 1fr)`). Each tile has a 16:10 picture with an 8px radius and a 1px rule border, then the title, a one-sentence summary from `excerpt`, and "year, language" in muted text. The whole tile is one link. A tile whose project has a `link` goes straight there and carries an outbound arrow plus hidden "(external site)" text. Without a `link`, it opens the project's own page. A project without a `thumbnail` gets a cover: a still frame of Latent Drift seeded by its title, in paper ink on a navy gradient, with the title set in display type. It is navy in both themes.
- **Entry facts:** a definition list (Date, Format, Venue, Location, Built with, or Filed and Reference for patents) under the title of every talk, paper, patent, tutorial and teaching page.
- **Citation:** on papers, with "Copy citation" (primary) and "Read the paper" (quiet).
- **Share:** LinkedIn, X and "Copy link".
- **Gallery:** a responsive grid of 3:4 thumbnails, each linking to the full-size image. With JavaScript, a `<dialog>` lightbox adds previous and next buttons, arrow keys and an "n of 11" count.
- **Theme toggle:** follows the OS until the visitor picks a theme, then remembers it in `localStorage`. A script in `<head>` applies the choice before first paint.

### Site icon

A "TW" monogram: Archivo at 125% width and weight 700, tracked -0.02em, in paper on a navy rounded square (22% radius). The letters fill 74% of the width so they stay legible at 16px. The files:

- **`images/favicon.svg`:** the primary icon. In dark mode it inverts to navy letters on paper.
- **`favicon.ico`:** at the site root, with 16, 32 and 48px sizes for crawlers and older browsers.
- **`images/favicon-96x96.png`:** Google prefers icons in multiples of 48px.
- **`images/apple-touch-icon.png`:** 180px, full-bleed, because iOS applies its own mask.
- **`images/icon-192.png` and `images/icon-512.png`:** referenced from `images/manifest.json`.

The glyph outlines come from the Google Fonts subset `css2?family=Archivo:wdth,wght@125,700&text=TW`. To change the icon, regenerate every size from that subset so they stay identical.

### Ambient background: Latent Drift

`assets/js/ambient.js` draws a quiet generative field behind every page. It has no dependencies, costs about 0.2ms of script per frame, and runs at 30fps.

- **What it is:** points drift through a divergence-free curl-noise field, anchored loosely to five slowly wandering cluster centres. A k-nearest-neighbour graph (k = 3) is rebuilt every frame, with edge opacity falling with the square of length, plus a few long-range arcs between clusters. Every few seconds a query starts at a random node and walks the graph greedily towards a target, stopping at a local optimum, the way a search moves through a vector index such as HNSW. Its path lights up in data blue and fades, and arrival releases one ring.
- **Colour:** the graph uses `--ink` and the queries use `--data`, read from CSS so the theme toggle repaints it instantly. `--ambient-strength` (1 light, 1.1 dark) scales all opacities.
- **Restraint:** a CSS radial mask keeps it strongest at the top right and fades it to about 16% behind the reading column on the left. Cluster centres are biased to the right for the same reason. It is `aria-hidden`, ignores the pointer, and is hidden in print.
- **Determinism:** each page has its own seed (731 mixed with the URL path), so a page looks the same on every visit, but pages differ from each other.
- **Accessibility and cost:** with `prefers-reduced-motion` or Save-Data, the system settles off-screen and paints one still frame. The browser pauses it in background tabs. The device pixel ratio is capped at 2.
- **Tuning:** all constants are in `DEFAULTS` at the top of the file. The full philosophy and a seed-explorer viewer were produced with the algorithmic-art skill. If you rebuild the viewer, inline this file so both run the same algorithm.

### Phones and touch

The site is checked at 412×915, the CSS viewport of a Google Pixel 7 or 8, as well as at 375px and on desktop.

- **Home first screen:** on phones the hero tightens (5.5rem portrait, smaller gaps, a 1.375rem tagline), so the photo, name, tagline, bio, both buttons and every profile link fit on one 915px-tall screen. The two buttons share the row equally.
- **Header:** below 64rem it is sticky on a translucent, blurred paper background. It slides away while you scroll down and returns on any scroll up, or whenever focus is inside it, and stays put while the menu is open. Android has no tap-the-status-bar-to-top gesture, so this keeps navigation one flick away.
- **Tap targets:** at least 48px for every control on coarse pointers (Android's 48dp guideline), and 44px elsewhere. This covers the header name, back links, profile links, share buttons and footer links. Each item in a work list is tappable across its whole row via a stretched link on the title.
- **Feedback:** no grey Android tap flash. Buttons scale to 97% while pressed, and work-list rows get a wash. Hover-only effects such as the gallery zoom are limited to `(hover: hover)` so they don't stick after a tap.
- **Gallery:** two columns below 48rem, with captions clamped to three lines (the viewer shows them in full). In the viewer you swipe left or right to change photo and down to close, pinch-zoom still works, and the page behind is scroll-locked.
- **Ambient background:** 60% strength below 768px, where text spans the full width. The canvas is 100vh, the large viewport, so the Chrome address bar showing or hiding never resizes it.
- **Android Chrome:** the `theme-color` metas follow the theme toggle, so the address bar matches the page. The manifest includes a maskable 512px icon, full-bleed navy with TW inside the 80% safe zone, for adaptive home-screen icons.
- **Long text:** paragraphs and citations use `overflow-wrap: break-word`, so long URLs never widen the page.

### Motion

Apart from the ambient background, motion only answers an action: hover colours, the menu opening, and the "Copied" state on copy buttons, all 120–200ms. Nothing animates on scroll. `prefers-reduced-motion` turns all of it off, and the background becomes a still frame.

### Content and data

- Navigation order and the kinds of work: `_data/navigation.yml`.
- Gallery photos: `_data/gallery.yml`. Thumbnails in `images/gallery/thumbs/` have their shorter side at 800px, JPEG quality 78.
- Patents need a `date:` equal to their `fileddate` so they sort correctly.
- Projects: one markdown file each in `_projects/`, with `title`, `date` (when it started), `excerpt`, `language`, an optional `link` (where the tile goes) and an optional `thumbnail`. Thumbnails live in `images/projects/` at 960×600, JPEG quality 82. Every project also gets its own page with the full write-up, which `llms.txt` links to.

## Do's and Don'ts

- Do keep the author card's one-liner to a single sentence. Edit it in `_config.yml` (`author.bio`), not in the template.
- Do keep the home page to the introduction. New content goes on its own page, linked from the nav.
- Do write metadata as a sentence ("Paper in arXiv pre-print (cs.AI)"), not as fragments joined with dots or dashes.
- Do keep every interactive target at least 44 by 44px, with a visible 2px data-blue focus ring.
- Do design light and dark together, and check both with axe.
- Don't add a second accent colour, gradients, cards or drop shadows.
- Don't use emoji as icons. Use `{% include icon.html name="…" %}`.
- Don't put labels in all caps, add eyebrows above headings, or append arrows to link text.
- Don't number things that aren't a sequence.
- Don't add load-time or scroll-triggered animation. The ambient background is the only motion that isn't a response to an action.
- Don't raise the ambient background's opacity until it competes with text. It should be noticed on the second look, not the first.
