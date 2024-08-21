

import React from 'react'
import  '../assests/CSS/Home.css';
// import {NavLink,Link} from 'react-router-dom';
import NavBar from '../Component/Common/NavBar';
import SliderHome from "../Component/HomeComponent/SliderHome"
import SolutionSteps from '../Component/HomeComponent/SolutionsSteps';
import CareModel from '../Component/HomeComponent/CareModel';
import Awards from '../Component/Common/Awards';
import Footer from '../Component/Common/Footer';
import NewsListPage from '../Component/HomeComponent/NewsList';
import HomeCircles from '../Component/HomeComponent/HomeCircle';
import { TypeAnimation } from "react-type-animation";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Home = () => {
   const {  loading } = useSelector((state) => state.doctors); 
  return (
    <>
        <NavBar/>
  {/* {`${styles['hero-section'] } relative w-fit h-fit shadow-blue-200 shadow-[0px_0px_30px_0px]}`} */}
  <section className='hero-section '></section>
  <div className='bg-caribbeangreen-150 md:h-[250px] flex items-center justify-center'>
  <div className="text-center">
    <h1 className='text-white text-4xl mb-6 font-semibold mt-4'>Caring for you, every step for the way.</h1>
    <p className="text-white text-base mx-auto md:w-3/4 font-normal mb-4 text-center">At Health Ease, our mission is to simplify and revolutionize healthcare management through innovative technology solutions. We strive to empower healthcare providers with user-friendly tools that enhance patient care, streamline operations, and promote overall wellness. With a commitment to accessibility, efficiency, and excellence, we aim to transform the healthcare experience for providers and patients alike.</p>
  </div>
</div>

{/* slider-section */}
<div className='absolute left-1/2 md:bottom-[104px]  bottom-[76px] lg:bottom-[10px] w-3/4 mx-auto transform -translate-x-1/2  border-slate-900 '>
  <SliderHome/>
</div>


<SolutionSteps/>
<HomeCircles/>
<CareModel/>

<div className='bg-blue-150'>
  <h1 className='text-center p-4 text-white font-semibold text-3xl '>Awards & Recognitions</h1>
  <Awards/>
</div>

<div className='bg-blue-250 w-full h-[600px] px-4 '>
  <h1 className='text-center py-6 text-4xl font-semibold text-richblack-700'> News & Events</h1>
  {loading ? (
        <div className="spinner items-center"></div>
      ) : ( <NewsListPage/>)
  }
</div>
<div className='bg-white'>
  <div className='text-center flex flex-col p-4 md:flex-row items-center justify-center '>
    <div className='cursor-pointer hover:underline flex items-center justify-center text-blue-500 font-bold text-xl bg-pink-500 text-white px-2 rounded-sm mb-4 md:mb-0 mx-10'>
      <TypeAnimation
        sequence={[` Click Here `, 1000, ""]}
        cursor={false}
        repeat={Infinity}
        style={{
          whiteSpace: "",
          display: "",
        }}
        omitDeletionAnimation={true}
      />
      <span className='mt-1 ml-2'><FaLongArrowAltRight /></span>
    </div>
    <Link to='/disease' className='py-6 lg:px-4 text-xl font-semibold text-blue-300 cursor-pointer hover:underline'>Try Health Ease's Disease Predictor</Link>
  </div>
</div>



    <Footer/>
    </>
  )
  }

export default Home
