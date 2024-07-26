import axios from 'axios';
import React, { useEffect, useState } from 'react'
import BookCard from '../Cards/BookCard';

const Favourites = () => {
    const [favourites, setFavourites] =  useState();
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    useEffect(() => {
        const fetch = async() => {
            const response = await axios.get("http://localhost:1000/api/user/get-favourite-books", {headers});
            setFavourites(response.data.data);
        }
        fetch();
    }, [favourites]);
  return (
    <>
      {favourites && favourites.length === 0 && (
        <div className='text-5xl font-semibold h-[80vh] text-zinc-500 flex flex-col items-center justify-center w-full text-center'>
            No Items to Show
            <img src="./star.png" alt="AddToFavourite" className='h-[12vh] my-8'/>
        </div>
       )}
      <div className='grid grid-cols-4 gap-4'>
      {favourites && favourites.map((items, i) => (
        <div key={i}>
          <BookCard data={items} favourite={true}/>
        </div>
       ))}
    </div>
    </>
  )
}

export default Favourites
