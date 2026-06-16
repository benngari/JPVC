import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'
import { ShieldLogo } from '../components/Navbar'

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-5 py-20 text-center">
      <ShieldLogo className="h-16 w-16 opacity-30" />
      <p className="mt-6 font-serif text-8xl font-extrabold text-accent">404</p>
      <h1 className="mt-3 font-serif text-2xl font-bold">Page Not Found</h1>
      <p className="mt-3 text-ink/60 dark:text-cream/60">
        The page you're looking for doesn't exist. Perhaps it has been moved or removed.
      </p>
      <Link
        to="/"
        className="mt-8 flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-bold text-white shadow-lg shadow-accent/30 hover:bg-accent/90 transition-colors"
      >
        <Home size={18} /> Back to Home
      </Link>
    </section>
  )
}
