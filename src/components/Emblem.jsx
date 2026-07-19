export default function Emblem({ size = 32, className = '' }) {
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="Scipio emblem"
    >
      <path
        d="M100 12 L176 56 L176 144 L100 188 L24 144 L24 56 Z"
        fill="none"
        stroke="#f4c430"
        strokeWidth="12"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <text
        x="100"
        y="134"
        textAnchor="middle"
        style={{ font: '700 130px Fraunces, Georgia, serif', fill: '#f4c430' }}
      >
        S
      </text>
    </svg>
  )
}