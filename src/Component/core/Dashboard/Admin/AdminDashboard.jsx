
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardHeader from '../DashboardHeader';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [userCounts, setUserCounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const baseURL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersResponse = await axios.get(`${baseURL}/profile/users`);
        setUsers(usersResponse.data.users);
      } catch (error) {
        setError('Error fetching users');
      }
    };

    const fetchUserCounts = async () => {
      try {
        const countsResponse = await axios.get(`${baseURL}/profile/count`);
        setUserCounts(countsResponse.data.counts);
      } catch (error) {
        setError('Error fetching user counts');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
    fetchUserCounts();
  }, []);

  return (
  <>
  <DashboardHeader/>
      <div className="container mx-auto p-6">
    <div className='w-8/12 mx-auto'>
          <h2 className="text-xl font-bold mb-4 text-center text-white">User Count </h2>
          <ul className="bg-white p-4 flex flex-col md:flex-row md:flex-wrap items-center justify-center rounded-xl space-y-4 md:space-y-0 md:space-x-4">
  {userCounts.map(count => (
    <li key={count._id} className="flex flex-col items-center">
    <div className=''>
    <div className="font-semibold text-2xl text-center "> {count._id}  </div>  
   <div className='text-center mt-2 font-semibold text-blue-500 text-xl'> {count.count}
   </div>
    </div>
    </li>
  ))}
</ul>
        </div>

    {loading ? (
      <p>Loading...</p>
    ) : error ? (
      <p className="text-red-500">{error}</p>
    ) : (
      <div>
        <div className="mb-8 mx-auto lg:mx-20 ">
          <h2 className="text-2xl font-bold mb-4 mt-10 text-white text-center">All Users</h2>
          <div className='overflow-x-auto '>
            
          <table className="table-auto w-full bg-white ">
            <thead>
              <tr>
                <th className="border px-4 py-2">First Name</th>
                <th className="border px-4 py-2">Last Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Account Type</th>
           
              </tr>
            </thead>
            <tbody className='text-center'>
              {users.map(user => (
                <tr key={user._id}>
                  <td className="border px-4 py-2">{user.firstName}</td>
                  <td className="border px-4 py-2">{user.lastName}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">{user.accountType}</td>
                
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
        
      </div>
    )}
  </div>


  </>
  );
};

export default UserManagement;
