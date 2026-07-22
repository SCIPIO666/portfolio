import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initLenis, getLenis } from '../lib/lenis'

export default function useLenis() {
  useEffect(() => {
    const lenis = initLenis()

    // Keep GSAP's ScrollTrigger in sync with Lenis's virtual scroll position.
    // Without this line ScrollTrigger reads native scroll and drifts out of
    // sync with what Lenis is actually doing.
    lenis.on('scroll', ScrollTrigger.update)

    const tick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      getLenis()?.destroy()
    }
  }, [])
}
