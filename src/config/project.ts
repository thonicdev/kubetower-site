/**
 * Where the console lives, and whether a visitor can get there.
 */
export const project = {
  /** The console's repository. Opens to the public with v0. */
  repoUrl: 'https://github.com/thonicdev/kubetower',

  /**
   * Whether the console's repository can be opened by a visitor. It governs
   * the footer's links into it; the header's star button is unconditional and
   * degrades on its own when the API cannot answer.
   */
  repoPublic: true,

  /** The site's own repository, which is public and can always be linked. */
  siteRepoUrl: 'https://github.com/thonicdev/kubetower-site',

  /**
   * The licence the console is published under, by its SPDX identifier.
   * Named in exactly one place: it appears in the hero badge, the spec strip
   * and the footer, and three copies of a licence name is how a site ends up
   * claiming two different ones.
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
