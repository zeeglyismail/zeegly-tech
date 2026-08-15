# CLAUDE.md — zeegly.tech portfolio

Context for Claude CLI sessions on this repo. Read this before suggesting code
or architecture. The decisions below were already reasoned through — don't
re-litigate them unless new evidence appears.

---

## 1. What this is

The personal portfolio of **Md. Ismail Hossain**, DevOps Engineer, served at
**https://zeegly.tech** (and `www.zeegly.tech`).

It is a **static site**. There is no backend, no database, no API. Everything is
pre-rendered at build time into plain HTML/CSS/JS.

---

## 2. Stack — and why

| Layer | Choice | Why |
|---|---|---|
| Framework | **Astro 5** (`output: 'static'`) | Ships zero JS by default; only interactive components hydrate |
| UI islands | **React 18** | Needed for the motion components; loaded per-island, not globally |
| Styling | **Tailwind CSS 4** (via `@tailwindcss/vite`) | Utility-first; tokens live in `src/styles/global.css` under `@theme` |
| Animation | **Framer Motion 11** | Scroll-linked transforms, reveals, counters |
| Smooth scroll | **Lenis** | Inertial scrolling — the "journey" feel |
| Serving | **nginx:alpine** | No Node in production; ~60 MB image |
| Edge | **Cloudflare Tunnel** | No open inbound ports; TLS terminated by Cloudflare |

**Why not Next.js:** nothing here needs SSR, ISR, or a Node runtime. Astro
produces a smaller, faster artifact for the same result.

---

## 3. Architecture

```
Internet
   │  HTTPS
   ▼
Cloudflare edge (TLS, CDN, DDoS)
   │  encrypted tunnel, outbound-only from home
   ▼
cloudflared  (tunnel: zeegly1)
   │  http://localhost:8080  (or http://web:80 if using the bundled profile)
   ▼
nginx container  ──serves──►  /usr/share/nginx/html  (the built ./dist)
```

The home machine never exposes an inbound port. `cloudflared` dials **out** and
holds the connection open.

---

## 4. Layout

```
zeegly.tech/
├── src/
│   ├── data/content.ts        ← ALL site text lives here. Start here.
│   ├── pages/index.astro      ← page composition / section order
│   ├── layouts/Layout.astro   ← <head>, SEO meta, JSON-LD, fonts
│   ├── components/            ← React islands (.tsx)
│   │   ├── SmoothScroll.tsx   Lenis + top progress rail
│   │   ├── Nav.tsx            sticky nav, scroll-spy, mobile menu
│   │   ├── Hero.tsx           parallax hero, rotating headline
│   │   ├── Metrics.tsx        count-up stat counters
│   │   ├── Timeline.tsx       scroll-drawn career rail
│   │   ├── Skills.tsx         staggered skill chips
│   │   ├── Projects.tsx       project cards w/ cursor spotlight
│   │   ├── Contact.tsx        contact links + copy-to-clipboard
│   │   └── Reveal.tsx         reusable fade/slide-in wrapper
│   └── styles/global.css      design tokens + utilities
├── public/assets/             profile.png, CV pdf
├── deploy/
│   ├── nginx.conf             server config
│   └── security-headers.conf  shared header snippet
├── Dockerfile                 multi-stage: node build → nginx serve
└── docker-compose.yml         `web` + optional `cloudflared` profile
```

---

## 5. Common tasks

**Change any text, metric, job, project, or skill** → edit `src/data/content.ts`
only. Components read from it; they should not contain hard-coded copy.

**Replace the photo** → overwrite `public/assets/profile.png`, keep the filename.
Portrait aspect (~4:5) looks best. No code change needed.

**Update the CV** → replace `public/assets/Md_Ismail_Hossain_DevOps_Engineer_CV.pdf`.
If the filename changes, update `person.cv` in `content.ts`.

**Add a section** → build the component, then compose it in `src/pages/index.astro`
and add an entry to `nav` in `content.ts`.

**Deploy after any change**

```bash
docker compose up -d --build
```

---

## 6. Rules that matter

- **Content belongs in `content.ts`**, never inline in a component.
- **Hydration is opt-in.** Use `client:visible` for below-the-fold islands;
  reserve `client:load` for `Nav`, `Hero`, and `SmoothScroll`. Adding
  `client:load` everywhere defeats the point of using Astro.
- **`add_header` in nginx does not inherit.** Any `location` block that sets its
  own `add_header` silently drops every inherited one — so it must
  `include /etc/nginx/snippets/security-headers.conf`. This bit us once already.
- **`log_format` is http-context only.** It must stay above the `server` block
  in `deploy/nginx.conf`, not inside it.
- **Respect `prefers-reduced-motion`.** Lenis is not started when the user asks
  for reduced motion, and CSS neutralises transitions. Keep new animation behind
  that check.
- **Never commit `.env`.** It holds the Cloudflare tunnel token. Only
  `.env.example` is tracked.
- **No secrets, no client IPs, no internal hostnames** in committed content —
  this repo is public-facing.

---

## 7. Verify before declaring done

```bash
npm run build                     # must succeed
docker compose up -d --build
curl -s http://localhost:8080/healthz            # -> ok
curl -sI http://localhost:8080/ | grep -i content-security-policy   # must exist
```

Then open the site and scroll the whole page — the timeline rail should draw,
counters should count, and nothing should jump.

---

## 8. Deployment (Cloudflare Tunnel)

Two supported shapes:

**A. cloudflared already runs on the host (current setup — tunnel `zeegly1`)**

`docker compose up -d` publishes the site on host port **8080**. In the
Cloudflare Zero Trust dashboard add public hostnames pointing at
`http://localhost:8080`:

| Hostname | Service |
|---|---|
| `zeegly.tech` | `http://localhost:8080` |
| `www.zeegly.tech` | `http://localhost:8080` |

Cloudflare creates the proxied DNS records automatically.

**B. Run the tunnel in compose too**

```bash
cp .env.example .env      # paste TUNNEL_TOKEN
docker compose --profile tunnel up -d
```

Then point the public hostname at `http://web:80` (container-to-container) and
the host port becomes unnecessary.

---

## 9. Working preferences

- English. Technical terms stay in English.
- One step at a time; verify each piece before wiring the next.
- Prove it works (build it, curl it) rather than assuming.
- Don't add dependencies without a clear reason — the value here is that the
  output is small and boring to operate.
