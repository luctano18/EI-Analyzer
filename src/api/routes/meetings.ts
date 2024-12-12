import express from 'express';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Environment variables validation
const envSchema = z.object({
  ZOOM_API_KEY: z.string(),
  ZOOM_API_SECRET: z.string(),
  SMTP_HOST: z.string(),
  SMTP_PORT: z.string().transform(Number),
  SMTP_USER: z.string(),
  SMTP_PASS: z.string(),
});

const env = envSchema.parse(process.env);

// Email transporter setup
const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: true,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});

// Create Zoom meeting
router.post('/', authenticateToken, async (req, res) => {
  try {
    const token = generateZoomJWT();
    
    const response = await fetch('https://api.zoom.us/v2/users/me/meetings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...req.body,
        settings: {
          host_video: true,
          participant_video: true,
          join_before_host: false,
          mute_upon_entry: true,
          waiting_room: true,
          meeting_authentication: true,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Zoom API error: ${response.statusText}`);
    }

    const meeting = await response.json();
    res.json(meeting);
  } catch (error: any) {
    console.error('Error creating meeting:', error);
    res.status(500).json({ error: error.message });
  }
});

// Send meeting confirmation
router.post('/confirmation', authenticateToken, async (req, res) => {
  try {
    const { email, meeting, appointment } = req.body;

    await transporter.sendMail({
      from: env.SMTP_USER,
      to: email,
      subject: 'Your Zoom Meeting Confirmation',
      html: `
        <h2>Your appointment has been confirmed!</h2>
        <p><strong>Date:</strong> ${new Date(appointment.startTime).toLocaleDateString()}</p>
        <p><strong>Time:</strong> ${new Date(appointment.startTime).toLocaleTimeString()}</p>
        <p><strong>Duration:</strong> ${appointment.duration} minutes</p>
        <h3>Zoom Meeting Details</h3>
        <p><strong>Meeting Link:</strong> <a href="${meeting.join_url}">${meeting.join_url}</a></p>
        <p><strong>Meeting ID:</strong> ${meeting.id}</p>
        <p><strong>Passcode:</strong> ${meeting.password}</p>
        <p>Please save this information for your records.</p>
      `,
    });

    res.json({ success: true });
  } catch (error: any) {
    console.error('Error sending confirmation:', error);
    res.status(500).json({ error: error.message });
  }
});

function generateZoomJWT(): string {
  const payload = {
    iss: env.ZOOM_API_KEY,
    exp: ((new Date()).getTime() + 5000)
  };

  return jwt.sign(payload, env.ZOOM_API_SECRET);
}

export default router;