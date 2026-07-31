import React, { useRef } from 'react'
import PageHeader from '../components/PageHeader'
import { useSectionReveal } from '../components/ScrollEffects'
import { 
  SiReact, 
  SiTailwindcss, 
  SiGreensock, 
  SiHtml5,
  SiJavascript,
  SiNodedotjs, 
  SiExpress, 
  SiPrisma, 
  SiPostgresql,
  SiGit, 
  SiGithub, 
  SiVite, 
  SiFigma,
  SiSqlite
} from 'react-icons/si'

import skillGroups from '../data/skills'

export default function SkillsPage() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  
  useSectionReveal(sectionRef, {
    from: { opacity: 0, y: 60 },
    to: { opacity: 1, y: 0 },
    start: 'top 80%',
    scrub: false,
  })


  return (
    <section ref={sectionRef} id='skills' className='min-h-screen pt-24 md:pt-32 lg:pt-32 px-4 md:px-8'>
      <PageHeader text='Technical Skills' number='02.' />
      
      <div ref={contentRef} className='max-w-6xl mx-auto mt-12'>
        {/*skill groups */}
        <div className='space-y-16'>
          {skillGroups.map((group, groupIndex) => (
            <div key={groupIndex}>
              {/* Group header */}
              <div className='mb-6 flex items-center gap-4'>
                <h3 className='text-2xl font-bold text-white/90 tracking-tight'>
                  {group.title}
                </h3>
                <span className='text-xs font-mono text-white/20 tracking-widest'>
                  {group.romanNumeral}
                </span>
                <div className='flex-1 h-px bg-gradient-to-r from-white/5 to-transparent' />
              </div>

              {/* Skills grid */}
              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6'>
                {group.skills.map((skill, skillIndex) => {
                  const Icon = skill.icon
                  return (
                    <div
                      key={skillIndex}
                      className='
                        group
                        relative
                        bg-[var(--color-surface)]
                        border border-[var(--color-border)]
                        rounded-[20px]
                        p-6
                        transition-all
                        duration-300
                        ease-out
                        hover:translate-y-[-8px]
                        hover:border-white/20
                        hover:shadow-[inset_0_0_35px_rgba(244,196,48,0.10),0_18px_45px_rgba(0,0,0,0.45),0_0_18px_rgba(244,196,48,0.18)]
                        cursor-default
                      '
                      style={{
                        boxShadow: 'inset 0 0 25px rgba(244,196,48,0.05), 0 10px 30px rgba(0,0,0,0.35)',
                        transitionDelay: `${skillIndex * 80}ms`
                      }}
                    >
                      {/* Roman numeral background */}
                      <span className='
                        absolute 
                        top-3 
                        right-4 
                        text-4xl 
                        font-bold 
                        text-white/5 
                        font-serif
                        select-none
                        pointer-events-none
                      '>
                        {group.romanNumeral}
                      </span>

                      {/* Icon */}
                      <div className='
                        flex 
                        items-center 
                        justify-center 
                        w-16 
                        h-16 
                        mx-auto 
                        mb-4
                        text-4xl
                        text-white/60
                        transition-all
                        duration-300
                        group-hover:scale-110
                        group-hover:rotate-[-8deg]
                      '>
                        <Icon 
                          className={`
                            transition-colors 
                            duration-300 
                            ${skill.glowColor}
                          `} 
                        />
                      </div>

                      {/* Skill name */}
                      <h4 className='
                        text-center 
                        text-sm 
                        font-semibold 
                        text-white/90 
                        mb-1
                        tracking-tight
                      '>
                        {skill.name}
                      </h4>

                      {/* Description - appears on hover */}
                      <p className='
                        text-center 
                        text-xs 
                        text-white/40
                        opacity-0
                        translate-y-2
                        transition-all
                        duration-300
                        ease-out
                        group-hover:opacity-100
                        group-hover:translate-y-0
                        leading-relaxed
                      '>
                        {skill.description}
                      </p>

                      {/* Hover glow overlay */}
                      <div className='
                        absolute 
                        inset-0 
                        rounded-[20px] 
                        opacity-0 
                        transition-opacity 
                        duration-300
                        group-hover:opacity-100
                        pointer-events-none
                        bg-gradient-to-br 
                        from-white/5 
                        to-transparent
                      ' />
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Optional: Subtle footer note */}
        <div className='mt-20 text-center'>
          <p className='text-xs text-white/10 font-mono tracking-widest'>
            CONTINUOUSLY EXPANDING MY HORIZONS
          </p>
        </div>
      </div>
    </section>
  )
}