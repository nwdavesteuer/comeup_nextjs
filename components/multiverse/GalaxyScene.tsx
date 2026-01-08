'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import type { Galaxy, World } from '@/types';

interface SceneProps {
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
      <sphereGeometry args={[2, 32, 32]} />
      <meshStandardMaterial
        color="#FFD700"
        emissive="#FFD700"
        emissiveIntensity={1}
      />
      <pointLight intensity={2} distance={20} decay={2} />
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
      // Orbit around sun
      const time = state.clock.getElapsedTime();
      orbitRef.current.position.x = Math.cos(angle + time * 0.5) * distance;
      orbitRef.current.position.z = Math.sin(angle + time * 0.5) * distance;
    }
    if (meshRef.current) {
      // Spin on axis
      meshRef.current.rotation.y += 0.02;
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
        scale={hovered ? 1.3 : 1}
      >
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={isGreyedOut ? '#000000' : color}
          emissiveIntensity={isGreyedOut ? 0 : 0.5}
          opacity={isGreyedOut ? 0.5 : 1}
          transparent={isGreyedOut}
        />
      </mesh>
    </group>
  );
}

// Main 3D Scene
export function Scene({ galaxy, onWorldClick }: SceneProps) {
  // Calculate orbital positions for worlds
  const worldData = galaxy.worlds.map((world, index) => {
    const angle = (index / Math.max(galaxy.worlds.length, 1)) * Math.PI * 2;
    // Distance from sun based on release date (farther = later release)
    const releaseDate = new Date(world.releaseDate);
    const galaxyReleaseDate = new Date(galaxy.releaseDate);
    const daysDiff = (releaseDate.getTime() - galaxyReleaseDate.getTime()) / (1000 * 60 * 60 * 24);
    const baseDistance = 4;
    const distance = baseDistance + (daysDiff / 30) * 2; // Scale: 30 days = 2 units
    
    return { world, angle, distance: Math.max(baseDistance, distance) };
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Stars radius={30} depth={20} count={1000} factor={4} fade speed={1} />

      {/* Sun in center */}
      <Sun />

      {/* Worlds orbiting */}
      {worldData.map(({ world, angle, distance }, index) => (
        <WorldSphere
          key={world.id}
          world={world}
          angle={angle}
          distance={distance}
          onClick={() => onWorldClick?.(world)}
        />
      ))}

      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={8}
        maxDistance={25}
      />
    </>
  );
}

