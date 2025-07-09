import React from 'react'
import { useDispatch } from 'react-redux'

import authService from '../expressBackend/auth'
import { logout } from '../store/authslice'


function LogoutBtn({className=""}) {
    const dispatch = useDispatch()

    const logoutHandler = ()=>{
        authService.logout()
        .then(()=>{
            dispatch(logout())
        })
    }

 
  return (
    <button
    onClick={logoutHandler}
    className={className}
    >
        Logout
        
    </button>
  )
}

export default LogoutBtn