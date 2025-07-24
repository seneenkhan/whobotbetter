const AIResponseCard = ({ 
    label, 
    response, 
    responseTime,
    isBest, 
    isDisabled, 
    onSelectBest, 
    isLoading 
  }) => {
    return (
      <div className={`w-full p-6 rounded-xl border-2 flex flex-col gap-5 transition-all duration-200
        ${isBest 
          ? 'bg-gradient-to-br from-green-900/20 to-zinc-800 border-green-500/40 shadow-lg shadow-green-500/10'
          : 'bg-zinc-800/90 border-zinc-700/60 hover:border-zinc-600/80 hover:bg-zinc-800/80'}
        min-h-[300px] max-w-md relative`}>
  
        <div className="flex justify-between items-start">
          <h2 className={`text-xl font-semibold mb-2 ${
            isBest ? 'text-green-400' : 'text-white'
          }`}>
            {label}
            {responseTime && !isLoading && (
              <span className="ml-2 text-xs font-normal text-zinc-400">
                {responseTime}ms
              </span>
            )}
          </h2>
          {isLoading && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-400">Measuring...</span>
              <div className="h-4 w-4 border-2 border-zinc-500 border-t-green-500 rounded-full animate-spin"/>
            </div>
          )}
        </div>
        {!isLoading && responseTime && (
          <div className="absolute top-4 right-4 bg-zinc-700/80 text-zinc-300 text-xs px-2 py-1 rounded-full">
            {responseTime}ms
          </div>
        )}
        <div className={`flex-1 overflow-y-auto pr-3 custom-scrollbar ${
          isLoading ? 'flex items-center justify-center' : ''
        }`}>
          {isLoading ? (
            <div className="text-center">
              <div className="mx-auto mb-2 h-8 w-8 border-4 border-zinc-600 border-t-green-500 rounded-full animate-spin"/>
              <span className="text-zinc-400 text-sm">Generating AI response...</span>
            </div>
          ) : (
            <div>
              <p className="text-zinc-200 leading-relaxed whitespace-pre-wrap">
                {response}
              </p>
              {responseTime && (
                <div className="mt-3 pt-3 border-t border-zinc-700/50">
                  <p className="text-xs text-zinc-500">
                    Generated in: <span className="text-zinc-400">{responseTime} milliseconds</span>
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="mt-auto">
          <button
            onClick={() => onSelectBest(label)}
            disabled={isDisabled || isLoading}
            className={`w-full px-5 py-3 rounded-lg transition-all flex items-center justify-center gap-2
              ${
                isBest
                  ? 'bg-green-600/90 hover:bg-green-600 text-white font-medium shadow-md shadow-green-500/20'
                  : isDisabled
                    ? 'bg-zinc-700/50 text-zinc-500 cursor-not-allowed'
                    : 'bg-zinc-700 hover:bg-zinc-600 text-zinc-200 hover:text-white'
              } text-sm`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" className="opacity-25"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Analyzing...
              </>
            ) : isBest ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Best Answer
              </>
            ) : (
              'Select as Best'
            )}
          </button>
        </div>
        {isBest !== null && !isLoading && (
          <p className={`text-xs mt-2 text-center ${
            isBest === label ? 'text-green-400' : 'text-zinc-500'
          }`}>
            {isBest === label
              ? '✓ This response was selected as the best'
              : 'Selection locked'}
          </p>
        )}
      </div>
    )
  }
  
  export default AIResponseCard