import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Spinner from '../Loader/Spinner';
import { Link } from 'react-router-dom';

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
 };

 useEffect(() => {
  const fetch = async () => {
    const response = await axios.get("http://localhost:1000/api/user/get-order-history", {headers});
    setOrderHistory(response.data.data);
  }
  fetch();
 }, [])
  return (
    <>
      {!orderHistory && <div className='flex items-center justify-center h-screen'><Spinner/></div>}
      {orderHistory && orderHistory.length === 0 && (
        <div className='h-[80vh] p-4 text-zinc-100'>
          <div className='h-screen flex flex-col items-center justify-center'>
            <h1 className='text-5xl font-semibold text-zinc-500 mb-8'>No Order History</h1>
            <img src="https://cdn-icons-png.flaticon.com/128/9961/9961218.png" alt="" className='h-[20vh] mb-8'/>
          </div>
        </div>
      )}
      {orderHistory && orderHistory.length > 0 && (
        <div className='h-auto p-0 md:p-4 text-zinc-100'>
          <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8 text-center'>Your Order History</h1>
          <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2'>
            <div className='w-[6%]'>
              <h1 className='text-center'>Sr.</h1>
            </div>
            <div className='w-[21%]'>
              <h1 className='text-center'>Books</h1>
            </div>
            <div className='w-[45%]'>
              <h1 className='text-center'>Description</h1>
            </div>
            <div className='w-[8%]'>
              <h1 className='text-center'>Price</h1>
            </div>
            <div className='w-[15%]'>
              <h1 className='text-center'>Status</h1>
            </div>
            <div className='w-none md:w-[5%] hidden md:block'>
              <h1 className='text-center'>Mode</h1>
            </div>
          </div>
          {orderHistory.map((items, i) => (
            <div className='bg-zinc-800 w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-900 hover:cursor-pointer'>
              <div className='w-[6%]'>
                <h1 className='text-center'>{i + 1}</h1>
              </div>
              <div className='w-[21%]'>
                <Link to={`/view-book-details/${items.book._id}`} className='hover:text-blue-300'>
                  <p className='text-center'>{items.book.title.substring(0,20)}...</p>
                </Link>
              </div>
              <div className='w-[45%]'>
                <h1 className='text-center'>{items.book.desc.slice(0,50)}...</h1>
              </div>
              <div className='w-[8%]'>
                <h1 className='text-center'>{items.book.price}</h1>
              </div>
              <div className='w-[15%]'>
                <h1 className='font-semibold text-center'>
                  {items.status === "Out for Delivery" ? (
                    <div className='text-yellow-500'>{items.status}</div>
                  ) : items.status === "Cancelled" ? (
                    <div className='text-red-500'>{items.status}</div>
                  ) : (
                    <div className='text-green-500'>{items.status}</div>
                  )}
                </h1>
              </div>
              <div className='w-none md:w-[5%] hidden md:block'>
                <h1 className='text-sm text-zinc-400 text-center'>COD</h1>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default OrderHistory
