import LiveStream from '../models/LiveStream.js'

// GET /api/livestream  — public
export async function getLiveStream(req, res, next) {
  try {
    let stream = await LiveStream.findOne().populate('updatedBy', 'name')
    if (!stream) {
      // Return a default "offline" state if nothing configured yet
      return res.json({
        stream: {
          isLive: false,
          youtubeVideoId: '',
          title: 'No Live Stream',
          description: '',
          scheduledFor: null,
        },
      })
    }
    res.json({ stream })
  } catch (err) {
    next(err)
  }
}

// PUT /api/livestream  — admin only
// Creates or updates the single live stream config document
export async function upsertLiveStream(req, res, next) {
  try {
    const { isLive, youtubeVideoId, youtubeUrl, title, description, scheduledFor } = req.body

    // Extract video ID from full URL if provided
    let finalId = youtubeVideoId || ''
    if (youtubeUrl && !finalId) {
      const match = youtubeUrl.match(
        /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|live\/|embed\/))([^&\n?#]+)/
      )
      finalId = match ? match[1] : youtubeUrl.trim()
    }

    const stream = await LiveStream.findOneAndUpdate(
      {},
      {
        isLive: Boolean(isLive),
        youtubeVideoId: finalId,
        title: title || 'Sunday Service — Live',
        description: description || '',
        scheduledFor: scheduledFor ? new Date(scheduledFor) : null,
        updatedBy: req.user._id,
      },
      { new: true, upsert: true, runValidators: true }
    )

    res.json({ stream })
  } catch (err) {
    next(err)
  }
}

// PATCH /api/livestream/toggle  — admin only — quick go-live / go-offline
export async function toggleLive(req, res, next) {
  try {
    const stream = await LiveStream.findOne()
    if (!stream) {
      return res.status(404).json({ message: 'No live stream configured. Please set one up first.' })
    }
    stream.isLive = !stream.isLive
    stream.updatedBy = req.user._id
    await stream.save()
    res.json({ stream, message: stream.isLive ? '🔴 Stream is now LIVE' : '⚫ Stream is now OFFLINE' })
  } catch (err) {
    next(err)
  }
}
