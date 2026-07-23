import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useSectionReveal(ref, options = {}) {
  useEffect(() => {
    if (!ref.current) return;

    const {
      from = { opacity: 0, y: 50 },
      to = { opacity: 1, y: 0 },
      trigger = ref.current,
      start = 'top 80%',
      scrub = false,
    } = options;

    gsap.fromTo(ref.current, from, {
      ...to,
      scrollTrigger: {
        trigger,
        start,
        scrub,
        toggleActions: 'play none none reverse',
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === ref.current) {
          st.kill();
        }
      });
    };
  }, [ref, options]);
}