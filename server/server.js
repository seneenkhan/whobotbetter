import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors({
  origin: ['http://localhost:5173','https://whobotbetter/compare.vercel.app' ],
  credentials: true
}));
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Server is running');
});

import claudeRoute from './routes/claudeRoute.js';
import geminiRoute from './routes/geminiRoute.js';
import openaiRoute from './routes/openaiRoute.js';

app.use('/api/claude', claudeRoute);
app.use('/api/gemini', geminiRoute);
app.use('/api/openai', openaiRoute);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
app.get('/health', (req, res) => {
  res.sendStatus(200);
});
const PORT = process.env.PORT || 8000;
app.listen(PORT, '0.0.0.0', () => {  // Add '0.0.0.0' for Render
  console.log(`Server running on port ${PORT}`);
});