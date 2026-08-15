import { motion } from 'framer-motion';
import { useRef } from 'react';
import { projects } from '../data/content';

function Card({ p, i }: { p: (typeof projects)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);

  // Spotlight follows the cursor across the card.
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.6, delay: (i % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        ref={ref}
        onMouseMove={onMove}
        className="card group relative h-full overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)]/40"
      >
        {/* spotlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(340px circle at var(--mx) var(--my), rgba(45,212,191,0.08), transparent 70%)',
          }}
        />
        <div className="relative">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-[var(--color-accent)]">
              {p.tag}
            </span>
            {p.link && (
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${p.name}`}
                className="text-[var(--color-dim)] transition hover:text-[var(--color-accent)]"
              >
                ↗
              </a>
            )}
          </div>

          <h3 className="text-lg font-bold tracking-tight">{p.name}</h3>
          <p className="mt-2.5 text-[0.86rem] leading-relaxed text-[var(--color-muted)]">
            {p.blurb}
          </p>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {p.stack.map((s) => (
              <span
                key={s}
                className="rounded border border-[var(--color-line)] bg-[var(--color-ink)]/50 px-2 py-1 font-mono text-[0.66rem] text-[var(--color-dim)]"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {projects.map((p, i) => (
        <Card key={p.name} p={p} i={i} />
      ))}
    </div>
  );
}
