import Gift from '../models/Gift.js'
import { stkPush, normalisePhone } from '../services/mpesa.js'

// POST /api/giving/stk-push  (protected)
export async function initiateStkPush(req, res, next) {
  try {
    const { amount, phone } = req.body
    if (!amount || !phone) {
      return res.status(400).json({ message: 'Amount and phone are required.' })
    }
    if (Number(amount) < 1) {
      return res.status(400).json({ message: 'Minimum gift amount is KES 1.' })
    }

    const normalisedPhone = normalisePhone(phone)

    // Create a pending record immediately
    const gift = await Gift.create({
      user: req.user._id,
      phone: normalisedPhone,
      amount: Number(amount),
      status: 'pending',
    })

    try {
      const mpesaResponse = await stkPush({
        phone: normalisedPhone,
        amount: Number(amount),
        accountRef: `JPVC-${req.user._id}`,
      })

      gift.checkoutRequestId = mpesaResponse.CheckoutRequestID
      gift.merchantRequestId = mpesaResponse.MerchantRequestID
      await gift.save()

      res.json({
        message: 'STK push sent. Please check your phone and enter your M-Pesa PIN.',
        checkoutRequestId: mpesaResponse.CheckoutRequestID,
        giftId: gift._id,
      })
    } catch (mpesaErr) {
      // Mark gift as failed if STK push call itself fails
      gift.status = 'failed'
      gift.resultDescription = mpesaErr.response?.data?.errorMessage || mpesaErr.message
      await gift.save()

      return res.status(502).json({
        message: 'M-Pesa payment could not be initiated. Please try again.',
        detail: mpesaErr.response?.data?.errorMessage,
      })
    }
  } catch (err) {
    next(err)
  }
}

// POST /api/giving/callback  (public — called by Safaricom)
export async function mpesaCallback(req, res) {
  try {
    const body = req.body?.Body?.stkCallback
    if (!body) return res.json({ ResultCode: 0, ResultDesc: 'Accepted' })

    const { CheckoutRequestID, ResultCode, ResultDesc, CallbackMetadata } = body

    const gift = await Gift.findOne({ checkoutRequestId: CheckoutRequestID })
    if (!gift) return res.json({ ResultCode: 0, ResultDesc: 'Accepted' })

    if (ResultCode === 0) {
      // Payment successful — extract receipt number
      const items = CallbackMetadata?.Item || []
      const receipt = items.find((i) => i.Name === 'MpesaReceiptNumber')?.Value
      gift.status = 'completed'
      gift.mpesaReceiptNumber = receipt || ''
    } else {
      gift.status = ResultCode === 1032 ? 'cancelled' : 'failed'
    }

    gift.resultDescription = ResultDesc
    await gift.save()

    res.json({ ResultCode: 0, ResultDesc: 'Accepted' })
  } catch (err) {
    console.error('M-Pesa callback error:', err.message)
    res.json({ ResultCode: 0, ResultDesc: 'Accepted' }) // Always ack Safaricom
  }
}

// GET /api/giving/history  (protected)
export async function getGivingHistory(req, res, next) {
  try {
    const gifts = await Gift.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(50)
    res.json({ gifts })
  } catch (err) {
    next(err)
  }
}
