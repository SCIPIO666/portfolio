import React from 'react'
import Card from '../components/Card'
export default function HomePage() {
  return (
    <>
    <div>HomePage</div>
      <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card title="Project Alpha" description="A cool project with hover effects." />
      <Card title="Project Beta" description="Another awesome project." />
      <Card title="Project Gamma" description="Yet another project." />
    </div>
    </>
  )
}
