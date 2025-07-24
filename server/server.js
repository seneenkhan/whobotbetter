import express from 'express';
import cors from 'cors';
import claudeRoute from './routes/claudeRoute.js';
import geminiRoute from './routes/geminiRoute.js';
import openaiRoute from './routes/openaiRoute.js';

const app = express();

// CORS configuration for both development and production
const allowedOrigins = [
  'http://localhost:5173',     // Development
  'http://localhost:3000',     // Alternative dev port
  // 'https://whobotbetter.onrender.com', // Production (if frontend is also on Render)
  // Add your actual frontend domain here
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

// Add a health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/claude', claudeRoute);
app.use('/api/gemini', geminiRoute);
app.use('/api/openai', openaiRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: `Route ${req.originalUrl} not found` });
});

// Use PORT from environment variable (Render sets this automatically)
const PORT = process.env.PORT || 8000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});