import { useState, useEffect } from 'react'
import Emblem from './Emblem'
import Label from './Label'
import CallToActionButton from './CallToActionButton'

const NAV_LINKS = [
  { location: '#about', label: <Label number="01." text="About"/>},
  { location: '#experience', label: <Label number="02." text="Experience"/> },
  { location: '#work', label: <Label number="03." text="Work"/> },
  { location: '#contact', label: <Label number="04." text="Contact"/> },
  { location: '/resume.pdf', label: <CallToActionButton text="Resume" callback={()=>{}}/> },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  // Close menu 
  useEffect(() => {
    const handleClickOutside = (e) => {
      const nav = document.getElementById('mobile-nav')
      const button = document.querySelector('button[aria-label]')
      if (open && nav && !nav.contains(e.target) && !button?.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [open])

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-bg/90 backdrop-blur">
      <nav className="w-full flex items-center justify-between px-6 py-4">
        <a href="#hero" className="group flex items-center gap-2" aria-label="Home">
          <Emblem
            size={45}
            className="transition-transform duration-300 group-hover:rotate-[8deg] group-hover:scale-110"
          />
          <span className="font-mono text-sm tracking-widest text-primary">Scipio</span>
        </a>

        {/* desktop */}
        <div className="hidden md:flex gap-6 items-center">
          {NAV_LINKS.map(({ location, label }) => (
            <a href={location} key={location} className="">
              {label}
            </a>
          ))}
        </div>

        {/* mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="md:hidden relative w-8 h-8 shrink-0 text-ink z-30"
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

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Mobile drawer - slides from right */}
      <div
        id="mobile-nav"
        className={`fixed top-0 right-0 h-screen w-4/5 pt-0 max-w-sm bg-bg border-l border-border shadow-xl transition-transform duration-300 ease-in-out md:hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 px-6">
          {NAV_LINKS.map(({ location, label }) => (
            <a
              href={location}
              key={location}
              className="text-lg hover:text-primary transition-colors"
              onClick={() => setOpen(false)} 
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </header>
  )
}