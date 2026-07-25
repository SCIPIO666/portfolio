import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// scrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export function useLenis() {
  useEffect(() => {
    //lenis init
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    window.__lenis = lenis
    // lenis + scrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // animation 
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    // refresh ScrollTrigger 
    const refreshScrollTrigger = () => {
      ScrollTrigger.refresh();
    };

    //1st refresh
    setTimeout(refreshScrollTrigger, 100);

    // resizing refresh
    window.addEventListener('resize', refreshScrollTrigger);
    window.addEventListener('load', refreshScrollTrigger);

    // cleanup
    return () => {
      lenis.destroy();
      window.removeEventListener('resize', refreshScrollTrigger);
      window.removeEventListener('load', refreshScrollTrigger);
      ScrollTrigger.getAll().forEach(st => st.kill());
      window.__lenis = null
    };
  }, []);
}

export default useLenis;