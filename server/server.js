import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const allowedOrigins = [
  'http://localhost:5173', 
  'https://whobotbetter.vercel.app',
  'https://whobotbetter-*.vercel.app',
  'https://whobotbetter-p410jg1xs-seneenkhans-projects.vercel.app' 
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.some(allowedOrigin => 
      origin === allowedOrigin || 
      origin.endsWith('.vercel.app') 
    )) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.options('*', cors());
app.use(express.json());

import claudeRoute from './routes/claudeRoute.js';
import geminiRoute from './routes/geminiRoute.js';
import openaiRoute from './routes/openaiRoute.js';

app.use('/api/claude', claudeRoute);
app.use('/api/gemini', geminiRoute);
app.use('/api/openai', openaiRoute);

app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString() 
  });
});

app.get('/', (req, res) => {
  res.json({ 
    message: 'Server is running',
    endpoints: [
      '/api/claude',
      '/api/gemini', 
      '/api/openai',
      '/health'
    ]
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something broke!',
    ...(process.env.NODE_ENV === 'development' && { details: err.message })
  });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Allowed origins: ${allowedOrigins.join(', ')}`);
});