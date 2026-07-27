import { useState, useRef } from 'react'
import gsap from 'gsap'
import { ChevronLeft, ChevronRight, ImageOff } from 'lucide-react'

export default function ProjectCarousel({ images = [] }) {
  const [index, setIndex] = useState(0)
  const imgRef = useRef()

  const goTo = (newIndex) => {
    if (newIndex === index) return
    gsap.to(imgRef.current, {
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        setIndex(newIndex)
        gsap.to(imgRef.current, { opacity: 1, duration: 0.3 })
      },
    })
  }

  const next = () => goTo((index + 1) % images.length)
  const prev = () => goTo((index - 1 + images.length) % images.length)

  if (images.length === 0) {
    return (
      <div className="w-full h-48 rounded-xl bg-[var(--color-surface-raised)] flex items-center justify-center text-[var(--color-muted)]">
        <ImageOff size={28} />
      </div>
    )
  }

  return (
    <div className="relative w-full h-48 rounded-xl overflow-hidden bg-[var(--color-surface-raised)]">
      <img
        ref={imgRef}
        src={images[index]}
        alt=""
        className="w-full h-full object-cover"
      />

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-1 text-white hover:bg-black/70"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-1 text-white hover:bg-black/70"
          >
            <ChevronRight size={16} />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <span
                key={i}
                className={`w-1.5 h-1.5 rounded-full ${i === index ? 'bg-[var(--color-primary)]' : 'bg-white/40'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}