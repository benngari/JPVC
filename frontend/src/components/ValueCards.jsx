import { Shield, Heart, Users, Compass, Anchor, BookOpen } from 'lucide-react'

const VALUES = [
  {
    icon: Shield,
    title: 'Faith',
    desc: 'Standing firm in the prophetic word of God.',
    gradient: 'from-blue-600 to-cyan-400',
  },
  {
    icon: Heart,
    title: 'Love',
    desc: 'Loving God and our neighbors as ourselves.',
    gradient: 'from-rose-600 to-pink-400',
  },
  {
    icon: Users,
    title: 'Community',
    desc: 'Building a family where everyone belongs.',
    gradient: 'from-amber-500 to-yellow-400',
  },
  {
    icon: Compass,
    title: 'Prophecy',
    desc: 'Seeking divine guidance for modern living.',
    gradient: 'from-violet-600 to-purple-400',
  },
  {
    icon: Anchor,
    title: 'Hope',
    desc: 'Anchoring our souls in the promises of Christ.',
    gradient: 'from-emerald-500 to-teal-400',
  },
  {
    icon: BookOpen,
    title: 'Service',
    desc: 'Sharing our blessings with the Kabiria community.',
    gradient: 'from-indigo-600 to-blue-400',
  },
]

export default function ValueCards() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <h2 className="text-center font-serif text-3xl font-bold sm:text-4xl">What We Stand For</h2>
      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {VALUES.map(({ icon: Icon, title, desc, gradient }) => (
          <div
            key={title}
            className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${gradient} p-7 text-white shadow-lg transition-transform hover:-translate-y-1`}
          >
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/20 backdrop-blur">
              <Icon size={22} />
            </div>
            <h3 className="mt-5 font-serif text-2xl font-bold">{title}</h3>
            <p className="mt-2 max-w-xs text-sm text-white/90">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
