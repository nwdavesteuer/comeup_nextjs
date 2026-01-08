'use client';

import { Suspense, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import type { Galaxy, World } from '@/types';

// Lazy load Three.js components only on client
let Canvas: any;
let useFrame: any;
let OrbitControls: any;
let Stars: any;
let Text: any;

if (typeof window !== 'undefined') {
  // Only import on client side
  const fiber = require('@react-three/fiber');
  const drei = require('@react-three/drei');
  Canvas = fiber.Canvas;
  useFrame = fiber.useFrame;
  OrbitControls = drei.OrbitControls;
  Stars = drei.Stars;
  Text = drei.Text;
}

interface Galaxy3DViewProps {
  galaxy: Galaxy;
  onWorldClick?: (world: World) => void;
}

// Sun in center
function Sun() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2.5, 32, 32]} />
      <meshStandardMaterial
        color="#FFD700"
        emissive="#FFD700"
        emissiveIntensity={1.5}
      />
      <pointLight intensity={3} distance={30} decay={2} />
    </mesh>
  );
}

// Individual World orbiting around sun
function WorldSphere({
  world,
  angle,
  distance,
  onClick,
}: {
  world: World;
  angle: number;
  distance: number;
  onClick: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const orbitRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (orbitRef.current) {
      // Orbit around sun - each world has its own speed based on distance
      const time = state.clock.getElapsedTime();
      const speed = 0.3 / (distance / 4); // Closer worlds orbit faster
      orbitRef.current.position.x = Math.cos(angle + time * speed) * distance;
      orbitRef.current.position.z = Math.sin(angle + time * speed) * distance;
    }
    if (meshRef.current) {
      // Spin on axis
      meshRef.current.rotation.y += 0.03;
    }
  });

  const isGreyedOut = !world.isReleased && !world.isPublic;
  const color = isGreyedOut ? '#4a4a4a' : world.color || '#FFFFFF';

  return (
    <group ref={orbitRef}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.4 : 1.2}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={isGreyedOut ? '#000000' : color}
          emissiveIntensity={isGreyedOut ? 0 : 0.8}
          opacity={isGreyedOut ? 0.5 : 1}
          transparent={isGreyedOut}
        />
      </mesh>
      {/* World Name Label */}
      {!isGreyedOut && Text && (
        <Text
          position={[0, -1.8, 0]}
          fontSize={0.4}
          color="#FFD700"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          {world.name}
        </Text>
      )}
      {/* Hover indicator */}
      {hovered && (
        <mesh position={[0, 0, 0]}>
          <ringGeometry args={[1.3, 1.5, 32]} />
          <meshStandardMaterial
            color="#FFD700"
            emissive="#FFD700"
            emissiveIntensity={0.5}
            transparent
            opacity={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
}

// Main 3D Scene
function Scene({ galaxy, onWorldClick }: Galaxy3DViewProps) {
  // Calculate orbital positions for worlds - each on its own concentric orbit
  const worldData = galaxy.worlds.map((world, index) => {
    // Each world gets its own orbit distance (concentric orbits)
    // First world at distance 5, each subsequent world 2 units farther
    const baseDistance = 5;
    const distance = baseDistance + (index * 2);
    
    // Distribute worlds evenly around their orbit
    // Each world starts at a different angle for visual variety
    const angle = (index * 0.618) * Math.PI * 2; // Golden angle for better distribution
    
    return { world, angle, distance };
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      <Stars radius={50} depth={30} count={2000} factor={4} fade speed={1} />

      {/* Sun in center */}
      <Sun />

      {/* Worlds orbiting - each on its own concentric orbit */}
      {worldData.map(({ world, angle, distance }, index) => (
        <WorldSphere
          key={world.id}
          world={world}
          angle={angle}
          distance={distance}
          onClick={() => onWorldClick?.(world)}
        />
      ))}

      {/* Orbital rings (visual guides) - optional, can be removed if too cluttered */}
      {worldData.map(({ distance }, index) => (
        <mesh key={`ring-${index}`} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[distance - 0.1, distance + 0.1, 64]} />
          <meshStandardMaterial
            color="#FFD700"
            emissive="#FFD700"
            emissiveIntensity={0.1}
            transparent
            opacity={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={40}
        autoRotate={false}
      />
    </>
  );
}

export function Galaxy3DView({ galaxy, onWorldClick }: Galaxy3DViewProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Ensure Three.js is loaded before rendering
    if (typeof window !== 'undefined' && Canvas) {
      setIsReady(true);
    }
  }, []);

  if (!isReady || !Canvas) {
    return (
      <div className="w-full h-screen bg-black relative flex items-center justify-center">
        <div className="text-yellow-400 font-star-wars text-xl">Initializing 3D...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-black relative">
      {/* Galaxy Title Overlay */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10 text-center">
        <h1 className="text-4xl font-star-wars text-yellow-400 mb-2">
          {galaxy.name}
        </h1>
        {new Date(galaxy.releaseDate) > new Date() && (
          <div className="text-yellow-400 font-star-wars text-lg">
            Releasing in {Math.ceil((new Date(galaxy.releaseDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days
          </div>
        )}
        {galaxy.worlds.length > 0 && (
          <div className="text-gray-400 font-star-wars text-sm mt-2">
            {galaxy.worlds.length} {galaxy.worlds.length === 1 ? 'world' : 'worlds'}
          </div>
        )}
      </div>

      <Canvas
        camera={{ position: [0, 12, 20], fov: 60 }}
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          <Scene galaxy={galaxy} onWorldClick={onWorldClick} />
        </Suspense>
      </Canvas>
    </div>
  );
}
