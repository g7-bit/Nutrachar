import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className=" animate-fade-up-slow2 pb-5 md:mt-5 flex justify-center ">
      <div className="p-5 bg-white flex flex-row justify-around gap-10 md:gap-30 items-center h-[3rem] rounded-4xl shadow-2xl shadow-black/30">
        <div className="text-sm md:text-xl">About Us</div>

        <div className="flex justify-between gap-2 text-xs md:text-xl  md:gap-10">
          <div>
            <a
              href="https://github.com/g7-bit/Nutrachar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center icon-hover"
            >
              <img
                width="30"
                height=""
                src="https://img.icons8.com/glyph-neue/50/github.png"
                alt="Github"
              />
            </a>
          </div>
          <div>
            <a
              href="https://www.linkedin.com/in/girdhar-wetal"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center icon-hover"
            >
              <img
                width="30"
                height=""
                src="https://img.icons8.com/color/48/linkedin.png"
                alt="linkedin"
              />
            </a>
          </div>
          <div>
            <a
              href="https://www.instagram.com/girdhar_wetal/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center icon-hover"
            >
              <img
                width="30"
                height=""
                src="https://img.icons8.com/fluency/48/instagram-new.png"
                alt="instagram"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
