'use client';

import { useState } from 'react';
import type { Galaxy, World } from '@/types';
import { WorldCreationForm } from './WorldCreationForm';
import { WorldDetailView } from './WorldDetailView';
import { Galaxy3DWrapper } from './Galaxy3DWrapper';
import { SnapshotCalendar } from './SnapshotCalendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface GalaxyViewProps {
  galaxy: Galaxy;
  onUpdateWorld?: (worldData: Partial<World>) => void;
}

export function GalaxyView({ galaxy, onUpdateWorld }: GalaxyViewProps) {
  const [selectedWorld, setSelectedWorld] = useState<World | null>(null);
  const [showWorldForm, setShowWorldForm] = useState(false);
  const [showWorldDetail, setShowWorldDetail] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleWorldClick = (world: World) => {
    // If world has a name (has been created), show detail view
    // Otherwise, show creation form
    if (world.name && world.name !== 'Unnamed World') {
      setSelectedWorld(world);
      setShowWorldDetail(true);
    } else {
      setSelectedWorld(world);
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

  const handleWorldUpdate = (updatedWorld: World) => {
    // Update the world in the galaxy
    // TODO: Save to database
    if (onUpdateWorld) {
      onUpdateWorld(updatedWorld);
    }
    setShowWorldDetail(false);
    setSelectedWorld(null);
  };

  return (
    <div className="relative w-full h-screen bg-black">
      {/* 3D Galaxy View */}
      <Galaxy3DWrapper
        galaxy={galaxy}
        onWorldClick={handleWorldClick}
      />

      {/* Info Panel */}
      <div className="absolute top-4 left-4 z-10 bg-black/80 border border-yellow-500/30 rounded-lg p-4 max-w-xs">
        <h2 className="text-xl font-star-wars text-yellow-400 mb-2">{galaxy.name}</h2>
        <p className="text-sm text-gray-400 mb-2">
          {galaxy.worlds.length} world{galaxy.worlds.length !== 1 ? 's' : ''} created
        </p>
        <p className="text-xs text-gray-500 mb-3">
          Click on a world to view timeline, shoot days, and calendar sync
        </p>
        <button
          onClick={() => setShowCalendar(true)}
          className="w-full px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-star-wars font-bold rounded text-sm"
        >
          View Calendar
        </button>
      </div>

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

      {/* World Detail View */}
      {showWorldDetail && selectedWorld && (
        <WorldDetailView
          world={selectedWorld}
          onClose={() => {
            setShowWorldDetail(false);
            setSelectedWorld(null);
          }}
          onUpdate={handleWorldUpdate}
        />
      )}

      {/* Calendar View */}
      {showCalendar && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <Card className="w-full max-w-6xl bg-gray-900 border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl text-white">Snapshot Calendar</CardTitle>
                  <CardDescription className="text-gray-400">
                    {galaxy.name} - All Worlds
                  </CardDescription>
                </div>
                <Button
                  onClick={() => setShowCalendar(false)}
                  variant="ghost"
                  className="text-gray-400 hover:text-white"
                >
                  Close
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <SnapshotCalendar
                worlds={galaxy.worlds}
                galaxy={galaxy}
                onEventClick={(event) => {
                  // Find the world and open its detail view
                  const world = galaxy.worlds.find((w) => w.id === event.worldId);
                  if (world) {
                    setSelectedWorld(world);
                    setShowWorldDetail(true);
                    setShowCalendar(false);
                  }
                }}
              />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
