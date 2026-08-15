import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { person, hero, heroWords } from '../data/content';

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  // Layers drift at different rates as you scroll away -> depth.
  const yTitle = useTransform(scrollYProgress, [0, 1], ['0%', '38%']);
  const yGrid = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  const [wordIndex, setWordIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setWordIndex((i) => (i + 1) % heroWords.length), 2600);
    return () => clearInterval(id);
  }, []);

  // Cursor-following glow
  const glowRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--x', `${e.clientX - r.left}px`);
      el.style.setProperty('--y', `${e.clientY - r.top}px`);
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-16"
    >
      {/* Blueprint grid */}
      <motion.div style={{ y: yGrid }} className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-bg absolute inset-0 opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--color-ink)]" />
      </motion.div>
      <div ref={glowRef} className="glow pointer-events-none absolute inset-0 -z-10" />

      <motion.div style={{ y: yTitle, opacity, scale }} className="container-x">
        <div className="grid items-center gap-14 lg:grid-cols-[1.35fr_0.65fr]">
          {/* ── Copy ── */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-[var(--color-line-2)] bg-[var(--color-surface)]/60 px-4 py-1.5 font-mono text-xs tracking-wide text-[var(--color-muted)] backdrop-blur"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent)] opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
              </span>
              {hero.kicker}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.08 }}
              className="text-[2.6rem] font-extrabold leading-[1.06] tracking-tight sm:text-6xl lg:text-[4.4rem]"
            >
              {person.name.split(' ').slice(-2).join(' ')}
              <span className="mt-3 block text-[1.55rem] font-semibold leading-tight text-[var(--color-muted)] sm:text-3xl lg:text-[2.4rem]">
                {hero.headlinePrefix}{' '}
                <span className="relative inline-block align-top">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={wordIndex}
                      initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: -16, filter: 'blur(6px)' }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="text-gradient inline-block font-bold"
                    >
                      {heroWords[wordIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-7 max-w-2xl text-[1.02rem] leading-relaxed text-[var(--color-muted)]"
            >
              {hero.blurb}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <a
                href="#work"
                className="group inline-flex items-center gap-2 rounded-lg bg-[var(--color-accent)] px-5 py-2.5 text-sm font-semibold text-[var(--color-ink)] transition hover:bg-[var(--color-accent-2)]"
              >
                View my work
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </a>
              <a
                href={person.cv}
                download
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-line-2)] px-5 py-2.5 text-sm font-semibold text-[var(--color-fg)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                Download CV
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-2 py-2.5 text-sm font-medium text-[var(--color-muted)] transition hover:text-[var(--color-fg)]"
              >
                Get in touch
              </a>
            </motion.div>
          </div>

          {/* ── Portrait ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-[300px] lg:max-w-none"
          >
            <div className="absolute -inset-3 rounded-2xl bg-gradient-to-tr from-[var(--color-accent)]/25 to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-[var(--color-line-2)] bg-[var(--color-surface)]">
              <img
                src={person.photo}
                alt={person.name}
                width={423}
                height={529}
                loading="eager"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/70 to-transparent p-4 pt-10">
                <p className="font-mono text-[0.7rem] text-[var(--color-accent)]">
                  {person.location}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        style={{ opacity }}
        className="absolute inset-x-0 bottom-7 flex justify-center"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 9, 0] }}
          transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 font-mono text-[0.65rem] tracking-[0.2em] text-[var(--color-dim)]"
        >
          SCROLL
          <span className="h-9 w-px bg-gradient-to-b from-[var(--color-accent)] to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
