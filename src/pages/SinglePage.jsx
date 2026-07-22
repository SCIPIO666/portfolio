import React from 'react'
import AboutPage from './AboutPage'
import ExperiencePage from './ExperiencePage'
import ContactPage from './ContactPage'
import WorkPage from './WorkPage'
import  Sidebar from '../components/Sidebar'
import Hero from './HeroPage'
import EmailLink from '../components/EmailLink'
import Footer from '../components/Footer'
export default function SinglePage() {
  return (
    <div>
        <Hero/>
        <Sidebar/>
        <EmailLink/>
        <AboutPage/>
        <ExperiencePage/>
        <WorkPage/>
        <ContactPage/>
        <Footer/>
    </div>
  )
}
