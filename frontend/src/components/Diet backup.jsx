import axios from "axios";
import React, { useEffect, useState } from "react";
import dietService from "../expressBackend/diet";
import { useParams } from "react-router-dom";

function Diet() {
  const { dietId } = useParams();
  const [error, setError] = useState(false);
  const [dietArr, setDietArr] = useState([])
  const [loading, setLoading] = useState(true)




  useEffect(() => {
    setLoading(true)
    const fetch = async () => {
      const data = await dietService.getSingleDiet(dietId);
    //   console.log("diet data from server", data);

      if (!data) {
        setError("Invalid Url or Diet Dosen't Exists! ");
      }else{
        // console.log("diet data in else:: isArray " ,Array.isArray(data)) //is true here
        setDietArr(data)
      }
      setLoading(false)
    };
    fetch();
  }, []);


  return (
    <div>
      <div
      className="text-red-400 md:text-green-400 "
      >
        Width COlor
        sm: red,  
        md: green

      </div>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {/* {dietArr && JSON.stringify(dietArr)} */}
        <div
        className="  border-1  text-[0.8rem]  rounded-3xl  p-3 overflow-x-scroll mx-3  md:w-200 md:text-[1rem]"
        >
          <div className="w-150   border-2  border-pink-300 grid grid-cols-9 text-center md:w-full" >
            <p>Food Name</p>
            <p>Quantity</p>
            <p>Protein </p>
            <p>Carbs </p>
            <p>Fats </p>
            <p>Calories </p>
            <p>Sugar </p>
            <p>Added Sugar </p>
            <p>Saturated Fats </p>
          </div>
          {dietArr &&
          dietArr.map(food=>(

              <div
              className="w-150 border-2  border-pink-300 grid grid-cols-9  md:w-full"
              key={food._id}>
                    {Object.keys(food).filter(key=>key!=='_id' && key!=='__v').map(key=>(
                            <p
                            className="border-2 border-green-500 text-center"
                            key={key}> {food[key]}</p>
                    ))}
                  </div>
          ))
          }

          <div>
            
          </div>
          
        </div>
    </div>
  );
}

export default Diet;
