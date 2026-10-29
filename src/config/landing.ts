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
import { screenshots } from './screenshots';

export const hero = {
  /**
   * The headline is split so the second half can carry the gradient.
   *
   * The lead is a list rather than one string because of where it wraps. At
   * phone widths "Open-source multi-cluster" is too wide for one line, and the
   * browser breaks it at the hyphen inside "multi-cluster" - stranding
   * "cluster" alone on the second line. Each entry here gets its own line
   * below `sm`, so the break is one we chose; above `sm` they read as one
   * line again and nothing changes.
   */
  titleLead: ['Open-source', 'multi-cluster'],
  titleAccent: 'Kubernetes console.',
  lede: 'Native performance for DevOps and SREs. All your contexts in one fluid UI, powered by a 42MB binary. No bloat, no configuration required.',
} as const;

export type Tone = 'primary' | 'secondary' | 'tertiary' | 'error';

/** What a card's preview shows: a capture, and what is on it. */
export interface Preview {
  image: ImageMetadata;
  /** Describes the screen for anyone who cannot see it. Never "screenshot of…". */
  alt: string;
}

export interface Highlight {
  /** The preview dialog's id is built from it, so it has to be unique. */
  id: string;
  icon: string;
  title: string;
  /**
   * What the card says, as short lines rather than a paragraph — a card is
   * scanned, not read. **Four at most**: the carousel gives every card the
   * height of the tallest one, so a fifth line here makes every other card
   * taller to carry it.
   */
  points: string[];
  /** The one line under the capture when the card is opened. */
  summary: string;
  /**
   * The capture the card opens on. `null` is a real answer — no capture yet —
   * and the preview draws a neutral placeholder for it rather than borrowing a
   * screen that shows something else.
   */
  screenshot: Preview | null;
  /** Which accent the card's icon, title and border take. */
  tone: Tone;
}

/**
 * One of the captures under the hero, reused as a card's preview.
 *
 * Read out of `screenshots.ts` rather than imported a second time, so the alt
 * text is written once; and it throws rather than returning nothing, so a
 * renamed capture fails the build instead of quietly turning into a
 * placeholder.
 */
const capture = (id: string): Preview => {
  const shot = screenshots.find((s) => s.id === id);
  if (!shot) throw new Error(`landing.ts: no screenshot "${id}" in screenshots.ts`);
  return { image: shot.image, alt: shot.alt };
};

export const highlightsIntro = {
  title: 'Built for people who run the cluster',
  lede: 'A console shaped by what production actually asks of one: your credentials stay yours, the blast radius of a write is bounded, and nothing in the browser can reach an API server.',
} as const;

/**
 * The console's own features, as the carousel shows them.
 *
 * Nine rather than fourteen, and the order is the reading order: what the
 * console *is* first — with the assistant second, because it is the card a
 * visitor who has seen every other console has not seen — then what it adds
 * and where it runs, then what it does all day. Fourteen was a row nobody
 * scrolled to the end of; the smaller cards folded into the last one.
 *
 * Every card opens a preview: its `screenshot` above its `summary`. **To give a
 * card a real capture**, put the PNG in `src/assets/screenshots/`, import it
 * here and set `screenshot: { image, alt }` on that card — nothing else
 * changes. A card left at `null` shows the placeholder, which says so.
 *
 * The rule at the top of this file applies to every one of them: each card is a
 * claim the console makes good on. Nothing here describes a page that is not in
 * the console, and nothing here describes a deployment shape the visitor cannot
 * reach — those belong to the profiles section, which says which is which. The
 * lines that look ahead, on the extras and EKS cards, say so in their own words.
 */
