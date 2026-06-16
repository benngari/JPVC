import { Sparkles } from 'lucide-react'
import DailyDevotion from '../components/DailyDevotion'
import BibleTrivia from '../components/BibleTrivia'
import SpiritualChat from '../components/SpiritualChat'

export default function Companion() {
  return (
    <>
      <section className="mx-auto max-w-4xl px-5 py-16 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-accent">
          <Sparkles size={14} /> AI-POWERED SUPPORT
        </span>
        <h1 className="mt-5 font-serif text-4xl font-bold sm:text-6xl">Spiritual Companion</h1>
        <p className="mx-auto mt-4 max-w-xl text-ink/60 dark:text-cream/60">
          Explore the wisdom of the Word, find daily encouragement, and test your biblical knowledge
          with our companion.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-10">
        <div className="grid gap-6 lg:grid-cols-2">
          <DailyDevotion />
          <BibleTrivia />
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-12">
        <SpiritualChat />
      </section>
    </>
  )
}
