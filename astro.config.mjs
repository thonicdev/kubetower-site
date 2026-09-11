// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Read from the environment so a deployment can move without a code change.
// Nothing in src/ hardcodes either: every internal link goes through
// src/lib/paths.ts, which reads import.meta.env.BASE_URL.
//
// The site is served from the root of a domain. On GitHub Pages that needs a
// custom domain (or a repository named thonicdev.github.io) — at the project
// URL, https://thonicdev.github.io/kubetower-site/, a root base makes every
// link point one level too high. Set BASE_PATH=/kubetower-site to serve there.
const site = process.env.SITE_URL ?? 'https://kubetower.dev';
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  build: {
    // A static host serves /docs/install/index.html for /docs/install; the flat
    // form would need server-side extension stripping, which Pages does not do.
    format: 'directory',
  },
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark-default',
      wrap: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
