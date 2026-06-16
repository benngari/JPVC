import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, Navigation, Sun, Clock, Users } from 'lucide-react'
import ValueCards from '../components/ValueCards'
import Leadership from '../components/Leadership'

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[80vh] items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink/80 to-accent/40" />
        <div
          className="absolute inset-0 opacity-40 mix-blend-overlay"
          style={{
            backgroundImage:
              'radial-gradient(circle at 30% 20%, rgba(232,98,44,0.5), transparent 50%), radial-gradient(circle at 80% 80%, rgba(0,0,0,0.6), transparent 50%)',
          }}
        />
        <div className="relative mx-auto max-w-4xl px-5 py-24 text-center text-cream">
          <h1 className="font-serif text-5xl font-extrabold leading-tight sm:text-7xl">
            Hope, Faith,
            <br />
            and Freedom.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-cream/80">
            Experience God together in a community rooted in the principle commandments of love.
          </p>
          <Link
            to="/about"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-accent/30 transition-transform hover:-translate-y-0.5 hover:bg-accent/90"
          >
            New Here? <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Quick info bar */}
      <section className="mx-auto -mt-10 max-w-5xl px-5">
        <div className="grid gap-6 rounded-3xl bg-white dark:bg-[#1F1A16] p-8 shadow-xl sm:grid-cols-3">
          <InfoItem icon={<Sun size={20} />} label="Sunday Service" value="9:00 AM - 5:00 PM" />
          <InfoItem icon={<MapPin size={20} />} label="Our Location" value="Kabiria, Nairobi" />
          <InfoItem icon={<Users size={20} />} label="Huduma" value="Thursday Sessions" />
        </div>
      </section>

      <ValueCards />
      <Leadership />

      {/* Schedule */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="text-center">
          <p className="text-xs font-bold tracking-[0.3em] text-accent">OUR GATHERINGS</p>
          <h2 className="mt-3 font-serif text-3xl font-bold sm:text-4xl">Weekly Service Schedule</h2>
          <p className="mx-auto mt-3 max-w-xl text-ink/60 dark:text-cream/60">
            Join us throughout the week as we seek God's presence through prayer, study, and prophetic
            fellowship.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          <ScheduleCard
            icon={<Sun size={20} />}
            title="Sunday: Main Church Service"
            time="9:00 AM - 5:00 PM"
            note="Doors open at 6:00 AM for early morning devotion"
            desc="A full day of powerful worship, prophetic word, and community fellowship."
          />
          <ScheduleCard
            icon={<Clock size={20} />}
            title="Wednesday: Prayer and Fasting"
            time="9:00 AM - 6:00 PM"
            note="Mid-week spiritual recharge"
            desc="Seeking the face of God through collective fasting and intensive prayer sessions."
          />
          <ScheduleCard
            icon={<Users size={20} />}
            title="Thursday: Huduma Session"
            time="9:00 AM - 5:00 PM"
            desc="A dedicated time of service and outreach to the Kabiria community."
          />
          <ScheduleCard
            icon={<Clock size={20} />}
            title="2nd Friday: Kesha (Overnight)"
            time="6:00 PM - 6:00 AM"
            desc="An overnight vigil of worship, prayer, and prophetic ministry."
          />
        </div>
      </section>

      {/* Location */}
      <section className="mx-auto max-w-6xl px-5 py-10">
        <div className="rounded-3xl bg-white dark:bg-[#1F1A16] p-8 shadow-md sm:p-10">
          <p className="text-xs font-bold tracking-[0.3em] text-accent">FIND US</p>
          <h2 className="mt-3 font-serif text-3xl font-bold sm:text-4xl">Visit Our Sanctuary</h2>
          <p className="mt-3 max-w-2xl text-ink/60 dark:text-cream/60">
            Jesus Prophetic Vision Church is located in Kabiria, Nairobi, near{' '}
            <span className="font-bold text-ink dark:text-cream">Royal Studios Kabiria</span>.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="flex items-start gap-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ink/5 dark:bg-cream/10">
                <MapPin size={18} />
              </div>
              <div>
                <p className="font-bold">Location</p>
                <p className="text-sm text-ink/60 dark:text-cream/60">Kabiria, Nairobi</p>
                <p className="text-sm text-ink/60 dark:text-cream/60">Near Royal Studios</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ink/5 dark:bg-cream/10">
                <Navigation size={18} />
              </div>
              <div>
                <p className="font-bold">Getting Here</p>
                <p className="text-sm text-ink/60 dark:text-cream/60">
                  Located in the Kabiria area, just a short distance from Royal Studios Kabiria.
                </p>
              </div>
            </div>
          </div>

          <a
            href="https://www.google.com/maps/search/?api=1&query=Royal+Studios+Kabiria+Nairobi"
            target="_blank"
            rel="noreferrer"
            className="mt-8 flex items-center justify-center gap-2 rounded-full bg-ink dark:bg-cream py-4 font-bold text-cream dark:text-ink"
          >
            Open in Google Maps <Navigation size={16} />
          </a>

          <div className="mt-6 overflow-hidden rounded-2xl border border-ink/10 dark:border-cream/10">
            <iframe
              title="Church location map"
              className="h-80 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://maps.google.com/maps?q=Royal%20Studios%20Kabiria%2C%20Nairobi&z=15&output=embed"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="rounded-3xl bg-ink p-10 text-center text-cream sm:p-16">
          <h2 className="font-serif text-3xl font-bold sm:text-5xl">Support Our Mission</h2>
          <p className="mx-auto mt-4 max-w-xl text-cream/70">
            Your generosity helps us reach our community and share the love of Christ with those in
            need. Every gift makes a difference.
          </p>
          <Link
            to="/give"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 font-bold text-white shadow-lg shadow-accent/30 hover:bg-accent/90 transition-colors"
          >
            Give Generously
          </Link>
        </div>
      </section>
    </>
  )
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4">
      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent/10 text-accent">
        {icon}
      </div>
      <div>
        <p className="text-xs font-bold tracking-[0.15em] text-ink/40 dark:text-cream/40">
          {label.toUpperCase()}
        </p>
        <p className="font-bold">{value}</p>
      </div>
    </div>
  )
}

function ScheduleCard({ icon, title, time, note, desc }) {
  return (
    <div className="rounded-3xl bg-white dark:bg-[#1F1A16] p-7 shadow-sm">
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-accent/10 text-accent">
        {icon}
      </div>
      <h3 className="mt-5 font-serif text-xl font-bold">{title}</h3>
      <p className="mt-2 flex items-center gap-1.5 text-sm font-bold text-accent">
        <Clock size={14} /> {time}
      </p>
      {note && <p className="mt-1 text-sm italic text-ink/50 dark:text-cream/50">{note}</p>}
      <p className="mt-3 text-sm text-ink/60 dark:text-cream/60">{desc}</p>
    </div>
  )
}
