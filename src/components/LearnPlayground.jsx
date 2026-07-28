import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function LearnPlayground() {

  const section1Ref = useRef(null)
  const section2Ref = useRef(null)
  const section3Ref = useRef(null)
  
  // Section 1 refs
  const panel1Ref = useRef(null)
  const panel2Ref = useRef(null)
  const panel3Ref = useRef(null)
  
  // Section 2 refs
  const cardRefs = useRef([])
  
  // Section 3 refs
  const timelineRef = useRef(null)
  const progressRef = useRef(null)
  const controlsRef = useRef(null)
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  
  // SECTION 1: Basic Scroll-Triggered Timeline
  useGSAP(() => {
    //  a single timeline for section 1
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section1Ref.current,
        start: 'top top',
        end: '+=100%',
        scrub: 1,
        pin: true,
        pinSpacing: true,
        markers: true,
        toggleActions: 'play pause resume reset',
        onUpdate: (self) => {
          console.log('Progress:', self.progress)
        },
        onEnter: () => console.log('Section entered!'),
        onLeave: () => console.log('Section left!'),
      }
    })

    // Animate panels sequentially
    tl.fromTo(panel1Ref.current, 
      { x: -200, opacity: 0, rotation: 0 },
      { x: 0, opacity: 1, rotation: 360, duration: 1, ease: 'power2.out' }
    )
    .fromTo(panel2Ref.current,
      { x: 200, opacity: 0, scale: 0.5 },
      { x: 0, opacity: 1, scale: 1, duration: 1, ease: 'power2.out' },
      '-=0.5' // Overlap slightly
    )
    .fromTo(panel3Ref.current,
      { y: 100, opacity: 0, scale: 0.8 },
      { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power2.out' },
      '-=0.5'
    )

    // Store timeline ref for later use
    timelineRef.current = tl

    return () => {
      tl.kill()
    }
  }, { scope: section1Ref })
  
  // SECTION 2: Scroll + Modal (The Bug Isolated)
  useGSAP(() => {
    // Animate cards on scroll
    gsap.fromTo(cardRefs.current,
      { opacity: 0, y: 60, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: section2Ref.current,
          start: 'top 70%',
          end: 'bottom 30%',
          scrub: 0.5,
          markers: true,
          toggleActions: 'play none none reverse'
        }
      }
    )
  }, { scope: section2Ref })
  
  // SECTION 3: Advanced Timeline Control
  useGSAP(() => {
    const tl = gsap.timeline({
      paused: true,
      defaults: { duration: 0.6, ease: 'power2.out' }
    })

    // Create a box that does multiple animations
    const box = controlsRef.current
    
    tl.to(box, { x: 100, rotation: 45, backgroundColor: '#f4c430' })
      .to(box, { y: 100, rotation: 90, backgroundColor: '#ff6b57' })
      .to(box, { x: 0, y: 0, rotation: 180, backgroundColor: '#8578c9' })
      .to(box, { rotation: 360, backgroundColor: '#120f2e' })

    // Store for control buttons
    timelineRef.current = tl

    // Updating progress bar
    const updateProgress = () => {
      if (progressRef.current) {
        progressRef.current.style.width = `${tl.progress() * 100}%`
      }
    }

    tl.eventCallback('onUpdate', updateProgress)

    return () => {
      tl.kill()
    }
  }, { scope: section3Ref })

  // Modal handlers
  const openModal = (item) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedItem(null)
  }

  // Timeline controls
  const playTimeline = () => {
    if (timelineRef.current) {
      timelineRef.current.play()
    }
  }

  const pauseTimeline = () => {
    if (timelineRef.current) {
      timelineRef.current.pause()
    }
  }

  const reverseTimeline = () => {
    if (timelineRef.current) {
      timelineRef.current.reverse()
    }
  }

  const restartTimeline = () => {
    if (timelineRef.current) {
      timelineRef.current.restart()
    }
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-white p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">GSAP + Lenis Learning Playground</h1>
      
      {/* Section 1 */}
      <section ref={section1Ref} className="min-h-screen flex flex-col items-center justify-center gap-6 relative">
        <h2 className="text-2xl font-bold text-[var(--color-primary)]">Section 1: Basic Scroll Timeline</h2>
        <p className="text-sm text-[var(--color-muted)]">Scroll down to see panels animate</p>
        
        <div ref={panel1Ref} className="w-[120px] h-[120px] rounded-full bg-[var(--color-primary)] flex items-center justify-center text-[var(--color-primary-ink)] font-bold">
          Panel 1
        </div>
        <div ref={panel2Ref} className="w-[120px] h-[120px] rounded-full bg-[var(--color-accent)] flex items-center justify-center text-[var(--color-accent-ink)] font-bold">
          Panel 2
        </div>
        <div ref={panel3Ref} className="w-[120px] h-[120px] rounded-full bg-[#8578c9] flex items-center justify-center text-white font-bold">
          Panel 3
        </div>
      </section>
      
      {/* Section 2 */}
      <section ref={section2Ref} className="min-h-screen flex flex-col items-center justify-center gap-6">
        <h2 className="text-2xl font-bold text-[var(--color-primary)]">Section 2: Scroll + Modal</h2>
        <p className="text-sm text-[var(--color-muted)]">Click a card → modal opens → close preserves state</p>
        
        <div className="grid grid-cols-3 gap-4">
          {['Project A', 'Project B', 'Project C'].map((item, i) => (
            <div
              key={i}
              ref={(el) => (cardRefs.current[i] = el)}
              onClick={() => openModal(item)}
              className="w-40 h-40 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
            >
              <span className="font-bold">{item}</span>
            </div>
          ))}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={closeModal}>
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-8 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-xl font-bold mb-2">{selectedItem}</h3>
              <p className="text-[var(--color-muted)] mb-4">Modal content goes here</p>
              <button onClick={closeModal} className="px-4 py-2 bg-[var(--color-primary)] text-[var(--color-primary-ink)] rounded-full">
                Close
              </button>
            </div>
          </div>
        )}
      </section>
      
      {/* Section 3 */}
      <section ref={section3Ref} className="min-h-screen flex flex-col items-center justify-center gap-6">
        <h2 className="text-2xl font-bold text-[var(--color-primary)]">Section 3: Timeline Controls</h2>
        
        <div className="flex gap-4 flex-wrap justify-center">
          <button onClick={playTimeline} className="px-6 py-2 bg-[var(--color-primary)] text-[var(--color-primary-ink)] rounded-full font-bold">
            ▶ Play
          </button>
          <button onClick={pauseTimeline} className="px-6 py-2 bg-[var(--color-accent)] text-[var(--color-accent-ink)] rounded-full font-bold">
            ⏸ Pause
          </button>
          <button onClick={reverseTimeline} className="px-6 py-2 bg-[#8578c9] text-white rounded-full font-bold">
            ↩ Reverse
          </button>
          <button onClick={restartTimeline} className="px-6 py-2 bg-[var(--color-muted)] text-[var(--color-bg)] rounded-full font-bold">
            🔄 Restart
          </button>
        </div>

        <div 
          ref={controlsRef}
          className="w-32 h-32 rounded-xl bg-[var(--color-primary)] flex items-center justify-center transition-colors"
        >
          <span className="text-[var(--color-primary-ink)] font-bold">Box</span>
        </div>

        {/* Progress bar */}
        <div className="w-64 h-2 bg-[var(--color-surface-raised)] rounded-full overflow-hidden">
          <div 
            ref={progressRef}
            className="h-full bg-[var(--color-primary)] transition-all duration-100"
            style={{ width: '0%' }}
          />
        </div>
        <span className="text-xs text-[var(--color-muted)]">Timeline Progress</span>
      </section>
    </div>
  )
}