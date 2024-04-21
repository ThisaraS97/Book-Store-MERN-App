import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState(new Date());
  const [publisher, setPublisher] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [pdfVersion, setPdf] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleDocChange = (e) => {
    setPdf(e.target.files[0]);
  };

  const handleSaveBook = () => {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('title', title);
    formData.append('author', author);
    formData.append('publishYear', publishYear);
    formData.append('publisher', publisher);
    formData.append('pdfVersion', pdfVersion);

    setLoading(true);
    axios
      .post('http://localhost:3000/book', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        setLoading(false);
        navigate('/');
        alert('Book created successfully');
      })
      .catch((error) => {
        setLoading(false);
        alert('An error happened. Please check console');
        console.log(error);
      });
  };

  // Function to handle downloading the PDF file
  const handleDownloadPDF = () => {
    // Create a temporary URL for the PDF file
    const url = URL.createObjectURL(pdfVersion);
    // Create a link element
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'book.pdf'); // Set the filename for the downloaded file
    // Append the link to the document body
    document.body.appendChild(link);
    // Trigger the click event on the link
    link.click();
    // Remove the link from the document body
    document.body.removeChild(link);
  };

  return (
    <div>
      <h1 className='text-3xl my-4'>Create Book</h1>
      {loading ? <Spinner /> : ''}
      <input
        type='text'
        placeholder='Title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className='border border-gray-400 p-2 my-2'
      />
      <input
        type='text'
        placeholder='Author'
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className='border border-gray-400 p-2 my-2'
      />
      <DatePicker
        selected={publishYear}
        onChange={(date) => setPublishYear(date)}
        className='border border-gray-400 p-2 my-2'
        showYearDropdown
        scrollableYearDropdown
        yearDropdownItemNumber={15}
        showMonthDropdown
      />
      <input
        type='text'
        placeholder='Publisher'
        value={publisher}
        onChange={(e) => setPublisher(e.target.value)}
        className='border border-gray-400 p-2 my-2'
      />
      <input
        type='file'
        accept='image/*'
        onChange={handleImageChange}
        className='border border-gray-400 p-2 my-2'
      />
      <input
        type='file'
        accept='application/pdf'
        onChange={handleDocChange}
        className='border border-gray-400 p-2 my-2'
      />
      <button onClick={handleSaveBook} className='bg-blue-500 text-white p-2 rounded'>
        Save
      </button>
      <button onClick={handleDownloadPDF} className='bg-blue-500 text-white p-2 rounded ml-2'>
        Download PDF
      </button>
      <BackButton destination='/' />
    </div>
  );
};

export default CreateBook;
