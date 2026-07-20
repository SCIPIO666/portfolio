import React from 'react'
import CallToActionButton from '../components/CallToActionButton'

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center px-6 md:px-12 lg:px-24 pt-20 pb-12 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-gradient-hero" />
      <div className="absolute -top-10 -right-10 lg:right-20 lg:top-10 text-[12rem] lg:text-[20rem] font-display font-bold text-surface-raised/30 select-none pointer-events-none leading-none">
        E
      </div>
      
      <div className="max-w-4xl w-full mx-auto relative z-10">

        <p className="text-primary-soft font-mono text-xs tracking-[0.2em] uppercase mb-4">
          Hi, my name is
        </p>
        

        <h1 className="text-hero gradient-glow font-display font-bold leading-[1.08] text-ink mb-2">
          Esphoney Ondicho Scipio.
        </h1>
        

        <h2 className="text-h2 font-sans font-medium text-muted leading-[1.2] mb-6">
          I build software for the web.
        </h2>
        

        <p className="text-lede font-sans text-muted leading-[1.7] max-w-2xl mb-10">
          I'm a web developer specializing in building exceptional digital experiences. 
          Currently, I'm focused on engineering products for the medical industry.
        </p>
        
  
        <div className="flex flex-wrap items-center gap-4">
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
        
        <div className="flex items-center gap-3 mt-12 text-muted-soft text-sm font-mono">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success" />
          </span>
          <span>Available for freelance work</span>
        </div>
      </div>
    </div>
  )
}
