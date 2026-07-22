import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";

import CallToActionButton from "../components/CallToActionButton";

gsap.registerPlugin(useGSAP);

export default function Hero() {
  const hero = useRef();

  const watermark = useRef();
  const intro = useRef();
  const nameRef = useRef();
  const title = useRef();
  const desc = useRef();
  const buttons = useRef();
  const status = useRef();

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });


      tl.from(watermark.current, {
        opacity: 0,
        scale: 1.4,
        rotate: -15,
        duration: 1.6,
        ease: "power2.out",
      });


      tl.from(
        intro.current,
        {
          opacity: 0,
          x: -150,
          duration: 0.6,
          ease: "power4.out",
        },
        "-=1"
      );

      //  split
      const nameElement = nameRef.current;
      const chars = new SplitType(nameElement, { 
        types: "chars",
        tagName: "span"
      });

      chars.chars.forEach((char) => {
        char.style.display = "inline-block";
      });

      // Drop animation 
      tl.from(
        chars.chars,
        {
          y: -300,
          rotationX: -80,
          opacity: 0,
          duration: 1.2,
          ease: "elastic.out(1, 0.4)",
          stagger: 0.03,
        },
        "-=0.2"
      );

      // shockwave effect 
      tl.to(
        chars.chars,
        {
          y: -12,
          duration: 0.15,
          stagger: 0.03,
          ease: "power2.out",
          yoyo: true,
          repeat: 1,
          onComplete: () => {
            // Reset 
            gsap.to(chars.chars, {
              y: 0,
              duration: 0.2,
              ease: "power2.out",
            });
          },
        },
        "+=0.1"
      );


      tl.from(
        title.current,
        {
          opacity: 0,
          x: 300,
          duration: 0.9,
          ease: "power4.out",
        },
        "-=0.3"
      );


      tl.from(
        desc.current,
        {
          opacity: 0,
          x: -120,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5"
      );


      // Buttons 

      tl.from(
        buttons.current.children,
        {
          opacity: 0,
          scale: 0,
          y: 30,
          stagger: 0.12,
          duration: 0.5,
          ease: "back.out(2)",
        },
        "-=0.4"
      );

-
      tl.from(
        status.current,
        {
          opacity: 0,
          duration: 0.5,
        },
        "-=0.2"
      );

      gsap.to(watermark.current, {
        y: -20,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

    },
    { scope: hero }
  );

  return (
    <section
      ref={hero}
      id="hero"
      className="min-h-screen flex items-center px-6 md:px-12 lg:px-24 pt-10 pb-12 relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none bg-gradient-hero" />

      <div
        ref={watermark}
        className="absolute -top-10 -right-10 lg:right-20 lg:top-10 text-[12rem] lg:text-[20rem] font-display font-bold text-surface-raised/30 select-none leading-none"
      >
        S
      </div>

      <div className="max-w-4xl w-full mx-auto relative z-10">

        <p
          ref={intro}
          className="text-primary-soft font-mono text-xs tracking-[0.2em] uppercase mb-4"
        >
          Hi, my name is
        </p>

        <h1
          ref={nameRef}
          className="text-hero font-display font-bold leading-[1.08] text-ink mb-2"
        >
          Esphoney Ondicho Scipio.
        </h1>

        <h2
          ref={title}
          className="text-h2 font-sans font-medium text-muted leading-[1.2] mb-6"
        >
          I engineer digital solutions for the web.
        </h2>

        <p
          ref={desc}
          className="text-lede font-sans text-muted leading-[1.7] max-w-2xl mb-10"
        >
          I'm a web developer specializing in building exceptional digital
          experiences. Currently, I'm focused on engineering products for the
          medical industry.
        </p>

        <div
          ref={buttons}
          className="flex flex-wrap items-center gap-4"
        >
          <CallToActionButton
            text="Get My Resume"
            className="btn-pill bg-primary text-primary-ink hover:bg-primary-soft shadow-btn-primary"
          />

          <CallToActionButton
            text="Email Me"
            className="btn-pill border border-border text-ink hover:bg-surface-raised"
          />

          <CallToActionButton
            text="Message"
            className="btn-pill border border-border text-ink hover:bg-surface-raised"
          />
        </div>

        <div
          ref={status}
          className="flex items-center gap-3 mt-12 text-muted-soft text-sm font-mono"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success" />
          </span>

          <span>Available for freelance work</span>
        </div>
      </div>
    </section>
  );
}