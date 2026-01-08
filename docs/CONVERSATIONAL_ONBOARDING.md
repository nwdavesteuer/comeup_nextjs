# Conversational Onboarding Feature

## Overview

A playful, chat-based onboarding experience where Claude initiates the conversation and guides users through collecting release information naturally.

## How It Works

### User Experience

1. **Claude Starts the Conversation**
   - Opens with a friendly, playful greeting
   - "Hey! 👋 I'm here to help you create an amazing content calendar..."
   - Sets an inviting, supportive tone

2. **Natural Conversation Flow**
   - Claude asks one question at a time
   - User responds naturally
   - Claude acknowledges answers warmly
   - Moves to next question organically

3. **Information Collection**
   - Artist name
   - Single/release title
   - Release date
   - Genre
   - Vibe/tone
   - Target audience (optional)

4. **Content Generation**
   - Once all info is collected, Claude offers to generate
   - User confirms ("yes", "generate", "go", etc.)
   - Content is generated and displayed

## Access the Feature

**URL:** `http://localhost:3000/onboarding-chat`

Or click the "💬 Try Conversational Onboarding" button on the homepage.

## Technical Implementation

### System Prompt

The system prompt (`getSystemPrompt()`) dynamically updates based on collected data:

- **Tone:** Playful, inviting, supportive, music industry-savvy
- **Guidelines:** Ask one question at a time, acknowledge warmly, don't repeat
- **Context:** Shows what's collected and what's still needed
- **Adaptive:** Next question is determined by what's missing

### Data Extraction

The `updateOnboardingData()` function extracts information from user responses:

- **Artist Name:** First response or when Claude asks
- **Single Title:** Quoted text, "called X" patterns, or direct answer
- **Release Date:** Multiple formats (ISO, US, text dates)
- **Genre:** Genre keywords with normalization
- **Vibe/Tone:** When Claude asks about vibe/feel/sound
- **Target Audience:** When Claude asks about audience/fans

### API Integration

- **Chat API:** `/api/chat` - Handles conversation with Claude
- **System Prompt:** Passed to Claude API for context
- **Content Generation:** `/api/generate` - Generates posts when ready

## Example Conversation Flow

```
Claude: Hey! 👋 I'm here to help you create an amazing content calendar...

User: Hi!

Claude: Let's start with the basics - what's your artist name?

User: Midnight Drive

Claude: Awesome! Love that name! 🎵 What's the name of your upcoming single?

User: It's called "City Lights"

Claude: Perfect! "City Lights" - I'm already getting vibes! 📅 When is it releasing?

User: February 15th, 2026

Claude: Great! So we have about a month to build anticipation! 🎸 What genre would you say this falls into?

User: Indie rock

Claude: Nice! Indie rock is perfect for storytelling content. 💫 How would you describe the vibe or tone of this release?

User: Dreamy and introspective, kind of nostalgic

Claude: Perfect! I've got everything I need! 🎉
        [Shows summary]
        Ready to generate your content calendar? Just say "yes"!

User: Yes!

Claude: Awesome! Let me create your personalized content calendar... ⏳✨
        [Generates content]
        🎉 Done! I've generated 15 posts for your release!
```

## Features

### ✅ Implemented

- Claude initiates conversation
- Playful, inviting tone
- Natural question flow
- Data extraction from responses
- Automatic content generation trigger
- Results display integration

### 🎨 Tone Guidelines

The system prompt ensures Claude:
- Uses emojis naturally (1-2 per message)
- Celebrates user answers ("Awesome!", "Love it!", "Perfect!")
- Stays conversational (like a friend, not a bot)
- Shows enthusiasm without being overbearing
- Understands music industry context

## Comparison: Form vs. Conversation

### Traditional Form (`/`)
- ✅ Faster for users who know what they want
- ✅ All fields visible at once
- ✅ Clear validation
- ❌ Less engaging
- ❌ Feels like paperwork

### Conversational (`/onboarding-chat`)
- ✅ More engaging and fun
- ✅ Feels like talking to a friend
- ✅ Natural flow
- ✅ Better for users who need guidance
- ⏳ Slightly slower (but more enjoyable)

## Future Enhancements

- [ ] Save conversation history
- [ ] Allow editing collected data mid-conversation
- [ ] Multi-turn refinement ("Can you make it more energetic?")
- [ ] Voice input support
- [ ] Conversation export

## Testing

Try the conversational onboarding at:
```
http://localhost:3000/onboarding-chat
```

Test different:
- Answer formats (dates, genres, vibes)
- Conversation flows
- Edge cases (multiple answers, corrections)

The system is designed to be flexible and handle natural language responses!

