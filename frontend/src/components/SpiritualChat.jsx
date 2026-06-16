import { useEffect, useRef, useState } from 'react'
import { Send, MessageCircle, Bot, User as UserIcon } from 'lucide-react'
import api from '../services/api'

const WELCOME = {
  role: 'assistant',
  content:
    "Peace be with you. I'm here to explore scripture, offer encouragement, and answer questions about the Word. What's on your heart today?",
}

export default function SpiritualChat() {
  const [messages, setMessages] = useState([WELCOME])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const sendMessage = async (e) => {
    e.preventDefault()
    const text = input.trim()
    if (!text || loading) return

    const nextMessages = [...messages, { role: 'user', content: text }]
    setMessages(nextMessages)
    setInput('')
    setLoading(true)
    setError('')

    try {
      const res = await api.post('/ai/companion', {
        messages: nextMessages.map(({ role, content }) => ({ role, content })),
      })
      setMessages((prev) => [...prev, { role: 'assistant', content: res.data.reply }])
    } catch (err) {
      setError(err.response?.data?.message || 'The companion is unavailable right now.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-[600px] flex-col rounded-3xl bg-white dark:bg-[#1F1A16] shadow-md overflow-hidden">
      <div className="flex items-center gap-3 border-b border-ink/10 dark:border-cream/10 bg-accent px-6 py-5 text-white">
        <div className="grid h-10 w-10 place-items-center rounded-full bg-white/20">
          <MessageCircle size={20} />
        </div>
        <div>
          <p className="font-serif text-lg font-bold">Spiritual Companion</p>
          <p className="text-xs text-white/80">AI-powered support &mdash; not a substitute for pastoral care</p>
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
        {messages.map((m, i) => (
          <ChatBubble key={i} role={m.role} content={m.content} />
        ))}
        {loading && (
          <ChatBubble role="assistant" content="..." pending />
        )}
        {error && <p className="text-center text-sm text-red-500">{error}</p>}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={sendMessage} className="flex items-center gap-3 border-t border-ink/10 dark:border-cream/10 p-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about a verse, or share what's on your heart..."
          className="flex-1 rounded-full bg-ink/5 dark:bg-cream/10 px-5 py-3 text-sm outline-none placeholder:text-ink/30 dark:placeholder:text-cream/30"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent text-white shadow-lg shadow-accent/30 disabled:opacity-50 transition-opacity"
          aria-label="Send message"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  )
}

function ChatBubble({ role, content, pending }) {
  const isUser = role === 'user'
  return (
    <div className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div
        className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${
          isUser ? 'bg-ink/10 dark:bg-cream/10' : 'bg-accent/10 text-accent'
        }`}
      >
        {isUser ? <UserIcon size={15} /> : <Bot size={15} />}
      </div>
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? 'bg-accent text-white'
            : 'bg-ink/5 dark:bg-cream/10 text-ink dark:text-cream'
        }`}
      >
        {pending ? (
          <span className="flex gap-1">
            <Dot /> <Dot delay="150ms" /> <Dot delay="300ms" />
          </span>
        ) : (
          content
        )}
      </div>
    </div>
  )
}

function Dot({ delay = '0ms' }) {
  return (
    <span
      className="h-2 w-2 animate-bounce rounded-full bg-ink/30 dark:bg-cream/30"
      style={{ animationDelay: delay }}
    />
  )
}
