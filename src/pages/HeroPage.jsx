import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";

import CallToActionButton from "../components/CallToActionButton";

gsap.registerPlugin(useGSAP);

export default function Hero({ compact = false }) {
  const hero = useRef();
  const watermark = useRef();
  const intro = useRef();
  const nameRef = useRef();
  const title = useRef();
  const buttons = useRef();
  const status = useRef();
  const word = 'DEV SCIPIO· ';

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      // Watermark 
      tl.from(watermark.current, {
        opacity: 0,
        scale: 1.4,
        rotate: -15,
        duration: 1.6,
        ease: "power2.out",
      });

      // Intro
      tl.from(
        intro.current,
        {
          opacity: 0,
          y: -30,
          duration: 0.6,
          ease: "power4.out",
        },
        "-=1"
      );

      //name
      const nameElement = nameRef.current;
      const chars = new SplitType(nameElement, { 
        types: "chars",
        tagName: "span"
      });

      chars.chars.forEach((char) => {
        char.style.display = "inline-block";
      });

      // name fade in
      tl.from(
        chars.chars,
        {
          opacity: 0,
          y: 30,
          rotateY: 360,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.03,
        },
        "-=0.2"
      );

      // Title animation
      tl.from(
        title.current,
        {
          opacity: 0,
          y: 30,
          duration: 0.9,
          ease: "power4.out",
        },
        "-=0.3"
      );

      // Buttons animation
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

      // Status animation
      tl.from(
        status.current,
        {
          opacity: 0,
          duration: 0.5,
        },
        "-=0.2"
      );

      // Persistent floating animation for watermark
      gsap.to(watermark.current, {
        y: -20,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Animate marquee tracks on load
      const marqueeTracks = document.querySelectorAll('.marquee-track');
      marqueeTracks.forEach((track, index) => {
        gsap.from(track, {
          opacity: 0,
          y: index % 2 === 0 ? 30 : -30,
          duration: 1.2,
          delay: 0.3 + (index * 0.15),
          ease: "power2.out",
        });
      });

    },
    { scope: hero }
  );

  return (
    <section
      ref={hero}
      id="hero"
      className="min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 pt-10 pb-12 relative overflow-hidden"
    >
      {/* Marquee */}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-center gap-6 opacity-[0.07]">
        {[0, 1, 2].map((row) => (
          <div 
            key={row} 
            className="marquee-track flex whitespace-nowrap"
            style={{ 
              animation: `marquee ${row % 2 === 0 ? 42 : 34}s linear infinite ${row % 2 !== 0 ? 'reverse' : ''}` 
            }}
          >
            <span className="font-display font-bold text-ink text-[9vw]">
              {word.repeat(6)}
            </span>
            <span 
              aria-hidden="true" 
              className="font-display font-bold text-ink text-[9vw]"
            >
              {word.repeat(6)}
            </span>
          </div>
        ))}
      </div>

      {/* Gradient  */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-hero" />

      {/* Watermark */}
      <div
        ref={watermark}
        className="absolute -top-10 -right-10 lg:right-20 lg:top-10 text-[12rem] lg:text-[20rem] font-display font-bold text-surface-raised/30 select-none leading-none"
      >
        S
      </div>

      {/* Hero*/}
      <div className="max-w-4xl w-full mx-auto relative z-10 text-center">
        <p
          ref={intro}
          className="text-primary-soft font-mono text-xs tracking-[0.2em] uppercase mb-4"
        >
          Hi, my name is
        </p>

        <h1
          ref={nameRef}
          className="text-hero font-display font-bold leading-[1.08] text-ink mb-3"
        >
          Esphoney Ondicho Scipio.
        </h1>

        <h2
          ref={title}
          className="text-h2 font-sans font-medium text-muted leading-[1.2] mb-10"
        >
          I engineer digital solutions for the web.
        </h2>

        <div
          ref={buttons}
          className="flex flex-wrap items-center justify-center gap-4"
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
          className="flex items-center justify-center gap-3 mt-12 text-muted-soft text-sm font-mono"
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