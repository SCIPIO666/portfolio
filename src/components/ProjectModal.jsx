import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ProjectCarousel from './ProjectCarousel'
import { ExternalLink } from 'lucide-react'
import { FaGithub as Github} from 'react-icons/fa'

export default function ProjectModal({ project, onClose }) {
  const modalRef = useRef()
  const [showContent, setShowContent] = useState(false)
  const [visibleProject, setVisibleProject] = useState(null)

  // roll in
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

    // fallback-if  component unmounts while a project is selected
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
          <div className="h-full overflow-y-auto">
            <button
              onClick={handleClose}
              className="text-white/50 hover:text-white mb-4 transition-colors"
            >
              ✕ Close
            </button>

            <h2 className="text-3xl font-bold text-white mb-1">{visibleProject.title}</h2>
            <p className="text-white/50 text-sm mb-4">{visibleProject.tech}</p>

            <ProjectCarousel images={visibleProject.screenshots} />

            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              <div>
                <h4 className="text-[var(--color-primary)] text-xs font-bold uppercase tracking-wide mb-1">
                  What it achieved
                </h4>
                <p className="text-white/70 text-sm">{visibleProject.achieved}</p>
              </div>
              <div>
                <h4 className="text-[var(--color-primary)] text-xs font-bold uppercase tracking-wide mb-1">
                  What I gained
                </h4>
                <p className="text-white/70 text-sm">{visibleProject.gained}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-6">
              {visibleProject.stack?.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-3 py-1 rounded-full bg-[var(--color-surface-raised)] text-white/70"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-3 mt-6">
              {visibleProject.liveUrl && (
                <a
                  href={visibleProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill bg-[var(--color-primary)] text-[var(--color-primary-ink)] flex items-center gap-2"
                >
                  <ExternalLink size={14} /> Live demo
                </a>
              )}
              {visibleProject.sourceUrl && (
                <a
                  href={visibleProject.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill border border-[var(--color-border)] text-white flex items-center gap-2"
                >
                  <Github size={14} /> Source
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}