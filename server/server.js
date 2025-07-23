import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import claudeRoute from './routes/claudeRoute.js'
import geminiRoute from './routes/geminiRoute.js'
import openaiRoute from './routes/openaiRoute.js'

dotenv.config()

const app = express()

app.use(cors({
  origin: 'http://localhost:5173', // Change this to your Vercel URL after deploy
  credentials: true,
}))

app.use(express.json())

// Routes
app.use('/api/claude', claudeRoute)
app.use('/api/gemini', geminiRoute)
app.use('/api/openai', openaiRoute)

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})
