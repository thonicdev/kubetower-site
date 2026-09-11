import { repoLinks } from './project';
import { release } from './release';

const version = release.version;

export interface Artifact {
  id: string;
  /** The square badge before the title. Absent on the Linux cards. */
  tag?: string;
  title: string;
  description: string;
  /** The button's text: a filename on macOS and Windows, an action on Linux. */
  label: string;
  /** The release asset the button points at. */
  asset: string;
  size: string;
  /** The accent button, or the quieter one beside it. */
  variant: 'primary' | 'secondary';
  /** The download glyph. The Linux buttons carry none. */
  icon?: boolean;
}

export interface CommandSegment {
  text: string;
  tone?: 'primary' | 'warning' | 'tertiary';
}

export interface DownloadPlatform {
  id: string;
  name: string;
  /** The icon on the selector card and in the panel header. */
  icon: string;
  /** The line under the platform name on the selector card. */
  blurb: string;
  /** The selector card's button. */
  action: string;
  actionIcon: string;
  panelTitle: string;
  panelLede: string;
  /** What the platform needs, at the foot of the panel. */
  requirement: string;
  footerLink: { label: string; href: string; external?: boolean };
  artifacts?: Artifact[];
  /** Columns the artefact cards take from md up. */
  columns?: 2 | 3;
  /** Kubernetes ships a command rather than files. */
  command?: CommandSegment[][];
}

/**
 * Where an artefact comes from.
 *
 * GitHub's latest-release endpoint serves the newest release's copy of a named
 * asset, so no URL here carries the version in its path — only the filename
 * does, and that comes from release.version.
 */
export function assetHref(asset: string): string {
  return `${repoLinks.releases}/latest/download/${asset}`;
}

/** The checksum file every release publishes. */
export const checksumsHref = assetHref('checksums.txt');

export const downloadIntro = {
  titleLead: 'Get',
  titleAccent: 'kubetower',
  lede: 'Native multi-cluster console for your workstation or cluster. Single binary, no daemon, instant boot.',
} as const;

export const downloadPlatforms: DownloadPlatform[] = [
  {
    id: 'macos',
    name: 'macOS',
    icon: 'lucide:laptop',
    blurb: 'Apple Silicon and Intel architectures.',
    action: 'Download for macOS',
    actionIcon: 'lucide:download',
    panelTitle: 'Download for macOS',
    panelLede: 'Native universal packages for Apple Silicon and Intel',
    requirement: 'Require macOS 12 (Monterey) or later',
    footerLink: { label: 'View release notes', href: repoLinks.releases, external: true },
    columns: 2,
    artifacts: [
      {
        id: 'arm64',
        tag: 'M',
        title: 'Apple Silicon',
        description: 'Optimized native binary for Apple silicon hardware acceleration.',
        label: `kubetower-${version}-arm64.dmg`,
        asset: `kubetower-${version}-arm64.dmg`,
        size: '~48.2 MB',
        variant: 'primary',
        icon: true,
      },
      {
        id: 'x64',
        tag: 'x64',
        title: 'Intel Mac',
        description: 'Dedicated build for older 64-bit Intel-based Macintosh workstations.',
        label: `kubetower-${version}-x64.dmg`,
        asset: `kubetower-${version}-x64.dmg`,
        size: '~52.1 MB',
        variant: 'primary',
        icon: true,
      },
    ],
  },
  {
    id: 'windows',
    name: 'Windows',
    icon: 'simple-icons:windows',
    blurb: 'Direct 64-bit installer and portable zip archive.',
    action: 'Download for Windows',
    actionIcon: 'lucide:download',
    panelTitle: 'Download for Windows',
    panelLede: 'Standalone direct installer and zip package for Windows 10 / 11',
    requirement: 'Require Windows 10 / 11',
    footerLink: { label: 'View release notes', href: repoLinks.releases, external: true },
    columns: 2,
    artifacts: [
      {
        id: 'exe',
        tag: 'EXE',
        title: 'Windows Setup (.exe)',
        description: 'Standard Windows desktop installation wizard with auto-updating.',
        label: `kubetower-${version}-setup.exe`,
        asset: `kubetower-${version}-setup.exe`,
        size: '~56.4 MB',
        variant: 'primary',
        icon: true,
      },
      {
        id: 'zip',
        tag: 'ZIP',
        title: 'Portable Archive (.zip)',
        description: 'Zero-install portable binary. Extract and run directly without administrator privileges.',
        label: `kubetower-${version}-win-x64.zip`,
        asset: `kubetower-${version}-win-x64.zip`,
        size: '~53.8 MB',
        variant: 'secondary',
        icon: true,
      },
    ],
  },
  {
    id: 'linux',
    name: 'Linux',
    icon: 'lucide:square-terminal',
    blurb: 'Debian (.deb), Fedora (.rpm), and AppImage binaries.',
    action: 'Download for Linux',
    actionIcon: 'lucide:download',
    panelTitle: 'Download for Linux',
    panelLede: 'Universal AppImage and native package distributions',
    requirement: 'Require glibc 2.28+ / Linux kernel 4.19+',
    footerLink: { label: 'View release notes', href: repoLinks.releases, external: true },
    columns: 3,
    artifacts: [
      {
        id: 'deb',
        title: 'Debian / Ubuntu',
        description: 'For Ubuntu, Debian, Linux Mint, and Pop!_OS.',
        label: 'Download .deb',
        asset: `kubetower-${version}-amd64.deb`,
        size: '~46.8 MB',
        variant: 'primary',
      },
      {
        id: 'rpm',
        title: 'Fedora / RHEL',
        description: 'For Fedora, Rocky Linux, Alma, and Red Hat Enterprise.',
        label: 'Download .rpm',
        asset: `kubetower-${version}-x86_64.rpm`,
        size: '~47.4 MB',
        variant: 'primary',
      },
      {
        id: 'appimage',
        title: 'AppImage',
        description: 'Universal executable for any Linux distro. Just chmod +x.',
        label: 'Download .AppImage',
        asset: `kubetower-${version}-x86_64.AppImage`,
        size: '~55.2 MB',
        variant: 'secondary',
      },
    ],
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    icon: 'simple-icons:kubernetes',
    blurb: 'OCI Helm chart deployment with secured RBAC.',
    action: 'Deploy on Cluster',
    actionIcon: 'lucide:ship-wheel',
    panelTitle: 'Deploy to Kubernetes',
    panelLede: 'In-cluster deployment for Kubernetes',
    requirement: 'Requires Helm v3.8.0+',
    footerLink: { label: 'Cluster deployment documentation', href: '/docs/architecture' },
    command: [
      [
        { text: 'helm', tone: 'primary' },
        { text: ' install kubetower oci://ghcr.io/thonicdev/charts/kubetower \\' },
      ],
      [{ text: '  --version ' }, { text: version, tone: 'warning' }, { text: ' \\' }],
      [{ text: '  --namespace ' }, { text: 'kubetower-system', tone: 'tertiary' }, { text: ' \\' }],
      [{ text: '  --create-namespace' }],
    ],
  },
];

/** The command as one line, for the clipboard. */
export function commandLine(platform: DownloadPlatform): string {
  return (platform.command ?? [])
    .map((line) => line.map((segment) => segment.text).join(''))
    .map((line) => line.replace(/\s*\\$/, ''))
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}
