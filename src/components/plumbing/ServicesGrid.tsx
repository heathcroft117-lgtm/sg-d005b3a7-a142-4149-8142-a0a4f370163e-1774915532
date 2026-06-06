import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const services = [
  {
    icon: '🚰',
    name: 'Faucet Installation',
    desc: 'All types of kitchen & bathroom faucets. Leak-free performance guaranteed.',
    color: '#60a5fa',
  },
  {
    icon: '🔧',
    name: 'Faucet Repair',
    desc: 'Fix leaks, drips, low pressure, and damaged fixtures fast.',
    color: '#f5a623',
  },
  {
    icon: '🔍',
    name: 'Leak Detection',
    desc: 'Non-invasive electronic detection for hidden leaks in pipes and walls.',
    color: '#34d399',
  },
  {
    icon: '🔩',
    name: 'Pipe Repair',
    desc: 'Damaged, leaking, or burst pipes handled with fast emergency response.',
    color: '#e8602c',
  },
  {
    icon: '🚿',
    name: 'Shower Installation & Repair',
    desc: 'All shower types with proper sealing, drainage, and waterproofing.',
    color: '#a78bfa',
  },
  {
    icon: '🚽',
    name: 'Toilet Installation & Repair',
    desc: 'All toilet types including clogs, leaks, and flushing problems.',
    color: '#38bdf8',
  },
  {
    icon: '♨️',
    name: 'Water Heater Services',
    desc: 'Tank and tankless water heater installation and repair. Same-day.',
    color: '#f87171',
  },
  {
    icon: '💧',
    name: 'Plumbing Leak Repair',
    desc: 'Pipes, faucets, and fixtures. Fast response to minimize water damage.',
    color: '#4ade80',
  },
  {
    icon: '🏊',
    name: 'Pool Plumbing Repair',
    desc: 'Leaks, pipe issues, and circulation problems for pools and spas.',
    color: '#2dd4bf',
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col p-6 rounded-2xl cursor-default transition-all duration-300"
      style={{
        background: hovered ? `rgba(26,58,110,0.55)` : 'rgba(26,58,110,0.3)',
        border: hovered ? `1px solid ${service.color}40` : '1px solid rgba(255,255,255,0.07)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered ? `0 20px 40px rgba(0,0,0,0.3), 0 0 20px ${service.color}15` : '0 4px 16px rgba(0,0,0,0.2)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* 3D-style icon with perspective effect */}
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 text-2xl transition-all duration-300"
        style={{
          background: hovered
            ? `linear-gradient(135deg, ${service.color}25, ${service.color}10)`
            : `linear-gradient(135deg, ${service.color}18, rgba(26,58,110,0.2))`,
          border: `1px solid ${service.color}35`,
          transform: hovered ? 'scale(1.1) rotateY(10deg) rotateX(5deg)' : 'scale(1) rotateY(0) rotateX(0)',
          boxShadow: hovered ? `0 8px 16px ${service.color}25` : 'none',
          perspective: '200px',
        }}
        aria-hidden="true"
      >
        <motion.span
          animate={hovered ? { rotate: [0, -10, 10, 0], scale: [1, 1.15, 1] } : {}}
          transition={{ duration: 0.5 }}
          className="text-2xl"
        >
          {service.icon}
        </motion.span>
      </div>

      <h3
        className="text-lg font-bold mb-2 leading-tight"
        style={{ color: '#f9f6f0', fontFamily: "'DM Sans', sans-serif" }}
      >
        {service.name}
      </h3>
      <p
        className="text-sm leading-relaxed flex-1"
        style={{ color: 'rgba(249,246,240,0.65)', fontFamily: "'DM Sans', sans-serif" }}
      >
        {service.desc}
      </p>

      {/* Bottom accent line */}
      <div
        className="mt-4 h-0.5 rounded-full transition-all duration-300"
        style={{
          background: `linear-gradient(90deg, ${service.color}, transparent)`,
          width: hovered ? '100%' : '40%',
        }}
      />

      {/* "Learn More" on hover */}
      <motion.div
        initial={false}
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 4 }}
        transition={{ duration: 0.2 }}
        className="mt-3 flex items-center gap-1"
        style={{ color: service.color }}
      >
        <span className="text-xs font-semibold tracking-wide uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>Get Quote</span>
        <span className="text-sm">→</span>
      </motion.div>
    </motion.article>
  );
}

export default function ServicesGrid() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="services" className="py-20 lg:py-28" style={{ backgroundColor: '#0a1628' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div
            className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
            style={{ background: 'rgba(232,96,44,0.12)', color: '#e8602c', border: '1px solid rgba(232,96,44,0.25)' }}
          >
            What We Fix
          </div>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl mb-4"
            style={{ fontFamily: "'Bebas Neue', sans-serif", color: '#f9f6f0' }}
          >
            PLUMBING SERVICES
            <br />
            <span style={{ WebkitTextStroke: '1px #e8602c', color: 'transparent' }}>WE HANDLE IT ALL</span>
          </h2>
          <p
            className="text-base sm:text-lg max-w-2xl mx-auto"
            style={{ color: 'rgba(249,246,240,0.65)', fontFamily: "'DM Sans', sans-serif" }}
          >
            From emergency repairs to full installations — fast, honest, and done right the first time.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <ServiceCard key={service.name} service={service} index={i} />
          ))}
        </div>

        {/* CTA below grid */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex justify-center mt-12"
        >
          <a
            href="tel:4372186580"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-white text-base transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #e8602c, #f5a623)', boxShadow: '0 8px 24px rgba(232,96,44,0.35)' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
            </svg>
            Call Now — (437) 218-6580
          </a>
        </motion.div>
      </div>
    </section>
  );
}
