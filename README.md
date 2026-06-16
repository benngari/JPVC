# JPVC — Jesus Prophetic Vision Church Website

A full-stack clone of [jesuspropheticvisionchurch.org](https://www.jesuspropheticvisionchurch.org)

**Stack:** React + Vite + Tailwind CSS (frontend) · Node.js + Express + MongoDB (backend)

---

## 📁 Project Structure

```
jpvc/
├── frontend/        ← React app (Vite + Tailwind)
└── backend/         ← Node.js API (Express + MongoDB)
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- Anthropic API key
- Safaricom Daraja M-Pesa credentials (sandbox for testing)

---

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` and fill in:

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Any long random string |
| `ANTHROPIC_API_KEY` | From console.anthropic.com |
| `MPESA_CONSUMER_KEY` | From Safaricom Daraja portal |
| `MPESA_CONSUMER_SECRET` | From Safaricom Daraja portal |
| `MPESA_SHORTCODE` | `247247` (or your paybill) |
| `MPESA_PASSKEY` | From Safaricom Daraja portal |
| `MPESA_CALLBACK_URL` | Public URL for M-Pesa callbacks (use ngrok for dev) |
| `MPESA_ENV` | `sandbox` for testing, `live` for production |

```bash
npm run dev      # starts on http://localhost:5000
```

---

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev      # starts on http://localhost:5173
```

The Vite dev server proxies `/api/*` requests to `localhost:5000` automatically.

---

## 📄 Pages

| Route | Page |
|---|---|
| `#/` | Home — hero, values, leadership, schedule, map, CTA |
| `#/about` | About — mission, story, leadership |
| `#/give` | Give — M-Pesa STK push donation form |
| `#/companion` | AI Spiritual Companion — devotion, trivia, chat |
| `#/login` | Member portal login |
| `#/register` | Member registration |
| `#/portal` | Protected member dashboard (giving history) |

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | — | Register new member |
| POST | `/api/auth/login` | — | Login, returns JWT |
| GET | `/api/auth/me` | ✅ | Get current user |

### Giving
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/giving/stk-push` | ✅ | Initiate M-Pesa STK push |
| POST | `/api/giving/callback` | — | M-Pesa payment callback |
| GET | `/api/giving/history` | ✅ | Member's giving history |

### AI
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/ai/devotion` | — | Daily devotion from Claude |
| GET | `/api/ai/trivia` | — | Bible trivia question |
| POST | `/api/ai/companion` | — | Spiritual companion chat |

---

## 🧪 Testing M-Pesa in Sandbox

1. Register on [Safaricom Daraja](https://developer.safaricom.co.ke)
2. Create a new app to get Consumer Key + Secret
3. Use the test shortcode `174379` and passkey from the sandbox portal
4. Use ngrok to expose localhost for the callback URL:
   ```bash
   ngrok http 5000
   # Copy the https URL → set as MPESA_CALLBACK_URL in .env
   ```
5. Test phone numbers: `254708374149` (Safaricom sandbox test number)

---

## 🎨 Design Tokens

| Token | Value |
|---|---|
| Primary accent | `#E8622C` (orange) |
| Background (light) | `#F7F5F1` (cream) |
| Foreground | `#1A1714` (near-black) |
| Heading font | Playfair Display (serif) |
| Body font | Inter (sans) |

Dark mode is toggled via the sun/moon button in the navbar and stored in `localStorage`.

---

## 🔐 Security Notes

- Passwords are hashed with bcrypt (12 rounds)
- JWT tokens expire in 30 days
- M-Pesa callback endpoint is unauthenticated (required by Safaricom) — validate `CheckoutRequestID` against your DB
- CORS is locked to `localhost:5173` in dev and your production domain in production

---

## 📞 Church Contact

Kabiria, Nairobi · (+254) 723-803-327 · jesuspropheticvisionchurch@gmail.com

© 2026 Jesus Prophetic Vision Church
