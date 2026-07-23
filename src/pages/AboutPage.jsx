import React, { useRef } from 'react'
import PageHeader from '../components/PageHeader'
import { useSectionReveal } from '../components/ScrollEffects'

export default function AboutPage() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  
  useSectionReveal(sectionRef, {
    from: { opacity: 0, y: 60 },
    to: { opacity: 1, y: 0 },
    start: 'top 80%',
    scrub: false, // true for scroll animation
  });

  //  specific content 
  // useSectionReveal(contentRef, {
  //   from: { opacity: 0, y: 30 },
  //   to: { opacity: 1, y: 0 },
  //   start: 'top 85%',
  //   scrub: false,
  // });

  return (
    <section 
      ref={sectionRef} 
      id='about' 
      className='min-h-screen pt-24 md:mt-32 lg:mt-32'
    >
      <div ref={contentRef}>
        <PageHeader text='About Me' number='01.' />
        <p className="text-muted max-w-2xl mx-auto text-center mt-8">
         About me
        </p>
      </div>
    </section>
  )
}