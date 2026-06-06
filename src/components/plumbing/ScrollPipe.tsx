import { useScroll, motion, useSpring } from 'framer-motion';

const junctionPositions = [
  { cx: 4, cy: 110 },
  { cx: 28, cy: 230 },
  { cx: 4, cy: 350 },
  { cx: 28, cy: 470 },
  { cx: 4, cy: 590 },
  { cx: 28, cy: 710 },
];

function JunctionNode({ cx, cy, threshold }: { cx: number; cy: number; threshold: number }) {
  const { scrollYProgress } = useScroll();
  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r="5"
      fill="#e8602c"
      style={{
        opacity: scrollYProgress,
      }}
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
    />
  );
}

export default function ScrollPipe() {
  const { scrollYProgress } = useScroll();
  const pathLength = useSpring(scrollYProgress, { stiffness: 80, damping: 30 });

  return (
    <div
      className="fixed left-0 top-0 bottom-0 w-8 z-20 pointer-events-none hidden lg:flex items-start"
      aria-hidden="true"
      style={{ paddingTop: '80px', paddingBottom: '80px' }}
    >
      <svg
        width="32"
        height="100%"
        viewBox="0 0 32 800"
        preserveAspectRatio="none"
        fill="none"
        style={{ height: '100%' }}
      >
        {/* Background track */}
        <path
          d="M16 0 L16 80 Q16 100 4 110 L4 200 Q4 220 16 230 L16 320 Q16 340 28 350 L28 440 Q28 460 16 470 L16 560 Q16 580 4 590 L4 680 Q4 700 16 710 L16 800"
          stroke="rgba(26,58,110,0.3)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Animated fill */}
        <motion.path
          d="M16 0 L16 80 Q16 100 4 110 L4 200 Q4 220 16 230 L16 320 Q16 340 28 350 L28 440 Q28 460 16 470 L16 560 Q16 580 4 590 L4 680 Q4 700 16 710 L16 800"
          stroke="url(#pipeGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          style={{ pathLength }}
        />
        {/* Static junction dots — appear based on scroll via CSS */}
        {junctionPositions.map(({ cx, cy }, i) => (
          <circle key={i} cx={cx} cy={cy} r="4.5" fill="#e8602c" opacity="0.6" />
        ))}
        <defs>
          <linearGradient id="pipeGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e8602c" />
            <stop offset="100%" stopColor="#f5a623" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
