


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { formattedDate } from '../../utils/dateFormatter';
import { Link } from 'react-router-dom';

const NewsListPage = () => {
  const [newsEvents, setNewsEvents] = useState([]);
  const [readmore, setReadmore] = useState(false);

  function readmoreHandler() {
    setReadmore(!readmore);
  }

  useEffect(() => {
    fetchNewsEvents();
  }, []);

  const fetchNewsEvents = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/news-events`);
      setNewsEvents(response.data);
    } catch (error) {
      console.error('Error fetching news events:', error);
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full h-full">
      <div className="w-11/12 mx-auto">
        <Slider {...settings}>
          {newsEvents.map((event) => (
            <div key={event._id} className="rounded-xl">
              <div className="bg-white shadow-md rounded-xl overflow-hidden w-full h-full p-4 hover:scale-105">
                <div className="">
                  <img src={event.image} alt={event.title} className="h-60 w-full object-cover object-center rounded-xl" />
                </div>
                <div className="p-4 items-center text-center rounded-xl">
                  <h3 className="text-medium font-semibold mb-2">{event.title}</h3>
                  <div className="text-gray-600 mb-2 overflow-hidden">{readmore ? event.description : `${event.description.substring(0, 20)}....`}</div>
                  <p className="text-gray-600 mb-2">Date: {formattedDate(event.date)}</p>
                  <p className="text-gray-600 mb-1 text-[12px] font-bold">Location: {event.location}</p>
                  <Link to={`/news/${event._id}`} className="text-blue-500 underline">View Page Details</Link>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default NewsListPage;
