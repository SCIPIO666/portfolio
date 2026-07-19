
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
 
export default function Layout() {
  return (
    <div className="min-h-screen bg-bg text-ink flex flex-col">
      <Navbar />
 
      <main className="flex-1">
        <Outlet />
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
 