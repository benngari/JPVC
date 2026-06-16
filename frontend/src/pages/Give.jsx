import { useState } from 'react'
import { Copy, Check, ShieldCheck, Heart, Smartphone } from 'lucide-react'
import api from '../services/api'

export default function Give() {
  const [copied, setCopied] = useState(null)
  const [amount, setAmount] = useState('')
  const [phone, setPhone] = useState('')
  const [status, setStatus] = useState(null) // null | 'sending' | 'sent' | 'error'
  const [message, setMessage] = useState('')

  const copy = (text, key) => {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 1500)
  }

  const handleGive = async (e) => {
    e.preventDefault()
    if (!amount || Number(amount) <= 0) {
      setMessage('Please enter a valid amount.')
      setStatus('error')
      return
    }
    if (!phone || phone.replace(/\D/g, '').length < 9) {
      setMessage('Please enter the M-Pesa number to charge.')
      setStatus('error')
      return
    }

    setStatus('sending')
    setMessage('')
    try {
      const res = await api.post('/giving/stk-push', {
        amount: Number(amount),
        phone,
      })
      setStatus('sent')
      setMessage(res.data.message || 'Check your phone to complete the M-Pesa payment.')
    } catch (err) {
      setStatus('error')
      setMessage(
        err.response?.data?.message || 'Something went wrong while processing your gift.'
      )
    }
  }

  return (
    <>
      <section className="mx-auto max-w-4xl px-5 py-16 text-center">
        <h1 className="font-serif text-4xl font-bold sm:text-6xl">Generosity at JPVC</h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg italic text-ink/60 dark:text-cream/60">
          "Each of you should give what you have decided in your heart to give, not reluctantly or
          under compulsion, for God loves a cheerful giver." &mdash; 2 Corinthians 9:7
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-20">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Giving form */}
          <div className="rounded-3xl bg-white dark:bg-[#1F1A16] p-7 shadow-md sm:p-9">
            <p className="text-center text-xs font-bold tracking-[0.3em] text-accent">
              MOBILE MONEY GIVING
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <button
                onClick={() => copy('247247', 'paybill')}
                className="rounded-2xl bg-ink/5 dark:bg-cream/10 p-4 text-left transition-colors hover:bg-ink/10 dark:hover:bg-cream/20"
              >
                <span className="flex items-center justify-between text-[11px] font-bold tracking-[0.2em] text-ink/40 dark:text-cream/40">
                  PAYBILL
                  {copied === 'paybill' ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                </span>
                <span className="mt-1 block font-serif text-2xl font-bold">247247</span>
              </button>
              <button
                onClick={() => copy('842283', 'account')}
                className="rounded-2xl bg-ink/5 dark:bg-cream/10 p-4 text-left transition-colors hover:bg-ink/10 dark:hover:bg-cream/20"
              >
                <span className="flex items-center justify-between text-[11px] font-bold tracking-[0.2em] text-ink/40 dark:text-cream/40">
                  ACCOUNT NO
                  {copied === 'account' ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                </span>
                <span className="mt-1 block font-serif text-2xl font-bold">842283</span>
              </button>
            </div>
            <p className="mt-3 text-center text-xs text-ink/40 dark:text-cream/40">
              Tap a card above to copy the details to your clipboard.
            </p>

            <div className="my-7 h-px bg-ink/10 dark:bg-cream/10" />

            <form onSubmit={handleGive} className="space-y-5">
              <div>
                <label className="text-xs font-bold tracking-[0.2em] text-ink/40 dark:text-cream/40">
                  ENTER AMOUNT
                </label>
                <div className="mt-2 flex items-center gap-2 rounded-2xl bg-ink/5 dark:bg-cream/10 px-5 py-4">
                  <span className="text-2xl font-bold text-ink/30 dark:text-cream/30">KES</span>
                  <input
                    type="number"
                    min="1"
                    inputMode="numeric"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-transparent text-2xl font-bold outline-none placeholder:text-ink/20 dark:placeholder:text-cream/20"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold tracking-[0.2em] text-ink/40 dark:text-cream/40">
                  M-PESA NUMBER
                </label>
                <div className="mt-2 flex items-center gap-3 rounded-2xl bg-ink/5 dark:bg-cream/10 px-5 py-4">
                  <Smartphone size={20} className="text-ink/30 dark:text-cream/30" />
                  <input
                    type="tel"
                    placeholder="07XXXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-transparent text-lg font-semibold outline-none placeholder:text-ink/20 dark:placeholder:text-cream/20"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-ink dark:bg-cream py-4 font-bold text-cream dark:text-ink shadow-lg transition-opacity disabled:opacity-60"
              >
                {status === 'sending' ? 'Processing...' : 'Process Gift'}
                <Heart size={18} className="text-accent" fill="currentColor" />
              </button>

              {message && (
                <p
                  className={`text-center text-sm font-semibold ${
                    status === 'error' ? 'text-red-500' : 'text-green-600'
                  }`}
                >
                  {message}
                </p>
              )}
            </form>

            <p className="mt-6 flex items-center justify-center gap-2 text-xs text-ink/40 dark:text-cream/40">
              <ShieldCheck size={14} /> Secure and Private Transaction
            </p>
          </div>

          {/* Impact */}
          <div>
            <h2 className="font-serif text-3xl font-bold sm:text-4xl">Your Impact</h2>
            <div className="mt-6 space-y-5">
              <ImpactCard
                title="Local Community Outreach"
                desc="Supporting our local vision to serve the needy and provide hope to the hopeless in our city."
              />
              <ImpactCard
                title="Sanctuary &amp; Worship"
                desc="Maintaining a home for prayer, prophetic ministry, and worship for the Kabiria community."
              />
              <ImpactCard
                title="Discipleship &amp; Growth"
                desc="Equipping members through teaching, mentorship, and youth development programs."
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function ImpactCard({ title, desc }) {
  return (
    <div className="rounded-3xl border border-ink/10 dark:border-cream/10 p-6">
      <h3 className="font-serif text-lg font-bold" dangerouslySetInnerHTML={{ __html: title }} />
      <p className="mt-2 text-sm text-ink/60 dark:text-cream/60" dangerouslySetInnerHTML={{ __html: desc }} />
    </div>
  )
}
