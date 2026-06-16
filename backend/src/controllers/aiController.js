import Anthropic from '@anthropic-ai/sdk'
// Package: @anthropic-ai/sdk (not 'anthropic')

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// GET /api/ai/devotion
export async function getDevotion(req, res, next) {
  try {
    const today = new Date().toLocaleDateString('en-KE', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    })

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 700,
      messages: [
        {
          role: 'user',
          content: `Generate a daily Christian devotion for ${today} for Jesus Prophetic Vision Church, Nairobi, Kenya.
Return ONLY valid JSON in this exact shape (no markdown, no extra text):
{
  "reference": "Book Chapter:Verse",
  "verse": "The verse text",
  "title": "Devotion title (max 8 words)",
  "reflection": "2-3 sentence reflection (max 80 words)",
  "prayer": "A short closing prayer sentence starting with Heavenly Father or Lord"
}`,
        },
      ],
    })

    const raw = message.content[0].text.trim()
    const devotion = JSON.parse(raw)
    res.json({ devotion })
  } catch (err) {
    next(err)
  }
}

// GET /api/ai/trivia
export async function getTrivia(req, res, next) {
  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 400,
      messages: [
        {
          role: 'user',
          content: `Create one Bible trivia question.
Return ONLY valid JSON in this exact shape (no markdown, no extra text):
{
  "question": "The trivia question",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctIndex": 2,
  "explanation": "One sentence explaining the answer and its biblical context"
}
Make sure correctIndex matches the correct option (0-indexed). Vary the difficulty and books of the Bible.`,
        },
      ],
    })

    const raw = message.content[0].text.trim()
    const question = JSON.parse(raw)
    res.json({ question })
  } catch (err) {
    next(err)
  }
}

// POST /api/ai/companion
export async function companionChat(req, res, next) {
  try {
    const { messages } = req.body
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ message: 'Messages array is required.' })
    }

    // Keep last 10 turns for context window economy
    const history = messages.slice(-10).map(({ role, content }) => ({ role, content }))

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 600,
      system: `You are the Spiritual Companion for Jesus Prophetic Vision Church (JPVC) in Kabiria, Nairobi, Kenya. 
Your role is to help members explore scripture, find daily encouragement, and deepen their faith. 

Guidelines:
- Ground answers in the Bible; cite verses where helpful.
- Keep the tone warm, pastoral, and encouraging — like a trusted church elder.
- For serious pastoral matters (mental health, grief, crisis), gently encourage them to speak with Reverend Steven Bwire or the church leadership.
- JPVC gatherings: Sunday Service 9AM-5PM, Wednesday Prayer & Fasting, Thursday Huduma, 2nd Friday Kesha.
- Contact: Kabiria, Nairobi | (+254) 723-803-327 | jesuspropheticvisionchurch@gmail.com
- Keep responses concise — 2-4 paragraphs max.`,
      messages: history,
    })

    const reply = response.content[0].text
    res.json({ reply })
  } catch (err) {
    next(err)
  }
}
