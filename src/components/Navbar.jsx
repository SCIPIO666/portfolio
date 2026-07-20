import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import Emblem from './Emblem'
import Label from './Label'
import CallToActionButton from './CallToActionButton'
const NAV_LINKS = [
  { to: '/about', label: <Label number="01." text="About"/>},
  { to: '/experience', label: <Label number="02." text="Experience"/> },
  { to: '/work', label: <Label number="03." text="Work"/> },
  { to: '/contact', label: <Label number="04." text="Contact"/> },
  { to: '/resume', label: <CallToActionButton text="Resume" callback={()=>{}}/> },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-bg/90 backdrop-blur">
      <nav className="w-full flex items-center justify-between px-6 py-4">
        <NavLink to="/" className="group flex items-center gap-2" aria-label="Home">
          <Emblem
            size={45}
            className="transition-transform duration-300 group-hover:rotate-[8deg] group-hover:scale-110"
          />
          <span className="font-mono text-sm tracking-widest text-primary">Scipio</span>
        </NavLink>

        {/* desktop*/}
        <div className="hidden md:flex gap-6">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `text-l font-medium transition ${
                  isActive ? 'text-primary' : 'text-muted hover:text-ink'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* mobile*/}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="md:hidden relative w-8 h-8 shrink-0 text-ink"
        >
          <span
            className={`absolute left-1/2 top-1/2 block h-0.5 w-6 -translate-x-1/2 bg-current transition duration-300 ${
              open ? 'rotate-45' : '-translate-y-2'
            }`}
          />
          <span
            className={`absolute left-1/2 top-1/2 block h-0.5 w-6 -translate-x-1/2 bg-current transition duration-300 ${
              open ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`absolute left-1/2 top-1/2 block h-0.5 w-6 -translate-x-1/2 bg-current transition duration-300 ${
              open ? '-rotate-45' : 'translate-y-2'
            }`}
          />
        </button>
      </nav>

      {/* mobile menu */}
      <div
        id="mobile-nav"
        className={`md:hidden overflow-hidden border-t border-border transition-[max-height] duration-300 ease-in-out ${
          open ? 'max-h-100vh' : 'max-h-0 border-t-0'
        }`}
      >
        <div className="flex flex-col px-6 py-2 w-3/5">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `py-3 text-sm font-medium border-b border-border/50 last:border-0 ${
                  isActive ? 'text-primary' : 'text-muted'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  )
}