import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';  
import { useNavigate, useParams } from 'react-router-dom';

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:3000/book/${id}`)
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch(error => {
        setLoading(false);
        alert("An error happened. Please check console");
        console.log(error);
      });
  }

  return (
    <div>
      <BackButton destination="/" />
         Delete Book
      {loading ? <Spinner /> : <p>Deleting book...</p>}
      <div>Are you Sure</div>
      <button
        onClick={handleDeleteBook}
        className='bg-red-500 text-white p-2 rounded-md my-2'>
        Delete Book
      </button>
    </div>
  );
}

export default DeleteBook;
