import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Spinner from '../Loader/Spinner';
import { GrLanguage } from 'react-icons/gr';
import { FaHeart } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useSelector } from 'react-redux';

const BookDetails = () => {

    const {id} = useParams();
    const [data, setData] = useState();
    const navigate = useNavigate();
    const isLoggedIn =  useSelector((state)=>state.auth.isLoggedIn);
    const role =  useSelector((state)=>state.auth.role);

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(`http://localhost:1000/api/auth/get-book-by-id/${id}`);
            setData(response.data.data);
        };
        fetch();
    }, []);

    const headers = {
      id: localStorage.getItem("id"),
      authorization: `Bearer ${localStorage.getItem("token")}`,
      bookid: id,
  };

    const handleFavourite = async () => {
      const response = await axios.put('http://localhost:1000/api/user/add-book-to-favourite', {}, {headers});
      alert(response.data.message);
    }

    const handleCart = async () => {
      const response = await axios.put("http://localhost:1000/api/user/add-to-cart", {}, {headers});
      alert(response.data.message);
    }

    const handleDelete = async () => {
      const response = await axios.delete("http://localhost:1000/api/admin/delete-book", {headers});
      alert(response.data.message);
      navigate("/all-books")
    }
  return (
    <>
      {data && (
        <div className='px-4 md:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row gap-8'>
        <div className='w-full lg:w-3/6'>
          {" "}
          <div className='bg-zinc-800 flex flex-col lg:flex-row justify-around p-12 rounded'>
            {" "}
            <img src={data.url} alt="bookImage" className='h-[50vh] md:h-[60vh] lg:h-[70vh] rounded'/>
            {isLoggedIn === true && role === "user" && (
              <div className='flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start lg:mt-0 mt-8'>
                <button className='bg-white rounded lg:rounded-full text-2xl p-3 text-red-500 flex items-center justify-center' onClick={handleFavourite}>
                  <FaHeart />{" "} 
                  <span className='ms-4 block lg:hidden'>Favourites</span>
                </button>
                <button className='text-white rounded mt-8 md:mt-0 lg:rounded-full text-2xl p-3 lg:mt-8 bg-blue-500 flex items-center justify-center' onClick={handleCart}>
                <FaCartPlus />{" "}
                <span className='ms-4 block lg:hidden'>Add to Cart</span>
                </button>
              </div>
            )}
            {isLoggedIn === true && role === "admin" && (
              <div className='flex lg:flex-col items-center justify-between lg:justify-start md:flex-row flex-col lg:mt-0 mt-8'>
                <Link to={`/update-book/${id}`} className='bg-white rounded lg:rounded-full text-2xl p-3 flex items-center justify-center'>
                <FaEdit />{" "} 
                <span className='ms-4 block lg:hidden'>Edit</span>
                </Link>
                <button className='text-red-500 rounded lg:rounded-full text-2xl p-3 mt-8 md:mt-0 lg:mt-8 bg-white flex items-center justify-center' onClick={handleDelete}>
                <MdDelete />{" "}
                <span className='ms-4 block lg:hidden'>Delete Book</span>
                </button>
              </div>
            )}
          </div>
        </div>
        <div className='p-4 w-full lg:w-3/6'>
          <h1 className='text-4xl text-zinc-300 font-semibold'>{data.title}</h1>
          <p className='text-zinc-400 mt-1'>By {data.author}</p>
          <p className='text-zinc-500 mt-4 text-xl'>{data.desc}</p>
          <p className='flex mt-4 items-center justify-start text-zinc-400'>
            <GrLanguage className='me-3'/> {data.language}
          </p>
          <p className='mt-4 text-zinc-100 text-3xl font-semibold'>
            Price: ₹ {data.price}{" "}
          </p>
        </div>
      </div>
      )}
      {!data && <div className='h-screen bg-zinc-900 flex items-center justify-center'><Spinner/></div>}
    </>
  )
}

export default BookDetails
