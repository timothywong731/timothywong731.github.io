---
version: alpha
name: Timothy Wong
description: Personal portfolio of a data science, machine learning and AI engineering professional. Navy ink on cool paper, one typeface with a variable width axis, and a timeline of work as the signature element.
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
    fontSize: 5.25rem
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
  section-title:
    fontFamily: Archivo
    fontSize: 2.25rem
    fontWeight: 650
    lineHeight: 1.15
    letterSpacing: -0.02em
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
  pill: 999px
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
  chip-dark:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.ink-dark}"
  timeline-mark-dark:
    backgroundColor: "{colors.data-dark}"
    size: 11px
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
  chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.small}"
    rounded: "{rounded.pill}"
    padding: 0 16px
    height: 44px
  chip-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  timeline-mark:
    backgroundColor: "{colors.data}"
    size: 11px
  timeline-tooltip:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.caption}"
    rounded: "{rounded.control}"
    padding: 8px 12px
  photo:
    rounded: "{rounded.s}"
  portrait:
    rounded: "{rounded.m}"
---

# Timothy Wong design system

The site's styles live in `assets/css/site.css`, and its tokens are CSS custom properties at the top of that file. This document is the source of truth for those values. Change a value here first, then mirror it in the CSS.

## Overview

The site is a portfolio for IT professionals who arrive by searching Timothy's name or a topic he has worked on. In ten seconds a visitor should know who he is, what he does ("Data science, machine learning and AI engineering."), and that there is a decade of evidence behind it.

The personality is that of a Chartered Statistician and Chartered Engineer: exact, calm and quietly confident. Nothing is decorated. The one expressive moment is the **work timeline** on the home page, a strip plot of every talk, paper, patent, tutorial and teaching session since 2016. It is real data, drawn the way a statistician would draw it, and it doubles as the filter for the list below it.

Two choices give the site its voice:

- **One typeface, two widths.** Archivo's width axis runs from 62% to 125%. Headings use the expanded cut (112% to 125%), which reads as engineered and confident. Body text uses the normal width.
- **Navy ink.** The text colour is taken from the navy suit in Timothy's portrait, not a generic near-black, so the site and the photo belong together.

## Colors

The palette is neutral surfaces, navy ink and a single data blue. Light and dark themes are designed as a pair: the dark values are chosen for the dark surface and validated against it, not inverted.

