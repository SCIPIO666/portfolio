import { forwardRef } from 'react'
import { Eye } from 'lucide-react'

const ProjectCard = forwardRef(function ProjectCard(
  { onClick, title, image, innerRef, variant = 'chip' },
  ref
) {
  const isGrid = variant === 'grid'

  return (
    <div
      ref={ref}
      onClick={onClick}
      className={
        isGrid
          ? 'relative w-full flex flex-col items-center gap-2 cursor-pointer'
          : 'group absolute z-20 opacity-0 w-[90px] h-[90px] cursor-pointer'
      }
    >
      <div
        ref={innerRef}
        className={isGrid ? 'relative w-[100px] h-[100px]' : 'relative w-full h-full'}
      >
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

        <div className="absolute inset-[7px] rounded-full overflow-hidden">
          {image ? (
            <>
              <img
                src={image}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[var(--color-bg)]/70" />
            </>
          ) : (
            <div className="absolute inset-0 bg-[var(--color-surface)]" />
          )}

          <div className="relative h-full flex items-center justify-center px-2">
            <span className="text-[var(--color-ink)] text-[10px] font-bold leading-tight text-center [text-shadow:0_1px_3px_rgba(0,0,0,0.8)]">
              {title}
            </span>
          </div>
        </div>

        {!isGrid && (
          <div className="absolute inset-0 rounded-full flex items-center justify-center bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-250">
            <Eye size={16} className="text-white" />
          </div>
        )}
      </div>

      {isGrid && (
        <span className="flex items-center gap-1 text-[10px] font-semibold text-[var(--color-primary)] uppercase tracking-wide">
          <Eye size={11} /> View details
        </span>
      )}
    </div>
  )
})

export default ProjectCard