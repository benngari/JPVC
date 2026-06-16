import { useEffect, useState } from 'react'
import { Film } from 'lucide-react'
import MediaCard from '../components/MediaCard'
import MediaModal from '../components/MediaModal'
import api from '../services/api'

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'testimony', label: 'Testimonies' },
  { key: 'sermon', label: 'Sermons' },
  { key: 'worship', label: 'Worship' },
  { key: 'announcement', label: 'Announcements' },
]

export default function MediaPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('all')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError('')
    api
      .get('/media', { params: { type: filter, page, limit: 12 } })
      .then((res) => {
        setItems(res.data.items)
        setTotalPages(res.data.pages)
      })
      .catch(() => setError('Could not load media. Please try again.'))
      .finally(() => setLoading(false))
  }, [filter, page])

  const handleFilterChange = (key) => {
    setFilter(key)
    setPage(1)
  }

  return (
    <>
      <section className="mx-auto max-w-6xl px-5 py-16">
        <h1 className="font-serif text-4xl font-bold sm:text-5xl">Testimonies &amp; Media</h1>
        <p className="mt-3 max-w-xl text-ink/60 dark:text-cream/60">
          Watch sermons, testimonies, and worship moments from the JPVC family.
        </p>

        {/* Filter tabs */}
        <div className="mt-8 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => handleFilterChange(f.key)}
              className={`rounded-full px-5 py-2 text-sm font-bold transition-colors ${
                filter === f.key
                  ? 'bg-accent text-white shadow-md shadow-accent/30'
                  : 'bg-ink/5 dark:bg-cream/10 text-ink/60 dark:text-cream/60 hover:bg-ink/10'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-10">
          {loading && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-3xl bg-ink/5 dark:bg-cream/5 overflow-hidden">
                  <div className="aspect-video animate-pulse bg-ink/10 dark:bg-cream/10" />
                  <div className="p-5 space-y-2">
                    <div className="h-3 w-1/4 animate-pulse rounded bg-ink/10 dark:bg-cream/10" />
                    <div className="h-5 w-3/4 animate-pulse rounded bg-ink/10 dark:bg-cream/10" />
                    <div className="h-4 w-full animate-pulse rounded bg-ink/10 dark:bg-cream/10" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && error && (
            <p className="text-center text-red-500">{error}</p>
          )}

          {!loading && !error && items.length === 0 && (
            <div className="flex flex-col items-center py-20 text-center text-ink/40 dark:text-cream/40">
              <Film size={48} className="opacity-30" />
              <p className="mt-4 font-serif text-xl">No media yet.</p>
              <p className="mt-1 text-sm">Check back soon for testimonies and sermons.</p>
            </div>
          )}

          {!loading && items.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <MediaCard key={item._id} item={item} onClick={setSelected} />
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-3">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="rounded-full border border-ink/15 dark:border-cream/15 px-5 py-2 text-sm font-bold disabled:opacity-40"
            >
              Previous
            </button>
            <span className="text-sm text-ink/50 dark:text-cream/50">
              {page} / {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="rounded-full border border-ink/15 dark:border-cream/15 px-5 py-2 text-sm font-bold disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </section>

      {/* Modal */}
      {selected && <MediaModal item={selected} onClose={() => setSelected(null)} />}
    </>
  )
}
