/**
 * ────────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH FOR ALL SITE CONTENT
 *  Edit this file to change any text on the site. No component
 *  edits needed. After editing: `docker compose up -d --build`
 * ────────────────────────────────────────────────────────────────
 */

export const site = {
  domain: 'zeegly.tech',
  url: 'https://zeegly.tech',
  title: 'Md. Ismail Hossain — DevOps Engineer',
  description:
    'DevOps Engineer specialising in Kubernetes, high-availability databases, observability and AI-Ops. Building resilient production infrastructure in Dhaka, Bangladesh.',
};

export const person = {
  name: 'Md. Ismail Hossain',
  firstName: 'Ismail',
  role: 'DevOps Engineer',
  // Swap the photo by replacing /public/assets/profile.png (keep the same filename).
  photo: '/assets/profile.png',
  cv: '/assets/Md_Ismail_Hossain_DevOps_Engineer_CV.pdf',
  location: 'Dhaka, Bangladesh',
  email: 'zeeglyismail@gmail.com',
  phone: '+880 1580 381235',
  github: 'https://github.com/zeeglyismail',
  githubLabel: 'github.com/zeeglyismail',
  linkedin: 'https://www.linkedin.com/in/md-ismail-hossain-594a531b1',
  linkedinLabel: 'md-ismail-hossain',
};

/** Rotating words in the hero headline. */
export const heroWords = [
  'Kubernetes clusters',
  'high-availability databases',
  'observability pipelines',
  'AI-Ops agents',
];

export const hero = {
  kicker: 'DevOps Engineer · Dhaka, Bangladesh',
  headlinePrefix: 'I build and operate',
  blurb:
    'Assistant DevOps Engineer at Onnorokom Projukti — running production Kubernetes, self-managed databases, and end-to-end observability. I like the problems that live where systems fail.',
};

/** Animated counters. `value` is the number, `suffix`/`prefix` decorate it. */
export const metrics = [
  {
    value: 10,
    prefix: '',
    suffix: '×',
    label: 'Faster DB failover',
    detail: 'Redis write downtime cut from ~5s to ~500ms',
  },
  {
    value: 47000,
    prefix: '',
    suffix: '+',
    label: 'QPS sustained',
    detail: 'Envoy Gateway ingress at 6 ms p99',
  },
  {
    value: 346155,
    prefix: '',
    suffix: '',
    label: 'Logs classified',
    detail: 'Reduced to 378 patterns at 99.9% coverage',
  },
  {
    value: 151000,
    prefix: '~',
    suffix: '',
    label: 'Jobs / day',
    detail: 'Self-hosted Cronicle scheduler in production',
  },
];

export const about = {
  title: 'About',
  paragraphs: [
    'I am a DevOps Engineer with hands-on experience running production infrastructure across Kubernetes, high-availability databases, observability and virtualization.',
    'My work sits at the point where things break: reducing database failover from seconds to milliseconds, migrating multi-million-record datastores without downtime, and untangling an Elasticsearch mapping explosion that made dashboards unusable.',
    'Lately I have been building self-hosted AI-Ops agents — LLM-driven anomaly detection and automated root-cause analysis that report straight into the team chat.',
  ],
  facts: [
    { k: 'Current', v: 'Assistant DevOps Engineer, Onnorokom Projukti Ltd.' },
    { k: 'Focus', v: 'Kubernetes · Databases · Observability · AI-Ops' },
    { k: 'Based in', v: 'Dhaka, Bangladesh' },
    { k: 'Education', v: 'B.Sc. in Computer Science & Engineering' },
  ],
};

