import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const UpdateBook = () => {
    const [Data, setData] = useState({
        url: "",
        title: "",
        author: "",
        price: "",
        desc: "",
        language: ""
      });
      const { id } = useParams();
      const navigate = useNavigate();
      const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: id,
      };

      useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(`http://localhost:1000/api/auth/get-book-by-id/${id}`);
            setData(response.data.data);
        };
        fetch();
    }, []);
    
    const change = (e) => {
        const {name, value} = e.target;
        setData({...Data, [name]: value});
    }
    
    const handleUpdate = async () => {
        try {
          if (
            Data.url === "" || 
            Data.title === "" || 
            Data.author === "" || 
            Data.price === "" || 
            Data.desc === "" || 
            Data.language === ""
          ) {
            alert("All fields are required");
          } else{
            const response = await axios.put("http://localhost:1000/api/admin/update-book", Data, {headers});
            alert(response.data.message);
            navigate(`/view-book-details/${id}`);
          }
        } catch (error) {
          alert(error.response.data.message);
        }
      }
  return (
    <div className='bg-zinc-900 h-[100%] p-0 md:p-4'>
      <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8 text-center'>
        Update Book
      </h1>
      <div className='p-4 bg-zinc-800 rounded'>
        <div>
          <label htmlFor="" className='text-zinc-400'>
            Image
          </label>
          <input type="text"  className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' placeholder='Url of Image' name='url' required value={Data.url} onChange={change}/>
        </div>
        <div className='mt-4'>
          <label htmlFor="" className='text-zinc-400'>
            Title of Book
          </label>
          <input type="text" className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' placeholder='Title of Book' name='title' required value={Data.title} onChange={change}/>
        </div>
        <div className='mt-4'>
          <label htmlFor="" className='text-zinc-400'>
            Author of Book
          </label>
          <input type="text" className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' placeholder='Author of Book' name='author' required value={Data.author} onChange={change}/>
        </div>
        <div className='mt-4 flex gap-4'>
          <div className='w-3/6'>
            <label htmlFor="" className='text-zinc-400'>
              Language
            </label>
            <input type="text" className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' placeholder='Language of Book' name='language' required value={Data.language} onChange={change}/>
          </div>
          <div className='w-3/6'>
            <label htmlFor="" className='text-zinc-400'>
              Price
            </label>
            <input type="number" className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' placeholder='Price of Book' name='price' required value={Data.price} onChange={change}/>
          </div>
        </div>
        <div className='mt-4'>
          <label htmlFor="" className='text-zinc-400'>
            Description of Book
          </label>
          <textarea className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' rows="5" placeholder='Description of Book' name='desc' required value={Data.desc} onChange={change}/>
        </div>

        <button className='mt-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300 w-full' onClick={handleUpdate}>
          Update Book
        </button>
      </div>
    </div>
  )
}

export default UpdateBook
