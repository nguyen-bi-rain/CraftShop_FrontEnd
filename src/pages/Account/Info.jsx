// Info.js
import React, { useEffect, useState } from 'react';
import { getUserAccount } from '../../services';
import User from '../../assets/f060625d-0e0d-4693-aa2e-315aba141d3c_436300346_1580965975779107_6978994182440941229_n.jpg';

const Info = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      let token = localStorage.getItem('user');
      const response = await getUserAccount(token);
      setUser(response.result);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const handleEdit = () => {
    // Handle edit logic here
  };

  const handleSave = () => {
    // Handle save logic here
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading user data</div>;
  }

  return (
    <div>
      <h2 className='capitalize font-semibold text-lg mb-9'>Profile Details</h2>
      <div className='flex justify-center items-center'>
        <img
          src={user.userPhoto ? require(`../../assets/${user.userPhoto}`) : User}
          alt='user'
          className='w-[150px] h-[150px] rounded-full object-contain'
        />
      </div>
      <table className='flex justify-center items-center mt-7 text-left rtl:text-right'>
        <tbody>
          <tr>
            <td className='pr-8 py-3 text-base font-normal'>Full Name</td>
            <td className='text-base font-semibold'>{user.userName}</td>
          </tr>
          <tr>
            <td className='pr-8 py-3 text-base font-normal'>Email</td>
            <td className='text-base font-semibold'>{user.email}</td>
          </tr>
          <tr>
            <td className='pr-8 py-3 text-base font-normal'>Phone Number</td>
            <td className='text-base font-semibold'>{user.phoneNumber}</td>
          </tr>
          <tr>
            <td className='pr-8 py-3 text-base font-normal'>Address</td>
            <td className='text-base font-semibold'>{user.address ?? '--not added--'}</td>
          </tr>
        </tbody>
      </table>
      <button className='px-8 py-3 bg-black text-white mt-8 mr-4' onClick={handleEdit}>
        Edit
      </button>
      <button className='px-8 py-3 bg-black text-white mt-8' onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default Info;
