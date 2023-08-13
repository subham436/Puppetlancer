import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetail.css';
// import mockProducts from '../../../mock-products.json';
import RazorpayPayment from './RazorpayPayment';

const ProductDetailPage = () => {
  const { name } = useParams();
  // console.log(name);
  const history = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [productsData, setProductsData] = useState([]);


  // useEffect(() => {
  //   const selectedProduct = mockProducts.find((product) => product.name === name);

  //   if (selectedProduct) {
  //     setProduct(selectedProduct);
  //     setSelectedPrice(selectedProduct.prices[0]); // Initialize the selectedPrice to the first price
  //   } else {
  //     console.error(`Product with ID ${name} not found.`);
  //   }
  // }, [name]);

  const apiUrl = 'https://wm2t166o.api.sanity.io/v2021-10-21/data/query/production?query=*[_type=="puppet"] {title, description, preview, price, illlustrator_price, downloads, "illustrator_thumbnail":illustrator_thumbnail.asset->url, "hover_thumbnail":hover_thumbnail.asset->url, "illustrator_file":illustrator_file.asset->url, "character_animator_file":character_animator_file.asset->url, "about_puppet_thumbnail":about_puppet_thumbnail.asset->url, "thumbnail": thumbnail.asset->url, category->{title,"category_icon": category_logo.asset->url}, tags[]->{tags,"tag_icon": tag_logo.asset->url}}';
  useEffect(() => {
    const fetchUrl = async () => {
      try {
        const response = await fetch('/proxy');
        if (response.ok) {
          const data = await response.json();
          setProductsData(data.result);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUrl();
  }, []);

  useEffect(() => {
    const selectedProduct = productsData.find((product) => product.title === name);

    if (selectedProduct) {
      setProduct(selectedProduct);
      setSelectedPrice(selectedProduct.price);
      setSelectedFile(selectedProduct.character_animator_file)
      // console.log(selectedPrice);
    } else {
      console.error(`Product with title "${name}" not found.`);
    }
  }, [name, productsData]);

  // console.log(productsData);

  useEffect(() => {
   
  }, [name]);


  // const handleBuyNow = () => {
  //   history.push('/payment');
  // };

  const handlePriceChange = (price, File) => {
    setSelectedPrice(price);
    setSelectedFile(File);
    // console.log(selectedPrice);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <section>
    <div className='detail-container'>
      <div className='image-container'>
        <img src={selectedPrice === product.price ? product.thumbnail : product.illustrator_thumbnail} alt={product.title} />
      </div>
      <div className='detail-content'>
        <div className='product_head'>
          <h1>{product.title} Character Animator Puppet</h1>
          <p>Character Animator Puppets</p>
        </div>
        <div className='price-container'>
          <label key="character">
            <input
              type='radio'
              name='price'
              value='character'
              checked={selectedPrice === product.price}
              onChange={() => handlePriceChange(product.price, product.character_animator_file)}
            />
            <span className="radio-custom"></span>
            <strong>${product.price }</strong> for Character Animator Bundle
          </label>
          <label key='illustrator'>
            <input
              type='radio'
              name='price'
              value='illustrator'
              checked={selectedPrice === product.illlustrator_price}
              onChange={() => handlePriceChange(product.illlustrator_price,product.illustrator_file)}
            />
            <span className="radio-custom"></span>
            <strong>${product.illlustrator_price }</strong>  for Illustrator Bundle
          </label>
        </div>
        <div className='btncontain'>
          <RazorpayPayment selectedPrice={selectedPrice} selectedFile={selectedFile} />
          <a href='https://kitchen.co/'><button className='customised'>Get This Puppet Customized</button></a>
        </div>
        <div className='product__foot'>
          <p>Includes our <a href='https://github.com'>Standard License.</a></p>
          <p>Add an <a href='https://github.com'>extended license.</a></p>
        </div>
      </div>
    </div>
    </section>
    <section>
      <div className='about-section'>
        <div className='about-and-image'>
            <div className='about-image'>
              <img src={product.about_puppet_thumbnail}></img>
            </div>
            <div className='head-and-about'>
                <h2>About This Puppet</h2> 
                <p>{product.description}</p>               
            </div>
            
        </div>
      </div>
      <div className='puppet-features'>
        <div className='section-body'>
          <ul className='list-puppet-features'>
            <li>
              <figure>
                {/* <img src='/images/ico-expression-tracking.svg'></img> */}
                <i className='ico-expresssion-tracking'><img src='/images/ico-expression-tracking.svg'></img></i>
              </figure>
              <h5>Expression Tracking</h5>
              <p>By using your cam, the puppet detects and follows your eyes, brows, and mouth.</p>
            </li>
            <li>
              <figure>
                {/* <img src='/images/ico-expression-tracking.svg'></img> */}
                <i className='ico-expresssion-tracking'><img src='/images/ico-lipsyncing.svg'></img></i>
              </figure>
              <h5>Lipsyncing</h5>
              <p>By using your mic, the puppet follows your voice and recreates talking.</p>
            </li>
            <li>
              <figure>
                {/* <img src='/images/ico-expression-tracking.svg'></img> */}
                <i className='ico-expresssion-tracking'><img src='/images/ico-gestures-control.svg'></img></i>
              </figure>
              <h5>Gestures Control</h5>
              <p>Use the mouse to manage arm movements, and your cam for head movements.</p>
            </li>
            <li>
              <figure>
                {/* <img src='/images/ico-expression-tracking.svg'></img> */}
                <i className='ico-expresssion-tracking'><img src='/images/ico-facial-expressions.svg'></img></i>
              </figure>
              <h5>Facial Expressions</h5>
              <p>Use your cam and triggers to make the puppet surprised, happy, angry, or sad.</p>
            </li>
            <li>
              <figure>
                {/* <img src='/images/ico-expression-tracking.svg'></img> */}
                <i className='ico-expresssion-tracking'><img src='/images/ico-hand-triggers.svg'></img></i>
              </figure>
              <h5>Hand Triggers</h5>
              <p>By using basic hand triggers, the puppet can point, give a thumb up, and wave.</p>
            </li>
          </ul>
          <div className='section-foot'>
            <h5>Need more complex features or animations? We can help.</h5>
            <a href='https://kitchen.co/'><button>Find Out More</button></a>
          </div>
        </div>
      </div>
    </section>
    <section className='product-action'>
      <div className='shell'>
         <h2>Download Now</h2>
         <p>Purchase this Character Animator Puppet on its own or get a credit plan in case you are planning to <br/>buy more than one graphic resource from GraphicMama.</p>
         <button className='checkbtn'>Charcter Animator Bundle for ${product.price}</button>
         <button className='checkbtn'>Illustrator Bundle for ${product.illlustrator_price}</button>
      </div>
    </section>
    </div>
  );
};

export default ProductDetailPage;
