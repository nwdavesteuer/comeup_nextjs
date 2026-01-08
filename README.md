# Artist Content Platform

AI-powered content generation for music artists. Generate 15-20 promotional social media posts tailored to your release cycle.

## Quick Start

See [docs/INSTALLATION.md](./docs/INSTALLATION.md) for complete setup instructions.

### Prerequisites

- Node.js 18+ installed
- npm package manager
- Claude API key (get from https://console.anthropic.com/)

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.local.example .env.local
# Edit .env.local and add your ANTHROPIC_API_KEY

# 3. Start development server
npm run dev
```

Open http://localhost:3000 to use the application.

## Tech Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Shadcn UI
- **AI:** Claude API (Anthropic)
- **Database:** Supabase (optional for MVP)
- **Deployment:** Vercel

## Project Structure

```
comeup_nextjs/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── artist/           # Artist-specific components
│   ├── shared/           # Shared components
│   └── ui/               # Shadcn UI components
├── lib/                   # Utility functions
├── types/                 # TypeScript type definitions
├── docs/                  # Documentation
└── public/                # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Run production build locally
- `npm run lint` - Run ESLint

## Documentation

All documentation is in the `docs/` folder:

- [Installation Guide](./docs/INSTALLATION.md) - Complete setup instructions
- [Project Status](./docs/PROJECT_STATUS.md) - Current project status
- [Migration Notes](./docs/MIGRATION_NOTES.md) - Migration from FastAPI
- [API Documentation](./docs/API.md) - API endpoint documentation

## License

Private project - All rights reserved
