import React, { useRef } from 'react'
import PageHeader from '../components/PageHeader'
import { useSectionReveal } from '../components/ScrollEffects'
import { 
  SiReact, 
  SiTailwindcss, 
  SiGreensock, 
  SiHtml5,
  SiNodedotjs, 
  SiExpress, 
  SiPrisma, 
  SiPostgresql,
  SiGit, 
  SiGithub, 
  SiVite, 
  SiFigma 
} from 'react-icons/si'

export default function SkillsPage() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  
  useSectionReveal(sectionRef, {
    from: { opacity: 0, y: 60 },
    to: { opacity: 1, y: 0 },
    start: 'top 80%',
    scrub: false,
  })

  const skillGroups = [
    {
      title: "Frontend",
      romanNumeral: "I",
      skills: [
        {
          name: "React",
          icon: SiReact,
          description: "Component-based UI",
          glowColor: "hover:text-[#61DAFB]"
        },
        {
          name: "Tailwind CSS",
          icon: SiTailwindcss,
          description: "Utility-first styling",
          glowColor: "hover:text-[#06B6D4]"
        },
        {
          name: "GSAP",
          icon: SiGreensock,
          description: "High-performance animations",
          glowColor: "hover:text-[#88CE02]"
        },
        {
          name: "HTML",
          icon: SiHtml5,
          description: "Semantic markup",
          glowColor: "hover:text-[#E34F26]"
        },
      ]
    },
    {
      title: "Backend",
      romanNumeral: "II",
      skills: [
        {
          name: "Node.js",
          icon: SiNodedotjs,
          description: "Server-side JavaScript",
          glowColor: "hover:text-[#339933]"
        },
        {
          name: "Express",
          icon: SiExpress,
          description: "Web application framework",
          glowColor: "hover:text-[#000000]"
        },
        {
          name: "Prisma",
          icon: SiPrisma,
          description: "Type-safe ORM",
          glowColor: "hover:text-[#2D3748]"
        },
        {
          name: "PostgreSQL",
          icon: SiPostgresql,
          description: "Relational database",
          glowColor: "hover:text-[#4169E1]"
        },
      ]
    },
    {
      title: "Tools",
      romanNumeral: "III",
      skills: [
        {
          name: "Git",
          icon: SiGit,
          description: "Version control",
          glowColor: "hover:text-[#F05032]"
        },
        {
          name: "GitHub",
          icon: SiGithub,
          description: "Collaboration platform",
          glowColor: "hover:text-[#181717]"
        },
        {
          name: "Vite",
          icon: SiVite,
          description: "Modern build tool",
          glowColor: "hover:text-[#646CFF]"
        },
        {
          name: "Figma",
          icon: SiFigma,
          description: "Interface design",
          glowColor: "hover:text-[#F24E1E]"
        },
      ]
    }
  ]

  return (
    <section ref={sectionRef} id='skills' className='min-h-screen pt-24 md:pt-32 lg:pt-32 px-4 md:px-8'>
      <PageHeader text='Technical Skills' number='02.' />
      
      <div ref={contentRef} className='max-w-6xl mx-auto mt-12'>
        {/* Grid of skill groups */}
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
              <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6'>
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
                        text-primary
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
                        text-primary
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

        <div className='mt-20 text-center'>
          <p className='text-xs text-white/10 font-mono tracking-widest'>
            ✦ CONTINUOUSLY EXPANDING MY HORIZONS ✦
          </p>
        </div>
      </div>
    </section>
  )
}