import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? 'rgba(10, 22, 40, 0.96)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          boxShadow: scrolled ? '0 1px 40px rgba(0,0,0,0.4)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(232,96,44,0.15)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="#" onClick={(e) => handleLink(e, '#hero')} className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #e8602c, #f5a623)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M3 12h4m10 0h4M7 12a5 5 0 0 1 10 0" />
                  <circle cx="12" cy="12" r="2" fill="white" stroke="none" />
                  <path d="M12 2v3m0 14v3" />
                </svg>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display text-xl tracking-widest" style={{ color: '#f9f6f0', fontFamily: "'Bebas Neue', sans-serif" }}>MAHMOUD</span>
                <span className="text-xs font-semibold tracking-[0.3em]" style={{ color: '#e8602c' }}>PLUMBING</span>
              </div>
            </a>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLink(e, link.href)}
                  className="text-sm font-medium tracking-wide transition-colors duration-200 hover:text-orange-400"
                  style={{ color: 'rgba(249,246,240,0.8)', fontFamily: "'DM Sans', sans-serif" }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* CTA + hamburger */}
            <div className="flex items-center gap-3">
              <a
                href="tel:4372186580"
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:scale-105 active:scale-95"
                style={{ background: 'linear-gradient(135deg, #e8602c, #f5a623)', boxShadow: '0 4px 12px rgba(232,96,44,0.4)' }}
                aria-label="Call Mahmoud Plumbing"
              >
                <span>📞</span>
                <span>Call Now</span>
              </a>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden flex flex-col gap-1.5 p-2 rounded-md"
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
              >
                <motion.span
                  animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                  className="block w-5 h-0.5 bg-white origin-center transition-all"
                />
                <motion.span
                  animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="block w-5 h-0.5 bg-white"
                />
                <motion.span
                  animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                  className="block w-5 h-0.5 bg-white origin-center transition-all"
                />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 flex flex-col py-8 px-6"
              style={{ backgroundColor: '#0d1e36', borderLeft: '1px solid rgba(232,96,44,0.2)' }}
            >
              <div className="flex justify-between items-center mb-8">
                <span className="font-display text-xl tracking-widest" style={{ color: '#e8602c', fontFamily: "'Bebas Neue', sans-serif" }}>MENU</span>
                <button onClick={() => setMobileOpen(false)} className="text-white/60 hover:text-white text-2xl leading-none">×</button>
              </div>

              <nav className="flex flex-col gap-1 flex-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleLink(e, link.href)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="px-4 py-3 rounded-lg text-base font-medium transition-colors"
                    style={{ color: 'rgba(249,246,240,0.9)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(232,96,44,0.12)'; e.currentTarget.style.color = '#f5a623'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'rgba(249,246,240,0.9)'; }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              <a
                href="tel:4372186580"
                className="flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-bold text-lg mt-4"
                style={{ background: 'linear-gradient(135deg, #e8602c, #f5a623)' }}
              >
                📞 (437) 218-6580
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
