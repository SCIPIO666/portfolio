
import { useState, useEffect , useRef} from 'react';
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function LearnPlayground() {

  const section1Ref = useRef(null)
  const section2Ref = useRef(null)
  const section3Ref = useRef(null)
  
  // Section 1 refs
  const panel1Ref = useRef(null)
  const panel2Ref = useRef(null)
  const panel3Ref = useRef(null)
  
  // Section 2 refs
  const cardRefs = useRef([])
  
  // Section 3 refs
  const timelineRef = useRef(null)
  const progressRef = useRef(null)
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  
  // SECTION 1: Basic Scroll-Triggered Timeline
  useGSAP(() => {

    gsap.to(panel1Ref.current,{
            scrollTrigger: {
                trigger: "#a",
                toggleActions: "restart pause reverse none "
            },
            x: 400,
             rotation: 360,
            duration: 4,
            
            

     }
    )
    gsap.from(panel2Ref.current,{
            scrollTrigger: {
                trigger: "#b",
                toggleActions: 'restart pause reverse none '
            },
            x: 400,
             rotation: 360,
            duration: 4,
            

     }
    )
    gsap.to(panel3Ref.current,{
            scrollTrigger: {
                trigger: "#c",
                toggleActions: 'restart pause reverse none '
            },
            x: 400,
            y: -100,
             rotation: 360,
            duration: 4,
            

     }
    )
    
  }, { scope: section1Ref })
  
  // SECTION 2: Scroll + Modal 
  
  useGSAP(() => {

  }, { scope: section2Ref })
  
  // SECTION 3: Advanced Timeline Control
  useGSAP(() => {

    
  }, { scope: section3Ref })
  
  return (
    <div className="min-h-screen">
      {/* Section 1 */}
      <section ref={section1Ref} className="min-h-screen flex flex-col gap-3">
        <h2>Section 1: Basic Scroll Timeline</h2>
        <div id="a" ref={panel1Ref} className='w-[100px] h-[100px] rounded-full bg-white text-accent'>panel 1</div>
        <div id="b" ref={panel2Ref} className='w-[100px] h-[100px] rounded-full bg-white text-accent'>panel 2</div>
        <div id="c" ref={panel3Ref} className='w-[100px] h-[100px] rounded-full bg-white text-accent'>panel 3</div>
        {/* 3 panels */}
      </section>
      
      {/* Section 2 */}
      <section ref={section2Ref} className="h-screen">
        <h2>Section 2: Scroll + Modal</h2>
        {/* Cards + Modal */}
      </section>
      
      {/* Section 3 */}
      <section ref={section3Ref} className="h-screen">
        <h2>Section 3: Timeline Controls</h2>
        {/* Controls + Progress */}
      </section>
    </div>
  )
}