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
import { endEdit } from "../store/editDataSlice.js";

function DietForm({ isEditMode, dietId }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storeDietData = useSelector((state) => state.editData.dietData);
  console.log("store", storeDietData);

  if (isEditMode) console.log("in EDIRT MODE, dietForm.jsx");
  console.log("isEdiable fd", isEditMode, "existing diet Id", dietId);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      dynField: [{}],
      manualData: [{}],
    },
  });
  const [error, setError] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const [isManualDataVisible, setIsManualDataVisible] = useState(false);
  const [isImageInputVisible, setIsImageInputVisible] = useState(false);



  function logFormData(formData) {
    console.log("form data below >>>")
  for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }
}


  function makeImgFormData(data) {
    console.log("del 325,", isEditMode);

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

  async function finalSave(formData) {
    console.log("formData in final save",formData)
    logFormData(formData)
    const save = await dietService.createNewDiet(formData);
    if (save.success) {
      navigate(-1);
    } else if (!save.success) {
      console.log("dietForm.jsx, INVALID else", save.message);
      setError("Something went wrong at server");
    }
    setIsLoading(false);
  }
    async function finalUpdate(processedData, dietId){
      const save = await dietService.updateDiet(processedData, dietId);
     console.log("save" ,save)
      dispatch(endEdit())
      if(save?.data.message === "success"){
        navigate(-1);
        // navigate(`/diet/${dietId}`, {replace: true});
      }else{
        setError("Something went wrong while saving data")
        setIsLoading(false)
      }
  }


  function verifyDataPresent(data) {
    const isDynFieldAbsent =
      data.dynField.length === 0 || Object.keys(data.dynField[0]).length === 0;
    const isManualDataFieldaAbsent =
      data.manualData.length === 0 ||
      Object.keys(data.manualData[0]).length === 0;

    const hasImageData = !isDynFieldAbsent;
    const hasManualData = !isManualDataFieldaAbsent;

    if(!hasImageData && !hasManualData){
      setIsLoading(false)
      setError("Form can't be empty")
      return false
    }

    return {
      isDynFieldAbsent,
      isManualDataFieldaAbsent,
      hasImageData,
      hasManualData,
    };
  }
  useEffect(() => {
    if (isEditMode) setIsManualDataVisible(true);
  }, []);

  function processWholeData(data) {
    let verified = verifyDataPresent(data);
    if (!verified) return false;
    let {
      isDynFieldAbsent,
      isManualDataFieldaAbsent,
      hasImageData,
      hasManualData,
    } = verified;


    if (isDynFieldAbsent && isManualDataFieldaAbsent) {
      return setError("Please add some data");
    }

    if (hasImageData && hasManualData) {
      console.log("both data present");

      const formData = makeImgFormData(data);

      const manualDataforAxios = data.manualData;
      formData.append("manualData", JSON.stringify(manualDataforAxios));

      
      return formData;
    } else if (hasImageData) {
      console.log("only image data present");
      const formData = makeImgFormData(data);
      formData.forEach((value, key) => {
        console.log(key, value);
      });

     
      return formData;
    } else if (hasManualData) {
      console.log("only Manual data present");
      const manualDataforAxios = data.manualData;
      const formData = new FormData();
      formData.append("manualData", JSON.stringify(manualDataforAxios));
      console.log("reached here in dietForm.jsx 234");
      return formData;
    
    }
  }



  const handleForm = async (data) => {
    setError("");
    setIsLoading(true);
    console.log("dashboard.jsx:: form data:: ", data);


    const processedData = processWholeData(data);
    if(!processedData) return false
    if (isEditMode) {


      finalUpdate(processedData, dietId)
    } else {

      finalSave(processedData);
    }
  };


  return (
    <div>

      {error && <p className="text-red-400 text-2xl font-bold mx-auto text-center">{error}</p>}
      <form
        onSubmit={handleSubmit(handleForm, (errors) => {
          setError("*Please fill fields and Images");

          // console.log("errors are",errors)
        })}
      >
        <div className="mt-5 md:mx-auto md:text-center md:mb-10">
        
          {!isImageInputVisible && !isloading ? (
            <Button
            type="button"
            onClick={() => setIsImageInputVisible(true)}
            className="btn-hover  text-white bg-blue-600 text-2xl rounded-full p-2 px-5"
            >
              Add Images
            </Button>
          ) : (
            <DynamicImageInput
              control={control}
              name="dynField"
              fieldLabel="Food Nutritional Label"
              defaultItem={{ foodName: "", image: "" }}
              errors={errors}
              loading={isloading}
              
            />
          )}
          <hr className="mx-auto w-150 border-t-2 border-gray-300 my-4 "/>
          {!isManualDataVisible && !isloading ? (
            <Button type="button" onClick={() => setIsManualDataVisible(true)}
            className="btn-hover text-white bg-blue-600 text-2xl rounded-full p-2 px-5" 
            >
              Add Data Manually
            </Button>
          ) : (
            <DynamicDataInput
              control={control}
              name="manualData"
              loading={isloading}
              storeFields={storeDietData}
            />
          )}
          </div>
          <hr className="hr w-150"/>

          <div className="flex justify-center">
          {isloading ? (
            <Button disabled={!isloading} className="btn-hover text-white shadow-lg bg-green-600 text-2xl rounded-full p-2 px-10 mb-10">
              Loading...
            </Button>
          ) : (
            <Button type="submit" className="btn-hover text-white shadow-lg bg-green-600 text-2xl rounded-full p-2 px-10 mb-10 ">
              Submit
            </Button>
          )}
      </div>
      </form>
    </div>
  );
}

export default DietForm;
