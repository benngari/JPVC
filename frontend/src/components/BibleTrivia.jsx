import { useState } from 'react'
import { HelpCircle, RefreshCw, Check, X } from 'lucide-react'
import api from '../services/api'

export default function BibleTrivia() {
  const [question, setQuestion] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState({ correct: 0, total: 0 })

  const fetchQuestion = async () => {
    setLoading(true)
    setError('')
    setSelected(null)
    try {
      const res = await api.get('/ai/trivia')
      setQuestion(res.data.question)
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load a trivia question.')
    } finally {
      setLoading(false)
    }
  }

  const handleAnswer = (index) => {
    if (selected !== null) return
    setSelected(index)
    setScore((s) => ({
      correct: s.correct + (index === question.correctIndex ? 1 : 0),
      total: s.total + 1,
    }))
  }

  return (
    <div className="flex h-full flex-col rounded-3xl bg-ink dark:bg-[#1F1A16] p-7 text-cream shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-accent/20 text-accent">
            <HelpCircle size={20} />
          </div>
          <h3 className="font-serif text-xl font-bold">Bible Trivia</h3>
        </div>
        {score.total > 0 && (
          <span className="rounded-full bg-cream/10 px-3 py-1 text-xs font-bold">
            {score.correct}/{score.total}
          </span>
        )}
      </div>

      <div className="mt-6 flex-1">
        {!question && !loading && (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <p className="text-cream/60">Test your knowledge of scripture.</p>
            <button
              onClick={fetchQuestion}
              className="mt-5 rounded-full bg-accent px-6 py-3 font-bold text-white shadow-lg shadow-accent/30 hover:bg-accent/90 transition-colors"
            >
              Start Trivia
            </button>
          </div>
        )}

        {loading && (
          <div className="space-y-4">
            <div className="h-5 w-full animate-pulse rounded bg-cream/10" />
            <div className="h-12 w-full animate-pulse rounded-2xl bg-cream/10" />
            <div className="h-12 w-full animate-pulse rounded-2xl bg-cream/10" />
            <div className="h-12 w-full animate-pulse rounded-2xl bg-cream/10" />
          </div>
        )}

        {!loading && error && <p className="text-sm text-red-400">{error}</p>}

        {!loading && question && (
          <>
            <p className="font-serif text-lg font-bold leading-relaxed">{question.question}</p>
            <div className="mt-5 space-y-3">
              {question.options.map((opt, i) => {
                const isCorrect = i === question.correctIndex
                const isSelected = i === selected
                let style = 'bg-cream/5 border-cream/10 hover:bg-cream/10'
                if (selected !== null) {
                  if (isCorrect) style = 'bg-green-500/20 border-green-500/40'
                  else if (isSelected) style = 'bg-red-500/20 border-red-500/40'
                  else style = 'bg-cream/5 border-cream/5 opacity-50'
                }
                return (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    className={`flex w-full items-center justify-between rounded-2xl border px-5 py-3.5 text-left text-sm font-semibold transition-colors ${style}`}
                  >
                    {opt}
                    {selected !== null && isCorrect && <Check size={16} className="text-green-400" />}
                    {selected !== null && isSelected && !isCorrect && <X size={16} className="text-red-400" />}
                  </button>
                )
              })}
            </div>
            {selected !== null && question.explanation && (
              <p className="mt-4 text-sm text-cream/60">{question.explanation}</p>
            )}
          </>
        )}
      </div>

      {question && (
        <button
          onClick={fetchQuestion}
          disabled={loading}
          className="mt-6 flex items-center justify-center gap-2 rounded-full border border-cream/20 py-3 text-sm font-bold text-cream/80 hover:bg-cream/5 transition-colors"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Next Question
        </button>
      )}
    </div>
  )
}
