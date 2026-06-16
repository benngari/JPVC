import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import { connectDB } from './config/db.js'
import { errorHandler } from './middleware/errorHandler.js'

import authRoutes from './routes/auth.js'
import givingRoutes from './routes/giving.js'
import aiRoutes from './routes/ai.js'
import mediaRoutes from './routes/media.js'
import liveStreamRoutes from './routes/livestream.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 5000

// ── Middleware ────────────────────────────────────────────────
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['https://yourdomain.com'] // update for production
    : ['http://localhost:5173'],
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ── Static files (uploaded media) ────────────────────────────
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

// ── Health check ──────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', church: 'JPVC', timestamp: new Date().toISOString() })
})

// ── Routes ────────────────────────────────────────────────────
app.use('/api/auth', authRoutes)
app.use('/api/giving', givingRoutes)
app.use('/api/ai', aiRoutes)
app.use('/api/media', mediaRoutes)
app.use('/api/livestream', liveStreamRoutes)

// ── 404 ───────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found.` })
})

// ── Error handler ─────────────────────────────────────────────
app.use(errorHandler)

// ── Start ─────────────────────────────────────────────────────
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`\n🕊️  JPVC Backend running on http://localhost:${PORT}`)
    console.log(`   Environment : ${process.env.NODE_ENV || 'development'}`)
    console.log(`   M-Pesa env  : ${process.env.MPESA_ENV || 'sandbox'}\n`)
  })
})
