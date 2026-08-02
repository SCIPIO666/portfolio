export default function CurveDivider({
  color = 'var(--color-border)',
  strokeWidth = 2,
  flip = false,
  className = '',
}) {
  return (
    <svg
      aria-hidden="true"
      className={`absolute bottom-0 left-0 w-full h-16 md:h-24 pointer-events-none ${
        flip ? 'scale-y-[-1]' : ''
      } ${className}`}
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
    >
      {/*  one smooth S-curve across the full section width */}
      <path
        d="M0,60 C300,120 900,0 1200,60"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}