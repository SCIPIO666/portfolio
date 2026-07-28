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

gsap.registerPlugin(ScrollTrigger)

const FRONT_LETTERS = 'FRONTEND'.split('')
const BACK_LETTERS = 'BACKEND'.split('')

export default function WorkPage() {
  const sectionRef = useRef(null)
  const stageRef = useRef(null)
  const laptopRef = useRef()
  const cardRefs = useRef([])
  const bounceRefs = useRef([])
  const bounceTweenRef = useRef(null)
  const cardsVisibleRef = useRef(false)
  const mobileCardRefs = useRef([])

  // the letter tiles themselves (animated out to reveal the laptop scene)
  const topPanelRefs = useRef([])
  const bottomPanelRefs = useRef([])
  // the solid-fill text layer inside each tile (stroke -> fill clip reveal)
  const letterTextRefs = useRef([])

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
            // stroke -> fill reveal for every letter tile, plays once on
            // enter, cascading outward from the center letter of each row
            gsap.to(letterTextRefs.current, {
              clipPath: 'inset(0% 0% 0% 0%)',
              duration: 0.8,
              ease: 'power3.out',
              stagger: { each: 0.025, from: 'center' },
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
              },
            })

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: stageRef.current,
                start: 'top top',
                end: '+=180%',
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

            // hold — nothing moves for a beat, so scrolling into the pin
            // just sits on FRONTEND / BACKEND fully revealed before anything
            // starts flying apart
            tl.to({}, { duration: 1 })

            // the "blinds" burst open — top row flies up, bottom row flies
            // down, each cascading outward from its center tile with a
            // slight fan-rotation, revealing the laptop underneath
            tl.to(topPanelRefs.current, {
              yPercent: -130,
              rotation: (i) => (i - (FRONT_LETTERS.length - 1) / 2) * 2,
              opacity: 0,
              filter: 'blur(8px)',
              ease: 'power2.in',
              stagger: { each: 0.035, from: 'center' },
            }, 'burst')
              .to(bottomPanelRefs.current, {
                yPercent: 130,
                rotation: (i) => (i - (BACK_LETTERS.length - 1) / 2) * 2,
                opacity: 0,
                filter: 'blur(8px)',
                ease: 'power2.in',
                stagger: { each: 0.035, from: 'center' },
              }, 'burst')
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
          } else {
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

  const renderLetterTile = (letter, i, { textColorVar, panelRefArray, textIndexOffset }) => (
    <div
      key={`${letter}-${i}-${textIndexOffset}`}
      ref={(el) => (panelRefArray.current[i] = el)}
      className="relative flex-1 h-full flex items-center justify-center bg-[var(--color-surface)] border-r border-[var(--color-border)] last:border-r-0 overflow-hidden"
    >
      <span
        aria-hidden="true"
        className="font-[var(--font-display)] text-6xl xl:text-7xl 2xl:text-8xl leading-none select-none"
        style={{ WebkitTextStroke: `2px var(${textColorVar})`, color: 'transparent' }}
      >
        {letter}
      </span>
      <span
        ref={(el) => (letterTextRefs.current[textIndexOffset + i] = el)}
        className="absolute inset-0 flex items-center justify-center font-[var(--font-display)] text-6xl xl:text-7xl 2xl:text-8xl leading-none select-none"
        style={{ color: `var(${textColorVar})`, clipPath: 'inset(0 100% 0 0)' }}
      >
        {letter}
      </span>
    </div>
  )

  return (
    <section ref={sectionRef} id="work" className="min-h-screen pt-24 md:mt-32 lg:mt-32">
      <PageHeader text="Projects I have Worked On" number="03." />

      {!isMobile && (
        <div
          ref={stageRef}
          className="hidden lg:block relative w-full h-[100vh] rounded-[var(--radius-panel)] overflow-hidden"
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

          <div className="absolute inset-0 z-10 flex flex-col">
            <div className="flex h-1/2 w-full border-b border-[var(--color-border)]">
              {FRONT_LETTERS.map((letter, i) =>
                renderLetterTile(letter, i, {
                  textColorVar: '--color-ink',
                  panelRefArray: topPanelRefs,
                  textIndexOffset: 0,
                })
              )}
            </div>
            <div className="flex h-1/2 w-full">
              {BACK_LETTERS.map((letter, i) =>
                renderLetterTile(letter, i, {
                  textColorVar: '--color-primary',
                  panelRefArray: bottomPanelRefs,
                  textIndexOffset: FRONT_LETTERS.length,
                })
              )}
            </div>
          </div>
        </div>
      )}

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