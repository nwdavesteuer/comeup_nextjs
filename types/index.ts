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

// Generated social media post
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

