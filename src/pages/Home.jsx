import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-[#0aff7b0d] to-black text-white px-6 py-12 flex items-center justify-center overflow-hidden">
      <div className="absolute top-10 left-0 w-60 h-60 bg-green-300/10 blur-3xl rounded-full animate-pulse -z-10" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-green-400/10 blur-2xl rounded-full animate-ping -z-10" />
      <div className="hidden lg:block absolute left-10 top-1/2 transform -translate-y-1/2 w-48 h-48 bg-green-400/10 blur-xl rounded-xl rotate-12 animate-pulse" />
      <div className="hidden lg:block absolute right-10 top-1/3 w-56 h-56 bg-green-500/10 blur-xl rounded-xl -rotate-12 animate-pulse" />
      <div className="relative z-10 max-w-5xl w-full mx-auto flex flex-col items-center text-center animate-fade-in-up">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-white drop-shadow-lg tracking-tight animate-bounce-slow">
          WhoBotBetter? <span className="text-green-400 animate-pulse">⚔️</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mb-8 leading-relaxed">
          Three AIs. One question. <span className="text-white font-semibold">You decide who slays the hardest.</span>
        </p>
        <div className="bg-white/5 border border-green-300/20 rounded-2xl p-4 mb-6 max-w-md shadow-md backdrop-blur-md animate-fade-in-up delay-200">
          <p className="text-green-300 font-semibold text-sm">
            ⚠️ One vote per match. Choose wisely.
          </p>
        </div>
        <button
          onClick={() => navigate('/compare')}
          className="bg-green-400 text-black font-semibold py-3 px-8 rounded-full hover:bg-white hover:text-black transition-all shadow-xl hover:shadow-green-400/30 mb-4 text-base sm:text-lg animate-pulse-fast"
        >
          Start Battle Now ⚡
        </button>
        <p className="text-gray-500 text-xs mt-10 text-center">
          [Disclaimer: Side effects may include laughter, confusion, and existential dread.]
        </p>
      </div>
    </div>
  );
};

export default Home;
