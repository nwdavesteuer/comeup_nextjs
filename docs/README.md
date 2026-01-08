# Artist Content Platform - Documentation

AI-powered content generation for music artists. Generate 15-20 promotional social media posts tailored to your release cycle.

## Quick Start

**For quick setup instructions, see [JONAH_SETUP.md](./JONAH_SETUP.md)**

**For complete installation guide, see [INSTALLATION.md](./INSTALLATION.md)**

## Tech Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Shadcn UI
- **AI:** Claude API (Anthropic)
- **Database:** Supabase (optional for MVP)
- **Deployment:** Vercel

## Prerequisites

- ✅ **Node.js 18+** installed (`node --version`)
- ✅ **npm** (comes with Node.js)
- ✅ **Git** (for cloning the repository)
- ✅ **Claude API Key** (get from https://console.anthropic.com/)

## Installation

### Step 1: Clone or Navigate to the Repository

```bash
git clone https://github.com/nwdavesteuer/comeup_nextjs.git
cd comeup_nextjs
```

### Step 2: Install Dependencies

```bash
npm install
```

This installs all required packages. Takes 1-2 minutes.

### Step 3: Set Up Environment Variables

Create `.env.local` in the project root:

```bash
touch .env.local
```

Edit `.env.local` and add:

```bash
# Claude AI API Key (REQUIRED)
ANTHROPIC_API_KEY=your_claude_api_key_here

# Supabase (optional for MVP - leave empty for now)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Get your API key:** https://console.anthropic.com/ → Settings → API Keys

### Step 4: Start Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Features

### Two Onboarding Methods

1. **Traditional Form** (`/`) - Fast, structured form
2. **Conversational** (`/onboarding-chat`) - Playful, Claude-guided chat experience

Both methods generate the same content calendar with 15-20 posts.

### Content Generation

- Generates 15-20 social media posts
- Posts grouped by week (Week -2 through Week +2)
- Platform-specific content (Instagram, TikTok, Twitter)
- Copy-to-clipboard for each post
- Download as JSON or CSV
- Responsive, modern UI

## Project Structure

```
comeup_nextjs/
├── app/
│   ├── api/
│   │   ├── generate/          # Content generation API
│   │   └── chat/              # Conversational onboarding API
│   ├── onboarding-chat/      # Chat interface page
│   ├── page.tsx               # Homepage with form
│   └── layout.tsx             # Root layout
├── components/
│   ├── ui/                    # Shadcn UI components
│   ├── artist/
│   │   ├── OnboardingForm.tsx # Traditional form
│   │   └── ResultsDisplay.tsx # Results display
│   └── shared/                # Reusable components
├── lib/
│   ├── utils.ts               # Utility functions
│   └── claude.ts              # Claude API wrapper
├── types/
│   └── index.ts               # TypeScript types
└── docs/                      # Documentation
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Run production build locally
- `npm run lint` - Run ESLint

## API Endpoints

### POST `/api/generate`

Generate social media posts for an artist's release.

**Request Body:**
```json
{
  "artistName": "Artist Name",
  "singleTitle": "Single Title",
  "releaseDate": "2026-02-01",
  "genre": "indie rock",
  "vibe": "introspective",
  "targetAudience": "optional"
}
```

**Response:**
```json
{
  "posts": [
    {
      "id": "post_1",
      "week": "Week -2",
      "caption": "...",
      "platform": "instagram",
      "contentType": "photo",
      "timing": "Tuesday 2pm"
    }
  ]
}
```

### POST `/api/chat`

Conversational onboarding chat endpoint.

**Request Body:**
```json
{
  "messages": [
    { "role": "user", "content": "My artist name is..." }
  ],
  "onboardingData": { ... }
}
```

## Testing

### Test the Complete Flow

1. **Fill out the onboarding form:**
   - Artist Name, Single Title, Release Date, Genre, Vibe/Tone
   - Target Audience (optional)

2. **Submit the form:**
   - Click "Generate Content Calendar"
   - Wait for content generation (10-30 seconds)

3. **View results:**
   - 15-20 generated posts
   - Posts grouped by week
   - Copy, download, or generate another

### Test Conversational Onboarding

1. Click "💬 Try Conversational Onboarding" on homepage
2. Chat with Claude - answer questions naturally
3. Claude guides you through all required info
4. Content is automatically generated when ready

## Troubleshooting

### "Module not found" errors

```bash
rm -rf node_modules package-lock.json
npm install
```

### "ANTHROPIC_API_KEY is not configured"

- Make sure `.env.local` exists in project root
- Check that `ANTHROPIC_API_KEY` is set
- Restart dev server after editing `.env.local`

### Port 3000 already in use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

### TypeScript errors

Restart TypeScript server in your IDE:
- VS Code/Cursor: `Cmd+Shift+P` → "TypeScript: Restart TS Server"

## Deployment

### Deploy to Vercel

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login and deploy:**
   ```bash
   vercel login
   vercel
   ```

3. **Add environment variables in Vercel:**
   - Go to Vercel dashboard → Your project → Settings → Environment Variables
   - Add `ANTHROPIC_API_KEY` with your API key
   - Redeploy

## Documentation

- [JONAH_SETUP.md](./JONAH_SETUP.md) - Quick setup reference
- [INSTALLATION.md](./INSTALLATION.md) - Complete installation guide
- [comeup_spec_revised.md](./comeup_spec_revised.md) - Product specification
- [PROJECT_STATUS.md](./PROJECT_STATUS.md) - Current project status
- [MIGRATION_NOTES.md](./MIGRATION_NOTES.md) - Migration from FastAPI
- [CONVERSATIONAL_ONBOARDING.md](./CONVERSATIONAL_ONBOARDING.md) - Chat feature docs

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Shadcn UI Components](https://ui.shadcn.com)
- [Claude API Documentation](https://docs.anthropic.com)
- [Supabase Documentation](https://supabase.com/docs)

## License

Private project - All rights reserved
