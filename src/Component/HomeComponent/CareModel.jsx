

import React from 'react';
import c1 from "../../assests/WeCare-main/WeCare Img/c1.jpg";
import c2 from "../../assests/WeCare-main/WeCare Img/c2.jpg";
import c3 from "../../assests/WeCare-main/WeCare Img/c3.jpg";
import c4 from "../../assests/WeCare-main/WeCare Img/c4.jpg";
import c5 from "../../assests/WeCare-main/WeCare Img/c5.jpg";
import c6 from "../../assests/WeCare-main/WeCare Img/c6.jpg";
import c7 from "../../assests/WeCare-main/WeCare Img/c7.jpg";
import c8 from "../../assests/WeCare-main/WeCare Img/c8.jpg";
import c9 from "../../assests/WeCare-main/WeCare Img/c9.jpg";

const CareModel = () => {
    const images1=[
        {
           id:1,
           img: c1,
           imageTitle:" Infrastructure"   
        },
        {
            id:2,
            img:c2,
            imageTitle:"Bed Facilities"
        },
        {
            id:3,
            img:c3,
            imageTitle:"Tests"
        },  
    ]
    const images2=[
        {
           id:1,
           img: c4,
           imageTitle:"Network Branches"
        },
        {
            id:2,
            img:c7,
            imageTitle:"Best Doctors "
        },
        {
            id:3,
            img:c6,
            imageTitle:"Wide Service Line"
        },  
    ]
    const images3=[
        {
           id:1,
           img: c7,
           imageTitle:"Surgery"
        },
        {
            id:2,
            img:c8,
            imageTitle:"Labs"
        },
        {
            id:3,
            img:c9,
            imageTitle:"Medicine"
        },  
    ]
  return (
    <>

        <h1 className='text-center mt-10 text-2xl md:text-4xl lg:text-4xl font-bold text-gray-900'>
  Health Ease Model of Care
</h1>
        <div className='flex flex-col mx-auto md:w-4/5 lg:w-3/5 xl:w-4/5 mt-20 mb-10'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mx-14 lg:mx-auto md:mx-2'>
                {images1.map((item, index) => (
                    <div key={index} className='group relative cursor-pointer hover:scale-105 transition-transform'>
                        <img className='  rounded-lg hover:scale-105 transition-transform' src={item.img} alt={item.imageTitle} />
                        <p className='absolute w-full h-full  top-0 text-opacity-0 hover:text-opacity-100 text-pink-800 text-bold text-3xl text-center pt-20 group-hover:bg-white group-hover:bg-opacity-30 '>{item.imageTitle}</p>
                    </div>
                ))}
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 mx-14 lg:mx-auto md:mx-2'>
                {images2.map((item, index) => (
                    <div key={index} className='group relative cursor-pointer hover:scale-105 transition-transform'>
                        <img className=' rounded-lg hover:scale-105 transition-transform' src={item.img} alt={item.imageTitle} />
                        <p className='absolute w-full h-full  top-0 text-opacity-0 hover:text-opacity-100 text-pink-800 text-bold text-3xl text-center pt-20 group-hover:bg-white group-hover:bg-opacity-30 '>{item.imageTitle}</p>
                    </div>
                ))}
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 mx-14 lg:mx-auto md:mx-2'>
                {images3.map((item, index) => (
                    <div key={index} className='group relative cursor-pointer hover:scale-105 transition-transform'>
                        <img className='  rounded-lg hover:scale-105 transition-transform' src={item.img} alt={item.imageTitle} />
                        <p className='absolute w-full h-full  top-0 text-opacity-0 hover:text-opacity-100 text-pink-800 text-bold text-3xl text-center pt-20 group-hover:bg-white group-hover:bg-opacity-30 '>{item.imageTitle}</p>
                    </div>
                ))}
            </div>
        </div>
    </>
  );
};

export default CareModel;
