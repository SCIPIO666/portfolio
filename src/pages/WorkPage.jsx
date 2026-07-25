import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PageHeader from '../components/PageHeader'
import { useSectionReveal } from '../components/ScrollEffects'
import LaptopScene from '../components/LaptopScene'
gsap.registerPlugin(ScrollTrigger)

export default function WorkPage() {
  const sectionRef = useRef(null)
  const stageRef = useRef(null)
  const frontRef = useRef(null)
  const backRef = useRef(null)
  const fullRef = useRef(null)
  const laptopRef = useRef()

  useSectionReveal(sectionRef, {
    from: { opacity: 0, y: 60 },
    to: { opacity: 1, y: 0 },
    start: 'top 80%',
    scrub: false,
  })
useGSAP(() => {
  const mm = gsap.matchMedia()

  mm.add(
    {
      isDesktop: '(min-width: 1024px)',
      isMobile: '(max-width: 1023px)',
    },
    (context) => {
      const { isDesktop } = context.conditions

      if (isDesktop) {
        //  pinned, scroll-scrubbed ,slider animation
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=100%',
            scrub: 1,
            pin: true,
          },
        })

        tl.to(frontRef.current, { xPercent: -100, opacity: 0, ease: 'none' })
          .to(backRef.current,  { xPercent: 100,  opacity: 0, ease: 'none' }, '<')
          .to(fullRef.current,  { yPercent: 100,  opacity: 0, ease: 'none' }, '<')
        tl.to(frontRef.current, { xPercent: -100, opacity: 0, ease: 'none' })

        tl.to(backRef.current,  { xPercent: 100,  opacity: 0, ease: 'none' }, '<')
        .to(fullRef.current,  { yPercent: 100,  opacity: 0, ease: 'none' }, '<')
        .to({}, {
          duration: 1,
          onUpdate: function () {
            laptopRef.current?.setOpenProgress(this.progress())
          },
        })
      } else {
        // mobile —  stagger reveal no pin/no scroll-scrub
        gsap.from([frontRef.current, backRef.current, fullRef.current], {
          opacity: 0,
          y: 40,
          stagger: 0.15,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        })
      }
    }
  )
}, { scope: stageRef })

  return (
    <section ref={sectionRef} id="work" className="min-h-screen pt-24 md:mt-32 lg:mt-32">
      <PageHeader text="Projects I have Worked On" number="03." />

      <div
        ref={stageRef}
        className="relative w-full h-[50vh] grid grid-cols-2 grid-rows-2  rounded-[var(--radius-panel)] overflow-hidden"
      >
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <LaptopScene ref={laptopRef} />.
        </div>

        <div ref={frontRef} className="relative z-10 flex items-center justify-center border-r border-b border-[var(--color-border)] border-r-primary border-b-primary bg-[var(--color-surface)]">
          <h1 className="font-[var(--font-display)] text-[var(--text-hero)] text-[var(--color-ink)] leading-[var(--leading-tight)]">Front&#8209;End</h1>
        </div>

        <div ref={backRef} className="relative z-10 flex items-center justify-center border-b border-[var(--color-border)] bg-[var(--color-surface)] border-l-primary border-b-primary">
          <h1 className="font-[var(--font-display)] text-[var(--text-hero)] text-[var(--color-ink)] leading-[var(--leading-tight)]">Back&#8209;End</h1>
        </div>

        <div ref={fullRef} className="relative z-10 col-span-2 flex items-center justify-center bg-[var(--color-surface)]">
          <h1 className="font-[var(--font-display)] text-[var(--text-hero)] text-[var(--color-primary)] leading-[var(--leading-tight )] border-t-primary">Full&#8209;Stack</h1>
        </div>
      </div>
    </section>
  )
}