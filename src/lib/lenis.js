import Lenis from 'lenis'

let instance = null

// Called once, from useLenis(), when the app mounts.
export function initLenis() {
  if (instance) return instance
  instance = new Lenis({
    duration: 1.1,
    smoothWheel: true,
  })
  return instance
}

export function getLenis() {
  return instance
}

// Use this in every nav <a href="#section"> onClick instead of
// letting the browser jump instantly to the anchor.
export function scrollToSection(hash) {
  const target = document.querySelector(hash)
  if (!target) return

  if (instance) {
    instance.scrollTo(target, { offset: -16 })
  } else {
    // Fallback if Lenis hasn't mounted yet for some reason
    target.scrollIntoView({ behavior: 'smooth' })
  }
}
