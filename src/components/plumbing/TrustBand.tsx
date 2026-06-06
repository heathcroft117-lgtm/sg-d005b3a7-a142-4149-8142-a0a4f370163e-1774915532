import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const trustItems = [
  { icon: '🏅', label: 'Licensed & Insured' },
  { icon: '⚡', label: 'Same-Day Service' },
  { icon: '💰', label: 'Upfront Pricing' },
  { icon: '🚨', label: '24/7 Emergency' },
  { icon: '📍', label: 'Local Mississauga' },
];

export default function TrustBand() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section
      id="trust"
      ref={ref}
      aria-label="Trust indicators"
      style={{ background: 'linear-gradient(90deg, #0d1a2f, #1a3a6e, #0d1a2f)', borderTop: '1px solid rgba(232,96,44,0.2)', borderBottom: '1px solid rgba(232,96,44,0.2)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-wrap justify-center lg:justify-between items-center gap-4">
          {trustItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.4, ease: 'easeOut' }}
              className="flex items-center gap-2.5 px-4 py-2 rounded-full group"
              style={{ background: 'rgba(255,255,255,0.04)' }}
            >
              <span className="text-xl" role="img" aria-hidden="true">{item.icon}</span>
              <span
                className="text-sm font-semibold whitespace-nowrap tracking-wide"
                style={{ color: 'rgba(249,246,240,0.9)', fontFamily: "'DM Sans', sans-serif" }}
              >
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
