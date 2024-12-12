import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';
import { healthCheck } from '../lib/db';
import userRoutes from './routes/users';
import journalRoutes from './routes/journal';
import emotionRoutes from './routes/emotions';
import meetingRoutes from './routes/meetings';

const app = express();

// Environment variable validation
const envSchema = z.object({
  API_PORT: z.string().transform(Number),
  NODE_ENV: z.enum(['development', 'production']),
  RATE_LIMIT_WINDOW_MS: z.string().transform(Number),
  RATE_LIMIT_MAX_REQUESTS: z.string().transform(Number),
});

const env = envSchema.parse(process.env);

// Security middleware
app.use(helmet());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX_REQUESTS,
  message: 'Too many requests from this IP, please try again later.'
});

app.use(limiter);

// CORS configuration
if (env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
}

// Health check endpoint
app.get('/health', async (req, res) => {
  const isHealthy = await healthCheck();
  res.status(isHealthy ? 200 : 500).json({ status: isHealthy ? 'healthy' : 'unhealthy' });
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/journal', journalRoutes);
app.use('/api/emotions', emotionRoutes);
app.use('/api/meetings', meetingRoutes);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// Start server
app.listen(env.API_PORT, () => {
  console.log(`Server running on port ${env.API_PORT}`);
});