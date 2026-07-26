import { forwardRef } from 'react'

const ProjectCard = forwardRef(function ProjectCard({ onClick, title, tech }, ref) {
  return (
    <div
      ref={ref}
      onClick={onClick}
      className="absolute z-20 opacity-0 w-[90px] h-[90px] cursor-pointer"
    >
      {/* rotating gradient ring — its own layer, nothing nested inside it */}
      <div
        className="absolute inset-0 rounded-full animate-spin-reverse-slow"
        style={{
          background: `
            radial-gradient(circle at 82% 18%, rgba(244, 196, 48, 0.3), transparent 50%),
            radial-gradient(circle at 10% 85%, rgba(255, 107, 87, 0.25), transparent 55%),
            linear-gradient(135deg, #f4c430 0%, #ff6b57 50%, #8578c9 100%)
          `,
        }}
      />

      {/* static content — a sibling layer stacked on top, never rotates */}
      <div className="absolute inset-[7px] rounded-full bg-[var(--color-surface)] flex items-center justify-center text-center px-2">
        <span className="text-[var(--color-ink)] text-[10px] font-bold leading-tight">
          {title}
        </span>
      </div>
    </div>
  )
})

export default ProjectCard