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
      <div className=" flex  justify-between items-center px-5">
        {" "}
        {/* md means mediam and up */}
        <div>
          
          <Link to='/'><Logo ></Logo></Link>

          
        </div>
        <div>
           <Link to="/">How It works</Link>
        </div>
        <div className="flex gap-x-8 ">
          {userDataInStore && location.pathname !== "/dashboard" && (
            <div className="border rounded-2xl p-2">
              
              <Link to="/dashboard">Dashboard</Link>
            </div>
          )}

          {userDataInStore   ? (
            <div className="flex gap-3">
              <div>
                <LogoutBtn className="border rounded-2xl p-2" />
              </div>
              <div className="text-center">
                <img src={userDataInStore.avatar}
                className="w-15 h-15 rounded-2xl object-cover"
                ></img>
                <i>{userDataInStore.username}</i>
              </div>
            </div>
          ) : (
            <div className="flex gap-3">
              <i>
                <p className="opacity-30">not logged in</p>
              </i>
              <div className="border rounded-2xl p-2">
                <Link to="/login">Login</Link>
              </div>
              <div className="border rounded-2xl p-2">
                <Link to="/signup">Signup</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
