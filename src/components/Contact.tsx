import { motion } from 'framer-motion';
import { useState } from 'react';
import { person } from '../data/content';

type Item = { label: string; value: string; href: string; copy?: string };

const items: Item[] = [
  { label: 'Email', value: person.email, href: `mailto:${person.email}`, copy: person.email },
  {
    label: 'Phone',
    value: person.phone,
    href: `tel:${person.phone.replace(/\s/g, '')}`,
    copy: person.phone,
  },
  { label: 'GitHub', value: person.githubLabel, href: person.github },
  { label: 'LinkedIn', value: person.linkedinLabel, href: person.linkedin },
];

export default function Contact() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(text);
      setTimeout(() => setCopied(null), 1800);
    } catch {
      /* clipboard blocked — the link itself still works */
    }
  };

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((it, i) => (
        <motion.div
          key={it.label}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-8% 0px' }}
          transition={{ duration: 0.5, delay: i * 0.07 }}
          className="card group flex items-center justify-between gap-3 p-4 transition-colors hover:border-[var(--color-accent)]/40"
        >
          <a
            href={it.href}
            target={it.href.startsWith('http') ? '_blank' : undefined}
            rel={it.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="min-w-0 flex-1"
          >
            <div className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-[var(--color-dim)]">
              {it.label}
            </div>
            <div className="mt-1 truncate text-[0.9rem] font-medium text-[var(--color-fg)] transition-colors group-hover:text-[var(--color-accent)]">
              {it.value}
            </div>
          </a>

          {it.copy ? (
            <button
              onClick={() => copy(it.copy!)}
              aria-label={`Copy ${it.label}`}
              className="shrink-0 rounded-md border border-[var(--color-line)] px-2.5 py-1.5 font-mono text-[0.66rem] text-[var(--color-dim)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              {copied === it.copy ? 'copied' : 'copy'}
            </button>
          ) : (
            <span className="shrink-0 text-[var(--color-dim)] transition group-hover:text-[var(--color-accent)]">
              ↗
            </span>
          )}
        </motion.div>
      ))}
    </div>
  );
}
