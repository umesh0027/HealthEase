
import React, { useState } from "react";
import { matchPath, useLocation, NavLink } from "react-router-dom";
import NavBarImg from "../../assests/WeCare-main/WeCare Img/Health EaseLogo.png";


const Navs = () => {

  const location = useLocation();
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div className="bg-white shadow-md">
      <div className="container mx-auto py-4 px-6 flex items-center justify-between">
        <div className="flex items-center">
          <NavLink to="/">
            <img src={NavBarImg} alt="Health Ease" className="h-10 md:h-14 " />
          </NavLink>
        </div>
        <div className="lg:flex  ">
          <nav>
            <ul className="flex space-x-4 font-semibold">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/disease">Disease</NavLink>
             
            </ul>
          </nav>
        </div>
      
      </div>
     
    
    </div>
  );
};



export default Navs;