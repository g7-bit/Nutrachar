import React, { useEffect } from 'react'
import axios from 'axios'
import envConf from '../conf/envConf.js'
import authService from '../expressBackend/auth.js'
import {Link} from 'react-router-dom'
import {Button} from '../components'

function Home() {


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