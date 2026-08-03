import { useId } from 'react'

const VARIANTS = {
  wave: 'M0,60 C150,10 350,110 600,60 C850,10 1050,110 1200,60 L1200,120 L0,120 Z',
  diagonal: 'M0,40 C300,110 900,-10 1200,60 L1200,120 L0,120 Z',
  peak: 'M0,90 C400,-10 800,-10 1200,90 L1200,120 L0,120 Z',
}

export default function CurveDivider({
  variant = 'wave',
  height = 96,
  flip = false,
  translate=50,
  className = '',
}) {

  const uid = useId()
  const gradId = `curve-grad-${uid}`
  const shadowId = `curve-shadow-${uid}`

  const path = VARIANTS[variant] ?? VARIANTS.wave

  return (
    <svg
      aria-hidden="true"
      className={`absolute bottom-0 left-0 w-full pointer-events-none ${
        flip ? 'scale-y-[-1]' : ''
      } ${className}`}
      style={{
        height,
        bottom: '-200px',
        transform: `translateY(-${translate}px)`,
        zIndex: -100,
        opacity: 0.4

       }}
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
    >
      <defs>
        {/* diagonal sweep -with gradient */}
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.85" />
          <stop offset="55%" stopColor="var(--color-accent)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--color-indigo-400)" stopOpacity="0.25" />
        </linearGradient>
        <filter id={shadowId} x="-20%" y="-40%" width="140%" height="200%">
          <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="black" floodOpacity="0.35" />
        </filter>
      </defs>

      {/* back layer — curve for depth */}
      <path
        d={path}
        fill="var(--color-surface)"
        opacity="0.35"
        transform="translate(0, -8)"
      />

      {/* front layer —  curve,gradient & drop shadow */}
      <path d={path} fill={`url(#${gradId})`} filter={`url(#${shadowId})`} />
    </svg>
  )
}