/**
 * The two ways the console is deployed, as one comparison matrix.
 *
 * The questions are a single list rather than a list per profile: each row
 * carries both answers, keyed by profile id, so the type system refuses a row
 * that answers for one surface and not the other — which is the way a
 * comparison stops being a comparison.
 *
 * An answer is a verdict first and prose second. The tick or the cross is what
 * a reader scans; the note exists only where the mark alone would mislead —
 * "no" against single sign-on means a local password, not no authentication.
 */
export type ProfileId = 'desktop' | 'in-cluster';

/** `partial` is the honest third state: it is available, with a real limit. */
export type Answer = 'yes' | 'no' | 'partial';

export interface Verdict {
  answer: Answer;
  /** A few words, only where the mark alone would be read wrongly. */
  note?: string;
}

export interface ComparisonRow {
  /** The question, asked once and answered by both columns. */
  label: string;
  answers: Record<ProfileId, Verdict>;
}

export interface Profile {
  id: ProfileId;
  icon: string;
  title: string;
  /**
   * The name in a narrow column. Below md the comparison has no column headers
   * — each answer names its own surface — and the full title repeated eighteen
   * times is what made that unreadable.
   */
  short: string;
  /** The one-line qualifier under the title. */
  subtitle: string;
  /** Who it is for. */
  audience: string;
  tone: 'primary' | 'tertiary';
  /** Draws the emphasised column. Exactly one profile should carry it. */
  featured?: boolean;
  cta: {
    label: string;
    icon: string;
    /** Either a link, or a command put on the clipboard. */
    href?: string;
    copy?: string;
  };
}

export const profilesIntro = {
  title: 'Desktop or in-cluster. Choose your surface.',
  lede: 'The same interface either way, compiled for one workstation or for a team that shares a cluster.',
} as const;

export const profiles: Profile[] = [
  {
    id: 'desktop',
    icon: 'lucide:laptop',
    title: 'Desktop application',
    short: 'Desktop',
    subtitle: 'MacOS, Windows, Linux',
    audience: 'For individual DevOps, SREs and isolated workstations.',
    tone: 'primary',
    featured: true,
    cta: {
      label: 'Download the binary',
      icon: 'lucide:download',
      href: '/download',
    },
  },
  {
    id: 'in-cluster',
    icon: 'lucide:anchor',
    title: 'In-cluster deployment',
    short: 'In-cluster',
    subtitle: 'Helm chart',
    audience: 'For engineering teams, compliance audits and centralised access.',
    tone: 'tertiary',
    cta: {
      label: 'Copy the Helm command',
      icon: 'lucide:copy',
      copy: 'helm install kubetower oci://ghcr.io/thonicdev/charts/kubetower',
    },
  },
];

export const comparison: ComparisonRow[] = [
  {
    label: 'Every cluster at once',
    answers: {
      desktop: { answer: 'yes', note: 'All the contexts in your kubeconfig' },
      'in-cluster': { answer: 'no', note: 'Only the cluster it runs in' },
    },
  },
  {
    label: 'Nothing to deploy',
    answers: {
      desktop: { answer: 'yes', note: 'One binary, no change to the cluster' },
      'in-cluster': { answer: 'no', note: 'A Helm release you operate' },
    },
  },
  {
    label: 'Shared by the whole team',
    answers: {
      desktop: { answer: 'no', note: '' },
      'in-cluster': { answer: 'yes', note: 'One URL for everyone' },
    },
  },
  {
    label: 'Single sign-on',
    answers: {
      desktop: { answer: 'no' },
      'in-cluster': { answer: 'yes', note: 'Your identity provider, over OIDC' },
    },
  },
  {
    label: 'Your own permissions apply',
    answers: {
      desktop: { answer: 'yes', note: 'Your kubeconfig' },
      'in-cluster': { answer: 'yes', note: 'Your roles and bindings' },
    },
  },
  {
    label: 'Port forwarding',
    answers: {
      desktop: { answer: 'yes' },
      'in-cluster': { answer: 'partial', note: 'Through the ingress only' },
    },
  },
  {
    // Not "Claude connector": a row label in a feature table is a feature name,
    // and the name is Anthropic's. The permitted form is the plain-text note.
    // See the comment on the assistant card in `landing.ts`.
    label: 'Assistant terminal',
    answers: {
      desktop: { answer: 'yes', note: 'Runs Claude Code' },
      'in-cluster': { answer: 'yes', note: 'Runs Claude Code' },
    },
  },
  {
    label: 'Local shell',
    answers: {
      desktop: { answer: 'yes', note: 'A terminal on your own machine' },
      'in-cluster': { answer: 'no' },
    },
  },
  {
    label: 'Exec into a container',
    answers: {
      desktop: { answer: 'yes' },
      'in-cluster': { answer: 'yes' },
    },
  },
];
