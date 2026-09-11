import MdxLink from './MdxLink.astro';

/**
 * The component map handed to every rendered MDX page, so a markdown author
 * gets the site's link behaviour without importing anything.
 */
export const mdxComponents = {
  a: MdxLink,
};
