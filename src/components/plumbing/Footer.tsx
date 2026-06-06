import { motion } from 'framer-motion';

const serviceAreas = [
  'Mississauga', 'Port Credit', 'Streetsville', 'Erin Mills',
  'Clarkson', 'Lorne Park', 'Cooksville', 'Malton', 'GTA',
];

const quickLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Why Choose Us', href: '#why-us' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        background: 'linear-gradient(180deg, #060e1d 0%, #040b17 100%)',
        borderTop: '1px solid rgba(232,96,44,0.2)',
      }}
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Top footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #e8602c, #f5a623)' }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M3 12h4m10 0h4M7 12a5 5 0 0 1 10 0" />
                  <circle cx="12" cy="12" r="2" fill="white" stroke="none" />
                  <path d="M12 2v3m0 14v3" />
                </svg>
              </div>
              <div>
                <div className="font-display text-2xl tracking-widest" style={{ color: '#f9f6f0', fontFamily: "'Bebas Neue', sans-serif" }}>MAHMOUD PLUMBING</div>
              </div>
            </div>

            <p className="text-sm leading-relaxed max-w-sm" style={{ color: 'rgba(249,246,240,0.6)', fontFamily: "'DM Sans', sans-serif" }}>
              Mississauga&apos;s trusted emergency plumber · Open 24/7 · Licensed & Insured · Honest pricing, no surprises.
            </p>

            <a
              href="tel:4372186580"
              className="inline-flex items-center gap-2 w-fit px-5 py-2.5 rounded-xl font-bold text-white text-sm transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #e8602c, #f5a623)', boxShadow: '0 6px 16px rgba(232,96,44,0.35)' }}
              aria-label="Call (437) 218-6580"
            >
              📞 (437) 218-6580
            </a>

            {/* Stars */}
            <div className="flex items-center gap-2 mt-1">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(s => (
                  <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill="#f5a623">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <span className="text-xs font-semibold" style={{ color: '#f5a623' }}>5.0</span>
              <span className="text-xs" style={{ color: 'rgba(249,246,240,0.45)' }}>83 Google Reviews</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="text-xs font-bold tracking-widest uppercase mb-4"
              style={{ color: '#e8602c', fontFamily: "'DM Sans', sans-serif" }}
            >
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map(link => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm font-medium transition-colors text-left"
                    style={{ color: 'rgba(249,246,240,0.65)', fontFamily: "'DM Sans', sans-serif" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#f5a623'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(249,246,240,0.65)'; }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3
              className="text-xs font-bold tracking-widest uppercase mb-4"
              style={{ color: '#e8602c', fontFamily: "'DM Sans', sans-serif" }}
            >
              Service Areas
            </h3>
            <ul className="flex flex-col gap-2">
              {serviceAreas.map(area => (
                <li key={area} className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-orange-400" style={{ backgroundColor: '#e8602c' }} />
                  <span className="text-sm" style={{ color: 'rgba(249,246,240,0.65)', fontFamily: "'DM Sans', sans-serif" }}>
                    {area}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        className="py-5"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-between items-center gap-3 text-xs" style={{ color: 'rgba(249,246,240,0.4)', fontFamily: "'DM Sans', sans-serif" }}>
            <span>© 2025 Mahmoud Plumbing · All rights reserved</span>
            <div className="flex flex-wrap items-center gap-3">
              <span style={{ color: '#f5a623' }}>5.0 Stars</span>
              <span>·</span>
              <span>83 Reviews</span>
              <span>·</span>
              <span>Licensed & Insured</span>
              <span>·</span>
              <a href="tel:4372186580" style={{ color: 'rgba(249,246,240,0.6)' }} className="hover:text-white transition-colors">
                (437) 218-6580
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
