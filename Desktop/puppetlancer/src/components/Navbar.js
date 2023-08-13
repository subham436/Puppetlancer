// import './style/nav.css'
import { useState } from "react"
import "./Styles/Navbar.css";
// import ReactLogo from '../logofinal.svg';
// import ReactLogo from '';
export default function Navbar() {
  const [isNavExpanded, setIsNavExpanded] = useState(false)

  const handleCustomWorkClick = () => {
    window.location.href = "https://kitchen.co/";
  };

  return (
    <nav className="navigation">
      <a href="/" className="brand-name">
        {/* <strong>PUPPETLANCER</strong> */}
        <img src="/images/65px.png" alt="React Logo" />
        {/* <ReactLogo/> */}
      </a>
      <button
        className="hamburger"
        onClick={() => {
          setIsNavExpanded(!isNavExpanded)
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="white"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        className={
          isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
        }
      >
        <ul>
          <li>
            <a href="/home">Character Animator Puppets</a>
          </li>
          <li>
            <a href="/about">Explainer Video</a>
          </li>
          <li>
            <a href="/services">Services</a>
          </li>
          <li>
            <button className="custom-btn" onClick={handleCustomWorkClick}>CUSTOM WORK</button> 
          </li>
        </ul>
      </div>
    </nav>
  );
}