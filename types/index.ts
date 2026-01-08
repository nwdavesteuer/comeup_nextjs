// ============================================================================
// THE MULTIVERSE - NEW DATA MODEL
// ============================================================================

// User Types
export type UserType = 'artist' | 'videographer' | 'editor' | 'viewer';

// Account Creation / Onboarding
export interface CreatorAccountData {
  creatorName: string;
  email: string;
  password: string; // "creator encryption"
  userType: UserType;
  spotifyLinked?: boolean;
  instagramLinked?: boolean;
}

// Universe
export interface Universe {
  id: string;
  name: string; // e.g., "The Leon Taxverse"
  creatorId: string;
  createdAt: string;
  galaxies: Galaxy[];
}

// Galaxy (Release block/project)
export interface Galaxy {
  id: string;
  name: string;
  universeId: string;
  releaseDate: string; // ISO date string: YYYY-MM-DD
  visualLandscape: VisualLandscape;
  worlds: World[];
  createdAt: string;
}

// Visual Landscape
export interface VisualLandscape {
  images: string[]; // URLs or Pinterest image URLs
  colorPalette: string[]; // Hex color codes
  pinterestBoardId?: string;
}

// World (Individual song/release)
export interface World {
  id: string;
  name: string; // e.g., "Will I Find You"
  galaxyId: string;
  releaseDate: string; // ISO date string: YYYY-MM-DD
  color: string; // Hex color code
  visualLandscape: VisualLandscape; // More specific than galaxy
  snapshotStrategy?: SnapshotStrategy;
  isPublic: boolean;
  isReleased: boolean;
  createdAt: string;
}

// Snapshot Strategy
export interface SnapshotStrategy {
  id: string;
  worldId: string;
  snapshots: Snapshot[];
  generatedAt: string;
}

// Snapshot (Individual social media content)
export interface Snapshot {
  id: string;
  worldId: string;
  visualDescription: string; // Imagery-rich description of what it looks like
  caption?: string;
  platform: 'instagram' | 'tiktok' | 'twitter';
  contentType: 'photo' | 'video' | 'story' | 'reel' | 'carousel';
  suggestedFilmingDate?: string; // ISO date string
  timing?: string; // e.g., "Tuesday 2pm"
  order: number; // Order in release cycle
}

// ============================================================================
// LEGACY TYPES (Keeping for backward compatibility during migration)
// ============================================================================

// Artist onboarding form data
// Based on previous FastAPI ArtistBase and ArtistCreate schemas
export interface ArtistOnboardingData {
  artistName: string;
  singleTitle: string;
  releaseDate: string; // ISO date string: YYYY-MM-DD
  genre: string;
  vibe: string; // Tone/style description
  targetAudience?: string; // Optional audience description
}

// Generated social media post (LEGACY - use Snapshot instead)
// Based on previous FastAPI ContentPostBase schema, adapted for generated content
export interface GeneratedPost {
  id: string;
  week: string; // "Week -2" | "Week -1" | "Release Week" | "Week +1" | "Week +2"
  caption: string;
  platform: 'instagram' | 'tiktok' | 'twitter';
  contentType: 'photo' | 'video' | 'story' | 'reel' | 'carousel';
  timing: string; // e.g., "Tuesday 2pm"
}

// API response from content generation
export interface ContentGenerationResponse {
  posts: GeneratedPost[];
  summary: string;
  generatedAt: string; // ISO timestamp
}

// Error response structure
export interface ErrorResponse {
  error: string;
  message?: string;
  details?: unknown;
}

// Content generation request validation
export interface ContentGenerationRequest extends ArtistOnboardingData {
  // All fields from ArtistOnboardingData are required
}

// Platform-specific post variations (for future use)
export interface PlatformPost extends GeneratedPost {
  hashtags?: string[];
  mentions?: string[];
  callToAction?: string;
}

// Content performance tracking (for Phase 2)
export interface ContentPerformance {
  postId: string;
  platform: string;
  likes?: number;
  comments?: number;
  shares?: number;
  saves?: number;
  impressions?: number;
  reach?: number;
  engagementRate?: number;
  measuredAt: string;
}

