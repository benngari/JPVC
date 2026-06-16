import { useEffect, useState } from 'react'
import { BookOpen, RefreshCw } from 'lucide-react'
import api from '../services/api'

export default function DailyDevotion() {
  const [devotion, setDevotion] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchDevotion = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await api.get('/ai/devotion')
      setDevotion(res.data.devotion)
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load today\'s devotion.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDevotion()
  }, [])

  return (
    <div className="flex h-full flex-col rounded-3xl bg-white dark:bg-[#1F1A16] p-7 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-accent/10 text-accent">
            <BookOpen size={20} />
          </div>
          <h3 className="font-serif text-xl font-bold">Daily Devotion</h3>
        </div>
        <button
          onClick={fetchDevotion}
          disabled={loading}
          className="grid h-9 w-9 place-items-center rounded-full bg-ink/5 dark:bg-cream/10 text-ink/50 dark:text-cream/50 hover:text-accent transition-colors"
          aria-label="Refresh devotion"
        >
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      <div className="mt-6 flex-1">
        {loading && (
          <div className="space-y-3">
            <div className="h-4 w-1/3 animate-pulse rounded bg-ink/10 dark:bg-cream/10" />
            <div className="h-4 w-full animate-pulse rounded bg-ink/10 dark:bg-cream/10" />
            <div className="h-4 w-full animate-pulse rounded bg-ink/10 dark:bg-cream/10" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-ink/10 dark:bg-cream/10" />
          </div>
        )}

        {!loading && error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        {!loading && devotion && (
          <>
            <p className="text-xs font-bold tracking-[0.2em] text-accent">{devotion.reference}</p>
            <blockquote className="mt-3 font-serif text-lg italic leading-relaxed">
              "{devotion.verse}"
            </blockquote>
            <h4 className="mt-5 font-serif text-lg font-bold">{devotion.title}</h4>
            <p className="mt-2 text-sm leading-relaxed text-ink/70 dark:text-cream/70">
              {devotion.reflection}
            </p>
            <p className="mt-4 rounded-2xl bg-accent/10 p-4 text-sm font-semibold text-accent">
              {devotion.prayer}
            </p>
          </>
        )}
      </div>
    </div>
  )
}
