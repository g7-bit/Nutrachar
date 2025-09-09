import dotenv from 'dotenv'
dotenv.config({
    path:'./.env'
})
import connectDB from './db/index.js'


import { app } from './app.js'

const port = process.env.PORT || 3000
connectDB()
.then(()=>{

    app.listen(port, ()=>{
        console.log("server started listieing on port ", port)
        console.log("server started listieing on gemini-",process.env.GEMINI_API)
    })
})
.catch((err)=>{
    console.log("index.js:: mongodb connection failed:: ",err )
})


