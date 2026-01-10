'use client';

import { useState } from 'react';
import { CreatorOnboardingForm } from '@/components/multiverse/CreatorOnboardingForm';
import { EmptyUniverseView } from '@/components/multiverse/EmptyUniverseView';
import { GalaxyView } from '@/components/multiverse/GalaxyView';
import { LoadingScreen } from '@/components/multiverse/LoadingScreen';
import type { CreatorAccountData, Universe, Galaxy, World } from '@/types';

export default function Home() {
  const [account, setAccount] = useState<CreatorAccountData | null>(null);
  const [universe, setUniverse] = useState<Universe | null>(null);
  const [currentGalaxy, setCurrentGalaxy] = useState<Galaxy | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Step 1: Onboarding
  const handleAccountCreated = (accountData: CreatorAccountData) => {
    setAccount(accountData);
    
    // Create empty universe
    const newUniverse: Universe = {
      id: `universe-${Date.now()}`,
      name: `The ${accountData.creatorName}verse`,
      creatorId: `creator-${Date.now()}`,
      createdAt: new Date().toISOString(),
      galaxies: [],
    };
    
    setUniverse(newUniverse);
  };

  // Step 2: Galaxy Creation
  const handleGalaxyCreated = async (galaxyData: Partial<Galaxy>) => {
    if (!universe) return;

    setIsLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const newGalaxy: Galaxy = {
      id: `galaxy-${Date.now()}`,
      name: galaxyData.name || 'Unnamed Galaxy',
      universeId: universe.id,
      releaseDate: galaxyData.releaseDate || new Date().toISOString().split('T')[0],
      visualLandscape: galaxyData.visualLandscape || { images: [], colorPalette: [] },
      worlds: [], // Will be created as greyed out worlds
      createdAt: new Date().toISOString(),
    };

    // Create greyed out worlds based on number specified
    // For now, we'll create them when the user clicks on them
    // But we could create placeholder worlds here

    setCurrentGalaxy(newGalaxy);
    setIsLoading(false);
  };

  // Step 3: World Creation
  const handleWorldCreated = (worldData: Partial<World>) => {
    if (!currentGalaxy) return;

    const worldId = worldData.id || `world-${Date.now()}`;
    
    // Update snapshot strategy with correct worldId
    let snapshotStrategy = worldData.snapshotStrategy;
    if (snapshotStrategy) {
      snapshotStrategy = {
        ...snapshotStrategy,
        worldId: worldId,
        snapshots: snapshotStrategy.snapshots.map(snapshot => ({
          ...snapshot,
          worldId: worldId,
        })),
      };
    }

    const newWorld: World = {
      id: worldId,
      name: worldData.name || 'Unnamed World',
      galaxyId: currentGalaxy.id,
      releaseDate: worldData.releaseDate || new Date().toISOString().split('T')[0],
      color: worldData.color || '#FFFFFF', // Ensure color is always set
      visualLandscape: worldData.visualLandscape || { images: [], colorPalette: [] },
      snapshotStrategy: snapshotStrategy,
      isPublic: false,
      isReleased: false,
      createdAt: new Date().toISOString(),
    };
    
    // Debug: Log to verify snapshots are included
    console.log('Creating world:', {
      id: newWorld.id,
      name: newWorld.name,
      releaseDate: newWorld.releaseDate,
      hasSnapshotStrategy: !!newWorld.snapshotStrategy,
      snapshotCount: newWorld.snapshotStrategy?.snapshots.length || 0,
      snapshots: newWorld.snapshotStrategy?.snapshots.map(s => ({
        id: s.id,
        postingDate: s.postingDate,
        worldId: s.worldId
      }))
    });

    // Update galaxy with new world
    const updatedGalaxy: Galaxy = {
      ...currentGalaxy,
      worlds: [...currentGalaxy.worlds, newWorld],
    };

    setCurrentGalaxy(updatedGalaxy);
  };

  // Render based on current state
  if (isLoading) {
    return <LoadingScreen message="Building out your galaxy..." />;
  }

  if (currentGalaxy) {
    return (
      <GalaxyView
        galaxy={currentGalaxy}
        onUpdateWorld={handleWorldCreated}
      />
    );
  }

  if (universe) {
    return (
      <EmptyUniverseView
        universe={universe}
        onCreateGalaxy={handleGalaxyCreated}
      />
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-black">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-star-wars text-yellow-400 mb-4">
            The Multiverse
          </h1>
          <p className="text-gray-400 font-star-wars text-lg">
            Build Your Visual Universe
          </p>
        </div>
        <CreatorOnboardingForm onSuccess={handleAccountCreated} />
      </div>
    </main>
  );
}
