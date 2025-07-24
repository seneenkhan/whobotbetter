import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://whobotbetter.vercel.app',
  'https://whobotbetter-*.vercel.app'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());

import claudeRoute from './routes/claudeRoute';
import geminiRoute from './routes/geminiRoute';
import openaiRoute from './routes/openaiRoute';


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