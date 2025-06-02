import connectDB from './db/index.js'
import { app } from './app.js'

import dotenv from 'dotenv'
dotenv.config({
    path:'./.env'
})

const port = process.env.PORT || 3000
connectDB()
.then(()=>{

    app.listen(port, ()=>{
        console.log("server started listieing on port ", port)
    })
})
.catch((err)=>{
    console.log("index.js:: mongodb connection failed:: ",err )
})

app.get("/test", (req,res)=>{
    res.send("working")
})
