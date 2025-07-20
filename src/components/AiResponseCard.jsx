const AIResponseCard = ({ label, response, voted, onVote }) => {
    return (
      <div className="p-6 bg-zinc-900 rounded-xl border border-zinc-700 shadow-lg flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-bold text-white mb-2">{label}</h2>
          <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">
            {response}
          </p>
        </div>
  
        <div className="flex gap-4 mt-2">
          <button
            onClick={() => onVote(label, 'up')}
            className={`px-4 py-1.5 text-sm rounded-md transition-all ${
              voted === 'up'
                ? 'bg-green-600 text-white'
                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
            }`}
          >
            👍 Upvote
          </button>
  
          <button
            onClick={() => onVote(label, 'down')}
            className={`px-4 py-1.5 text-sm rounded-md transition-all ${
              voted === 'down'
                ? 'bg-red-600 text-white'
                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
            }`}
          >
            👎 Downvote
          </button>
        </div>
      </div>
    )
  }
  
  export default AIResponseCard
  