import { BookOpen, HeartHandshake, Sparkles } from 'lucide-react'
import Leadership from '../components/Leadership'

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[55vh] items-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-cream dark:to-[#15120F]" />
        <div
          className="absolute inset-0 bg-ink"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 30%, rgba(232,98,44,0.25), transparent 55%)',
          }}
        />
        <div className="relative mx-auto max-w-4xl px-5 pb-16 text-cream">
          <p className="text-xs font-bold tracking-[0.3em] text-accent">OUR JOURNEY</p>
          <h1 className="mt-3 font-serif text-5xl font-extrabold italic sm:text-7xl">
            About Our Church
          </h1>
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-4xl px-5 py-16">
        <div className="rounded-3xl bg-white dark:bg-[#1F1A16] p-8 shadow-md sm:p-12">
          <p className="text-xs font-bold tracking-[0.3em] text-accent">THE MISSION</p>
          <p className="mt-4 font-serif text-2xl font-bold italic leading-relaxed sm:text-4xl">
            "To experience hope, faith, freedom and God together"
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-4xl px-5 py-10">
        <div className="grid gap-8 sm:grid-cols-3">
          <StoryCard
            icon={<BookOpen size={22} />}
            title="The Word"
            desc="Rooted in scripture, our teaching centers on the prophetic word of God applied to everyday life."
          />
          <StoryCard
            icon={<HeartHandshake size={22} />}
            title="The Family"
            desc="A close-knit community in Kabiria where every member is known, supported, and discipled."
          />
          <StoryCard
            icon={<Sparkles size={22} />}
            title="The Vision"
            desc="A church planted to bring hope, freedom, and prophetic clarity to Nairobi and beyond."
          />
        </div>
      </section>

      <Leadership />

      {/* History narrative */}
      <section className="mx-auto max-w-4xl px-5 py-16">
        <h2 className="font-serif text-3xl font-bold sm:text-4xl">Our Story</h2>
        <div className="mt-6 space-y-4 text-ink/70 dark:text-cream/70 leading-relaxed">
          <p>
            Jesus Prophetic Vision Church was founded with a simple call: to create a place where
            people could encounter God's presence, hear His prophetic voice, and walk in freedom from
            the things that hold them back.
          </p>
          <p>
            Based in Kabiria, Nairobi, our community gathers throughout the week for worship, prayer,
            fasting, and outreach. What began as a small fellowship has grown into a family of
            believers committed to faith, love, community, prophecy, hope, and service.
          </p>
          <p>
            We believe every person who walks through our doors &mdash; whether for the first time or
            the hundredth &mdash; is part of God's bigger story of hope, faith, and freedom.
          </p>
        </div>
      </section>
    </>
  )
}

function StoryCard({ icon, title, desc }) {
  return (
    <div className="rounded-3xl bg-white dark:bg-[#1F1A16] p-6 shadow-sm">
      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-accent/10 text-accent">
        {icon}
      </div>
      <h3 className="mt-4 font-serif text-lg font-bold">{title}</h3>
      <p className="mt-2 text-sm text-ink/60 dark:text-cream/60">{desc}</p>
    </div>
  )
}
