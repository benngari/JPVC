import mongoose from 'mongoose'

// Single-document config — only one live stream config at a time
const liveStreamSchema = new mongoose.Schema(
  {
    isLive: {
      type: Boolean,
      default: false,
    },
    youtubeVideoId: {
      type: String,
      default: '',
      trim: true,
    },
    title: {
      type: String,
      default: 'Sunday Service — Live',
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    scheduledFor: {
      type: Date,
      default: null,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
)

export default mongoose.model('LiveStream', liveStreamSchema)
