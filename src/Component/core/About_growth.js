import React from 'react'
import About1 from "../../assests/WeCare-main/WeCare Img/about/about1.jpg"
import About2 from "../../assests/WeCare-main/WeCare Img/about/about2.jpg"
import About3 from "../../assests/WeCare-main/WeCare Img/about/about3.jpg"
import About4 from "../../assests/WeCare-main/WeCare Img/about/about4.jpg"
import About5 from "../../assests/WeCare-main/WeCare Img/about/about5.jpg"
import { CiLocationOn } from "react-icons/ci";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles1 from "../../assests/CSS/About.module.css"
import  "../../assests/CSS/MySlider.css"


const Aboutgrowth = () => {
    const data=[
        {
            id:2012,
             img: About1,
            name:"Health Ease",
            location:"Delhi",
            bed:"221",
            Icubeds:"134",
            year:2012
        },
        {
            id:2,
            img:About2,
            name:"Health Ease",
            location:"Lucknow",
            bed:"243",
            Icubeds:"146",
            year:2013
        },
        {
            id:3,
            img:About3,
            name:"Health Ease",
            location:"Mumbai",
            bed:"265",
            Icubeds:"187",
            year:2014
        },
        {
            id:4,
            img:About4,
            name:"Health Ease",
            location:"Gujrat",
            bed:"289",
            Icubeds:"197",
            year:2015

        },
        {
            id:5,
            img:About5,
            name:"Health Ease",
            location:"Banglore",
            bed:"300",
            Icubeds:"200",
            year:2016,

        },
    ];

    // const customDotStyles = {
    //     margin: '10' // Adjust the spacing between dots as needed
    //   };
    const settings = {
        dots: true,
        infinite:true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 2000,
      
        appendDots: dots => (
            <div
            >
      <ul className='items-center flex-row justify-center' >{dots} </ul>
            </div>
          ),

     
         
          customPaging: (i) => {
            const item = data[i];
            return (
              <div className='flex flex-col  '>
                <div 
                style={{
                  
                  width: "30px",
                  height: "30px",
                  backgroundColor:"#c2c2c4",
                  color: "blue",
                  borderRadius: "50%",
                 
                
                }
                }
              >
              
              </div>

              <div className='text-xs text-blue-500 font-semibold '>
                {item.year}
              </div>
              </div>
            
            );
          },
      };
   

  return (
  
      
<>
<div className={`${styles1.Aboutcontainer2} h-[580px] ` }>
   <h1 className='text-3xl text-richblack-900 font-semibold p-4 '>Our Growth</h1>
    <Slider {...settings}  className={styles1.slider} >
    {data.map((item, index) => {
    return (
        <div className={`${styles1.Aboutcontainer1} `}>
        <div className={`${styles1['Aboutcontainer1-growth']} mx-auto lg:mb-10 md:mb-20  mb-[60px] `} key={index} >
             <div className={`${styles1['About-card']}`} >
                <img src={item.img} alt="" />
             </div>
             <div className={`${styles1['About-content'] } flex flex-col`}>
     
                  <h2 className='flex items-center justify-center text-[18px] lg:text-[30px] font-semibold'><span className='font-semibold ml-4 '><CiLocationOn /></span>{item.location}  {item.year}</h2>
                <h3>{item.name}</h3>
                <p className=''>{item.bed} Beds & {item.Icubeds} ICU Beds </p>
             </div>
          
             </div>
         
             </div>
        )   
 })}  
 </Slider>

 </div>     

</>

   
  )
}

export default Aboutgrowth
