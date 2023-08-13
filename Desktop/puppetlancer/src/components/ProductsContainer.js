import React, { useState, useEffect } from 'react';
import './Styles/ProductsContainer.css';
import productsData from '../mock-products.json';
import ProductCard from './Product';

const SelectionComponent = () => {
  const productsPerPage = 12; // Number of products to display per page
  const [currentPage, setCurrentPage] = useState(1);

  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(['All']);
  const [windowWidth, setWindowWidth] = useState(getWindowWidth());

  // Extract unique categories from the productsData array
  useEffect(() => {
    const categories = [...new Set(productsData.map((product) => product.category))];
    setUniqueCategories(['All', ...categories]);
  }, []);

  // Update window width state on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(getWindowWidth());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Function to get the current screen width
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
    : productsData.filter((product) => product.category === selectedCategories[0]);

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
        {currentProducts.map((product) => (
          <ProductCard
            id={product.id}
            name={product.name}
            image={product.image}
            hoverImage={product.hoverImage}
            price={product.prices[0].price}
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
