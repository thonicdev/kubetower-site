import { project } from './project';

/**
 * The strip under the hero's buttons.
 *
 * Facts a visitor can check, never a measured figure: there is no public build
 * to measure yet. A startup time or a memory figure comes back here only once
 * it has been measured on a released binary, with the measurement kept.
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
  { label: 'Price', value: 'Free, no paid tier', tone: 'primary', pulse: true },
  { label: 'Telemetry', value: 'None', tone: 'tertiary' },
  { label: 'License', value: project.license, tone: 'neutral' },
];
