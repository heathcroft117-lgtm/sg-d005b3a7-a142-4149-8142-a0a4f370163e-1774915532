import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';

interface PipeSegment {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  delay: number;
}

function CopperMaterial() {
  return (
    <meshStandardMaterial
      color="#b87333"
      metalness={0.9}
      roughness={0.2}
      envMapIntensity={1.2}
    />
  );
}

function JointMaterial() {
  return (
    <meshStandardMaterial
      color="#8c5a2a"
      metalness={0.95}
      roughness={0.15}
      envMapIntensity={1.5}
    />
  );
}

const pipeLayout: PipeSegment[] = [
  // Main horizontal pipe
  { position: [0, 0, 0], rotation: [0, 0, Math.PI / 2], scale: [1, 3, 1], delay: 0 },
  // Left vertical
  { position: [-1.5, 1.2, 0], rotation: [0, 0, 0], scale: [1, 1.8, 1], delay: 0.2 },
  // Right vertical
  { position: [1.5, -1.2, 0], rotation: [0, 0, 0], scale: [1, 1.8, 1], delay: 0.4 },
  // Top horizontal
  { position: [0.5, 2, 0], rotation: [0, 0, Math.PI / 2], scale: [1, 2, 1], delay: 0.6 },
  // Bottom horizontal
  { position: [-0.5, -2, 0], rotation: [0, 0, Math.PI / 2], scale: [1, 2, 1], delay: 0.8 },
  // Diagonal accent
  { position: [0, 0, -0.5], rotation: [Math.PI / 4, 0, 0], scale: [0.8, 2.5, 0.8], delay: 1.0 },
];

function Pipe({ position, rotation, scale, delay }: PipeSegment) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(1);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = Math.sin(t * 0.3 + delay) * 0.08;
    const targetScale = visible;
    meshRef.current.scale.setScalar(
      THREE.MathUtils.lerp(meshRef.current.scale.x / scale[0], targetScale, 0.05) * scale[0]
    );
  });

  return (
    <group position={new THREE.Vector3(...position)} rotation={new THREE.Euler(...rotation)}>
      <mesh ref={meshRef} scale={[0.001, 0.001, 0.001]}>
        <cylinderGeometry args={[0.12, 0.12, scale[1], 12]} />
        <CopperMaterial />
      </mesh>
      {/* End caps / joints */}
      <mesh position={[0, scale[1] / 2, 0]}>
        <sphereGeometry args={[0.14, 10, 10]} />
        <JointMaterial />
      </mesh>
      <mesh position={[0, -scale[1] / 2, 0]}>
        <sphereGeometry args={[0.14, 10, 10]} />
        <JointMaterial />
      </mesh>
    </group>
  );
}

function WaterDrop({ position, speed }: { position: [number, number, number]; speed: number }) {
  const ref = useRef<THREE.Mesh>(null!);
  const initialY = useRef(position[1]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y -= speed * 0.015;
    if (ref.current.position.y < -4) {
      ref.current.position.y = initialY.current + Math.random() * 2;
    }
    ref.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 2 + position[0]) * 0.2;
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.04, 6, 6]} />
      <meshStandardMaterial
        color="#60a5fa"
        transparent
        opacity={0.7}
        metalness={0.1}
        roughness={0.0}
        emissive="#1d4ed8"
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}

function AssemblyScene({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const groupRef = useRef<THREE.Group>(null!);
  const lightRef = useRef<THREE.PointLight>(null!);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t * 0.15) * 0.2 + mouseX * 0.3;
    groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.05 + mouseY * 0.15;

    if (lightRef.current) {
      lightRef.current.position.x = mouseX * 5;
      lightRef.current.position.y = mouseY * 5 + 2;
    }
  });

  const waterDrops = useMemo(() => (
    Array.from({ length: 25 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 2,
      ] as [number, number, number],
      speed: 0.4 + Math.random() * 0.8,
    }))
  ), []);

  return (
    <>
      <ambientLight intensity={0.3} color="#b0c8ff" />
      <directionalLight position={[5, 10, 5]} intensity={0.8} color="#fff8f0" castShadow />
      <directionalLight position={[-5, -5, 5]} intensity={0.3} color="#b87333" />
      <pointLight ref={lightRef} position={[2, 3, 3]} intensity={1.5} color="#e8602c" distance={10} />
      <pointLight position={[-3, 2, 2]} intensity={0.6} color="#f5a623" distance={8} />

      <group ref={groupRef}>
        {pipeLayout.map((pipe, i) => (
          <Pipe key={i} {...pipe} />
        ))}
        {/* Central hub */}
        <mesh>
          <sphereGeometry args={[0.22, 16, 16]} />
          <meshStandardMaterial color="#f5a623" metalness={0.95} roughness={0.1} emissive="#e8602c" emissiveIntensity={0.2} />
        </mesh>
      </group>

      {waterDrops.map((drop, i) => (
        <WaterDrop key={i} position={drop.position} speed={drop.speed} />
      ))}
    </>
  );
}

export default function PipeScene3D() {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMouseX((e.clientX / window.innerWidth - 0.5) * 2);
      setMouseY(-(e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 7]} fov={45} />
      <AssemblyScene mouseX={mouseX} mouseY={mouseY} />
    </Canvas>
  );
}
