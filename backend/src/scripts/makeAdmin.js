/**
 * Run this once to promote a user to admin role.
 * Usage: node scripts/makeAdmin.js <phone>
 * Example: node scripts/makeAdmin.js 0700000001
 */

import 'dotenv/config'
import mongoose from 'mongoose'
import User from '../src/models/User.js'

const phone = process.argv[2]

if (!phone) {
  console.error('❌ Usage: node scripts/makeAdmin.js <phone>')
  process.exit(1)
}

async function run() {
  await mongoose.connect(process.env.MONGO_URI)
  const user = await User.findOne({ phone })
  if (!user) {
    console.error(`❌ No user found with phone: ${phone}`)
    process.exit(1)
  }
  user.role = 'admin'
  await user.save()
  console.log(`✅ ${user.name} (${user.phone}) is now an admin.`)
  process.exit(0)
}

run().catch((e) => { console.error(e); process.exit(1) })
