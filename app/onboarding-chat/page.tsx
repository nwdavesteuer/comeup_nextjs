'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { ArtistOnboardingData, ContentGenerationResponse } from '@/types';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface OnboardingData {
  artistName?: string;
  singleTitle?: string;
  releaseDate?: string;
  genre?: string;
  vibe?: string;
  targetAudience?: string;
}

export default function OnboardingChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize conversation with Claude's opening message
  useEffect(() => {
    if (messages.length === 0) {
      const initialMessage: Message = {
        role: 'assistant',
        content: `Hey! 👋 I'm here to help you create an amazing content calendar for your upcoming release!

I'm going to ask you a few quick questions, and then I'll generate 15-20 social media posts tailored specifically to your release cycle. Think of me as your creative partner who gets the music industry! 🎵

Let's start with the basics - what's your artist name?`
      };
      setMessages([initialMessage]);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || isGenerating) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      // Build conversation context (excluding system messages)
      const conversationMessages = messages
        .filter(msg => msg.role !== 'system')
        .map((msg) => ({
          role: msg.role === 'user' ? 'user' as const : 'assistant' as const,
          content: msg.content,
        }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: currentInput,
          conversation: conversationMessages,
          systemPrompt: getSystemPrompt(onboardingData),
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to get response');
      }

      const data = await response.json();
      const assistantMessage: Message = { role: 'assistant', content: data.response };
      setMessages((prev) => [...prev, assistantMessage]);

      // Extract onboarding data from conversation
      updateOnboardingData(currentInput, data.response);

      // Check if we have all required data
      if (hasAllRequiredData()) {
        // Offer to generate content
        setTimeout(() => {
          offerContentGeneration();
        }, 1000);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const getSystemPrompt = (data: OnboardingData): string => {
    const collected = [];
    const missing = [];

    if (data.artistName) collected.push(`Artist Name: ${data.artistName}`);
    else missing.push('artist name');

    if (data.singleTitle) collected.push(`Single Title: "${data.singleTitle}"`);
    else missing.push('single/release title');

    if (data.releaseDate) collected.push(`Release Date: ${data.releaseDate}`);
    else missing.push('release date');

    if (data.genre) collected.push(`Genre: ${data.genre}`);
    else missing.push('genre');

    if (data.vibe) collected.push(`Vibe/Tone: ${data.vibe}`);
    else missing.push('vibe/tone');

    if (data.targetAudience) collected.push(`Target Audience: ${data.targetAudience}`);

    return `You are a friendly, playful, and enthusiastic social media expert helping a music artist create content for their upcoming release. 

Your personality:
- Playful and inviting (use emojis naturally - 1-2 per message max)
- Supportive and encouraging (celebrate their answers!)
- Music industry-savvy (you understand release cycles, genres, platforms)
- Conversational (like talking to a friend, not a corporate bot)
- Enthusiastic but not overbearing

Your goal: Collect information through natural, friendly conversation to create a personalized content calendar.

Information collected so far:
${collected.length > 0 ? collected.map(c => `✅ ${c}`).join('\n') : 'None yet!'}

${missing.length > 0 ? `Still need: ${missing.join(', ')}` : '🎉 All required info collected!'}

Guidelines:
- Ask ONE question at a time
- Be natural and conversational
- When user answers, acknowledge warmly (e.g., "Awesome!" "Love it!" "Perfect!") then move to next question
- Don't repeat questions you've already asked
- If user gives multiple pieces of info, acknowledge all of them
- For release date, help them format it if needed (prefer YYYY-MM-DD)
- For genre, be flexible with variations (e.g., "indie rock" = "Indie")
- For vibe, encourage descriptive answers (e.g., "energetic and upbeat", "dreamy and introspective")

${missing.length === 0 ? 'You have all required information! Congratulate them and offer to generate the content calendar. Ask if they\'re ready!' : `Next: Ask about ${missing[0]}.`}`;
  };

  const updateOnboardingData = (userInput: string, assistantResponse: string) => {
    const lowerInput = userInput.toLowerCase();
    const lowerResponse = assistantResponse.toLowerCase();
    const updated = { ...onboardingData };

    // Extract artist name (usually first response, or if Claude asks about it)
    if (!updated.artistName) {
      if (messages.filter(m => m.role === 'user').length === 1) {
        // First user message is likely artist name
        updated.artistName = userInput.trim();
      } else if (lowerResponse.includes('artist name') || lowerResponse.includes("what's your name")) {
        // Claude just asked for artist name
        updated.artistName = userInput.trim();
      }
    }

    // Extract single title
    if (!updated.singleTitle) {
      // Look for quoted titles
      const quotedMatch = userInput.match(/"([^"]+)"/) || userInput.match(/'([^']+)'/);
      if (quotedMatch) {
        updated.singleTitle = quotedMatch[1].trim();
      } 
      // Look for patterns like "called X", "titled X", "named X"
      else if (lowerInput.includes('called') || lowerInput.includes('titled') || lowerInput.includes('named')) {
        const match = userInput.match(/(?:called|titled|named)\s+["']?([^"'\n]+)["']?/i);
        if (match) {
          updated.singleTitle = match[1].trim();
        }
      }
      // If Claude asks about single/track/release
      else if (lowerResponse.includes('single') || lowerResponse.includes('track') || lowerResponse.includes('release') || lowerResponse.includes('song')) {
        updated.singleTitle = userInput.trim();
      }
    }

    // Extract release date
    if (!updated.releaseDate) {
      // ISO format: YYYY-MM-DD
      const isoMatch = userInput.match(/\d{4}-\d{2}-\d{2}/);
      if (isoMatch) {
        updated.releaseDate = isoMatch[0];
      }
      // US format: MM/DD/YYYY
      else {
        const usMatch = userInput.match(/\d{1,2}\/\d{1,2}\/\d{4}/);
        if (usMatch) {
          // Convert to ISO format
          const [month, day, year] = usMatch[0].split('/');
          updated.releaseDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        }
        // Text format: "February 1st, 2026" or "Feb 1, 2026"
        else {
          const textMatch = userInput.match(/(\w+)\s+(\d{1,2})(?:st|nd|rd|th)?,?\s+(\d{4})/i);
          if (textMatch) {
            // Simple conversion - would need date-fns for proper parsing
            const months: Record<string, string> = {
              'january': '01', 'february': '02', 'march': '03', 'april': '04',
              'may': '05', 'june': '06', 'july': '07', 'august': '08',
              'september': '09', 'october': '10', 'november': '11', 'december': '12',
              'jan': '01', 'feb': '02', 'mar': '03', 'apr': '04',
              'may': '05', 'jun': '06', 'jul': '07', 'aug': '08',
              'sep': '09', 'oct': '10', 'nov': '11', 'dec': '12'
            };
            const month = months[textMatch[1].toLowerCase()];
            if (month) {
              updated.releaseDate = `${textMatch[3]}-${month}-${textMatch[2].padStart(2, '0')}`;
            }
          }
        }
      }
    }

    // Extract genre
    if (!updated.genre) {
      const genres = ['pop', 'rock', 'hip-hop', 'hip hop', 'r&b', 'r and b', 'country', 'electronic', 'indie', 'alternative', 'folk', 'jazz', 'blues', 'reggae', 'metal', 'punk', 'classical'];
      const foundGenre = genres.find(g => lowerInput.includes(g));
      if (foundGenre) {
        // Normalize genre name
        const genreMap: Record<string, string> = {
          'hip hop': 'Hip-Hop',
          'r and b': 'R&B',
          'r&b': 'R&B',
        };
        updated.genre = genreMap[foundGenre] || foundGenre.charAt(0).toUpperCase() + foundGenre.slice(1);
      }
    }

    // Extract vibe/tone (usually longer response)
    if (!updated.vibe) {
      if (lowerResponse.includes('vibe') || lowerResponse.includes('tone') || lowerResponse.includes('feel') || lowerResponse.includes('sound') || lowerResponse.includes('mood')) {
        updated.vibe = userInput.trim();
      }
    }

    // Extract target audience (optional)
    if (!updated.targetAudience) {
      if (lowerResponse.includes('audience') || lowerResponse.includes('fans') || lowerResponse.includes('listeners')) {
        updated.targetAudience = userInput.trim();
      }
    }

    setOnboardingData(updated);
  };

  const hasAllRequiredData = (): boolean => {
    return !!(
      onboardingData.artistName &&
      onboardingData.singleTitle &&
      onboardingData.releaseDate &&
      onboardingData.genre &&
      onboardingData.vibe
    );
  };

  const offerContentGeneration = () => {
    const offerMessage: Message = {
      role: 'assistant',
      content: `Perfect! I've got everything I need! 🎉

Here's what I have:
✨ Artist: ${onboardingData.artistName}
🎵 Single: "${onboardingData.singleTitle}"
📅 Release Date: ${onboardingData.releaseDate}
🎸 Genre: ${onboardingData.genre}
💫 Vibe: ${onboardingData.vibe}
${onboardingData.targetAudience ? `👥 Audience: ${onboardingData.targetAudience}` : ''}

Ready to generate your content calendar? Just say "yes" or "generate" and I'll create 15-20 promotional posts tailored to your release cycle! 🚀`
    };
    setMessages((prev) => [...prev, offerMessage]);
  };

  const generateContent = async () => {
    if (!hasAllRequiredData()) return;

    setIsGenerating(true);
    setError(null);

    const generatingMessage: Message = {
      role: 'assistant',
      content: 'Awesome! Let me create your personalized content calendar... This will take about 10-30 seconds. ⏳✨'
    };
    setMessages((prev) => [...prev, generatingMessage]);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          artistName: onboardingData.artistName,
          singleTitle: onboardingData.singleTitle,
          releaseDate: onboardingData.releaseDate,
          genre: onboardingData.genre,
          vibe: onboardingData.vibe,
          targetAudience: onboardingData.targetAudience,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to generate content');
      }

      const result: ContentGenerationResponse = await response.json();

      const successMessage: Message = {
        role: 'assistant',
        content: `🎉 Done! I've generated ${result.posts.length} posts for your release!

Ready to see your content calendar? I'll show you all the posts organized by week.`
      };
      setMessages((prev) => [...prev, successMessage]);

      // Store results in sessionStorage and redirect to results page
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('generatedResults', JSON.stringify(result));
        router.push('/?generated=true');
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate content';
      setError(errorMessage);
      const errorMsg: Message = {
        role: 'assistant',
        content: `Oops! ${errorMessage} Let's try again - just say "generate" when you're ready!`
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsGenerating(false);
    }
  };

  // Check if user wants to generate (after assistant offers)
  useEffect(() => {
    if (messages.length > 0 && hasAllRequiredData() && !isGenerating) {
      const lastUserMessage = messages.filter(m => m.role === 'user').pop()?.content.toLowerCase() || '';
      const lastAssistantMessage = messages.filter(m => m.role === 'assistant').pop()?.content.toLowerCase() || '';
      
      // Only trigger if assistant just offered generation AND user confirms
      if (lastAssistantMessage.includes('ready to generate') && 
          (lastUserMessage.includes('yes') || lastUserMessage.includes('generate') || 
           lastUserMessage.includes('go') || lastUserMessage.includes('ready') || 
           lastUserMessage === 'y' || lastUserMessage === 'yeah')) {
        generateContent();
      }
    }
  }, [messages, isGenerating]);

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="border-b p-4 bg-card">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Let's Create Your Content Calendar! 🎵</h1>
            <p className="text-sm text-muted-foreground">
              Chat with me to set up your release
            </p>
          </div>
          <Link href="/">
            <Button variant="outline">Back to Form</Button>
          </Link>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <div className="whitespace-pre-wrap">{message.content}</div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-lg p-4">
                <div className="flex gap-1">
                  <span className="animate-bounce">●</span>
                  <span className="animate-bounce delay-75">●</span>
                  <span className="animate-bounce delay-150">●</span>
                </div>
              </div>
            </div>
          )}

          {isGenerating && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-lg p-4">
                <div className="text-sm">Generating your content calendar... ⏳</div>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
              <div className="text-sm text-destructive">{error}</div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <footer className="border-t p-4 bg-card">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your answer..."
              className="min-h-[60px] resize-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <Button type="submit" disabled={isLoading || isGenerating || !input.trim()}>
              Send
            </Button>
          </div>
        </form>
      </footer>
    </div>
  );
}

