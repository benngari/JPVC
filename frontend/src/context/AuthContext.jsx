import { createContext, useContext, useEffect, useState } from 'react'
import api from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('jpvc-token')
    if (!token) {
      setLoading(false)
      return
    }
    api
      .get('/auth/me')
      .then((res) => setUser(res.data.user))
      .catch(() => {
        localStorage.removeItem('jpvc-token')
        setUser(null)
      })
      .finally(() => setLoading(false))
  }, [])

  const login = async (phone, password) => {
    const res = await api.post('/auth/login', { phone, password })
    localStorage.setItem('jpvc-token', res.data.token)
    setUser(res.data.user)
    return res.data.user
  }

  const register = async (payload) => {
    const res = await api.post('/auth/register', payload)
    localStorage.setItem('jpvc-token', res.data.token)
    setUser(res.data.user)
    return res.data.user
  }

  const logout = () => {
    localStorage.removeItem('jpvc-token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
