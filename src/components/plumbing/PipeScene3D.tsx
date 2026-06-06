import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ── Pipe path curves (defined at module level, loaded client-side only) ──────

function makeCurve(pts: [number, number, number][]) {
  return new THREE.CatmullRomCurve3(
    pts.map(([x, y, z]) => new THREE.Vector3(x, y, z)),
    false,
    'catmullrom',
    0.4
  );
}

// Vertical supply line dropping from above
const curveSupply = makeCurve([
  [0, 3.4, 0], [0, 2.2, 0], [0, 1.1, 0], [0, 0, 0],
]);

// Hot water branch (left)
const curveHot = makeCurve([
  [0, 0, 0], [-0.4, 0, 0], [-1.0, 0, 0], [-1.3, -0.25, 0], [-1.3, -1.1, 0],
]);

// Cold water branch (right)
const curveCold = makeCurve([
  [0, 0, 0], [0.4, 0, 0], [1.0, 0, 0], [1.3, -0.25, 0], [1.3, -1.1, 0],
]);

// P-trap (the iconic under-sink U-bend drain)
const curvePtrap = makeCurve([
  [0, 0, 0],
  [0, -0.5, 0],
  [0, -1.0, 0],
  [-0.25, -1.5, 0],
  [-0.5, -1.95, 0],
  [-0.42, -2.42, 0],
  [0, -2.62, 0],
  [0.42, -2.42, 0],
  [0.5, -1.95, 0],
  [0.5, -1.5, 0],
  [0.5, -1.0, 0],
]);

// Drain exit going to the wall
const curveDrain = makeCurve([
  [0.5, -1.0, 0], [0.9, -1.0, 0], [1.5, -1.0, 0], [2.1, -1.0, 0],
]);

// ── Water particle flow paths ─────────────────────────────────────────────────
const FLOW: { curve: THREE.CatmullRomCurve3; count: number; speed: number; color: string }[] = [
  { curve: curveSupply, count: 10, speed: 0.006, color: '#93c5fd' },
  { curve: curvePtrap,  count: 20, speed: 0.0028, color: '#60a5fa' },
  { curve: curveDrain,  count: 8,  speed: 0.007,  color: '#93c5fd' },
];

// Chrome joint positions
const JOINTS: [number, number, number][] = [
  [0, 3.4, 0],
  [0, 0, 0],
  [-1.3, -1.1, 0],
  [1.3, -1.1, 0],
  [0, -2.62, 0],
  [0.5, -1.0, 0],
  [2.1, -1.0, 0],
];

// ── Sub-components ────────────────────────────────────────────────────────────

function PipeTube({
  curve,
  radius = 0.072,
  segments = 80,
  material,
}: {
  curve: THREE.CatmullRomCurve3;
  radius?: number;
  segments?: number;
  material: THREE.Material;
}) {
  const geo = useMemo(
    () => new THREE.TubeGeometry(curve, segments, radius, 12, false),
    [curve, radius, segments]
  );
  return <mesh geometry={geo} material={material} />;
}

// Translucent inner tube — suggests flowing water inside the copper
function InnerGlow({
  curve,
  segments = 60,
}: {
  curve: THREE.CatmullRomCurve3;
  segments?: number;
}) {
  const geo = useMemo(
    () => new THREE.TubeGeometry(curve, segments, 0.034, 8, false),
    [curve, segments]
  );
  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#60a5fa',
        emissive: '#1d4ed8',
        emissiveIntensity: 0.7,
        transparent: true,
        opacity: 0.4,
        depthWrite: false,
      }),
    []
  );
  return <mesh geometry={geo} material={mat} />;
}

