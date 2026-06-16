import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserPlus, Smartphone, Lock, User as UserIcon } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { ShieldLogo } from '../components/Navbar'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', phone: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await register(form)
      navigate('/portal')
    } catch (err) {
      setError(err.response?.data?.message || 'Could not create your account.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-5 py-16">
      <ShieldLogo className="h-12 w-12" />
      <h1 className="mt-4 font-serif text-3xl font-bold">Create Account</h1>
      <p className="mt-2 text-center text-sm text-ink/60 dark:text-cream/60">
        Join the JPVC member portal.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 w-full space-y-4">
        <Field icon={<UserIcon size={18} />} label="FULL NAME">
          <input
            type="text"
            required
            placeholder="Jane Wanjiru"
            value={form.name}
            onChange={update('name')}
            className="w-full bg-transparent font-semibold outline-none placeholder:text-ink/20 dark:placeholder:text-cream/20"
          />
        </Field>

        <Field icon={<Smartphone size={18} />} label="PHONE NUMBER">
          <input
            type="tel"
            required
            placeholder="07XXXXXXXX"
            value={form.phone}
            onChange={update('phone')}
            className="w-full bg-transparent font-semibold outline-none placeholder:text-ink/20 dark:placeholder:text-cream/20"
          />
        </Field>

        <Field icon={<Lock size={18} />} label="PASSWORD">
          <input
            type="password"
            required
            minLength={6}
            placeholder="At least 6 characters"
            value={form.password}
            onChange={update('password')}
            className="w-full bg-transparent font-semibold outline-none placeholder:text-ink/20 dark:placeholder:text-cream/20"
          />
        </Field>

        {error && <p className="text-center text-sm font-semibold text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-accent py-4 font-bold text-white shadow-lg shadow-accent/30 disabled:opacity-60"
        >
          {loading ? 'Creating account...' : 'Create Account'} <UserPlus size={18} />
        </button>
      </form>

      <p className="mt-6 text-sm text-ink/60 dark:text-cream/60">
        Already have an account?{' '}
        <Link to="/login" className="font-bold text-accent hover:underline">
          Sign in
        </Link>
      </p>
    </section>
  )
}

function Field({ icon, label, children }) {
  return (
    <div>
      <label className="text-xs font-bold tracking-[0.2em] text-ink/40 dark:text-cream/40">{label}</label>
      <div className="mt-2 flex items-center gap-3 rounded-2xl bg-ink/5 dark:bg-cream/10 px-5 py-4">
        <span className="text-ink/30 dark:text-cream/30">{icon}</span>
        {children}
      </div>
    </div>
  )
}
