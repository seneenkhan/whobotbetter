const PromptInput = ({ prompt, setPrompt, onSubmit }) => {
    return (
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <textarea
          className="border p-2 rounded-md w-full"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt..."
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Compare
        </button>
      </form>
    )
  }
  
  export default PromptInput
  