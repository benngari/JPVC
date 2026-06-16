import { useEffect, useState } from 'react'
import { Radio, Calendar, Youtube, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import api from '../services/api'

export default function LiveStreamPage() {
  const [stream, setStream] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
      .get('/livestream')
      .then((res) => setStream(res.data.stream))
      .catch(() => setStream(null))
      .finally(() => setLoading(false))

    // Poll every 60 seconds to auto-detect when stream goes live
    const interval = setInterval(() => {
      api.get('/livestream').then((res) => setStream(res.data.stream)).catch(() => {})
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-accent/20 border-t-accent" />
      </div>
    )
  }

  const isLive = stream?.isLive && stream?.youtubeVideoId

  return (
    <>
      {/* Header */}
      <section className="mx-auto max-w-4xl px-5 py-12 text-center">
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold tracking-[0.2em]
          bg-red-500/10 text-red-600">
          <Radio size={13} className={isLive ? 'animate-pulse' : ''} />
          {isLive ? 'LIVE NOW' : 'LIVE STREAM'}
        </div>
        <h1 className="mt-4 font-serif text-4xl font-bold sm:text-5xl">
          {stream?.title || 'Sunday Service Live'}
        </h1>
        {stream?.description && (
          <p className="mx-auto mt-3 max-w-xl text-ink/60 dark:text-cream/60">
            {stream.description}
          </p>
        )}
        {!isLive && stream?.scheduledFor && (
          <p className="mt-3 flex items-center justify-center gap-2 text-sm text-ink/50 dark:text-cream/50">
            <Calendar size={14} />
            Next stream:{' '}
            {new Date(stream.scheduledFor).toLocaleString('en-KE', {
              weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
              hour: '2-digit', minute: '2-digit',
            })}
          </p>
        )}
      </section>

      {/* Player */}
      <section className="mx-auto max-w-5xl px-5 pb-16">
        {isLive ? (
          <div className="overflow-hidden rounded-3xl shadow-2xl">
            <div className="aspect-video w-full bg-black">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${stream.youtubeVideoId}?autoplay=1&rel=0`}
                title={stream.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            {/* Live info bar */}
            <div className="flex items-center gap-3 bg-ink px-6 py-4">
              <span className="flex items-center gap-2 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">
                <span className="h-2 w-2 animate-pulse rounded-full bg-white" /> LIVE
              </span>
              <span className="text-sm font-semibold text-cream">{stream.title}</span>
              <a
                href={`https://www.youtube.com/watch?v=${stream.youtubeVideoId}`}
                target="_blank"
                rel="noreferrer"
                className="ml-auto flex items-center gap-1.5 text-xs text-cream/50 hover:text-cream transition-colors"
              >
                <Youtube size={14} /> Watch on YouTube
              </a>
            </div>
          </div>
        ) : (
          /* Offline state */
          <div className="rounded-3xl bg-ink text-center p-16">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-cream/10">
              <Radio size={32} className="text-cream/40" />
            </div>
            <h2 className="mt-6 font-serif text-2xl font-bold text-cream">
              No Live Stream at the Moment
            </h2>
            <p className="mt-3 text-cream/60">
              We broadcast our Sunday Service, Wednesday Prayer, and special events live on YouTube.
            </p>
            {stream?.scheduledFor && (
              <p className="mt-4 text-sm font-semibold text-accent">
                Next stream:{' '}
                {new Date(stream.scheduledFor).toLocaleString('en-KE', {
                  weekday: 'long', month: 'long', day: 'numeric',
                  hour: '2-digit', minute: '2-digit',
                })}
              </p>
            )}
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                href="https://www.youtube.com/@jesuspropheticvisionchurch"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full bg-red-600 px-6 py-3 font-bold text-white"
              >
                <Youtube size={18} /> Subscribe on YouTube
              </a>
              <Link
                to="/media"
                className="flex items-center gap-2 rounded-full border border-cream/20 px-6 py-3 font-bold text-cream hover:bg-cream/10"
              >
                Watch Past Sermons <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        )}
      </section>
    </>
  )
}
