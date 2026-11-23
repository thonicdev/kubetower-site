/**
 * Where the console lives, and whether a visitor can get there.
 */
export const project = {
  /** The console's repository, public since 0.1.0. */
  repoUrl: 'https://github.com/thonicdev/kubetower',

  /**
   * Whether the console's repository can be opened by a visitor. It governs
   * the hero's GitHub button, the header's star button and the footer's links
   * into it: while it is private every one of them is a 404 for a visitor.
   * Set it to true the day the repository opens.
   */
  repoPublic: true,

  /** The site's own repository, which is public and can always be linked. */
  siteRepoUrl: 'https://github.com/thonicdev/kubetower-site',

  /**
   * The Helm chart's repository, public. Each chart release is a tag
   * `kubetower-<version>` there, pushed when that version is published to
   * oci://ghcr.io/thonicdev/charts/kubetower.
   */
  chartRepoUrl: 'https://github.com/thonicdev/kubetower-helm-charts',

  /**
   * The licence the console is published under, by its SPDX identifier.
   * Named in exactly one place: it appears in the spec strip, the FAQ and the
   * footer, and three copies of a licence name is how a site ends up claiming
   * two different ones.
   */
  license: 'AGPL-3.0',
} as const;

export const repoLinks = {
  repo: project.repoUrl,
  /** The REST endpoint the star count is read from, derived rather than typed twice. */
  api: project.repoUrl.replace('https://github.com/', 'https://api.github.com/repos/'),
  issues: `${project.repoUrl}/issues`,
  releases: `${project.repoUrl}/releases`,
  latest: `${project.repoUrl}/releases/latest`,
} as const;

export const chartLinks = {
  /** The REST endpoint the chart's tags are read from. */
  tags: `${project.chartRepoUrl.replace('https://github.com/', 'https://api.github.com/repos/')}/tags?per_page=100`,
  /** The prefix of a chart release's tag, before its version. */
  tagPrefix: 'kubetower-',
} as const;
