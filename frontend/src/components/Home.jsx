import React, { useEffect } from "react";
import axios from "axios";
import envConf from "../conf/envConf.js";
import authService from "../expressBackend/auth.js";
import { Link } from "react-router-dom";
import { Button } from "../components";

function Home() {
  return (
    <div className="flex justify-around ">

      <div className="bg-amber-200 flex-1/2">
      <div>
        <video autoPlay muted loop>
          <source src="https://res.cloudinary.com/daahu0xca/video/upload/v1757009745/Photo_Animation_Generated_j2ucsx.mp4" type="video/mp4" />
        </video>
      </div>
      </div>

      <div className="flex justify-center items-center flex-1/4">
        <Link to="/dashboard">
          <Button className="btn-hover hover:bg-indigo-600 bg-blue-500 text-white rounded-full px-5 py-3  text-2xl">
            Get Started &rarr; 
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
