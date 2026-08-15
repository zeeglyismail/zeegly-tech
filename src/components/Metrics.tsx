import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { metrics } from '../data/content';

function formatNumber(n: number) {
  return Math.round(n).toLocaleString('en-US');
}

function Counter({ to, prefix, suffix }: { to: number; prefix: string; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: 1600, bounce: 0 });
  const text = useTransform(spring, (v) => `${prefix}${formatNumber(v)}${suffix}`);

  useEffect(() => {
    if (inView) mv.set(to);
  }, [inView, to, mv]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{text}</motion.span>
    </span>
  );
}

export default function Metrics() {
  return (
    <section className="relative border-y border-[var(--color-line)] bg-[var(--color-ink-2)]/60 py-16">
      <div className="container-x">
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-12% 0px' }}
              transition={{ duration: 0.6, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              className="group relative"
            >
              <div className="mb-3 h-px w-10 bg-[var(--color-accent)] transition-all duration-500 group-hover:w-20" />
              <div className="text-3xl font-extrabold tracking-tight text-[var(--color-fg)] sm:text-4xl">
                <Counter to={m.value} prefix={m.prefix} suffix={m.suffix} />
              </div>
              <div className="mt-1.5 text-sm font-semibold text-[var(--color-accent)]">
                {m.label}
              </div>
              <p className="mt-1.5 text-[0.82rem] leading-relaxed text-[var(--color-dim)]">
                {m.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
