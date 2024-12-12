import express from 'express';
import { z } from 'zod';
import { query, transaction } from '../../lib/db';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Validation schemas
const createUserSchema = z.object({
  email: z.string().email(),
  fullName: z.string().min(2),
  preferences: z.object({
    emailNotifications: z.boolean(),
    language: z.string(),
    fontSize: z.string(),
    colorScheme: z.string()
  }).optional()
});

const updateUserSchema = createUserSchema.partial();

// Get user by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const users = await query(
      'SELECT id, email, full_name, preferences FROM users WHERE id = $1',
      [req.params.id]
    );
    
    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(users[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Create new user
router.post('/', async (req, res) => {
  try {
    const userData = createUserSchema.parse(req.body);
    
    const result = await transaction(async (client) => {
      const { rows } = await client.query(
        'INSERT INTO users (email, full_name, preferences) VALUES ($1, $2, $3) RETURNING *',
        [userData.email, userData.fullName, userData.preferences || {}]
      );
      return rows[0];
    });
    
    res.status(201).json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Update user
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const userData = updateUserSchema.parse(req.body);
    
    const result = await transaction(async (client) => {
      const { rows } = await client.query(
        `UPDATE users 
         SET email = COALESCE($1, email),
             full_name = COALESCE($2, full_name),
             preferences = COALESCE($3, preferences)
         WHERE id = $4
         RETURNING *`,
        [userData.email, userData.fullName, userData.preferences, req.params.id]
      );
      return rows[0];
    });
    
    if (!result) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Delete user
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const result = await transaction(async (client) => {
      const { rows } = await client.query(
        'DELETE FROM users WHERE id = $1 RETURNING id',
        [req.params.id]
      );
      return rows[0];
    });
    
    if (!result) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

export default router;