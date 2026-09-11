import overview from '~/assets/screenshots/overview.png';
import pods from '~/assets/screenshots/pods.png';

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
    alt: 'A cluster overview: CPU, memory and pod requests as ring gauges, a workload phase bar, and per-kind counts for deployments, statefulsets, daemonsets, jobs, cronjobs and pods.',
    image: overview,
  },
  {
    id: 'pods',
    title: 'Pods',
    alt: 'A pod list spanning namespaces, with readiness, status, restart count, CPU, memory, container count, node, QoS class and age columns, including pods in Error, ImagePullBackOff and Pending states.',
    image: pods,
  },
];
