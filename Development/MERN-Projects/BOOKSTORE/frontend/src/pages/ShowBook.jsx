import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Import axios for making API requests
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton'; // Assuming you have a BackButton component
import PrintHeader from '../components/PrintHeader';

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:3000/book/${id}`)
      .then(response => {
        setBook(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  }, [id]); // Add id as dependency to fetch data when id changes

  const handlePrint = () => {
    window.print(); // Trigger the browser's print functionality
  };
  return (
    <div className='p-4'>
      <PrintHeader />
      <BackButton destination="/" />
      <h1 className='text-3xl my-4'>Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>ID</span> {book._id}
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Title</span> {book.title}
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Author</span> {book.author}
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Publish Year</span> {book.publishYear}
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Image</span> 
            {book.image && book.image.data && book.image.contentType && (
              <img src={`data:${book.image.contentType};base64,${book.image.data}`} alt="Book" />
            )}
          </div>
          <button onClick={handlePrint} className='bg-green-500 text-white p-2 rounded-md my-2'>
            Print
          </button>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
