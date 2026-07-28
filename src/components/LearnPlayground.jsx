import { useRef } from 'react'
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

    
  }, { scope: section1Ref })
  
  // SECTION 2: Scroll + Modal 
  
  useGSAP(() => {
    // Your code here
  }, { scope: section2Ref })
  
  // SECTION 3: Advanced Timeline Control
  useGSAP(() => {

    
  }, { scope: section3Ref })
  
  return (
    <div className="min-h-screen">
      {/* Section 1 */}
      <section ref={section1Ref} className="h-screen">
        <h2>Section 1: Basic Scroll Timeline</h2>
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