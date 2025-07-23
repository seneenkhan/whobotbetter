import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import claudeRoute from './routes/claudeRoute.js'
import geminiRoute from './routes/geminiRoute.js'
import openaiRoute from './routes/openaiRoute.js' // ✅ import OpenAI route

dotenv.config()
const app = express()

// ✅ Allow only localhost for now (update this in production)
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}))

app.use(express.json())

// ✅ API routes
app.use('/api/claude', claudeRoute)
app.use('/api/gemini', geminiRoute)
app.use('/api/openai', openaiRoute) // ✅ add OpenAI route

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})
