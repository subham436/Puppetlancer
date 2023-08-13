import React from "react";
import Navbar from "../../Navbar";
import ProductDetail from "./ProductDetail";
import Footer from "../../Footer";
import FullScreenPage from "./FullScreenRazorpay";

function Detail() {
  
  return (
    <div>
       <Navbar />
       <ProductDetail />
       <Footer />
       {/* <FullScreenPage/> */}

       
    </div>
    
  );
}

export default Detail;