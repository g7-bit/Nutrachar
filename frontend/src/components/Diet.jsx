import axios from "axios";
import React, { useEffect, useState } from "react";
import dietService from "../expressBackend/diet";
import { useParams } from "react-router-dom";
import { Input, Chart } from "../components";

function Diet() {
  const { dietId } = useParams();
  const [error, setError] = useState(false);
  const [currentData, setCurrentData] = useState([]);
  const [multiplierArr, setMultiplierArr] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalMacros, setTotalMacros] = useState({});
  const [valForCharts, setValForCharts] = useState([]);

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

  function calculateData(data) {
    console.log("'data' inside calculated fn, ", data);

    const updatedArr = data.map((foodObj) => {
      const newFoodObj = { ...foodObj };
      Object.keys(newFoodObj).forEach((foodItem) => {
        if (
          typeof newFoodObj[foodItem] === "number" &&
          foodItem !== "quantity" &&
          foodItem !== "__v"
        ) {
          // console.log(newFoodObj[foodItem], newFoodObj.quantity, foodItem)
          newFoodObj[foodItem] =
            (newFoodObj[foodItem] / 100) * newFoodObj.quantity;
        }
        // console.log(foodObj.quantity)
        // console.log(foodItem)
      });
      return newFoodObj;
    });

    setCurrentData(updatedArr);
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

    // const valForCharts = []

    // Object.keys(totalObj).forEach(items=>{
    //   if(items === 'fats' || items === 'carbs' || items === 'protein'){

    //     const obj = {
    //       name:items,
    //       value: totalObj[items]
    //     }
    //     valForCharts.push(obj)
    //   }

    // })

    const valForCharts = ["fats", "carbs", "protein"].map((key) => ({
      name: key,
      value: totalObj[key],
    }));

    setValForCharts(valForCharts);

    // const chartVals = totalObj.
  }, [currentData]);

  //Handle onChange
  const handleOnChange = (value, fName) => {
    // console.log("handleOnchange Raw", value, fName);
    // console.log("HandleOnChange current Data in ", currentData); // old data with old Quantity value

    // console.log("multiplier in handleOnChange", multiplierArr)

    const multiplierObj = multiplierArr.find((obj) => obj.foodName === fName);

    if (multiplierObj) {
      const updatedFoodObj = currentData.map((foodObj) => {
        if (foodObj.foodName === fName) {
          const updatedFoodObj = { ...foodObj };
          updatedFoodObj.quantity = value;

          Object.keys(updatedFoodObj).forEach((foodItem) => {
            if (
              typeof updatedFoodObj[foodItem] === "number" &&
              foodItem !== "quantity" &&
              foodItem !== "__v"
            ) {
              updatedFoodObj[foodItem] =
                (multiplierObj[foodItem] / 100) * value;
            }
          });
          return updatedFoodObj;
        }
        return foodObj;
      });
      // console.log("updated handle onsubmit :: ", updatedFoodObj)
      setCurrentData(updatedFoodObj);
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

        calculateData(data);
        setMultiplierArr(data);
      }
      setLoading(false);
    };
    fetch();
  }, []);

  useEffect(() => {
    // console.log("main currentData:: last useEffect", currentData);
  }, [currentData]);

  useEffect(() => {}, []);
  useEffect(() => {}, []);

  return (
    <div className="mb-10">
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
                        <td key={foodItem} className="">
                          {foodObj[foodItem]}
                        </td>
                      ) : foodItem === "quantity" ? (
                        <td className="" key={foodItem}>
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
                    <td className="" key={macro}>
                      {totalMacros[macro]}
                    </td>
                  ) : macro === "quantity" ? (
                    <td key={totalMacros[macro]}></td>
                  ) : (
                    <td key={macro} className="text-center text-nowrap px-2">
                      {roundToThree(totalMacros[macro])}
                    </td>
                  )
                )}
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div>
        <div className="m-3">

        <Chart data={valForCharts} />
        </div>
<br />
<br />
<br />
        <div className="">
          <div className="text-center text-green-500"> Reccomended Ratio</div>
          <div className="flex  opacity-85">
            
             <div className="flex-1  ">
                <Chart
                  data={[
                    { name: "Fats", value: 25 },
                    { name: "Carbs", value: 30 },
                    { name: "Protein", value: 45 },
                  ]}
                  userLabel="Weight loss"
                  height={160}
                  circleRadius={50}                  
                />
              </div>

              

              <div className="flex-1 ">
                <Chart
                  data={[
                    { name: "Fats", value: 25 },
                    { name: "Carbs", value: 50 },
                    { name: "Protein", value: 25 },
                  ]}
                  userLabel="Maintenance"
                  height={160}
                  circleRadius={50}
                  width=""
                />
              </div>


              <div className="flex-1">
                
                <Chart
                  data={[
                    { name: "Fats", value: 20 },
                    { name: "Carbs", value: 45 },
                    { name: "Protein", value: 35 },
                  ]}
                  userLabel="Muscle Gain"
                  height={160}
                  circleRadius={50}
                />
                  
              </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Diet;
