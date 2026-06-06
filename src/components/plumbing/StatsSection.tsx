import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

function AnimatedNumber({ target, suffix = '', prefix = '' }: { target: number | string; suffix?: string; prefix?: string }) {
  const [display, setDisplay] = useState('0');
  const isNumber = typeof target === 'number';

  useEffect(() => {
    if (!isNumber) {
      setDisplay(target as string);
      return;
    }
    const end = target as number;
    const duration = 1800;
    const step = 16;
    const increment = (end / (duration / step));
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setDisplay(end % 1 === 0 ? String(end) : end.toFixed(1));
        clearInterval(timer);
      } else {
        setDisplay(end % 1 === 0 ? String(Math.floor(current)) : current.toFixed(1));
      }
    }, step);
    return () => clearInterval(timer);
  }, [target, isNumber]);

  return <>{prefix}{display}{suffix}</>;
}

const stats = [
  { target: 5.0, suffix: '', label: 'Star Rating', sublabel: 'On Google Reviews', icon: '⭐' },
  { target: 83, suffix: '+', label: 'Happy Clients', sublabel: 'Verified reviews', icon: '💬' },
  { target: '24/7', suffix: '', label: 'Availability', sublabel: 'Emergency response', icon: '🕐' },
  { target: 100, suffix: '%', label: 'Satisfaction', sublabel: 'Guaranteed', icon: '✅' },
];

export default function StatsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section
      className="py-16 lg:py-20"
      style={{
        background: 'linear-gradient(135deg, #0d1f3a 0%, #1a3a6e 50%, #0d1f3a 100%)',
        borderTop: '1px solid rgba(232,96,44,0.15)',
        borderBottom: '1px solid rgba(232,96,44,0.15)',
      }}
      aria-label="Business statistics"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center text-center p-6 rounded-2xl group"
              style={{
                background: 'rgba(10,22,40,0.5)',
                border: '1px solid rgba(255,255,255,0.07)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <span className="text-3xl mb-3">{stat.icon}</span>
              <div
                className="text-4xl sm:text-5xl font-extrabold mb-1"
                style={{ fontFamily: "'Bebas Neue', sans-serif", color: '#f5a623', letterSpacing: '0.04em' }}
              >
                {inView ? (
                  <AnimatedNumber
                    target={stat.target}
                    suffix={stat.suffix}
                  />
                ) : '0'}
              </div>
              <div
                className="text-sm font-bold mb-0.5 tracking-wide"
                style={{ color: '#f9f6f0', fontFamily: "'DM Sans', sans-serif" }}
              >
                {stat.label}
              </div>
              <div
                className="text-xs"
                style={{ color: 'rgba(249,246,240,0.5)', fontFamily: "'DM Sans', sans-serif" }}
              >
                {stat.sublabel}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
