import AboutPage from './AboutPage'
import ExperiencePage from './ExperiencePage'
import ContactPage from './ContactPage'
import WorkPage from './WorkPage'
import Sidebar from '../components/Sidebar'
import Hero from './HeroPage'
import Footer from '../components/Footer'
import useLenis from '../lib/useLenis'

export default function SinglePage() {
 //lenis init
  useLenis();

  return (
    <div className='pt-0 mt-0'>
      {/* socialLinks & emailLink in big screens only */}
      <Sidebar />

      <main className="lg:ml-[10%] min-h-screen pt-0">  
        <Hero />
        <AboutPage />
        <ExperiencePage />
        <WorkPage />
        <ContactPage />
        <Footer />
      </main>
    </div>
  )
}