# Artist Content Platform - Product Specification
## From Content Generation to Intelligence Network

**Version:** 1.0  
**Date:** January 7, 2026

---

## The Problem

Independent artists know they need consistent social media to promote their music, but they don't have time to create content. They're stuck choosing between:
- Generic AI tools (ChatGPT) that produce corporate-sounding content
- Social media schedulers (Buffer, Later) that help post but don't help create
- Expensive agencies ($500+/month) that aren't scalable

**The real bottleneck isn't knowledge—it's execution.** Artists know what they should post, they just can't do it consistently.

---

## The Solution (3 Phases)

### Phase 1: Content Generation (Weeks 1-4)
Artist provides upcoming release details (via form) → AI generates 15-20 promotional posts tailored to their release cycle → Artist copies/downloads content

**Key differentiation:** Music industry verticalization. We understand release cycles, genre conventions, and artist voice in ways generic tools never will.

**Onboarding:**
- **Form-based:** Fast, structured, all fields visible

### Phase 2: Execution Layer (Weeks 5-12)
Add OAuth integrations → Artists connect Instagram/TikTok → Schedule and auto-post directly from platform → Track performance

**Key differentiation:** Workflow integration. We become the hub where everything connects, creating high switching costs.

### Phase 3: Intelligence Network (Months 4-12+)
Aggregate performance data across artists → Learn what content drives engagement → Provide benchmarking and predictive insights

**Key differentiation:** Data moat. "Hip-hop artists in your follower range who post behind-the-scenes content get 40% more engagement" — insights only possible at scale.

---

## How We Build Differentiation Over Time

### Short-term (Months 1-6): Vertical Expertise
**What we know that ChatGPT doesn't:**
- Release cycle timing (when to tease vs. announce vs. follow up)
- Music industry language ("my new single" not "my new product")
- Platform-specific culture (TikTok sounds vs. Instagram aesthetics)
- Genre conventions (how indie folk promotes vs. hip-hop)

**How we capture this:**
- Artist onboarding captures genre, style, past successes
- Fine-tune prompts based on feedback ("sounds like me" vs "too generic")
- Build template library specific to music promotion

### Mid-term (Months 6-18): Performance Attribution
**The killer feature:**
"Your Instagram Reel on Tuesday drove 47 Spotify streams"
"Posts with behind-the-scenes content get 3x more engagement for you"

**How we build it:**
1. Connect social APIs (Instagram, TikTok) → track post performance
2. Correlate timing with streaming spikes
3. Eventually connect streaming platforms (Spotify for Artists, Apple Music for Artists) when APIs open OR use manual CSV uploads
4. Machine learning on patterns across artists

**Why competitors can't copy:**
- Requires technical integrations (time barrier)
- Requires enough users to find patterns (network effect)
- Requires music industry context to interpret correctly

### Long-term (Year 2+): Network Intelligence
**The moat:**
With enough artists, we provide competitive intelligence no one else has:

"Similar artists in your genre post 3x/week and average 12% engagement"
"Artists who post behind-the-scenes 2 weeks before release get 40% more pre-saves"
"In your city, TikTok performs best between 2-4pm for your genre"

**This only works at scale.** New entrants can't replicate without critical mass of users.

---

## What We're NOT Building

