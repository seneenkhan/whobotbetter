const AIResponseCard = ({ label, response }) => {
    return (
      <div className="p-4 bg-gray-900 rounded-lg border border-gray-700 shadow-sm">
        <h2 className="text-lg font-semibold mb-2">{label}</h2>
        <p className="text-sm text-gray-200 whitespace-pre-wrap">{response}</p>
      </div>
    )
  }
  
  export default AIResponseCard
  