import React, { useEffect, useState } from "react";
import { Button } from "../components";
import { format } from "date-fns";
import { useNavigate,Link } from "react-router-dom";
import { Diet } from "../../../backend/src/models/diet.model.js";
import axios from "axios";
import dietService from "../expressBackend/diet.js";

function Dashboard() {
  const navigate = useNavigate();

  const [dietArray, setDietArray] = useState([]);

  function formatDate(isoString){
    const formatedDate = format(new Date(isoString), 'MMM dd, yyyy h:mm a')
    // console.log("date are ",formatedDate)
    return formatedDate
  }
  useEffect(() => {
    dietService.getAllDiets().then((response) => {
      if (response.length > 0) {
        setDietArray(response);
        // console.log("pressent", response);
      }
    });


  }, []);

  return (
    <div>
      {dietArray.length>0 ? 
      dietArray.map(diet=>(
        <div key={diet}>

          <Link to= {`/diet/${diet[0]}`}>
            <p>Diet Id:   {diet[0]}</p>
            <p>Created : {formatDate(diet[1])}</p>
          </Link>
          <hr />
        </div>
      ))
      :
     <p>No diet plans found. Create one to get started</p>
      }

      {/* {isDietPresent  ?

      dietArray.map((diet) =>(
        <div>
          <h4>Diet No:- {diet}</h4>
        </div>
      ))
      : <p>No diet plans found. Create one to get started</p>} */}
      {/* {allDietData.data.data && <p>Array not empty</p>} */}

      <Button
        label="unknonw"
        type="submit"
        onClick={() => navigate("/dietForm")}
      >
        create new
      </Button>
    </div>
  );
}

export default Dashboard;
