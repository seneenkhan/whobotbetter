const AIResponseCard = ({ label, response, isBest, isDisabled, onSelectBest, isLoading }) => {
    return (
      <div className="p-6 bg-zinc-900 rounded-xl border border-zinc-700 shadow-lg flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-bold text-white mb-2">{label}</h2>
          <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">
            {isLoading ? 'Generating response...' : response}
          </p>
        </div>
  
        <div className="mt-2">
          <button
            onClick={() => onSelectBest(label)}
            disabled={isDisabled || isLoading}
            className={`w-full px-4 py-2 text-sm rounded-md transition-all ${
              isBest === label
                ? 'bg-green-600 text-white'
                : isDisabled
                  ? 'bg-zinc-700 text-zinc-500 cursor-not-allowed'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
            }`}
          >
            {isLoading ? (
              'Loading...'
            ) : isBest === label ? (
              '✓ Best Answer'
            ) : (
              'Select as Best'
            )}
          </button>
        </div>
  
        {isBest !== null && !isLoading && (
          <p className="text-xs text-zinc-400 mt-1 text-center">
            {isBest === label
              ? 'You selected this as the best answer!'
              : 'Another answer was selected'}
          </p>
        )}
      </div>
    )
  }
  
  export default AIResponseCard