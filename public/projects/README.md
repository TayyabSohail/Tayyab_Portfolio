# Case study cover images

Each case study uses a single cover image, referenced by `coverImage` in
[`data/projects.ts`](../../data/projects.ts). Covers live in `public/images/`.

The cover is used in three places, so one file drop updates all of them:

- the card on `/projects` and the homepage
- the faded backdrop behind the case study hero
- the OpenGraph / Twitter share image

## Placeholder covers awaiting real art

These three are flat gradient placeholders, not real screenshots. Replace the
file at the same path and the site picks it up with no code change:

| File | Case study |
| --- | --- |
| `public/images/vestafi.png` | Vestafi |
| `public/images/bitsmiths-hrm.png` | Bitsmiths HRM |
| `public/images/bitsmiths-studio.png` | Bitsmiths Studio |

If your replacement is not 1200×800, update `coverWidth` / `coverHeight` for
that case study in `data/projects.ts` to match — those values reserve layout
space and feed the OpenGraph image tags.
