
import express from 'express';
import axios from 'axios';

const router = express.Router();

// Route should be '/' since the main server already handles '/api/claude'
router.post('/', async (req, res) => {
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
          'x-api-key': process.env.ANTHROPIC_API_KEY,
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
    
    // Better error handling
    if (err.response) {
      // API responded with error status
      const status = err.response.status;
      const errorMessage = err.response.data?.error?.message || 'Claude API error';
      
      if (status === 401) {
        return res.status(500).json({ error: 'Invalid API key for Claude' });
      } else if (status === 429) {
        return res.status(429).json({ error: 'Rate limit exceeded for Claude' });
      } else {
        return res.status(500).json({ error: errorMessage });
      }
    } else if (err.request) {
      // Request was made but no response received
      return res.status(500).json({ error: 'No response from Claude API' });
    } else {
      // Something else happened
      return res.status(500).json({ error: 'Claude request failed' });
    }
  }
});

export default router;