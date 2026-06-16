import { useEffect, useRef, useState } from 'react'
import { Upload, Youtube, Radio, Trash2, Star, Eye, EyeOff, ToggleLeft, ToggleRight, Plus } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

export default function Admin() {
  const { user } = useAuth()
  const navigate = useNavigate()

  // Redirect non-admins
  useEffect(() => {
    if (user && user.role !== 'admin') navigate('/')
  }, [user, navigate])

  const [tab, setTab] = useState('media') // 'media' | 'live'

  return (
    <section className="mx-auto max-w-5xl px-5 py-16">
      <h1 className="font-serif text-4xl font-bold">Admin Panel</h1>
      <p className="mt-1 text-ink/50 dark:text-cream/50">Manage media uploads and live stream.</p>

      {/* Tabs */}
      <div className="mt-8 flex gap-3">
        <TabBtn active={tab === 'media'} onClick={() => setTab('media')}>
          Media &amp; Testimonies
        </TabBtn>
        <TabBtn active={tab === 'live'} onClick={() => setTab('live')}>
          Live Stream
        </TabBtn>
      </div>

      <div className="mt-8">
        {tab === 'media' && <MediaManager />}
        {tab === 'live' && <LiveStreamManager />}
      </div>
    </section>
  )
}

/* ────────────────────────── Media Manager ────────────────────────── */
function MediaManager() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  const fetchMedia = () => {
    setLoading(true)
    api
      .get('/media', { params: { limit: 50 } })
      .then((res) => setItems(res.data.items || []))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchMedia() }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this media item?')) return
    await api.delete(`/media/${id}`)
    fetchMedia()
  }

  const handleToggle = async (id, field, val) => {
    await api.patch(`/media/${id}`, { [field]: !val })
    fetchMedia()
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl font-bold">Media Library</h2>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-accent/30"
        >
          <Plus size={16} /> Add Media
        </button>
      </div>

      {showForm && (
        <UploadForm
          onSuccess={() => { setShowForm(false); fetchMedia() }}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className="mt-8 space-y-3">
        {loading && <p className="text-ink/50 dark:text-cream/50">Loading…</p>}
        {!loading && items.length === 0 && (
          <p className="text-center py-10 text-ink/40 dark:text-cream/40">No media yet. Add your first item above.</p>
        )}
        {items.map((item) => (
          <div
            key={item._id}
            className="flex items-center gap-4 rounded-2xl bg-white dark:bg-[#1F1A16] p-4 shadow-sm"
          >
            {/* Thumb */}
            <div className="h-16 w-24 shrink-0 overflow-hidden rounded-xl bg-ink/5 dark:bg-cream/5">
              {item.thumbnail ? (
                <img src={item.thumbnail} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-ink/20">
                  <Youtube size={20} />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="min-w-0 flex-1">
              <p className="truncate font-bold">{item.title}</p>
              <p className="text-xs text-ink/40 dark:text-cream/40 capitalize">
                {item.type} · {item.source} · {item.views} views
              </p>
            </div>

            {/* Actions */}
            <div className="flex shrink-0 items-center gap-2">
              <IconBtn
                title={item.featured ? 'Unfeature' : 'Feature'}
                onClick={() => handleToggle(item._id, 'featured', item.featured)}
                className={item.featured ? 'text-amber-500' : 'text-ink/30 dark:text-cream/30'}
              >
                <Star size={16} fill={item.featured ? 'currentColor' : 'none'} />
              </IconBtn>
              <IconBtn
                title={item.published ? 'Unpublish' : 'Publish'}
                onClick={() => handleToggle(item._id, 'published', item.published)}
                className={item.published ? 'text-green-600' : 'text-ink/30 dark:text-cream/30'}
              >
                {item.published ? <Eye size={16} /> : <EyeOff size={16} />}
              </IconBtn>
              <IconBtn
                title="Delete"
                onClick={() => handleDelete(item._id)}
                className="text-red-500"
              >
                <Trash2 size={16} />
              </IconBtn>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ────────────────────────── Upload Form ────────────────────────── */
function UploadForm({ onSuccess, onCancel }) {
  const fileRef = useRef(null)
  const [source, setSource] = useState('youtube')
  const [form, setForm] = useState({ title: '', description: '', type: 'testimony', youtubeUrl: '' })
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (source === 'upload') {
        if (!file) { setError('Please select a file.'); setLoading(false); return }
        const data = new FormData()
        data.append('file', file)
        data.append('title', form.title)
        data.append('description', form.description)
        data.append('type', form.type)
        data.append('source', 'upload')
        await api.post('/media', data, { headers: { 'Content-Type': 'multipart/form-data' } })
      } else {
        await api.post('/media', { ...form, source: 'youtube' })
      }
      onSuccess()
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 rounded-3xl border border-ink/10 dark:border-cream/10 p-6 space-y-4">
      <h3 className="font-serif text-xl font-bold">Add New Media</h3>

      {/* Source toggle */}
      <div className="flex gap-3">
        <SrcBtn active={source === 'youtube'} onClick={() => setSource('youtube')} icon={<Youtube size={16} />}>
          YouTube Link
        </SrcBtn>
        <SrcBtn active={source === 'upload'} onClick={() => setSource('upload')} icon={<Upload size={16} />}>
          Upload File
        </SrcBtn>
      </div>

      <Input label="Title" value={form.title} onChange={update('title')} required />
      <Input label="Description (optional)" value={form.description} onChange={update('description')} />

      <div>
        <label className="text-xs font-bold tracking-[0.2em] text-ink/40 dark:text-cream/40">TYPE</label>
        <select
          value={form.type}
          onChange={update('type')}
          className="mt-2 w-full rounded-2xl bg-ink/5 dark:bg-cream/10 px-4 py-3 text-sm font-semibold outline-none"
        >
          <option value="testimony">Testimony</option>
          <option value="sermon">Sermon</option>
          <option value="worship">Worship</option>
          <option value="announcement">Announcement</option>
          <option value="other">Other</option>
        </select>
      </div>

      {source === 'youtube' ? (
        <Input
          label="YouTube URL or Video ID"
          placeholder="https://youtu.be/XXXXXXXXXX or video ID"
          value={form.youtubeUrl}
          onChange={update('youtubeUrl')}
          required
        />
      ) : (
        <div>
          <label className="text-xs font-bold tracking-[0.2em] text-ink/40 dark:text-cream/40">VIDEO FILE</label>
          <div
            onClick={() => fileRef.current?.click()}
            className="mt-2 cursor-pointer rounded-2xl border-2 border-dashed border-ink/15 dark:border-cream/15 p-8 text-center hover:border-accent transition-colors"
          >
            <Upload size={24} className="mx-auto text-ink/30 dark:text-cream/30" />
            <p className="mt-2 text-sm text-ink/50 dark:text-cream/50">
              {file ? file.name : 'Click to choose a video or image (max 200 MB)'}
            </p>
            <input
              ref={fileRef}
              type="file"
              accept="video/*,image/*"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
        </div>
      )}

      {error && <p className="text-sm font-semibold text-red-500">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 rounded-full bg-accent py-3 font-bold text-white disabled:opacity-60"
        >
          {loading ? 'Uploading…' : 'Add Media'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 rounded-full border border-ink/15 dark:border-cream/15 py-3 font-bold"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

/* ────────────────────────── Live Stream Manager ────────────────────────── */
function LiveStreamManager() {
  const [stream, setStream] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [toggling, setToggling] = useState(false)
  const [msg, setMsg] = useState('')
  const [form, setForm] = useState({ youtubeUrl: '', title: '', description: '', scheduledFor: '' })

  const fetchStream = () => {
    api.get('/livestream').then((res) => {
      const s = res.data.stream
      setStream(s)
      setForm({
        youtubeUrl: s.youtubeVideoId || '',
        title: s.title || '',
        description: s.description || '',
        scheduledFor: s.scheduledFor
          ? new Date(s.scheduledFor).toISOString().slice(0, 16)
          : '',
      })
    }).finally(() => setLoading(false))
  }

  useEffect(() => { fetchStream() }, [])

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMsg('')
    try {
      await api.put('/livestream', form)
      setMsg('✅ Live stream settings saved.')
      fetchStream()
    } catch (err) {
      setMsg(err.response?.data?.message || 'Could not save.')
    } finally {
      setSaving(false)
    }
  }

  const handleToggle = async () => {
    setToggling(true)
    setMsg('')
    try {
      const res = await api.patch('/livestream/toggle')
      setMsg(res.data.message)
      fetchStream()
    } catch (err) {
      setMsg(err.response?.data?.message || 'Could not toggle.')
    } finally {
      setToggling(false)
    }
  }

  if (loading) return <p className="text-ink/50">Loading…</p>

  return (
    <div className="space-y-8">
      {/* Status card */}
      <div className={`rounded-3xl p-7 flex items-center justify-between ${stream?.isLive ? 'bg-red-600 text-white' : 'bg-ink/5 dark:bg-cream/5'}`}>
        <div>
          <p className="text-xs font-bold tracking-[0.2em] opacity-70">STREAM STATUS</p>
          <p className="mt-1 font-serif text-2xl font-bold">
            {stream?.isLive ? '🔴 LIVE NOW' : '⚫ OFFLINE'}
          </p>
          {stream?.youtubeVideoId && (
            <p className="mt-1 text-sm opacity-70">ID: {stream.youtubeVideoId}</p>
          )}
        </div>
        <button
          onClick={handleToggle}
          disabled={toggling || !stream?.youtubeVideoId}
          className={`flex items-center gap-2 rounded-full px-6 py-3 font-bold text-sm transition-colors disabled:opacity-50 ${
            stream?.isLive
              ? 'bg-white text-red-600'
              : 'bg-ink dark:bg-cream text-cream dark:text-ink'
          }`}
        >
          {stream?.isLive
            ? <><ToggleRight size={18} /> Go Offline</>
            : <><ToggleLeft size={18} /> Go Live</>}
        </button>
      </div>

      {/* Settings form */}
      <form onSubmit={handleSave} className="space-y-4 rounded-3xl border border-ink/10 dark:border-cream/10 p-6">
        <h3 className="font-serif text-xl font-bold">Stream Settings</h3>
        <Input
          label="YouTube Live URL or Video ID"
          placeholder="https://youtube.com/live/XXXXXXXXXX or video ID"
          value={form.youtubeUrl}
          onChange={update('youtubeUrl')}
        />
        <Input label="Stream Title" value={form.title} onChange={update('title')} />
        <Input label="Description (optional)" value={form.description} onChange={update('description')} />
        <div>
          <label className="text-xs font-bold tracking-[0.2em] text-ink/40 dark:text-cream/40">
            SCHEDULED FOR (optional)
          </label>
          <input
            type="datetime-local"
            value={form.scheduledFor}
            onChange={update('scheduledFor')}
            className="mt-2 w-full rounded-2xl bg-ink/5 dark:bg-cream/10 px-4 py-3 text-sm font-semibold outline-none"
          />
        </div>
        {msg && <p className="text-sm font-semibold text-green-600">{msg}</p>}
        <button
          type="submit"
          disabled={saving}
          className="w-full rounded-full bg-accent py-3 font-bold text-white disabled:opacity-60"
        >
          {saving ? 'Saving…' : 'Save Settings'}
        </button>
      </form>
    </div>
  )
}

/* ────────────────────────── Small helpers ────────────────────────── */
function TabBtn({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-5 py-2 text-sm font-bold transition-colors ${
        active ? 'bg-accent text-white shadow-md shadow-accent/30' : 'bg-ink/5 dark:bg-cream/10 text-ink/60 dark:text-cream/60'
      }`}
    >
      {children}
    </button>
  )
}

function SrcBtn({ active, onClick, icon, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition-colors ${
        active ? 'bg-ink dark:bg-cream text-cream dark:text-ink' : 'bg-ink/5 dark:bg-cream/10 text-ink/60'
      }`}
    >
      {icon}{children}
    </button>
  )
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="text-xs font-bold tracking-[0.2em] text-ink/40 dark:text-cream/40">{label.toUpperCase()}</label>
      <input
        {...props}
        className="mt-2 w-full rounded-2xl bg-ink/5 dark:bg-cream/10 px-4 py-3 text-sm font-semibold outline-none placeholder:text-ink/20 dark:placeholder:text-cream/20"
      />
    </div>
  )
}

function IconBtn({ onClick, title, className, children }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`grid h-8 w-8 place-items-center rounded-full bg-ink/5 dark:bg-cream/5 hover:bg-ink/10 transition-colors ${className}`}
    >
      {children}
    </button>
  )
}
