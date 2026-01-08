'use client';

import { useState, Suspense, useEffect } from 'react';
import type { Universe } from '@/types';
import { GalaxyCreationForm } from './GalaxyCreationForm';

// Lazy load Three.js components only on client
let Canvas: any;
let OrbitControls: any;
let Stars: any;
let Text: any;

if (typeof window !== 'undefined') {
  // Only import on client side
  const fiber = require('@react-three/fiber');
  const drei = require('@react-three/drei');
  Canvas = fiber.Canvas;
  OrbitControls = drei.OrbitControls;
  Stars = drei.Stars;
  Text = drei.Text;
}

interface SceneProps {
  universe: { name: string };
  onCreateGalaxy: () => void;
}

function Scene({ universe, onCreateGalaxy }: SceneProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} />

      {/* Universe Title in 3D */}
      <Text
        position={[0, 8, 0]}
        fontSize={1.5}
        color="#FFD700"
        anchorX="center"
        anchorY="middle"
      >
        {universe.name}
      </Text>

      {/* Create Galaxy Indicator */}
      <group position={[0, 0, 0]}>
        <mesh
          onClick={onCreateGalaxy}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          scale={hovered ? 1.2 : 1}
        >
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial
            color="#FFD700"
            emissive="#FFD700"
            emissiveIntensity={hovered ? 1 : 0.5}
            transparent
            opacity={0.6}
          />
        </mesh>
        <Text
          position={[0, -1.5, 0]}
          fontSize={0.5}
          color="#FFD700"
          anchorX="center"
          anchorY="middle"
        >
          +
        </Text>
        <Text
          position={[0, -2.5, 0]}
          fontSize={0.3}
          color="#FFD700"
          anchorX="center"
          anchorY="middle"
        >
          create a galaxy
        </Text>
      </group>

      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={30}
      />
    </>
  );
}

interface EmptyUniverse3DViewProps {
  universe: Universe;
  onCreateGalaxy?: (galaxyData: any) => void;
}

export function EmptyUniverse3DView({ universe, onCreateGalaxy }: EmptyUniverse3DViewProps) {
  const [showGalaxyForm, setShowGalaxyForm] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Ensure Three.js is loaded before rendering
    if (typeof window !== 'undefined' && Canvas) {
      setIsReady(true);
    }
  }, []);

  const handleCreateGalaxy = (galaxyData: any) => {
    if (onCreateGalaxy) {
      onCreateGalaxy(galaxyData);
    }
    setShowGalaxyForm(false);
  };

  if (showGalaxyForm) {
    return (
      <GalaxyCreationForm
        universeId={universe.id}
        onSuccess={handleCreateGalaxy}
        onCancel={() => setShowGalaxyForm(false)}
      />
    );
  }

  if (!isReady || !Canvas) {
    return (
      <div className="relative w-full h-screen bg-black flex items-center justify-center">
        <div className="text-yellow-400 font-star-wars text-xl">Initializing 3D...</div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen bg-black">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          <Scene
            universe={universe}
            onCreateGalaxy={() => setShowGalaxyForm(true)}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

