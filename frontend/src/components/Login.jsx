import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authslice.js";
import authService from "../expressBackend/auth.js";
import { Button, Input, Logo } from "./index.js";
import { useDispatch,useSelector } from "react-redux";
import { useForm } from "react-hook-form";

function Login() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();



  const loginUser= async(data)=>{
    setError("")
    setLoading(true)

    const {email, password} = data

    try {
     const userData = await authService.login({email,password})
     if(!userData){
      setError("invalid User Credentials")
     }
     if(userData){
      const currUserData = await authService.getCurrentUser()
      if(currUserData){
        dispatch(login(currUserData.data.data))
      }
      navigate("/dashboard")
    }
    setLoading(false)
    } catch (error) {
      setLoading(false)
      setError("Incorrect Login details")
      console.log("login main try catch error::", error)
    }

  }

  return (
    <div className=" text-white text-3xl">
      <div className="flex justify-between min-h-screen[80%] bg-amber-100 ">

        <div className="hidden lg:block basis-[50vw]">
            <div className=" grow  bg-amber-100 h-full overflow-hidden" >
              <img
                className="  mask-b-from-80%  mask-b-to-100% mask-r-from-80%  mask-r-to-100% "
                src="https://res.cloudinary.com/daahu0xca/image/upload/v1749025000/Gemini_Generated_Image_dvp2z4dvp2z4dvp2_qjsowk.png"
                alt=""
              />
            </div>
        </div>


        <div className=" grow  text-black">
          
          <div className="h-full flex items-center justify-center ">
            <div className="flex w-120 h-100 flex-col flex-wrap shadow-2xl rounded-3xl p-5 bg-amber-50 ">

              
                 <form 
                 onSubmit={handleSubmit(loginUser, (errors)=>{setError("Please Enter all details in Form")})}
                  encType="multipart/form-data"
                 >
                <div className="animate-fade-up-fast text-4xl text-center">
                  Login
                </div>
                <div className="animate-fade-up-slow text-wrap text-sm break-words text-center mb-5">
                  Register for a better experience
                  <hr className="mt-5 w-2/3 mx-auto" />
                </div>
                <div className="flex flex-col items-center">
                  <Input
                  label="Email"
                  type= "email"
                  placeholder="jammy@gmail.com"
                  inputClassName="w-70 bg-white"
                  {...register("email",{required:true,})}
                  />

                  <Input
                  label="Password"
                  type="password"
                  inputClassName="w-70 bg-white "
                  placeholder="eg: X*61OdubV#YAZ8"
                  autoComplete="off"
                  {...register("password",{required:true})}
                  />

                  
                  
                  <Button 
                  type='submit'
                  className="animate-fade-up-slow2 bg-blue-500 font-normal w-60 p-1 font-sans transition delay-100 duration-300 ease-in-out hover:scale-110 cursor-pointer  hover:bg-indigo-600 "
                  
                  >

                    
                    {loading ? 
                    <p>Loading...</p>
                    :<p>Continue</p>
                    }
                    
                  </Button>
                  {error && <p className="text-xl text-red-500 mb-5 text-center">{error}</p>}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login