import ProjectCarousel from './ProjectCarousel'
import { ExternalLink, Github } from 'lucide-react'

// ...inside the existing showContent && ( ... ) block, replace with:

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
        
          href={visibleProject.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-pill bg-[var(--color-primary)] text-[var(--color-primary-ink)] flex items-center gap-2"
        >
          <ExternalLink size={14} /> Live demo
        </a>
      )}
      {visibleProject.sourceUrl && (
        
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