/**
 * The extras, as the home page's Extras section shows them.
 *
 * One entry per extra that ships in the console, in the order and with the
 * wording of the console's own README (thonicdev/kubetower), so the two never
 * disagree. Each capture is that extra's own preview.png
 * (web/app/extras/<id>/assets/preview.png), taken against made-up clusters:
 * every name, host and image on them is invented. When an extra is added
 * there, add it here with its capture; nothing that is not in the console goes
 * on this list.
 */
import argocd from '~/assets/extras/argocd.png';
import certmanager from '~/assets/extras/certmanager.png';
import cnpg from '~/assets/extras/cnpg.png';
import jvm from '~/assets/extras/jvm.png';
import kubeadjust from '~/assets/extras/kubeadjust.png';
import kubecron from '~/assets/extras/kubecron.png';
import netinspect from '~/assets/extras/netinspect.png';
import pending from '~/assets/extras/pending.png';
import redis from '~/assets/extras/redis.png';
import security from '~/assets/extras/security.png';

export interface Extra {
  id: string;
  name: string;
  /** One line: what the page answers. */
  line: string;
  image: ImageMetadata;
}

export const extrasIntro = {
  title: 'Extras, built in',
  lede: 'Pages for what your clusters run, switched on per cluster. All free, all in the same binary.',
  next: 'Next: a Database viewer for MySQL, MariaDB and MongoDB.',
} as const;

export const extras: Extra[] = [
  { id: 'argocd', name: 'Argo CD and Flux', line: 'Sync, health and history of every application.', image: argocd },
  { id: 'certmanager', name: 'Cert Manager', line: 'What expires soon, failing orders, broken issuers.', image: certmanager },
  { id: 'security', name: 'Security Centre', line: 'Trivy findings by severity, per workload.', image: security },
  { id: 'kubeadjust', name: 'Kube Adjust', line: 'Do requests and limits fit real usage?', image: kubeadjust },
  { id: 'pending', name: 'Pod Debugging', line: 'Why a pod waits, and the closest node.', image: pending },
  { id: 'netinspect', name: 'Network Inspector', line: 'Would one pod reach another? Read from the rules.', image: netinspect },
  { id: 'kubecron', name: 'Kube Cron', line: 'Does each CronJob run when it should?', image: kubecron },
  { id: 'jvm', name: 'JVM Inspector', line: 'How close each Java heap is to its limit.', image: jvm },
  { id: 'cnpg', name: 'Postgres (CNPG)', line: 'Primary, replicas, failovers and backups.', image: cnpg },
  { id: 'redis', name: 'Redis viewer', line: 'Keys, values and memory, read-only.', image: redis },
];
