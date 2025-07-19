import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Compare from '../pages/Compare'
import Vote from '../pages/Vote'
import Result from '../pages/Result'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/vote" element={<Vote />} />
        <Route path="/result/:slug" element={<Result />} />
      </Routes>
    </BrowserRouter>
  )
}
