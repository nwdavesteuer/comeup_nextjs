# Setup Instructions

## Step 1: Install Dependencies

Due to npm permission issues in the sandbox, please run this manually in your terminal:

```bash
cd /Users/davidsteuer/Documents/GitHub/comeup_nextjs
npm install
```

This will install all required dependencies including:
- Next.js, React, TypeScript
- Claude API SDK
- Supabase client
- Zod, Fabric.js, date-fns
- Tailwind CSS and Shadcn UI dependencies

## Step 2: Install CLI Tools (for later use)

Install these CLI tools globally for deployment and management:

```bash
# Vercel CLI - for deployment
npm install -g vercel

# Supabase CLI - for database management
npm install -g supabase

# Anthropic CLI (optional) - for API management
npm install -g @anthropic-ai/cli
```

## Step 3: Set Up Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and add your API keys:
   - **ANTHROPIC_API_KEY**: Get from https://console.anthropic.com/ → Settings → API Keys
   - **NEXT_PUBLIC_SUPABASE_URL**: Optional for MVP, get from Supabase dashboard
   - **NEXT_PUBLIC_SUPABASE_ANON_KEY**: Optional for MVP, get from Supabase dashboard

## Step 4: Initialize Shadcn UI

After installing dependencies, initialize Shadcn UI:

```bash
npx shadcn@latest init
```

When prompted:
- ✅ Which style? → **New York**
- ✅ Which color? → **Slate**
- ✅ CSS variables? → **Yes**

Then install essential components:

```bash
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add form
npx shadcn@latest add card
npx shadcn@latest add select
npx shadcn@latest add textarea
npx shadcn@latest add toast
npx shadcn@latest add dialog
```

## Step 5: Verify Installation

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Open your browser:**
   Navigate to http://localhost:3000
   You should see the "Artist Content Platform" homepage.

3. **Test the build:**
   ```bash
   npm run build
   ```
   This should complete without errors.

## Step 6: Test the API (Optional)

Once you have your Claude API key set up, you can test the content generation API:

```bash
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "artistName": "Test Artist",
    "singleTitle": "Test Single",
    "releaseDate": "2026-02-01",
    "genre": "indie rock",
    "vibe": "introspective"
  }'
```

## Troubleshooting

### npm permission errors
If you encounter permission errors with npm, try:
```bash
sudo npm install -g vercel supabase
```

Or use a Node version manager like nvm to avoid permission issues.

### TypeScript errors
If you see TypeScript errors after installation:
1. Restart the TypeScript server in Cursor: `Cmd+Shift+P` → "TypeScript: Restart TS Server"
2. Make sure `@types/node` is installed (it's in devDependencies)

### Build errors
If `npm run build` fails:
1. Check that all dependencies are installed: `npm install`
2. Verify your `.env.local` file exists (even if empty for now)
3. Check the error messages in the terminal

## Next Steps

Once everything is set up and working:

1. **Week 1, Day 1-2:** Build the onboarding form
   - Create `components/artist/OnboardingForm.tsx`
   - Connect form to `/api/generate` endpoint

2. **Week 1, Day 3-4:** Create results display
   - Build results page showing generated posts
   - Add copy-to-clipboard functionality

3. **Week 2:** Polish and test with real artists

See `README.md` for more details on the project structure and API endpoints.

