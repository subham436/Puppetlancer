import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './Styles/ProductsContainer.css';
import ProductCard from './tryproduct';

const SelectionComponent = () => {
  const productsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(['All']);
  const [windowWidth, setWindowWidth] = useState(getWindowWidth());
  const [productsData, setProductsData] = useState([]);
  // const [extractedData, setExtractedData] = useState([]);

  // const apiUrl = 'https://wm2t166o.api.sanity.io/v2021-10-21/data/query/production?query=*[_type==%22puppet%22]'
// const apiUrl = 'https://shorturl.at/nIS25';
const apiUrl = '/proxy'; // Replace with your proxy server URL
// const apiUrl = 'http://localhost:4000/proxy'; // Use the correct proxy server URL



  useEffect(() => {
    // let config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Access-Control-Allow-Origin": "*",
    //   },
    // };
    const fetchUrl = async()=>{
        try{
          const response = await fetch(apiUrl)
          // console.log(response)
          if(response.ok){
            const data = await response.json()
            // console.log(data.result)
            setProductsData(data.result);
    // //     // Extract and set data here
        // setExtractedData(data.result.map(product => ({
        //   title: product.title,
        //   price: product.price,
        // })));
          }
        }
        catch(error){
          console.log(error)
        }

    }
    fetchUrl()
    // axios.get(apiUrl,config)
    //   .then(response => {
    //     setProductsData(response.data);
    //     // Extract and set data here
    //     setExtractedData(response.data.result.map(product => ({
    //       title: product.title,
    //       price: product.price,
    //     })));
    //   })
    //   .catch(error => {
    //     console.error('Error fetching product data:', error);
    //   });
    

  }, []);

   // Extract unique categories from the productsData array
   useEffect(() => {
    const categories = [...new Set(productsData.map((product) => product.category.title))];
    setUniqueCategories(['All', ...categories]);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(getWindowWidth());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function getWindowWidth() {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  }

// Function to handle selection change
const handleSelectionChange = (event) => {
  setSelectedCategories([event.target.value]);
  setCurrentPage(1); // Reset to the first page when a category is changed

};

// Filter products based on selected category
const filteredProducts = selectedCategories[0] === 'All' 
  ? productsData
  : productsData.filter((product) => product.category.title === selectedCategories[0]);

// Calculate total number of pages
const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

// Get the current page's products
const currentProducts = filteredProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

// Function to handle Next button click
const handleNextPage = () => {
  setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
};

// Function to handle Previous button click
const handlePrevPage = () => {
  setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
};

// Determine whether to show radio buttons or dropdown based on the screen width
const isDesktopView = windowWidth >= 1100;

 

  return (
    <div className='product-section'>
      <div className="category-container">
      <strong>Category</strong>
        {isDesktopView ? (
          <div>
            {uniqueCategories.map((category) => (
              <label key={category}>
                <input
                  type="radio"
                  value={category}
                  checked={selectedCategories[0] === category}
                  onChange={handleSelectionChange}
                />
                <span className="radio-custom"></span>
                {category}
              </label>
            ))}
          </div>
        ) : (
          <select value={selectedCategories[0]} onChange={handleSelectionChange}>
            {/* <option value="All">All</option> */}
            {uniqueCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        )}
      </div>
      <div className="product-container">
        {productsData.map((product) => (
          <ProductCard
            
            key={product.title}
            product={product}
            // id={product.title}
            // name={product.title}
            // price={product.price}
            // image={product.thumbnail}
            // hoverImage={product.hover_thumbnail}
          />
        ))}
        {/* Pagination */}
        <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectionComponent;