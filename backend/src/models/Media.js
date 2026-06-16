import mongoose from 'mongoose'

const mediaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    type: {
      type: String,
      enum: ['testimony', 'sermon', 'worship', 'announcement', 'other'],
      default: 'testimony',
    },
    // 'upload' = file uploaded to server, 'youtube' = YouTube video/short
    source: {
      type: String,
      enum: ['upload', 'youtube'],
      required: true,
    },
    // For uploaded files — relative path e.g. /uploads/media/filename.mp4
    filePath: {
      type: String,
      default: '',
    },
    // For YouTube videos — the video ID e.g. 'dQw4w9WgXcQ'
    youtubeId: {
      type: String,
      default: '',
    },
    // Thumbnail — auto-generated for YouTube, uploaded for files
    thumbnail: {
      type: String,
      default: '',
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    published: {
      type: Boolean,
      default: true,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
)

export default mongoose.model('Media', mediaSchema)
