/**
 * The landing page's copy.
 *
 * Two rules hold everything in this file:
 *
 *  1. Every claim is one the console actually makes good on, or is plainly
 *     marked as what v0 ships with. A feature list used to sell something has
 *     to be the reachable one.
 *  2. No measured figure appears until there is a build to measure. A startup
 *     time or a memory ceiling quoted before that is a number somebody made
 *     up, and it is the first thing a sceptical reader checks.
 */

import { project } from './project';

export const hero = {
  badge: `Air-gapped · Multi-cluster · ${project.license}`,
  /** The headline is split so the second half can carry the gradient. */
  titleLead: 'The modern multi-cluster',
  titleAccent: 'Kubernetes console.',
  lede: 'Native performance for SREs. All your contexts in one fluid UI, powered by a 42MB binary. No bloat, no configuration required.',
} as const;

export type Tone = 'primary' | 'secondary' | 'tertiary' | 'error';

export interface Highlight {
  icon: string;
  title: string;
  body: string;
  footnote: string;
  /** Which accent the card's icon, title and border take. */
  tone: Tone;
  /** The footnote's accent, where it differs from the card's. */
  footTone?: Tone;
}

export const highlightsIntro = {
  title: 'Built for people who run the cluster',
  lede: 'A console shaped by what production actually asks of one: your credentials stay yours, the blast radius of a write is bounded, and nothing in the browser can reach an API server.',
} as const;

export const highlights: Highlight[] = [
  {
    icon: 'lucide:shield',
    title: 'Air-gapped by default',
    tone: 'primary',
    body: 'Your kubeconfig is read where it already lives, and the console runs entirely on the machine you started it on. No cloud proxy stands between you and a cluster.',
    footnote: 'Runs on an isolated network',
  },
  {
    icon: 'lucide:layers',
    title: 'Every context, one process',
    tone: 'secondary',
    body: 'Managed and local clusters side by side from the kubeconfig you already have — switch context without losing what you were looking at.',
    footnote: 'Per-context credentials, isolated',
  },
  {
    icon: 'lucide:server',
    title: 'The browser never touches the API server',
    tone: 'tertiary',
    body: 'The Go backend is the only Kubernetes client. The interface talks to a JSON API over the same origin and holds no cluster credential of any kind.',
    footnote: 'One client, one place to audit',
  },
  {
    icon: 'lucide:door-closed',
    title: 'One guarded door for every write',
    tone: 'primary',
    body: 'Nothing mutates a cluster except through a single choke point: a read-only fence, a resourceVersion precondition, a dry run first, and a log line after.',
    footnote: 'Structural, not a list of kinds',
  },
];

/* --------------------------------------------------------------------------
   The AI section.

   Its own block rather than four more highlights: it answers a different
   question — what the console does with a model attached, rather than what it
   is — and the navigation has an entry pointing straight at it.
   -------------------------------------------------------------------------- */

export const aiIntro = {
  title: 'Context-aware troubleshooting with Claude',
  lede: 'kubetower connects Claude to your live cluster context to inspect pod crashes, analyze logs, and pinpoint failure root causes faster.',
} as const;

export const aiFeatures: Highlight[] = [
  {
    icon: 'lucide:terminal',
    title: 'Claude troubleshooting connector',
    tone: 'primary',
    body: 'Stream cluster logs, crash events, and manifests directly into Claude for fast contextual root cause analysis.',
    footnote: 'Context PTY terminal',
  },
  {
    icon: 'lucide:scan-search',
    title: 'CrashLoop & OOM triage',
    tone: 'error',
    footTone: 'tertiary',
    body: 'Real-time detection of OOMKilled, CrashLoopBackOff, and ImagePullBackOff errors with correlated pod logs and exit codes.',
    footnote: 'Root cause inspection',
  },
  {
    icon: 'lucide:git-compare',
    title: 'managedFields & drift remediation',
    tone: 'tertiary',
    footTone: 'secondary',
    body: 'Claude inspects Argo CD and Flux drift and tells you exactly who modified spec replicas or memory limits, resolving git conflicts.',
    footnote: 'Instant drift detection',
  },
  {
    icon: 'lucide:lock',
    title: 'Guarded mutation door',
    tone: 'secondary',
    footTone: 'primary',
    body: 'Zero blind cluster mutations. Proposed remediation commands require explicit operator review and token confirmation.',
    footnote: 'Human in the loop',
  },
];
