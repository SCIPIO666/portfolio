import React from 'react'
import Card from '../components/Card'
import CallToActionButton from '../components/CallToActionButton'

export default function HomePage() {
  return (
    
    <div>
        <p className='text-primary p-4 font-nav-x mx-2'>Hi, my name is</p>
        <h1 className='text-primary px-4  mx-2 mb-0 bold font-sans font-section-x text-hero'>Esphoney Ondicho Scipio .</h1>
        <h2 className='text-h2 m-0'>I build software for the web.</h2>
        <p className='text-body'>I’m a web developer specializing in building  exceptional digital experiences.
           Currently, I’m focused on engeneering products for the medical industry.
      </p>

      <CallToActionButton text="Get My Resume"/>
    </div>
  )
}