function ShutoffValve({
  position,
  accent,
}: {
  position: [number, number, number];
  accent: string;
}) {
  const handleRef = useRef<THREE.Mesh>(null!);
  useFrame((s) => {
    if (!handleRef.current) return;
    handleRef.current.rotation.z = Math.sin(s.clock.getElapsedTime() * 0.55) * 0.07;
  });

  const bodyMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({ color: '#888', metalness: 0.95, roughness: 0.1 }),
    []
  );
  const stemMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({ color: '#c8c8c8', metalness: 1.0, roughness: 0.05 }),
    []
  );
  const handleMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: accent,
        metalness: 0.55,
        roughness: 0.25,
        emissive: accent,
        emissiveIntensity: 0.25,
      }),
    [accent]
  );
  const ringMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: accent,
        emissive: accent,
        emissiveIntensity: 1.1,
        transparent: true,
        opacity: 0.55,
      }),
    [accent]
  );

  return (
    <group position={position}>
      {/* Body */}
      <mesh material={bodyMat}>
        <cylinderGeometry args={[0.13, 0.13, 0.24, 16]} />
      </mesh>
      {/* Stem */}
      <mesh position={[0, 0.2, 0]} material={stemMat}>
        <cylinderGeometry args={[0.038, 0.038, 0.12, 8]} />
      </mesh>
      {/* T-bar handle */}
      <mesh ref={handleRef} position={[0, 0.28, 0]} material={handleMat}>
        <boxGeometry args={[0.42, 0.065, 0.065]} />
      </mesh>
      {/* Glow ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]} material={ringMat}>
        <torusGeometry args={[0.148, 0.018, 8, 22]} />
      </mesh>
    </group>
  );
}

function PressureGauge({ position }: { position: [number, number, number] }) {
  const needleRef = useRef<THREE.Mesh>(null!);
  useFrame((s) => {
    if (!needleRef.current) return;
    needleRef.current.rotation.z =
      -0.4 + Math.sin(s.clock.getElapsedTime() * 0.38) * 0.22;
  });

  const faceMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({ color: '#0d1a2f', metalness: 0.25, roughness: 0.55 }),
    []
  );
  const rimMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#c0c0c0', metalness: 1.0, roughness: 0.05 }),
    []
  );
  const needleMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#e8602c',
        emissive: '#e8602c',
        emissiveIntensity: 0.65,
      }),
    []
  );
  const pinMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#f5a623',
        emissive: '#f5a623',
        emissiveIntensity: 0.55,
      }),
    []
  );

  return (
    <group position={position}>
      {/* Face */}
      <mesh rotation={[Math.PI / 2, 0, 0]} material={faceMat}>
        <cylinderGeometry args={[0.22, 0.22, 0.065, 22]} />
      </mesh>
      {/* Chrome rim */}
      <mesh rotation={[Math.PI / 2, 0, 0]} material={rimMat}>
        <torusGeometry args={[0.22, 0.024, 8, 24]} />
      </mesh>
      {/* Needle */}
      <mesh ref={needleRef} position={[0, 0, 0.04]} material={needleMat}>
        <boxGeometry args={[0.19, 0.022, 0.01]} />
      </mesh>
      {/* Centre pin */}
      <mesh position={[0, 0, 0.04]} material={pinMat}>
        <sphereGeometry args={[0.027, 8, 8]} />
      </mesh>
    </group>
  );
}

function WaterParticles({
  curve,
  count,
  speed,
  color,
}: {
  curve: THREE.CatmullRomCurve3;
  count: number;
  speed: number;
  color: string;
}) {
  const ref = useRef<THREE.Points>(null!);
  const ts = useRef(Array.from({ length: count }, (_, i) => i / count));
  const tmp = useRef(new THREE.Vector3());

  const geo = useMemo(() => {
    const arr = new Float32Array(count * 3);
    ts.current.forEach((t, i) => {
      const p = curve.getPoint(t);
      arr[i * 3] = p.x;
      arr[i * 3 + 1] = p.y;
      arr[i * 3 + 2] = p.z;
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(arr, 3));
    return g;
  }, [curve, count]);

  const mat = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.07,
        color,
        transparent: true,
        opacity: 0.88,
        sizeAttenuation: true,
        depthWrite: false,
      }),
    [color]
  );

  useFrame(() => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      ts.current[i] = (ts.current[i] + speed) % 1;
      curve.getPoint(ts.current[i], tmp.current);
      pos[i * 3] = tmp.current.x;
      pos[i * 3 + 1] = tmp.current.y;
      pos[i * 3 + 2] = tmp.current.z;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return <points ref={ref} geometry={geo} material={mat} />;
}

function DrippingWater() {
  const ref = useRef<THREE.Points>(null!);
  const COUNT = 16;
  const drips = useRef(
    Array.from({ length: COUNT }, (_, i) => ({
      x: 2.12 + (Math.random() - 0.5) * 0.09,
      y: -1.08 - (i / COUNT) * 2.2,
      s: 0.011 + Math.random() * 0.013,
    }))
  );

  const geo = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    drips.current.forEach((d, i) => {
      arr[i * 3] = d.x;
      arr[i * 3 + 1] = d.y;
      arr[i * 3 + 2] = 0;
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(arr, 3));
    return g;
  }, []);

  const mat = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.055,
        color: '#93c5fd',
        transparent: true,
        opacity: 0.72,
        sizeAttenuation: true,
        depthWrite: false,
      }),
    []
  );

  useFrame(() => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position.array as Float32Array;
    drips.current.forEach((d, i) => {
      d.y -= d.s;
      if (d.y < -4.6) {
        d.y = -1.08;
        d.x = 2.12 + (Math.random() - 0.5) * 0.09;
      }
      pos[i * 3] = d.x;
      pos[i * 3 + 1] = d.y;
    });
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return <points ref={ref} geometry={geo} material={mat} />;
}

