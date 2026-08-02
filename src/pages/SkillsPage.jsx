import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PageHeader from '../components/PageHeader'
import { useSectionReveal } from '../components/ScrollEffects'
import { skillGroups } from '../data/skills'

gsap.registerPlugin(ScrollTrigger)

export default function SkillsPage() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)

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
        opacity: 0.5,
        y: -70,      
        scale: 0.9,
        duration: 0.7,
        ease: 'back.out(1.4)',  
        stagger: 0.06,
        scrollTrigger: {
          trigger: group,   
          start: 'top 80%',
          toggleActions: "play reverse play reverse",
          
        },
      })
    })
  },
  { scope: sectionRef }
)

  return (
    <section ref={sectionRef} id="skills" className="min-h-screen pt-24 md:pt-32 lg:pt-32 px-4 md:px-8">
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
                        hover:shadow-[inset_0_0_35px_rgba(244,196,48,0.10),0_18px_45px_rgba(0,0,0,0.45),0_0_18px_rgba(244,196,48,0.18)]
                        cursor-default
                        flex
                        items-center
                        justify-center
                        aspect-square
                      "
                      style={{
                        boxShadow: 'inset 0 0 25px rgba(244,196,48,0.05), 0 10px 30px rgba(0,0,0,0.35)',
                        clipPath: 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)',
                        WebkitClipPath: 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)',
                        transform: 'scale(1)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.clipPath = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
                        e.currentTarget.style.WebkitClipPath = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
                        e.currentTarget.style.transform = 'scale(1.05) translateY(-8px)'
                        e.currentTarget.style.borderRadius = '20px'
                        e.currentTarget.style.boxShadow =
                          '0 0 0 1px rgba(244,196,48,0.45), 0 18px 45px rgba(0,0,0,0.45), 0 0 42px rgba(244,196,48,0.4)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.clipPath = 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)'
                        e.currentTarget.style.WebkitClipPath = 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)'
                        e.currentTarget.style.transform = 'scale(0.9) translateY(0px)'
                        e.currentTarget.style.borderRadius = '0px'
                        e.currentTarget.style.boxShadow =
                          'inset 0 0 25px rgba(244,196,48,0.05), 0 10px 30px rgba(0,0,0,0.35)'
                      }}
                    >
                      {/* parallelogram  */}
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
                          clipPath: 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)',
                          WebkitClipPath: 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)',
                          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                      />

                      {/* roman numeral*/}
                      <span className="absolute top-3 right-4 text-4xl font-bold text-white/5 font-serif select-none pointer-events-none">
                        {group.romanNumeral}
                      </span>

                      {/* wrapper */}
                      <div className="relative z-10 flex flex-col items-center justify-center p-4 w-full h-full">
                        {/* icon */}
                        <div className="flex items-center justify-center w-16 h-16 mb-4 text-4xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-[-8deg]">
                          <Icon className="transition-colors duration-300" style={{ color: skill.color }} />
                        </div>

                        {/* skill */}
                        <h4 className="text-center text-sm font-semibold text-white/90 mb-1 tracking-tight">
                          {skill.name}
                        </h4>

                        {/* description */}
                        <p className="text-center text-xs text-white/40 group-hover:text-[var(--color-primary-soft)] opacity-0 translate-y-2 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0 leading-relaxed">
                          {skill.description}
                        </p>
                      </div>

                      {/*glow overlay */}
                      <div 
                        className="absolute inset-0 opacity-0 transition-all duration-500 group-hover:opacity-100 pointer-events-none bg-gradient-to-br from-white/5 to-transparent"
                        style={{
                          clipPath: 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)',
                          WebkitClipPath: 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)',
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
          <p className="text-xs text-white/10 font-mono tracking-widest">CONTINUOUSLY EXPANDING MY HORIZONS</p>
        </div>
      </div>
    </section>
  )
}