import mongoose from 'mongoose'

const giftSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 1,
    },
    // M-Pesa checkout request ID returned by STK push
    checkoutRequestId: {
      type: String,
    },
    // M-Pesa Merchant Request ID
    merchantRequestId: {
      type: String,
    },
    // M-Pesa transaction ID after successful payment
    mpesaReceiptNumber: {
      type: String,
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'cancelled'],
      default: 'pending',
    },
    resultDescription: {
      type: String,
    },
  },
  { timestamps: true }
)

export default mongoose.model('Gift', giftSchema)
