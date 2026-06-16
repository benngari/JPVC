import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const UPLOADS_DIR = path.join(__dirname, '../../uploads/media')

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true })
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOADS_DIR),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    const ext = path.extname(file.originalname)
    cb(null, `${unique}${ext}`)
  },
})

const fileFilter = (_req, file, cb) => {
  const allowed = /mp4|mov|avi|mkv|webm|jpg|jpeg|png|gif|webp/i
  const ext = path.extname(file.originalname).replace('.', '')
  if (allowed.test(ext)) {
    cb(null, true)
  } else {
    cb(new Error('Only video and image files are allowed.'), false)
  }
}

export const uploadMedia = multer({
  storage,
  fileFilter,
  limits: { fileSize: 200 * 1024 * 1024 }, // 200 MB max
})
