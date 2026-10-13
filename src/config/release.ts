import { project } from './project';

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
