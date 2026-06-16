import { UserCircle } from 'lucide-react'

const LEADERS = [
  {
    name: 'Steven Bwire',
    role: 'REVEREND',
    bio: 'Leading with vision and prophetic insight for over 15 years.',
    highlight: false,
  },
  {
    name: 'Deaconess Pamela',
    role: 'DEACONESS',
    bio: 'Dedicated to community growth and youth mentorship.',
    highlight: true,
  },
  {
    name: 'Geofrey Abuga',
    role: 'DEACON',
    bio: 'Committed to the administrative excellence of the sanctuary.',
    highlight: false,
  },
]

export default function Leadership() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 text-center">
      <h2 className="font-serif text-3xl font-bold sm:text-4xl">Our Leadership</h2>
      <p className="mt-3 text-ink/60 dark:text-cream/60">Dedicated servants following the call of God.</p>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {LEADERS.map((leader) => (
          <div key={leader.name} className="text-left">
            <div
              className={`flex h-40 items-center justify-center rounded-3xl ${
                leader.highlight
                  ? 'bg-accent/10 dark:bg-accent/20'
                  : 'bg-ink/5 dark:bg-cream/10'
              }`}
            >
              <UserCircle
                size={56}
                className={leader.highlight ? 'text-accent' : 'text-ink/30 dark:text-cream/30'}
              />
            </div>
            <h3 className="mt-4 font-serif text-xl font-bold">{leader.name}</h3>
            <p className="mt-1 text-xs font-bold tracking-[0.2em] text-accent">{leader.role}</p>
            <p className="mt-2 text-sm text-ink/60 dark:text-cream/60">{leader.bio}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
