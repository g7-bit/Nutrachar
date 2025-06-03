import React from 'react'
import logoimage from '/logo-light.png'

function Logo({
    className="",
    ...props
}) {
  return (
  
    <img 
    className='w-36  rounded-2xl'
    src={logoimage}
     />

  )
}

export default Logo