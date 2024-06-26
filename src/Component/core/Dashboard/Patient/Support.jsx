
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardHeader from '../DashboardHeader'

const SupportInfo = () => {
    const [supportInfo, setSupportInfo] = useState(null);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/support`)
            .then(res => {
                setSupportInfo(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    return (
       <>
            <DashboardHeader/>
         <div className= "mt-10 mx-auto w-11/12 max-w-[1000px]  flex flex-col bg-blue-250 rounded-md">
            {supportInfo && (
                <div>
                <div className='p-6'> <h1 className='text-richblack-900 text-3xl font-semibold'>SUPPORT</h1></div>

         
<div className='flex flex-row mt-6 ml-10 lg:ml-20 '> 
 <h1 className='text-richbalck-900 text-[16px] font-semibold lg:text-xl'>Hospital Contact Numbers : </h1> <div>
   <p className='text-richblack-800 text-sm mt-1  mx-2'>{supportInfo.hospitalNumber}</p>
 
 </div>
</div>

 <div className='flex flex-row mt-6 ml-10 lg:ml-20 '> 
 <h1 className='text-richbalck-900 text-[16px] font-semibold lg:text-xl '> Emergency Ward Contact Numbers : </h1>
 <div>
  <p className='text-richblack-800 text-sm mt-1  mx-2'>{supportInfo.emergencyNumber}</p>

 </div>
 </div>

<div className='flex flex-row mt-6 ml-10 lg:ml-20 '> 
 <h1 className='text-richbalck-900 text-[16px] font-semibold lg:text-xl '> Email Id : </h1>
 <div>
 <p className='text-richblack-800 text-sm mt-1  mx-2'>{supportInfo.email}</p>
 </div>
 </div>        
     </div>
         )
          
        }
       
       <div className='mt-20 mb-4 ml-20 text-richblack-900 '>
         <p> Health Ease always at your care 😊</p>
        </div>
 
                   
              
         
        </div>
       </>
    );
};

export default SupportInfo;

