import React from "react";
import ContactUsForm from "../ContactUsPage/ContactUsForm";
import "../../assests/CSS/Contact.css"

const ContactForm = () => {
  return (
    <div className="contact-form1">
      <h1 className="">
      Contact Us

      </h1>
      <p className="">
      We would love to hear from you! Please fill in the required details and our team will get in touch with you.
      </p>

      <div className="contact-form2">
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactForm;
