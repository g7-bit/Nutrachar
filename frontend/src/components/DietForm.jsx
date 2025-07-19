import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, set } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Input,
  Logo,
  DynamicImageInput,
  DynamicDataInput,
} from "./index.js";
import dietService from "../expressBackend/diet.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DietForm(isEditMode) {
  const navigate= useNavigate()
  const dispatch = useDispatch()
  const storeDietData = useSelector((state)=>state.editData.dietData)
  console.log("store",storeDietData)

 
  
  const { register, handleSubmit, formState: { errors }, control } = useForm({
    defaultValues: {
      dynField: [{}],
      manualData: [{}],
    },
  });
  const [error, setError] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const [isManualDataVisible, setIsManualDataVisible] = useState(false);
  const [isImageInputVisible, setIsImageInputVisible] = useState(false);

  function makeImgFormData(data) {
console.log("del 325,",isEditMode)
    
    const formData = new FormData();

    let imgAndInput = data.dynField;
    console.log("imgAndInput", imgAndInput);

    imgAndInput.forEach((food, index) => {
      formData.append(`foodImage`, food.image[0]);
      formData.append(`foodNameforImage[]`, food.foodName);
      formData.append(`quantity[]`, food.quantity);
    });

    // formData.forEach((value, key) => {
    //   console.log(key, value);
    // });

    return formData;
  }

 
async function finalSave(formData){
      const save = await dietService.createNewDiet(formData); 
      if(save.success){
        navigate('/dashboard')
      }else if(!save.success){
        console.log("dietForm.jsx, INVALID else", save.message)
        setError(save.message)
      }
      setIsLoading(false)
}

function verifyDataPresent(){

    const isDynFieldAbsent =
      data.dynField.length === 0 || Object.keys(data.dynField[0]).length === 0;
    const isManualDataFieldaAbsent =
      data.manualData.length === 0 ||
      Object.keys(data.manualData[0]).length === 0;

    const hasImageData = !isDynFieldAbsent;
    const hasManualData = !isManualDataFieldaAbsent;

  
    return {isDynFieldAbsent,isManualDataFieldaAbsent,hasImageData,hasManualData}
}
useEffect(()=>{
  // console.log("dietform.jsx: informal", )
  // let {status, status2}=verifyDataPresent()
  // console.log("status",status, "status2",status2)
   if(isEditMode) setIsManualDataVisible(true)
},[])


  const createDiet = async (data) => {
    setError("");
    setIsLoading(true);
    console.log("dashboard.jsx:: form data:: ", data);
    let {isDynFieldAbsent,isManualDataFieldaAbsent,hasImageData,hasManualData} = verifyDataPresent()

    if (isDynFieldAbsent && isManualDataFieldaAbsent) {
      return setError("Please add some data");
    }

    if (hasImageData && hasManualData) {
      console.log("both data present");


      const formData = makeImgFormData(data);

      const manualDataforAxios = data.manualData;
      formData.append("manualData", JSON.stringify(manualDataforAxios)); 

      finalSave(formData)
    } else if (hasImageData) {
      console.log("only image data present");
      const formData = makeImgFormData(data);
      formData.forEach((value, key) => {
        console.log(key, value);
      });
      finalSave(formData)
    } else if (hasManualData) {
      console.log("only Manual data present");
      const manualDataforAxios = data.manualData;
      const formData = new FormData()
      formData.append("manualData", JSON.stringify(manualDataforAxios));
      console.log("reached here in dietForm.jsx 234")
      finalSave(formData)
    }
    
  };

  // const idea = 'ArandomIdea'
  // formData.append("Thought",idea )

  // formData.forEach((value, key) => {
  //   console.log(key, value);
  // });

  // try {
  //   let dietreq = await axios.post("api/v1/diet/newDiet", formData, {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   });
  //   console.log("newDiet resposne:: ", dietreq);
  // } catch (error) {
  //   console.log(error);
  // }
  // };

  return (
    <div>
      <p>Halo</p>
      {error && <p className="text-red-400 text-xl">{error}</p>}
      <form
        onSubmit={handleSubmit(createDiet, (errors) => {
          setError("*Please fill all fields and Images");

          // console.log("errors are",errors)
        })}
      >

        {!isImageInputVisible && !isloading ? (
          <Button type="button" onClick={() => setIsImageInputVisible(true)}>
            Add Images
          </Button>
        ) : (
          <DynamicImageInput
            control={control}
            name="dynField"
            fieldLabel="Food Nutritional Label"
            defaultItem={{ foodName: "", image: "" }}
            errors={errors}
            loading =  {isloading}
          />
        )}

        {!isManualDataVisible && !isloading ? (
          <Button type="button" onClick={() => setIsManualDataVisible(true)}>
            Add Data Manually 1
          </Button>
        ) : (
          <DynamicDataInput
            control={control}
            name="manualData"
            loading= {isloading}
            storeFields = {storeDietData}

          />
        )} 
        {isloading ? 

        <Button 
        disabled={!isloading}
         className="">
          Loading...
        </Button>
        :
        <Button type="submit" className="">
          Submit
        </Button>
        }
      </form>
    </div>
  );
}

export default DietForm;
