import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Particles({ count }: { count: number }) {
  const pointsRef = useRef<THREE.Points>(null!);

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4 - 2;
      velocities[i] = 0.005 + Math.random() * 0.015;
    }
    return { positions, velocities };
  }, [count]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions.slice(), 3));
    return geo;
  }, [positions]);

  useFrame(() => {
    if (!pointsRef.current) return;
    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] -= velocities[i];
      if (pos[i * 3 + 1] < -6) {
        pos[i * 3 + 1] = 6;
        pos[i * 3] = (Math.random() - 0.5) * 20;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.06}
        color="#60a5fa"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function WaterDroplets3D() {
  const [count, setCount] = useState(150);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    setCount(isMobile ? 150 : 300);
  }, []);

  return (
    <Canvas
      dpr={[1, 1]}
      gl={{ antialias: false, alpha: true }}
      style={{ background: 'transparent', position: 'absolute', inset: 0, pointerEvents: 'none' }}
      camera={{ position: [0, 0, 8], fov: 60 }}
    >
      <ambientLight intensity={0.2} />
      <Particles count={count} />
    </Canvas>
  );
}
