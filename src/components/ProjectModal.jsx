import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ProjectCarousel from './ProjectCarousel'
import { ExternalLink, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { FaGithub as Github } from 'react-icons/fa'
import { useModalStore } from '../stores/useModalStore'
import { projects } from '../data/projects'

export default function ProjectModal() {
  const project = useModalStore((state) => state.project)
  const closeModal = useModalStore((state) => state.closeModal)
  const openModal = useModalStore((state) => state.openModal)

  const modalRef = useRef()
  const contentRef = useRef()
  const wasOpenRef = useRef(false)
  const [showContent, setShowContent] = useState(false)
  const [visibleProject, setVisibleProject] = useState(null)

  useEffect(() => {
    if (!project) return

    if (!wasOpenRef.current) {
      // roll-in
      wasOpenRef.current = true
      window.__lenis?.stop()

      const preventScroll = (e) => e.preventDefault()
      window.addEventListener('wheel', preventScroll, { passive: false })
      window.addEventListener('touchmove', preventScroll, { passive: false })

      setVisibleProject(project)
      setShowContent(false)

      gsap.fromTo(
        modalRef.current,
        { 
          xPercent: 100, 
          opacity: 0,
          width: 500,
          height: 500,
          borderRadius: '50%'
        },
        {
          xPercent: 0,
          opacity: 1,
          width: '100%', 
          height: '100%', 
          borderRadius: '0px',
          duration: 0.6,
          ease: 'power3.out',
          onComplete: () => setShowContent(true),
        }
      )

      return () => {
        window.removeEventListener('wheel', preventScroll)
        window.removeEventListener('touchmove', preventScroll)
      }
    }

    // next/prev switch
    setVisibleProject(project)
  }, [project])

  const handleClose = () => {
    setShowContent(false)
    gsap.to(modalRef.current, {
      xPercent: 100,
      opacity: 0,
      duration: 0.5,
      ease: 'power3.in',
      onComplete: () => {
        setVisibleProject(null)
        wasOpenRef.current = false
        window.__lenis?.start()
        closeModal()
      },
    })
  }

  const goToProject = (newProject) => {
    gsap.to(contentRef.current, {
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        setVisibleProject(newProject)
        openModal(newProject)
        gsap.fromTo(contentRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 })
      },
    })
  }

  const currentIndex = projects.findIndex((p) => p.id === visibleProject?.id)
  const goNext = () => goToProject(projects[(currentIndex + 1) % projects.length])
  const goPrev = () => goToProject(projects[(currentIndex - 1 + projects.length) % projects.length])

  if (!visibleProject) return null

  return (
    <div 
      className="fixed inset-y-45 mr-8 md:inset-0 lg:inset-0 z-50 flex items-start lg:items-center justify-center bg-black/70 overflow-y-auto" 
      onClick={handleClose}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          w-[90vw]
          h-[75vh]
          
          lg:w-[92vw]
          lg:max-w-6xl
          lg:h-[88dvh]

          
          bg-[var(--color-surface)]
          border-x lg:border
          border-[var(--color-border)]
          
          lg:rounded-xl
          flex flex-col lg:flex-row
        "
      >
        <button
          onClick={handleClose}
          className="
            absolute 
            top-3 right-3 
            z-20 
            w-9 h-9 
            rounded-full 
            bg-black/50 hover:bg-black/70 
            flex items-center justify-center 
            text-white transition-colors
            lg:bg-black/40 lg:hover:bg-black/60
          "
        >
          <X size={18} />
        </button>

        {showContent && (
          <div ref={contentRef} className="flex flex-col lg:flex-row w-full h-full overflow-hidden">
            {/* image - first on mobile, right on desktop */}
            <div className="
              order-1 lg:order-2 
              w-full lg:flex-1
              h-[240px] md:h-[320px] lg:h-full 
              flex-shrink-0
            ">
              <ProjectCarousel images={visibleProject.screenshots} fill />
            </div>

            {/* details - second on mobile, left on desktop */}
            <div className="
              order-2 lg:order-1 
              w-full lg:w-[340px]
              flex-1 lg:flex-none
              lg:h-full 
              overflow-y-auto
              p-5 pt-14 lg:p-6 lg:pt-6
              flex flex-col
            ">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-1">{visibleProject.title}</h2>
                <p className="text-white/50 text-xs mb-4">{visibleProject.tech}</p>
                <p className="text-white/70 text-sm mb-6">{visibleProject.achieved}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {visibleProject.stack?.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-3 py-1 rounded-full bg-[var(--color-surface-raised)] text-white/70"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col gap-2">
                  {visibleProject.liveUrl && (
                    <a
                      href={visibleProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-pill bg-[var(--color-primary)] text-[var(--color-primary-ink)] flex items-center justify-center gap-2"
                    >
                      <ExternalLink size={14} /> Live demo
                    </a>
                  )}
                  {visibleProject.sourceUrl && (
                    <a
                      href={visibleProject.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-pill border border-[var(--color-border)] text-white flex items-center justify-center gap-2"
                    >
                      <Github size={14} /> Source
                    </a>
                  )}
                </div>
              </div>

              {/* project navigation */}
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-[var(--color-border)]">
                <button onClick={goPrev} className="text-white/50 hover:text-white flex items-center gap-1 text-xs">
                  <ChevronLeft size={14} /> Prev
                </button>
                <span className="text-white/40 text-xs font-mono">
                  {currentIndex + 1} / {projects.length}
                </span>
                <button onClick={goNext} className="text-white/50 hover:text-white flex items-center gap-1 text-xs">
                  Next <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}