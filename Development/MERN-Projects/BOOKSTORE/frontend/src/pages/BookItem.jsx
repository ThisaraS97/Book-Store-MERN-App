import React from 'react';

const BookItem = ({ book }) => {
  return (
    <div className="book-item">
      <h2>{book.title}</h2>
      <p>Author: {book.author}</p>
      <p>Publish Year: {book.publishYear}</p>
      <p>Price: ${book.price}</p>
      <p>Description: {book.description}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default BookItem;