❌ Music production tools (stay focused on promotion)
❌ Distribution platform (DistroKid does this)
❌ Streaming service (don't compete with Spotify)
❌ General social media manager (stay music-focused)

---

## Phase 1 MVP - First 3-4 Weeks

### Week 1: Foundation
- ✅ Set up project structure - **COMPLETE**
- ✅ Build onboarding form (artist name, single details, genre, vibe/tone, release date) - **COMPLETE**
- ⏳ Set up database to save responses - **OPTIONAL for MVP** (can be added in Phase 2)
- ⏳ Deploy basic version - **READY** (not yet deployed)

### Week 2: Content Generation
- ✅ Integrate Claude API for content generation - **COMPLETE**
- ✅ Create prompt templates for release cycle content - **COMPLETE**
- ✅ Build results page showing 15-20 generated posts - **COMPLETE**
- ✅ Add copy-to-clipboard and download features - **COMPLETE** (JSON & CSV)

### Week 3: Polish & Test
- ⏳ Create simple quote graphics using Fabric.js (text over cover art) - **NOT YET** (dependency added, implementation pending)
- ✅ Improve UI/UX based on initial testing - **READY** (can iterate based on feedback)
- ⏳ Test with 3-5 real artists with upcoming releases - **READY TO START**
- ⏳ Iterate on prompts based on feedback - **READY** (prompts in `lib/claude.ts`)

### Week 4: Validate & Plan
- Get 10 artists using it for real releases
- Measure: Do they actually use the content? Does it save them time?
- Decide next priority: Better content quality OR add scheduling/posting?

**Success metric:** Artists report using at least 8 of the 15 generated posts and say it saved them 2+ hours.

---

## Current Implementation Status

**Last Updated:** January 8, 2026

### ✅ Completed (Week 1-2)

**Core Features:**
- ✅ Next.js 15 project structure with TypeScript and Tailwind CSS
- ✅ Onboarding form with validation
- ✅ Claude API integration with enhanced prompts
- ✅ Results display page with posts grouped by week
- ✅ Copy-to-clipboard functionality for each post
- ✅ Download as JSON and CSV
- ✅ All Shadcn UI components created
- ✅ Error handling and validation
- ✅ Type-safe API routes

**Technical Decisions:**
- ✅ **Framework:** Next.js 15 with App Router (decision made)
- ✅ **Styling:** Tailwind CSS + Shadcn UI (New York style, Slate color)
- ✅ **Validation:** Zod schemas
- ✅ **Forms:** React Hook Form
- ✅ **API:** Next.js API routes (migrated from FastAPI)

### ⏳ In Progress (Week 3)

- ⏳ Quote graphics generation (Fabric.js dependency added, implementation pending)
- ⏳ Testing with real artists
- ⏳ UI/UX refinements based on feedback

### 📋 Pending (Week 4+)

- ⏳ Database integration (optional for MVP)
- ⏳ Production deployment
- ⏳ User testing and validation
- ⏳ Performance optimization

---

## Tech Stack

### ✅ Decision Made: Next.js

**Status:** Next.js 15 with App Router has been implemented and is working.

**Why Next.js was chosen:**
- Combines React frontend + API backend in one framework
- Migration from FastAPI was straightforward
- One codebase for front + back
- Built-in deployment (Vercel)
- Great for rapid iteration
- Easier to hire for later
- Used by most social media scheduling tools (Postiz, Mixpost)

**Migration Status:** ✅ Complete - FastAPI backend migrated to Next.js API routes

### Core Dependencies (regardless of choice)
- **AI:** Claude API via `@anthropic-ai/sdk`
- **Database:** Supabase (free PostgreSQL + auth)
- **UI Components:** Shadcn/ui (copy-paste React components)
- **Image Generation:** Fabric.js (for quote graphics)
- **File Uploads:** Uploadthing (easier than S3)
- **Deployment:** Vercel (for Next.js) or Railway (for Python)

### Phase 2 Additions (Later)
- **Instagram API:** `instagram-private-api` (unofficial but works)
- **Calendar UI:** React Big Calendar or Shadcn calendar
- **Image AI:** Replicate (access to FLUX, Stable Diffusion, etc.)

---

## Why This Approach Works

### For Jonah
- Can build MVP in 3-4 weeks
- Tests core value prop (saves artists time) before complex features
- Builds real technical skills (OAuth, APIs, data pipelines) that translate to jobs
- Creates portfolio piece showing product thinking + execution

### For Artists  
- Solves immediate pain (content creation) without overwhelming them
- Low friction (no integrations required for MVP)
- See value in first session
- Natural upgrade path to scheduling/automation later

### For Business
- Validates willingness to pay before building expensive features
- Creates foundation for data moat
- Clear path to $15-30/month subscription
- Network effects kick in as more artists join

---

## Competitive Positioning

**vs. ChatGPT:** We understand music promotion specifically, not general marketing

**vs. Buffer/Later:** We help create content, not just schedule it

**vs. Agencies:** Self-service and affordable ($20/month vs $500+/month)

**vs. Fanify (AI music promotion):** They focus on paid ads, we focus on organic content + eventual performance attribution

**The white space:** Nobody combines AI content generation + execution + music industry expertise + performance intelligence in one platform.

---

## Next Steps

1. ✅ **COMPLETE:** Next.js chosen and implemented
2. ✅ **COMPLETE:** Onboarding form + Claude integration + results display
3. ⏳ **IN PROGRESS (Week 3):** Add quote graphics (Fabric.js) + test with 3-5 artists
4. ⏳ **UPCOMING (Week 4):** Test with 10 real artists + validate usage
5. ⏳ **FUTURE (Month 2):** Decide: scheduling features OR content quality improvements OR more content types?

The path to differentiation is clear: Start with vertical expertise → Add execution layer → Build data moat. Each phase unlocks the next.