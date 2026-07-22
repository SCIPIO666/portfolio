import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";

function PageHeader({ number, text }) {
  const headerRef = useRef(null);
  const numberRef = useRef(null);
  const titleRef = useRef(null);
  const lineRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(numberRef.current, {
        y: 25,
        opacity: 0,
        duration: 0.45,
        ease: "power3.out",
      })
        .from(
          titleRef.current,
          {
            y: 25,
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
          "-=0.3"
        );
    }, headerRef);

    return () => ctx.revert();
  }, []);

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