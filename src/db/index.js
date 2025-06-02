import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"

const  connectDB = async ()=> {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`src::db::index.js:: mongodb connected: host :: ${connectionInstance.connection.host}::  DB name::${connectionInstance.connection.name}`)
    } catch (error) {
        console.log("src::db::index.js:: mongodb connection FAILED ", error)
        process.exit(1) // nodejs command to stop execution
        
    }
}

export default connectDB