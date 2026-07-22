import AboutPage from './AboutPage'
import ExperiencePage from './ExperiencePage'
import ContactPage from './ContactPage'
import WorkPage from './WorkPage'
import Sidebar from '../components/Sidebar'
import Hero from './HeroPage'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
export default function SinglePage() {
  return (
    
    <div>
      {/* SocialLinks + EmailLink lg+ only */}
      <Sidebar />
      <main className="lg:ml-[10%] min-h-screen pt-24 md:mt-32 lg:mt-32">
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
