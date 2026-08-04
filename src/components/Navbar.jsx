import { useState, useEffect } from 'react'
import Emblem from './Emblem'
import Label from './Label'
import CallToActionButton from './CallToActionButton'
import { scrollToElement } from '../lib/useSmoothScroll'

const NAV_LINKS = [
  { id: 'about', number: '01.', text: 'About' },
  { id: 'skills', number: '02.', text: 'Skills' },
  { id: 'work', number: '03.', text: 'Work' },
  { id: 'contact', number: '04.', text: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  // navigation click with smooth scroll
  const handleNavClick = (sectionId, e) => {
    e.preventDefault();
    setOpen(false);
    
    // delay for menu close
    setTimeout(() => {
      // offset for sticky navbar
      const navbar = document.querySelector('header');
      const navbarHeight = navbar ? navbar.offsetHeight : 80;
      
      scrollToElement(sectionId, {
        offset: -navbarHeight - 20, // extra padding
        duration: 1.5,
      });
    }, 100);
  };

  // active section on scroll
  useEffect(() => {
    const sections = NAV_LINKS.map(link => document.getElementById(link.id));
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-50% 0px -50% 0px', // middle of viewport
        threshold: 0,
      }
    );

    sections.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  // escape key close menu
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      const nav = document.getElementById('mobile-nav');
      const button = document.querySelector('button[aria-label]');
      if (open && nav && !nav.contains(e.target) && !button?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  // mobile menu open - prevent body scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-border bg-bg/90 backdrop-blur">
        <nav className="w-full flex items-center justify-between px-6 py-2">
          <a 
            href="#hero" 
            className="group flex items-center gap-2" 
            aria-label="Home"
            onClick={(e) => {
              e.preventDefault();
              scrollToElement('hero', {
                offset: -20,
                duration: 1.2,
              });
            }}
          >
            <Emblem
              size={45}
              className="transition-transform duration-300 group-hover:rotate-[8deg] group-hover:scale-110"
            />
            <span className="font-mono text-sm tracking-widest text-primary">Scipio</span>
          </a>

          {/* desktop */}
          <div className="hidden md:flex gap-6 items-center">
            {NAV_LINKS.map(({ id, number, text }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => handleNavClick(id, e)}
                className={`relative font-mono text-sm transition-colors duration-300 group ${
                  activeSection === id ? 'text-primary' : 'text-muted hover:text-ink'
                }`}
              >
                <span className="text-primary/60 mr-1">{number}</span>
                {text}
                {/* Active indicator line */}
                <span 
                  className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                    activeSection === id ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </a>
            ))}
            <CallToActionButton 
              text="Resume" 
              callback={() => {
                window.open('/resume.pdf', '_blank');
              }}
            />
          </div>

          {/* hamburger menu button */}
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
      </header>

      {/* Overlay - moved outside header */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden z-[100] ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setOpen(false)}
      />

      <div
        id="mobile-nav"
        className={`fixed top-0 right-0 h-screen w-4/5 max-w-sm bg-bg border-l border-border shadow-xl transition-transform duration-300 ease-in-out md:hidden z-[101] ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 px-6">
          {NAV_LINKS.map(({ id, number, text }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`text-lg transition-colors duration-300 ${
                activeSection === id ? 'text-primary' : 'text-muted hover:text-ink'
              }`}
              onClick={(e) => handleNavClick(id, e)}
            >
              <span className="text-primary/60 mr-2">{number}</span>
              {text}
            </a>
          ))}
          <CallToActionButton 
            text="Resume" 
            callback={() => {
              window.open('/resume.pdf', '_blank');
              setOpen(false);
            }}
          />
        </div>
      </div>
    </>
  )
}