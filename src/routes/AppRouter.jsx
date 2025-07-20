import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Compare from '../pages/Compare'
import Home from '../pages/Home' // or a placeholder if it's empty

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/compare" element={<Compare />} />
      </Routes>
    </Router>
  )
}

export default AppRouter
