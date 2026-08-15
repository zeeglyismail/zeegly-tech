# zeegly.tech

Personal portfolio of **Md. Ismail Hossain** — DevOps Engineer.
Static site, containerised, served through a Cloudflare Tunnel.

🌐 **https://zeegly.tech**

---

## Stack

**Astro 5** · **React 18** · **Tailwind CSS 4** · **Framer Motion** · **Lenis** · **nginx** · **Docker**

Built to static HTML at compile time and served by nginx — no Node runtime in
production, no database, no open inbound ports.

```
Internet → Cloudflare (TLS/CDN) → cloudflared tunnel → nginx container → static files
```

---

## Quick start

```bash
# Local development (hot reload on http://localhost:4321)
npm install
npm run dev

# Production — build the image and run it
docker compose up -d --build
```

The site is then available at **http://localhost:8080**.

```bash
docker compose logs -f web    # follow logs
docker compose down           # stop
```

---

## Editing content

All copy — headline, metrics, jobs, projects, skills, contact details — lives in
a single file:

```
src/data/content.ts
```

Change it, then redeploy with `docker compose up -d --build`. No component edits
required.

| To change… | Do this |
|---|---|
| Any text or metric | Edit `src/data/content.ts` |
| The profile photo | Replace `public/assets/profile.png` (same filename) |
| The CV | Replace the PDF in `public/assets/` |
| Section order | Edit `src/pages/index.astro` |

---

## Deploying behind Cloudflare Tunnel

**If cloudflared already runs on the host** (tunnel `zeegly1`), point the public
hostnames at the published port:

| Hostname | Service |
|---|---|
| `zeegly.tech` | `http://localhost:8080` |
| `www.zeegly.tech` | `http://localhost:8080` |

**Or run the tunnel inside compose:**

```bash
cp .env.example .env      # add your TUNNEL_TOKEN
docker compose --profile tunnel up -d
```

Then the public hostname targets `http://web:80` and no host port is needed.

---

## Project layout

```
src/
  data/content.ts     all site content (single source of truth)
  pages/index.astro   page composition
  layouts/            <head>, SEO meta, JSON-LD
  components/         React islands — hero, timeline, metrics, etc.
  styles/global.css   design tokens & utilities
public/assets/        photo + CV
deploy/               nginx config & security headers
```

---

## Notes

- Interactive components hydrate individually (`client:visible`), so most of the
  page ships as plain HTML.
- Motion is disabled automatically for visitors with `prefers-reduced-motion`.
- Security headers (CSP, X-Frame-Options, Referrer-Policy, Permissions-Policy)
  are applied in `deploy/`.
- `.env` is gitignored — the tunnel token must never be committed.

---

© Md. Ismail Hossain
