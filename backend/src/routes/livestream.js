import { Router } from 'express'
import {
  getLiveStream,
  upsertLiveStream,
  toggleLive,
} from '../controllers/liveStreamController.js'
import { protect, adminOnly } from '../middleware/auth.js'

const router = Router()

router.get('/', getLiveStream)                          // public
router.put('/', protect, adminOnly, upsertLiveStream)   // admin
router.patch('/toggle', protect, adminOnly, toggleLive) // admin — quick toggle

export default router