// ── Main scene ────────────────────────────────────────────────────────────────

function PlumbingScene({
  mouseX,
  mouseY,
}: {
  mouseX: number;
  mouseY: number;
}) {
  const groupRef = useRef<THREE.Group>(null!);
  const movingLightRef = useRef<THREE.PointLight>(null!);

  useFrame((s) => {
    if (!groupRef.current) return;
    const t = s.clock.getElapsedTime();
    groupRef.current.rotation.y = mouseX * 0.38 + Math.sin(t * 0.11) * 0.13;
    groupRef.current.rotation.x = mouseY * 0.1 + Math.sin(t * 0.07) * 0.025;
    if (movingLightRef.current) {
      movingLightRef.current.position.x = mouseX * 4;
      movingLightRef.current.position.y = mouseY * 3 + 1;
    }
  });

  const copperMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#b87333',
        metalness: 0.92,
        roughness: 0.13,
        envMapIntensity: 1.4,
      }),
    []
  );
  const chromeMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#c8c8c8',
        metalness: 1.0,
        roughness: 0.04,
        envMapIntensity: 2.0,
      }),
    []
  );

  const jointGeo = useMemo(() => new THREE.SphereGeometry(0.108, 14, 14), []);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.2} color="#b0ccff" />
      <directionalLight position={[5, 9, 5]} intensity={1.0} color="#fff6e0" />
      <directionalLight position={[-4, -2, 3]} intensity={0.3} color="#b87333" />
      <pointLight
        ref={movingLightRef}
        position={[2, 2, 3]}
        intensity={2.8}
        color="#e8602c"
        distance={11}
      />
      {/* Blue water-glow light near P-trap */}
      <pointLight position={[0, -2.6, 1.5]} intensity={1.2} color="#3b82f6" distance={5} />
      {/* Warm fill from left */}
      <pointLight position={[-2, 1, 2]} intensity={0.6} color="#f5a623" distance={8} />

      <group ref={groupRef} position={[-0.2, -0.2, 0]}>
        {/* ── Copper pipe tubes ── */}
        <PipeTube curve={curveSupply} material={copperMat} />
        <PipeTube curve={curveHot}    material={copperMat} />
        <PipeTube curve={curveCold}   material={copperMat} />
        <PipeTube curve={curvePtrap}  radius={0.078} material={copperMat} />
        <PipeTube curve={curveDrain}  material={copperMat} />

        {/* ── Inner water glow tubes ── */}
        <InnerGlow curve={curveSupply} />
        <InnerGlow curve={curvePtrap} segments={80} />
        <InnerGlow curve={curveDrain} />

        {/* ── Chrome joints ── */}
        {JOINTS.map((pos, i) => (
          <mesh key={i} position={pos} geometry={jointGeo} material={chromeMat} />
        ))}

        {/* ── Shutoff valves ── */}
        <ShutoffValve position={[-1.3, -0.55, 0]} accent="#dc2626" />
        <ShutoffValve position={[1.3, -0.55, 0]}  accent="#2563eb" />

        {/* ── Pressure gauge on supply line ── */}
        <PressureGauge position={[0.28, 1.9, 0]} />

        {/* ── Inlet cap (top of supply) ── */}
        <mesh position={[0, 3.52, 0]} material={chromeMat}>
          <cylinderGeometry args={[0.11, 0.082, 0.18, 12]} />
        </mesh>

        {/* ── Drain-wall collar ── */}
        <mesh position={[2.18, -1.0, 0]} material={chromeMat}>
          <cylinderGeometry args={[0.1, 0.1, 0.06, 12]} />
        </mesh>

        {/* ── Flowing water particles ── */}
        {FLOW.map((fp, i) => (
          <WaterParticles key={i} {...fp} />
        ))}

        {/* ── Drips from drain opening ── */}
        <DrippingWater />
      </group>
    </>
  );
}

// ── Canvas export ─────────────────────────────────────────────────────────────

export default function PipeScene3D() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener('mousemove', fn);
    return () => window.removeEventListener('mousemove', fn);
  }, []);

  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0.5, 0.3, 7.2], fov: 44 }}
      style={{ background: 'transparent' }}
    >
      <PlumbingScene mouseX={mouse.x} mouseY={mouse.y} />
    </Canvas>
  );
}
