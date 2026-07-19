import React from 'react'

export default function Label({number='',text='',hasNumber=true}) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`text-primary font-mono text-l`}>
        {hasNumber?number : ''}
      </span>
      <span className="text-primary-50 text-l hover:text-primary">
        {text}
      </span>
    </span>
  )
}
