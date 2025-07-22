import { useState } from 'react'
import PromptInput from '../components/PromptInput'
import AIResponseCard from '../components/AiResponseCard'
import axios from 'axios'

const Compare = () => {
  const [prompt, setPrompt] = useState('')
  const [responses, setResponses] = useState([])
  const [error, setError] = useState('')
  const [votes, setVotes] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!prompt.trim()) return
    setIsLoading(true)

    try {
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
        ),
        axios.post('http://localhost:8000/api/claude', { prompt }),
        axios.post('http://localhost:8000/api/gemini', { prompt })
      ])

      const updatedResponses = [
        {
          label: 'GPT-3.5',
          response: gptRes.data.choices[0].message.content.trim(),
        },
        {
          label: 'Claude 3 Haiku',
          response: claudeRes.data.content?.[0]?.text?.trim() || 'No response from Claude',
        },
        {
          label: 'Gemini Pro',
          response: geminiRes.data?.text || geminiRes.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from Gemini',
        }
      ]

      setResponses(updatedResponses)
      setVotes({})
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

  const handleVote = (label, direction) => {
    setVotes((prev) => ({
      ...prev,
      [label]: prev[label] === direction ? null : direction
    }))
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-6">
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

      <div className="grid md:grid-cols-3 gap-4">
        {responses.map((response, index) => (
          <AIResponseCard
            key={index}
            label={response.label}
            response={response.response}
            voted={votes[response.label]}
            onVote={handleVote}
            isLoading={isLoading && !responses[index]?.response}
          />
        ))}
      </div>
    </div>
  )
}

export default Compare