# littlebrains.co

The website for Little Brains, a small studio making games for children on iPhone and iPad. It's a static site built with [Astro](https://astro.build) and published with GitHub Pages.

## Run it locally

```bash
npm install
npm run dev       # http://localhost:4321, reloads as you edit
npm run build     # the finished site in dist/
```

Needs Node 20 or later. Every push to `main` builds and publishes the site through `.github/workflows/deploy.yml`.

## Where things live

| Folder | What's inside |
|---|---|
| `src/data/site.ts` | Studio details used on every page |
| `src/data/games/` | One JSON file per game |
| `src/pages/` | Each page; `games/[slug].astro` is the shared game page |
| `src/components/` | The shelf, game boxes, picture, cut lines, facts panel, questions, App Store button |
| `src/lib/jigsaw.ts` | Jigsaw cut lines for the game pictures and the "pick any number" slider |
| `src/styles/global.css` | Colours, type and layout |
| `public/` | Fonts, pictures, icons, `CNAME` |
| `brand/` | Logo files and brand notes |

## Adding a game

Copy `src/data/games/jigsaw-puzzles.json`, change the slug, text, colour, facts, privacy notes and questions, and put its pictures in `public/images/games/<slug>/` (`-360.webp`, `-640.webp`, `-1024.webp` and `-1024.jpg`). The shelf, `/games/`, the game's own page, Support, Privacy, Press and the sitemap pick it up automatically. A file with `"status": "coming-soon"` shows as a "coming soon" box with no page.

## Licences

- **Fonts:** Fraunces and Figtree, under the SIL Open Font License 1.1. The licence files are in `public/fonts/`.
- **Logo, pictures, text and design:** © Little Brains. All rights reserved.
- **Code dependencies:** open source (mostly MIT). They're used only when building the site.
