import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import BrandPage from './pages/BrandPage'
import DrinkPage from './pages/DrinkPage'
import Browse from './pages/Browse'
import TopRated from './pages/TopRated'
import Auth from './pages/Auth'
import { ThemeProvider, useTheme } from './lib/ThemeContext'
import { AuthProvider } from './lib/AuthContext'

function AppInner() {
  const { isDark } = useTheme()
  return (
    <div className={`min-h-screen flex flex-col ${isDark ? 'bg-gray-950 text-white' : 'bg-white text-gray-900'}`}>
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/brand/:slug" element={<BrandPage />} />
          <Route path="/drink/:id" element={<DrinkPage />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/top-rated" element={<TopRated />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <AppInner />
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App