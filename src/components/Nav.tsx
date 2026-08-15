import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { nav, person, site } from '../data/content';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight the section currently in view.
  useEffect(() => {
    const ids = nav.map((n) => n.href.slice(1));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-[var(--color-line)] bg-[var(--color-ink)]/85 backdrop-blur-lg'
          : 'border-b border-transparent'
      }`}
    >
      <nav className="container-x flex h-[72px] items-center justify-between">
        <a
          href="#top"
          className="group font-mono text-sm font-semibold tracking-tight text-[var(--color-fg)]"
        >
          <span className="text-[var(--color-accent)]">~/</span>
          {site.domain}
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {nav.map((n) => {
            const isActive = active === n.href.slice(1);
            return (
              <a
                key={n.href}
                href={n.href}
                className={`relative rounded-md px-3.5 py-2 text-sm transition-colors ${
                  isActive
                    ? 'text-[var(--color-fg)]'
                    : 'text-[var(--color-muted)] hover:text-[var(--color-fg)]'
                }`}
              >
                {n.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-md bg-[var(--color-surface-2)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
          <a
            href={person.cv}
            download
            className="ml-2 rounded-md border border-[var(--color-line-2)] px-3.5 py-2 text-sm font-medium transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          >
            CV
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-[var(--color-line)] md:hidden"
        >
          <div className="space-y-[5px]">
            <span
              className={`block h-px w-5 bg-[var(--color-fg)] transition-transform ${
                open ? 'translate-y-[6px] rotate-45' : ''
              }`}
            />
            <span className={`block h-px w-5 bg-[var(--color-fg)] ${open ? 'opacity-0' : ''}`} />
            <span
              className={`block h-px w-5 bg-[var(--color-fg)] transition-transform ${
                open ? '-translate-y-[6px] -rotate-45' : ''
              }`}
            />
          </div>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-[var(--color-line)] bg-[var(--color-ink)]/95 backdrop-blur md:hidden"
          >
            <div className="container-x flex flex-col py-3">
              {nav.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-[var(--color-line)]/60 py-3 text-sm text-[var(--color-muted)] last:border-0"
                >
                  {n.label}
                </a>
              ))}
              <a
                href={person.cv}
                download
                className="py-3 text-sm font-semibold text-[var(--color-accent)]"
              >
                Download CV
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
