# Case study screens

Each case study shows the product on devices rather than a single cover
image. The captures are referenced from `screens` and `gallery` in
[`data/projects.ts`](../../data/projects.ts) and live in `public/work/screens/`.

- Desktop captures are 16:10 (2160x1350) and sit on the CSS laptop frame.
- Mobile captures are 390x844 at 2x and sit on the CSS phone frame.
- `coverImage` is the desktop capture; it feeds the OpenGraph / Twitter share
  image and the sitemap only.

A web project needs a desktop and a mobile capture of its home screen, plus
one pair per gallery screen. An app project (`platform: "app"`) needs mobile
captures only; `mobileAlt` is the second phone shown behind the first.

A project with only a desktop capture (see Feinwerks) shows the laptop alone.
