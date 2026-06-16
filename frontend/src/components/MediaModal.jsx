import { useEffect } from 'react'
import { X, Youtube, Film } from 'lucide-react'

export default function MediaModal({ item, onClose }) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  if (!item) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl rounded-3xl bg-ink overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close btn */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-cream/10 text-cream hover:bg-cream/20 transition-colors"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Player */}
        <div className="aspect-video w-full bg-black">
          {item.source === 'youtube' && item.youtubeId ? (
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1&rel=0`}
              title={item.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : item.source === 'upload' && item.filePath ? (
            <video
              className="h-full w-full"
              controls
              autoPlay
              src={`http://localhost:5000${item.filePath}`}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-cream/30">
              <Film size={48} />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-6 text-cream">
          <div className="flex items-start gap-3">
            {item.source === 'youtube' ? (
              <Youtube size={18} className="mt-0.5 shrink-0 text-red-500" />
            ) : (
              <Film size={18} className="mt-0.5 shrink-0 text-accent" />
            )}
            <div>
              <h2 className="font-serif text-xl font-bold">{item.title}</h2>
              {item.description && (
                <p className="mt-1.5 text-sm text-cream/60">{item.description}</p>
              )}
              <p className="mt-2 text-xs text-cream/40">
                {new Date(item.createdAt).toLocaleDateString('en-KE', {
                  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
