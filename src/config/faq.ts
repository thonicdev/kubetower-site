/**
 * The questions a visitor asks before downloading anything.
 *
 * The same two rules as `landing.ts` hold here, and one more that is specific
 * to a question-and-answer list: **an answer is three sentences at most.** A
 * FAQ that turns into documentation is a FAQ nobody reads, and the
 * documentation already exists — so where an answer wants a fourth sentence,
 * it wants a link to `/docs` instead.
 *
 * The order is the order of the objection, not of the feature: what it costs,
 * then what it touches, then what it does to the cluster, then how it behaves
 * with other people's permissions.
 */
import { project } from './project';

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqIntro = {
  title: 'Questions, answered short',
  lede: 'What people ask before they run an unfamiliar binary against a production cluster.',
} as const;

export const faq: FaqItem[] = [
  {
    question: 'Is it really free?',
    // The licence is named in `project.ts` and nowhere else — three copies of
    // a licence name is how a site ends up claiming two different ones.
    answer: `Yes. The core application (multi-cluster, logs, 7-day archive, desktop app) is 100% free and open source (${project.license}).`,
  },
  {
    question: 'Does anything leave my machine?',
    answer:
      'No. No accounts and no cloud proxies. The application talks directly to your Kubernetes API server and nothing else.',
  },
  {
    question: 'Does it install agents in my cluster?',
    answer: 'No. It requires zero in-cluster agents, operators or CRDs to function.',
  },
  {
    question: 'Will it modify my kubeconfig?',
    answer:
      'Never. Your kubeconfig is treated as strictly read-only. All application preferences are saved safely in a separate local directory.',
  },
  {
    question: 'Can I run it against production?',
    answer:
      'Yes. You can enforce a read-only mode per cluster. On writable clusters, destructive actions require a typed confirmation, and every edit shows an API server preview before it is applied.',
  },
  {
    question: 'Will it overload my API server with connections?',
    answer:
      'No. KubeTower uses a smart poller instead of keeping dozens of long-running watch connections open, preventing API fatigue and connection drops.',
  },
  {
    question: 'Does it work with EKS, GKE, or SSO tokens?',
    answer:
      'Yes. It automatically discovers and uses your existing credential plugins, such as AWS or GCP auth, without requiring you to re-authenticate.',
  },
  {
    question: 'How are permissions handled if I host it for my team?',
    answer:
      'It uses your existing RBAC. There is no custom permission system: the console checks rights via SubjectAccessReview, so if a user’s Kubernetes role forbids an action, the console forbids it.',
  },
];
