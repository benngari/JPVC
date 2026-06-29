import { UserCircle } from 'lucide-react'

const LEADERS = [
  {
    name: 'Steven Bwire',
    role: 'REVEREND',
    bio: 'Leading with vision and prophetic insight for over 15 years.',
    photo: '',
  },
  {
    name: 'Deaconess Pamela',
    role: 'DEACONESS',
    bio: 'Dedicated to community growth and youth mentorship.',
    photo: '',
  },
  {
    name: 'Geofrey Abuga',
    role: 'DEACON',
    bio: 'Committed to the administrative excellence of the sanctuary.',
    photo: '',
  },
  {
    name: 'Leader Four',
    role: 'ELDER',
    bio: 'Serving the congregation with wisdom and dedication.',
    photo: '',
  },
  {
    name: 'Leader Five',
    role: 'ELDER',
    bio: 'Committed to prayer, worship, and community outreach.',
    photo: '',
  },
  {
    name: 'Leader Six',
    role: 'MINISTER',
    bio: 'Sharing the gospel and serving the Kabiria community.',
    photo: '',
  },
]

export default function Leadership() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 text-center">
      <h2 className="font-serif text-3xl font-bold sm:text-4xl">Our Leadership</h2>
      <p className="mt-3 text-ink/60 dark:text-cream/60">
        Dedicated servants following the call of God.
      </p>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {LEADERS.map((leader, i) => (
          <div key={leader.name} className="text-left group">
            {/* Photo */}
            <div className="relative overflow-hidden rounded-3xl bg-ink/5 dark:bg-cream/10 aspect-[4/3]">
              {leader.photo ? (
                <img
                  src={leader.photo}
                  alt={leader.name}
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className={`flex h-full items-center justify-center ${
                  i === 1 ? 'bg-accent/10 dark:bg-accent/20' : 'bg-ink/5 dark:bg-cream/10'
                }`}>
                  <UserCircle
                    size={72}
                    className={i === 1 ? 'text-accent' : 'text-ink/20 dark:text-cream/20'}
                  />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="mt-4 px-1">
              <h3 className="font-serif text-xl font-bold">{leader.name}</h3>
              <p className="mt-1 text-xs font-bold tracking-[0.2em] text-accent">{leader.role}</p>
              <p className="mt-2 text-sm text-ink/60 dark:text-cream/60">{leader.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
