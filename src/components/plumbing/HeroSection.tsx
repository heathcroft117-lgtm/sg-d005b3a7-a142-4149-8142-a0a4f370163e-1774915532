import { Suspense, lazy, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const PipeScene3D = dynamic(() => import('./PipeScene3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 rounded-full border-2 border-orange-400 border-t-transparent animate-spin" style={{ borderColor: '#e8602c', borderTopColor: 'transparent' }} />
    </div>
  ),
});

const WaterDroplets3D = dynamic(() => import('./WaterDroplets3D'), { ssr: false });

const stats = [
  { value: '5.0', label: 'Stars', icon: '⭐' },
  { value: '83', label: 'Reviews', icon: '💬' },
  { value: '24/7', label: 'Service', icon: '🕐' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #060e1d 0%, #0a1628 40%, #122040 70%, #0a1628 100%)',
      }}
    >
      {/* Water droplets background */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <WaterDroplets3D />
      </div>

      {/* Background gradient orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: 'radial-gradient(circle, #e8602c, transparent)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-8 blur-3xl"
          style={{ background: 'radial-gradient(circle, #1a3a6e, transparent)' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Left: Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-6"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="flex items-center gap-2">
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
                style={{ background: 'rgba(232,96,44,0.15)', border: '1px solid rgba(232,96,44,0.3)', color: '#f5a623' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Available Now · Mississauga & GTA
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl xl:text-7xl leading-none tracking-wide"
              style={{ fontFamily: "'Bebas Neue', sans-serif", color: '#f9f6f0' }}
            >
              MISSISSAUGA&apos;S
              <br />
              <span style={{ WebkitTextStroke: '1px #e8602c', color: 'transparent' }}>MOST TRUSTED</span>
              <br />
              PLUMBER
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg font-medium leading-relaxed max-w-lg"
              style={{ color: 'rgba(249,246,240,0.75)', fontFamily: "'DM Sans', sans-serif" }}
            >
              Licensed · Insured · 24/7 Emergency Response · Upfront Pricing.{' '}
              <em style={{ fontFamily: "'DM Serif Display', serif", color: '#f5a623' }}>Real conversations, honest work.</em>
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
              <a
                href="tel:4372186580"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-white text-base transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #e8602c, #f5a623)',
                  boxShadow: '0 8px 24px rgba(232,96,44,0.45)',
                  fontFamily: "'DM Sans', sans-serif",
                }}
                aria-label="Call Mahmoud Plumbing at (437) 218-6580"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
                </svg>
                Call (437) 218-6580
              </a>

              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-base transition-all duration-200 hover:scale-105"
                style={{
                  border: '2px solid rgba(232,96,44,0.5)',
                  color: '#f9f6f0',
                  fontFamily: "'DM Sans', sans-serif",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#e8602c'; e.currentTarget.style.background = 'rgba(232,96,44,0.08)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(232,96,44,0.5)'; e.currentTarget.style.background = 'transparent'; }}
              >
                Get a Free Quote
              </a>
            </motion.div>

            {/* Stat cards */}
            <motion.div variants={itemVariants} className="flex gap-3 flex-wrap mt-2">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center px-4 py-3 rounded-xl min-w-[90px]"
                  style={{
                    background: 'rgba(26,58,110,0.35)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <span className="text-lg mb-0.5">{stat.icon}</span>
                  <span
                    className="text-2xl font-extrabold leading-tight"
                    style={{ fontFamily: "'Bebas Neue', sans-serif", color: '#f5a623' }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-xs font-medium" style={{ color: 'rgba(249,246,240,0.6)' }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: 3D Pipe Scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[420px] lg:h-[520px] w-full rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(10,22,40,0.5)',
              border: '1px solid rgba(232,96,44,0.15)',
              boxShadow: '0 0 60px rgba(232,96,44,0.08)',
            }}
            aria-label="3D animated pipe system"
          >
            <PipeScene3D />

            {/* Overlay gradient at bottom */}
            <div
              className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
              style={{ background: 'linear-gradient(to top, rgba(10,22,40,0.6), transparent)' }}
            />

            {/* Corner accent */}
            <div
              className="absolute top-4 right-4 text-xs font-semibold px-2 py-1 rounded"
              style={{ background: 'rgba(232,96,44,0.2)', color: '#f5a623', border: '1px solid rgba(232,96,44,0.3)' }}
            >
              LIVE 3D
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer z-10"
        onClick={() => document.querySelector('#trust')?.scrollIntoView({ behavior: 'smooth' })}
        aria-label="Scroll down"
      >
        <span className="text-xs font-medium tracking-widest uppercase" style={{ color: 'rgba(249,246,240,0.4)' }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border flex items-start justify-center pt-1.5"
          style={{ borderColor: 'rgba(249,246,240,0.2)' }}
        >
          <div className="w-1 h-2 rounded-full" style={{ backgroundColor: '#e8602c' }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
