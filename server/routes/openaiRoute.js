import express from 'express'
import OpenAI from 'openai'

const router = express.Router()

const openai = new OpenAI({
  apiKey: process.env.VITE_OPENAI_API_KEY,
})

router.post('/', async (req, res) => {
  const { prompt } = req.body
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    })
    res.json({ output: response.choices[0].message.content })
  } catch (err) {
    console.error('OpenAI error:', err)
    res.status(500).json({ error: 'OpenAI request failed' })
  }
})

export default router
