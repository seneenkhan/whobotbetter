// import { useState } from 'react'
// import AIResponseCard from '../components/AiResponseCard'

// const Vote = () => {
//   const [votedFor, setVotedFor] = useState(null)

//   const responses = [
//     { label: 'A', response: 'This is response from Model A (e.g., GPT)' },
//     { label: 'B', response: 'This is response from Model B (e.g., Claude)' },
//   ]

//   const handleVote = (label) => {
//     setVotedFor(label)
//   }

//   return (
//     <div className="p-6 space-y-6 max-w-3xl mx-auto">
//       <h2 className="text-xl font-semibold mb-4 text-white">Vote: Which response is better?</h2>

//       <div className="grid md:grid-cols-2 gap-6">
//         {responses.map((r) => (
//           <div key={r.label} className="bg-gray-900 p-4 rounded-lg border border-gray-700 shadow-sm">
//             <AIResponseCard label={`Model ${r.label}`} response={r.response} />

//             <button
//               onClick={() => handleVote(r.label)}
//               disabled={!!votedFor}
//               className={`mt-4 w-full py-2 rounded-lg font-semibold ${
//                 votedFor === r.label
//                   ? 'bg-green-600 text-white'
//                   : 'bg-gray-700 hover:bg-gray-600 text-white'
//               }`}
//             >
//               {votedFor === r.label ? '✅ Voted' : 'Vote for this'}
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default Vote
