import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function PageHeader({ number, text }) {
  const headerRef = useRef(null);
  const numberRef = useRef(null);
  const titleRef = useRef(null);
  const lineRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ paused: true });

      tl.from(numberRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
      })
        .from(
          titleRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.25"
        )
        .from(
          lineRef.current,
          {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.35"
        );

      ScrollTrigger.create({
        trigger: headerRef.current,
        start: "top 80%",
        once: true,      // animate only once
        animation: tl,   // connect timeline
        toggleActions: "play none none none",
      });
    },
    { scope: headerRef }
  );

  return (
    <header ref={headerRef} className="custom-header-ctn">
      <span ref={numberRef} className="custom-header-number">
        {number}
      </span>

      <h2 ref={titleRef} className="custom-header-title">
        {text}
      </h2>

      <span ref={lineRef} className="custom-header-line" />
    </header>
  );
}

export default PageHeader;