import express from 'express'
import dotenv from 'dotenv'
import { GoogleGenerativeAI } from '@google/generative-ai'

dotenv.config()

const router = express.Router()

const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY)

router.post('/', async (req, res) => {
  const { prompt } = req.body

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    res.json({ text })
  } catch (error) {
    console.error("Gemini API Error:", error)
    res.status(500).json({
      error:
        error.status === 403
          ? "Invalid API key or insufficient permissions for Gemini."
          : "Gemini API failed",
    })
  }
})

export default router
