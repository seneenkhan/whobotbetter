import { useState } from 'react'
import PromptInput from '../components/PromptInput'
import AIResponseCard from '../components/AiResponseCard'
import axios from 'axios'

const Compare = () => {
  const [prompt, setPrompt] = useState('')
  const [responses, setResponses] = useState([])
  const [error, setError] = useState('')
  const [selectedBest, setSelectedBest] = useState(null)
  const [hasVoted, setHasVoted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [responseTimes, setResponseTimes] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!prompt.trim()) return
    setIsLoading(true)
    setSelectedBest(null)
    setHasVoted(false)
    setResponseTimes({})

    try {
      // Start timing for all requests
      const startTimes = {
        gpt: Date.now(),
        claude: Date.now(),
        gemini: Date.now()
      }

      const [gptRes, claudeRes, geminiRes] = await Promise.all([
        axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
          },
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
              'Content-Type': 'application/json',
            },
          }
        ).then(res => {
          const endTime = Date.now()
          return {
            ...res,
            responseTime: endTime - startTimes.gpt
          }
        }),
        axios.post('http://localhost:8000/api/claude', { prompt })
          .then(res => {
            const endTime = Date.now()
            return {
              ...res,
              responseTime: endTime - startTimes.claude
            }
          }),
        axios.post('http://localhost:8000/api/gemini', { prompt })
          .then(res => {
            const endTime = Date.now()
            return {
              ...res,
              responseTime: endTime - startTimes.gemini
            }
          })
      ])

      setResponses([
        {
          label: 'GPT-3.5',
          response: gptRes.data.choices[0].message.content.trim(),
          responseTime: gptRes.responseTime
        },
        {
          label: 'Claude 3 Haiku',
          response: claudeRes.data.content?.[0]?.text?.trim() || 'No response from Claude',
          responseTime: claudeRes.responseTime
        },
        {
          label: 'Gemini Pro',
          response: geminiRes.data?.text || geminiRes.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from Gemini',
          responseTime: geminiRes.responseTime
        }
      ])

    } catch (err) {
      console.error('API Error:', err)
      setError(
        err.response?.data?.error?.message ||
        err.response?.data?.message ||
        'Something went wrong. Please try again.'
      )
      setResponses([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSelectBest = (modelLabel) => {
    setSelectedBest(modelLabel)
    setHasVoted(true)
    // Add Supabase saving here later
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-6">
      <PromptInput 
        prompt={prompt} 
        setPrompt={setPrompt} 
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />

      {error && (
        <div className="text-red-500 bg-red-100 border border-red-300 p-3 rounded-md">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {responses.map((response) => (
          <AIResponseCard
            key={response.label}
            label={response.label}
            response={response.response}
            responseTime={response.responseTime}
            isBest={selectedBest === response.label}
            isDisabled={hasVoted && selectedBest !== response.label}
            onSelectBest={() => handleSelectBest(response.label)}
            isLoading={isLoading}
          />
        ))}
      </div>
    </div>
  )
}

export default Compare