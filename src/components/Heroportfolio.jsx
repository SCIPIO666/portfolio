'use client';

/**
 * HeroPortfolio.jsx
 * -----------------------------------------------------------------------
 * Single-file hero portfolio built on the "Sidoarjo Bold" palette.
 * Stack: Three.js (WebGL hero field) + GSAP/ScrollTrigger (reveals) +
 * Lenis (smooth scroll) + hand-rolled SVG halftone + CSS gradients.
 *
 * INSTALL:
 *   npm install three gsap lenis
 *
 * USE:
 *   import HeroPortfolio from './HeroPortfolio';
 *   export default function App(){ return <HeroPortfolio />; }
 *
 * Notes:
 * - Pure React + refs, no Tailwind/UI-kit dependency — styles are scoped
 *   in the <style> tag at the bottom of the render, so this drops into
 *   Vite, CRA, or Next.js (App or Pages router) with zero extra config.
 * - The 'use client' pragma at the top is a no-op outside Next.js App
 *   Router and required inside it (this component touches window/DOM).
 * -----------------------------------------------------------------------
 */

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ---------------------------------------------------------------------
   CONTENT — swap freely, structure stays the same
--------------------------------------------------------------------- */
const SWATCHES = ['#120F2E', '#F4C430', '#FF6B57', '#1C1747', '#F5F0E6'];

const PROJECTS = [
  {
    tag: 'LMS · Node / Express / Prisma / React',
    title: 'AICN Training Platform',
    desc: 'Full-stack learning platform: certificate issuance, QR verification, role-based routing, production-hardened deploy pipeline.',
    status: 'In Production',
  },
  {
    tag: 'Healthcare · GCC Compliance',
    title: 'MaasaiOS',
    desc: 'Medical fitness examination platform built for GCC-bound worker screening — structured records, audit trail, exportable reports.',
    status: 'Building',
  },
  {
    tag: 'Diagnostics · Inventory Systems',
    title: 'MedLab OS — Reagent Tracker',
    desc: 'FEFO-logic reagent and consumable tracker for diagnostic labs. Prisma schema, Express API, React/TanStack Query frontend.',
    status: 'Shipped v1',
  },
  {
    tag: 'Freelance · Zama Systems',
    title: 'Client Web Builds',
    desc: 'Landing pages and small-business sites for local clients — healthcare and lab-adjacent niches as a trust differentiator.',
    status: 'Open for Work',
  },
];

const BADGES = ['KMLTTB REGISTERED', 'HOD EXPERIENCE', 'FULL-STACK TRANSITION', 'NAIROBI, KE'];

