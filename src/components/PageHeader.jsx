import React from 'react'

function PageHeader({number,text}) {
  return (
    <div className='flex row no-wrap'>
        <h3>{number}</h3>
        <h3>{text}</h3>
        <span></span>
    </div>
  )
}

export default PageHeader