import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Sun, Moon, Menu, X, Home, User, Heart, MessageCircle, LogIn, ChevronDown, Film, Radio } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const { user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)

  const navLinkClass = ({ isActive }) =>
    `text-sm font-semibold tracking-wide transition-colors ${
      isActive ? 'text-accent' : 'text-ink/70 dark:text-cream/70 hover:text-accent'
    }`

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-ink/10 dark:border-cream/10 bg-cream/90 dark:bg-ink/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link to="/" className="flex items-center gap-3">
            <ShieldLogo className="h-9 w-9" />
            <span className="leading-tight">
              <span className="block font-serif text-lg font-bold text-ink dark:text-cream">
                Jesus Prophetic
              </span>
              <span className="block text-[11px] font-bold tracking-[0.2em] text-accent">
                VISION CHURCH
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 xl:flex">
            <NavLink to="/" className={navLinkClass} end>Home</NavLink>
            <NavLink to="/about" className={navLinkClass}>About</NavLink>
            <NavLink to="/give" className={navLinkClass}>Give</NavLink>
            <NavLink to="/media" className={navLinkClass}>Media</NavLink>
            <NavLink to="/live" className={({ isActive }) =>
              `flex items-center gap-1.5 text-sm font-semibold transition-colors ${
                isActive ? 'text-red-600' : 'text-ink/70 dark:text-cream/70 hover:text-red-600'
              }`
            }>
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              Live
            </NavLink>

            <span className="h-5 w-px bg-ink/10 dark:bg-cream/10" />

            <button
              onClick={toggleTheme}
              className="flex items-center gap-1.5 rounded-full bg-ink/5 dark:bg-cream/10 px-3 py-1.5 text-xs font-bold tracking-widest text-ink/60 dark:text-cream/60 hover:text-accent transition-colors"
            >
              {theme === 'dark' ? <Moon size={14} /> : <Sun size={14} />}
              {theme === 'dark' ? 'NIGHT' : 'CLASSIC'}
            </button>

            <div className="relative">
              <button
                onClick={() => setAccountOpen((o) => !o)}
                className="flex items-center gap-2 rounded-full bg-ink/5 dark:bg-cream/10 px-4 py-1.5 text-left"
              >
                <User size={18} className="text-ink/50 dark:text-cream/50" />
                <span className="text-xs">
                  <span className="block text-[10px] uppercase text-ink/40 dark:text-cream/40">Account</span>
                  <span className="block font-semibold text-ink/80 dark:text-cream/80">
                    {user ? user.name?.split(' ')[0] : 'Sign In'}
                  </span>
                </span>
                <ChevronDown size={14} className="text-ink/40 dark:text-cream/40" />
              </button>

              {accountOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl border border-ink/10 bg-white dark:bg-[#221E1A] dark:border-cream/10 p-4 shadow-xl">
                  {user ? (
                    <div className="space-y-3">
                      <p className="text-sm font-semibold text-ink dark:text-cream">{user.name}</p>
                      <Link
                        to="/portal"
                        onClick={() => setAccountOpen(false)}
                        className="block rounded-full bg-ink dark:bg-cream px-4 py-2 text-center text-sm font-bold text-cream dark:text-ink"
                      >
                        Member Portal
                      </Link>
                      {user.role === 'admin' && (
                        <Link
                          to="/admin"
                          onClick={() => setAccountOpen(false)}
                          className="block rounded-full bg-accent/10 px-4 py-2 text-center text-sm font-bold text-accent"
                        >
                          Admin Panel
                        </Link>
                      )}
                      <button
                        onClick={() => { logout(); setAccountOpen(false) }}
                        className="w-full rounded-full border border-ink/15 dark:border-cream/15 px-4 py-2 text-sm font-semibold text-ink/70 dark:text-cream/70"
                      >
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3 text-center">
                      <p className="text-sm text-ink/60 dark:text-cream/60">Join our digital sanctuary.</p>
                      <Link
                        to="/login"
                        onClick={() => setAccountOpen(false)}
                        className="flex items-center justify-center gap-2 rounded-full bg-ink dark:bg-cream px-4 py-2.5 text-sm font-bold text-cream dark:text-ink"
                      >
                        <LogIn size={16} /> Portal Login
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            <Link
              to="/companion"
              className="flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-accent/30 hover:bg-accent/90 transition-colors"
            >
              <MessageCircle size={16} /> Companion
            </Link>
          </nav>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={toggleTheme}
              className="grid h-10 w-10 place-items-center rounded-full bg-ink/5 dark:bg-cream/10 text-accent"
            >
              {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-full bg-ink dark:bg-cream text-cream dark:text-ink"
              aria-label="Open menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setMenuOpen(false)} aria-hidden="true" />
          <div className="relative flex h-full w-full max-w-sm flex-col bg-white dark:bg-[#1A1714] p-6 shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between border-b border-ink/10 dark:border-cream/10 pb-5">
              <div className="flex items-center gap-3">
                <ShieldLogo className="h-8 w-8" />
                <span className="font-serif text-lg font-bold text-ink dark:text-cream">JPVC Menu</span>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-full bg-ink/5 dark:bg-cream/10"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            <p className="mt-6 text-xs font-bold tracking-[0.2em] text-ink/40 dark:text-cream/40">PRINCIPAL LINKS</p>

            <nav className="mt-4 flex flex-col gap-3">
              <DrawerLink to="/" icon={<Home size={20} />} label="Home" onClick={() => setMenuOpen(false)} />
              <DrawerLink to="/about" icon={<User size={20} />} label="About" onClick={() => setMenuOpen(false)} />
              <DrawerLink to="/give" icon={<Heart size={20} />} label="Give" onClick={() => setMenuOpen(false)} highlight />
              <DrawerLink to="/media" icon={<Film size={20} />} label="Media & Testimonies" onClick={() => setMenuOpen(false)} />
              <DrawerLink to="/live" icon={<Radio size={20} />} label="Live Stream" onClick={() => setMenuOpen(false)} />
              <DrawerLink to="/companion" icon={<MessageCircle size={20} />} label="Spiritual Companion" onClick={() => setMenuOpen(false)} />
              <DrawerLink to={user ? '/portal' : '/login'} icon={<LogIn size={20} />} label="Portal" onClick={() => setMenuOpen(false)} />
              {user?.role === 'admin' && (
                <DrawerLink to="/admin" icon={<User size={20} />} label="Admin Panel" onClick={() => setMenuOpen(false)} />
              )}
            </nav>

            <div className="mt-auto border-t border-ink/10 dark:border-cream/10 pt-5 text-center text-xs text-ink/40 dark:text-cream/40">
              VISION CHURCH &copy; 2026 <span className="font-bold text-accent">NAIROBI, KENYA</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function DrawerLink({ to, icon, label, onClick, highlight }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-4 rounded-2xl px-4 py-3.5 text-base font-bold transition-colors ${
          highlight
            ? 'bg-accent text-white shadow-lg shadow-accent/30'
            : isActive
            ? 'bg-ink/5 dark:bg-cream/10 text-accent'
            : 'text-ink/70 dark:text-cream/70 hover:bg-ink/5 dark:hover:bg-cream/5'
        }`
      }
    >
      {icon}
      {label}
    </NavLink>
  )
}

export function ShieldLogo({ className }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M32 4 8 12v18c0 16 11 26 24 30 13-4 24-14 24-30V12L32 4z"
        stroke="currentColor"
        className="text-ink dark:text-cream"
        strokeWidth="2.5"
        fill="none"
      />
      <path d="M32 16v32M21 28h22" stroke="#E8622C" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}
