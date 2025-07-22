import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import claudeRoute from './routes/claudeRoute.js'

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/claude', claudeRoute)

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})

