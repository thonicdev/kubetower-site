const base = import.meta.env.BASE_URL;

/**
 * Prefix an internal path with the configured base.
 *
 * Astro does not rewrite `href` attributes, so every internal link has to go
 * through here or it breaks the moment the site is served from a sub-path —
 * which is exactly how it is served on GitHub Pages without a custom domain.
 * External URLs, anchors and mailto: links pass through untouched.
 */
export function withBase(path: string): string {
  if (/^[a-z][a-z0-9+.-]*:/i.test(path) || path.startsWith('//') || path.startsWith('#')) {
    return path;
  }

  const prefix = base.endsWith('/') ? base.slice(0, -1) : base;
  const suffix = path.startsWith('/') ? path : `/${path}`;

  return `${prefix}${suffix}`;
}

/** True when `path` is the page currently being rendered, base included. */
export function isCurrent(currentPathname: string, path: string): boolean {
  const strip = (value: string) => (value.length > 1 ? value.replace(/\/+$/, '') : value);
  return strip(currentPathname) === strip(withBase(path));
}

/** True when `currentPathname` sits at or under `path`. */
export function isWithin(currentPathname: string, path: string): boolean {
  const target = withBase(path).replace(/\/+$/, '');
  const current = currentPathname.replace(/\/+$/, '');
  return current === target || current.startsWith(`${target}/`);
}
