'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { CreatorAccountData, UserType } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const creatorOnboardingSchema = z.object({
  creatorName: z.string().min(1, 'Creator name is required').max(100),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  userType: z.enum(['artist', 'videographer', 'editor', 'viewer']),
  spotifyLinked: z.boolean().optional(),
  instagramLinked: z.boolean().optional(),
});

type CreatorOnboardingFormData = z.infer<typeof creatorOnboardingSchema>;

interface CreatorOnboardingFormProps {
  onSuccess?: (data: CreatorAccountData) => void;
}

const USER_TYPES: { value: UserType; label: string }[] = [
  { value: 'artist', label: 'Artist' },
  { value: 'videographer', label: 'Videographer' },
  { value: 'editor', label: 'Editor' },
  { value: 'viewer', label: 'Viewer' },
];

export function CreatorOnboardingForm({ onSuccess }: CreatorOnboardingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [spotifyLinked, setSpotifyLinked] = useState(false);
  const [instagramLinked, setInstagramLinked] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreatorOnboardingFormData>({
    resolver: zodResolver(creatorOnboardingSchema),
    defaultValues: {
      userType: 'artist',
      spotifyLinked: false,
      instagramLinked: false,
    },
  });

  const userType = watch('userType');

  const onSubmit = async (data: CreatorOnboardingFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // TODO: Call API to create account
      // For now, just pass data to parent
      const accountData: CreatorAccountData = {
        creatorName: data.creatorName,
        email: data.email,
        password: data.password,
        userType: data.userType,
        spotifyLinked: spotifyLinked,
        instagramLinked: instagramLinked,
      };

      if (onSuccess) {
        onSuccess(accountData);
      }
    } catch (error) {
      console.error('Error creating account:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to create account';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-black/90 border-yellow-500/50">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-star-wars text-yellow-400 mb-2">
          Join The Multiverse
        </CardTitle>
        <CardDescription className="text-gray-400 font-star-wars">
          Begin Your Journey
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Creator Name */}
          <div className="space-y-2">
            <Label htmlFor="creatorName" className="font-star-wars text-yellow-400">
              Creator Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="creatorName"
              placeholder="Your creator name"
              {...register('creatorName')}
              className="bg-black/50 border-yellow-500/30 text-white font-star-wars placeholder:text-gray-600 focus:border-yellow-500"
            />
            {errors.creatorName && (
              <p className="text-sm text-red-500">{errors.creatorName.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="font-star-wars text-yellow-400">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              {...register('email')}
              className="bg-black/50 border-yellow-500/30 text-white font-star-wars placeholder:text-gray-600 focus:border-yellow-500"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password" className="font-star-wars text-yellow-400">
              Creator Encryption <span className="text-red-500">*</span>
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your encryption"
              {...register('password')}
              className="bg-black/50 border-yellow-500/30 text-white font-star-wars placeholder:text-gray-600 focus:border-yellow-500"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* User Type */}
          <div className="space-y-2">
            <Label htmlFor="userType" className="font-star-wars text-yellow-400">
              Creator Type <span className="text-red-500">*</span>
            </Label>
            <Select
              value={userType}
              onValueChange={(value) => setValue('userType', value as UserType)}
            >
              <SelectTrigger className="bg-black/50 border-yellow-500/30 text-white font-star-wars focus:border-yellow-500">
                <SelectValue placeholder="Select your type" />
              </SelectTrigger>
              <SelectContent className="bg-black border-yellow-500/30">
                {USER_TYPES.map((type) => (
                  <SelectItem
                    key={type.value}
                    value={type.value}
                    className="font-star-wars text-white hover:bg-yellow-500/20"
                  >
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.userType && (
              <p className="text-sm text-red-500">{errors.userType.message}</p>
            )}
          </div>

          {/* Spotify Link */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="spotifyLinked"
                checked={spotifyLinked}
                onChange={(e) => {
                  setSpotifyLinked(e.target.checked);
                  setValue('spotifyLinked', e.target.checked);
                }}
                className="w-4 h-4 text-yellow-500 bg-black border-yellow-500/30 rounded focus:ring-yellow-500"
              />
              <Label htmlFor="spotifyLinked" className="font-star-wars text-yellow-400 cursor-pointer">
                Link Spotify
              </Label>
            </div>
          </div>

          {/* Instagram Link */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="instagramLinked"
                checked={instagramLinked}
                onChange={(e) => {
                  setInstagramLinked(e.target.checked);
                  setValue('instagramLinked', e.target.checked);
                }}
                className="w-4 h-4 text-yellow-500 bg-black border-yellow-500/30 rounded focus:ring-yellow-500"
              />
              <Label htmlFor="instagramLinked" className="font-star-wars text-yellow-400 cursor-pointer">
                Link Instagram
              </Label>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 text-sm text-red-500 bg-red-500/10 rounded-md border border-red-500/20 font-star-wars">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full font-star-wars bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 text-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Initializing...' : 'Enter The Multiverse'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

