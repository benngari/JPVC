export function errorHandler(err, req, res, next) {
  console.error('🔴 Error:', err.message)

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0]
    return res.status(400).json({ message: `${field} already exists.` })
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message)
    return res.status(400).json({ message: messages.join('. ') })
  }

  // JWT error
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ message: 'Invalid token.' })
  }

  const statusCode = err.statusCode || 500
  res.status(statusCode).json({
    message: err.message || 'Internal server error.',
  })
}
