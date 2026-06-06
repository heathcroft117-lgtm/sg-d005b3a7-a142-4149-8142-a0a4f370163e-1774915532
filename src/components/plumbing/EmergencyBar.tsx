import { motion } from 'framer-motion';

const message = '🚨 24/7 Emergency Plumbing — Same-Day Service — Call (437) 218-6580 — Licensed & Insured — Mississauga & GTA — ';
const repeated = message.repeat(6);

export default function EmergencyBar() {
  return (
    <div
      className="relative overflow-hidden py-2.5 z-40"
      style={{ background: 'linear-gradient(90deg, #c0350f, #e8602c, #c0350f)' }}
      role="banner"
      aria-label="Emergency plumbing service"
    >
      {/* Desktop: single line */}
      <div className="hidden sm:block">
        <div className="overflow-hidden">
          <div className="marquee-track whitespace-nowrap text-white text-sm font-semibold tracking-wide" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            {repeated}
          </div>
        </div>
      </div>

      {/* Mobile: centered static */}
      <div className="sm:hidden text-center text-white text-sm font-bold px-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        🚨 24/7 Emergency •{' '}
        <a href="tel:4372186580" className="underline font-extrabold">
          (437) 218-6580
        </a>
      </div>
    </div>
  );
}
