import React, { useEffect } from 'react'
import axios from 'axios'
import envConf from '../conf/envConf.js'
import authService from '../expressBackend/auth.js'
import {Link} from 'react-router-dom'
import {Button} from '../components'

function Home() {


useEffect(()=>{
    const username= "Girdhar"
    const email= 'email@email.com'
    const password= "email1234"

const fetchData = async ()=>{
    const userI= await authService.login({username, password})
    // const userInfo= await  authService.getCurrentUser()
    // const reftoken = await authService.getNewAccessToken()
    setTimeout(async()=>{
      const logoutfn = await authService.logout()
    },3000)
}
fetchData()
  },[])




  return (
    
    <div>
        <div className='bg-amber-200'>Hommies.jsx</div>
        <div> 
          <Link to='/dashboard'><Button> Get Started</Button></Link>
        </div>
    </div>
    
    
  )
}

export default Home