/** The scroll-driven career timeline. */
export const timeline = [
  {
    period: 'Nov 2025 — Present',
    role: 'Assistant DevOps Engineer',
    org: 'Onnorokom Projukti Ltd.',
    place: 'Dhaka, Bangladesh',
    current: true,
    groups: [
      {
        title: 'Kubernetes & GitOps',
        points: [
          'Built and operate high-availability K3s clusters (3 embedded-etcd control-plane + 5 workers) with MetalLB and Envoy Gateway wildcard-TLS ingress.',
          'Implemented ArgoCD GitOps with auto-sync, self-heal and backup/restore DR — cutting reconciliation from 3 minutes to 30 seconds.',
          'Hardened reliability with PriorityClass preemption and PodDisruptionBudgets, validated on a test cluster before production.',
          'Benchmarked ingress at 47,000+ QPS / 6 ms p99 and cut TCP retransmits ~100× by re-homing the LoadBalancer VIP.',
        ],
      },
      {
        title: 'Databases & High Availability',
        points: [
          'Architected 3-node Redis Sentinel + HAProxy/Keepalived clusters, reducing failover write downtime ~10× (5s → ~500ms) with zero code changes.',
          'Migrated 10M+ Redis keys cross-cluster in ~5 minutes at ~45K ops/sec using RedisShake.',
          'Operate a 1-shard × 3-replica ClickHouse cluster with native ON CLUSTER backup/restore to MinIO (S3).',
          'Deployed a 3-node MongoDB replica set and performed byte-level PostgreSQL 17 restores with WAL replay.',
        ],
      },
      {
        title: 'Observability & Logging',
        points: [
          'Eliminated an Elasticsearch mapping explosion — 7,611 fields down to ~25 — removing multi-minute Kibana load times.',
          'Migrated a live 2.6M-document index to date-based indexing with zero downtime via an atomic alias swap.',
          'Built SigNoz + OpenTelemetry observability on k3s and authored 3 custom Python Prometheus exporters.',
          'Built agentless per-hop lag monitoring for a 42-node live-streaming CDN (21 origins, 4 up-PoPs, 17 edge PoPs) — probing LL-HLS playlists as a viewer would, with nothing installed on any CDN node.',
        ],
      },
      {
        title: 'AI-Ops',
        points: [
          'Built an in-cluster AI-Ops platform with kagent — LLM-backed agents that run live PromQL instead of guessing.',
          'Engineered self-hosted agents doing z-score anomaly detection in Prometheus and InfluxDB, auto-correlating with ELK logs into root-cause reports.',
          'Reduced 346,155 log documents to 378 patterns at 99.9% coverage — Platinum-tier analytics on a Basic licence.',
        ],
      },
    ],
  },
  {
    period: '2022 — 2024',
    role: 'System Administrator',
    org: 'Tickets4Travel',
    place: 'On-site, Dhaka',
    current: false,
    groups: [
      {
        title: 'Infrastructure & Support',
        points: [
          'Administered and secured Linux and Windows Server environments — Active Directory, DNS, DHCP, group policies.',
          'Deployed and maintained VMware and Hyper-V virtualization for internal infrastructure.',
          'Configured LAN/Wi-Fi networks, routing, NAT and VPN (PPTP, GRE, Tailscale).',
          'Authored infrastructure, security and disaster-recovery documentation.',
        ],
      },
    ],
  },
];

export const skills = [
  {
    title: 'Containers & Orchestration',
    items: ['Kubernetes (K3s)', 'Docker', 'Helm', 'Kustomize', 'ArgoCD', 'Portainer'],
  },
  {
    title: 'Ingress & Networking',
    items: ['Envoy Gateway', 'Istio', 'MetalLB', 'NGINX', 'HAProxy', 'Keepalived', 'cert-manager'],
  },
  {
    title: 'Observability',
    items: ['Prometheus', 'Grafana', 'SigNoz', 'OpenTelemetry', 'ELK', 'InfluxDB', 'Telegraf'],
  },
  {
    title: 'Databases',
    items: ['Redis / Valkey', 'PostgreSQL', 'MongoDB', 'ClickHouse', 'MySQL', 'OpenSearch'],
  },
  {
    title: 'AI-Ops',
    items: ['kagent', 'HolmesGPT', 'Robusta KRR', 'Log pattern mining', 'Anomaly detection'],
  },
  {
    title: 'CI/CD & IaC',
    items: ['GitLab CI', 'GitHub Actions', 'Terraform', 'Ansible', 'Cronicle', 'Harbor'],
  },
  {
    title: 'Virtualization & Cloud',
    items: ['Proxmox VE', 'Hyper-V', 'VMware', 'CloudStack', 'AWS', 'DigitalOcean'],
  },
  {
    title: 'Storage & Messaging',
    items: ['Ceph', 'MinIO (S3)', 'NFS', 'LVM / ZFS', 'Kafka', 'RabbitMQ'],
  },
  {
    title: 'Media & Streaming',
    items: ['OpenResty / NGINX-RTMP', 'OvenMediaEngine', 'LL-HLS', 'Multi-tier CDN', 'Stream telemetry'],
  },
];

