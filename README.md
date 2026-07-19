# My Portfolio

Check out my live portfolio here:  
👉 [Link to Portfolio](https://tayyab-portfolio-chi.vercel.app)

## Running locally

```bash
pnpm install
pnpm dev
```

## Project pages

Every project surface reads from one typed source: [`data/projects.ts`](data/projects.ts).

| Route | What it renders |
| --- | --- |
| `/` | Homepage — hero, about timeline, projects section, tech stack |
| `/projects` | Filterable grid of every case study |
| `/projects/[slug]` | Case study page, statically generated per project |

`/projects/[slug]` pages are prerendered via `generateStaticParams`; unknown
slugs return a 404 through `notFound()`. The sitemap at `/sitemap.xml` is
generated from the same array.

### Adding a case study

1. Append a `Project` object to the `projects` array in
   [`data/projects.ts`](data/projects.ts). TypeScript will tell you which
   fields are missing.
2. Drop a cover image in `public/images/` — see
   [`public/projects/README.md`](public/projects/README.md).
3. Set `featured: true` to surface it on the homepage grid.

Nothing else needs editing — the grid, detail page, prev/next navigation,
filter chips and sitemap all derive from that array.

### Configuration

Set `NEXT_PUBLIC_SITE_URL` to the deployed origin. It resolves canonical URLs,
OpenGraph image URLs and the sitemap. The fallback lives in
[`lib/site.ts`](lib/site.ts).

## Components

Project components live in [`components/projects/`](components/projects/) and
are server components unless interactivity requires otherwise:

| Component | Client? | Purpose |
| --- | --- | --- |
| `ProjectCard` | no | Full-bleed cover, title, tagline and tech icons |
| `ProjectGrid` | no | Responsive 1 → 2 → 3 column grid |
| `ProjectHero` | no | Case study hero with cover, meta strip and stack |
| `FilterableProjects` | yes | Category filter chips over the grid |

The homepage section and `/projects` render the **same** `ProjectGrid`, so the
two surfaces stay identical by construction.

Tech icons are resolved in [`lib/tech-icons.tsx`](lib/tech-icons.tsx), which maps
each `tech` string to a brand icon and colour. Unmapped strings fall back to a
generic glyph, so adding a new technology never breaks a card — but add it to
that map to get a proper logo.

### Cover images

Covers vary from wide screenshots to square logos, so each project sets
`coverFit`:

- `"cover"` (default) — screenshots and mockups, cropped to fill the frame
- `"contain"` — logos and wordmarks, fitted with padding so nothing is cropped

Set `coverWidth` / `coverHeight` to the image's **real** intrinsic size; they
prevent layout shift and feed the OpenGraph tags.
