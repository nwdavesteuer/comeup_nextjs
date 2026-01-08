# Onboarding Conversation Content

This document outlines the onboarding conversation flow and content for the Artist Content Platform.

## Overview

The onboarding process collects essential information about an artist's upcoming release to generate a personalized content calendar. The conversation is designed to be quick (5-10 minutes) and feel like a natural conversation rather than a form.

## Conversation Flow

### Step 1: Welcome & Introduction

**Message:**
```
Hey! 👋 I'm here to help you create a complete content calendar for your upcoming release.

I'll ask you a few quick questions about your release, and then I'll generate 15-20 social media posts tailored to your release cycle.

Ready to get started?
```

### Step 2: Artist Name

**Question:**
```
First, what's your artist name?
```

**Validation:**
- Required
- Max 100 characters
- Should feel personal and conversational

### Step 3: Release Details

**Question:**
```
What's the name of your upcoming single/release?
```

**Follow-up:**
```
And when is it releasing? (We'll create content for 2 weeks before and 2 weeks after)
```

**Validation:**
- Single title: Required, max 200 characters
- Release date: Required, must be future date (YYYY-MM-DD format)

### Step 4: Genre

**Question:**
```
What genre best describes your music?
```

**Options:**
- Pop, Rock, Hip-Hop, R&B, Country, Electronic, Indie, Alternative, Folk, Jazz, Blues, Reggae, Metal, Punk, Classical, Other

**Validation:**
- Required
- Dropdown selection

### Step 5: Vibe/Tone

**Question:**
```
How would you describe the vibe or tone of this release? 

For example: "introspective and dreamy" or "energetic and upbeat" or "dark and moody"

This helps us match the voice and style of your content.
```

**Validation:**
- Required
- Max 200 characters
- Textarea for longer descriptions

### Step 6: Target Audience (Optional)

**Question:**
```
(Optional) Who is your target audience?

For example: "Young adults 18-25 who love indie pop" or "Fans of bedroom pop and lo-fi"

This helps us tailor content to your specific audience.
```

**Validation:**
- Optional
- Max 200 characters

### Step 7: Confirmation & Generation

**Message:**
```
Perfect! I have everything I need.

Let me generate your personalized content calendar...
[Loading state]

✅ Generated 15 posts for your release!

Here's what I created:
- Week -2: Teaser content to build anticipation
- Week -1: Pre-save campaign and countdown posts
- Release Week: Launch announcements and celebration
- Week +1: Post-release momentum
- Week +2: Continued engagement

[Show results]
```

## UI/UX Considerations

### Form vs. Conversation

The current implementation uses a **form-based approach** for Phase 1 MVP, which is:
- Faster to build
- More reliable (no conversation parsing needed)
- Clearer for users (all fields visible)
- Better for validation

### Future: Conversational UI (Phase 2+)

For Phase 2, consider a conversational interface:
- Chat-like interface
- Progressive disclosure (one question at a time)
- Natural language processing
- Context-aware follow-ups

### Current Form Fields

Based on the spec document, the form includes:

1. **Artist Name** (text input)
2. **Single Title** (text input)
3. **Release Date** (date picker)
4. **Genre** (dropdown select)
5. **Vibe/Tone** (textarea)
6. **Target Audience** (textarea, optional)

## Content Guidelines

### Tone
- Friendly and supportive
- Music industry-aware
- Not corporate or generic
- Encouraging and helpful

### Language
- Use "you" and "your" (personal)
- Avoid jargon unless necessary
- Keep questions clear and concise
- Provide helpful examples

### Examples from Spec

From the spec document, the onboarding should capture:
- Artist name
- Single details (title)
- Genre
- Vibe/tone
- Release date
- Target audience (optional)

## Error Handling

### Validation Messages

- **Required fields:** "This field is required"
- **Date format:** "Release date must be in YYYY-MM-DD format"
- **Future date:** "Release date must be in the future"
- **Max length:** "Must be less than X characters"

### API Errors

- **API key missing:** "Service temporarily unavailable. Please try again later."
- **Rate limit:** "Too many requests. Please wait a moment and try again."
- **Generation failed:** "Failed to generate content. Please check your information and try again."

## Success States

### Loading State
```
Generating your content calendar...
[Spinner/loading indicator]
```

### Success State
```
✅ Success! Generated 15 posts for [Artist Name]'s release of "[Single Title]"

[Show results with copy/download options]
```

## Accessibility

- All form fields have labels
- Required fields marked with asterisk
- Error messages clearly associated with fields
- Keyboard navigation supported
- Screen reader friendly

## Localization (Future)

For international expansion:
- Genre lists may vary by region
- Date formats (though ISO format is universal)
- Language translations
- Cultural context for examples

