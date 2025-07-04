import axios from "axios";
import React, { useEffect, useState } from "react";
import dietService from "../expressBackend/diet";
import { useParams } from "react-router-dom";
import { Input } from "../components";

function Diet() {
  const { dietId } = useParams();
  const [error, setError] = useState(false);
  const [currentData, setCurrentData] = useState([]);
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

  const roundToThree = (num) => Math.round(num * 1000) / 1000;
  // setting Total row




// Creating multiplier obj,  called by mainapi
  let multiplierObj = [];
  function multipliers(data) {
    // console.log("inside func:: multiplier ", data);
      multiplierObj = data.map((foodObj) =>{
        const updatedFoodObj = {...foodObj}
      Object.keys(updatedFoodObj).forEach((foodItem) => {
        if (
          typeof updatedFoodObj[foodItem] === "number" &&
          foodItem !== "quantity" &&
          foodItem !== "__v"
        ) {
          // console.log(" ", foodItem)
          if(updatedFoodObj[foodItem] === 0){
            updatedFoodObj[foodItem] = 0
          }else{

            updatedFoodObj[foodItem] = updatedFoodObj[foodItem] / updatedFoodObj.quantity;
          }
        }
      })
      return updatedFoodObj
    }); 
    
    // console.log("final multiplier Obj", multiplierObj)
    setMultiplierArr(multiplierObj)
  }

  // setting data for total row
  useEffect(() => {
    // console.log("current dataa check in ttoal useEffect", currentData);
    const totalObj = currentData.reduce((accumulatorObj, foodObj) => {
      Object.keys(foodObj).forEach((foodItem) => {
        if (
          typeof foodObj[foodItem] === "number" &&
          foodItem !== "quantity" &&
          foodItem !== "__v"
        ) {
          accumulatorObj[foodItem] =
            (accumulatorObj[foodItem] || 0) + foodObj[foodItem];
          // console.log(foodItem, foodObj[foodItem])
        } else if (foodItem === "foodName") {
          accumulatorObj.foodName = "Total";
          accumulatorObj.quantity = "NaN";
        }
      });
      return accumulatorObj;
    }, {});
    // console.log("total boj", totalObj);
    setTotalMacros(totalObj);
  }, [currentData]);

  //Handle onChange
  const handleOnChange = (value, fName) => {
    // console.log("handleOnchange Raw", value, fName);
    // console.log("HandleOnChange current Data in ", currentData); // old data with old Quantity value

    // console.log("multiplier in handleOnChange", multiplierArr)

    const multiplierObj = multiplierArr.find(obj=>obj.foodName === fName)
    
    if(multiplierObj){
      const updatedFoodObj = currentData.map(foodObj=>{
        if(foodObj.foodName ===fName){
          const updatedFoodObj = {...foodObj}
          updatedFoodObj.quantity = value

          Object.keys(updatedFoodObj).forEach(foodItem=>{
            if(typeof updatedFoodObj[foodItem] === 'number' && foodItem !== 'quantity' && foodItem !== '__v'){
              updatedFoodObj[foodItem] = multiplierObj[foodItem] * value
            }
          })
          return updatedFoodObj
        }
        return foodObj
      })
      // console.log("updated handle onsubmit :: ", updatedFoodObj)
      setCurrentData(updatedFoodObj)
    }

  };

  // Main Api call,
  useEffect(() => {
    setLoading(true);
    const fetch = async () => {
      const data = await dietService.getSingleDiet(dietId);
      //   console.log("diet data from server", data);

      if (!data) {
        setError("Invalid Url or Diet Dosen't Exists! ");
      } else {
        // console.log("diet data in else:: isArray?", Array.isArray(data)); //is true here
        console.log("Main :: Api call to backend :: Data:: ", data);

        setCurrentData(data);

        multipliers(data);
      }
      setLoading(false);
    };
    fetch();
  }, []);

  useEffect(() => {
    console.log("main currentData:: last useEffect", currentData);
  }, [currentData]);

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

      <div className=" rounded-lg border border-grey-200 overflow-x-auto m-3 p-2">
        <table>
          <thead>
            <tr>
              {tableHeading.map((heading, index) =>
                heading === "Food name" ? (
                  <th className="" key={heading}>
                    {heading}
                  </th>
                ) : (
                  <th key={heading}>{heading}</th>
                )
              )}
            </tr>
          </thead>

          <tbody>
            {currentData &&
              currentData.map((foodObj) => (
                <tr key={foodObj._id} className="p-2">
                  {Object.keys(foodObj)
                    .filter((key) => key !== "_id" && key !== "__v")
                    .map((foodItem) =>
                      foodItem === "foodName" ? (
                        <td
                          key={foodItem}
                          className=""
                        >
                          {foodObj[foodItem]}
                        </td>
                      ) : foodItem === "quantity" ? (
                        <td 
                        className=""
                        key={foodItem}>
                          <Input
                            type="number"
                            value={foodObj[foodItem]}
                            inputClassName="w-30"
                            min="0"
                            onChange={(e) =>
                              handleOnChange(
                                Number(e.target.value),
                                foodObj.foodName
                              )
                            }
                          />
                        </td>
                      ) : (
                        <td
                          key={foodItem}
                          className="text-center overflow-x-auto w-300 "
                        >
                          {roundToThree(foodObj[foodItem])}
                        </td>
                      )
                    )}
                </tr>
              ))}
            {totalMacros && (
              <tr>
                {Object.keys(totalMacros).map((macro) =>
                  macro === "foodName" ? (
                    <td 
                    className=""
                    key={macro}>{totalMacros[macro]}</td>
                  ) : macro === "quantity" ? (
                    <td key={totalMacros[macro]}></td>
                  ) : (
                    <td
                      key={macro}
                      className="text-center text-nowrap"
                    >
                      {roundToThree(totalMacros[macro])}
                    </td>
                  )
                )}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Diet;
