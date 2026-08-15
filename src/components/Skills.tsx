import { motion } from 'framer-motion';
import { skills } from '../data/content';

export default function Skills() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {skills.map((group, gi) => (
        <motion.div
          key={group.title}
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-8% 0px' }}
          transition={{ duration: 0.55, delay: (gi % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="card p-5"
        >
          <h3 className="mb-4 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-[var(--color-accent)]">
            {group.title}
          </h3>
          <ul className="flex flex-wrap gap-1.5">
            {group.items.map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.05 + i * 0.035 }}
                className="cursor-default rounded border border-[var(--color-line)] bg-[var(--color-ink)]/40 px-2.5 py-1.5 text-[0.78rem] text-[var(--color-muted)] transition-colors hover:border-[var(--color-accent)]/50 hover:text-[var(--color-fg)]"
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}
