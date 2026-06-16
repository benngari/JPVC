import { Router } from 'express'
import { getDevotion, getTrivia, companionChat } from '../controllers/aiController.js'

const router = Router()

// AI routes are public — no auth required for devotion/trivia/chat
router.get('/devotion', getDevotion)
router.get('/trivia', getTrivia)
router.post('/companion', companionChat)

export default router
