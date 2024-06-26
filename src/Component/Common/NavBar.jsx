
import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { matchPath, useLocation, NavLink } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import NavBarImg from "../../assests/WeCare-main/WeCare Img/Health EaseLogo.png";
import medicalappoinment from "../../assests/WeCare-main/WeCare Img/medical-appointment.png";
import ProfileDropdown from "../core/Auth/ProfileDropdown";

const NavBar = () => {
  const { token } = useSelector((state) => state.auth);
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div className="bg-blue-250 shadow-md">
      <div className="container mx-auto py-4 px-6 flex items-center justify-between">
        <div className="flex items-center">
          <NavLink to="/">
            <img src={NavBarImg} alt="Health Ease" className="h-10 md:h-14 " />
          </NavLink>
        </div>
        <div className="hidden lg:flex  ">
          <nav>
            <ul className="flex space-x-4 font-semibold">
              <NavItem to="/" label="Home" matchRoute={matchRoute} />
              <NavItem to="/services" label="Services" matchRoute={matchRoute} />
              <NavItem to="/about" label="About Us" matchRoute={matchRoute} />
              <NavItem to="/blogs" label="Blogs" matchRoute={matchRoute} />
              <NavItem to="/contact" label="Contact Us" matchRoute={matchRoute} />
              {token !== null ? (
                <NavItem to="/dashboard/my-profile" label="Book An Appointment" matchRoute={matchRoute} icon={medicalappoinment} />
              ) : (
                <NavItem to="/Login" label="Book An Appointment" matchRoute={matchRoute} icon={medicalappoinment} />
              )}
              {token !== null && <ProfileDropdown />}
            </ul>
          </nav>
        </div>
        <div className=" lg:hidden">
          <button onClick={toggleMenu} className="text-gray-600 focus:outline-none">
            {isMenuOpen ? <AiOutlineClose fontSize={24} /> : <AiOutlineMenu fontSize={24} />}
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className=" ">
          <nav>
            <ul className="flex flex-col items-center py-1">
              <NavItem to="/" label="Home" matchRoute={matchRoute} />
              <NavItem to="/services" label="Services" matchRoute={matchRoute} />
              <NavItem to="/about" label="About Us" matchRoute={matchRoute} />
              <NavItem to="/blogs" label="Blogs" matchRoute={matchRoute} />
              <NavItem to="/contact" label="Contact Us" matchRoute={matchRoute} />
              {token !== null ? (
                <NavItem to="/dashboard/my-profile" label="Book An Appointment" matchRoute={matchRoute} icon={medicalappoinment} />
              ) : (
                <NavItem to="/Login" label="Book An Appointment" matchRoute={matchRoute} icon={medicalappoinment} />
              )}
              {token !== null && <ProfileDropdown />}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

const NavItem = ({ to, label, matchRoute, icon }) => (
  <li>
    <NavLink to={to} className={`block py-2 px-4 text-gray-800 hover:text-pink-500 ${matchRoute(to) ? "text-blue-500" : ""}`}>
      {label} {icon && <img src={icon} alt="Icon" className="w-4 h-4 inline ml-2" />}
    </NavLink>
  </li>
);

export default NavBar;
