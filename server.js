import express from 'express'
import cors from 'cors'
import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.post('/api/claude', async (req, res) => {
  try {
    const { prompt } = req.body

    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: 'claude-3-haiku-20240307',
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          'x-api-key': process.env.VITE_ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
          'Content-Type': 'application/json',
        },
      }
    )

    res.json(response.data)
  } catch (err) {
    console.error('Claude proxy error:', err.response?.data || err.message)
    res.status(500).json({ error: 'Claude API failed' })
  }
})

const PORT = 8000
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`))
