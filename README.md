# kubetower-site

The kubetower website: a static [Astro](https://astro.build) site, styled with
Tailwind CSS v4, published to GitHub Pages.

## Running it

```bash
npm install
npm run dev      # http://localhost:4321/
npm run check    # astro check — types, and every component's props
npm run build    # static output in dist/
npm run preview  # serve dist/ exactly as it will be served
```

Node 22.12 or newer.

## How it is laid out

```
src/
├── components/
│   ├── home/        the landing page's sections
│   ├── mdx/         the components MDX prose is rendered with
│   ├── ui/          the pieces used everywhere: cards, buttons, command rows
│   ├── Header · Footer · Logo · Icon
├── config/          all copy and all switches, no markup
├── content/docs/    the documentation, in MDX
├── layouts/         Base · Page · Docs
├── lib/             path helpers, the toast, the docs ordering
├── pages/           routes
└── styles/          the theme
```

**Copy lives in `src/config/`, not in markup.** A sentence that appears in two
components is a sentence the two will eventually disagree about, so the
landing page's wording, the platform list and the install methods are data.

**Colours live in `src/styles/global.css`.** The palette is declared once as
Tailwind v4 theme tokens — `bg-surface-container-high`, `text-on-surface-variant`
and the rest are generated from it. Nothing downstream should contain a hex
value.

## Two switches

`src/config/project.ts` and `src/config/release.ts` decide how much of the site
is an offer and how much is a description.

| Flag | While false | When true |
| --- | --- | --- |
| `project.repoPublic` | links into the console's repository are hidden | the header, the footer and the download page link to it |
| `release.available` | the platform grid reads as a plan, install commands are placeholders, copy buttons are inert | the same components become a working download page |

Nothing on the site points at something a visitor cannot reach. A `brew install`
for a formula that does not exist, or a Releases link that 404s, is worse than
saying plainly that the release has not happened — so the release-dependent UI is
built once and gated, rather than written twice.

At release: set `release.available` to `true`, fill in `release.version`, and put
the real command in each entry of `installMethods`.

## Links and the base path

The site is served from the root of a domain. Astro rewrites neither `href` in
markup nor `href` in markdown, so **every internal link goes through a helper**:

- in components, `withBase()` from `src/lib/paths.ts`;
- in MDX prose, automatically — `src/components/mdx` maps markdown's `a` to a
  component that calls the same helper.

A raw `href="/docs"` in a component works today and breaks the moment the site
moves under a sub-path. That is the one mistake this arrangement exists to
prevent.

**Serving it somewhere else** is two repository variables (Settings → Secrets
and variables → Actions → Variables), no code change. To publish at the GitHub
Pages project URL rather than the domain:

```
SITE_URL   https://thonicdev.github.io
BASE_PATH  /kubetower-site
```

The same pair works locally: `BASE_PATH=/kubetower-site npm run dev`.

## Deployment

`.github/workflows/deploy.yml` builds and publishes on every push to `main`. It
needs **Settings → Pages → Source: GitHub Actions**; without it the deploy step
fails rather than silently doing nothing.

It also needs the **custom domain set under Settings → Pages**, because the
build defaults to a root base path. Until that is configured, the site at
`https://thonicdev.github.io/kubetower-site/` will load its stylesheet from the
wrong place and every link will point one level too high — set the two
variables above to publish there instead.

`.github/workflows/ci.yml` type-checks and builds every pull request.

## Adding a documentation page

Drop an `.mdx` file in `src/content/docs/`:

```mdx
---
title: Page title
description: One sentence, used under the heading and as the meta description.
order: 4
---
```

It appears in the sidebar in `order`, and in the previous/next links, with no
route to register. Components can be imported into the prose; `~/` resolves to
`src/`.

## Third-party requests

Fonts are self-hosted through Fontsource and icons are inlined as SVG at build
time, so no asset is fetched from anywhere else.

**One request leaves the page**: the header's star count, read from
`api.github.com` by the visitor's browser so the number stays current between
deploys. It is cached in `sessionStorage` for an hour — the anonymous API allows
60 requests an hour per address — and the button degrades to a plain link to the
repository when the API cannot answer, which is what happens while the repository
is private.
