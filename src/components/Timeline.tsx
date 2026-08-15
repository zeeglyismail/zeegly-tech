import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { timeline } from '../data/content';

/**
 * Career timeline. The vertical rail "draws" itself as you scroll the
 * section — the core of the journey feel.
 */
export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 65%', 'end 60%'],
  });
  const height = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });
  const railHeight = useTransform(height, (v) => `${v * 100}%`);

  return (
    <div ref={ref} className="relative">
      {/* Rail track */}
      <div
        aria-hidden="true"
        className="absolute left-[7px] top-2 hidden h-full w-px bg-[var(--color-line)] sm:block"
      />
      {/* Rail fill — grows with scroll */}
      <motion.div
        aria-hidden="true"
        style={{ height: railHeight }}
        className="absolute left-[7px] top-2 hidden w-px bg-gradient-to-b from-[var(--color-accent)] to-[var(--color-accent-2)] sm:block"
      />

      <div className="space-y-16">
        {timeline.map((job) => (
          <div key={job.role + job.org} className="relative sm:pl-12">
            {/* Node */}
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: '-20% 0px' }}
              transition={{ duration: 0.45, ease: 'backOut' }}
              className="absolute left-0 top-2 hidden h-[15px] w-[15px] items-center justify-center rounded-full border-2 border-[var(--color-accent)] bg-[var(--color-ink)] sm:flex"
            >
              {job.current && (
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-accent)]" />
              )}
            </motion.span>

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-15% 0px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-xl font-bold tracking-tight sm:text-2xl">{job.role}</h3>
                {job.current && (
                  <span className="rounded-full border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10 px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-[var(--color-accent)]">
                    Current
                  </span>
                )}
              </div>
              <p className="mt-1 font-mono text-[0.8rem] text-[var(--color-muted)]">
                {job.org} · {job.place} · <span className="text-[var(--color-dim)]">{job.period}</span>
              </p>
            </motion.div>

            {/* Grouped achievements */}
            <div className="mt-7 grid gap-5 md:grid-cols-2">
              {job.groups.map((g, gi) => (
                <motion.div
                  key={g.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10% 0px' }}
                  transition={{ duration: 0.6, delay: gi * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  className="card group p-5 transition-colors duration-300 hover:border-[var(--color-accent)]/40"
                >
                  <h4 className="mb-3 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-[var(--color-accent)]">
                    {g.title}
                  </h4>
                  <ul className="space-y-2.5">
                    {g.points.map((p) => (
                      <li
                        key={p}
                        className="flex gap-2.5 text-[0.86rem] leading-relaxed text-[var(--color-muted)]"
                      >
                        <span className="mt-[0.42rem] h-1 w-1 shrink-0 rounded-full bg-[var(--color-line-2)] transition-colors group-hover:bg-[var(--color-accent)]" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
