import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const PROMPT = 'zamaSystems@scipio:~$ ';
const SENTENCE = 'Developer Scipio';
const TYPE_SPEED = 68;

export default function DevScipioAnimation() {
  const [typed, setTyped] = useState('');
  const [doneTyping, setDoneTyping] = useState(false);

  const container = useRef(null);
  const panelRef = useRef(null);
  const cursorRef = useRef(null);
  const emblemRef = useRef(null);
  const hexRef = useRef(null);
  const sRef = useRef(null);

  const finaleStartedRef = useRef(false);

  //  TYPING 
  useEffect(() => {
    if (typed.length >= SENTENCE.length) {
      setDoneTyping(true);
      return;
    }
    const t = setTimeout(() => setTyped(SENTENCE.slice(0, typed.length + 1)), TYPE_SPEED);
    return () => clearTimeout(t);
  }, [typed]);

  //  HEXAGON PATH 
  useLayoutEffect(() => {
    const path = hexRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    path.style.strokeDasharray = len;
    path.style.strokeDashoffset = len;
  }, []);

  // CURSOR BLINK
  useGSAP(() => {
    if (!cursorRef.current) return;
    gsap.to(cursorRef.current, {
      opacity: 0,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: 'steps(1)',
    });
  }, { scope: container });

  //  PANEL ENTRANCE 
  useGSAP(() => {
    if (!panelRef.current) return;
    gsap.fromTo(panelRef.current,
      { opacity: 0, y: 18, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out' }
    );
  }, { scope: container });

  //  SEQUENCE 
  useGSAP(() => {
    if (!doneTyping || finaleStartedRef.current) return;
    finaleStartedRef.current = true;

    const tl = gsap.timeline({ delay: 0.6 });

    // Terminal exits
    tl.to(cursorRef.current, { opacity: 0, duration: 0.15 })
      .to(panelRef.current, {
        opacity: 0,
        y: -14,
        scale: 0.94,
        duration: 0.55,
        ease: 'power2.in',
      })
      .set(panelRef.current, { display: 'none' })

      // Emblem appears
      .to(emblemRef.current, { opacity: 1, duration: 0.4 }, '-=0.1')

      // Hex draws itself
      .to(hexRef.current, {
        strokeDashoffset: 0,
        duration: 1.6,
        ease: 'power2.inOut',
      })

      // S letter pops
      .fromTo(sRef.current,
        { opacity: 0, scale: 0.65 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
        '-=0.5'
      )

      // Hex pulse
      .to(hexRef.current, {
        scale: 1.04,
        transformOrigin: '100px 100px',
        duration: 0.35,
        ease: 'power1.out',
      })
      .to(hexRef.current, {
        scale: 1,
        transformOrigin: '100px 100px',
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)',
      });

    return () => tl.kill();
  }, {
    scope: container,
    dependencies: [doneTyping],
  });

  return (
    <div ref={container} className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden">

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 3px)',
        }}
      />

      {/* Terminal Panel */}
      <div
        ref={panelRef}
        className="relative w-full max-w-lg mx-6 rounded-md border border-border/70 bg-black shadow-[0_0_60px_-10px_rgba(244,196,48,0.15)]"
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border/70">
          <span className="w-3 h-3 rounded-full bg-danger/80" />
          <span className="w-3 h-3 rounded-full bg-primary/80" />
          <span className="w-3 h-3 rounded-full bg-success/80" />
          <span className="ml-auto text-muted-soft text-[11px] font-mono tracking-wider">scipio — zsh</span>
        </div>
        <div className="px-5 py-8 font-mono text-base sm:text-lg">
          <span className="text-primary">{PROMPT}</span>
          <span className="text-ink">{typed}</span>
          <span ref={cursorRef} className="inline-block w-[0.55em] h-[1.05em] align-middle bg-primary ml-0.5" />
        </div>
      </div>

      {/* Fullscreen Emblem */}
      <div ref={emblemRef} className="absolute inset-0 flex items-center justify-center opacity-0">
        <svg viewBox="0 0 200 200" className="w-[min(62vw,62vh)] h-[min(62vw,62vh)]">
          <defs>
            <filter id="hexGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            ref={hexRef}
            d="M100 12 L176 56 L176 144 L100 188 L24 144 L24 56 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinejoin="round"
            strokeLinecap="round"
            filter="url(#hexGlow)"
            className="text-primary"
          />
          <text
            ref={sRef}
            x="100"
            y="128"
            textAnchor="middle"
            className="text-accent"
            style={{ font: '700 128px Fraunces, Georgia, serif', fill: 'currentColor' }}
          >
            S
          </text>
        </svg>
      </div>
    </div>
  );
}