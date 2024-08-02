


import React, { useState } from 'react';
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SliderHome = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    centerMode: true,
    centerPadding: 0,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: false,
        }
      }
    ]
  };

  const data = [
    { id: 1, text: "Appointment", link: "/Login" },
    { id: 2, text: "Get Health Checkup", link: "/Login" },
    { id: 3, text: "Virtual Consultant", link: "/Login" },
    { id: 4, text: "Home Care", link: "/services" },
    { id: 5, text: "Book a Test", link: "/contact" },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className='outline-none'>
      <Slider {...settings}>
        {data.map((item, index) => (
          <Link to={item.link} key={index}>
            <div
              className={`py-3 px-4 md:px-6 lg:px-8  min-w-[150px] max-w-[300px] py-2 px-10  mx-auto ${activeIndex === index ? 'bg-blue-600 hover:bg-blue-600 focus:outline-none cursor-pointer' : 'bg-richblack-100 hover:bg-blue-600 focus:outline-none cursor-pointer'}`}
              onClick={() => setActiveIndex(index)}
            >
              <h2 className='text-center text-white text-bold text-lg md:text-[15px]'>{item.text}</h2>
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
};

export default SliderHome;