export const highlights: Highlight[] = [
  {
    id: 'multi-cluster',
    icon: 'lucide:layers',
    title: 'Multi-cluster view',
    tone: 'secondary',
    points: [
      'Every context in your kubeconfig, side by side',
      'KUBECONFIG merged as kubectl merges it',
      'Switch without losing your place',
      'Per-context credentials, isolated',
    ],
    summary: 'Every cluster your kubeconfig names, in one process and one window.',
    screenshot: capture('overview'),
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
     *
     * The preview is held to the same rule: the dialog is labelled by the
     * title, so the name stays out of `summary` too, and a capture of this
     * card must not put the mark where it reads as ours.
     */
    id: 'assistant',
    icon: 'lucide:sparkles',
    title: 'AI assistant integrated',
    tone: 'tertiary',
    points: [
      'The ordinary terminal, running Claude Code',
      'Same kubeconfig, same cluster',
      'Your own subscription',
      'No API key in this project',
    ],
    summary: 'An assistant in the terminal, already pointed at the cluster on screen.',
    screenshot: null,
  },
  {
    id: 'air-gapped',
    icon: 'lucide:shield',
    title: 'Air-gapped by default',
    tone: 'primary',
    points: [
      'Your kubeconfig, read where it lives',
      'No cloud proxy in the path',
      'No account, no telemetry',
      'The browser never touches the API server',
    ],
    summary: 'Nothing phones home, and only the backend ever speaks to a cluster.',
    screenshot: null,
  },
  {
    /**
     * Four of the six ship in the console today: Argo CD (which also reads
     * Flux), KubeCron, KubeAdjust and the Redis viewer. Security and Database
     * are named as coming, on a line of their own, so the card never reads as
     * six pages a visitor can open today. When either ships, it moves up.
     */
    id: 'extras',
    icon: 'lucide:puzzle',
    title: 'Extras',
    tone: 'secondary',
    points: [
      'Argo CD and Flux, KubeCron, KubeAdjust',
      'A read-only Redis viewer',
      'Security and Database, next',
      'Many more to come',
    ],
    summary: 'Pages for what only some clusters run, switched on per cluster.',
    screenshot: null,
  },
  {
    id: 'eks',
    icon: 'lucide:cloud',
    title: 'EKS and AWS CLI compatible',
    tone: 'primary',
    points: [
      'EKS tokens signed in this process',
      'SSO and assume-role, as your AWS CLI resolves them',
      'Profiles from SSO tools such as Leapp',
      'More tooling to come',
    ],
    summary: 'The AWS profiles you already use, with no second login.',
    screenshot: null,
  },
  {
    id: 'in-cluster',
    icon: 'lucide:server',
    title: 'In-cluster mode',
    tone: 'tertiary',
    points: [
      'The console in a pod, from a Helm chart',
      'Single sign-on through your OIDC provider',
      'Each person held to your RBAC',
      'A ClusterRole drawn from what it asks for',
    ],
    summary: 'The same console deployed with Helm, signing people in through your identity provider.',
    screenshot: null,
  },
  {
    id: 'shells',
    icon: 'lucide:square-terminal',
    title: 'Multi-shell integration',
    tone: 'secondary',
    points: [
      'A terminal already on the right context',
      'A shell in any pod',
      'A shell on a node',
      'Pod logs that page backwards',
    ],
    summary: 'A prompt on the context, the pod or the node you are reading, and its logs beside it.',
    screenshot: capture('pods'),
  },
  {
    id: 'helm',
    icon: 'lucide:package',
    title: 'Helm release integration',
    tone: 'primary',
    points: [
      'Every release, at its chart version',
      'The values you supplied, and its notes',
      'Every revision it kept, newest first',
      'One click from the list',
    ],
    summary: 'Every detail of a Helm release, one click from the list.',
    screenshot: null,
  },
  {
    id: 'ui',
    icon: 'lucide:panels-top-left',
    title: 'Intuitive, modern UI',
    tone: 'tertiary',
    points: [
      'Tables you arrange, remembered',
      'A view is a link you can send',
      'Your own name and colour per context',
      'CPU and memory in the table',
    ],
    summary: 'A console you arrange once and find the way you left it.',
    screenshot: capture('overview'),
  },
];
