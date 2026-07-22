import Label from './Label'
import { scrollToSection } from '../lib/lenis'

const NAV_LINKS = [
  { location: '#about', label: <Label number="01." text="About" /> },
  { location: '#experience', label: <Label number="02." text="Experience" /> },
  { location: '#work', label: <Label number="03." text="Work" /> },
  { location: '#contact', label: <Label number="04." text="Contact" /> },
]

export default function Header() {
  const handleClick = (e, location) => {
    e.preventDefault()
    scrollToSection(location)
  }

  return (

    <header className="hidden lg:flex flex-col justify-between fixed left-0 top-0 h-screen w-[40%] px-12 py-16 z-10">
      <div className="max-w-md">
        <a href="#hero" onClick={(e) => handleClick(e, '#hero')}>
          <h1 className="text-3xl font-display font-bold text-ink">
            Esphoney Scipio
          </h1>
          <h2 className="text-lg text-muted mt-2">
            I engineer digital solutions for the web.
          </h2>
        </a>
        <p className="text-muted mt-4">
          Web developer focused on exceptional digital experiences for the
          medical industry.
        </p>
      </div>

      <nav>
        <ul className="flex flex-col gap-4">
          {NAV_LINKS.map(({ location, label }) => (
            <li key={location}>
              <a
                href={location}
                onClick={(e) => handleClick(e, location)}
                className="group flex items-center gap-3 text-muted hover:text-ink transition"
              >
                <span className="h-px w-8 bg-current transition-all duration-300 group-hover:w-16" />
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
