import React, { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PageHeader from '../components/PageHeader'
import { useSectionReveal } from '../components/ScrollEffects'
import { skillGroups } from '../data/skills'
import CurveDivider from '../components/CurveDivider'
gsap.registerPlugin(ScrollTrigger)

// true on devices with a real mouse (fine pointer + hover capability),
// false on touch devices — used to skip the hover-driven interaction
// and render cards permanently in their "opened" end state instead.
function useHasHover() {
  const [hasHover, setHasHover] = useState(true)

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    setHasHover(mq.matches)
    const listener = (e) => setHasHover(e.matches)
    mq.addEventListener('change', listener)
    return () => mq.removeEventListener('change', listener)
  }, [])

  return hasHover
}

export default function SkillsPage() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const hasHover = useHasHover()

  useSectionReveal(sectionRef, {
    from: { opacity: 0, y: 60 },
    to: { opacity: 1, y: 0 },
    start: 'top 80%',
    scrub: false,
  })

  useGSAP(
    () => {
      const groups = gsap.utils.toArray('.skill-group', sectionRef.current)

      groups.forEach((group) => {
        const cards = group.querySelectorAll('.skill-card')

        gsap.from(cards, {
          opacity: 1,
          y: -70,
          scale: 0.9,
          duration: 0.7,
          ease: 'back.out(1.4)',
          stagger: 0.06,
          scrollTrigger: {
            trigger: group,
            start: 'top 80%',
            toggleActions: 'play reverse play reverse',
          },
        })
      })
    },
    { scope: sectionRef }
  )

  // mobile
  const openStyle = {
    boxShadow: '0 0 0 1px rgba(244,196,48,0.45), 0 18px 45px rgba(0,0,0,0.45), 0 0 42px rgba(244,196,48,0.4)',
    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    WebkitClipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    transform: 'scale(1)',
    borderRadius: '20px',
  }
//desktop
  const closedStyle = {
    boxShadow: 'inset 0 0 25px rgba(244,196,48,0.05), 0 10px 30px rgba(0,0,0,0.35)',
    clipPath: 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)',
    WebkitClipPath: 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)',
    transform: 'scale(1)',
    borderRadius: '0px',
  }

  return (
    <section ref={sectionRef} id="skills" className="relative min-h-screen pt-24 md:pt-32 lg:pt-32 px-4 md:px-8">
      <PageHeader text="Technical Skills" number="02." />

      <div ref={contentRef} className="max-w-6xl mx-auto mt-12">
        <div className="space-y-16">
          {skillGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="skill-group">
              <div className="mb-6 flex items-center gap-4">
                <h3 className="text-2xl font-bold text-white/90 tracking-tight">{group.title}</h3>
                <span className="text-xs font-mono text-white/20 tracking-widest">{group.romanNumeral}</span>
                <div className="flex-1 h-px bg-gradient-to-r from-white/5 to-transparent" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {group.skills.map((skill, skillIndex) => {
                  const Icon = skill.icon
                  return (
                    <div
                      key={skillIndex}
                      className="
                        skill-card
                        group
                        relative
                        bg-[var(--color-surface)]
                        border border-[var(--color-border)]
                        transition-all
                        duration-500
                        ease-out
                        hover:border-white/20
                        cursor-default
                        flex
                        items-center
                        justify-center
                        aspect-square
                      "
                      style={hasHover ? closedStyle : openStyle}
                      onMouseEnter={(e) => {
                        if (!hasHover) return
                        e.currentTarget.style.clipPath = openStyle.clipPath
                        e.currentTarget.style.WebkitClipPath = openStyle.WebkitClipPath
                        e.currentTarget.style.transform = 'scale(1.05) translateY(-8px)'
                        e.currentTarget.style.borderRadius = openStyle.borderRadius
                        e.currentTarget.style.boxShadow = openStyle.boxShadow
                      }}
                      onMouseLeave={(e) => {
                        if (!hasHover) return
                        e.currentTarget.style.clipPath = closedStyle.clipPath
                        e.currentTarget.style.WebkitClipPath = closedStyle.WebkitClipPath
                        e.currentTarget.style.transform = 'scale(1) translateY(0px)'
                        e.currentTarget.style.borderRadius = closedStyle.borderRadius
                        e.currentTarget.style.boxShadow = closedStyle.boxShadow
                      }}
                    >
                      {/* parallelogram -desktop*/}
                      <div
                        className="
                          absolute
                          inset-0
                          opacity-5
                          pointer-events-none
                          transition-all
                          duration-500
                          group-hover:opacity-10
                        "
                        style={{
                          background: 'linear-gradient(135deg, #6366f1, #22d3ee)',
                          clipPath: hasHover ? closedStyle.clipPath : openStyle.clipPath,
                          WebkitClipPath: hasHover ? closedStyle.WebkitClipPath : openStyle.WebkitClipPath,
                          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                      />

                      {/* roman numeral */}
                      <span className="absolute top-3 right-4 text-4xl font-bold text-white/5 font-serif select-none pointer-events-none">
                        {group.romanNumeral}
                      </span>

                      {/* wrapper */}
                      <div className="relative z-10 flex flex-col items-center justify-center p-4 w-full h-full">
                        {/* icon */}
                        <div
                          className={`flex items-center justify-center w-16 h-16 mb-4 text-4xl transition-all duration-300 ${
                            hasHover
                              ? 'group-hover:scale-110 group-hover:rotate-[-8deg]'
                              : 'scale-110 rotate-[-8deg]'
                          }`}
                        >
                          <Icon className="transition-colors duration-300" style={{ color: skill.color }} />
                        </div>

                        {/* skill name */}
                        <h4 className="text-center text-sm font-semibold text-white/90 mb-1 tracking-tight">
                          {skill.name}
                        </h4>

                        {/* description — permanently visible + primary-tinted on touch devices */}
                        <p
                          className={`text-center text-xs leading-relaxed transition-all duration-300 ease-out ${
                            hasHover
                              ? 'text-white/40 opacity-0 translate-y-2 group-hover:text-[var(--color-primary-soft)] group-hover:opacity-100 group-hover:translate-y-0'
                              : 'text-[var(--color-primary-soft)] opacity-100 translate-y-0'
                          }`}
                        >
                          {skill.description}
                        </p>
                      </div>

                      {/* glow overlay */}
                      <div
                        className={`absolute inset-0 pointer-events-none bg-gradient-to-br from-white/5 to-transparent transition-all duration-500 ${
                          hasHover ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
                        }`}
                        style={{
                          clipPath: hasHover ? closedStyle.clipPath : openStyle.clipPath,
                          WebkitClipPath: hasHover ? closedStyle.WebkitClipPath : openStyle.WebkitClipPath,
                          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-xs text-white/50 font-mono tracking-widest">CONTINUOUSLY EXPANDING MY HORIZONS</p>
        </div>
      </div>
      <CurveDivider variant="peak" flip height={300} />
    </section>
  )
}