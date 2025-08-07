import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

 function AuthLayout({children, authentication = true}) {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const loggedInStatus = useSelector((state) => state.auth.status);



    useEffect(()=>{

        // to access childrens, you need to avoid these filters
        //if asking authentication and you are NOT logged in
        if(authentication && loggedInStatus !== authentication){
            navigate(`/login`)
            //if NOt asking authentication (false) and you ARE logged in
            // like if going to login page, you shouldn't be authenticated right?, 
            //      so if you still are logged in and asking for login page, then go to home
        }else if(!authentication && loggedInStatus !== authentication){
            navigate(`/`)
        }
        setLoading(false)
    },[loggedInStatus,navigate,authentication])
    
  return loading ? <p></p>: children
  
}

export default AuthLayout