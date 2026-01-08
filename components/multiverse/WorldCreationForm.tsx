'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { World, VisualLandscape, SnapshotStrategy } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const worldCreationSchema = z.object({
  name: z.string().min(1, 'World name is required').max(100),
  releaseDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Release date must be in YYYY-MM-DD format'),
});

type WorldCreationFormData = z.infer<typeof worldCreationSchema>;

interface WorldCreationFormProps {
  galaxyId: string;
  galaxyVisualLandscape: VisualLandscape;
  onSuccess?: (worldData: Partial<World>) => void;
  onCancel?: () => void;
}

const COLOR_PALETTE = [
  '#8B0000', '#FFD700', '#C0C0C0', '#00008B', '#FF1493', '#FFFFFF',
  '#228B22', '#FF4500', '#4B0082', '#00CED1', '#FF69B4', '#808080',
];

export function WorldCreationForm({
  galaxyId,
  galaxyVisualLandscape,
  onSuccess,
  onCancel,
}: WorldCreationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [showSnapshotBuilder, setShowSnapshotBuilder] = useState(false);
  const [snapshotStrategy, setSnapshotStrategy] = useState<SnapshotStrategy | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<WorldCreationFormData>();

  const handleImageSelect = (imageUrl: string) => {
    if (selectedImages.includes(imageUrl)) {
      setSelectedImages(selectedImages.filter((img) => img !== imageUrl));
    } else {
      setSelectedImages([...selectedImages, imageUrl]);
    }
  };

  const handleBuildSnapshotSchedule = async () => {
    setIsSubmitting(true);
    
    try {
      // TODO: Call AI API to generate snapshot strategy
      // For now, create a mock strategy based on form data
      const formData = {
        name: watch('name') || 'Untitled World',
        releaseDate: watch('releaseDate') || new Date().toISOString().split('T')[0],
        color: selectedColor,
        images: selectedImages,
      };

      // Call API endpoint for snapshot generation
      const response = await fetch('/api/generate-snapshots', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          worldName: formData.name,
          releaseDate: formData.releaseDate,
          color: formData.color,
          visualReferences: formData.images,
          galaxyVisualLandscape: galaxyVisualLandscape,
        }),
      });

      let strategy: SnapshotStrategy;

      if (response.ok) {
        const data = await response.json();
        strategy = data;
      } else {
        // Fallback to mock strategy if API fails
        strategy = {
          id: `snapshot-${Date.now()}`,
          worldId: `world-${Date.now()}`,
          snapshots: [
            {
              id: 'snapshot-1',
              worldId: `world-${Date.now()}`,
              visualDescription: `A 15-second loop featuring the artist in a ${selectedColor} color-graded scene, capturing the essence of "${formData.name}"`,
              caption: `New single "${formData.name}" coming soon 🎵`,
              platform: 'instagram',
              contentType: 'reel',
              suggestedFilmingDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              timing: 'Tuesday 2pm',
              order: 1,
            },
            {
              id: 'snapshot-2',
              worldId: `world-${Date.now()}`,
              visualDescription: `A 10-second loop with atmospheric visuals matching the ${selectedColor} color palette, building anticipation for the release`,
              caption: 'The journey begins... ✨',
              platform: 'instagram',
              contentType: 'reel',
              suggestedFilmingDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              timing: 'Friday 3pm',
              order: 2,
            },
          ],
          generatedAt: new Date().toISOString(),
        };
      }

      setSnapshotStrategy(strategy);
      setShowSnapshotBuilder(true);
    } catch (error) {
      console.error('Error generating snapshot strategy:', error);
      alert('Failed to generate snapshot strategy. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmit = async (data: WorldCreationFormData) => {
    if (!selectedColor) {
      alert('Please select a color for your world');
      return;
    }

    setIsSubmitting(true);

    try {
      const visualLandscape: VisualLandscape = {
        images: selectedImages.length > 0 ? selectedImages : galaxyVisualLandscape.images,
        colorPalette: selectedColor ? [selectedColor] : galaxyVisualLandscape.colorPalette,
      };

      const worldData: Partial<World> = {
        name: data.name,
        galaxyId,
        releaseDate: data.releaseDate,
        color: selectedColor,
        visualLandscape,
        snapshotStrategy: snapshotStrategy || undefined,
        isPublic: false,
        isReleased: false,
      };

      if (onSuccess) {
        onSuccess(worldData);
      }
    } catch (error) {
      console.error('Error creating world:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  if (showSnapshotBuilder && snapshotStrategy) {
    return (
      <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-black/95 border-yellow-500/50">
          <CardHeader>
            <CardTitle className="text-3xl font-star-wars text-yellow-400 mb-2">
              Snapshot Schedule
            </CardTitle>
            <CardDescription className="text-gray-400 font-star-wars">
              AI-generated visual descriptions for your snapshots
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {snapshotStrategy.snapshots.map((snapshot, index) => (
                <div
                  key={snapshot.id}
                  className="border border-yellow-500/30 rounded-lg p-4 bg-black/50"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-star-wars text-yellow-400 text-lg">
                        Snapshot {index + 1}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {snapshot.platform} • {snapshot.contentType}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-yellow-400 font-star-wars">
                        {snapshot.timing}
                      </p>
                      {snapshot.suggestedFilmingDate && (
                        <p className="text-xs text-gray-500">
                          Film: {new Date(snapshot.suggestedFilmingDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                  <p className="text-white mb-2">{snapshot.visualDescription}</p>
                  {snapshot.caption && (
                    <p className="text-gray-400 italic">"{snapshot.caption}"</p>
                  )}
                </div>
              ))}
              <div className="flex gap-4 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowSnapshotBuilder(false)}
                  className="flex-1 font-star-wars border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10"
                >
                  Back
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setShowSnapshotBuilder(false);
                    handleSubmit(onSubmit)();
                  }}
                  className="flex-1 font-star-wars bg-yellow-500 hover:bg-yellow-600 text-black font-bold"
                >
                  Complete World
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-black/95 border-yellow-500/50">
        <CardHeader>
          <CardTitle className="text-3xl font-star-wars text-yellow-400 mb-2">
            Build Your World
          </CardTitle>
          <CardDescription className="text-gray-400 font-star-wars">
            Create a single release within your galaxy
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* World Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="font-star-wars text-yellow-400">
                World Name (Song Title) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                placeholder="e.g., Will I Find You"
                {...register('name')}
                className="bg-black/50 border-yellow-500/30 text-white font-star-wars placeholder:text-gray-600 focus:border-yellow-500"
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Color Selection */}
            <div className="space-y-2">
              <Label className="font-star-wars text-yellow-400">
                World Color <span className="text-red-500">*</span>
              </Label>
              <p className="text-sm text-gray-400 mb-4">
                Select a color that represents this world's visual identity
              </p>
              <div className="flex flex-wrap gap-3">
                {COLOR_PALETTE.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`w-16 h-16 rounded-full border-2 transition-all ${
                      selectedColor === color
                        ? 'border-yellow-500 ring-4 ring-yellow-500 scale-110'
                        : 'border-gray-700 hover:border-yellow-500/50'
                    }`}
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
              {selectedColor && (
                <p className="text-sm text-yellow-400 mt-2">
                  Selected: <span style={{ color: selectedColor }}>●</span> {selectedColor}
                </p>
              )}
            </div>

            {/* Image Selection (from galaxy or new) */}
            <div className="space-y-2">
              <Label className="font-star-wars text-yellow-400">
                Visual References
              </Label>
              <p className="text-sm text-gray-400 mb-4">
                Select specific images for this world (or use galaxy defaults)
              </p>
              <div className="grid grid-cols-4 gap-4 max-h-48 overflow-y-auto">
                {galaxyVisualLandscape.images.map((imageUrl, index) => (
                  <div
                    key={index}
                    className={`relative cursor-pointer border-2 rounded-lg overflow-hidden transition-all ${
                      selectedImages.includes(imageUrl)
                        ? 'border-yellow-500 ring-2 ring-yellow-500'
                        : 'border-gray-700 hover:border-yellow-500/50'
                    }`}
                    onClick={() => handleImageSelect(imageUrl)}
                  >
                    <img
                      src={imageUrl}
                      alt={`Reference ${index + 1}`}
                      className="w-full h-24 object-cover"
                    />
                    {selectedImages.includes(imageUrl) && (
                      <div className="absolute top-2 right-2 bg-yellow-500 text-black rounded-full w-6 h-6 flex items-center justify-center font-bold">
                        ✓
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Release Date */}
            <div className="space-y-2">
              <Label htmlFor="releaseDate" className="font-star-wars text-yellow-400">
                World Release Date <span className="text-red-500">*</span>
              </Label>
              <Input
                id="releaseDate"
                type="date"
                min={today}
                {...register('releaseDate')}
                className="bg-black/50 border-yellow-500/30 text-white font-star-wars placeholder:text-gray-600 focus:border-yellow-500"
              />
              {errors.releaseDate && (
                <p className="text-sm text-red-500">{errors.releaseDate.message}</p>
              )}
              <p className="text-sm text-gray-400">
                This is when this single will be released (can be different from galaxy release date)
              </p>
            </div>

            {/* Snapshot Schedule Builder */}
            <div className="space-y-2">
              <Label className="font-star-wars text-yellow-400">
                Snapshot Schedule
              </Label>
              <Button
                type="button"
                variant="outline"
                onClick={handleBuildSnapshotSchedule}
                disabled={isSubmitting || !selectedColor}
                className="w-full font-star-wars border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10"
              >
                {isSubmitting ? 'Generating Snapshots...' : 'Build Snapshot Schedule with AI'}
              </Button>
              <p className="text-sm text-gray-400">
                AI will generate visual, imagery-rich descriptions of snapshots based on your release date and visual information
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              {onCancel && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  className="flex-1 font-star-wars border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10"
                >
                  Cancel
                </Button>
              )}
              <Button
                type="submit"
                className="flex-1 font-star-wars bg-yellow-500 hover:bg-yellow-600 text-black font-bold"
                disabled={isSubmitting || !selectedColor}
              >
                {isSubmitting ? 'Creating World...' : 'Create World'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

