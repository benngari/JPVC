import { useEffect, useState } from 'react'
import { LogOut, Heart, BookOpen, Calendar, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

export default function Portal() {
  const { user, logout } = useAuth()
  const [gifts, setGifts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
      .get('/giving/history')
      .then((res) => setGifts(res.data.gifts || []))
      .catch(() => setGifts([]))
      .finally(() => setLoading(false))
  }, [])

  const totalGiven = gifts.reduce((sum, g) => sum + g.amount, 0)

  return (
    <section className="mx-auto max-w-5xl px-5 py-16">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold tracking-[0.3em] text-accent">MEMBER PORTAL</p>
          <h1 className="mt-2 font-serif text-4xl font-bold">Welcome, {user?.name?.split(' ')[0]}</h1>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 rounded-full border border-ink/15 dark:border-cream/15 px-5 py-2.5 text-sm font-bold text-ink/70 dark:text-cream/70 hover:bg-ink/5 dark:hover:bg-cream/5"
        >
          <LogOut size={16} /> Sign Out
        </button>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        <StatCard
          icon={<User size={20} />}
          label="Account"
          value={user?.phone}
          sub="Phone number"
        />
        <StatCard
          icon={<Heart size={20} />}
          label="Total Given"
          value={`KES ${totalGiven.toLocaleString()}`}
          sub={`${gifts.length} contribution${gifts.length === 1 ? '' : 's'}`}
        />
        <StatCard
          icon={<Calendar size={20} />}
          label="Member Since"
          value={user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}
          sub="Account created"
        />
      </div>

      <div className="mt-12">
        <h2 className="font-serif text-2xl font-bold">Giving History</h2>
        {loading && (
          <div className="mt-4 space-y-3">
            <div className="h-14 w-full animate-pulse rounded-2xl bg-ink/5 dark:bg-cream/10" />
            <div className="h-14 w-full animate-pulse rounded-2xl bg-ink/5 dark:bg-cream/10" />
          </div>
        )}
        {!loading && gifts.length === 0 && (
          <div className="mt-4 rounded-3xl border border-dashed border-ink/15 dark:border-cream/15 p-10 text-center text-ink/50 dark:text-cream/50">
            <Heart size={28} className="mx-auto text-accent/40" />
            <p className="mt-3">No gifts recorded yet. Visit the Give page to make your first contribution.</p>
          </div>
        )}
        {!loading && gifts.length > 0 && (
          <div className="mt-4 divide-y divide-ink/10 dark:divide-cream/10 rounded-3xl bg-white dark:bg-[#1F1A16] shadow-sm">
            {gifts.map((g) => (
              <div key={g._id || g.id} className="flex items-center justify-between px-6 py-4">
                <div>
                  <p className="font-bold">KES {g.amount.toLocaleString()}</p>
                  <p className="text-xs text-ink/40 dark:text-cream/40">
                    {new Date(g.createdAt).toLocaleString()}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${
                    g.status === 'completed'
                      ? 'bg-green-500/10 text-green-600'
                      : g.status === 'failed'
                      ? 'bg-red-500/10 text-red-500'
                      : 'bg-amber-500/10 text-amber-600'
                  }`}
                >
                  {g.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-12 rounded-3xl bg-accent/10 p-8 text-center">
        <BookOpen size={28} className="mx-auto text-accent" />
        <p className="mt-3 font-serif text-xl font-bold">Continue growing in the Word</p>
        <p className="mt-1 text-sm text-ink/60 dark:text-cream/60">
          Visit the Spiritual Companion for your daily devotion and Bible trivia.
        </p>
      </div>
    </section>
  )
}

function StatCard({ icon, label, value, sub }) {
  return (
    <div className="rounded-3xl bg-white dark:bg-[#1F1A16] p-6 shadow-sm">
      <div className="grid h-10 w-10 place-items-center rounded-2xl bg-accent/10 text-accent">{icon}</div>
      <p className="mt-4 text-xs font-bold tracking-[0.2em] text-ink/40 dark:text-cream/40">
        {label.toUpperCase()}
      </p>
      <p className="mt-1 font-serif text-2xl font-bold">{value}</p>
      <p className="mt-1 text-xs text-ink/40 dark:text-cream/40">{sub}</p>
    </div>
  )
}
