import overview from '~/assets/screenshots/overview.png';
import drawer from '~/assets/screenshots/drawer.png';
import logs from '~/assets/screenshots/logs.png';

export interface Screenshot {
  id: string;
  /** Shown in the frame's title bar and read out by the slide's label. */
  title: string;
  /** Describes the screen for anyone who cannot see it. Never "screenshot of…". */
  alt: string;
  image: ImageMetadata;
}

/**
 * The captures shown under the hero.
 *
 * Adding a third is adding an entry: the slider sizes its dots, its arrows and
 * its keyboard range from the length of this array.
 */
export const screenshots: Screenshot[] = [
  {
    id: 'overview',
    title: 'Cluster overview',
    alt: 'A cluster overview: CPU, memory and pod requests as ring gauges, CPU and memory used over time, and the workloads by phase with deployments, statefulsets, daemonsets, jobs, cronjobs and pods counted.',
    image: overview,
  },
  {
    id: 'drawer',
    title: 'Deployment details',
    alt: "A deployment list with one deployment's drawer open beside it: its summary, image, rollout strategy and conditions, labels, and the pods and config map it is related to.",
    image: drawer,
  },
  {
    id: 'logs',
    title: 'Pod logs',
    alt: "A pod list with the dock open below it, following one pod's logs line by line.",
    image: logs,
  },
];
