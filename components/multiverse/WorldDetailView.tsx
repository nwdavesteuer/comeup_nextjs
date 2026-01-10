'use client';

import { useState } from 'react';
import type { World, ShootDay } from '@/types';
import { ReminderSettingsComponent } from './ReminderSettings';
import { SnapshotCalendar } from './SnapshotCalendar';
import { calculateShootDays } from '@/lib/shoot-day-calculator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface WorldDetailViewProps {
  world: World;
  onClose: () => void;
  onUpdate?: (world: World) => void;
}

export function WorldDetailView({ world, onClose, onUpdate }: WorldDetailViewProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'snapshot-schedule' | 'settings'>('overview');

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-black/95 border-yellow-500/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-3xl font-star-wars text-yellow-400 mb-2">
                {world.name}
              </CardTitle>
              <CardDescription className="text-gray-400 font-star-wars">
                Release Date: {new Date(world.releaseDate).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </CardDescription>
            </div>
            <Button
              onClick={onClose}
              variant="outline"
              className="font-star-wars border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10"
            >
              Close
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b border-yellow-500/30 overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 font-star-wars transition-colors whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'text-yellow-400 border-b-2 border-yellow-400'
                  : 'text-gray-400 hover:text-yellow-500/70'
              }`}
            >
              Overview
            </button>
            {world.snapshotStrategy && (
              <button
                onClick={() => setActiveTab('snapshot-schedule')}
                className={`px-4 py-2 font-star-wars transition-colors whitespace-nowrap ${
                  activeTab === 'snapshot-schedule'
                    ? 'text-yellow-400 border-b-2 border-yellow-400'
                    : 'text-gray-400 hover:text-yellow-500/70'
                }`}
              >
                Snapshot Schedule
              </button>
            )}
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 font-star-wars transition-colors whitespace-nowrap ${
                activeTab === 'settings'
                  ? 'text-yellow-400 border-b-2 border-yellow-400'
                  : 'text-gray-400 hover:text-yellow-500/70'
              }`}
            >
              Settings
            </button>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* World Info */}
                <div className="grid grid-cols-2 gap-4">
                  <Card className="border-yellow-500/30 bg-black/50">
                    <CardHeader>
                      <CardTitle className="text-lg font-star-wars text-yellow-400">
                        World Color
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4">
                        <div
                          className="w-24 h-24 rounded-lg border-2 border-yellow-500 shadow-lg"
                          style={{ backgroundColor: world.color }}
                        />
                        <div>
                          <p className="text-white font-mono">{world.color}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-yellow-500/30 bg-black/50">
                    <CardHeader>
                      <CardTitle className="text-lg font-star-wars text-yellow-400">
                        Status
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className={`w-3 h-3 rounded-full ${world.isReleased ? 'bg-green-500' : 'bg-gray-500'}`} />
                          <span className="text-white">
                            {world.isReleased ? 'Released' : 'Unreleased'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`w-3 h-3 rounded-full ${world.isPublic ? 'bg-green-500' : 'bg-gray-500'}`} />
                          <span className="text-white">
                            {world.isPublic ? 'Public' : 'Private'}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Snapshot Strategy Summary */}
                {world.snapshotStrategy ? (
                  <Card className="border-yellow-500/30 bg-black/50">
                    <CardHeader>
                      <CardTitle className="text-lg font-star-wars text-yellow-400">
                        Snapshot Strategy
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="text-white">
                          <span className="text-yellow-400 font-star-wars">
                            {world.snapshotStrategy.snapshots.length}
                          </span>{' '}
                          snapshots scheduled
                        </p>
                        <p className="text-gray-400 text-sm">
                          Generated: {new Date(world.snapshotStrategy.generatedAt).toLocaleDateString()}
                        </p>
                        <Button
                          onClick={() => setActiveTab('snapshot-schedule')}
                          className="mt-4 font-star-wars bg-yellow-500 hover:bg-yellow-600 text-black font-bold"
                        >
                          View Schedule
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="border-yellow-500/30 bg-black/50">
                    <CardContent className="p-6">
                      <p className="text-gray-400 font-star-wars">
                        No snapshot strategy yet. Create one to see your posting schedule.
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* Visual Landscape */}
                {world.visualLandscape.images.length > 0 && (
                  <Card className="border-yellow-500/30 bg-black/50">
                    <CardHeader>
                      <CardTitle className="text-lg font-star-wars text-yellow-400">
                        Visual References
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-4 gap-4">
                        {world.visualLandscape.images.map((imageUrl, index) => (
                          <img
                            key={index}
                            src={imageUrl}
                            alt={`Reference ${index + 1}`}
                            className="w-full h-32 object-cover rounded border border-yellow-500/30"
                          />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {activeTab === 'snapshot-schedule' && world.snapshotStrategy && (
              <SnapshotCalendar
                worlds={[world]}
                galaxy={undefined}
                snapshots={world.snapshotStrategy.snapshots}
                onEventClick={(event) => {
                  console.log('Calendar event clicked:', event);
                }}
              />
            )}

            {activeTab === 'settings' && (
              <ReminderSettingsComponent
                userId={`user-${world.id}`}
                onSave={(settings) => {
                  console.log('Reminder settings saved:', settings);
                  // TODO: Save to backend
                }}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

