
import { NavLink } from 'react-router-dom'
import Emblem from './Emblem'

const NAV_LINKS = [
  { to: '/about', label: '01.About' },
  { to: '/experience', label: '02.Experience' },
  { to: '/work', label: '03.Work' },
  { to: '/contact', label: '04.Contact' },
  { to: '/resume', label: 'Resume' },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-bg/90 backdrop-blur">
      <nav className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
        <NavLink to="/" className="group flex items-center gap-2" aria-label="Home">
          <Emblem
            size={30}
            className="transition-transform duration-300 group-hover:rotate-[8deg] group-hover:scale-110"
          />
          <span className="font-mono text-sm tracking-widest text-primary">Scipio</span>
        </NavLink>

        <div className="flex gap-6">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive ? 'text-primary' : 'text-muted hover:text-ink'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  )
}