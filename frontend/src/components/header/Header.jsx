import React from 'react'
import { Link } from 'react-router-dom'
import {Logo} from '../../components'

//TODO:  create logic for header elements
function Header() {
  return (
    <>
    <div className=' flex  justify-between items-center px-5'> {/* md means mediam and up */}
        <div>
            <Logo />
        </div>
        <div>
            <Link to="/">
            How It works
            </Link>      
        </div>
        <div className='flex gap-x-8 '>
          <div>
            <Link to="/login">
            Login
            </Link>
          </div>
          <div>
            <Link to="/signup">
            Signup
            </Link>
          </div>
        </div>

    </div>
    </>
  )
}

export default Header