const PromptInput = ({ prompt, setPrompt, onSubmit, isLoading }) => {
    return (
      <form onSubmit={onSubmit} className="w-full max-w-3xl mx-auto">
        <div className="flex gap-2 bg-gray-800/70 backdrop-blur-sm p-1 rounded-xl border border-gray-700">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your challenge..."
            className="flex-1 p-4 bg-transparent text-white rounded-lg focus:outline-none placeholder-gray-400 text-lg"
          />
          
          <button
            type="submit"
            disabled={isLoading}
            className={`px-8 py-4 rounded-lg font-medium transition-all duration-200
              ${isLoading 
                ? 'bg-gray-700 text-gray-400' 
                : `bg-[#247e06] text-white 
                   hover:bg-[#4dff3db5] 
                   active:scale-95 
                   hover:shadow-[0_0_20px_-5px_#FF5F7E]`}
              relative overflow-hidden group`}
          >
            {!isLoading && (
              <span className="absolute inset-0 bg-[#75ee5aca] opacity-0 group-hover:opacity-30 rounded-lg animate-pulse"></span>
            )}
            
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Battle Loading...
                </span>
              ) : (
                <>
                  <span className="group-hover:animate-bounce">⚔️</span>
                  <span className="font-bold tracking-tight">BATTLE</span>
                </>
              )}
            </span>
          </button>
        </div>
      </form>
    )
  }
  
  export default PromptInput