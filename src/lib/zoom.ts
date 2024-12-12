import { z } from 'zod';
import { supabase } from './supabase';

// Environment variable validation
const envSchema = z.object({
  VITE_API_URL: z.string().optional(),
});

const env = envSchema.parse(import.meta.env);

const API_URL = env.VITE_API_URL || '/api';

interface MeetingDetails {
  topic: string;
  startTime: string;
  duration: number;
  timezone: string;
  agenda?: string;
}

export async function createZoomMeeting(details: MeetingDetails) {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      throw new Error('Authentication required');
    }

    const response = await fetch(`${API_URL}/meetings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`,
      },
      body: JSON.stringify(details),
      credentials: 'include'
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create meeting');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating Zoom meeting:', error);
    throw error;
  }
}

export async function sendMeetingConfirmation(
  recipientEmail: string,
  meetingDetails: any,
  appointmentDetails: any
) {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      throw new Error('Authentication required');
    }

    const response = await fetch(`${API_URL}/meetings/confirmation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({
        email: recipientEmail,
        meeting: meetingDetails,
        appointment: appointmentDetails
      }),
      credentials: 'include'
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to send confirmation');
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending confirmation:', error);
    throw error;
  }
}