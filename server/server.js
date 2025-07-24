import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://whobotbetter-p410jg1xs-seneenkhans-projects.vercel.app'
];

app.use(cors({
  origin: (origin, callback) => {
    if (
      !origin ||
      allowedOrigins.includes(origin) ||
      origin.endsWith('.vercel.app')
    ) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

import claudeRoute from './routes/claudeRoute.js';
import geminiRoute from './routes/geminiRoute.js';
import openaiRoute from './routes/openaiRoute.js';

app.use('/api/claude', claudeRoute);
app.use('/api/gemini', geminiRoute);
app.use('/api/openai', openaiRoute);

app.get('/', (req, res) => res.json({ status: 'OK' }));
app.get('/health', (req, res) => res.sendStatus(200));

app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
