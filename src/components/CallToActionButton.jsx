import React from 'react'

export default function CallToActionButton({text,callback}) {
  return (
   <button className="group relative inline-block" onClick={callback}>
  {/* Back */}
  <div
    className="
      absolute inset-0
      rounded-xl
      bg-primary
      transition-all duration-300
      group-hover:translate-x-1
      group-hover:translate-y-1
    "
  />

  {/* Front */}
  <div
    className="
      relative
      rounded-xl
      border border-primary
      bg-surface
      px-6 py-3
      text-primary-50
      transition-all duration-300
      group-hover:-translate-x-1
      group-hover:-translate-y-1
    "
  >
    {text}
  </div>
</button>
  )
}
