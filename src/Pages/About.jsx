import React from 'react'
import styles from "../assests/CSS/About.module.css"
// import  styles from "../Component/Common/Awards.module.css"
import imageleft from "../assests/WeCare-main/WeCare Img/about/Aboutpage.png"
import { TypeAnimation } from "react-type-animation";
import Aboutgrowth from '../Component/core/About_growth';
import NavBar from '../Component/Common/NavBar';



import Awards from "../Component/Common/Awards"
import missionHm from "../assests/WeCare-main/WeCare Img/about/Mission for HM.jpg"
import Footer from '../Component/Common/Footer';
const About = () => {
  return (
    <div className='overscroll-x-none'>
        <NavBar/>
    
      <div className={`${styles['About-bg'] } h-[300px] md:h-[400px] lg:h-[600px] `}>
    <h1 className='text-4xl'># Health Ease</h1>
      <div className={`${styles.para}`}>
       
      <TypeAnimation
            sequence={[`Welcome to Health Ease Hospital, where your health is our top priority. Founded in 2020, WeCare has been providing exceptional healthcare services to our community for over  three years.`, 500, ""]}
            cursor={true}
            repeat={Infinity}
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
            omitDeletionAnimation={true}
          />
      </div>
    </div>


    <div className={`${styles['About-container']} lg:flex items-center justify-center `}>
      <div className={`${styles['About-container-left']} p-4 lg:p-10 md:px-6`}><img src={imageleft} alt="" /></div>
      <div className={`${styles['About-container-right']} p-4 lg:p-10 md:px-6`}>
        <h2 className='text-center'>About Us</h2>
       <p>Welcome to Health Ease Hospital, where your health is our top priority. Founded in 2020, WeCare has been providing exceptional healthcare services to our community for over  three years.</p>

<p>At WeCare, we believe in a patient-centric approach, ensuring that each individual receives personalized care and attention. Our team of experienced and dedicated healthcare professionals is committed to delivering high-quality medical services, using the latest technology and innovative treatments.</p>

<p>We offer a wide range of medical specialties, ensuring that we can meet the diverse healthcare needs of our patients. Whether you require routine medical care or specialized treatment, you can trust WeCare to provide compassionate and effective care.</p>

<p>Our state-of-the-art facilities are designed to create a comfortable and welcoming environment for our patients. From our modern patient rooms to our advanced medical equipment, we strive to ensure that your experience at WeCare is both pleasant and effective.</p>

<p>At WeCare, we are more than just a hospital – we are a healthcare partner dedicated to helping you live a healthier life. We look forward to serving you and your family and being a part of your healthcare journey.</p>

      </div>
    </div>

  {/* Our Growth */}
   <div className={`${styles.OurGrowth}`}>
    <Aboutgrowth/>
   </div>

   <div className={`${styles['About-miss-vision']}  lg:flex flex-row `}>
            <div className={`${styles['About-miss-vision-div-img']} lg:w-[50%] `}>
             <img src={missionHm} alt="" />
            </div>
            <div className={`${styles['About-miss-vision-div']} lg:w-[50%] bg-richblack-900 `}>
              <h1 className='text-white text-center p-4 text-2xl text-semibold'>
              Our Mission
              </h1>
              <p className='text-white text-center p-4' >
               "At HealthEase, our mission is to simplify and revolutionize healthcare management through innovative technology solutions. We strive to empower healthcare providers with user-friendly tools that enhance patient care, streamline operations, and promote overall wellness. With a commitment to accessibility, efficiency, and excellence, we aim to transform the healthcare experience for providers and patients alike."
              </p>
            </div>
          </div>
    <div className='bg-pure-greys-350 w-full h-full'>
    <h1 className='text-center py-4 lg:text-4xl font-semibold text-2xl'> Awards & Recognitions</h1>

     <Awards/>
    </div>
    <Footer/>
    </div>
  )

}

export default About
