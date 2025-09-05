import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authslice.js";
import authService from "../expressBackend/auth.js";
import { Button, Input, LoginSidePane, Logo,  } from "./index.js";
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
      
      // setError("Some error occured while creating account",error.response.data.message)
      setError(error.response.data.message)
      setLoading(false)
      console.log("4.1:: createNewAcc:: catch error",error)
      console.log("5signup.jsx:: createNewAcc catch error::", error.response?.data.message)

    }
  }

    

  return (
    <div className="">
      <div className=" flex justify-between min-h-screen[80%] bg-amber-100 ">
        

        <LoginSidePane/>

        <div className=" my-7 grow  text-black">
          <div className=" flex items-center  justify-center ">
            <div className="flex items-center h-114 md:w-120 md:h-135 flex-col flex-wrap shadow-2xl rounded-3xl p-5 bg-amber-50 ">

              
                 <form 
                 onSubmit={handleSubmit(createNewAcc, (errors)=>{setError("Please Enter all details in Form")})}
                  encType="multipart/form-data"
                 >
                <div className="animate-fade-up-superfast text-2xl md:text-4xl font-medium  text-center ">
                  <u>Sign In</u>
                </div>

                <div className="flex flex-col items-center mt-5">
                  <Input
                    label="Username"
                    placeholder="aryan32"
                    type="text"
                    labelClassName="ml-2 text-basis md:text-[1.3rem]"
                    inputClassName="w-70 bg-white"
                    {...register("username", {required: true,})}
                  />
                  <Input
                  label="Email"
                  type= "email"
                  labelClassName="ml-2 text-basis md:text-[1.3rem]"
                  inputClassName="w-70 bg-white"
                  placeholder="jammy@gmail.com"
                  {...register("email",{required:true,})}
                  />
                  <Input
                  label="Password"
                  type="password"
                  labelClassName="ml-2 text-basis md:text-[1.3rem]"
                  placeholder="Enter Your Password"
                  inputClassName="w-70 bg-white"
                  autoComplete="off"
                  {...register("password",{required:true})}
                  />
                  <Input 
                  label="Profile Picture"
                  type="file"
                  accept="image/png, image/jpg, image/jpeg, image/gif"
                  labelClassName="ml-[-12px]  text-basis md:text-[1.3rem]"
                  inputClassName="w-60 font-medium text-[0.8rem] md:text-[1rem] bg-white file:cursor-pointer cursor-pointer  file:py-1 file:px-3 file:mr-6 file:bg-blue-400 file:rounded-4xl file:hover:bg-blue-700 file:text-white rounded-4xl shadow-xl shadow-blue/30"
                  {...register("avatar",{required:true})}
                  />

                  {error && <p className="text-xl text-red-500 text-center">{error}</p>}
                  
                  <Button 
                  type='submit'
                  className=" animate-fade-up-slow2   bg-blue-700 font-normal w-80 p-1  font-sans transition delay-100 duration-300 ease-in-out hover:scale-110 cursor-pointer rounded-full text-2xl text-white hover:bg-indigo-600 "
                  
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
          