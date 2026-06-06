import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const COOKIE_KEY = 'mahmoud_cookie_consent';

type ConsentState = 'accepted' | 'rejected' | null;

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(COOKIE_KEY);
      if (!stored) {
        // Small delay so it doesn't flash immediately on load
        const timer = setTimeout(() => setVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // localStorage unavailable (e.g. private mode with strict settings) — show banner
      setVisible(true);
    }
  }, []);

  const saveConsent = (value: ConsentState) => {
    try {
      if (value) localStorage.setItem(COOKIE_KEY, value);
    } catch {
      // ignore write failures
    }
    setDismissed(true);
    setTimeout(() => setVisible(false), 400);
  };

  const handleAccept = () => saveConsent('accepted');
  const handleReject = () => saveConsent('rejected');

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <>
          {/* Backdrop — subtle, not blocking */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] pointer-events-none"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 50%)' }}
            aria-hidden="true"
          />

          {/* Banner */}
          <motion.div
            key="banner"
            role="dialog"
            aria-modal="false"
            aria-label="Cookie consent"
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed bottom-0 left-0 right-0 z-[100] p-3 sm:p-4 md:p-5"
          >
            <div
              className="max-w-5xl mx-auto rounded-2xl p-5 sm:p-6 flex flex-col gap-4"
              style={{
                background: 'rgba(8, 18, 34, 0.97)',
                border: '1px solid rgba(232, 96, 44, 0.35)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 -8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)',
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                {/* Icon + text */}
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-xl mt-0.5"
                    style={{ background: 'rgba(232,96,44,0.15)', border: '1px solid rgba(232,96,44,0.3)' }}
                    aria-hidden="true"
                  >
                    🍪
                  </div>
                  <div className="min-w-0">
                    <h2
                      className="text-base font-bold mb-1"
                      style={{ color: '#f9f6f0', fontFamily: "'DM Sans', sans-serif" }}
                    >
                      We use cookies
                    </h2>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: 'rgba(249,246,240,0.65)', fontFamily: "'DM Sans', sans-serif" }}
                    >
                      We use essential cookies to keep the site working, and optional analytics cookies to understand how visitors use it. We never sell your data.{' '}
                      <button
                        onClick={() => setShowDetails((v) => !v)}
                        className="underline transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 rounded"
                        style={{ color: '#f5a623' }}
                        aria-expanded={showDetails}
                        aria-controls="cookie-details"
                      >
                        {showDetails ? 'Hide details' : 'Learn more'}
                      </button>{' '}·{' '}
                      <Link
                        href="/privacy-policy"
                        className="underline transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 rounded"
                        style={{ color: 'rgba(249,246,240,0.55)' }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Privacy Policy
                      </Link>
                    </p>

                    {/* Expandable details */}
                    <AnimatePresence>
                      {showDetails && (
                        <motion.div
                          id="cookie-details"
                          key="details"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div
                            className="mt-3 rounded-xl p-4 flex flex-col gap-3"
                            style={{ background: 'rgba(26,58,110,0.25)', border: '1px solid rgba(255,255,255,0.06)' }}
                          >
                            <CookieRow
                              name="Essential cookies"
                              always
                              desc="Required for basic site functionality (navigation, form submissions). Cannot be disabled."
                            />
                            <CookieRow
                              name="Analytics cookies"
                              always={false}
                              desc="Help us understand how visitors interact with the site so we can improve it. No personal data is shared."
                            />
                            <CookieRow
                              name="Performance cookies"
                              always={false}
                              desc="Allow us to monitor and optimize site performance for a better experience."
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-row sm:flex-col gap-2.5 flex-shrink-0 sm:min-w-[160px]">
                  <button
                    onClick={handleAccept}
                    className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl font-bold text-sm text-white transition-all hover:scale-[1.03] active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
                    style={{
                      background: 'linear-gradient(135deg, #e8602c, #f5a623)',
                      boxShadow: '0 4px 14px rgba(232,96,44,0.4)',
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                    aria-label="Accept all cookies"
                  >
                    Accept All
                  </button>
                  <button
                    onClick={handleReject}
                    className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl font-semibold text-sm transition-all hover:scale-[1.03] active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      color: 'rgba(249,246,240,0.8)',
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                    aria-label="Reject non-essential cookies"
                  >
                    Essential Only
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function CookieRow({ name, always, desc }: { name: string; always: boolean; desc: string }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <div className="text-sm font-semibold" style={{ color: '#f9f6f0', fontFamily: "'DM Sans', sans-serif" }}>
          {name}
        </div>
        <div className="text-xs mt-0.5 leading-relaxed" style={{ color: 'rgba(249,246,240,0.5)', fontFamily: "'DM Sans', sans-serif" }}>
          {desc}
        </div>
      </div>
      <div
        className="flex-shrink-0 text-xs font-bold px-2.5 py-1 rounded-full"
        style={
          always
            ? { background: 'rgba(74,222,128,0.15)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.25)' }
            : { background: 'rgba(232,96,44,0.12)', color: 'rgba(249,246,240,0.5)', border: '1px solid rgba(255,255,255,0.08)' }
        }
        aria-label={always ? 'Always active' : 'Optional'}
      >
        {always ? 'Always on' : 'Optional'}
      </div>
    </div>
  );
}
