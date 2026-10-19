import { repoLinks } from './project';

/**
 * Stands for the release version wherever one appears. The site carries no
 * version of its own: the download page asks GitHub for the newest stable
 * release in the visitor's browser and substitutes it here, and shows nothing
 * versioned when GitHub does not answer (ReleaseStatus.astro).
 */
export const VERSION_TOKEN = '{version}';

const version = VERSION_TOKEN;

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
  /** The segment is the release version: its line is shown only once one is known. */
  version?: boolean;
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
  /** Shown above the downloads, before anyone clicks one. */
  notice?: UnsignedNotice;
}

/** Plain text, with the words a user clicks or reads on screen in bold. */
export type Rich = (string | { strong: string })[];

/**
 * What an unsigned build does on first run, and what to do about it.
 *
 * Rendered above the download buttons rather than after them, and never hidden
 * behind the release check: the warning is what a visitor meets first, so the
 * page says so before the click. Remove it when the builds are signed.
 */
export interface UnsignedNotice {
  title: string;
  lede: Rich;
  /** What the system shows, and what to do about it. */
  steps: { shows: string; what: Rich }[];
  verify: {
    lede: string;
    shell: string;
    /** {version} is replaced in the browser once the release is known. */
    lines: string[];
    result: string;
  };
}

/** The checksum file every release publishes. */
export const checksumsAsset = 'checksums.txt';

/** Whether a command line names the release version. */
export const isVersionLine = (line: CommandSegment[]) => line.some((segment) => segment.version);

export const downloadIntro = {
  titleLead: 'Get',
  titleAccent: 'kubetower',
  lede: 'Native multi-cluster console for your workstation or cluster. Single binary, no daemon, instant boot.',
} as const;

const macosNotice: UnsignedNotice = {
  title: 'This build is not signed yet',
  lede: [
    'Signing and notarisation are coming. Until then macOS refuses to open KubeTower the first time, and ',
    { strong: 'the warning is expected' },
    `. Check the file against ${checksumsAsset} before you open it.`,
  ],
  steps: [
    {
      shows: '“KubeTower” cannot be opened because Apple cannot check it for malicious software.',
      what: [
        'Open ',
        { strong: 'System Settings → Privacy & Security' },
        ', find the message about KubeTower, click ',
        { strong: 'Open Anyway' },
        ' and confirm.',
      ],
    },
  ],
  verify: {
    lede: `In Terminal, from the folder holding the download and ${checksumsAsset}:`,
    shell: 'Terminal',
    lines: [`grep 'kubetower-${VERSION_TOKEN}-arm64.dmg' ${checksumsAsset} | shasum -a 256 --check`],
    result: 'It prints the file name followed by OK. For the Intel build, use the x64 file’s name.',
  },
};

const windowsNotice: UnsignedNotice = {
  title: 'This build is not signed yet',
  lede: [
    'Code signing is coming. Until then Windows warns before the first run, and ',
    { strong: 'the warning is expected' },
    `. Check the file against ${checksumsAsset} before you run it.`,
  ],
  steps: [
    {
      shows: 'SmartScreen: “Windows protected your PC”, with the publisher shown as “Unknown publisher”.',
      what: ['Click ', { strong: 'More info' }, ', then ', { strong: 'Run anyway' }, '.'],
    },
    {
      shows: 'Smart App Control on, as on many new Windows 11 installs: the program is blocked.',
      what: [
        'There is ',
        { strong: 'no Run anyway and no per-app override' },
        '. The zip holds the same unsigned program, so do not count on it either. Run KubeTower in a cluster instead, with the ',
        { strong: 'Kubernetes' },
        ' install. Turning Smart App Control off also works, but on most Windows 11 versions it cannot be turned back on without resetting Windows.',
      ],
    },
  ],
  verify: {
    lede: `In PowerShell, from the folder holding the download and ${checksumsAsset}:`,
    shell: 'PowerShell',
    lines: [
      `$file = 'kubetower-${VERSION_TOKEN}-setup.exe'`,
      `$want = ((Select-String -Path ${checksumsAsset} -SimpleMatch $file).Line -split '\\s+')[0]`,
      '(Get-FileHash $file -Algorithm SHA256).Hash -eq $want',
    ],
    result: 'It prints True when the file is the one published. For the zip, put its name in $file.',
  },
};

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
    notice: macosNotice,
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
    notice: windowsNotice,
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
    footerLink: { label: 'Cluster deployment documentation', href: '/docs/helm' },
    command: [
      [
        { text: 'helm', tone: 'primary' },
        { text: ' install kubetower oci://ghcr.io/thonicdev/charts/kubetower \\' },
      ],
      [{ text: '  --version ' }, { text: version, tone: 'warning', version: true }, { text: ' \\' }],
      [{ text: '  --namespace ' }, { text: 'kubetower-system', tone: 'tertiary' }, { text: ' \\' }],
      [{ text: '  --create-namespace' }],
    ],
  },
];

/**
 * The command as one line, for the clipboard. Without the version, the lines
 * naming it are left out, which is what the page shows until one is known.
 */
export function commandLine(platform: DownloadPlatform, withVersion: boolean): string {
  return (platform.command ?? [])
    .filter((line) => withVersion || !isVersionLine(line))
    .map((line) => line.map((segment) => segment.text).join(''))
    .map((line) => line.replace(/\s*\\$/, ''))
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}
