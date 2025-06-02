import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiRespoonse.js"
import { User } from '../models/user.model.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js'
import mongoose from 'mongoose'
import jwt from "jsonwebtoken"



const genRefreshAndAccessToken = async(userId)=>{

    try{
        const user = await User.findById(userId)
        
        const accessToken = user.generateAccessToken()
        // console.log("uaer controller :: gen token,:: ", accessToken)
        const refreshToken = user.generateRefreshToken()
        // console.log("uaer controller :: gen token,:: ", refreshToken)

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})

        return {accessToken, refreshToken}

    }catch(error){
        throw new ApiError(500, "Something went wrong while generating Access And Refresh Token")
    }
}

const genNewAccessToken = async (userId)=> {
    try {
        const user = await User.findById(userId)
        const newAccessToken = user.generateAccessToken()

        return {newAccessToken}
    }catch(error){
        throw new ApiError(500, "something went wrong while generating new access token")
    }
}

const registerUser = asyncHandler ( async (req,res)=>{

    const {username,email,password} = req.body
    console.log("req.body ::: ",req.body)

    if([username, email, password].some((field)=> field?.trim() ==="")){
        throw new ApiError(400, "All fields required")
    }

    const existingUser = await User.findOne({
        $or: [{username},{email}]
    })
    if(existingUser){
        throw new ApiError(409, "User already exists")
    }

    const avatarLocalPath = req.file?.path
    // console.log("avatarlocalpath:: ",avatarLocalPath)
    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file missing")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    console.log("user.controller.js::uploading on cloudinary:: ",avatar)
    if(!avatar){
        throw new ApiError(400, "error while uploading on avatar12")
    }

    const user = await User.create({
        username: username.toLowerCase(),
        email,
        password,
        avatar:avatar.url,
    })

    // to verify if user has actually saved in db
    const createdUserTempInstance = await User.findById(user._id).select("-password -refreshToken")
    if(!createdUserTempInstance){
        throw new ApiError(500, "Something went wrong while registering user")
    }
    return res
    .status(201)
    .json(new ApiResponse(200,"User Registered Successfully!") )


})
const loginUser = asyncHandler ( async (req,res)=>{
    const {email, username, password} = req.body
    // console.log("user.controller::loginUser:: ",req.body)

    
    
    // check - req.user not empty
    if(!(username || email)){
        throw new ApiError(400,"username or email required" )
    }
    
    //check - user is present in DB
    const user = await User.findOne({
        $or: [{username}, {email}]
    })
    if (!user){
        throw new ApiError(404, "User dosen't Exists")
    }

    // check - is password correct
    const isPasswordValid = await user.isPasswordCorrect(password)
    if (!isPasswordValid){
        throw new ApiError(401, "Invalid User Credentials")
    }
    const {accessToken, refreshToken} = await genRefreshAndAccessToken(user._id)
    // console.log(" user.controller:: loginn user:: refreshToken ", refreshToken, "access token ", accessToken)

    // prepare data to be sent/ res
    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    const options  = {
        httpOnly : true,
        secure : true
    }

    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken", refreshToken,options)
    .json(
        new ApiResponse(200,
            {
                user: loggedInUser, accessToken, refreshToken 
            },
            "User logged In successfully"
        )
    )
        

})


const logoutUser = asyncHandler(async (req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset:{
                refreshToken: 1
            }
        },
        {
            new:true
        }
    )
    const options = {
        httpOnly: true,
        secure: true,
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponse(200, {}, "user Logged Out")
    )

})


const refreshAccessToken = asyncHandler(async (req,res)=>{
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if(!incomingRefreshToken){
        throw new ApiError(401, "unauthorized request")
    }

    try{
        const decodedToken =  jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET)

        const user = await User.findById(decodedToken._id)

        if (!user){
            throw new ApiError(401,"invalid refresh token")
        }

        if (incomingRefreshToken !== user?.refreshToken){
            throw new ApiError(401,"refresh token is expired or used")
        }

        // const {accessToken, refreshToken} = await genRefreshAndAccessToken(user._id)
        const {newAccessToken} = await genNewAccessToken(user._id)

        const options = {
            httpOnly: true,
            secure: true,
        }

        return res
        .status(200)
        .cookie("accessToken",newAccessToken,options)
        .cookie("refreshToken",incomingRefreshToken,options)
        .json(
            new ApiResponse(
                200,
                {accessToken: newAccessToken, refreshToken:incomingRefreshToken,},
                "Access token refreshed"
            )
        )
    }catch(error){
        throw new ApiError(401, error?.message || "Invalid refresh Token")
    }


})

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
}