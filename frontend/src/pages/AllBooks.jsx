import React, { useEffect, useState } from 'react';
import Spinner from '../components/Loader/Spinner';
import BookCard from '../components/Cards/BookCard';
import axios from 'axios';

const AllBooks = () => {
  const [data, setData] = useState();
    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get("http://localhost:1000/api/auth/get-all-books");
            setData(response.data.data);
        };
        fetch();
    }, []);
  return (
    <div className='bg-zinc-900 h-auto px-12 py-8'>
      {" "}
      <h4 className='text-3xl text-yellow-100'>All Books</h4>
      {!data && <div className='w-full h-screen flex items-center justify-center'><Spinner/>{" "}</div>}
      <div className='my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8'>
        {data && data.map((items,i) => <div key={i}><BookCard data={items} />{" "}</div>)}
      </div>
    </div>
  )
}

export default AllBooks
