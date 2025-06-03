
import express from "express"
import cors from "cors"
const app = express()
import cookieParser from "cookie-parser"

// const corsOrigiUrl = process.env.CORS_ORIGIN

// const corsOptions = {
//   // origin: 'http://localhost:5173', //ISSUE:: env is not working sometiems
//   // origin: `${process.env.CORS_ORIGIN}`, //ISSUE:: env is not working sometiems
//   origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
//   // origin: corsOrigiUrl,
//   credentials: true,
//   allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
// };
// app.use(cors(corsOptions))


app.use(express.json())
// app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended:true, limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

import { ApiError } from "./utils/ApiError.js"

import userRouter from './routes/user.routes.js'


app.get("/api/v1/backend", (req,res)=>{
    const contennt1= {
        message: "backend datafrom frontend"
    }
    console.log("/app.js/backedn ")
    // console.log(typeof(process.env.CORS_ORIGIN))
    console.log(process.env.CORS_ORIGIN)
    // console.log("app.js backend env ;: ", process.env.CORS_ORIGIN)
    res.json(contennt1)

})


app.use("/api/v1/users", userRouter)

app.use((err,req,res,next)=>{
  if (err instanceof ApiError){
    res
    .status(err.statusCode)
    .json({
      success: false,
      message: err.message,
      errors: err.errors
    })
  }else{
    res.status(500).send("Something Broke on Serverside")
  }

})

// app.use( (req,res)=>{
//     res.status(404).send("route dosn't exists")
// })


export {app}