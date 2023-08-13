import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductListing from './components/Pages/Home';
import ProductDetailPage from './components/Pages/Detail Page/Detail.js';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<ProductListing/>} />
        <Route path="/products/:name" element={<ProductDetailPage/>} />
      </Routes>
    </Router>
  );
};

export default App;
