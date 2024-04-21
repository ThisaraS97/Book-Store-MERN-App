import React from 'react';

const PrintHeader = () => {
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();

  return (
    <div className="print-header">
      <h2>TSD Book Store</h2>
      <p>Date: {currentDate}</p>
      <p>Time: {currentTime}</p>
      <p>Company Address</p>
    </div>
  );
};

export default PrintHeader;
