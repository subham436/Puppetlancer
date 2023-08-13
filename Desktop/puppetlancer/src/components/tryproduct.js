import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Styles/Product.css';

const ProductCard = ({  product }) => {
  const [isHovered, setIsHovered] = useState(false);
  

  return (
    <Link to={`/products/${product.title}`}>
        <div className='product-card'>
          {/* Use backticks (`) to interpolate the id variable */}
          
          <div className='combine-logo-img'>
            <div className='product-logos'>
                <img src='/images/character.png' alt='' />
                <img src='/images/illustrator.png' alt='' />
                {/* Add more logos here */}
            </div>
            <div
              className='main-image'
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <img src={isHovered ? (product.hover_thumbnail == null ? product.thumbnail : product.hover_thumbnail) : product.thumbnail} alt={product.title} />
            </div>
          </div>
          <div className='bottom-info'>              
              <div className='bottom-info-1'>
                <div className='product-info'>
                  <div className='product-name-price'>
                    <p className='product-name'>{product.title}</p>
                    <div className='product-price'>
                      <p>${product.price}</p>
                    </div>
                  </div>
                    {/* Includes<br /> */}
                    <div className='product-bundle'>
                      <img src='/images/character.png' alt='' />
                      Character Animator Bundle
                    </div>
                    <div className='product-bundle'>
                      <img src='/images/illustrator.png' alt='' />
                      Illustrator Bundle
                    </div>
                    {/* Add more bundles here */}
                </div>
                
              </div>
          </div>
          
        </div>
    </Link>
  );
};

export default ProductCard;
