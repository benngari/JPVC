import jwt from 'jsonwebtoken'
import User from '../models/User.js'

function signToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '30d',
  })
}

// POST /api/auth/register
export async function register(req, res, next) {
  try {
    const { name, phone, password } = req.body
    if (!name || !phone || !password) {
      return res.status(400).json({ message: 'Name, phone and password are required.' })
    }

    const user = await User.create({ name, phone, password })
    const token = signToken(user._id)

    res.status(201).json({ token, user })
  } catch (err) {
    next(err)
  }
}

// POST /api/auth/login
export async function login(req, res, next) {
  try {
    const { phone, password } = req.body
    if (!phone || !password) {
      return res.status(400).json({ message: 'Phone and password are required.' })
    }

    const user = await User.findOne({ phone }).select('+password')
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid phone number or password.' })
    }

    const token = signToken(user._id)
    res.json({ token, user })
  } catch (err) {
    next(err)
  }
}

// GET /api/auth/me  (protected)
export async function getMe(req, res) {
  res.json({ user: req.user })
}
