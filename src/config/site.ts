/**
 * Everything the site says about itself, in one place.
 *
 * Copy lives here rather than inline in markup so that wording can change
 * without touching layout — and so that a claim appears once instead of in
 * three components that then disagree.
 */
export const site = {
  name: 'kubetower',
  /** Used in <title> after the page name. */
  titleSuffix: 'kubetower',
  tagline: 'The modern multi-cluster Kubernetes console.',
  description:
    'An air-gapped multi-cluster Kubernetes console. One Go binary serves its own interface and is the only thing that talks to your clusters, using the kubeconfig already on your machine.',
} as const;

export interface NavLink {
  label: string;
  href: string;
  /** External links open in a new tab and are hidden when unavailable. */
  external?: boolean;
}

export const primaryNav: NavLink[] = [
  { label: 'Features', href: '/#highlights' },
  { label: 'AI', href: '/#ai' },
  { label: 'Downloads', href: '/download' },
  // The draft pointed this at the install tabs; here there is a documentation
  // section to point it at instead.
  { label: 'Documentation', href: '/docs' },
];

export const footerNav: NavLink[] = [
  { label: 'Documentation', href: '/docs' },
  { label: 'Download', href: '/download' },
];
