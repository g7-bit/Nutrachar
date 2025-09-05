import axios from "axios";
import React, { useEffect, useState } from "react";
import dietService from "../expressBackend/diet";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Input, Chart, Button,StaticCharts } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { startEdit } from "../store/editDataSlice";

function Diet() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedInUserData = useSelector((state) => state.auth.userData);

  const { dietId } = useParams();
  const [error, setError] = useState(false);
  const [currentData, setCurrentData] = useState([]);
  const [multiplierArr, setMultiplierArr] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalMacros, setTotalMacros] = useState({}); //TODO: remove them
  const [valForCharts, setValForCharts] = useState([]); // Todo: remove them

  const [IsOwner, setIsOwner] = useState(false);
  const [ownerId, setOwnerId] = useState();

  // is user logged in? NO? visibility false
  // logged in? check userId,
  // dietId,

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
    // console.log("'data' inside calculated fn, ", data);

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
    

    const valForCharts = ["fats", "carbs", "protein"].map((key) => ({
      name: key,
      value: totalObj[key],
    }));

    setValForCharts(valForCharts);
    setLoading(false)
    // const chartVals = totalObj.
  }, [currentData]);

  // handle edit onchange
  const handleEditButton = () => {
    dispatch(startEdit(currentData));
    navigate(`/edit-diet/${dietId}`);
  };



  const handleDeleteButton = async () => {
    try {
      const deleted = await dietService.deleteDiet(dietId)
      if(deleted){
        console.log("deleted diet listing")
        navigate(`/dashboard`);
      } else{
        setError("something went wrong")
      }
      }
      catch(error){
        console.log(error)
      }

    }
  



  //Handle onChange of data
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
      // setsetIsOwner(true)
    }
  };

  // Main Api call,
  useEffect(() => {
    setLoading(true);
    // console.log("diet Id : ", dietId)
    const fetch = async () => {
      const data = await dietService.getSingleDiet(dietId);
      //   console.log("diet data from server", data);

      if (!data) {
        setError("Invalid Url or Diet Dosen't Exists! ");
      } else {
        // console.log("diet data in else:: isArray?", Array.isArray(data)); //is true here
        // console.log("Main :: Api call to backend :: Main data:: ", data);
        let { dataArray, ownerId } = data;
        setOwnerId(ownerId);

        calculateData(dataArray);
        setMultiplierArr(dataArray);
      }

    };
    fetch();
  }, []);


  //check if Owner of diet
  useEffect(() => {
    // console.log("userData", loggedInUserData?._id);
    setIsOwner(loggedInUserData?._id === ownerId);
  }, [ownerId]);

  return (
    <div className="mb-20 ">


      {loading && <p  >Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
      {/* {dietArr && JSON.stringify(dietArr)} */}
            

      <div className=" font-mono rounded-2xl bg-white border border-grey-200 overflow-x-auto m-3 p-3">
              {loading && <tbody className="animate-pulsate">Loading...</tbody>}
        <table className="">
          <thead className="bg-blue-100  ">
            <tr className="animate-fade-up-fast">
              {tableHeading.map((heading, index) =>
                heading === "Food name" ? (
                  <th className="p-2" key={heading}
                  
                  >
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
                <tr key ={foodObj._id} className=" border-b-2 border-b-gray-200 ">
                  {Object.keys(foodObj)
                    .filter((key) => key !== "_id" && key !== "__v")
                    .map((foodItem) =>
                      foodItem === "foodName" ? (
                        <td key={foodItem} className=" p-0 ">
                          <div className="animate-fade-up-slow m-2 p-4 font-semibold rounded-full bg-amber-200 text-center">
                            {(foodObj[foodItem]).toUpperCase()}
                            </div>
                        </td>
                      ) : foodItem === "quantity" ? (
                        <td className="animate-fade-up-slow2" key={foodItem}>
                          <Input
                            type="number"
                            value={foodObj[foodItem]}
                            inputClassName="text-center m-3 bg-stone-100 shadow-xl"
                            labelClassName=" font-thin"
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
                          className="animate-fade-up-slow text-center text-base overflow-x-auto w-300 "
                        >
                          {roundToThree(foodObj[foodItem])}
                        </td>
                      )
                    )}
                </tr>
                
              ))}
            {totalMacros && (
              <tr className="">
                {Object.keys(totalMacros).map((macro) =>
                  macro === "foodName" ? (
                    <td className=" text-center font-mono text-xl" key={macro}>
                      {totalMacros[macro]}
                    </td>
                  ) : macro === "quantity" ? (
                    <td key={totalMacros[macro]}></td>
                  ) : (
                    <td key={macro} className=" text-lg font-medium text-center text-nowrap pt-2">
                      <div className="animate-fade-up-slow2 p-2 bg-green-200 ">
                      {roundToThree(totalMacros[macro])}
                      </div>
                    </td>
                  )
                )}
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="animate-fade-up-fast flex justify-between">
        <Button onClick={(e) => navigate(`/dashboard`)}
          className="rounded-full p-2 text-sm md:text-2xl md:px-5 md:py-2 bg-blue-300 btn-hover shadow-2xl text-black"
          
          >
          &larr; Dashboard
        </Button>
        {IsOwner && (
          <div>
            <Button onClick={(e) => handleEditButton()}
              className="rounded-full p-2 text-sm md:text-2xl md:px-5 md:py-2 bg-red-300 btn-hover shadow-2xl text-black"
              >Edit</Button>

            <Button onClick={(e) => handleDeleteButton()}
              className="rounded-full p-2 text-sm md:text-2xl md:px-5 mdL:py-2 bg-red-300 btn-hover shadow-2xl text-black">
                Delete
                </Button>
          </div>
        )}
      </div>


      <div className=" bg-amber-50 inset-1 shadow-2xl inset-shadow-sm inset-shadow-amber-500/70 rounded-4xl mt-15 md:p-5 pb-20">
        <div className="mb-14">
          <p className="animate-fade-up-slow text-center text-green-500 text-2xl font-mono  ">
            Macro distribution.
            </p>
            <p className="animate-fade-up-fast text-center text-black text-base font-mono">
              The chart is the ratio between sum of macros in this.
            </p>
        </div>

        <div className="fade-up-on-scroll mb-14">
          {loading && <tbody className="flex justify-center animate-pulsate">Loading...</tbody>}
          <Chart data={valForCharts}
          // circleRadius={window.innerWidth <786 ? 90:50 }
           />
        </div>

        <hr className="hr w-70 md:w-150" />
        <StaticCharts/>
      </div>
    </div>
  );
}

export default Diet;
