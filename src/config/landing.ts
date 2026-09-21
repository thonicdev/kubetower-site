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

export const hero = {
  /** The headline is split so the second half can carry the gradient. */
  titleLead: 'Open-source multi-cluster',
  titleAccent: 'Kubernetes console.',
  lede: 'Native performance for DevOps and SREs. All your contexts in one fluid UI, powered by a 42MB binary. No bloat, no configuration required.',
} as const;

export type Tone = 'primary' | 'secondary' | 'tertiary' | 'error';

export interface Highlight {
  icon: string;
  title: string;
  /**
   * What the card says, as short lines rather than a paragraph — a card is
   * scanned, not read. **Four at most**: the carousel gives every card the
   * height of the tallest one, so a fifth line here makes a dozen other cards
   * taller to carry it.
   */
  points: string[];
  /** Which accent the card's icon, title and border take. */
  tone: Tone;
}

export const highlightsIntro = {
  title: 'Built for people who run the cluster',
  lede: 'A console shaped by what production actually asks of one: your credentials stay yours, the blast radius of a write is bounded, and nothing in the browser can reach an API server.',
} as const;

/**
 * The console's own features, as the carousel shows them.
 *
 * Fourteen rather than four, and the order is the reading order: what the
 * console *is* first — with the assistant among them, because it is the card a
 * visitor who has seen every other console has not seen — then what it does,
 * grouped so that neighbours in the row belong together.
 *
 * The rule at the top of this file applies to every one of them: each card is a
 * claim the console makes good on. Nothing here describes a page that is not in
 * the console, and nothing here describes a deployment shape the visitor cannot
 * reach — those belong to the profiles section, which says which is which.
 */
export const highlights: Highlight[] = [
  {
    icon: 'lucide:shield',
    title: 'Air-gapped by default',
    tone: 'primary',
    points: [
      'Your kubeconfig, read where it lives',
      'No cloud proxy in the path',
      'No account, no telemetry',
    ],
  },
  {
    /**
     * The mark goes in the line, never in the title, and never as a logo.
     *
     * Anthropic permits saying **in plain text** that a product runs Claude
     * Code, and forbids the name or logo "as part of your own product,
     * feature, or company name" without written permission —
     * https://code.claude.com/docs/en/legal-and-compliance. A card title is
     * read as the name of a feature, so `Claude, already on the cluster` was
     * dropped on 2026-09-21 along with the idea of a Claude glyph in the icon
     * tile. `@iconify-json/simple-icons` does carry `claude`, `claudecode` and
     * `anthropic`, and `Icon.astro` would happily inline any of them recoloured
     * to `text-tertiary` — which is a second breach, since the trademark
     * guidelines forbid altering the mark. **Shipping the glyph is not a
     * licence to use it.**
     */
    icon: 'lucide:sparkles',
    title: 'The assistant, already on the cluster',
    tone: 'tertiary',
    points: [
      'The ordinary terminal, running Claude Code',
      'Same kubeconfig, same cluster',
      'Your own subscription',
      'No API key in this project',
    ],
  },
  {
    icon: 'lucide:layers',
    title: 'Every context, one process',
    tone: 'secondary',
    points: [
      'Managed and local clusters side by side',
      'Switch without losing your place',
      'Per-context credentials, isolated',
      'KUBECONFIG merged as kubectl merges it',
    ],
  },
  {
    icon: 'lucide:cloud',
    title: 'EKS, AKS and GKE, already authenticated',
    tone: 'primary',
    points: [
      'The exec plugin your kubeconfig names',
      'Found even when launched from the Dock',
      'EKS tokens signed in this process',
      'SSO and assume-role, as your CLI resolves them',
    ],
  },
  {
    icon: 'lucide:server',
    title: 'The browser never touches the API server',
    tone: 'tertiary',
    points: [
      'The Go backend is the only client',
      'No cluster credential in the page',
      'No generic proxy to a control plane',
      'One place to audit',
    ],
  },
  {
    icon: 'lucide:link',
    title: 'A view is a link',
    tone: 'secondary',
    points: [
      'Several namespaces at once',
      'The selection lives in the URL',
      'Bookmark it, or send it',
    ],
  },
  {
    icon: 'lucide:columns-3',
    title: 'Tables you arrange',
    tone: 'tertiary',
    points: [
      'Column order, width and density',
      'Per kind',
      'Remembered across restarts',
    ],
  },
  {
    icon: 'lucide:tags',
    title: 'A rail you can read at a glance',
    tone: 'primary',
    points: [
      'Your own name for each context',
      'A colour off a fixed palette',
      'Grouped into bars',
      'ARNs stop looking alike',
    ],
  },
  {
    icon: 'lucide:stethoscope',
    title: 'Which cluster is broken, and whose problem',
    tone: 'secondary',
    points: [
      'DNS, SSO, IAM, or the cluster itself',
      'Four failures under one message',
      'It says which one',
      'So it says who fixes it',
    ],
  },
  {
    icon: 'lucide:square-terminal',
    title: 'A prompt already on the cluster',
    tone: 'tertiary',
    points: [
      'kubectl and helm, already configured',
      'Exec into a container',
      'A shell on a node',
      'A dock that survives navigation',
    ],
  },
  {
    icon: 'lucide:arrow-left-right',
    title: 'Port-forward where the port is written',
    tone: 'primary',
    points: [
      'Open it from the object you are reading',
      'See everything that is open',
      'Close it from the same place',
    ],
  },
  {
    icon: 'lucide:scroll-text',
    title: 'Logs that page backwards',
    tone: 'secondary',
    points: [
      'The log API has no cursor',
      'The console pages it for you',
      'ANSI and JSON, rendered',
      'Per container',
    ],
  },
  {
    icon: 'lucide:activity',
    title: 'CPU and memory in the table',
    tone: 'tertiary',
    points: [
      'Live columns wherever metrics exist',
      'Per container in the drawer',
      'metrics-server, or Prometheus',
    ],
  },
  {
    icon: 'lucide:package',
    title: 'Helm releases, first class',
    tone: 'primary',
    points: [
      'Releases and their values',
      'The manifest they produced',
      'Their history',
      'In the console, not beside it',
    ],
  },
];
