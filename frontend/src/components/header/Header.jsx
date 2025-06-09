import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {Logo, LogoutBtn} from '../../components'
import { useSelector } from 'react-redux'

//TODO:  create logic for header elements
function Header() {

  const userDataStore= useSelector((state)=>state.auth.userData)

  // useEffect(()=>{

  // },[userDataStore])
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
          {userDataStore? 
          <div>
            <i>{userDataStore.username}</i>
          </div>
          :<p>not logged in</p>
          }
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
          <div>
            <LogoutBtn/>
          </div>
        </div>

    </div>
    </>
  )
}

export default Header