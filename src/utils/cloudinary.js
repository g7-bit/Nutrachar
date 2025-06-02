import {v2 as cloudinary} from "cloudinary"
import fs  from "fs"



cloudinary.config({ 
  cloud_name: 'daahu0xca', 
  api_key: '742269976877271', 
  api_secret: 'x0AdtOpO87sSg4wFBnkyZUAh-1Y',

});



const uploadOnCloudinary = async(localFilePath)=>{
    // console.log("1.inside clodinary middleware:: localpath:: ", localFilePath)


    try{
        if(!localFilePath) return null;
        
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto",
            }
        )
        
        
        fs.unlinkSync(localFilePath)
        return response
    }catch(error){
        fs.unlinkSync(localFilePath)
        console.log("3. i am here in catch of clodinary",error)
        return null
    }
}

export {uploadOnCloudinary}