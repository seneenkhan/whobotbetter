import { useState } from 'react'
import PromptInput from '../components/PromptInput'
import AIResponseCard from '../components/AiResponseCard'

const Compare = () => {
  const [prompt, setPrompt] = useState('')
  const [responses, setResponses] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()

    // Fake data — later replace with real API
    setResponses([
      { label: 'GPT-4', response: `Response from GPT-4 to: "${prompt}"` },
      { label: 'Claude', response: `Response from Claude to: "${prompt}"` },
    ])
  }

  return (
    <div className="space-y-6">
      <PromptInput prompt={prompt} setPrompt={setPrompt} onSubmit={handleSubmit} />

      <div className="grid md:grid-cols-2 gap-4">
        {responses.map((r, i) => (
          <AIResponseCard key={i} label={r.label} response={r.response} />
        ))}
      </div>
    </div>
  )
}

export default Compare
