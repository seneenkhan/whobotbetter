import express from 'express';
import OpenAI from 'openai';
import dotenv from 'dotenv';


const router = express.Router();
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post('/', async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1000
    });

    res.json({
      output: response.choices[0]?.message?.content || 'No response from GPT'
    });

  } catch (error) {
    console.error('OpenAI error:', error.message);
    res.status(500).json({ 
      error: 'OpenAI request failed',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

export default router;
