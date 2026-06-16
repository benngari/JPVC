import { useState } from 'react'
import { Play, Eye, Youtube, Film } from 'lucide-react'

const TYPE_LABELS = {
  testimony: 'Testimony',
  sermon: 'Sermon',
  worship: 'Worship',
  announcement: 'Announcement',
  other: 'Media',
}

const TYPE_COLORS = {
  testimony: 'bg-accent/10 text-accent',
  sermon: 'bg-blue-500/10 text-blue-600',
  worship: 'bg-purple-500/10 text-purple-600',
  announcement: 'bg-amber-500/10 text-amber-600',
  other: 'bg-ink/10 text-ink/60',
}

export default function MediaCard({ item, onClick }) {
  const [imgError, setImgError] = useState(false)
  const thumbSrc =
    item.source === 'youtube' && item.youtubeId
      ? `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`
      : item.thumbnail
        ? `http://localhost:5000${item.thumbnail}`
        : null

  return (
    <div
      onClick={() => onClick(item)}
      className="group cursor-pointer overflow-hidden rounded-3xl bg-white dark:bg-[#1F1A16] shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-ink/5 dark:bg-cream/5 overflow-hidden">
        {thumbSrc && !imgError ? (
          <img
            src={thumbSrc}
            alt={item.title}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Film size={36} className="text-ink/20 dark:text-cream/20" />
          </div>
        )}
        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-ink/30">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-white shadow-xl">
            <Play size={20} className="text-accent ml-1" fill="currentColor" />
          </div>
        </div>
        {/* Source badge */}
        <div className="absolute top-3 right-3">
          {item.source === 'youtube' ? (
            <span className="flex items-center gap-1 rounded-full bg-red-600 px-2.5 py-1 text-[10px] font-bold text-white">
              <Youtube size={10} /> YouTube
            </span>
          ) : (
            <span className="flex items-center gap-1 rounded-full bg-ink/60 px-2.5 py-1 text-[10px] font-bold text-white">
              <Film size={10} /> Video
            </span>
          )}
        </div>
        {item.featured && (
          <div className="absolute top-3 left-3">
            <span className="rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold text-white">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${TYPE_COLORS[item.type] || TYPE_COLORS.other}`}>
          {TYPE_LABELS[item.type] || 'Media'}
        </span>
        <h3 className="mt-2 font-serif text-lg font-bold leading-snug line-clamp-2">{item.title}</h3>
        {item.description && (
          <p className="mt-1.5 text-sm text-ink/50 dark:text-cream/50 line-clamp-2">
            {item.description}
          </p>
        )}
        <div className="mt-3 flex items-center gap-3 text-xs text-ink/40 dark:text-cream/40">
          <span className="flex items-center gap-1">
            <Eye size={12} /> {item.views} views
          </span>
          <span>{new Date(item.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  )
}
