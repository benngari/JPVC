import { Link } from 'react-router-dom'
import { Phone, Mail } from 'lucide-react'
import { ShieldLogo } from './Navbar'

export default function Footer() {
  return (
    <footer className="bg-ink dark:bg-[#0F0D0B] text-cream">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <ShieldLogo className="h-9 w-9 text-cream" />
              <span className="leading-tight">
                <span className="block font-serif text-lg font-bold">Jesus Prophetic</span>
                <span className="block text-[11px] font-bold tracking-[0.2em] text-accent">
                  VISION CHURCH
                </span>
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/60">
              Dedicated to experiencing God's presence and sharing His love through prophecy,
              worship, and service in Nairobi.
            </p>
            <div className="mt-5 space-y-1.5 text-sm text-cream/70">
              <p>Kabiria, Nairobi</p>
              <p className="flex items-center gap-2">
                <Phone size={14} /> (+254) 723-803-327
              </p>
              <p className="flex items-center gap-2">
                <Phone size={14} /> (+254) 780-154-849
              </p>
              <a
                href="mailto:jesuspropheticvisionchurch@gmail.com"
                className="flex items-center gap-2 text-accent hover:underline"
              >
                <Mail size={14} /> jesuspropheticvisionchurch@gmail.com
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] text-cream/40">NAVIGATION</h4>
            <ul className="mt-5 space-y-3 text-sm text-cream/70">
              <li>
                <Link to="/give" className="hover:text-accent transition-colors">
                  Giving
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-accent transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/media" className="hover:text-accent transition-colors">
                  Media &amp; Testimonies
                </Link>
              </li>
              <li>
                <Link to="/live" className="hover:text-accent transition-colors">
                  Live Stream
                </Link>
              </li>
              <li>
                <Link to="/portal" className="hover:text-accent transition-colors">
                  Member Portal
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] text-cream/40">GATHERINGS</h4>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <p className="font-bold text-cream">Sunday Service</p>
                <p className="text-cream/50">9:00 AM - 5:00 PM</p>
              </li>
              <li>
                <p className="font-bold text-cream">Wednesday Prayer</p>
                <p className="text-cream/50">9:00 AM - 6:00 PM</p>
              </li>
              <li>
                <p className="font-bold text-cream">Thursday Huduma</p>
                <p className="text-cream/50">9:00 AM - 5:00 PM</p>
              </li>
              <li>
                <p className="font-bold text-cream">2nd Friday Kesha</p>
                <p className="text-cream/50">6:00 PM - 6:00 AM</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-cream/10 pt-6 text-xs text-cream/40 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 JESUS PROPHETIC VISION CHURCH.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-cream/70">
              PRIVACY POLICY
            </Link>
            <Link to="/terms" className="hover:text-cream/70">
              TERMS OF SERVICE
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
