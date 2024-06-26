


import { Link } from 'react-router-dom';
import Navs from './Nav';

const DiseaseCard = ({ disease, onPredictNowClick }) => {
  return (
   <div className='flex flex-col w-[300px] md:mx-40 items-center mx-auto lg:mx-auto'>
  
     <div className="bg-white rounded-lg shadow-md p-4">
      <img src={disease.image} alt={disease.title} className="w-full h-48 object-cover mb-4" />
      <h2 className="text-xl font-bold mb-2">{disease.title}</h2>
      <p className="text-gray-700 mb-4">{disease.description}</p>
      <div className="flex justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={onPredictNowClick}
        >
          Predict Now
        </button>
        <Link
          to={`/disease-details/${disease.id}`}
          className="text-blue-500 hover:text-blue-700"
        >
          Learn More
        </Link>
      </div>
    </div>
    
   </div>
  );
};

export default DiseaseCard;


// DiseaseCard.js

// import { Link } from 'react-router-dom';
// import Navs from './Nav';

// const DiseaseCard = ({ disease, onPredictNowClick }) => {
//   return (
//     <div className="bg-white rounded-lg shadow-md p-4 md:p-6 lg:p-8 max-w-sm mx-auto md:max-w-md lg:max-w-lg ">
//       <img 
//         src={disease.image} 
//         alt={disease.title} 
//         className="w-full h-48 object-cover mb-4 rounded-t-lg"
//       />
//       <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">{disease.title}</h2>
//       <p className="text-gray-700 mb-4">{disease.description}</p>
//       <div className="flex justify-between">
//         <button
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//           onClick={onPredictNowClick}
//         >
//           Predict Now
//         </button>
//         <Link
//           to={`/disease-details/${disease.id}`}
//           className="text-blue-500 hover:text-blue-700"
//         >
//           Learn More
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default DiseaseCard;
