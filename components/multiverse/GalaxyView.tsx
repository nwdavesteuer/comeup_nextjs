'use client';

import { useState } from 'react';
import type { Galaxy, World } from '@/types';
import { WorldCreationForm } from './WorldCreationForm';
import { Galaxy3DWrapper } from './Galaxy3DWrapper';

interface GalaxyViewProps {
  galaxy: Galaxy;
  onUpdateWorld?: (worldData: Partial<World>) => void;
}

export function GalaxyView({ galaxy, onUpdateWorld }: GalaxyViewProps) {
  const [selectedWorld, setSelectedWorld] = useState<string | null>(null);
  const [showWorldForm, setShowWorldForm] = useState(false);

  const handleWorldClick = (world: World) => {
    if (world.isReleased || world.isPublic) {
      // TODO: Navigate to world detail view
      console.log('View world:', world);
    } else {
      setSelectedWorld(world.id);
      setShowWorldForm(true);
    }
  };

  const handleWorldCreated = (worldData: Partial<World>) => {
    // TODO: Save world to database
    // For now, just close the form and let parent handle it
    setShowWorldForm(false);
    setSelectedWorld(null);
    
    // Call parent callback if provided
    if (onUpdateWorld) {
      onUpdateWorld(worldData);
    }
  };

  return (
    <div className="relative w-full h-screen bg-black">
      {/* 3D Galaxy View */}
      <Galaxy3DWrapper
        galaxy={galaxy}
        onWorldClick={handleWorldClick}
      />

      {/* Create World Button (if there are empty slots) */}
      {galaxy.worlds.length < 10 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <button
            onClick={() => setShowWorldForm(true)}
            className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-star-wars font-bold rounded-lg transition-all shadow-lg"
          >
            + Create World
          </button>
        </div>
      )}

      {/* World Creation Form */}
      {showWorldForm && (
        <WorldCreationForm
          galaxyId={galaxy.id}
          galaxyVisualLandscape={galaxy.visualLandscape}
          onSuccess={handleWorldCreated}
          onCancel={() => {
            setShowWorldForm(false);
            setSelectedWorld(null);
          }}
        />
      )}
    </div>
  );
}
