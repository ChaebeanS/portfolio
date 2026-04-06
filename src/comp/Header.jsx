import React, { useEffect, useState } from 'react'; 
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const [isHovered, setIsHovered] = useState(false);
  const [isShow, setShow] = useState(false);

  const location = useLocation(); 

  useEffect(() => {
    setIsHovered(false);
    
    const handleScroll = () => {
      if(location.pathname === '/') {
        if(window.scrollY > 200){setShow(true);} 
        else{setShow(false);} } 
      else{setShow(true);}
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return() => {window.removeEventListener('scroll', handleScroll);};
    
  }, [location.pathname]);

  return (
    <article className='header'>
      { isShow &&
      <div className="menu"
          onMouseEnter={() => setIsHovered(true)} 
          onMouseLeave={() => setIsHovered(false)}
        >
        <img src="./imgs/main/bean.svg" alt="bean" />

        
        <ul className={`nav ${isHovered ? "active" : ""}`}>
          <li><Link to="/">Main</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/package">Package</Link></li>
          <li><Link to="/web">Web</Link></li>
          <li><Link to="/etc">etc</Link></li>
          <li><Link to="/ui">UI/UX</Link></li>
        </ul>

      </div>
      }
    </article>
  )
}

export default Header