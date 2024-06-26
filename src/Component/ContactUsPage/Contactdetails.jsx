import React from "react"
import * as Icon1 from "react-icons/bi"
import * as Icon3 from "react-icons/hi2"
import * as Icon2 from "react-icons/io5"
import instagram from "../../assests/WeCare-main/WeCare Img/contactUs/instagram.png"
import facebook from "../../assests/WeCare-main/WeCare Img/contactUs/facebook.png"
import whatsapp from "../../assests/WeCare-main/WeCare Img/contactUs/whatsapp.png"
import twitter from "../../assests/WeCare-main/WeCare Img/contactUs/twitter.png"
import { Link } from "react-router-dom"
const contactDetails = [
  {
    icon: "HiChatBubbleLeftRight",
    heading: "Chat on us",
    description: "Our friendly team is here to help.",
    details: "info@Health Ease.com",
  },
  {
    icon: "BiWorld",
    heading: "Visit us",
    description: "Delhi,Lucknow,Mumbai",
    details:
      "Health Ease 154/7 connaught place-delhi",
  },
  {
    icon: "IoCall",
    heading: "Call us",
    description: "24/7 Available for support.",
    details: "+123 456 7869",
  },
]

const ContactDetails = () => {
  return (
    <div className="contact-detail-main-outer">
  <div className="contact-detail-main">
      {contactDetails.map((ele, i) => {
        let Icon = Icon1[ele.icon] || Icon2[ele.icon] || Icon3[ele.icon]
        return (
          <div
            className="contact-box"
            key={i}
          >
            <div className="contact-box-inner">
              <Icon size={25} />
              <h1 className="text-richblack-600">
                {ele?.heading}
              </h1>
            </div>
            <p className="font-medium">{ele?.description}</p>
            <p className="font-semibold text-blue-500">{ele?.details}</p>

           
          </div>
        )
      })}
     
     

    </div>
    <div className="social-media ">
       <Link className="hover:scale-150" to="https://www.instagram.com" > <img src={instagram} width={30} height={30} /></Link>
       <Link className="hover:scale-150" to="https://www.facebook.com" > <img src={facebook} width={30} height={30} /></Link>
       <Link className="hover:scale-150" to="https://www.twitter.com" > <img src={twitter} width={30} height={30} /></Link>
       <Link className="hover:scale-150" to="https://www.whatsapp.com" > <img src={whatsapp} width={30} height={30} /></Link>
       
        
      </div>
    </div>
  
  )
}

export default ContactDetails