/* ---------------------------------------------------------------------
   COMPONENT
--------------------------------------------------------------------- */
export default function HeroPortfolio() {
  const rootRef = useRef(null);
  const canvasHostRef = useRef(null);
  const heroRef = useRef(null);

  /* ---------- Lenis + GSAP ScrollTrigger wiring ---------- */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });

    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  /* ---------- Three.js hero field ---------- */
  useEffect(() => {
    const host = canvasHostRef.current;
    if (!host) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, host.clientWidth / host.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(host.clientWidth, host.clientHeight);
    host.appendChild(renderer.domElement);

    // Wireframe icosahedron — the "signature object"
    const icoGeo = new THREE.IcosahedronGeometry(2.6, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#f4c430'),
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    });
    const ico = new THREE.Mesh(icoGeo, icoMat);
    scene.add(ico);

    const icoGeoInner = new THREE.IcosahedronGeometry(1.7, 0);
    const icoMatInner = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#ff6b57'),
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const icoInner = new THREE.Mesh(icoGeoInner, icoMatInner);
    scene.add(icoInner);

    // Particle scatter behind the object
    const PARTICLE_COUNT = 420;
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 14 - 4;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: new THREE.Color('#f5f0e6'),
      size: 0.045,
      transparent: true,
      opacity: 0.55,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    let frameId;
    const clock = new THREE.Clock();
    const animate = () => {
      const t = clock.getElapsedTime();
      ico.rotation.x = t * 0.08;
      ico.rotation.y = t * 0.12;
      icoInner.rotation.x = -t * 0.1;
      icoInner.rotation.y = -t * 0.06;
      particles.rotation.y = t * 0.015;

      camera.position.x += (mouseX * 0.6 - camera.position.x) * 0.02;
      camera.position.y += (-mouseY * 0.4 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      if (!host) return;
      camera.aspect = host.clientWidth / host.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(host.clientWidth, host.clientHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      icoGeo.dispose();
      icoMat.dispose();
      icoGeoInner.dispose();
      icoMatInner.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
      if (host.contains(renderer.domElement)) host.removeChild(renderer.domElement);
    };
  }, []);

  /* ---------- GSAP entrance timeline + scroll reveals ---------- */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from('.hb-kicker', { opacity: 0, y: 14, duration: 0.6 })
        .from('.hb-headline .hb-line', { opacity: 0, y: 40, duration: 0.85, stagger: 0.1 }, '-=0.3')
        .from('.hb-tagline', { opacity: 0, y: 16, duration: 0.6 }, '-=0.4')
        .from('.hb-cta-row .hb-btn', { opacity: 0, y: 16, duration: 0.5, stagger: 0.08 }, '-=0.35')
        .from('.hb-chip', { opacity: 0, scale: 0.6, duration: 0.4, stagger: 0.06, ease: 'back.out(2)' }, '-=0.3');

      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 46,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 82%' },
        });
      });

      gsap.utils.toArray('.hb-card').forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          delay: i * 0.05,
          ease: 'power2.out',
          scrollTrigger: { trigger: card, start: 'top 88%' },
        });
      });

      gsap.to('.hb-hero-field', {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="hb-root" ref={rootRef}>
      {/* ================= NAV ================= */}
      <nav className="hb-nav">
        <span className="hb-logo">ZAMA SYSTEMS</span>
        <div className="hb-nav-links">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section className="hb-hero" ref={heroRef}>
        <div className="hb-hero-field" ref={canvasHostRef} />
        <svg className="hb-halftone" viewBox="0 0 800 800" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="hb-dots" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="7" cy="7" r="2.6" fill="#f4c430" opacity="0.35" />
            </pattern>
          </defs>
          <rect width="800" height="800" fill="url(#hb-dots)" />
        </svg>
        <div className="hb-hero-glow" />

        <div className="hb-hero-content">
          <div className="hb-kicker">
            <i className="hb-dot" /> FULL-STACK DEVELOPER · MEDICAL LAB TECHNOLOGIST
          </div>
          <h1 className="hb-headline">
            <span className="hb-line">Systems built by</span>
            <span className="hb-line hb-accent">someone who's worked</span>
            <span className="hb-line">the floor, not just the stack.</span>
          </h1>
          <p className="hb-tagline">
            Dev Scipio — building diagnostic-grade software with the same discipline
            a lab demands: verified inputs, traceable logic, zero guesswork.
          </p>
          <div className="hb-cta-row">
            <a href="#work" className="hb-btn hb-btn-primary">Get a Quote</a>
            <a href="#about" className="hb-btn hb-btn-secondary">My Story</a>
            <a href="#work" className="hb-btn hb-btn-ghost">View Work</a>
          </div>
          <div className="hb-swatches">
            {SWATCHES.map((hex) => (
              <span key={hex} className="hb-chip" style={{ background: hex }} title={hex} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= WORK ================= */}
      <section id="work" className="hb-section">
        <h2 className="reveal hb-h2">
          <span className="hb-eyebrow">01 / SELECTED WORK</span>
          Projects that had to work the first time
        </h2>
        <div className="hb-grid">
          {PROJECTS.map((p) => (
            <div className="hb-card" key={p.title}>
              <div className="hb-card-top">
                <span className="hb-card-tag">{p.tag}</span>
                <span className="hb-card-status">{p.status}</span>
              </div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section id="about" className="hb-section hb-about">
        <div className="reveal hb-about-grid">
          <div>
            <span className="hb-eyebrow">02 / ABOUT</span>
            <h2 className="hb-h2">From the bench to the backend</h2>
            <p className="hb-about-text">
              Years running diagnostics as a Head of Department taught me what
              "production-ready" actually means: no silent failures, no unverified
              results, no shortcuts that show up later as someone else's problem.
              I bring that same standard to every build — from LMS platforms to
              lab-inventory systems to client sites shipped through Zama Systems.
            </p>
            <div className="hb-badges">
              {BADGES.map((b) => (
                <span key={b} className="hb-badge">{b}</span>
              ))}
            </div>
          </div>
          <div className="hb-about-panel">
            <div className="hb-code-box">
{`function flagResult(value, range) {
  if (value > range.high) return "High";
  if (value < range.low) return "Low";
  return "Normal";
}`}
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section id="contact" className="hb-section hb-contact reveal">
        <span className="hb-eyebrow">03 / CONTACT</span>
        <h2 className="hb-h2">Have a build that needs to be right the first time?</h2>
        <div className="hb-contact-row">
          <a className="hb-btn hb-btn-primary" href="mailto:eaphoney@gmail.com">
            eaphoney@gmail.com
          </a>
          <a className="hb-btn hb-btn-secondary" href="https://github.com/SCIPIO666" target="_blank" rel="noreferrer">
            github.com/SCIPIO666
          </a>
          <span className="hb-btn hb-btn-ghost">+254 115 529 179</span>
        </div>
      </section>

      <footer className="hb-footer">
        <span>© {new Date().getFullYear()} Zama Systems</span>
        <span>Nairobi, Kenya</span>
      </footer>

      {/* ================= SCOPED STYLES ================= */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,600;1,9..144,600&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600;700&display=swap');

        .hb-root{
          --bg:#120f2e; --surface:#1c1747; --border:#2c2568;
          --ink:#f5f0e6; --muted:#b1a9dd;
          --primary:#f4c430; --primary-ink:#1a1440;
          --accent:#ff6b57;
          font-family:'Inter',sans-serif;
          background:var(--bg);
          color:var(--ink);
          overflow-x:hidden;
        }
        .hb-root *{box-sizing:border-box;}

        .hb-nav{
          position:sticky; top:0; z-index:20;
          display:flex; justify-content:space-between; align-items:center;
          padding:22px 48px;
          background:linear-gradient(180deg, rgba(18,15,46,0.92), rgba(18,15,46,0.4));
          backdrop-filter:blur(6px);
          border-bottom:1px solid var(--border);
        }
        .hb-logo{font-family:'JetBrains Mono',monospace; font-weight:700; letter-spacing:.14em; font-size:.82rem;}
        .hb-nav-links{display:flex; gap:28px;}
        .hb-nav-links a{color:var(--muted); text-decoration:none; font-size:.86rem; font-weight:500;}
        .hb-nav-links a:hover{color:var(--primary);}

        .hb-hero{
          position:relative;
          min-height:100vh;
          display:flex; align-items:center;
          padding:0 48px;
          overflow:hidden;
          background:
            radial-gradient(circle at 82% 18%, rgba(244,196,48,0.22), transparent 45%),
            radial-gradient(circle at 10% 85%, rgba(255,107,87,0.18), transparent 50%),
            linear-gradient(180deg, #120f2e 0%, #17123c 100%);
        }
        .hb-hero-field{position:absolute; inset:0; z-index:1;}
        .hb-halftone{position:absolute; inset:0; z-index:1; opacity:.5; pointer-events:none;}
        .hb-hero-glow{
          position:absolute; inset:0; z-index:1; pointer-events:none;
          background:radial-gradient(ellipse at 50% 100%, rgba(18,15,46,0.9), transparent 60%);
        }
        .hb-hero-content{position:relative; z-index:2; max-width:760px;}

        .hb-kicker{
          font-family:'JetBrains Mono',monospace; font-size:.75rem; letter-spacing:.2em;
          text-transform:uppercase; color:var(--muted);
          display:flex; align-items:center; gap:10px; margin-bottom:22px;
        }
        .hb-dot{width:7px; height:7px; border-radius:50%; background:var(--accent); display:inline-block;}

        .hb-headline{
          font-family:'Fraunces',Georgia,serif; font-weight:600;
          font-size:clamp(2.2rem,5.2vw,4.2rem); line-height:1.08; letter-spacing:-.01em;
        }
        .hb-line{display:block;}
        .hb-accent{color:var(--primary);}

        .hb-tagline{margin-top:22px; max-width:520px; color:var(--muted); font-size:1.05rem; line-height:1.6;}

        .hb-cta-row{display:flex; flex-wrap:wrap; gap:12px; margin-top:34px;}
        .hb-btn{
          display:inline-flex; align-items:center; gap:8px;
          padding:13px 24px; border-radius:40px;
          font-family:'JetBrains Mono',monospace; font-weight:700; font-size:.76rem;
          text-transform:uppercase; letter-spacing:.05em; text-decoration:none;
          cursor:pointer; transition:transform .2s ease, box-shadow .2s ease;
        }
        .hb-btn:hover{transform:translateY(-2px);}
        .hb-btn-primary{background:var(--primary); color:var(--primary-ink);}
        .hb-btn-primary:hover{box-shadow:0 10px 24px rgba(244,196,48,0.35);}
        .hb-btn-secondary{background:transparent; border:1px solid var(--primary); color:var(--primary);}
        .hb-btn-ghost{background:rgba(255,255,255,0.04); border:1px solid var(--border); color:var(--muted);}

        .hb-swatches{display:flex; gap:10px; margin-top:38px;}
        .hb-chip{width:30px; height:30px; border-radius:8px; border:1px solid rgba(255,255,255,0.18);}

        .hb-section{padding:120px 48px; max-width:1180px; margin:0 auto;}
        .hb-eyebrow{
          display:block; font-family:'JetBrains Mono',monospace; font-size:.72rem;
          letter-spacing:.2em; color:var(--accent); margin-bottom:14px;
        }
        .hb-h2{
          font-family:'Fraunces',Georgia,serif; font-weight:600;
          font-size:clamp(1.7rem,3.4vw,2.6rem); line-height:1.2; max-width:760px;
        }

        .hb-grid{
          display:grid; grid-template-columns:repeat(2,1fr); gap:22px; margin-top:48px;
        }
        @media (max-width:820px){ .hb-grid{grid-template-columns:1fr;} }
        .hb-card{
          background:var(--surface); border:1px solid var(--border); border-radius:20px;
          padding:26px 28px; transition:transform .25s ease, border-color .25s ease;
        }
        .hb-card:hover{transform:translateY(-4px); border-color:var(--primary);}
        .hb-card-top{display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; flex-wrap:wrap; gap:8px;}
        .hb-card-tag{font-family:'JetBrains Mono',monospace; font-size:.68rem; color:var(--muted); text-transform:uppercase; letter-spacing:.06em;}
        .hb-card-status{font-family:'JetBrains Mono',monospace; font-size:.66rem; padding:4px 11px; border-radius:40px; background:rgba(244,196,48,0.12); color:var(--primary); border:1px solid var(--primary);}
        .hb-card h3{font-family:'Fraunces',Georgia,serif; font-size:1.3rem; margin-bottom:10px;}
        .hb-card p{color:var(--muted); font-size:.92rem; line-height:1.55;}

        .hb-about-grid{display:grid; grid-template-columns:1.1fr .9fr; gap:48px; align-items:start;}
        @media (max-width:820px){ .hb-about-grid{grid-template-columns:1fr;} }
        .hb-about-text{margin-top:18px; color:var(--muted); font-size:1rem; line-height:1.7; max-width:520px;}
        .hb-badges{display:flex; flex-wrap:wrap; gap:10px; margin-top:26px;}
        .hb-badge{
          font-family:'JetBrains Mono',monospace; font-size:.68rem; letter-spacing:.05em;
          padding:8px 14px; border-radius:40px; border:1px solid var(--border); color:var(--muted);
        }
        .hb-about-panel{background:var(--surface); border:1px solid var(--border); border-radius:20px; padding:26px;}
        .hb-code-box{
          font-family:'JetBrains Mono',monospace; font-size:.82rem; color:var(--primary);
          white-space:pre-wrap; line-height:1.7; background:rgba(0,0,0,0.25);
          border-radius:12px; padding:18px 20px; border:1px solid var(--border);
        }

        .hb-contact{text-align:left;}
        .hb-contact-row{display:flex; flex-wrap:wrap; gap:12px; margin-top:30px;}

        .hb-footer{
          display:flex; justify-content:space-between; padding:28px 48px;
          border-top:1px solid var(--border); font-family:'JetBrains Mono',monospace;
          font-size:.74rem; color:var(--muted);
        }

        @media (prefers-reduced-motion:reduce){
          .hb-root *{animation-duration:.01ms !important; transition-duration:.01ms !important;}
        }
      `}</style>
    </div>
  );
}