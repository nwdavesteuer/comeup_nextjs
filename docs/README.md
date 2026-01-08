# Artist Content Platform

AI-powered content generation for music artists. Generate 15-20 promotional social media posts tailored to your release cycle.

## Tech Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Shadcn UI
- **AI:** Claude API (Anthropic)
- **Database:** Supabase (optional for MVP)
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- API keys for:
  - Claude API (required)
  - Supabase (optional for MVP)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.local.example .env.local
   ```
   Then edit `.env.local` and add your API keys:
   - `ANTHROPIC_API_KEY` - Get from https://console.anthropic.com/
   - `NEXT_PUBLIC_SUPABASE_URL` - Optional, get from Supabase dashboard
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Optional, get from Supabase dashboard

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Installing CLI Tools (for later use)

The following CLI tools are recommended for deployment and management:

```bash
# Vercel CLI (for deployment)
npm install -g vercel

# Supabase CLI (for database management)
npm install -g supabase

# Anthropic CLI (optional, for API management)
npm install -g @anthropic-ai/cli
```

## Project Structure

```
comeup_nextjs/
├── app/
│   ├── api/
│   │   └── generate/          # API route for content generation
│   ├── page.tsx               # Home page
│   ├── layout.tsx             # Root layout
│   └── globals.css            # Global styles
├── components/
│   ├── ui/                    # Shadcn UI components
│   ├── artist/                # Artist-specific components
│   └── shared/                # Reusable components
├── lib/
│   ├── utils.ts               # Utility functions
│   └── claude.ts              # Claude API wrapper
├── types/
│   └── index.ts               # TypeScript types
└── public/                    # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Run production build locally
- `npm run lint` - Run ESLint

## Next Steps

1. **Install Shadcn UI components:**
   ```bash
   npx shadcn@latest add button
   npx shadcn@latest add input
   npx shadcn@latest add form
   npx shadcn@latest add card
   # ... add more as needed
   ```

2. **Build the onboarding form** (Week 1, Day 1-2)
   - Create form component in `components/artist/OnboardingForm.tsx`
   - Connect to `/api/generate` endpoint

3. **Create results display** (Week 1, Day 3-4)
   - Build results page showing generated posts
   - Add copy-to-clipboard and download features

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

3. **Add environment variables in Vercel dashboard:**
   - Go to your project settings
   - Add `ANTHROPIC_API_KEY` and other env vars

4. **Connect GitHub for auto-deployments:**
   - Link your GitHub repo in Vercel dashboard
   - Every push to `main` will auto-deploy

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
  ],
  "summary": "Generated 15 posts for Artist Name's release..."
}
```

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Shadcn UI Components](https://ui.shadcn.com)
- [Claude API Documentation](https://docs.anthropic.com)
- [Supabase Documentation](https://supabase.com/docs)

## License

Private project - All rights reserved

