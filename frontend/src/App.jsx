import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'

import Home from './pages/Home'
import About from './pages/About'
import Give from './pages/Give'
import Companion from './pages/Companion'
import Media from './pages/Media'
import LiveStream from './pages/LiveStream'
import Login from './pages/Login'
import Register from './pages/Register'
import Portal from './pages/Portal'
import Admin from './pages/Admin'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-cream dark:bg-[#15120F] text-ink dark:text-cream transition-colors">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/give" element={<Give />} />
          <Route path="/companion" element={<Companion />} />
          <Route path="/media" element={<Media />} />
          <Route path="/live" element={<LiveStream />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route
            path="/portal"
            element={<ProtectedRoute><Portal /></ProtectedRoute>}
          />
          <Route
            path="/admin"
            element={<ProtectedRoute><Admin /></ProtectedRoute>}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
