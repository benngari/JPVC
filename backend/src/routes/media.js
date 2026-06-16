import { Router } from 'express'
import {
  getMedia,
  getMediaById,
  createMedia,
  updateMedia,
  deleteMedia,
} from '../controllers/mediaController.js'
import { protect, adminOnly } from '../middleware/auth.js'
import { uploadMedia } from '../middleware/upload.js'

const router = Router()

// Public
router.get('/', getMedia)
router.get('/:id', getMediaById)

// Admin only
router.post('/', protect, adminOnly, uploadMedia.single('file'), createMedia)
router.patch('/:id', protect, adminOnly, updateMedia)
router.delete('/:id', protect, adminOnly, deleteMedia)

export default router
