import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/work', label: 'Work' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const { pathname } = useLocation()

  return (
    <header
      className="sticky top-0 z-10 border-b"
      style={{
        backdropFilter: 'blur(10px)',
        background: 'rgba(11, 15, 20, 0.72)',
        borderColor: 'rgba(255,255,255,0.10)',
      }}
    >
      <div
        className="flex items-center justify-between gap-4 py-4 px-6 mx-auto"
        style={{ maxWidth: '1100px' }}
      >
        <Link
          to="/"
          className="font-bold tracking-tight"
          style={{ color: 'rgba(255,255,255,0.92)' }}
        >
          Krupal Shah
        </Link>

        <nav className="flex gap-1 items-center">
          {NAV_LINKS.map(({ to, label }) => {
            const active = pathname.startsWith(to)
            return (
              <Link
                key={to}
                to={to}
                className="text-sm px-3 py-2 rounded-full border transition-colors"
                style={{
                  color: active ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.68)',
                  borderColor: active ? 'rgba(255,255,255,0.10)' : 'transparent',
                  background: active ? 'rgba(255,255,255,0.03)' : 'transparent',
                }}
              >
                {label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
