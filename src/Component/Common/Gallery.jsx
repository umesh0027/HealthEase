


import React, { useState } from 'react';
import { FiMaximize2 } from "react-icons/fi"; // Import the maximize icon

import galleryimage1 from "../../assests/WeCare-main/WeCare Img/gallery/1.webp";
import galleryimage2 from "../../assests/WeCare-main/WeCare Img/gallery/2.jpg";
import galleryimage3 from "../../assests/WeCare-main/WeCare Img/gallery/3.jpg";
import galleryimage4 from "../../assests/WeCare-main/WeCare Img/gallery/4.webp";
import galleryimage5 from "../../assests/WeCare-main/WeCare Img/gallery/5.webp";
import galleryimage6 from "../../assests/WeCare-main/WeCare Img/gallery/6.jpg";
import galleryimage7 from "../../assests/WeCare-main/WeCare Img/gallery/7.jpg";
import galleryimage8 from "../../assests/WeCare-main/WeCare Img/gallery/8.webp";
import galleryimage9 from "../../assests/WeCare-main/WeCare Img/gallery/9.webp";

const Gallery = () => {
  const [enlargedImage, setEnlargedImage] = useState(null);

  const gallery = [
    { id: 1, image: galleryimage1 },
    { id: 2, image: galleryimage2 },
    { id: 3, image: galleryimage3 },
    { id: 4, image: galleryimage4 },
    { id: 5, image: galleryimage5 },
    { id: 6, image: galleryimage6 },
    { id: 7, image: galleryimage7 },
    { id: 8, image: galleryimage8 },
    { id: 9, image: galleryimage9 },
  ];

  const handleMaximizeClick = (image) => {
    setEnlargedImage(image);
  };

  const handleCloseMaximizedImage = () => {
    setEnlargedImage(null);
  };

  return (
    <div className='bg-blue-250 h-full '>
      <h1 className='text-center text-4xl p-4'> Our Gallery</h1>
      <div className='mt-6  flex flex-wrap justify-center'>
        {gallery.map((item, index) => (
          <div className='relative mb-8' key={index}>
            <img
              src={item.image}
              alt="image"
              className='max-w-[300px] h-[300px] rounded-xl transition duration-300 ease-in-out transform hover:scale-105 hover:blur-1 mt-10 mx-10'
              onClick={() => handleMaximizeClick(item.image)}
            />
            {enlargedImage === item.image && (
              <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                <img
                  src={enlargedImage}
                  alt="enlarged"
                  className='max-w-[90%] max-h-[90%] object-contain cursor-pointer'
                  onClick={handleCloseMaximizedImage}
                />
              </div>
            )}
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
              <FiMaximize2
                className='text-white text-4xl cursor-pointer'
                onClick={() => handleMaximizeClick(item.image)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
