import React from 'react';
import { loadScript } from './Utils'; // You can create a utility function to load scripts

const RazorpayPayment = ({ selectedPrice , selectedFile}) => {
  console.log(selectedPrice);
  const handleBuyNow = async () => {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
    if (!res) {
      alert('Razorpay SDK failed to load. Please try again later.');
      return;
    }
    const amountInCents = Math.round(selectedPrice * 100);
    // Replace with your actual Razorpay API key
    const razorpayKey = 'rzp_test_FrjH0NOX2dgVHq';

    const options = {
      key: razorpayKey,
      amount: amountInCents, //selectedPrice.price * 100, // Amount in smallest currency unit (e.g., for 500 INR, use 50000)
      currency: 'INR',
      name: 'PUPPETLANCER',
      description: 'Download File',
      image: '/images/65px.png', // URL to your company logo
      handler: function (response) {
        if (response.razorpay_payment_id) {
          // Payment successful, provide a link to download the file
          console.log("Payment Succesfull");
          window.location.href = selectedFile;
        } else {
          // Payment failed or cancelled
          alert('Payment failed or cancelled.');
        }
      },
      // Open in full-screen mode
      fullscreen: true,
    
    };
   

    const paymentObject = new window.Razorpay(options);

    paymentObject.open();
  };

  return (
    <button className='buybtn' onClick={handleBuyNow}>Buy Now</button>
  );
};

export default RazorpayPayment;
