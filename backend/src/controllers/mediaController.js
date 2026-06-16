import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import Media from '../models/Media.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const UPLOADS_DIR = path.join(__dirname, '../../uploads/media')

// Ensure uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true })
}

// GET /api/media  — public
export async function getMedia(req, res, next) {
  try {
    const { type, page = 1, limit = 12 } = req.query
    const filter = { published: true }
    if (type && type !== 'all') filter.type = type

    const total = await Media.countDocuments(filter)
    const items = await Media.find(filter)
      .sort({ featured: -1, createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .populate('uploadedBy', 'name')

    res.json({ items, total, page: Number(page), pages: Math.ceil(total / Number(limit)) })
  } catch (err) {
    next(err)
  }
}

// GET /api/media/:id  — public (increment views)
export async function getMediaById(req, res, next) {
  try {
    const item = await Media.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    ).populate('uploadedBy', 'name')

    if (!item) return res.status(404).json({ message: 'Media not found.' })
    res.json({ item })
  } catch (err) {
    next(err)
  }
}

// POST /api/media  — admin only
// Handles both file uploads (via multer) and YouTube links
export async function createMedia(req, res, next) {
  try {
    const { title, description, type, source, youtubeId, youtubeUrl } = req.body

    if (!title) return res.status(400).json({ message: 'Title is required.' })
    if (!source) return res.status(400).json({ message: 'Source (upload or youtube) is required.' })

    let finalYoutubeId = youtubeId || ''
    let filePath = ''
    let thumbnail = ''

    if (source === 'youtube') {
      // Accept full URL or just ID
      if (youtubeUrl && !finalYoutubeId) {
        const match = youtubeUrl.match(
          /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([^&\n?#]+)/
        )
        finalYoutubeId = match ? match[1] : youtubeUrl.trim()
      }
      if (!finalYoutubeId) {
        return res.status(400).json({ message: 'YouTube video ID or URL is required.' })
      }
      thumbnail = `https://img.youtube.com/vi/${finalYoutubeId}/hqdefault.jpg`
    } else if (source === 'upload') {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded.' })
      }
      filePath = `/uploads/media/${req.file.filename}`
      thumbnail = ''
    }

    const media = await Media.create({
      title,
      description: description || '',
      type: type || 'testimony',
      source,
      filePath,
      youtubeId: finalYoutubeId,
      thumbnail,
      uploadedBy: req.user._id,
      published: true,
    })

    res.status(201).json({ media })
  } catch (err) {
    next(err)
  }
}

// PATCH /api/media/:id  — admin only
export async function updateMedia(req, res, next) {
  try {
    const { title, description, type, featured, published } = req.body
    const item = await Media.findByIdAndUpdate(
      req.params.id,
      { title, description, type, featured, published },
      { new: true, runValidators: true }
    )
    if (!item) return res.status(404).json({ message: 'Media not found.' })
    res.json({ item })
  } catch (err) {
    next(err)
  }
}

// DELETE /api/media/:id  — admin only
export async function deleteMedia(req, res, next) {
  try {
    const item = await Media.findById(req.params.id)
    if (!item) return res.status(404).json({ message: 'Media not found.' })

    // Delete physical file if it was uploaded
    if (item.source === 'upload' && item.filePath) {
      const fullPath = path.join(__dirname, '../../', item.filePath)
      if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath)
    }

    await item.deleteOne()
    res.json({ message: 'Media deleted.' })
  } catch (err) {
    next(err)
  }
}
