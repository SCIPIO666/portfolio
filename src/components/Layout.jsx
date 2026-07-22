
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
 import Header from './Header'
 import SocialLinks from './SocialLinks'
import EmailLink from './EmailLink'
export default function Layout() {
  return (
    <div className="min-h-screen bg-bg text-ink flex flex-col">
      <Navbar />
      <Header />
      <SocialLinks />
      <EmailLink />
      <main className="flex-1">
          
        </main>
 
     
 
      <footer className="border-t border-border">
        <div className="max-w-5xl mx-auto px-6 py-8 flex justify-between text-xs font-mono text-muted-soft">
          <span>© {new Date().getFullYear()} Zama Systems</span>
          <span>Nairobi, Kenya</span>
        </div>
      </footer>
    </div>
  )
}
 