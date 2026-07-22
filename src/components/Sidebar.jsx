import React from 'react'
import Header from './Header'
import EmailLink from './EmailLink'
import SocialLinks from './SocialLinks'
export default function Sidebar() {
  return (
    <div>
      <Header/>
      <SocialLinks/>
      <EmailLink/>
    </div>
  )
}
