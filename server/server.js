
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://whobotbetter.vercel.app',
    'https://whobotbetter-*.vercel.app'
  ],
  credentials: true
}));
app.use(express.json());
import claudeRoute from './routes/claudeRoute.js';
import geminiRoute from './routes/geminiRoute.js';
import openaiRoute from './routes/openaiRoute.js';

app.use('/api/claude', claudeRoute);
app.use('/api/gemini', geminiRoute);
app.use('/api/openai', openaiRoute);
app.get('/', (req, res) => res.json({ status: 'Server running' }));
app.get('/health', (req, res) => res.sendStatus(200));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Server error' });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});