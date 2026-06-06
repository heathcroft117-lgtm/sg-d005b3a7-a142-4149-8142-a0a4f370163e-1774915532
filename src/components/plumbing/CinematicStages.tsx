import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, AnimatePresence, MotionValue } from 'framer-motion'
import { Phone, Truck, Wrench, Droplets, Settings, CheckCircle } from 'lucide-react'

function dr(seed: number, min: number, max: number) {
  const x = Math.sin(seed) * 10000
  return min + (x - Math.floor(x)) * (max - min)
}

const STARS = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: dr(i * 3.1, 3, 97),
  y: dr(i * 7.3, 3, 97),
  size: dr(i * 1.7, 1, 2.5),
  duration: dr(i * 2.9, 14, 42),
  delay: dr(i * 5.1, 0, 9),
  dy: dr(i * 4.3, 20, 70),
}))

function StarField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {STARS.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size }}
          animate={{ y: [0, -s.dy, 0], opacity: [0.15, 0.75, 0.15] }}
          transition={{ duration: s.duration, repeat: Infinity, delay: s.delay, ease: 'linear' }}
        />
      ))}
    </div>
  )
}

function ScrollProgressBar({ progress }: { progress: MotionValue<number> }) {
  const [h, setH] = useState('0%')
  useEffect(() => {
    return progress.on('change', (v) => setH(`${v * 100}%`))
  }, [progress])
  return (
    <div className="fixed right-0 top-0 w-0.5 h-full z-50 bg-white/10" aria-hidden="true">
      <div
        className="w-full rounded-full transition-none"
        style={{ height: h, background: 'linear-gradient(to bottom,#3b82f6,#60a5fa)', boxShadow: '0 0 8px #3b82f6' }}
      />
    </div>
  )
}

function LightWaveSweep({ trigger }: { trigger: number }) {
  return (
    <AnimatePresence>
      <motion.div
        key={trigger}
        className="absolute inset-y-0 z-40 pointer-events-none"
        style={{ width: 2, background: 'linear-gradient(to bottom,transparent,#3b82f6,transparent)', boxShadow: '0 0 16px #3b82f6', left: 0 }}
        initial={{ left: '-4px', opacity: 1 }}
        animate={{ left: 'calc(100vw + 4px)' }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.65, ease: 'easeInOut' }}
      />
    </AnimatePresence>
  )
}

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function StageLabel({ n }: { n: string }) {
  return (
    <FadeUp delay={0.05}>
      <p className="font-bold text-xs tracking-[0.35em] uppercase text-blue-400/70" style={{ fontFamily: "'DM Sans',sans-serif" }}>
        Stage {n}
      </p>
    </FadeUp>
  )
}

function Headline({ children }: { children: React.ReactNode }) {
  return (
    <FadeUp delay={0.18}>
      <h2 className="font-bold text-white text-5xl sm:text-7xl leading-none" style={{ fontFamily: "'Bebas Neue',sans-serif" }}>
        {children}
      </h2>
    </FadeUp>
  )
}

function Sub({ children }: { children: React.ReactNode }) {
  return (
    <FadeUp delay={0.32}>
      <p className="font-bold text-blue-100/80 text-lg sm:text-xl max-w-md" style={{ fontFamily: "'DM Sans',sans-serif" }}>
        {children}
      </p>
    </FadeUp>
  )
}

// ── Stage 1 ───────────────────────────────────────────────────────────────────

