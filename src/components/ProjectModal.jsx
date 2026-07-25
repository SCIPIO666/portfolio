import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function ProjectModal({ project, onClose }) {
  const modalRef = useRef()
  const [showContent, setShowContent] = useState(false)
  const [visibleProject, setVisibleProject] = useState(null)

  // when a project is selected, roll in
  useEffect(() => {
    if (project) {
      window.__lenis?.stop()

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
    }

    // safety net: if this component unmounts while a project is still
    // selected (e.g. route change), make sure scrolling isn't left frozen
    return () => {
      if (project) window.__lenis?.start()
    }
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
        onClose()
        window.__lenis?.start()
      },
    })
  }

  if (!visibleProject) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={handleClose}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="w-[85%] max-w-2xl h-[70vh] bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden p-8"
      >
        {showContent && (
          <div>
            <button
              onClick={handleClose}
              className="text-white/50 hover:text-white mb-4 transition-colors"
            >
              ✕ Close
            </button>
            <h2 className="text-3xl font-bold text-white mb-2">
              {visibleProject.title}
            </h2>
            <p className="text-white/60">{visibleProject.tech}</p>
          </div>
        )}
      </div>
    </div>
  )
}