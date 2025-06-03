import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
   <div className='bg-amber-100 flex justify-around items-center'>

    <div>
      About Us
    </div>

    <div>
      <div>
        <Link to="https://github.com/g7-bit">Github</Link>
      </div>
      <div>
        <Link to="https://github.com/g7-bit">Instagram</Link>
      </div>
      <div>
        <Link to="https://github.com/g7-bit">Email</Link>
      </div>
  

    </div>
   </div>
  )
}

export default Footer