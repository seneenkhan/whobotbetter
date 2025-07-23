import { useState } from 'react'
import PromptInput from '../components/PromptInput'
import AIResponseCard from '../components/AiResponseCard'

const SERVER_URL = import.meta.env.VITE_SERVER_URL

const Compare = () => {
  const [prompt, setPrompt] = useState('')
  const [responses, setResponses] = useState([])
  const [error, setError] = useState('')
  const [selectedBest, setSelectedBest] = useState(null)
  const [hasVoted, setHasVoted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!prompt.trim()) return

    setIsLoading(true)
    setSelectedBest(null)
    setHasVoted(false)
    setResponses([])

    try {
      const startTime = Date.now()

      const res = await fetch(`${SERVER_URL}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })

      const data = await res.json()
      const totalTime = Date.now() - startTime

      if (!res.ok) throw new Error(data?.error || 'Something went wrong.')

      const responseData = [
        {
          label: 'GPT-3.5',
          response: data.gpt || 'No response from GPT-3.5',
        },
        {
          label: 'Claude 3 Haiku',
          response: data.claude || 'No response from Claude',
        },
        {
          label: 'Gemini Pro',
          response: data.gemini || 'No response from Gemini',
        },
      ]

      setResponses(
        responseData.map((r) => ({
          ...r,
          responseTime: totalTime,
        }))
      )
    } catch (err) {
      console.error('API Error:', err)
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSelectBest = (modelLabel) => {
    setSelectedBest(modelLabel)
    setHasVoted(true)
    // TODO: Add Supabase vote-saving logic here
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
