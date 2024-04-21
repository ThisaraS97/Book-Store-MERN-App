import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookItem from './BookItem'; // Assuming you have a BookItem component to render individual book items
import Cart from './Cart'; // Assuming you have a Cart component to render the cart

const POSPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:3000/book') // Assuming this is the endpoint to fetch all books
      .then(response => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching books:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <BackButton destination="/" />
      <h1>Point of Sale (POS)</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>All Books</h2>
          <div className="book-list">
            {books.map(book => (
              <BookItem key={book.id} book={book} />
            ))}
          </div>
          <Cart />
          {/* Other POS system components such as buttons, inputs, etc. */}
        </div>
      )}
    </div>
  );
};

export default POSPage;
