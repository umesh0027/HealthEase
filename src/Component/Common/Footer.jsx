

import React from "react";
import { Link } from "react-router-dom";
import instagram from "../../assests/WeCare-main/WeCare Img/contactUs/instagram.png";
import facebook from "../../assests/WeCare-main/WeCare Img/contactUs/facebook.png";
import whatsapp from "../../assests/WeCare-main/WeCare Img/contactUs/whatsapp.png";
import twitter from "../../assests/WeCare-main/WeCare Img/contactUs/twitter.png";
import NavBarImg from "../../assests/WeCare-main/WeCare Img/Health EaseLogo.png";
import { MdCopyright } from "react-icons/md";

const Footer = () => {
  return (
    <div className="bg-richblack-800 py-8 px-4 md:px-8 lg:px-20">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/4 mb-6 md:mb-0">
          <Link to="/">
            <img src={NavBarImg} alt="Health Ease" className="w-24 lg:w-[200px] md:w-auto" />
          </Link>
        </div>
        <div className="md:w-3/4">
          <ul className="flex flex-wrap justify-center lg:mr-20">
            <li className="mx-4 my-2">
              <Link to="/about" className="text-white hover:text-pink-500">About Us</Link>
            </li>
            <li className="mx-4 my-2">
              <Link to="/contact" className="text-white hover:text-pink-500">Contact Us</Link>
            </li>
            <li className="mx-4 my-2">
              <Link to="/doctors" className="text-white hover:text-pink-500">Our Doctors</Link>
            </li>
            <li className="mx-4 my-2">
              <Link to="/services" className="text-white hover:text-pink-500">Services</Link>
            </li>
            <li className="mx-4 my-2">
              <Link to="/blogs" className="text-white hover:text-pink-500">Blogs</Link>
            </li>
            <li className="mx-4 my-2">
              <Link to="/disease" className="text-white hover:text-pink-500">Disease Predictor</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <Link to="https://www.instagram.com" className="mx-2 hover:scale-150"><img src={instagram} alt="Instagram" width={30} height={30} /></Link>
        <Link to="https://www.facebook.com" className="mx-2 hover:scale-150"><img src={facebook} alt="Facebook" width={30} height={30} /></Link>
        <Link to="https://www.twitter.com" className="mx-2 hover:scale-150"><img src={twitter} alt="Twitter" width={30} height={30} /></Link>
        <Link to="https://www.whatsapp.com" className="mx-2 hover:scale-150"><img src={whatsapp} alt="WhatsApp" width={30} height={30} /></Link>
      </div>
      <div className="flex justify-center items-center text-white mt-6">
        <span><MdCopyright /></span>
        <span className="ml-1">2024 Health Ease | All Rights Reserved</span>
      </div>
    </div>
  );
};

export default Footer;
