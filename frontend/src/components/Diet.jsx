import axios from "axios";
import React, { useEffect, useState } from "react";
import dietService from "../expressBackend/diet";
import { useParams } from "react-router-dom";
import {Input} from '../components'

function Diet() {
  const { dietId } = useParams();
  const [error, setError] = useState(false);
  const [dietArr, setDietArr] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalMacros, setTotalMacros] = useState({})

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

        const totalMacros = data.reduce((all, currentObj)=>{
          console.log(all,"asdhuf",currentObj)
          for(const key in currentObj){
            if(typeof currentObj[key] === "number" && key !== '__v' ){
              all[key] = parseFloat(((all[key] || 0) + currentObj[key]).toFixed(2))
              console.log("all inside ",all)
            }else if(key === "foodName"){
              all[key] = "Total"
            }
          }
          console.log( "all :",all)
          return all;
        },{});

        // console.log("total",totalMacros)
        setTotalMacros(totalMacros)
        setDietArr(data);
      }
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <div>
      <div className="text-red-400 md:text-green-400 ">
        Width COlor sm: red, md: green
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {/* {dietArr && JSON.stringify(dietArr)} */}

      {dietArr && (
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
              {dietArr.map((foodObj) => (
                <tr key={foodObj._id}>
                  {Object.keys(foodObj)
                    .filter((key) => key !== "_id" && key !== "__v")
                    .map((foodItem) =>
                      foodItem === "foodName" ? (
                        <td className="sticky left-0 bg-white shadow-xl">
                          {foodObj[foodItem]}
                        </td>
                      ) : (
                        <td key={foodItem} className="text-center text-nowrap">
                          {foodObj[foodItem]}
                        </td>
                      )
                    )}
                </tr>
              ))}
              <tr>
                {Object.keys(totalMacros).map((macro)=>(
                  macro === 'foodName'? <td> {totalMacros[macro]}</td> : 
                  macro === 'quantity'?(
                    <td></td>
                  ):
                  <td
                  className="text-center text-nowrap"> {totalMacros[macro]}</td>
                
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Diet;
