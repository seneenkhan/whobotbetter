// This is perfectly fine for development
import express from 'express';
import cors from 'cors';
import claudeRoute from './routes/claudeRoute.js';
import geminiRoute from './routes/geminiRoute.js';
import openaiRoute from './routes/openaiRoute.js';

const app = express();

// Basic CORS (allow your frontend)
app.use(cors({ origin: 'http://localhost:5173' })); 
app.use(express.json());

// Routes
app.use('/api/claude', claudeRoute);
app.use('/api/gemini', geminiRoute);
app.use('/api/openai', openaiRoute);

const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));