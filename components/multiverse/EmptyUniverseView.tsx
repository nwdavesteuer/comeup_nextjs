'use client';

import dynamic from 'next/dynamic';
import type { Universe } from '@/types';

// Dynamically import the entire 3D component to prevent SSR
const EmptyUniverse3D = dynamic(
  () => import('./EmptyUniverse3D').then((mod) => mod.EmptyUniverse3D),
  { 
    ssr: false,
    loading: () => (
      <div className="relative w-full h-screen bg-black flex items-center justify-center">
        <div className="text-yellow-400 font-star-wars text-xl">Loading universe...</div>
      </div>
    )
  }
);

interface EmptyUniverseViewProps {
  universe: Universe;
  onCreateGalaxy?: (galaxyData: any) => void;
}

export function EmptyUniverseView({ universe, onCreateGalaxy }: EmptyUniverseViewProps) {
  return <EmptyUniverse3D universe={universe} onCreateGalaxy={onCreateGalaxy} />;
}
