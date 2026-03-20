import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import GetStarted from './components/GetStarted'
import Search from './pages/Search'
import Browse from './pages/Browse'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<GetStarted />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
