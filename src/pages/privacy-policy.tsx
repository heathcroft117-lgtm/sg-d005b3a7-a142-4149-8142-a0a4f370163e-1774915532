import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';

const EFFECTIVE_DATE = 'June 6, 2025';
const BUSINESS_NAME = 'Mahmoud Plumbing';
const BUSINESS_EMAIL = 'mahmoudplumbing@gmail.com';
const BUSINESS_PHONE = '(437) 218-6580';
const BUSINESS_LOCATION = 'Mississauga, Ontario, Canada';

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'information-collected', label: 'Information We Collect' },
  { id: 'how-we-use', label: 'How We Use Your Information' },
  { id: 'cookies', label: 'Cookies & Tracking' },
  { id: 'disclosure', label: 'Disclosure of Information' },
  { id: 'retention', label: 'Data Retention' },
  { id: 'your-rights', label: 'Your Rights (PIPEDA)' },
  { id: 'security', label: 'Security' },
  { id: 'third-parties', label: 'Third-Party Links' },
  { id: 'children', label: "Children's Privacy" },
  { id: 'updates', label: 'Policy Updates' },
  { id: 'contact', label: 'Contact Us' },
];

function Anchor({ id }: { id: string }) {
  return <span id={id} className="block" style={{ marginTop: '-80px', paddingTop: '80px' }} aria-hidden="true" />;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-2xl sm:text-3xl mt-12 mb-4 pb-3"
      style={{
        fontFamily: "'Bebas Neue', sans-serif",
        color: '#f9f6f0',
        letterSpacing: '0.04em',
        borderBottom: '1px solid rgba(232,96,44,0.2)',
      }}
    >
      {children}
    </h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 leading-relaxed" style={{ color: 'rgba(249,246,240,0.78)', fontFamily: "'DM Sans', sans-serif", fontSize: '15px' }}>
      {children}
    </p>
  );
}

function UL({ children }: { children: React.ReactNode }) {
  return (
    <ul className="mb-4 flex flex-col gap-2 pl-1" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '15px', color: 'rgba(249,246,240,0.78)' }}>
      {children}
    </ul>
  );
}

function LI({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5">
      <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#e8602c' }} aria-hidden="true" />
      <span>{children}</span>
    </li>
  );
}

function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="my-5 p-4 sm:p-5 rounded-xl text-sm leading-relaxed"
      style={{
        background: 'rgba(232,96,44,0.08)',
        border: '1px solid rgba(232,96,44,0.25)',
        color: 'rgba(249,246,240,0.75)',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {children}
    </div>
  );
}

