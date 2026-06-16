import { Router } from 'express'
import {
  initiateStkPush,
  mpesaCallback,
  getGivingHistory,
} from '../controllers/givingController.js'
import { protect } from '../middleware/auth.js'

const router = Router()

router.post('/stk-push', protect, initiateStkPush)
router.post('/callback', mpesaCallback) // public — Safaricom calls this
router.get('/history', protect, getGivingHistory)

export default router
