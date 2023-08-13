// FullScreenPage.js

import React from 'react';
import RazorpayPayment from './RazorpayPayment';
import './FullScreenRazorpay.css';

const FullScreenPage = () => {
  return (
    <div className="full-screen-container">
      <RazorpayPayment />
    </div>
  );
};

export default FullScreenPage;
