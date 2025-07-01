import axios from "axios";
import React, { useEffect, useState } from "react";
import dietService from "../expressBackend/diet";
import { useParams } from "react-router-dom";
import { Input } from "../components";

function Diet() {
  const { dietId } = useParams();
  const [error, setError] = useState(false);
  const [initialData, setInitialData] = useState([])
  const [multiplierArr, setMultiplierArr] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalMacros, setTotalMacros] = useState({});

  const tableHeading = [
    "Food name",
    "Quantity",
    "Protien",
    "Carbs",
    "Fats",
    "Calories",
    "Sugar",
    "Added Sugar",
    "Saturated Fats",
  ];

  function calculateTotalMacros(data) {
    console.log("totoal macros in function", data)
    const totalMacros =data.reduce((all, currentObj) => {
      console.log("all:: ",all, "\n current:: ", currentObj);
      for (const key in currentObj) {
        if (typeof currentObj[key] === "number" && key !== "__v") {
          // all[key] = parseFloat(((all[key] || 0) + currentObj[key]).toFixed(2));
          all[key] = ((all[key] || 0) + currentObj[key])
          // console.log("all inside ", all);
        } else if (key === "foodName") {
          all[key] = "Total";
        }
      }
      // console.log("ally",all)
      return all;
    }, {});
    console.log("totalmacors findal",totalMacros)
    setTotalMacros(totalMacros);
  }

  useEffect(() => {}, []);
  
  async function convertInMultiplier(data) {
    console.log("data in converter", data);
    const convertedData = data.map((foodObj) => {
      const newFoodObj = { ...foodObj };
      
      Object.keys(newFoodObj)
      .filter((key) => key !== "_id" && key !== "__v")
      .forEach((key) => {
        if (key !== "quantity" && key !== "foodName") {
          // foodObj[key] = parseFloat((foodObj[key]/foodObj.quantity).toFixed(2))
          // newFoodObj[key] = (newFoodObj[key] / newFoodObj.quantity);
          // console.log("befroe",key, newFoodObj[key])
          newFoodObj[key] = newFoodObj[key] / newFoodObj.quantity
          //  console.log("afterr",key, newFoodObj[key])
        }
      });
      return newFoodObj;
    });
    
    
    console.log("convertedInMultiplier", convertedData);
    await setMultiplierArr(convertedData) // state Update
    
    
  }

  useEffect(() => {
    calculateTotalMacros(initialData) 
  }, [initialData]);
  



  function handleOnChange(value, fname){

    console.log("fname:: ", fname)
    console.log("value:: ", value)
    console.log("handleOnchange ::og InitialData,  ",initialData)
    const modifiedData = initialData.map(foodObj=>{
      Object.keys(foodObj).forEach(foodItem=>{
        // console.log('foodItem',foodItem)
        if(foodObj[foodItem] === fname){
          foodObj.quantity = value
        }

      }
    )
      return foodObj
    })
    console.log("Modified data", modifiedData)
    convertInMultiplier(modifiedData)  //function
    
  }

  useEffect(() => {
    setLoading(true);
    const fetch = async () => {
      const data = await dietService.getSingleDiet(dietId);
      //   console.log("diet data from server", data);

      if (!data) {
        setError("Invalid Url or Diet Dosen't Exists! ");
      } else {
        console.log("diet data in else:: isArray ", Array.isArray(data)); //is true here
        console.log("diet data in else:: Data:: ", data);

        convertInMultiplier(data);
        setInitialData(data)
        
      }
      setLoading(false);
    };
    fetch();
  }, []);

  useEffect(() => {}, []);
  useEffect(() => {}, []);

  return (
    <div>
      <div className="text-red-400 md:text-green-400 ">
        Width COlor sm: red, md: green
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {/* {dietArr && JSON.stringify(dietArr)} */}

      {multiplierArr && (
        <div className=" rounded-lg border border-grey-200 overflow-x-auto m-3 p-2">
          <table>
            <thead>
              <tr>
                {tableHeading.map((heading, index) =>
                  heading === "Food name" ? (
                    <th className="sticky left-0 bg-white " key={heading}>
                      {heading}
                    </th>
                  ) : (
                    <th key={heading}>{heading}</th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {multiplierArr.map((foodObj) => (
                <tr key={foodObj._id}>
                  {Object.keys(foodObj)
                    .filter((key) => key !== "_id" && key !== "__v")
                    .map((foodItem) =>
                      foodItem === "foodName" ? (
                        <td
                          key={foodItem}
                          className="sticky left-0 bg-white shadow-xl"
                        >
                          {foodObj[foodItem]}
                        </td>
                      ) : foodItem === "quantity" ? (
                        <td key={foodItem}>
                          <Input
                            type="number"
                            value={foodObj[foodItem]}
                            inputClassName="w-10"
                            min='0'
                            onChange={(e) => handleOnChange(Number(e.target.value), foodObj.foodName)}
                          />
                        </td>
                      ) : (
                        <td key={foodItem} className="text-center  w-300">
                          {foodObj[foodItem]*foodObj.quantity}
                        </td>
                      )
                    )}
                </tr>
              ))}
              <tr>
                {Object.keys(totalMacros).map((macro) =>
                  macro === "foodName" ? (
                    <td key={totalMacros[macro]}>{totalMacros[macro]}</td>
                  ) : macro === "quantity" ? (
                    <td key={totalMacros[macro]}></td>
                  ) : (
                    <td key={totalMacros[macro]} className="text-center text-nowrap">
                      {" "}
                      {totalMacros[macro]}
                    </td>
                  )
                )}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Diet;
