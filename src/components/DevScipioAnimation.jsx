import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const PROMPT = 'zamaSystems@scipio:~$ ';
const SENTENCE = 'Developer Scipio';
const TYPE_SPEED = 68;

// "SCIPIO" 8-bit ASCII binary
const toBinary = (str) =>
  str
    .split('')
    .map((ch) => ch.charCodeAt(0).toString(2).padStart(8, '0'))
    .join(' ');

const BIN_WORD = toBinary('SCIPIO');
const BIN_LINE = Array(36).fill(BIN_WORD).join('   ');
const BINARY_TEXT = Array(90).fill(BIN_LINE).join('\n');

function TerminalClock() {
  const [now, setNow] = useState(() => new Date());
  
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  
  return (
    <span className="ml-auto text-muted-soft text-[11px] font-mono tracking-wider tabular-nums">
      {now.toLocaleTimeString([], { hour12: false })}
    </span>
  );
}

export default function DevScipioAnimation() {
  const [typed, setTyped] = useState('');
  const [doneTyping, setDoneTyping] = useState(false);

  const container = useRef(null);
  const panelRef = useRef(null);
  const cursorRef = useRef(null);
  const emblemRef = useRef(null);
  
  // Path + text group
  const logoGroupRef = useRef(null);
  const hexRef = useRef(null);
  const sRef = useRef(null);

  const finaleStartedRef = useRef(false);
  const hexLengthRef = useRef(0);

  // TYPING
  useEffect(() => {
    if (typed.length >= SENTENCE.length) {
      setDoneTyping(true);
      return;
    }
    const t = setTimeout(() => setTyped(SENTENCE.slice(0, typed.length + 1)), TYPE_SPEED);
    return () => clearTimeout(t);
  }, [typed]);

  // HEXAGON PATH
  useLayoutEffect(() => {
    const path = hexRef.current;
    if (!path) return;
    
    const len = path.getTotalLength();
    hexLengthRef.current = len;

    
    gsap.set(path, {
      strokeDasharray: len,
      strokeDashoffset: len,
      visibility: 'visible',
    });
    
    path.getBoundingClientRect();
  }, []);

  // CURSOR BLINK
  useGSAP(() => {
    if (!cursorRef.current) return;
    
    window.cursorBlinkAnimation = gsap.to(cursorRef.current, {
      opacity: 0,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: 'steps(1)',
    });
    
    return () => {
      if (window.cursorBlinkAnimation) {
        window.cursorBlinkAnimation.kill();
        window.cursorBlinkAnimation = null;
      }
    };
  }, { scope: container });

  // PANEL ENTRANCE
  useGSAP(() => {
    if (!panelRef.current) return;
    gsap.fromTo(panelRef.current,
      { opacity: 0, y: 18, scale: 0.96 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        duration: 0.6, 
        ease: 'power3.out' 
      }
    );
  }, { scope: container });

  // ANIMATION SEQUENCE
  useGSAP(() => {
    if (!doneTyping || finaleStartedRef.current) return;
    finaleStartedRef.current = true;
    
    if (window.cursorBlinkAnimation) {
      window.cursorBlinkAnimation.kill();
    }

    const hexPath = hexRef.current;
    const len = hexLengthRef.current;
    
    gsap.set(hexPath, {
      strokeDasharray: len,
      strokeDashoffset: len,
      visibility: 'visible',
    });

    gsap.set(sRef.current, {
      autoAlpha: 0,
      scale: 0.7,
      svgOrigin: '100 70', 
    });

    const masterTL = gsap.timeline({
      defaults: { ease: 'power2.inOut' },
      onComplete: () => console.log('✨ Animation complete!'),
    });

    //  Terminal exits 
    masterTL
      .to(cursorRef.current, {
        opacity: 0,
        duration: 0.15,
      })
      .to(panelRef.current, {
        autoAlpha: 0,
        y: -20,
        scale: 0.92,
        duration: 0.6,
        ease: 'power2.in',
      })
      .add(() => {}, '+=0.05');

    // Emblem appears 
    masterTL
      .to(emblemRef.current, {
        autoAlpha: 1,
        duration: 0.5,
        ease: 'power2.out',
      })
      .add(() => {}, '+=0.05');

    // === PHASE 3: Hex draws itself ===
    masterTL
      .to(hexPath, {
        strokeDashoffset: 0,
        duration: 1.8,
        ease: 'power2.inOut',
      });

    //  "S" letter pops 
    masterTL
      .fromTo(sRef.current,
        {
          autoAlpha: 0,
          scale: 0.7,
          svgOrigin: '100 120',
        },
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.7,
          ease: 'back.out(1.8)',
          svgOrigin: '100 120',
        },
        '-=0.8'
      );

    //  Logo pulse 
    masterTL
      .to(logoGroupRef.current, {
        scale: 1.04, 
        duration: 0.3,
        ease: 'power1.out',
        transformOrigin: '50% 50%',
        svgOrigin: '100 100',
      })
      .to(logoGroupRef.current, {
        scale: 1,
        duration: 0.5,
        ease: 'elastic.out(1, 0.4)',
        transformOrigin: '50% 50%',
        svgOrigin: '100 100',
      });

    window.masterTimeline = masterTL;

    return () => {
      console.log('🧹 Cleaning up');
      if (window.masterTimeline) {
        window.masterTimeline.kill();
        window.masterTimeline = null;
      }
    };
  }, {
    scope: container,
    dependencies: [doneTyping],
  });

  return (
    <div 
      ref={container} 
      className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden"
    >
      {/* Binary background */}
      <pre
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 overflow-hidden"
        style={{
          margin: 0,
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: '20px',
          lineHeight: '15px',
          letterSpacing: '0.05em',
          color: '#f4c430',
          opacity: 0.05,
          whiteSpace: 'pre',
        }}
      >
        {BINARY_TEXT}
      </pre>

      {/* Terminal Panel */}
      <div
        ref={panelRef}
        className="relative w-full max-w-lg mx-6 rounded-md border border-border/70 bg-black shadow-[0_0_60px_-10px_rgba(244,196,48,0.15)]"
      >
        <div className="flex items-center px-4 py-3 border-b border-border/70">
          <span className="text-muted-soft text-[11px] font-mono tracking-wider">scipio — zsh</span>
          <TerminalClock />
        </div>
        <div className="px-5 py-8 font-mono text-base sm:text-lg">
          <span className="text-primary">{PROMPT}</span>
          <span className="text-ink">{typed}</span>
          <span 
            ref={cursorRef} 
            className="inline-block w-[0.55em] h-[1.05em] align-middle bg-primary ml-0.5" 
          />
        </div>
      </div>

      {/* Emblem  */}
      <div 
        ref={emblemRef} 
        className="absolute inset-0 flex items-center justify-center opacity-0 will-change-transform"
      >
        <svg 
          viewBox="0 0 200 200" 
          className="w-[min(30vw,30vh)] h-[min(30vw,30vh)]"
          style={{ overflow: 'visible' }}
        >
          <defs>
            <filter id="hexGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          
          <g ref={logoGroupRef}>
            <path
              ref={hexRef}
              d="M100 12 L176 56 L176 144 L100 188 L24 144 L24 56 Z"
              fill="none"
              stroke="#f4c430"
              strokeWidth="4"
              strokeLinejoin="round"
              strokeLinecap="round"
              filter="url(#hexGlow)"
              style={{ 
                color: '#f4c430',
                visibility: 'hidden',
              }}
            />
            <text
              ref={sRef}
              x="100"
              y="126" 
              textAnchor="middle"
              dominantBaseline="central" 
              style={{ 
                font: '700 100px Fraunces, Georgia, serif', 
                fill: '#f4c430',
              }}
            >
              S
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}