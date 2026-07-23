import { useEffect } from 'react';
import Lenis from 'lenis';

let lenisInstance = null;

export function useSmoothScroll() {
  useEffect(() => {
    // one instance
    if (!lenisInstance) {
      lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      });

      // +GSAP ScrollTrigger
      lenisInstance.on('scroll', () => {
        //  will update automatically
      });
    }

    // RAF loop
    const raf = (time) => {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      if (lenisInstance) {
        lenisInstance.destroy();
        lenisInstance = null;
      }
    };
  }, []);

  return lenisInstance;
}

// smooth scroll 
export function scrollToElement(elementId, options = {}) {
  const {
    offset = 0,
    duration = 1.5,
    easing = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  } = options;

  const element = document.getElementById(elementId);
  if (!element) return;

  //  use lenis
  if (lenisInstance) {
    lenisInstance.scrollTo(element, {
      offset: offset,
      duration: duration,
      easing: easing,
    });
  } else {
    // fallback 
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
}