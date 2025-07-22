import express from 'express'
import dotenv from 'dotenv'
import { GoogleGenerativeAI } from '@google/generative-ai'

dotenv.config()

const router = express.Router()

// Initialize Gemini with API key from environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY)

// Supported models configuration
const SUPPORTED_MODELS = {
  'gemini-pro': 'gemini-1.5-pro-latest',
  'gemini-1.5-pro': 'gemini-1.5-pro-latest',
  'gemini-1.5-flash': 'gemini-1.5-flash-latest'
}

router.post('/', async (req, res) => {
  const { prompt, modelName = 'gemini-1.5-pro' } = req.body

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' })
  }

  try {
    // Get the actual model name from our supported models mapping
    const modelId = SUPPORTED_MODELS[modelName] || SUPPORTED_MODELS['gemini-1.5-pro']
    
    const model = genAI.getGenerativeModel({ 
      model: modelId,
      generationConfig: {
        temperature: 0.9,  // More creative responses
        topP: 0.8,
        topK: 40
      }
    })

    const result = await model.generateContent({
      contents: [{
        role: 'user',
        parts: [{ text: prompt }]
      }]
    })
    
    const response = await result.response
    const text = response.text()
    
    res.json({ 
      text,
      modelUsed: modelId,
      safetyRatings: response.candidates?.[0]?.safetyRatings
    })
    
  } catch (error) {
    console.error('Gemini API Error:', error)
    
    let errorMessage = 'Failed to generate content'
    let statusCode = 500
    
    if (error.status === 403) {
      errorMessage = 'Invalid API key or insufficient permissions'
      statusCode = 403
    } else if (error.status === 404) {
      errorMessage = 'Model not found. Please check the model name'
      statusCode = 400
    } else if (error.message.includes('API key not valid')) {
      errorMessage = 'Invalid Gemini API key'
      statusCode = 401
    }
    
    res.status(statusCode).json({ 
      error: errorMessage,
      details: error.errorDetails || error.message
    })
  }
})

export default router