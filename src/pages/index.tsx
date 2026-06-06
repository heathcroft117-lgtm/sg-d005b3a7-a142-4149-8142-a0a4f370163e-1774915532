import Head from 'next/head';
import Navigation from '@/components/plumbing/Navigation';
import EmergencyBar from '@/components/plumbing/EmergencyBar';
import HeroSection from '@/components/plumbing/HeroSection';
import TrustBand from '@/components/plumbing/TrustBand';
import ServicesGrid from '@/components/plumbing/ServicesGrid';
import WhyChooseUs from '@/components/plumbing/WhyChooseUs';
import StatsSection from '@/components/plumbing/StatsSection';
import ContactSection from '@/components/plumbing/ContactSection';
import Footer from '@/components/plumbing/Footer';
import ScrollPipe from '@/components/plumbing/ScrollPipe';
import CookieConsent from '@/components/plumbing/CookieConsent';
import CinematicStages from '@/components/plumbing/CinematicStages';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Mahmoud Plumbing | 24/7 Emergency Plumber Mississauga | (437) 218-6580</title>
        <meta name="description" content="5-star rated emergency plumber in Mississauga. Licensed & insured. Faucet, toilet, pipe, water heater, leak detection & more. Same-day service. Call (437) 218-6580." />
      </Head>

      <div style={{ backgroundColor: '#0a1628', minHeight: '100vh' }}>
        {/* Emergency top bar */}
        <EmergencyBar />

        {/* Sticky navigation */}
        <Navigation />

        {/* Scroll-triggered pipe drawing on left edge */}
        <ScrollPipe />

        <main>
          {/* 1. Hero with 3D pipe scene */}
          <HeroSection />

          {/* 2. Trust band */}
          <TrustBand />

          {/* 3. Services grid */}
          <ServicesGrid />

          {/* 4. Stats counter */}
          <StatsSection />

          {/* 5. Why choose us + reviews */}
          <WhyChooseUs />

          {/* 6. Cinematic 5-stage scroll experience */}
          <CinematicStages />

          {/* 7. Contact & booking form */}
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />

        {/* Cookie consent banner */}
        <CookieConsent />
      </div>
    </>
  );
}
