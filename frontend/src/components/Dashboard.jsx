import React, { useState } from "react";
import { useForm, useFieldArray, set } from "react-hook-form";
import {
  Button,
  Input,
  Logo,
  DynamicImageInput,
  DynamicDataInput,
} from "./index.js";
import axios from "axios";

function Dashboard() {
  const { register, handleSubmit, formState: { errors }, control } = useForm({
    defaultValues: {
      dynField: [{}],
      manualData: [{}],
    },
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isManualDataVisible, setIsManualDataVisible] = useState(false);
  const [isImageInputVisible, setIsImageInputVisible] = useState(false);

  function makeImgFormData(data) {
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

  async function sendAxiosRequest(formData) {


    try {
      const requesty = await axios.post("api/v1/diet/newDiet", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("response from server::", requesty)
      
    } catch (error) {
      console.log(error.response?.data);
    }
  }

  const createDiet = async (data) => {
    setError("");
    console.log("dashboard.jsx:: form data:: ", data);

    const isDynFieldAbsent =
      data.dynField.length === 0 || Object.keys(data.dynField[0]).length === 0;
    const isManualDataFieldaAbsent =
      data.manualData.length === 0 ||
      Object.keys(data.manualData[0]).length === 0;

    const hasImageData = !isDynFieldAbsent;
    const hasManualData = !isManualDataFieldaAbsent;

    if (isDynFieldAbsent && isManualDataFieldaAbsent) {
      return setError("Please add some data");
    }

    if (hasImageData && hasManualData) {
      console.log("both data present");


      const formData = makeImgFormData(data);

      const manualDataforAxios = data.manualData;
      formData.append("manualData", JSON.stringify(manualDataforAxios)); 

      sendAxiosRequest(formData,manualDataforAxios);
    } else if (hasImageData) {
      console.log("only image data present");
      const formData = makeImgFormData(data);
      formData.forEach((value, key) => {
        console.log(key, value);
      });
      sendAxiosRequest(formData)
    } else if (hasManualData) {
      console.log("only Manual data present");
      const manualDataforAxios = data.manualData;
      const formData = new FormData()
      formData.append("manualData", JSON.stringify(manualDataforAxios));

      sendAxiosRequest(formData); 
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
        {!isImageInputVisible ? (
          <Button type="button" onClick={() => setIsImageInputVisible(true)}>
            Add Image
          </Button>
        ) : (
          <DynamicImageInput
            control={control}
            name="dynField"
            fieldLabel="Food Nutritional Label"
            defaultItem={{ foodName: "", image: "" }}
            errors={errors}
          />
        )}

        {!isManualDataVisible ? (
          <Button type="button" onClick={() => setIsManualDataVisible(true)}>
            Add Data Manually
          </Button>
        ) : (
          <DynamicDataInput
            control={control}
            name="manualData"
            defaultItem={{
              foodName: "",
              quantity: "",
              protein: "",
              carbs: "",
              fats: "",
              calories: "",
              sugar: "",
              addedSugar: "",
              saturatedFats: "",
            }}
          />
        )}

        <Button type="submit" className="">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Dashboard;
