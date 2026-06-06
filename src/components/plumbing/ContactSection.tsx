import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';

const WaterDroplets3D = dynamic(() => import('./WaterDroplets3D'), { ssr: false });

interface FormValues {
  firstName: string;
  lastName: string;
  phone: string;
  service: string;
  message: string;
}

const serviceOptions = [
  'Emergency Plumbing',
  'Faucet Installation',
  'Faucet Repair',
  'Leak Detection',
  'Pipe Repair',
  'Shower Installation & Repair',
  'Toilet Installation & Repair',
  'Water Heater Services',
  'Plumbing Leak Repair',
  'Pool Plumbing Repair',
  'Other',
];

const contactDetails = [
  { icon: '📞', label: 'Phone', value: '(437) 218-6580', href: 'tel:4372186580' },
  { icon: '📍', label: 'Service Area', value: 'Mississauga, ON & GTA', href: null },
  { icon: '⏰', label: 'Hours', value: '24/7 — Including Holidays', href: null },
  { icon: '⚡', label: 'Response Time', value: 'Same-day emergency response', href: null },
];

export default function ContactSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1000));
    setSubmitted(true);
    setSubmitting(false);
    reset();
  };

  return (
    <section
      id="contact"
      className="relative py-20 lg:py-28 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0a1628 0%, #060e1d 100%)' }}
    >
      {/* Background particles */}
      <div className="absolute inset-0 z-0 opacity-50" aria-hidden="true">
        <WaterDroplets3D />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
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
            Book a Call
          </div>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl mb-4"
            style={{ fontFamily: "'Bebas Neue', sans-serif", color: '#f9f6f0' }}
          >
            GET IN TOUCH
            <br />
            <span style={{ WebkitTextStroke: '1px #e8602c', color: 'transparent' }}>WE RESPOND FAST</span>
          </h2>
          <p className="text-base sm:text-lg max-w-xl mx-auto" style={{ color: 'rgba(249,246,240,0.65)', fontFamily: "'DM Sans', sans-serif" }}>
            Emergency or not — call or fill out the form and we&apos;ll get back to you immediately.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left: Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6"
          >
            {/* Big phone CTA */}
            <a
              href="tel:4372186580"
              className="flex items-center gap-4 p-6 rounded-2xl transition-all hover:scale-[1.02] group"
              style={{
                background: 'linear-gradient(135deg, rgba(232,96,44,0.2), rgba(245,166,35,0.1))',
                border: '1px solid rgba(232,96,44,0.35)',
              }}
              aria-label="Call (437) 218-6580"
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #e8602c, #f5a623)', boxShadow: '0 8px 20px rgba(232,96,44,0.4)' }}
              >
                📞
              </div>
              <div>
                <div className="text-xs font-bold tracking-widest uppercase mb-0.5" style={{ color: '#f5a623' }}>Emergency? Call Now</div>
                <div
                  className="text-2xl font-extrabold"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", color: '#f9f6f0', letterSpacing: '0.05em' }}
                >
                  (437) 218-6580
                </div>
                <div className="text-xs mt-0.5" style={{ color: 'rgba(249,246,240,0.5)' }}>Available 24/7 · Fast response guaranteed</div>
              </div>
            </a>

            {/* Contact details */}
            <div className="flex flex-col gap-4">
              {contactDetails.map((detail) => (
                <div key={detail.label} className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
                    style={{ background: 'rgba(26,58,110,0.5)', border: '1px solid rgba(255,255,255,0.07)' }}
                  >
                    {detail.icon}
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-widest mb-0.5" style={{ color: 'rgba(249,246,240,0.45)' }}>{detail.label}</div>
                    {detail.href ? (
                      <a href={detail.href} className="text-sm font-medium hover:text-orange-400 transition-colors" style={{ color: '#f9f6f0' }}>
                        {detail.value}
                      </a>
                    ) : (
                      <div className="text-sm font-medium" style={{ color: '#f9f6f0' }}>{detail.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Trust note */}
            <div
              className="p-5 rounded-2xl text-sm leading-relaxed"
              style={{ background: 'rgba(26,58,110,0.2)', border: '1px solid rgba(255,255,255,0.06)', color: 'rgba(249,246,240,0.65)', fontFamily: "'DM Sans', sans-serif" }}
            >
              <em style={{ fontFamily: "'DM Serif Display', serif", color: '#f5a623', fontSize: '16px' }}>
                "Not a franchise. Real conversations, honest pricing, clean workmanship."
              </em>
              <div className="mt-2 font-semibold" style={{ color: 'rgba(249,246,240,0.5)', fontStyle: 'normal' }}>— Mahmoud, Owner</div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="p-7 sm:p-8 rounded-2xl"
            style={{
              background: 'rgba(13,26,50,0.8)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(16px)',
            }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-10 gap-4"
              >
                <div className="text-5xl">✅</div>
                <h3
                  className="text-2xl font-bold"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", color: '#f9f6f0', letterSpacing: '0.04em' }}
                >
                  REQUEST RECEIVED!
                </h3>
                <p className="text-base" style={{ color: 'rgba(249,246,240,0.7)', fontFamily: "'DM Sans', sans-serif" }}>
                  Mahmoud will call you back shortly. For emergencies, call{' '}
                  <a href="tel:4372186580" className="font-bold" style={{ color: '#e8602c' }}>(437) 218-6580</a>.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-sm underline"
                  style={{ color: 'rgba(249,246,240,0.4)' }}
                >
                  Submit another request
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="form-label" htmlFor="firstName">First Name</label>
                    <input
                      id="firstName"
                      {...register('firstName', { required: 'Required' })}
                      className="form-input"
                      placeholder="Jane"
                    />
                    {errors.firstName && <p className="text-xs mt-1" style={{ color: '#f87171' }}>{errors.firstName.message}</p>}
                  </div>
                  <div>
                    <label className="form-label" htmlFor="lastName">Last Name</label>
                    <input
                      id="lastName"
                      {...register('lastName', { required: 'Required' })}
                      className="form-input"
                      placeholder="Smith"
                    />
                    {errors.lastName && <p className="text-xs mt-1" style={{ color: '#f87171' }}>{errors.lastName.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="form-label" htmlFor="phone">Phone Number</label>
                  <input
                    id="phone"
                    type="tel"
                    {...register('phone', {
                      required: 'Phone number required',
                      pattern: { value: /^[\d\s\-\(\)\+]{7,15}$/, message: 'Invalid phone number' },
                    })}
                    className="form-input"
                    placeholder="(416) 555-0100"
                  />
                  {errors.phone && <p className="text-xs mt-1" style={{ color: '#f87171' }}>{errors.phone.message}</p>}
                </div>

                <div>
                  <label className="form-label" htmlFor="service">Service Needed</label>
                  <select
                    id="service"
                    {...register('service', { required: 'Please select a service' })}
                    className="form-input"
                  >
                    <option value="">Select a service…</option>
                    {serviceOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  {errors.service && <p className="text-xs mt-1" style={{ color: '#f87171' }}>{errors.service.message}</p>}
                </div>

                <div>
                  <label className="form-label" htmlFor="message">Describe the Issue</label>
                  <textarea
                    id="message"
                    {...register('message')}
                    rows={4}
                    className="form-input resize-none"
                    placeholder="E.g. My kitchen faucet is leaking, the toilet keeps running…"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-xl font-bold text-white text-base transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
                  style={{
                    background: 'linear-gradient(135deg, #e8602c, #f5a623)',
                    boxShadow: '0 8px 24px rgba(232,96,44,0.35)',
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>Request Callback →</>
                  )}
                </button>

                <p className="text-xs text-center" style={{ color: 'rgba(249,246,240,0.4)' }}>
                  We respond within minutes · Your info stays private
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
