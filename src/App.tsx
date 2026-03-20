import './App.css'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import GetStarted from './components/GetStarted'
import Search from './pages/Search'
import Browse from './pages/Browse'

function AppContent() {
  const location = useLocation();
  const isLoggedIn = location.pathname === "/browse" || location.pathname === "/search";

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<GetStarted />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/search" element={<Search />} />
      </Routes>
      {isLoggedIn && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
