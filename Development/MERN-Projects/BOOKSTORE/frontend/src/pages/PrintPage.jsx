import React from 'react';
import PrintHeader from '../components/PrintHeader';

const PrintPage = ({ book }) => {
  return (
    <div className="print-page">
      <PrintHeader />
      <div className="book-details">
        <h1>{book.title}</h1>
        <p>Author: {book.author}</p>
        <p>Publish Year: {book.publishYear}</p>
        {/* Add more details about the book as needed */}
      </div>
    </div>
  );
};

export default PrintPage;
