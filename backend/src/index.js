import dotenv from 'dotenv'
dotenv.config({
    path:'./.env'
})
import connectDB from './db/index.js'


import { app } from './app.js'

if (process.env.NODE_ENV !== 'production') {
    //For local dev
    connectDB()
    .then(()=>{
        app.listen(port, ()=>{
            console.log("server started listening on port ", port)
        })
    })
    .catch((err)=>{
        console.log("index.js:: mongodb connection failed:: ",err )
    })
} else {
    // For Vercel, connect to DB but don't listen
    connectDB().catch((err)=>{
        console.log("index.js:: mongodb connection failed:: ",err )
    })
}

// Export for Vercel
export default app;