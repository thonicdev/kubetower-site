import { project } from './project';

/**
 * The release the site is describing.
 *
 * The download buttons never depend on this — they point at GitHub's
 * latest-release endpoint and start working the moment a release carries the
 * assets. What the flag governs is what the page *says*: a version number and
 * a link to the notes once there is a release, and plainly that v0 has not
 * shipped until then.
 */
export const release = {
  available: true,
  version: '0.18.2',
  /** Shown beside the version in the download page's status pill. */
  date: 'March 2025',
} as const;

/**
 * The strip under the hero's buttons.
 *
 * The two figures are the targets the build is held to, not numbers read off a
 * released binary — there is no released binary yet. Replace them with measured
 * ones at v0, and keep the measurement rather than the estimate.
 */
export interface Spec {
  label: string;
  value: string;
  /** Which accent the leading dot takes. */
  tone: 'primary' | 'tertiary' | 'secondary' | 'neutral';
  /** Marks the dot as live, the way the design's first stat pulses. */
  pulse?: boolean;
}

export const specs: Spec[] = [
  { label: 'Startup', value: '< 14ms', tone: 'primary', pulse: true },
  { label: 'Memory', value: '~42 MB', tone: 'tertiary' },
  { label: 'License', value: project.license, tone: 'neutral' },
];
