import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import NavBar from '../Component/Common/NavBar';
import { FiMaximize2 } from "react-icons/fi";
import Footer from '../Component/Common/Footer';
const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [modalImage, setModalImage] = useState('');
  useEffect(() => {
    fetchBlogDetails();
    fetchAllBlogs(); // Fetch all blogs to get images
  }, []);
  const fetchAllBlogs = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/blogs`);
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching all blogs:', error);
    }
  };
  const fetchBlogDetails = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/blogs/${id}`);
      setBlog(response.data);
     
    } catch (error) {
      console.error('Error fetching blog details:', error);
    }
  };
  const handleMaximizeImage = (imageUrl) => {
    setModalImage(imageUrl);
  };

  const handleCloseModal = () => {
    setModalImage('');
  };
  if (!blog) {
    return <div className='flex justify-center items-center text-4xl spinner'>Loading...</div>;
  }
  // Get all images from all blogs stored on Cloudinary
  const allImages = blogs.map(blog => blog.imageUrl);
  return (
   <>
   <NavBar/>
   <div className="bg-richblack-800 h-auto p-10 ">
   <h1 className='text-white p-4 text-center text-3xl text-bold'>{blog.categories}</h1>
      <div className=" md:flex flex-col md:mx-10  lg:mx-20 items-center justify-center   ">

        <div className='w-full mb-10'>
        <img src={blog.imageUrl} alt="Blog" className="w-full h-auto object-center rounded-xl " />
        </div>

        <div className=" px-2 text-richblack-5 border border-white">
        
          <h1 className="text-3xl font-bold mb-4 mt-6 text-center">{blog.title}</h1>
          <p className="text-gray-600 mb-2 text-center px-4 text-justify">{blog.description}</p>
          <p className="text-gray-600 mb-2 mt-6 text-center px-4 text-justify">{blog.content}</p>
          {/* Render other details of the blog post */}
        </div>
      </div>

    </div>
     {/* Render all images */}
     <div className="bg-blue-250">
              {/* <h2 className="text-2xl font-semibold mb-4">All Images</h2> */}
              <div className="flex flex-wrap justify-center ">
                {allImages.map((imageUrl, index) => (
                  <div key={index} className="relative mr-4 mb-4">
                    <img src={imageUrl} alt={`Image ${index + 1}`} className="max-w-[300px] h-[300px] rounded-xl transition duration-300 ease-in-out transform hover:scale-105 hover:blur-1 mt-10 mx-10" />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 hover:opacity-100 transition duration-300 ease-in-out">
                      <FiMaximize2 className="text-richblack-900 text-6xl text-bold cursor-pointer" onClick={() => handleMaximizeImage(imageUrl)} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
     {/* Modal for displaying enlarged image */}
     {modalImage && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="max-w-screen-lg w-full">
            <img src={modalImage} alt="Enlarged Image" className="w-[500px] h-auto  rounded-xl transition duration-300 ease-in-out transform hover:scale-105 hover:blur-1" onClick={handleCloseModal}/>
            <button className="absolute top-10 left-10 m-4 p-2 bg-gray-900 text-white text-2xl text-bold rounded-full hover:bg-gray-700 " onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}

      <Footer/>
   </>
  );
};

export default BlogDetails;
