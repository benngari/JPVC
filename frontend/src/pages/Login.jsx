import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogIn, Smartphone, Lock } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { ShieldLogo } from '../components/Navbar'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(phone, password)
      navigate('/portal')
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid phone number or password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-5 py-16">
      <ShieldLogo className="h-12 w-12" />
      <h1 className="mt-4 font-serif text-3xl font-bold">Portal Login</h1>
      <p className="mt-2 text-center text-sm text-ink/60 dark:text-cream/60">
        Join our digital sanctuary.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 w-full space-y-4">
        <div>
          <label className="text-xs font-bold tracking-[0.2em] text-ink/40 dark:text-cream/40">
            PHONE NUMBER
          </label>
          <div className="mt-2 flex items-center gap-3 rounded-2xl bg-ink/5 dark:bg-cream/10 px-5 py-4">
            <Smartphone size={18} className="text-ink/30 dark:text-cream/30" />
            <input
              type="tel"
              required
              placeholder="07XXXXXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-transparent font-semibold outline-none placeholder:text-ink/20 dark:placeholder:text-cream/20"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold tracking-[0.2em] text-ink/40 dark:text-cream/40">
            PASSWORD
          </label>
          <div className="mt-2 flex items-center gap-3 rounded-2xl bg-ink/5 dark:bg-cream/10 px-5 py-4">
            <Lock size={18} className="text-ink/30 dark:text-cream/30" />
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent font-semibold outline-none placeholder:text-ink/20 dark:placeholder:text-cream/20"
            />
          </div>
        </div>

        {error && <p className="text-center text-sm font-semibold text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-ink dark:bg-cream py-4 font-bold text-cream dark:text-ink disabled:opacity-60"
        >
          {loading ? 'Signing in...' : 'Sign In'} <LogIn size={18} />
        </button>
      </form>

      <p className="mt-6 text-sm text-ink/60 dark:text-cream/60">
        New here?{' '}
        <Link to="/register" className="font-bold text-accent hover:underline">
          Create an account
        </Link>
      </p>
    </section>
  )
}
