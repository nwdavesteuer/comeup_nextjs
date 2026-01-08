# Claude API Usage Guide

## Current Integration Status

✅ **Fully Integrated and Working**

Claude API is integrated into the application and ready to use. Here's how it works:

## How It Works

### 1. **Structured Content Generation** (Main Feature)

**Location:** `lib/claude.ts` → `generateContentForRelease()`

**How to use:**
1. Fill out the onboarding form on the homepage
2. Submit the form
3. Claude generates 15-20 promotional posts based on:
   - Artist name
   - Single/release title
   - Release date
   - Genre
   - Vibe/tone
   - Target audience (optional)

**The Prompt:**
- Structured prompt in `buildContentPrompt()` function
- Includes artist info, release cycle requirements, platform guidelines
- Returns JSON array of posts with captions, platforms, timing

**API Endpoint:** `POST /api/generate`

### 2. **Chat Interface** (New - For Testing)

**Location:** `/chat` page

**Purpose:** 
- Test prompts interactively
- Iterate on prompt structure
- Get immediate feedback from Claude
- Refine content generation logic

**How to use:**
1. Navigate to `http://localhost:3000/chat`
2. Type a message to Claude
3. Get real-time responses
4. Test different prompt variations

**API Endpoint:** `POST /api/chat`

## Current Prompt Structure

The main content generation prompt includes:

1. **Role Definition:** "You are a social media expert specializing in music promotion"
2. **Artist Information:** Name, single title, release date, genre, vibe, audience
3. **Content Calendar Requirements:** Week -2 through Week +2 breakdown
4. **Platform Guidelines:** Instagram, TikTok, Twitter-specific guidance
5. **Content Requirements:** Authentic voice, emoji usage, content type variety
6. **Output Format:** Structured JSON with specific fields

## Testing the Integration

### Test the Main Flow:
1. Go to `http://localhost:3000`
2. Fill out the form with test data
3. Submit and wait for generation (10-30 seconds)
4. Review the generated posts

### Test the Chat Interface:
1. Go to `http://localhost:3000/chat`
2. Try prompts like:
   - "Generate 5 Instagram captions for an indie rock artist"
   - "What makes a good social media post for music promotion?"
   - "Help me refine the prompt for release cycle content"

## Iterating on Prompts

### To Modify the Main Prompt:

Edit `lib/claude.ts` → `buildContentPrompt()` function:

```typescript
function buildContentPrompt(data: ArtistOnboardingData): string {
  // Modify the prompt template here
  return `Your updated prompt...`;
}
```

### To Test Prompt Changes:

1. Use the chat interface (`/chat`) to test variations
2. Once satisfied, update `buildContentPrompt()` in `lib/claude.ts`
3. Test the full flow through the onboarding form

## API Configuration

**Model:** `claude-sonnet-4-20250514`
**Max Tokens:** 4000
**API Key:** Stored in `.env.local` as `ANTHROPIC_API_KEY`

## Error Handling

The integration includes:
- ✅ API key validation
- ✅ Rate limit handling
- ✅ Response parsing and validation
- ✅ Error messages for users

## Next Steps

1. **Test the chat interface** - Use `/chat` to iterate on prompts
2. **Refine prompts** - Based on real artist feedback
3. **Add prompt variations** - Different prompts for different genres
4. **A/B test prompts** - Compare different prompt structures

## Example Use Cases

### Content Generation (Current)
- Generate 15-20 posts for a release cycle
- Structured output with platforms, timing, captions

### Chat Interface (New)
- Test prompt variations
- Get Claude's advice on content strategy
- Iterate on prompt structure
- Debug generation issues

Both interfaces use the same Claude API key and model, so you can test freely!

