import express from 'express'
import axios from 'axios'

const router = express.Router()

router.post('/', async (req, res) => {
  const { prompt } = req.body

  if (!prompt) return res.status(400).json({ error: 'Prompt is required' })

  try {
    const [claudeRes, geminiRes, gptRes] = await Promise.all([
      // Claude 3 Haiku
      axios.post(
        'https://api.anthropic.com/v1/messages',
        {
          model: 'claude-3-haiku-20240307',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 1024,
        },
        {
          headers: {
            'x-api-key': process.env.VITE_ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01',
            'Content-Type': 'application/json',
          },
        }
      ),

      // Gemini Pro
      axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.VITE_GEMINI_API_KEY}`,
        {
          contents: [{ parts: [{ text: prompt }] }],
        }
      ),

      // GPT-3.5 Turbo
      axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7,
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.VITE_OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      )
    ])

    const responses = {
      claude:
        claudeRes.data.content?.[0]?.text?.trim() || 'No response from Claude',
      gemini:
        geminiRes.data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
        'No response from Gemini',
      gpt:
        gptRes.data.choices?.[0]?.message?.content?.trim() ||
        'No response from GPT-3.5',
    }

    res.json(responses)
  } catch (err) {
    console.error('Error in /generate:', err?.response?.data || err.message)
    res.status(500).json({ error: 'Failed to fetch from one or more models' })
  }
})

export default router
