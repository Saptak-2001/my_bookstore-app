import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Profile/Sidebar'
import { Outlet } from 'react-router-dom'
import axios from 'axios';
import Spinner from '../components/Loader/Spinner';
import MobileNav from '../components/Profile/MobileNav';

const Profile = () => {

  //const isLoggedIn = useSelector();
  const [profile, setProfile] = useState();
  const headers = {
      id: localStorage.getItem("id"),
      authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
      const fetch = async () => {
         const response = await axios.get("http://localhost:1000/api/auth/get-user-info", {headers});
         setProfile(response.data);
      }
      fetch();
  }, []);

  return (
    <div className='bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row py-8 gap-4 text-white'>
      {!profile && <div className='w-full h-[100%] flex items-center justify-center'><Spinner/></div>}
      {profile && (
        <>
        <div className='w-full md:w-1/6 h-auto lg:h-screen'>
          <Sidebar data={profile}/>
          <MobileNav/>
        </div>
        <div className='w-full md:w-5/6'>
          <Outlet/>
        </div>
        </>
      )}
    </div>
  )
}

export default Profile
