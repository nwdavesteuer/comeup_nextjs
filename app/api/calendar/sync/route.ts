import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import type { CalendarEvent } from '@/types';

// Validation schema
const syncCalendarSchema = z.object({
  events: z.array(
    z.object({
      id: z.string(),
      type: z.enum(['post', 'shoot', 'edit_deadline', 'release']),
      title: z.string(),
      description: z.string().optional(),
      date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      time: z.string().optional(),
      worldId: z.string().optional(),
      snapshotId: z.string().optional(),
      shootDayId: z.string().optional(),
    })
  ),
});

/**
 * POST /api/calendar/sync
 * Sync events to Google Calendar
 * TODO: Implement actual Google Calendar API integration with OAuth
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = syncCalendarSchema.parse(body);

    // TODO: Implement Google Calendar API integration
    // 1. Check for Google OAuth token
    // 2. Create events via Google Calendar API
    // 3. Store Google event IDs
    // 4. Return synced events with Google event IDs

    // Mock implementation for now
    const syncedEvents = data.events.map((event) => ({
      ...event,
      syncedToGoogle: true,
      googleEventId: `google-event-${event.id}-${Date.now()}`,
    }));

    return NextResponse.json({
      success: true,
      syncedCount: syncedEvents.length,
      events: syncedEvents,
      message: 'Events synced to Google Calendar (mock)',
    });
  } catch (error) {
    console.error('Error syncing to Google Calendar:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: 'Failed to sync to Google Calendar',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/calendar/status
 * Check Google Calendar connection status
 */
export async function GET() {
  // TODO: Check actual OAuth token status
  return NextResponse.json({
    connected: false,
    message: 'Google Calendar not connected. OAuth integration coming soon.',
  });
}

