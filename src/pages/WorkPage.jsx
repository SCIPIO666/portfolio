import React, { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PageHeader from '../components/PageHeader'
import { useSectionReveal } from '../components/ScrollEffects'
import LaptopScene from '../components/LaptopScene'
import { projects } from '../data/projects'
import ProjectModal from '../components/ProjectModal'
import ProjectCard from '../components/ProjectCard'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

export default function WorkPage() {
  const sectionRef = useRef(null)
  const stageRef = useRef(null)
  const frontRef = useRef(null)
  const backRef = useRef(null)
  const fullRef = useRef(null)
  const laptopRef = useRef()
  const cardRefs = useRef([])
  const bounceRefs = useRef([])
  const bounceTweenRef = useRef(null)
  const cardsVisibleRef = useRef(false)
  const mobileCardRefs = useRef([])
  const frontTextRef = useRef(null)
  const backTextRef = useRef(null)
  const fullTextRef = useRef(null)
  const [selectedProject, setSelectedProject] = useState(null)
  const isMobile = window.innerWidth < 1024

  const cardOffsets = [
    { x: -260, y: -140 },
    { x: 0, y: -180 },
    { x: 260, y: -140 },
    { x: -260, y: 140 },
    { x: 0, y: 180 },
    { x: 260, y: 140 },
  ]

  useSectionReveal(sectionRef, {
    from: { opacity: 0, y: 60 },
    to: { opacity: 1, y: 0 },
    start: 'top 80%',
    scrub: false,
  })

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(
        {
          isDesktop: '(min-width: 1024px)',
          isMobile: '(max-width: 1023px)',
        },
        (context) => {
          const { isDesktop } = context.conditions

          if (isDesktop) {
            // Split text into individual characters
            const frontSplit = new SplitType(frontTextRef.current, { types: 'chars' })
            const backSplit = new SplitType(backTextRef.current, { types: 'chars' })
            const fullSplit = new SplitType(fullTextRef.current, { types: 'chars' })
            
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top top',
                end: '+=100%',
                scrub: 1,
                pin: true,
                onUpdate: () => {
                  const cardsVisible = tl.progress() > 0.8

                  if (cardsVisible && !cardsVisibleRef.current) {
                    cardsVisibleRef.current = true
                    bounceTweenRef.current = gsap.to(bounceRefs.current, {
                      y: '+=10',
                      duration: 1.4,
                      ease: 'sine.inOut',
                      yoyo: true,
                      repeat: -1,
                      stagger: { each: 0.15, from: 'random' },
                    })
                  } else if (!cardsVisible && cardsVisibleRef.current) {
                    cardsVisibleRef.current = false
                    bounceTweenRef.current?.kill()
                    gsap.set(bounceRefs.current, { y: 0 })
                  }
                },
              },
            })

            // Panel slide-out with synchronized letter animations
            tl.to(frontRef.current, { xPercent: -100, opacity: 0, ease: 'none' })
              .to(frontSplit.chars, { 
                xPercent: -80, 
                opacity: 0, 
                filter: 'blur(6px)', 
                stagger: 0.02, 
                ease: 'none' 
              }, '<')
              .to(backRef.current, { xPercent: 100, opacity: 0, ease: 'none' }, '<')
              .to(backSplit.chars, { 
                xPercent: 80, 
                opacity: 0, 
                filter: 'blur(6px)', 
                stagger: 0.02, 
                ease: 'none' 
              }, '<')
              .to(fullRef.current, { yPercent: 100, opacity: 0, ease: 'none' }, '<')
              .to(fullSplit.chars, { 
                yPercent: 60, 
                opacity: 0, 
                filter: 'blur(6px)', 
                stagger: 0.02, 
                ease: 'none' 
              }, '<')
              .to({}, {
                duration: 1,
                onUpdate: function () {
                  laptopRef.current?.setOpenProgress(this.progress())
                },
              })
              .to(cardRefs.current, {
                opacity: 1,
                x: (i) => cardOffsets[i]?.x || 0,
                y: (i) => cardOffsets[i]?.y || 0,
                stagger: 0.1,
                ease: 'back.out(1.4)',
              })

            // Cleanup function to revert SplitType instances
            return () => {
              frontSplit.revert()
              backSplit.revert()
              fullSplit.revert()
            }
          } else {
            // Mobile — simple reveal, cards only, no panels/pin/laptop involved
            gsap.from(mobileCardRefs.current, {
              opacity: 0,
              y: 40,
              stagger: 0.15,
              duration: 0.6,
              ease: 'power2.out',
            })
          }
        }
      )

      return () => {
        bounceTweenRef.current?.kill()
      }
    },
    { scope: stageRef }
  )

  return (
    <section ref={sectionRef} id="work" className="min-h-screen pt-24 md:mt-32 lg:mt-32">
      <PageHeader text="Projects I have Worked On" number="03." />

      {/* Desktop — full animation with 3D */}
      {!isMobile && (
        <div
          ref={stageRef}
          className="hidden lg:grid relative w-full h-[100vh] grid-cols-3 grid-rows-1 rounded-[var(--radius-panel)] overflow-hidden"
        >
          <div className="absolute inset-0 flex items-center justify-center z-0">
            <LaptopScene ref={laptopRef} />
            {projects.map((project, i) => (
              <ProjectCard
                key={project.id}
                ref={(el) => (cardRefs.current[i] = el)}
                innerRef={(el) => (bounceRefs.current[i] = el)}
                onClick={() => setSelectedProject(project)}
                title={project.title}
                image={project.mainImage}
              />
            ))}
          </div>

          <div ref={frontRef} className="relative z-10 flex items-center justify-center border-r border-[var(--color-border)] bg-[var(--color-surface)]">
            <h1 ref={frontTextRef} className="font-[var(--font-display)] text-[var(--text-hero)] text-[var(--color-ink)] leading-[var(--leading-tight)]">
              Front‑End
            </h1>
          </div>

          <div ref={backRef} className="relative z-10 flex items-center justify-center border-r border-[var(--color-border)] bg-[var(--color-surface)]">
            <h1 ref={backTextRef} className="font-[var(--font-display)] text-[var(--text-hero)] text-[var(--color-ink)] leading-[var(--leading-tight)]">
              Back‑End
            </h1>
          </div>

          <div ref={fullRef} className="relative z-10 flex items-center justify-center bg-[var(--color-surface)]">
            <h1 ref={fullTextRef} className="font-[var(--font-display)] text-[var(--text-hero)] text-[var(--color-primary)] leading-[var(--leading-tight)]">
              Full‑Stack
            </h1>
          </div>
        </div>
      )}

      {/* Mobile — grid, no 3D */}
      {isMobile && (
        <div className="mt-8 grid grid-cols-2 gap-4 place-items-center px-4">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              ref={(el) => (mobileCardRefs.current[i] = el)}
              variant="grid"
              onClick={() => setSelectedProject(project)}
              title={project.title}
              image={project.mainImage}
            />
          ))}
        </div>
      )}

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  )
}