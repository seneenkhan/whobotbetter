import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();

// Basic CORS - adjust origins as needed
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true
}));

// Middleware
app.use(express.json());

// Simple test route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// API Routes
import claudeRoute from './routes/claudeRoute.js';
import geminiRoute from './routes/geminiRoute.js';
import openaiRoute from './routes/openaiRoute.js';

app.use('/api/claude', claudeRoute);
app.use('/api/gemini', geminiRoute);
app.use('/api/openai', openaiRoute);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
app.get('/health', (req, res) => {
  res.sendStatus(200);
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, '0.0.0.0', () => {  // Add '0.0.0.0' for Render
  console.log(`Server running on port ${PORT}`);
});