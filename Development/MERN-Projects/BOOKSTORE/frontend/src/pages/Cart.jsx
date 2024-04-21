import React, { useState } from 'react';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Book 1', price: 10, quantity: 1 },
    { id: 2, name: 'Book 2', price: 15, quantity: 2 },
    // Add more items as needed
  ]);

  // Function to remove an item from the cart
  const removeFromCart = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  // Function to calculate the total price of all items in the cart
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div>
      <h1>Cart</h1>
      <div>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul>
            {cartItems.map(item => (
              <li key={item.id}>
                <span>{item.name}</span>
                <span>Quantity: {item.quantity}</span>
                <span>Price: ${item.price}</span>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {cartItems.length > 0 && (
        <div>
          <h2>Total Price: ${calculateTotalPrice()}</h2>
          {/* Other functionalities such as checkout button, etc. */}
        </div>
      )}
    </div>
  );
};

export default CartPage;
