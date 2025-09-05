import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Logo, LogoutBtn } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import authService from "../../expressBackend/auth";
import { login } from "../../store/authslice";

//TODO:  create logic for header elements
function Header() {
  const dispatch = useDispatch();
  const userDataInStore = useSelector((state) => state.auth.userData);
  const location = useLocation();
  console.log(userDataInStore);

  useEffect(() => {
    const fetchUser = async () => {
      if (userDataInStore === null) {
        console.log("header.jsx::: called getcurretnUser");
        const userGet = await authService.getCurrentUser();
        if (userGet === undefined) return;
        dispatch(login(userGet.data.data));
      }
    };
    fetchUser();
    // console.log("header.jsx:: userdata:: ", userDataStore)
  }, [userDataInStore]);
  return (
    <>
      <div className="flex justify-center p-2 md:p-5 transition-all duration-500 ease-in-out">
        <div className="animate-fade-up-fast flex bg-white justify-between shadow-2xl items-center py-3 px-6 md:px-15 rounded-full  gap-5 md:gap-40 transition-all duration-500 ease-in-out">
          {" "}
          {/* md means mediam and up */}
          <div className="transition-all duration-300 ease-in-out">
            <Link to="/">
              <Logo></Logo>
            </Link>
          </div>
          <div className=" hidden md:block transition-all duration-300 ease-in-out">
            <Link to="/">How It works</Link>
          </div>
          <div className="animate-fade-up-slow flex items-center gap-7 md:gap-40 transition-all duration-500 ease-in-out">
            {userDataInStore && location.pathname !== "/dashboard" && (
              <div className="shadow-xl text-basis hover:bg-red-200 btn-hover rounded-full md:p-2 transition-all duration-300 ease-in-out transform">
                <Link to="/dashboard"> Dashboard</Link>
              </div>
            )}
            <div className="transition-all duration-500 ease-in-out">
              {userDataInStore ? (
                <div className="flex gap-5 md:gap-10 items-center transition-all duration-300 ease-in-out">
                  <div className="text-center transition-all duration-300 ease-in-out">
                    <img
                      src={userDataInStore.avatar}
                      className=" w-10 h-10 md:w-16.5 md:h-15 rounded-full object-cover transition-all duration-300 ease-in-out"
                    ></img>
                    <i className="rounded-2xl shadow-xl">
                      {userDataInStore.username}
                    </i>
                  </div>
                  <div className="transition-all duration-300 ease-in-out">
                    <LogoutBtn className="shadow-xl text-basis hover:bg-red-300 btn-hover rounded-full md:p-2 transition-all duration-300 ease-in-out" />
                  </div>
                </div>
              ) : (
                <div className="flex md:gap-3 transition-all duration-300 ease-in-out">
                  <i>
                    <p className="opacity-30">Login / Signup to continue </p>
                  </i>
                  {location.pathname !== "/login" && (
                    <Link to="/login">
                      <div className="border rounded-2xl mx-5 p-2 transition-all duration-300 ease-in-out hover:scale-105">
                        Login
                      </div>
                    </Link>
                  )}
                  {location.pathname !== "/signup" && (
                    <Link to="/signup">
                      <div className="border rounded-2xl  p-2 transition-all duration-300 ease-in-out hover:scale-105">
                        Signup
                      </div>
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
