import axios from 'axios'

const SANDBOX_BASE = 'https://sandbox.safaricom.co.ke'
const LIVE_BASE = 'https://api.safaricom.co.ke'

function base() {
  return process.env.MPESA_ENV === 'live' ? LIVE_BASE : SANDBOX_BASE
}

// Normalise phone number to 254XXXXXXXXX format
export function normalisePhone(phone) {
  const digits = String(phone).replace(/\D/g, '')
  if (digits.startsWith('0')) return '254' + digits.slice(1)
  if (digits.startsWith('254')) return digits
  return '254' + digits
}

// Get OAuth access token
async function getAccessToken() {
  const key = process.env.MPESA_CONSUMER_KEY
  const secret = process.env.MPESA_CONSUMER_SECRET
  const auth = Buffer.from(`${key}:${secret}`).toString('base64')

  const res = await axios.get(
    `${base()}/oauth/v1/generate?grant_type=client_credentials`,
    { headers: { Authorization: `Basic ${auth}` } }
  )
  return res.data.access_token
}

// STK Push
export async function stkPush({ phone, amount, accountRef = 'JPVC Gift' }) {
  const token = await getAccessToken()
  const shortcode = process.env.MPESA_SHORTCODE
  const passkey = process.env.MPESA_PASSKEY
  const callbackUrl = process.env.MPESA_CALLBACK_URL

  const timestamp = new Date()
    .toISOString()
    .replace(/[-T:\.Z]/g, '')
    .slice(0, 14)
  const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString('base64')

  const res = await axios.post(
    `${base()}/mpesa/stkpush/v1/processrequest`,
    {
      BusinessShortCode: shortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: Math.ceil(amount),
      PartyA: normalisePhone(phone),
      PartyB: shortcode,
      PhoneNumber: normalisePhone(phone),
      CallBackURL: callbackUrl,
      AccountReference: accountRef,
      TransactionDesc: 'JPVC Church Gift',
    },
    { headers: { Authorization: `Bearer ${token}` } }
  )

  return res.data
}