function Stage1() {
  return (
    <motion.div
      key="s1"
      className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
      style={{ background: 'linear-gradient(135deg,#060e1d,#0a1628)' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.38 }}
    >
      {/* Ripple rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        {[0,1,2,3,4].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-blue-500/25"
            style={{ width: 90, height: 90 }}
            animate={{ scale: [0.4, 3], opacity: [0.7, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, delay: i * 0.62, ease: 'easeOut' }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center gap-5">
        <motion.div
          animate={{ rotate: [0, -12, 12, -8, 8, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 0.7, repeat: Infinity, repeatDelay: 2.2 }}
        >
          <Phone className="w-16 h-16 text-blue-400" strokeWidth={1.5} />
        </motion.div>
        <StageLabel n="01" />
        <Headline>THE CALL<br />COMES IN</Headline>
        <Sub>A homeowner notices low water pressure…</Sub>
      </div>
    </motion.div>
  )
}

// ── Stage 2 ───────────────────────────────────────────────────────────────────

const STREAKS = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  top: dr(i * 11, 8, 92),
  width: dr(i * 23, 60, 200),
  duration: dr(i * 7, 2.2, 4.8),
  delay: dr(i * 3, 0, 3.5),
}))

function Stage2() {
  return (
    <motion.div
      key="s2"
      className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
      style={{ background: 'linear-gradient(135deg,#042f2e,#0f4545)' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.38 }}
    >
      {/* Diagonal light streaks */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {STREAKS.map((s) => (
          <motion.div
            key={s.id}
            className="absolute h-px"
            style={{ top: `${s.top}%`, width: s.width, background: 'linear-gradient(90deg,transparent,rgba(45,212,191,0.35),transparent)', transform: 'rotate(-14deg)' }}
            animate={{ x: ['-220px', '120vw'] }}
            transition={{ duration: s.duration, repeat: Infinity, delay: s.delay, ease: 'linear' }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center gap-5">
        <motion.div
          initial={{ scale: 0.15, y: 50, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}>
            <Truck className="w-20 h-20 text-teal-300" strokeWidth={1.5} />
          </motion.div>
        </motion.div>
        <StageLabel n="02" />
        <Headline>ON-SITE<br />ARRIVAL</Headline>
        <Sub>Mahmoud Plumbing arrives within the hour.</Sub>
      </div>
    </motion.div>
  )
}

// ── Stage 3 ───────────────────────────────────────────────────────────────────

const FLOW_DOTS = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  delay: dr(i * 5, 0, 1.8),
  duration: dr(i * 3, 1.4, 2.8),
  axis: i % 2 === 0 ? 'x' : 'y' as 'x' | 'y',
}))

function Stage3() {
  return (
    <motion.div
      key="s3"
      className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
      style={{ background: 'linear-gradient(135deg,#0a0f1e,#0d1a3a)' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.38 }}
    >
      <div className="relative z-10 flex flex-col items-center gap-5">
        {/* CSS 3D pipe cross-section rotating on Y */}
        <motion.div
          animate={{ rotateY: [0, 360] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
          style={{ perspective: 900, transformStyle: 'preserve-3d', width: 120, height: 120, position: 'relative' }}
        >
          <div className="absolute inset-0 rounded-full" style={{ border: '4px solid rgba(59,130,246,0.55)' }} />
          <div className="absolute inset-5 rounded-full" style={{ border: '2px solid rgba(96,165,250,0.35)' }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-blue-400" style={{ boxShadow: '0 0 14px #3b82f6' }} />
          </div>
          <div className="absolute" style={{ top: '50%', left: 0, right: 0, height: 1, marginTop: -0.5, background: 'rgba(96,165,250,0.45)' }} />
          <div className="absolute" style={{ left: '50%', top: 0, bottom: 0, width: 1, marginLeft: -0.5, background: 'rgba(96,165,250,0.45)' }} />
          {FLOW_DOTS.slice(0, 4).map((d, i) => (
            <motion.div
              key={d.id}
              className="absolute w-2 h-2 rounded-full bg-blue-300"
              style={{
                top: i < 2 ? '48%' : i === 2 ? '12%' : '75%',
                left: i === 0 ? '12%' : i === 1 ? '75%' : '48%',
                boxShadow: '0 0 7px #60a5fa',
              }}
              animate={i < 2 ? { x: [i === 0 ? -36 : 36, 0] } : { y: [i === 2 ? -36 : 36, 0] }}
              transition={{ duration: d.duration, repeat: Infinity, repeatType: 'reverse', delay: d.delay }}
            />
          ))}
        </motion.div>

        {/* Scan line */}
        <div className="relative overflow-visible" style={{ width: 240, height: 2 }}>
          <motion.div
            className="absolute left-0 right-0 rounded-full"
            style={{ height: 1, background: '#3b82f6', boxShadow: '0 0 12px #3b82f6, 0 0 24px #3b82f6' }}
            animate={{ y: [-55, 55] }}
            transition={{ duration: 1.9, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          />
        </div>

        <StageLabel n="03" />
        <Headline>THE<br />INSPECTION</Headline>
        <Sub>Every pipe. Every joint. Every connection checked.</Sub>
      </div>
    </motion.div>
  )
}

// ── Stage 4 ───────────────────────────────────────────────────────────────────

const TOOLS = [
  { Icon: Wrench, x: -90, delay: 0.08 },
  { Icon: Droplets, x: 0, delay: 0.2 },
  { Icon: Settings, x: 90, delay: 0.32 },
]

function GaugeSVG() {
  return (
    <svg width="130" height="86" viewBox="0 0 130 86" fill="none" aria-hidden="true">
      <path d="M10 76 A55 55 0 0 1 120 76" stroke="#1e3a5f" strokeWidth="10" strokeLinecap="round" />
      <path d="M10 76 A55 55 0 0 1 42 26" stroke="#dc2626" strokeWidth="10" strokeLinecap="round" opacity={0.55} />
      <motion.path
        d="M10 76 A55 55 0 0 1 120 76"
        stroke="#22c55e" strokeWidth="10" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 2.2, delay: 0.55, ease: 'easeOut' }}
      />
      <motion.line
        x1="65" y1="76" x2="65" y2="28"
        stroke="white" strokeWidth="2.5" strokeLinecap="round"
        style={{ transformOrigin: '65px 76px' }}
        initial={{ rotate: -90 }} animate={{ rotate: 40 }}
        transition={{ duration: 2.2, delay: 0.55, ease: 'easeOut' }}
      />
      <circle cx="65" cy="76" r="5" fill="#f5a623" />
    </svg>
  )
}

function Stage4() {
  return (
    <motion.div
      key="s4"
      className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
      style={{ background: 'radial-gradient(ellipse at 50% 45%,#1a2a4a,#060e1d)' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.38 }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 38%,rgba(59,130,246,0.1),transparent 68%)' }} aria-hidden="true" />

      <div className="relative z-10 flex flex-col items-center gap-5">
        <div className="flex items-end gap-8">
          {TOOLS.map(({ Icon, x, delay }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x, y: 18 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 2.2 + delay, repeat: Infinity, ease: 'easeInOut' }}>
                <Icon className="w-12 h-12 text-blue-300" strokeWidth={1.5} />
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.55, delay: 0.4 }}>
          <GaugeSVG />
        </motion.div>

        <StageLabel n="04" />
        <Headline>THE FIX</Headline>
        <Sub>Problem identified. Problem solved.</Sub>
      </div>
    </motion.div>
  )
}

// ── Stage 5 ───────────────────────────────────────────────────────────────────

const DROPS = Array.from({ length: 32 }, (_, i) => ({
  id: i,
  x: dr(i * 13, 2, 98),
  dur: dr(i * 7, 3, 7),
  delay: dr(i * 3, 0, 5),
  amp: dr(i * 11, 18, 55),
  size: dr(i * 5, 3, 7),
}))

function Stage5() {
  return (
    <motion.div
      key="s5"
      className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
      style={{ background: 'linear-gradient(180deg,#0a1628,#0d1f3a)' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.38 }}
    >
      {/* Water drops */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {DROPS.map((d) => (
          <motion.div
            key={d.id}
            className="absolute rounded-full bg-blue-400"
            style={{ left: `${d.x}%`, top: -8, width: d.size, height: d.size, opacity: 0.55 }}
            animate={{ y: ['0vh', '110vh'], x: [0, d.amp, -d.amp, d.amp * 0.5, 0] }}
            transition={{
              y: { duration: d.dur, repeat: Infinity, delay: d.delay, ease: 'linear' },
              x: { duration: d.dur * 0.65, repeat: Infinity, delay: d.delay, ease: 'easeInOut' },
            }}
          />
        ))}
      </div>

      {/* Flash */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: '#3b82f6' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.32, 0] }}
        transition={{ duration: 1.1, delay: 0.25, ease: 'easeOut' }}
        aria-hidden="true"
      />

      <div className="relative z-20 flex flex-col items-center gap-5">
        <motion.div
          animate={{ scale: [1, 1.14, 1], rotate: [0, 4, -4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <CheckCircle className="w-16 h-16 text-blue-300" strokeWidth={1.5} />
        </motion.div>
        <StageLabel n="05" />
        <Headline>FLOW<br />RESTORED</Headline>
        <FadeUp delay={0.32}>
          <p className="text-xl sm:text-2xl font-bold max-w-lg" style={{ color: '#f5a623', fontFamily: "'DM Serif Display',serif", fontStyle: 'italic' }}>
            "Clean water. Happy home. Mahmoud Plumbing."
          </p>
        </FadeUp>
        <FadeUp delay={0.48}>
          <a
            href="tel:4372186580"
            className="inline-flex items-center gap-2 mt-1 px-7 py-3.5 rounded-xl font-bold text-white text-base transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg,#e8602c,#f5a623)', boxShadow: '0 8px 24px rgba(232,96,44,0.4)', fontFamily: "'DM Sans',sans-serif" }}
          >
            <Phone className="w-4 h-4" />
            Call (437) 218-6580
          </a>
        </FadeUp>
      </div>
    </motion.div>
  )
}

// ── Root ──────────────────────────────────────────────────────────────────────

const STAGES = [Stage1, Stage2, Stage3, Stage4, Stage5]

export default function CinematicStages() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const [active, setActive] = useState(0)
  const [wave, setWave] = useState(0)

  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      const next = Math.min(4, Math.floor(v * 5))
      setActive((prev) => {
        if (prev !== next) setWave((w) => w + 1)
        return next
      })
    })
  }, [scrollYProgress])

  const ActiveStage = STAGES[active]

  return (
    <section ref={ref} style={{ height: '500vh' }} aria-label="How Mahmoud Plumbing works — 5 stages">
      <div className="sticky top-0 h-screen overflow-hidden">
        <StarField />
        <ScrollProgressBar progress={scrollYProgress} />
        <LightWaveSweep trigger={wave} />
        <AnimatePresence mode="wait">
          <ActiveStage key={active} />
        </AnimatePresence>
      </div>
    </section>
  )
}