function TableRow({ type, purpose, retention, always }: { type: string; purpose: string; retention: string; always: boolean }) {
  return (
    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <td className="py-3 pr-4 align-top">
        <div className="flex items-center gap-2">
          <span
            className="text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap"
            style={
              always
                ? { background: 'rgba(74,222,128,0.12)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.2)' }
                : { background: 'rgba(232,96,44,0.1)', color: 'rgba(249,246,240,0.55)', border: '1px solid rgba(255,255,255,0.07)' }
            }
          >
            {always ? 'Always on' : 'Optional'}
          </span>
        </div>
        <div className="mt-1 text-sm font-semibold" style={{ color: '#f9f6f0' }}>{type}</div>
      </td>
      <td className="py-3 pr-4 align-top text-sm" style={{ color: 'rgba(249,246,240,0.65)' }}>{purpose}</td>
      <td className="py-3 align-top text-sm whitespace-nowrap" style={{ color: 'rgba(249,246,240,0.5)' }}>{retention}</td>
    </tr>
  );
}

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Mahmoud Plumbing</title>
        <meta name="description" content="Privacy Policy for Mahmoud Plumbing — how we collect, use, and protect your personal information in compliance with PIPEDA (Canada)." />
        <meta name="robots" content="noindex, follow" />
      </Head>

      <div style={{ backgroundColor: '#0a1628', minHeight: '100vh' }}>
        {/* Top nav bar */}
        <header
          className="sticky top-0 z-50 py-4 px-4 sm:px-6 lg:px-8"
          style={{
            backgroundColor: 'rgba(10,22,40,0.96)',
            backdropFilter: 'blur(16px)',
            borderBottom: '1px solid rgba(232,96,44,0.15)',
          }}
        >
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group" aria-label="Back to Mahmoud Plumbing homepage">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #e8602c, #f5a623)' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                  <path d="M3 12h4m10 0h4M7 12a5 5 0 0 1 10 0" />
                  <circle cx="12" cy="12" r="2" fill="white" stroke="none" />
                  <path d="M12 2v3m0 14v3" />
                </svg>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-base font-black tracking-widest" style={{ color: '#f9f6f0', fontFamily: "'Bebas Neue', sans-serif" }}>MAHMOUD PLUMBING</span>
              </div>
            </Link>

            <Link
              href="/"
              className="flex items-center gap-1.5 text-sm font-medium transition-colors"
              style={{ color: 'rgba(249,246,240,0.6)', fontFamily: "'DM Sans', sans-serif" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Back to site
            </Link>
          </div>
        </header>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 lg:gap-16 items-start">

            {/* Sidebar TOC — sticky on desktop */}
            <aside className="hidden lg:block sticky top-24 self-start" aria-label="Table of contents">
              <p
                className="text-xs font-bold tracking-widest uppercase mb-4"
                style={{ color: '#e8602c', fontFamily: "'DM Sans', sans-serif" }}
              >
                Contents
              </p>
              <nav>
                <ul className="flex flex-col gap-1">
                  {sections.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="block text-sm py-1.5 px-3 rounded-lg transition-colors"
                        style={{ color: 'rgba(249,246,240,0.55)', fontFamily: "'DM Sans', sans-serif" }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = '#f5a623'; e.currentTarget.style.backgroundColor = 'rgba(232,96,44,0.08)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(249,246,240,0.55)'; e.currentTarget.style.backgroundColor = 'transparent'; }}
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            {/* Main content */}
            <motion.main
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Page title */}
              <div className="mb-10">
                <div
                  className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
                  style={{ background: 'rgba(232,96,44,0.12)', color: '#e8602c', border: '1px solid rgba(232,96,44,0.25)' }}
                >
                  Legal
                </div>
                <h1
                  className="text-4xl sm:text-5xl mb-3"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", color: '#f9f6f0', letterSpacing: '0.04em' }}
                >
                  PRIVACY POLICY
                </h1>
                <div className="flex flex-wrap gap-4 text-sm" style={{ color: 'rgba(249,246,240,0.5)', fontFamily: "'DM Sans', sans-serif" }}>
                  <span>Effective date: <strong style={{ color: 'rgba(249,246,240,0.75)' }}>{EFFECTIVE_DATE}</strong></span>
                  <span>Jurisdiction: <strong style={{ color: 'rgba(249,246,240,0.75)' }}>Canada (PIPEDA)</strong></span>
                </div>
              </div>

              {/* ── 1. Overview ─────────────────────────── */}
              <Anchor id="overview" />
              <SectionHeading>1. Overview</SectionHeading>
              <P>
                {BUSINESS_NAME} ("<strong style={{ color: '#f9f6f0' }}>we</strong>," "<strong style={{ color: '#f9f6f0' }}>us</strong>," or "<strong style={{ color: '#f9f6f0' }}>our</strong>") operates the website at <strong style={{ color: '#f9f6f0' }}>mahmoudplumbing.ca</strong> and provides residential and commercial plumbing services in {BUSINESS_LOCATION} and the Greater Toronto Area.
              </P>
              <P>
                We are committed to protecting the privacy of every individual who contacts us or visits our website. This policy explains what personal information we collect, why we collect it, how we use and protect it, and what rights you have under Canada&apos;s <em style={{ fontFamily: "'DM Serif Display', serif", color: '#f5a623' }}>Personal Information Protection and Electronic Documents Act</em> (PIPEDA) and applicable Ontario privacy law.
              </P>
              <InfoBox>
                <strong style={{ color: '#f5a623' }}>Plain-language summary:</strong> We collect your name and phone number when you ask us for a quote or callback. We use it only to respond to your request. We do not sell, rent, or share your data with marketers. You can ask us to delete it at any time.
              </InfoBox>

              {/* ── 2. Information Collected ─────────────── */}
              <Anchor id="information-collected" />
              <SectionHeading>2. Information We Collect</SectionHeading>

              <h3 className="text-base font-bold mb-2 mt-5" style={{ color: '#f5a623', fontFamily: "'DM Sans', sans-serif" }}>
                a) Information you give us directly
              </h3>
              <P>When you submit our contact / callback form or call us, we may collect:</P>
              <UL>
                <LI>First and last name</LI>
                <LI>Phone number</LI>
                <LI>The type of plumbing service you need</LI>
                <LI>A description of your plumbing issue (only what you choose to share)</LI>
              </UL>
              <P>
                We collect this information solely to respond to your enquiry, arrange a service visit, or provide you with a quote. <strong style={{ color: '#f9f6f0' }}>We do not collect email addresses, physical addresses, payment card details, or health information through this website.</strong>
              </P>

              <h3 className="text-base font-bold mb-2 mt-5" style={{ color: '#f5a623', fontFamily: "'DM Sans', sans-serif" }}>
                b) Information collected automatically
              </h3>
              <P>When you browse our website, standard web-server logs and optional analytics tools may record:</P>
              <UL>
                <LI>IP address (anonymised before storage where analytics are enabled)</LI>
                <LI>Browser type and version</LI>
                <LI>Device type (mobile / desktop)</LI>
                <LI>Pages visited and time spent on each page</LI>
                <LI>Referring URL (how you arrived at our site)</LI>
                <LI>Date and time of your visit</LI>
              </UL>
              <P>
                This data is used only in aggregate form to understand how visitors use the site so we can improve it. It is never used to identify you personally, and it is collected only if you have accepted optional cookies.
              </P>

              {/* ── 3. How We Use ─────────────────────────── */}
              <Anchor id="how-we-use" />
              <SectionHeading>3. How We Use Your Information</SectionHeading>
              <P>We use the personal information you provide for the following purposes:</P>
              <UL>
                <LI><strong style={{ color: '#f9f6f0' }}>To respond to your request</strong> — calling you back or arranging a service visit as you asked.</LI>
                <LI><strong style={{ color: '#f9f6f0' }}>To provide a quote</strong> — discussing the scope and cost of work before any commitment.</LI>
                <LI><strong style={{ color: '#f9f6f0' }}>To complete a job</strong> — coordinating scheduling and follow-up if you hire us.</LI>
                <LI><strong style={{ color: '#f9f6f0' }}>To improve the website</strong> — using anonymised, aggregated analytics data only (with your consent).</LI>
              </UL>
              <P>
                We will <strong style={{ color: '#f9f6f0' }}>not</strong> use your information to send marketing emails, newsletters, or promotional messages without your explicit consent. We will never sell or rent your personal information to any third party.
              </P>
              <InfoBox>
                <strong style={{ color: '#f5a623' }}>Legal basis under PIPEDA:</strong> Collection is based on your implied or express consent at the time you submit the form or call us. You may withdraw consent at any time (see Section 7 — Your Rights).
              </InfoBox>

              {/* ── 4. Cookies ─────────────────────────────── */}
              <Anchor id="cookies" />
              <SectionHeading>4. Cookies &amp; Tracking Technologies</SectionHeading>
              <P>
                Our website uses cookies — small text files stored in your browser. When you first visit the site, a consent banner lets you choose which categories to accept. Your choice is saved in <code style={{ background: 'rgba(255,255,255,0.08)', padding: '1px 5px', borderRadius: '4px', fontSize: '13px' }}>localStorage</code> under the key <code style={{ background: 'rgba(255,255,255,0.08)', padding: '1px 5px', borderRadius: '4px', fontSize: '13px' }}>mahmoud_cookie_consent</code> and is respected on every subsequent visit.
              </P>

              {/* Cookie table */}
              <div className="overflow-x-auto my-5 rounded-xl" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
                <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: 'rgba(26,58,110,0.4)' }}>
                      <th className="text-left py-3 px-4 text-xs font-bold tracking-widest uppercase" style={{ color: '#e8602c', fontFamily: "'DM Sans', sans-serif" }}>Type</th>
                      <th className="text-left py-3 px-4 text-xs font-bold tracking-widest uppercase" style={{ color: '#e8602c', fontFamily: "'DM Sans', sans-serif" }}>Purpose</th>
                      <th className="text-left py-3 px-4 text-xs font-bold tracking-widest uppercase" style={{ color: '#e8602c', fontFamily: "'DM Sans', sans-serif" }}>Retained</th>
                    </tr>
                  </thead>
                  <tbody style={{ background: 'rgba(10,22,40,0.4)' }}>
                    <TableRow
                      always
                      type="Essential"
                      purpose="Stores your cookie-consent choice so the banner does not reappear. Required for the site to function correctly."
                      retention="12 months"
                    />
                    <TableRow
                      always={false}
                      type="Analytics"
                      purpose="Anonymised aggregated data (page views, session duration, device type) to help us improve the site. No personal identifiers are retained."
                      retention="26 months"
                    />
                    <TableRow
                      always={false}
                      type="Performance"
                      purpose="Monitors page-load speed and errors so we can optimise the user experience."
                      retention="13 months"
                    />
                  </tbody>
                </table>
              </div>

              <P>
                You can withdraw or change your cookie consent at any time by clearing your browser&apos;s <code style={{ background: 'rgba(255,255,255,0.08)', padding: '1px 5px', borderRadius: '4px', fontSize: '13px' }}>localStorage</code> for this site, or by using your browser&apos;s built-in privacy settings to block or delete cookies. Withdrawing consent does not affect the lawfulness of any processing already carried out.
              </P>

              {/* ── 5. Disclosure ─────────────────────────── */}
              <Anchor id="disclosure" />
              <SectionHeading>5. Disclosure of Your Information</SectionHeading>
              <P>We do <strong style={{ color: '#f9f6f0' }}>not</strong> sell, trade, or transfer your personal information to outside parties except in the following limited circumstances:</P>
              <UL>
                <LI><strong style={{ color: '#f9f6f0' }}>Service providers:</strong> We may share data with trusted third-party tools (e.g. website hosting, analytics) that assist us in operating our website, provided those parties agree to keep your information confidential.</LI>
                <LI><strong style={{ color: '#f9f6f0' }}>Legal obligation:</strong> We may disclose information when required by law, court order, or governmental authority, or when we believe in good faith that disclosure is necessary to protect our rights or the safety of others.</LI>
                <LI><strong style={{ color: '#f9f6f0' }}>Business transfer:</strong> In the event of a merger, acquisition, or sale of business assets, personal information may be transferred. We will notify you before your information becomes subject to a materially different privacy policy.</LI>
              </UL>
              <P>
                In every case, we share only the minimum information necessary and require recipients to treat it with at least the same level of protection described in this policy.
              </P>

              {/* ── 6. Retention ───────────────────────────── */}
              <Anchor id="retention" />
              <SectionHeading>6. Data Retention</SectionHeading>
              <P>
                We retain personal information submitted through the contact form for <strong style={{ color: '#f9f6f0' }}>no longer than 12 months</strong> from the date of collection, unless a service relationship is established, in which case we retain it for the duration of that relationship plus <strong style={{ color: '#f9f6f0' }}>3 years</strong> as required by Ontario commercial record-keeping standards.
              </P>
              <P>
                When the retention period expires, we securely delete or anonymise the information so it can no longer be associated with you.
              </P>

              {/* ── 7. Your Rights ─────────────────────────── */}
              <Anchor id="your-rights" />
              <SectionHeading>7. Your Rights Under PIPEDA</SectionHeading>
              <P>
                Canada&apos;s PIPEDA gives you the following rights regarding the personal information we hold about you:
              </P>
              <UL>
                <LI><strong style={{ color: '#f9f6f0' }}>Right of access</strong> — You may request a copy of any personal information we hold about you, along with information about how it has been used or disclosed.</LI>
                <LI><strong style={{ color: '#f9f6f0' }}>Right to correction</strong> — If your information is inaccurate or incomplete, you may ask us to correct it.</LI>
                <LI><strong style={{ color: '#f9f6f0' }}>Right to withdrawal of consent</strong> — You may withdraw consent to our use of your personal information at any time, subject to legal or contractual restrictions and reasonable notice.</LI>
                <LI><strong style={{ color: '#f9f6f0' }}>Right to deletion</strong> — You may ask us to delete personal information we hold about you where there is no legal obligation to retain it.</LI>
                <LI><strong style={{ color: '#f9f6f0' }}>Right to complain</strong> — If you believe we have not complied with PIPEDA, you have the right to file a complaint with the <strong style={{ color: '#f9f6f0' }}>Office of the Privacy Commissioner of Canada</strong> at <a href="https://www.priv.gc.ca" target="_blank" rel="noopener noreferrer" style={{ color: '#e8602c', textDecoration: 'underline' }}>priv.gc.ca</a>.</LI>
              </UL>
              <P>
                To exercise any of these rights, contact us using the details in Section 12. We will respond within <strong style={{ color: '#f9f6f0' }}>30 days</strong> of receiving a written request.
              </P>

              {/* ── 8. Security ────────────────────────────── */}
              <Anchor id="security" />
              <SectionHeading>8. Security</SectionHeading>
              <P>
                We take reasonable organisational and technical precautions to protect your personal information from unauthorised access, disclosure, alteration, or destruction. Our website is served over <strong style={{ color: '#f9f6f0' }}>HTTPS</strong> (TLS encryption) and access to any stored contact-form data is restricted to authorised personnel only.
              </P>
              <P>
                No method of transmission over the internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security. If you believe your personal information has been compromised, please contact us immediately.
              </P>

              {/* ── 9. Third-Party Links ───────────────────── */}
              <Anchor id="third-parties" />
              <SectionHeading>9. Third-Party Links</SectionHeading>
              <P>
                Our website may contain links to external sites (e.g. Google Maps, Google Reviews). These sites have their own privacy policies and we have no control over their content or practices. We encourage you to review the privacy policy of any third-party site you visit. A link from our website does not constitute an endorsement of that site&apos;s privacy practices.
              </P>

              {/* ── 10. Children's Privacy ─────────────────── */}
              <Anchor id="children" />
              <SectionHeading>10. Children&apos;s Privacy</SectionHeading>
              <P>
                Our website and services are not directed at children under the age of 18. We do not knowingly collect personal information from anyone under 18. If you believe a child has provided us with personal information, please contact us and we will promptly delete it.
              </P>

              {/* ── 11. Policy Updates ─────────────────────── */}
              <Anchor id="updates" />
              <SectionHeading>11. Policy Updates</SectionHeading>
              <P>
                We may update this policy from time to time to reflect changes in our practices or applicable law. The effective date at the top of this page will always show when the policy was last revised. Material changes (e.g. a new category of data collected, a new purpose) will be announced via a notice on the website home page for at least 30 days before taking effect.
              </P>
              <P>
                Continued use of the website after the effective date of a revised policy constitutes your acceptance of the changes.
              </P>

              {/* ── 12. Contact ─────────────────────────────── */}
              <Anchor id="contact" />
              <SectionHeading>12. Contact Us</SectionHeading>
              <P>
                If you have questions, requests, or complaints about this privacy policy or the way we handle personal information, please contact our Privacy Officer:
              </P>

              <div
                className="mt-4 p-5 sm:p-6 rounded-2xl flex flex-col gap-3"
                style={{ background: 'rgba(26,58,110,0.25)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <div>
                  <div className="text-xs font-bold tracking-widest uppercase mb-0.5" style={{ color: '#e8602c', fontFamily: "'DM Sans', sans-serif" }}>Business</div>
                  <div className="font-semibold" style={{ color: '#f9f6f0', fontFamily: "'DM Sans', sans-serif" }}>{BUSINESS_NAME}</div>
                </div>
                <div>
                  <div className="text-xs font-bold tracking-widest uppercase mb-0.5" style={{ color: '#e8602c', fontFamily: "'DM Sans', sans-serif" }}>Location</div>
                  <div style={{ color: 'rgba(249,246,240,0.75)', fontFamily: "'DM Sans', sans-serif" }}>{BUSINESS_LOCATION}</div>
                </div>
                <div>
                  <div className="text-xs font-bold tracking-widest uppercase mb-0.5" style={{ color: '#e8602c', fontFamily: "'DM Sans', sans-serif" }}>Phone</div>
                  <a href="tel:4372186580" className="font-semibold transition-colors" style={{ color: '#f9f6f0', fontFamily: "'DM Sans', sans-serif" }}>
                    {BUSINESS_PHONE}
                  </a>
                </div>
                <div>
                  <div className="text-xs font-bold tracking-widest uppercase mb-0.5" style={{ color: '#e8602c', fontFamily: "'DM Sans', sans-serif" }}>Email</div>
                  <a href={`mailto:${BUSINESS_EMAIL}`} className="transition-colors" style={{ color: '#f9f6f0', fontFamily: "'DM Sans', sans-serif" }}>
                    {BUSINESS_EMAIL}
                  </a>
                </div>
                <div>
                  <div className="text-xs font-bold tracking-widest uppercase mb-0.5" style={{ color: '#e8602c', fontFamily: "'DM Sans', sans-serif" }}>Response time</div>
                  <div style={{ color: 'rgba(249,246,240,0.75)', fontFamily: "'DM Sans', sans-serif" }}>Within 30 days of receiving a written request</div>
                </div>
              </div>

              <div className="mt-4">
                <P>
                  You also have the right to file a complaint with the{' '}
                  <a href="https://www.priv.gc.ca/en/report-a-concern/" target="_blank" rel="noopener noreferrer" style={{ color: '#e8602c', textDecoration: 'underline' }}>
                    Office of the Privacy Commissioner of Canada
                  </a>{' '}
                  if you are unsatisfied with our response.
                </P>
              </div>

              {/* Back to top / back to site */}
              <div className="mt-14 flex flex-wrap gap-4 items-center pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white text-sm transition-all hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #e8602c, #f5a623)', fontFamily: "'DM Sans', sans-serif" }}
                >
                  ← Back to homepage
                </Link>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all hover:scale-105"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(249,246,240,0.7)',
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  ↑ Back to top
                </button>
                <span className="text-xs ml-auto" style={{ color: 'rgba(249,246,240,0.3)', fontFamily: "'DM Sans', sans-serif" }}>
                  Last revised: {EFFECTIVE_DATE}
                </span>
              </div>
            </motion.main>
          </div>
        </div>
      </div>
    </>
  );
}
