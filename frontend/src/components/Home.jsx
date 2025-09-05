import React, { useEffect } from "react";
import axios from "axios";
import envConf from "../conf/envConf.js";
import authService from "../expressBackend/auth.js";
import { Link } from "react-router-dom";
import { Button } from "../components";

function Home() {
  return (
    <div>

      <div className="animate-fade-up-slow2 text-shadow text-center font-extrabold text-6xl font-[Futura] text-shadow-sky-300/50 text-teal-700 my-7 md:my-15">
        An app to track macros in your diet!
      </div>
      <hr  className=" animate-fade-up-slow2 hr w-50"/>
      <div className="flex justify-around ">
        <div className=" flex-1/2">
          <div className="md:mt-10 flex  flex-col gap-5 items-center">
            <div className="animate-fade-up-fast">
              <div className="text-center font-semibold text-blue-900 text-2xl font-mono">Click photo</div>
              <video width="300" className=" rounded-4xl" autoPlay muted loop>
                <source
                  w="20"
                  src="https://res.cloudinary.com/daahu0xca/video/upload/v1757065193/Photo_Animation_Generated_online-video-cutter.com_iyy7on.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
            <div className="fade-up-on-scroll">
              <div className="text-center font-semibold text-blue-900 text-2xl  font-mono">Upload</div>
              <img
                src="https://res.cloudinary.com/daahu0xca/image/upload/v1757070111/upload_eopo8o.png"
                width="300"
                className="rounded-4xl"
                alt=""
              />
            </div>
            <div className="fade-up-on-scroll">
              <div className="text-center font-semibold text-blue-900 text-2xl  font-mono ">Get macros visual data.</div>
              <img
                src="https://res.cloudinary.com/daahu0xca/image/upload/v1757070300/info-908889_1280_vwvvmt.webp"
                width="300"
                className=" rounded-4xl"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col animate-fade-up-fast md:mt-40 justify-baseline flex-1/4 sticky top-0 ">
          <Link to="/dashboard" className="sticky top-50">
            <Button className="btn-hover hover:bg-indigo-600 bg-blue-500 text-white rounded-full px-5 py-3  text-2xl">
              Get Started &rarr;
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
