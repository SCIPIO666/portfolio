import React, { useRef } from 'react'
import PageHeader from '../components/PageHeader'
import { useSectionReveal } from '../components/ScrollEffects'
export default function ExperiencePage() {
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

    <section ref={sectionRef} id='experience' className='min-h-screen pt-24 md:mt-32 lg:mt-32'>
        <PageHeader  text='Experience' number='02.'/>
        <p ref={contentRef}>experience info</p>
    </section>
  )
}
