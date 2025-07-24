import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = express.Router();

// Initialize Gemini with proper API key (no VITE_ prefix for backend)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Model configuration
const MODEL_CONFIG = {
  'gemini-pro': 'gemini-1.5-pro-latest',
  'gemini-1.5-pro': 'gemini-1.5-pro-latest',
  'gemini-1.5-flash': 'gemini-1.5-flash-latest'
};

// Route should be '/' since the main server already handles '/api/gemini'
router.post('/', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    // Use default model (or implement model selection if needed)
    const model = genAI.getGenerativeModel({
      model: MODEL_CONFIG['gemini-1.5-pro'],
      generationConfig: {
        temperature: 0.9,
        topP: 0.8,
        topK: 40
      }
    });

    const result = await model.generateContent({
      contents: [{
        role: 'user',
        parts: [{ text: prompt }]
      }]
    });
       
    const response = await result.response;
       
    // Standardize response format to match frontend expectation
    res.json({
      output: response.text() || 'No response from Gemini',
      modelUsed: MODEL_CONFIG['gemini-1.5-pro'],
      // Include safety ratings if needed by frontend
      ...(response.candidates?.[0]?.safetyRatings && {
        safetyRatings: response.candidates[0].safetyRatings
      })
    });
       
  } catch (error) {
    console.error('Gemini API Error:', error);
       
    // Enhanced error handling
    let statusCode = 500;
    let errorMessage = 'Failed to generate content';
    let errorDetails = error.message;

    if (error.status === 403) {
      statusCode = 403;
      errorMessage = 'API authentication failed';
    } else if (error.message.includes('API key not valid')) {
      statusCode = 401;
      errorMessage = 'Invalid Gemini API key';
    } else if (error.status === 429) {
      statusCode = 429;
      errorMessage = 'Rate limit exceeded';
    } else if (error.message.includes('SAFETY')) {
      statusCode = 400;
      errorMessage = 'Content blocked by safety filters';
    }

    res.status(statusCode).json({
      error: errorMessage,
      ...(process.env.NODE_ENV === 'development' && { details: errorDetails })
    });
  }
});

export default router;