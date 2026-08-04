import React from 'react'
export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 px-4 ">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted font-mono">
          &copy; {currentYear} <span className="text-primary">ZAMA Systems</span>
        </p>
        
        <p className="text-xs text-muted-soft font-mono tracking-wider">
          Developed by <span className="text-primary/80 hover:text-primary transition-colors"><a href='https://scipioportfolio-two.vercel.app/' className='decoration-1'>Dev Scipio</a></span>
        </p>
        
      </div>

    </footer>
  )
}