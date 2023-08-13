import React, {useRef} from "react";
import Navbar from "../Navbar";
import ProductsContainer from "../Try";
import Footer from "../Footer";
import '../Styles/Home.css'

function Home() {
  const productContainerRef = useRef(null);

  const handleExploreClick = () => {
    // Scroll to the ProductContainer component
    productContainerRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
       <Navbar />
       <div className="container">
        
        <div className="container2">
            <img src="images/cat.gif" alt="GIF" className="gif" />
        </div>
        <div className="container1">
            <p className="big">Discover the World of<br/> Character Puppets</p>
            <p className="small">Discover the world of Character puppets</p>
            <button onClick={handleExploreClick} className="explore-btn">EXPLORE MARKETPLACE</button>
            <a href="https://kitchen.co/"><button className="custom">CUSTOM WORK</button></a>
        </div>

      </div>
      <div ref={productContainerRef}>
        <ProductsContainer />
      </div>
      <Footer />
    </div>
    
  );
}

export default Home;