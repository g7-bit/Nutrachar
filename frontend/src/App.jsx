import { useState } from 'react'
import axios from 'axios';
import './App.css'
import { Outlet } from 'react-router-dom';
import { Footer, Header } from './components';


function App() {

  const [msg, setMsg] = useState('')
  const url = 'api/home';


  // useState( ()=>{
    
  //   axios.get(url)
  //   .then( (response)=>{
  //     console.log(response.data)

  //     setMsg(response.data)
  //   })
  //   .catch((error)=>{
  //     console.log(error)
  //   })
  // })

  
  return (
    <>
    
    <Header />
    <Outlet/>
    <Footer />
    </>
  )
}

export default App