- **Paper (#F6F7F9 / #0E1424):** the page background. Light is a cool, barely-grey white. Dark is the deep night navy of the TIM-360M artwork.
- **Surface (#FFFFFF / #151C2F):** raised controls such as filter chips. It is used sparingly, because the site has no cards.
- **Ink / primary (#16213D / #E9ECF3):** headings, body text, primary buttons and selected chips. It reaches 14.9:1 on paper.
- **Ink 2 (#46506A / #B9C1D2):** taglines, secondary copy and navigation (7.5:1).
- **Muted (#5D6680 / #929CB2):** metadata, captions and axis labels. At 5.3:1 it still passes AA for small text.
- **Rule (#DCE0E7 / #2A3450) and Rule strong (#C3C9D5 / #3B4766):** hairlines between rows, timeline gridlines and quiet button borders.
- **Data (#2A78D6 / #3987E5):** the only hue. It marks data points, link underlines, the current-page underline and focus rings. Both steps passed the dataviz palette validator against their own surfaces (lightness band, chroma floor, at least 3:1 contrast). It is never used for body text or as a button fill: white on data is 4.4:1, below AA.

The timeline uses a single series colour because each row is labelled directly. Colour never carries identity on its own.

## Typography

Archivo (Google Fonts, variable: `wdth` 62–125, `wght` 100–900) is the only typeface. Monospace appears only inside code blocks.

- **Display:** the name on the home page, at 125% width and weight 720, set tight (-0.035em, line-height 0.95). It sizes fluidly from 2.75rem to 5.25rem.
- **Page title:** the section page and page H1s, at 112% width and weight 700, on the same fluid scale.
- **Entry title:** H1s for talks, papers and patents, whose titles are long. These are one step down (2rem to 3.25rem) and capped at 24ch.
- **Section title:** home page H2s at 2.25rem and 112% width.
- **Body:** 17px, line-height 1.6. Prose measure is capped at 66ch.
- **Small and caption:** metadata, chips and the timeline, at 14px and 13px. Axis years and counts use tabular figures so they line up.

Sentence case everywhere. No all-caps labels, no letter-spaced eyebrows above headings.

## Layout

- **Container:** max 74rem (1184px), with gutters that scale from 16px to 40px (`clamp(1rem, 4vw, 2.5rem)`).
- **Alignment:** everything is left-aligned to a single edge. Nothing is centred except the lightbox caption.
- **Rhythm:** spacing comes from a 4px-based scale (4, 8, 12, 16, 24, 32, 48, 72, 104). Sections are 72px apart and the footer sits 104px below content.
- **Label column:** the timeline row labels and the year labels in the work list share one 8.5rem column, so the chart and the list read as one table.
- **Breakpoints:** 48rem, where the timeline labels move above their tracks and year groups stack, and 64rem, where the hero gains its portrait column, the nav becomes a menu below it, and the workshop section splits into two columns.

```
┌ Timothy Wong ─────────── Projects Talks Publications … ◐ ┐
│                                                          │
│  Timothy Wong                                  ┌──────┐  │
│  Data science, machine learning and AI eng.    │ photo│  │
│  Bio paragraph (62ch)                          │      │  │
│  LinkedIn  GitHub  Hugging Face  ORCID  X      └──────┘  │
│                                                          │
│  Work since 2016                                         │
│  (All 22) (Talks 11) (Publications 2) …                  │
│  Talks        │ ·  ·· ···  ·      │     ·      ·         │
│  Publications │       ·           │          ·           │
│               2016 … 2026                                │
│  2026  Agentic AI Systems for Cloud Migration …          │
│        Talk at EARL 2026, Brighton, United Kingdom       │
│                                                          │
│  Wood carving and CNC            [ ][ ][ ][ ]            │
└──────────────────────────────────────────────────────────┘
```

## Elevation & Depth

The site is flat. Hierarchy comes from type size, width and weight, and from hairline rules. There are no drop shadows on content, and no cards. Two things sit above the page:

- **Timeline tooltip:** an ink-filled label above the hovered mark.
- **Lightbox:** a native `<dialog>` over a 92% navy scrim.

Data marks carry a 2px ring in the paper colour so overlapping points stay distinct.

## Shapes

Corner radius encodes what a thing is, not a single house radius:

- **4px:** photos and code blocks.
- **6px:** buttons, icon buttons and tooltips.
- **8px:** the portrait.
- **Pill:** filter chips only, since they toggle on and off.
- **Circle:** timeline marks.

## Components

- **Header:** the name on the left, the nav on the right, then the theme toggle. The current section is underlined in data blue, 2px. Below 64rem the nav collapses behind a "Menu" button that swaps to a close icon.
- **Profile links:** an icon plus a text label, from `site.social.links` in `_config.yml`. The same list feeds the JSON-LD `sameAs`. Brand marks are from Simple Icons (CC0), rendered in the current text colour.
- **Filter chips:** toggle buttons with `aria-pressed` and an item count. The selected chip is ink-filled. The choice is mirrored in `?type=` so filtered views can be shared, and announced to screen readers.
- **Timeline:** one row per kind of work (from `_data/navigation.yml`), each with a direct label. X is the item's date, gridlines mark year boundaries, and years are labelled at mid-year. Marks are links with a hover tooltip. The plot is hidden from assistive technology, because the list below holds the same data.
- **Work list:** grouped by year. Each item has a title link plus one line of prose metadata ("Talk at EARL 2024, Brighton, United Kingdom"), never fragments joined by separators.
- **Entry facts:** a definition list (Date, Format, Venue, Location, or Filed and Reference for patents) under the title of every talk, paper, patent, tutorial and teaching page.
- **Citation:** on papers, with "Copy citation" (primary) and "Read the paper" (quiet).
- **Share:** LinkedIn, X and "Copy link". Facebook and Google+ were dropped.
- **Gallery:** a responsive grid of 3:4 thumbnails, each linking to the full-size image. With JavaScript, a `<dialog>` lightbox adds previous and next buttons, arrow keys and an "n of 11" count.
- **Buttons:** at least 44px tall. Use one primary button per group, with quiet buttons for the rest.

### Motion

There is one orchestrated moment: on load, timeline marks scale in from left to right, staggered by date over about a second, as if the chart is being plotted. Everything else is a 120–200ms response to an action, such as hover, filter dimming or a tooltip. `prefers-reduced-motion` turns all of it off.

### Content and data

- Kinds of work, nav order and labels: `_data/navigation.yml`.
- Gallery photos and which four appear on the home page (`featured: true`): `_data/gallery.yml`. Thumbnails in `images/gallery/thumbs/` have their shorter side at 800px, JPEG quality 78.
- Patents need a `date:` equal to their `fileddate` so they sort and plot correctly.

## Do's and Don'ts

- Do write metadata as a sentence ("Paper in arXiv pre-print (cs.AI)"), not as fragments joined with dots or dashes.
- Do keep every interactive target at least 44 by 44px, with a visible 2px data-blue focus ring.
- Do design light and dark together, and check both with axe (both currently report zero violations on every page type).
- Do keep the timeline honest: one colour, labelled rows, hairline grid, and the list as its table view.
- Don't add a second accent colour, gradients, cards or drop shadows.
- Don't use emoji as icons. Use `{% include icon.html name="…" %}`.
- Don't put labels in all caps, add eyebrows above headings, or append arrows to link text.
- Don't number things that aren't a sequence.
- Don't animate on scroll. The timeline's entrance is the only load-time motion.
