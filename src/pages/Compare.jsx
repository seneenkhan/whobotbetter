import { useState } from 'react'
import PromptInput from '../components/PromptInput'
import AIResponseCard from '../components/AiResponseCard'
import axios from 'axios'

const openaiKey = import.meta.env.VITE_OPENAI_API_KEY

const Compare = () => {
  const [prompt, setPrompt] = useState('')
  const [responses, setResponses] = useState([])
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!prompt.trim()) return

    try {
      const [gptRes, claudeRes] = await Promise.all([
        // OpenAI API call (frontend OK)
        axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
          },
          {
            headers: {
              Authorization: `Bearer ${openaiKey}`,
              'Content-Type': 'application/json',
            },
          }
        ),
        // Claude API via proxy (avoids CORS)
        axios.post('http://localhost:8000/api/claude', { prompt })
      ])

      setResponses([
        {
          label: 'GPT-3.5',
          response: gptRes.data.choices[0].message.content.trim(),
        },
        {
          label: 'Claude 3 Haiku',
          response: claudeRes.data.content[0].text.trim(),
        }
      ])
    } catch (err) {
      console.error('🔴 API Error:', JSON.stringify(err.response?.data || err.message, null, 2))
      setError(err.response?.data?.error?.message || 'Something went wrong. Check your keys or try again.')
      setResponses([])
    }
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-6">
      <PromptInput prompt={prompt} setPrompt={setPrompt} onSubmit={handleSubmit} />

      {error && (
        <div className="text-red-500 bg-red-100 border border-red-300 p-3 rounded-md">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {responses.map((r, i) => (
          <AIResponseCard key={i} label={r.label} response={r.response} />
        ))}
      </div>
    </div>
  )
}

export default Compare
