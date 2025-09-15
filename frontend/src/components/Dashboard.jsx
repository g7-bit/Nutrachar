import React, { useEffect, useState } from "react";
import { Button } from "../components";
import { format } from "date-fns";
import { useNavigate, Link } from "react-router-dom";
// import { Diet } from "../../../backend/src/models/diet.model.js";
// import axios from "axios";
import dietService from "../expressBackend/diet.js";

function Dashboard() {
  const navigate = useNavigate();

  const [dietArray, setDietArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function formatDate(isoString) {
    const formatedDate = format(new Date(isoString), "MMM dd, yyyy h:mm a");
    // console.log("date are ",formatedDate)
    return formatedDate;
  }
  useEffect(() => {
    setIsLoading(true)
    dietService.getAllDiets().then((response) => {
      if (response.length > 0) {
        setDietArray(response);
        // console.log("pressent", response);
      }
      setIsLoading(false)
    });
  }, []);

  return (
    <div>
      <div className="flex justify-center font-mono text-2xl pt-10  ">
        {" "}
        Your Diets{" "}
      </div>
      <div className=" animate-fade-up-slow flex justify-around flex-wrap gap-3 mt-5 md:p-6">
        {dietArray.length > 0 ? (
          dietArray.map((diet) => (
            <Link key={diet[0]} to={`/diet/${diet[0]}`}>
              <div
                key={diet[0]}
                className=" rounded-2xl bg-fuchsia-100 overflow-hidden px-15 py-7 md:p-10 shadow-md   btn-hover"
              >
                <p className="text-xs md:text-lg font-thin">
                  Diet Id: {diet[0]}
                </p>
                <hr className="flex justify-center" />
                <p className=" text-xs  md:text-xl font-medium">
                  Created : {formatDate(diet[1])}
                </p>
              </div>
            </Link>
          ))
        ) : (
          isLoading ? <p className="animate-pulsate">Loading...</p>: <p>No diet plans found. Create one to get started</p>
        )}
      </div>

      <div className="flex justify-center pt-15 animate-fade-up-slow2 ">
        <Button
          label="unknonw"
          type="submit"
          className="p-3 md:px-10 md:py-5 rounded-full text-xl md:text-3xl  hover:bg-indigo-900 hover:text-white bg-blue-600 text-white btn-hover"
          onClick={() => navigate("/dietForm")}
        >
          Create New Diet
        </Button>
      </div>
    </div>
  );
}

export default Dashboard;
