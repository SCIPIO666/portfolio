import { useId } from 'react'

const VARIANTS = {
  wave: 'M0,60 C150,10 350,110 600,60 C850,10 1050,110 1200,60 L1200,120 L0,120 Z',
  diagonal: 'M0,40 C300,110 900,-10 1200,60 L1200,120 L0,120 Z',
  peak: 'M0,90 C400,-10 800,-10 1200,90 L1200,120 L0,120 Z',
  // single smooth arc, no double-hump 
  arc: 'M0,90 Q600,0 1200,90 L1200,120 L0,120 Z',
  // opposite of "peak" 
  valley: 'M0,10 C400,130 800,130 1200,10 L1200,120 L0,120 Z',
  // four small oscillations —  playful
  ripple:
    'M0,60 C150,20 150,100 300,60 C450,20 450,100 600,60 C750,20 750,100 900,60 C1050,20 1050,100 1200,60 L1200,120 L0,120 Z',
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
        <stop offset="0%" stopColor="var(--color-bg-soft)" stopOpacity="1" />
        <stop offset="45%" stopColor="var(--color-primary)" stopOpacity="0.14" />
        <stop offset="55%" stopColor="var(--color-accent)" stopOpacity="0.1" />
        <stop offset="100%" stopColor="var(--color-bg)" stopOpacity="1" />
      </linearGradient>
      <filter id={shadowId} x="-20%" y="-40%" width="140%" height="200%">
        <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="black" floodOpacity="0.3" />
      </filter>
      </defs>

      {/* back layer — curve for depth */}
      <path d={path} fill="var(--color-bg)" opacity="0.4" transform="translate(0, -8)" />
      {/* front layer —  curve,gradient & drop shadow */}
      <path d={path} fill={`url(#${gradId})`} filter={`url(#${shadowId})`} />
    </svg>
  )
}