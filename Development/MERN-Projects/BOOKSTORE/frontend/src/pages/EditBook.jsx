import React, { useEffect, useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState(new Date());
  const [publisher, setPublisher] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/book/${id}`)
      .then(response => {
        setTitle(response.data.data.title);
        setAuthor(response.data.data.author);
        setPublishYear(new Date(response.data.data.publishYear));
        setPublisher(response.data.data.publisher);
        setImage(response.data.data.image); // Set the image URL
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear: publishYear.getFullYear(),
      publisher
    };
    setLoading(true);
    axios
      .put(`http://localhost:3000/book/${id}`, data)
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
      <h1 className='text-3xl my-4'>
        Edit Book
      </h1>

      <input
        type='text'
        placeholder='Title'
        value={title}
        onChange={e => setTitle(e.target.value)}
        className='border border-gray-400 p-2 my-2' />
      <input
        type='text'
        placeholder='Author'
        value={author}
        onChange={e => setAuthor(e.target.value)}
        className='border border-gray-400 p-2 my-2' />
      <DatePicker
        selected={publishYear}
        onChange={date => setPublishYear(date)}
        className='border border-gray-400 p-2 my-2'
        showYearDropdown
        scrollableYearDropdown
        yearDropdownItemNumber={30}
        showMonthDropdown />
      <input
        type='text'
        placeholder='Publisher'
        value={publisher}
        onChange={e => setPublisher(e.target.value)}
        className='border border-gray-400 p-2 my-2' />
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <button onClick={handleEditBook} className='bg-blue-500 text-white p-2 rounded'> Save </button>
        </div>
      )}
    </div>
  )
}

export default EditBook;
