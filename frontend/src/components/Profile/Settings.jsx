import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Spinner from '../Loader/Spinner';

const Settings = () => {
  const [Value, setValue] = useState({address: ""});
  const [profileData, setProfileData] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

 useEffect(() => {
  const fetch = async () => {
    const response = await axios.get("http://localhost:1000/api/auth/get-user-info", {headers});
    setProfileData(response.data);
    setValue({address: response.data.address});
  }
  fetch();
 }, []);

 const handleChange = (e) => {
  const {name, value} = e.target;
  setValue({...Value, [name]: value});
 }

 const handleUpdateAddress = async () => {
  const response = await axios.put("http://localhost:1000/api/auth/update-address", Value, {headers});
  alert(response.data.message);
 }

  return (
    <>
      {!profileData && <div className='w-full h-[100%] flex items-center justify-center'><Spinner/></div>}{" "}
      {profileData && (
        <div className='h-auto p-0 md:p-4 text-zinc-100'>
          <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8 text-center'>
            Settings
          </h1>
          <div className='flex gap-12'>
            <div className=''>
              <label htmlFor="">Name</label>
              <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'>{profileData.username}</p>
            </div>
            <div className=''>
              <label htmlFor="">Email</label>
              <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'>{profileData.email}</p>
            </div>
          </div>
          <div className='mt-4 flex flex-col'>
            <label htmlFor="">Address (Can be Edited)</label>
            <textarea className="p-2 rounded bg-zinc-800 mt-2 font-semibold" rows="4" placeholder='Address' name='address' value={Value.address} onChange={handleChange}/>
          </div>
          <div className='mt-4 flex justify-end'>
            <button className='bg-yellow-500 text-zinc-900 font-semibold px-3 py-2 rounded hover:bg-yellow-400 transition-all duration-300 w-full' onClick={handleUpdateAddress}>Update</button>
          </div>
        </div>
      )}
    </>
  )
}

export default Settings
