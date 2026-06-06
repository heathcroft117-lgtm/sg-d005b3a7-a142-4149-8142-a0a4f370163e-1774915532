import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const reasons = [
  {
    num: '01',
    title: '5.0-Star Rated on Google',
    desc: '83 verified five-star reviews from real Mississauga homeowners.',
  },
  {
    num: '02',
    title: '24/7 Emergency Response',
    desc: 'Nights, weekends, and holidays — we pick up and show up.',
  },
  {
    num: '03',
    title: 'Upfront Transparent Pricing',
    desc: 'You know the cost before we start. No hidden fees. Ever.',
  },
  {
    num: '04',
    title: 'Licensed & Fully Insured',
    desc: 'Ontario code compliant. Fully insured for your protection.',
  },
];

const reviews = [
  {
    name: 'Sarah M.',
    rating: 5,
    text: '"He arrived promptly late in the evening and quickly cleared a stubborn kitchen drain clog. Professional, efficient, and exactly as quoted."',
    location: 'Mississauga, ON',
  },
  {
    name: 'James K.',
    rating: 5,
    text: '"Same-day service for a leaking pipe under my sink. Professional, fast, and left no mess behind. Highly recommend Mahmoud!"',
    location: 'Port Credit, ON',
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#f5a623">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

export default function WhyChooseUs() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="why-us"
      className="py-20 lg:py-28"
      style={{ background: 'linear-gradient(180deg, #0a1628 0%, #0d1f3a 50%, #0a1628 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div
            className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
            style={{ background: 'rgba(232,96,44,0.12)', color: '#e8602c', border: '1px solid rgba(232,96,44,0.25)' }}
          >
            Why Mahmoud
          </div>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "'Bebas Neue', sans-serif", color: '#f9f6f0' }}
          >
            THE PLUMBER MISSISSAUGA
            <br />
            <span style={{ WebkitTextStroke: '1px #f5a623', color: 'transparent' }}>TRUSTS MOST</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: 4 reasons */}
          <div className="flex flex-col gap-6">
            {reasons.map((reason, i) => (
              <motion.div
                key={reason.num}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex gap-5 group"
              >
                <div className="flex-shrink-0 mt-0.5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-colors"
                    style={{
                      background: 'rgba(232,96,44,0.15)',
                      border: '1px solid rgba(232,96,44,0.3)',
                      color: '#e8602c',
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: '16px',
                    }}
                  >
                    {reason.num}
                  </div>
                </div>
                <div>
                  <h3
                    className="text-lg font-bold mb-1.5"
                    style={{ color: '#f9f6f0', fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {reason.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'rgba(249,246,240,0.65)', fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {reason.desc}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Stat callout */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.55, duration: 0.5 }}
              className="mt-2 p-5 rounded-2xl flex items-center gap-5"
              style={{
                background: 'linear-gradient(135deg, rgba(232,96,44,0.12), rgba(245,166,35,0.08))',
                border: '1px solid rgba(232,96,44,0.25)',
              }}
            >
              <div className="text-4xl">⭐</div>
              <div>
                <div
                  className="text-3xl font-extrabold"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", color: '#f5a623' }}
                >
                  5.0 STARS · 83 REVIEWS
                </div>
                <div className="text-sm" style={{ color: 'rgba(249,246,240,0.65)' }}>
                  Verified Google reviews · Mississauga&apos;s top-rated plumber
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Reviews */}
          <div id="reviews" className="flex flex-col gap-5">
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="text-sm font-semibold tracking-widest uppercase mb-2"
              style={{ color: '#e8602c', fontFamily: "'DM Sans', sans-serif" }}
            >
              What Customers Say
            </motion.p>

            {reviews.map((review, i) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="p-6 rounded-2xl"
                style={{
                  background: 'rgba(26,58,110,0.35)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  backdropFilter: 'blur(10px)',
                }}
                aria-label={`Review from ${review.name}`}
              >
                <StarRating count={review.rating} />
                <blockquote
                  className="mt-3 text-base leading-relaxed italic"
                  style={{ color: 'rgba(249,246,240,0.9)', fontFamily: "'DM Serif Display', serif" }}
                >
                  {review.text}
                </blockquote>
                <div className="mt-4 flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                    style={{ background: 'linear-gradient(135deg, #e8602c, #f5a623)', color: 'white' }}
                  >
                    {review.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-semibold" style={{ color: '#f9f6f0' }}>{review.name}</div>
                    <div className="text-xs" style={{ color: 'rgba(249,246,240,0.5)' }}>{review.location}</div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Google badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.65 }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M21.8 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.5c-.2 1.3-1 2.4-2 3.1v2.6h3.3c1.9-1.8 3-4.4 3-7.5z" fill="#4285f4"/>
                <path d="M12 22c2.7 0 5-.9 6.7-2.4l-3.3-2.6c-.9.6-2.1 1-3.5 1-2.7 0-4.9-1.8-5.7-4.3H2.9v2.6C4.7 19.9 8.1 22 12 22z" fill="#34a853"/>
                <path d="M6.3 13.7c-.2-.6-.3-1.2-.3-1.7s.1-1.1.3-1.7V7.7H2.9C2.3 9 2 10.5 2 12s.3 3 .9 4.3l3.4-2.6z" fill="#fbbc05"/>
                <path d="M12 5.7c1.5 0 2.9.5 3.9 1.5l2.9-2.9C17 2.7 14.7 2 12 2 8.1 2 4.7 4.1 2.9 7.3l3.4 2.6C7.1 7.5 9.3 5.7 12 5.7z" fill="#ea4335"/>
              </svg>
              <span className="text-sm font-medium" style={{ color: 'rgba(249,246,240,0.7)' }}>
                Verified on <strong style={{ color: '#f9f6f0' }}>Google Maps</strong> · 5.0 ★ · 83 reviews
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