export const projects = [
  {
    name: 'AI-Ops Agent Platform',
    tag: 'AI · Kubernetes',
    blurb:
      'Self-hosted LLM agents that detect anomalies with z-score analysis in Prometheus and InfluxDB, correlate them against ELK error logs, and deliver a root-cause report to Telegram — all under read-only RBAC.',
    stack: ['kagent', 'Ollama', 'Prometheus', 'InfluxDB', 'ELK'],
  },
  {
    name: 'Log Pattern Intelligence',
    tag: 'Observability',
    blurb:
      'An ingest-time classification pipeline that collapsed 346,155 raw log documents into 378 distinct patterns at 99.9% coverage — delivering Platinum-tier pattern analytics on a Basic licence, with hash-based novelty alerting for new error types.',
    stack: ['Elasticsearch', 'Drain3', 'Kibana', 'ElastAlert2'],
  },
  {
    name: 'Live-Streaming CDN Lag Monitoring',
    tag: 'Observability · Video',
    blurb:
      'Agentless per-hop delivery-lag monitoring across a 42-node streaming CDN — 21 OvenMediaEngine origins, 4 up-PoPs and 17 edge PoPs. A dependency-free Python exporter probes LL-HLS playlists exactly as a viewer would and auto-discovers live streams via API, so it answers "which tier is behind, and by how much" with nothing installed on any CDN node.',
    stack: ['OvenMediaEngine', 'OpenResty', 'LL-HLS', 'Prometheus', 'Grafana'],
  },
  {
    name: 'Redis HA & Failover',
    tag: 'Databases',
    blurb:
      'A 3-node Redis Sentinel cluster fronted by HAProxy and Keepalived. Replacing VIP failover with HAProxy connection draining cut write downtime roughly tenfold — without a single line of application change.',
    stack: ['Redis', 'Sentinel', 'HAProxy', 'Keepalived'],
  },
  {
    name: 'Hyper-V → Proxmox Migration',
    tag: 'Virtualization',
    blurb:
      'Migrated production Windows and Linux VMs to Proxmox VE via native VHDX import, engineering a VirtIO/SATA boot fallback that resolved INACCESSIBLE_BOOT_DEVICE failures, plus golden templates that cut provisioning from ~25 minutes to ~3.',
    stack: ['Proxmox VE', 'Hyper-V', 'VirtIO', 'cloud-init'],
  },
  {
    name: 'Overengineered To-Do App',
    tag: 'DevOps Playground',
    blurb:
      'A deliberately over-built CI/CD sandbox: React on Cloudflare Pages and CloudFront, Python backend, PostgreSQL and Redis, with GitHub Actions doing linting, image scanning, multi-platform builds and automated EC2 deploys.',
    stack: ['React', 'Python', 'AWS', 'GitHub Actions'],
    link: 'https://github.com/zeeglyismail',
  },
  {
    name: 'Self-Hosted Infrastructure',
    tag: 'Platform',
    blurb:
      'A running fleet of self-hosted services — GitLab, Harbor with Trivy scanning, MinIO, Supabase, n8n, LiveKit and a Cronicle scheduler handling roughly 151,000 jobs a day.',
    stack: ['GitLab', 'Harbor', 'MinIO', 'Cronicle'],
  },
];

export const certifications = [
  'DevOps — Interactive Cares',
  'System Administration & IT Infrastructure Services — Google (Coursera)',
  'Cisco Certified Network Associate (CCNA 101) — CSL',
  'IT Essentials (Windows, Linux, Virtualization & Cloud) — CSL',
  'MikroTik & FTTx — CSL',
  'Cisco Packet Tracer — Udemy',
];

export const education = [
  {
    degree: 'B.Sc. in Computer Science & Engineering',
    school: 'Bangladesh Institute of Science & Technology',
    year: '2023',
    grade: 'CGPA 3.17',
  },
  {
    degree: 'HSC (Science)',
    school: 'Nikunja Model College',
    year: '2019',
    grade: 'GPA 3.83',
  },
];

export const contact = {
  title: "Let's talk",
  blurb:
    'Open to DevOps, SRE and platform engineering roles. The fastest way to reach me is email — or grab my CV below.',
};

export const nav = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
];
