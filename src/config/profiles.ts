/**
 * The two ways the console is deployed, side by side.
 *
 * A comparison is only useful when both columns answer the same questions in
 * the same order, so the rows are a list per profile rather than free markup —
 * the component renders whatever is here, and a question added to one card
 * without the other becomes visible immediately.
 */
export type ValueTone = 'primary' | 'tertiary' | 'plain' | 'muted';

export interface ProfileRow {
  /** The question, identical across both profiles. */
  label: string;
  /** This profile's answer. */
  value: string;
  icon: string;
  /** The answer's colour: an accent where it is a strength, muted where it is a limit. */
  tone: ValueTone;
  /** The icon's colour, where the answer reads plain but the icon should not. */
  iconTone?: ValueTone | 'error';
}

export interface Profile {
  id: string;
  icon: string;
  title: string;
  /** The one-line qualifier under the title. */
  subtitle: string;
  /** Who it is for. */
  audience: string;
  tone: 'primary' | 'tertiary';
  /** Draws the emphasised border. Exactly one profile should carry it. */
  featured?: boolean;
  rows: ProfileRow[];
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
    subtitle: 'Standalone binary • macOS • Windows • Linux',
    audience: 'Best for individual SREs, cluster operators, and air-gapped workstations.',
    tone: 'primary',
    featured: true,
    rows: [
      {
        label: 'Multi-cluster switching',
        value: 'Every context at once',
        icon: 'lucide:circle-check',
        tone: 'tertiary',
      },
      {
        label: 'Claude connector',
        value: 'Full local PTY stream',
        icon: 'lucide:sparkles',
        tone: 'primary',
      },
      {
        label: 'Credential boundary',
        value: 'Your own kubeconfig, read in place',
        icon: 'lucide:key',
        tone: 'plain',
        iconTone: 'tertiary',
      },
      {
        label: 'Port forwarding',
        value: 'Loopback, on your machine',
        icon: 'lucide:arrow-left-right',
        tone: 'tertiary',
      },
      {
        label: 'Session',
        value: 'Stateless, on your machine',
        icon: 'lucide:shield',
        tone: 'tertiary',
      },
      {
        label: 'Authentication',
        value: 'A local password, no account',
        icon: 'lucide:lock',
        tone: 'plain',
        iconTone: 'primary',
      },
    ],
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
    subtitle: 'Helm chart • behind your ingress',
    audience: 'Best for engineering teams, compliance audits, and centralised access.',
    tone: 'tertiary',
    rows: [
      {
        label: 'Multi-cluster switching',
        value: 'The cluster it runs in',
        icon: 'lucide:minus',
        tone: 'muted',
      },
      {
        label: 'Claude connector',
        value: 'Disabled — would hold pod credentials',
        icon: 'lucide:ban',
        tone: 'muted',
        iconTone: 'error',
      },
      {
        label: 'Credential boundary',
        value: 'Service account, checked per user',
        icon: 'lucide:shield-check',
        tone: 'plain',
        iconTone: 'tertiary',
      },
      {
        label: 'Port forwarding',
        value: 'Through the ingress only',
        icon: 'lucide:git-fork',
        tone: 'muted',
      },
      {
        label: 'Session',
        value: 'Server-side, revocable',
        icon: 'lucide:shield',
        tone: 'tertiary',
      },
      {
        label: 'Authentication',
        value: 'Your identity provider, over OIDC',
        icon: 'lucide:users',
        tone: 'plain',
        iconTone: 'tertiary',
      },
    ],
    cta: {
      label: 'Copy the Helm command',
      icon: 'lucide:copy',
      copy: 'helm install kubetower oci://ghcr.io/thonicdev/charts/kubetower',
    },
  },
];
