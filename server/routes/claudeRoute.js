import express from 'express';
import axios from 'axios';
const router = express.Router();

router.post('/api/claude', async (req, res) => {  // Changed from '/' to '/api/claude'
  const { prompt } = req.body;
  
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: 'claude-3-haiku-20240307',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }]
      },
      {
        headers: {
          'x-api-key': process.env.ANTHROPIC_API_KEY,  // Changed from VITE_ prefix
          'anthropic-version': '2023-06-01',
          'Content-Type': 'application/json'
        }
      }
    );

    // Standardize response format to match frontend expectation
    res.json({ 
      output: response.data.content[0]?.text || 'No response from Claude' 
    });
    
  } catch (err) {
    console.error('Claude API error:', err.response?.data || err.message);
    res.status(500).json({ 
      error: err.response?.data?.error?.message || 'Claude request failed' 
    });
  }
});

export default router;