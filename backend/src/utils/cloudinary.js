// import dotenv from 'dotenv'
// dotenv.config({
//     path:'./.env'
// })

import {v2 as cloudinary} from "cloudinary"
import fs  from "fs"

console.log("cloudinary api",process.env.CLOUDINARY_API_KEY)

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,

});



const uploadOnCloudinary = async(localFilePath)=>{
    // console.log("1.inside clodinary middleware:: localpath:: ", localFilePath)


    try{
        if(!localFilePath) return null;
        
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto",
            }
        )
        
        
        // fs.unlinkSync(localFilePath)
        return response
    }catch(error){
        // fs.unlinkSync(localFilePath)
        console.log("3. i am here in catch of clodinary",error)
        return null
    }finally{
        await fs.promises.unlink(localFilePath);
    }
}

export {uploadOnCloudinary}