
import React from 'react'
import leafRight from "../../assests/WeCare-main/WeCare Img/leaf-right.png"
import leafLeft from "../../assests/WeCare-main/WeCare Img/leaf-left.png"
import Slider from "react-slick";
import  styles from "../Common/Awards.module.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../assests/CSS/MySlider.css"

const Awards = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 640, // Adjust breakpoint according to your preference
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
    ],

  };
  
const CardDetails= [
  {
      id:1,
    date: '2023',
    title: 'Excellence in Patient Care',
    description: 'Awarded for providing exceptional care and support to patients.'
  },
  {
      id:2,
    date: '2022',  
    title: 'Best Hospital for Innovation',
    description: 'Recognized for implementing innovative technologies and practices in healthcare'
  },
  {
      id:3,
    date: '2021',
    title: 'Top Hospital for Patient Safety',
    description: 'Acknowledged for maintaining high standards of patient safety and quality care.'
  },
  {
      id:4,
    date: '2020',
    title: 'Community Health Champion',
    description: 'Awarded for outstanding contributions to community health and well-being.'
  },
  {
      id:5,
    date: '2019',
    title: 'Hospital of the Year',
    description: 'Recognized as the top hospital for its overall performance .'
  },
  {
      id:6,
    date: '2021',
    title: 'Best Technology Implementation',
    description: 'Awarded for successfully implementing cutting-edge technology to improve patient outcomes.'
  },
  {
      id:7,
    date: '2023',
    title: 'Outstanding Hospital Leadership',
    description: 'Recognized for exemplary leadership in the healthcare industry.'
  },
  {
      id:8,
    date: '2024',
    title: 'Best Hospital for Employee Satisfaction ',
    description: 'Acknowledged for providing a positive and supportive work environment for employees.'
  },
  {
      id:9,
    date: '2021',
    title: 'Excellence in Medical Education',
    description: 'Recognized for excellence in medical education and training programs.'
  },
 
];

  return (
     
      <div className='w-[90%] m-auto py-10 '>
         <Slider {...settings} className={styles.slider }>
    {CardDetails.map((CardDetail)=>(
      <div key={CardDetail} className={`${styles['Award-card']} mt-10 mb-6 hover:scale-105 transition-transform  `}>
      <div className={`${styles.leafleft}`}>
        <img src={leafLeft} alt="" width={50} height={112} />
      </div>
      <div className={`${styles.date}`}><span >
        <h2>{CardDetail.date}</h2>
      </span></div>
     <div className={`${styles.title}`}> <span >
        {CardDetail.title}
      </span></div>
      <div className={`${styles.description} `}><span >
        {CardDetail.description}
      </span></div>
      <div className={`${styles.leafRight}`}>
        <img src={leafRight} alt="" width={50} height={112}/>
      </div>
      </div>
    ))}
      </Slider>
      </div>
    
  )
}
export default Awards








