import React, { useRef } from 'react'
import PageHeader from '../components/PageHeader'
import { useSectionReveal } from '../components/ScrollEffects'
import me from '../../public/me.JPG'

export default function AboutPage() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  
  useSectionReveal(sectionRef, {
    from: { opacity: 0, y: 60 },
    to: { opacity: 1, y: 0 },
    start: 'top 80%',
    scrub: false,
  });

  return (
    <section 
      ref={sectionRef} 
      id='about' 
      className='min-h-screen pt-24 md:mt-32 lg:mt-32 px-4 md:px-8 lg:px-16'
    >
      <div ref={contentRef} className='flex flex-col lg:flex-row gap-8 lg:gap-12 items-start'>
        
        {/* Left */}
        <div className='w-full lg:w-[55%]'>
          <PageHeader text='About Me' number='01.' />
          
          <div className='space-y-4 mt-4'>
            <p className='text-lg leading-relaxed'>
              <span className='text-primary-soft font-mono'>Hello! My name is Scipio,</span> and I have a compulsion for automating the mundane. If I have to do something twice, I start wondering whether I can build software to eliminate it entirely.
            </p>

            <p className='text-base leading-relaxed text-gray-300'>
              My journey into web development started in 2024 when I set out to automate inventory tracking at my workplace. It began as a humble VBA macro in Excel, but as the vision for the system grew, I quickly realized that what I wanted to build had outgrown what VBA was designed to handle.
            </p>

            <p className='text-base leading-relaxed text-gray-300'>
              Instead of scaling back the idea, I spent countless nights pushing that first Excel project to its absolute limits. Every workaround taught me something new, but it also convinced me that the solution wasn't another VBA form or spreadsheet—it was <span className='text-primary-soft font-mono'>software</span>.
            </p>

            <p className='text-base leading-relaxed text-gray-300'>
              So I rolled up my sleeves and dove headfirst into <span className='text-primary-soft font-mono'>web development</span>—all because I wanted to replace a single Excel sheet. Countless late-night debugging sessions, endless documentation deep-dives, courses, tutorials, and more coffee than I'd like to admit later, I realized something important: it was never just about the inventory system. What truly drove me was the challenge of eliminating repetitive work by building tools that make people's lives easier.
            </p>

            <p className='text-base leading-relaxed text-gray-300'>
              Since then, I've taken on increasingly ambitious projects, including <span className='text-primary-soft font-mono'>a Laboratory Information System, e-commerce applications, custom dashboards, and other full-stack solutions.</span> Every project has reinforced the same lesson—that one attempt to eliminate a manual process turned into <span className='text-primary-soft font-mono'>a lifelong pursuit of building thoughtful software.</span>
            </p>

            <p className='text-lg leading-relaxed font-medium text-primary'>
              Turns out, trying to kill one spreadsheet can ignite a lifelong chase for craftsmanship inside a code editor.
            </p>
          </div>
        </div>

        {/* Right */}
        <div className='w-full lg:w-[45%] flex justify-center lg:justify-end items-start mt-8 lg:mt-0'>
          <div className='relative group'>
            {/*  background glow  */}
            <div className='absolute -inset-1 bg-primary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
            
            {/* container - border and shadow */}
            <div className='relative rounded-2xl border-2 border-primary/60 shadow-2xl shadow-primary/10 overflow-hidden bg-dark-bg transition-all duration-300 hover:shadow-primary/20 hover:border-primary'>
              <img 
                src={me}
                alt='Scipio - Software Developer'
                className='w-full max-w-[400px] lg:max-w-[450px] h-auto object-cover aspect-square'
              />
              
              {/* overlay gradient for depth */}
              <div className='absolute inset-0 bg-gradient-to-t from-dark-bg/20 via-transparent to-transparent'></div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}