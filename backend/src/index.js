import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import { errorHandler } from './middleware/errorHandler.js'

import authRoutes from './routes/auth.js'
import givingRoutes from './routes/giving.js'
import aiRoutes from './routes/ai.js'

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

// ── Health check ──────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', church: 'JPVC', timestamp: new Date().toISOString() })
})

// ── Routes ────────────────────────────────────────────────────
app.use('/api/auth', authRoutes)
app.use('/api/giving', givingRoutes)
app.use('/api/ai', aiRoutes)

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
