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
      // genuinely opening from closed — full roll-in
      wasOpenRef.current = true
      window.__lenis?.stop()

      const preventScroll = (e) => e.preventDefault()
      window.addEventListener('wheel', preventScroll, { passive: false })
      window.addEventListener('touchmove', preventScroll, { passive: false })

      setVisibleProject(project)
      setShowContent(false)

      gsap.fromTo(
        modalRef.current,
        { xPercent: 100, opacity: 0 },
        {
          xPercent: 0,
          opacity: 1,
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

    // already open — a next/prev switch already handled the crossfade,
    // this just keeps local state in sync with the store
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={handleClose}>
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-[95%] max-w-5xl h-[88vh] bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden flex flex-col sm:flex-row"
      >
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-colors"
        >
          <X size={18} />
        </button>

        {showContent && (
          <div ref={contentRef} className="flex flex-col sm:flex-row w-full h-full">
            {/* left column — 25% on desktop, natural height stacked on mobile */}
            <div className="sm:w-1/4 w-full sm:h-full overflow-y-auto p-6 pt-14 sm:pt-6 flex flex-col">
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

              {/* project-to-project navigation, separate from the image carousel */}
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

            {/* right column — 75%, full height image carousel */}
            <div className="sm:w-3/4 w-full h-64 sm:h-full">
              <ProjectCarousel images={visibleProject.screenshots} fill />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}