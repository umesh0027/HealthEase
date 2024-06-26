import React from 'react'
import ContactForm from "../Component/ContactUsPage/ContactForm"
import Contactdetails from "../Component/ContactUsPage/Contactdetails"
import "../assests/CSS/Contact.css"
import NavBar from '../Component/Common/NavBar'
import Footer from '../Component/Common/Footer'

const Contact = () => {
  return (
    
   <div>
       <NavBar/>
    <div className='contactbgImg h-[200px] lg:h-[700px] md:h-[500px]'></div>
    <div className="contact-container">
        {/* Contact Details */}
        <div className="contact-details mx-auto p-4">
          <Contactdetails />
          <address id="address">
           Health Ease 154/7 connaught place-delhi
          </address>
          <div className=''>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d448193.95106615534!2d76.76355477113817!3d28.644287345100643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sDelhi!5e0!3m2!1sen!2sin!4v1708919974697!5m2!1sen!2sin" className=' mx-auto lg:w-[500px] lg:h-[300px] md:w-[400px] md:h-[300px] w-[320px] h-[300px]'  allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
        

        {/* Contact Form */}
        
        <div className="contact-form mb-10 p-4 md:px-10">
          <ContactForm />
        </div>
      </div>
<Footer/>
   </div>
  )
}

export default Contact
