# The Multiverse - Product Specification
## Building Visual Universes for Music Artists

**Version:** 2.0  
**Date:** January 8, 2026  
**Status:** Major Pivot - Visual Universe Architecture  
**Platform Name:** The Multiverse

---

## The Problem (Revised)

Independent artists struggle to create consistent, visually cohesive social media content that aligns with their music. The challenge isn't just creating content—it's building a **visual universe** that represents their artistic identity across all releases.

Current solutions fail because they:
- Generate generic content without visual cohesion
- Don't help artists establish a visual identity
- Treat each release in isolation rather than as part of a larger artistic narrative
- Don't facilitate collaboration with videographers, editors, and creative teams

**The real opportunity:** Help artists build a visual universe where each piece of content (snapshot) is part of a cohesive visual landscape that connects their music to their social media presence.

---

## The Solution: Visual Universe Platform

### Core Concept: Universe → Galaxy → World → Snapshots

**Universe:** The entire artist persona - everything we know about the artist visually and analytically. The artist's data (atoms and molecules) inform the universe's decisions.

**Galaxy:** An entire release "block" for an artist (e.g., an album, EP, or project like Kendrick Lamar's "DAMN")

**World:** A single song or release within a galaxy (e.g., "DNA" within the "DAMN" galaxy). Worlds farther from the sun are released later.

**Snapshots:** Individual pieces of social media content that are "snapshots" of the artist's visual landscape. Each snapshot is a video loop (10-15 seconds) with strong vignettes, positioned around the world like "memories" or "events" that occurred on that planet. They include visual/creative direction and tell the story of the world.

### Key Features

1. **Interactive 3D Multiverse View (Homepage)**
   - Google Earth-style navigation: zoom in/out, pan left/right/up/down
   - View ALL artists' universes in the Multiverse
   - Click on galaxies or worlds to unlock more information
   - Visual representation of release timeline (distance from sun = release date)
   - Worlds orbit around suns, spin on their axis when viewed closely
   - Hover over worlds to preview music (audio plays automatically)
   - Public/private controls: greyed out worlds show "being built" messages
   - Empty space with "+" symbol to create own universe

2. **Visual Landscape System**
   - Each world has a visual landscape representation
   - Mix of user-uploaded images, color palettes, and Pinterest board integration
   - Pinterest API integration to help artists visually communicate their universe/galaxy/world aesthetics
   - **World Colors**: Each world has a unique color (dark purple, bright yellow, light grey, deep blue, hot pink, white, etc.) representing its visual identity
   - **Sun Colors**: Galaxies have colored suns (e.g., bright yellow) that worlds orbit around

3. **Snapshot Strategies & Display**
   - AI-generated snapshot plans for each world release
   - Includes visual/creative direction (not just captions)
   - Organized by release cycle timing
   - **Snapshot Display**: Rectangular videos (10-15 second loops) with strong vignettes
   - **Spatial Positioning**: Snapshots appear around the world like "memories" or "events"
   - **Visual Storytelling**: Snapshots tell the story of the world, not just promotional content

4. **Real-Time Countdown Timers**
   - Active countdown for each galaxy/world's release date
   - Displayed next to galaxy/world titles
   - Example: "DNA dropping in 65 days 10 hours, 30 mins, and 25 seconds"
   - Info bubbles for unreleased content: "this world is currently being built. It will be viewable to the public in 33 days."

5. **Audio Preview System**
   - Hover over worlds to automatically play music previews
   - Audio continues playing when exploring a world
   - Music and visuals are deeply integrated

5. **Collaboration System**
   - Artists can invite videographers, editors, and creative team members
   - Shareable links with permissions (view or edit access)
   - Collaborators see same interface/UI
   - Can view snapshot strategies

---

## User Types

### 1. Artists
- Primary users who build and manage their visual universe
- Create galaxies and worlds
- Generate snapshot strategies
- Invite collaborators

### 2. Videographers
- Invited collaborators with view or edit access
- Can see visual landscapes and snapshot strategies
- Help build visual universe through their contributions

### 3. Editors
- Invited collaborators with view or edit access
- Can see visual landscapes and snapshot strategies
- Help refine and execute snapshot strategies

---

## Architecture & Data Model

### Initial State
- Artists immediately have an **empty galaxy with a sun** upon signup
- Can use a form to create a single world within this galaxy
- Separate onboarding form from galaxy/world creation forms

### Navigation Structure
```
Universe (Artist's entire persona)
  └── Galaxy (Release block/project)
      └── World (Individual song/release)
          ├── Visual Landscape (images, color palettes, Pinterest board)
          ├── Snapshot Strategy (AI-generated snapshots with visual direction)
          └── Countdown Timer (real-time release countdown)
```

### Visual Representation
- **3D Multiverse View (Homepage)**: All artists' universes visible, Google Earth-style navigation
- **Universe View**: Multiple galaxies visible, equidistant from each other
- **Galaxy View**: Worlds orbit around a sun (bright, colored suns), distance from sun = release timeline
- **World View**: World spins on its axis, snapshots appear as rectangular videos with vignettes around it
- **Color Coding**: Each world has unique color representing its visual identity
- **Motion States**: Active worlds orbit and spin; unreleased worlds are greyed out and static
- **Moons**: Worlds can have moons orbiting them (bonus tracks, remixes, etc.)
- **Click interactions**: Unlock detailed information about galaxies/worlds
- **Hover interactions**: Preview music automatically plays when hovering over worlds

---

## Terminology Changes

| Old Term | New Term | Notes |
|----------|----------|-------|
| Content | Snapshots | Each piece of content is a "snapshot" of the visual universe |
| Content Plan/Strategy | Snapshot Plan/Strategy | Plans for creating snapshots |
| Posts | Snapshots | Individual social media pieces |
| Release | World | A single song/release within a galaxy |
| Project/Album | Galaxy | A collection of releases (worlds) |

---

## Technical Requirements

### New Integrations Needed

1. **Pinterest API**
   - Allow artists to create/import Pinterest boards
   - Visual reference system for universe/galaxy/world aesthetics
   - Help communicate visual direction to collaborators

2. **Image Upload System**
   - User-uploaded images for visual landscapes
   - Color palette extraction/generation
   - Visual mood board creation

3. **Real-Time Countdown System**
   - WebSocket or polling for accurate countdown timers
   - Updates every second for precision

4. **Collaboration System**
   - Shareable link generation
   - Permission management (view/edit)
   - Multi-user access to same universe/galaxy/world

### UI/UX Requirements

1. **3D Multiverse Navigation System**
   - **Homepage**: Interactive 3D view of ALL artists' universes
   - Pan and zoom controls (Google Earth-style)
   - Click-to-explore interactions
   - Smooth transitions between zoom levels (Multiverse → Universe → Galaxy → World)
   - Visual representation of spatial relationships (distance from sun = release timeline)
   - **World Motion**: Worlds orbit around suns, spin on axis when viewed closely
   - **Color System**: Unique colors for each world, colored suns for galaxies
   - **Moons**: Worlds can have moons orbiting them
   - **Empty Space Creation**: Hover over empty space to reveal "+" symbol for creating universe

2. **Visual Landscape View**
   - Image gallery/grid
   - Color palette display
   - Pinterest board integration
   - Mood board interface

3. **Snapshot Strategy Display**
   - Visual/creative direction included
   - Platform-specific recommendations
   - Timing and scheduling information
   - Copy/download functionality (maintained from current system)
   - **Video Format**: Rectangular videos with strong vignettes
   - **Looping**: 10-15 second loops
   - **Spatial Layout**: Positioned around the world like memories/events
   - **Visual Storytelling**: Each snapshot tells part of the world's story

---

## Current Implementation Status

**Last Updated:** January 8, 2026

### ✅ Completed (Legacy - Pre-Pivot)

**Core Features:**
- ✅ Next.js 15 project structure with TypeScript and Tailwind CSS
- ✅ Onboarding form with validation (to be updated for new architecture)
- ✅ Claude API integration with enhanced prompts
- ✅ Results display page with posts grouped by week (to be converted to snapshots)
- ✅ Copy-to-clipboard functionality
- ✅ Download as JSON and CSV

**Technical Decisions:**
- ✅ **Framework:** Next.js 15 with App Router
- ✅ **Styling:** Tailwind CSS + Shadcn UI (New York style, Slate color)
- ✅ **Validation:** Zod schemas
- ✅ **Forms:** React Hook Form
- ✅ **API:** Next.js API routes

### 🚧 In Progress (Post-Pivot)

- ⏳ **Architecture Redesign:** Universe → Galaxy → World structure
- ⏳ **Terminology Updates:** Content → Snapshots throughout codebase
- ⏳ **Visual Navigation:** Google Earth-style interface research and planning
- ⏳ **New User Journeys:** Artist, Videographer, Editor journeys (to be documented)

### 📋 Pending (New Features)

- ⏳ **Pinterest API Integration:** Research and implementation
- ⏳ **Image Upload System:** Visual landscape image management
- ⏳ **Color Palette System:** Extraction and display
- ⏳ **Real-Time Countdown:** WebSocket/polling implementation
- ⏳ **Collaboration System:** Shareable links and permissions
- ⏳ **Database Schema:** Universe/Galaxy/World data model
- ⏳ **Visual Navigation UI:** Google Earth-style interface
- ⏳ **Updated Onboarding:** Separate forms for initial setup vs. world creation

---

## Tech Stack (Updated)

### Core (Existing)
- **Framework:** Next.js 15 with App Router
- **Styling:** Tailwind CSS + Shadcn UI
- **AI:** Claude API via `@anthropic-ai/sdk`
- **Database:** Supabase (PostgreSQL + auth)
- **Validation:** Zod schemas
- **Forms:** React Hook Form

### New Additions Needed
- **Pinterest API:** For visual reference boards
- **Image Processing:** For color palette extraction and visual landscape management
- **Real-Time Updates:** WebSocket or Server-Sent Events for countdown timers
- **File Uploads:** Uploadthing or similar for visual landscape images and snapshot videos
- **3D/Interactive UI:** Library for Google Earth-style navigation (research needed - Three.js, React Three Fiber, or similar)
- **Audio System:** Music preview playback on hover, background audio during world exploration
- **Video Processing:** Snapshot video upload, looping, vignette effects
- **Animation System:** World orbital motion, spinning animations, moon orbits

### Phase 2+ Additions
- **Instagram API:** For snapshot posting
- **Calendar UI:** For snapshot scheduling
- **Image AI:** Replicate (FLUX, Stable Diffusion) for visual generation
- **Analytics:** Performance tracking for snapshots

---

## Migration Strategy

### Phase 1: Foundation (Current)
- Keep existing form-based onboarding for now
- Update terminology in codebase (content → snapshots)
- Plan new data structures

### Phase 2: Core Architecture
- Implement Universe/Galaxy/World data model
- Build Google Earth-style navigation interface
- Create visual landscape system

### Phase 3: Enhanced Features
- Add Pinterest integration
- Implement collaboration system
- Add real-time countdown timers

### Phase 4: Polish & Scale
- Refine visual navigation UX
- Optimize performance
- Add advanced collaboration features

---

## Key Differentiators

### vs. ChatGPT
- **Visual Universe Focus:** Not just content generation, but building cohesive visual identity
- **Music Industry Context:** Understanding of release cycles, visual storytelling
- **Collaboration:** Built for creative teams, not just individual artists

### vs. Buffer/Later
- **Visual-First:** Visual landscape and creative direction, not just scheduling
- **Universe Concept:** Long-term visual identity building, not just individual posts
- **Music-Specific:** Designed for music release cycles and promotion

### vs. Agencies
- **Self-Service:** Artists build their own visual universe
- **Collaborative:** Invite team members without agency overhead
- **Scalable:** AI-powered snapshot generation with visual direction

**The white space:** Nobody combines visual universe building + snapshot generation + music industry expertise + collaboration in one platform.

---

## Next Steps

1. ⏳ **Document User Journeys:** Artist, Videographer, Editor journeys (awaiting user input)
2. ⏳ **Update Data Models:** Create Universe/Galaxy/World/Snapshot types
3. ⏳ **Research Navigation Libraries:** Find solution for Google Earth-style interface
4. ⏳ **Plan Pinterest Integration:** Research API and implementation approach
5. ⏳ **Design Visual Landscape UI:** Mockups and component planning
6. ⏳ **Update Onboarding Flow:** Separate initial setup from world creation

---

## Questions for Future Resolution

- Exact number of snapshots per world (removed "15-20" requirement for now)
- Specific visual navigation library/technology choice
- Pinterest API access and rate limits
- Color palette generation method (AI vs. manual)
- Snapshot strategy generation frequency and triggers

---

**This spec will be updated as user journeys are documented and implementation progresses.**
