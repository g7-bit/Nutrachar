import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authslice.js";
import authService from "../expressBackend/auth.js";
import { Button, Input, Logo } from "./index.js";
import { useDispatch,useSelector } from "react-redux";
import { useForm } from "react-hook-form";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();

  const createNewAcc = async (data) =>{
    setError("")
    setLoading(true)

    const {email,password,username} = data
    const avatar= data.avatar[0]


    try {
      const userData= await authService.registerAccount({username,email,password,avatar})
      if(userData){
        await authService.login({email,password})
        .then(()=>{
          console.log("signup.Jsx:: user logged in ")
        })
        const currUserData = await authService.getCurrentUser()
        if(currUserData){
          dispatch(login(currUserData.data.data))
        }
        
      }


      setLoading(false)
      navigate("/dashboard")
    } catch (error) {
      
      setError("Some error occured while creating account")
      setLoading(false)
      console.log("4.1:: createNewAcc:: catch error",error)
      console.log("5signup.jsx:: createNewAcc catch error::", error.response?.data)

    }
  }

    

  return (
    <div className=" text-white text-3xl">
      <div className="flex justify-between h-150 ">
        <div className=" grow basis-1/2 bg-black">
          <div>
            <img
              className="h-150 object-cover grow"
              src="https://res.cloudinary.com/daahu0xca/image/upload/v1749025000/Gemini_Generated_Image_dvp2z4dvp2z4dvp2_qjsowk.png"
              alt=""
            />
          </div>
        </div>

        <div className=" grow basis-1/2 bg-amber-50 text-black">
          <div className="h-full max-w-full flex items-center justify-center ">
            <div className="flex flex-col flex-wrap p-7 my-5 border-2 rounded-3xl w-125 ">

              
                 <form 
                 onSubmit={handleSubmit(createNewAcc, (errors)=>{setError("Please Enter all details in Form")})}
                  encType="multipart/form-data"
                 >
                <div className="text-4xl text-center">
                  Signup
                </div>
                <div className="text-wrap text-xs break-words text-center mb-5">
                  Register for a better experience
                </div>
                <div>
                  <Input
                    label="Username"
                    placeholder="aryan32"
                    type="text"
                    labelClassName="h-3 text-xl "
                    inputClassName="bg-sky-100 rounded-xl h-10 ml-5 "
                    {...register("username", {required: true,})}
                  />
                  <Input
                  label="Email"
                  type= "email"
                  labelClassName="h-3 text-xl "
                  placeholder="jammy@gmail.com"
                  {...register("email",{required:true,})}
                  />
                  <Input
                  label="Password"
                  type="password"
                  labelClassName="h-3 text-xl "
                  placeholder="Enter Your Password"
                  autoComplete="off"
                  {...register("password",{required:true})}
                  />
                  <Input 
                  label="Profile Picture"
                  type="file"
                  accept="image/png, image/jpg, image/jpeg, image/gif"
                  labelClassName="h-3 text-xl "
                  inputClassName="text-xs"
                  {...register("avatar",{required:true})}
                  />
                  {error && <p className="text-xl text-red-500 text-center">{error}</p>}
                  
                  <Button 
                  type='submit'
                  disabled={loading}
                  className="w-full mt-3 cursor-pointer hover:bg-blue-700 text-red-500"
                  
                  >
                    {loading ? 
                    <p>Loading...</p>
                    :<p>Create Account</p>
                    }
                    
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
          