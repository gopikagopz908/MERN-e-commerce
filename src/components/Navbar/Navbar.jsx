import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoCartOutline } from "react-icons/io5";
import { userContext } from '../../context/useContext';
import { FaHeart } from 'react-icons/fa';
import Wishlist from '../../pages/modal/WishList';
import { useAuth } from '../../context/AuthContext';
import axiosInstance from '../../Api/axiosInstance';

function Navbar() {
  const { cart = [], isLogged } = useContext(userContext);
  const [showWishlist, setShowWishlist] = useState(false);
  const navigate=useNavigate()
  const toggleWishlist = () => setShowWishlist(!showWishlist);
  const {role,setRole}=useAuth();
  const logout=()=>{
    setRole("");
    localStorage.removeItem("role")
    axiosInstance.post('/user/logout')
    removeCookie("accessToken")
    removeCookie("refreshToken")
    navigate('/login');

}
const removeCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};


  return (
    <nav className="navbar navbar-expand-md bg-light">
      <div className="container-fluid">
        <a className="navbar-brand fs-1 fw-bold  "href="#" >ShoeZone</a>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="offcanvas" 
          data-bs-target="#offcanvasNavbar" 
          aria-controls="offcanvasNavbar" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-center flex-grow-1 pe-3">
              <li className="nav-item">
                <Link className="nav-link active fs-5 text-dark" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active fs-5 text-dark" to="/orders">Orders</Link>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle fs-5 text-dark" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Brand</a>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/Nike">Nike</Link></li>
                  <li><Link className="dropdown-item" to="/Adidas">Adidas</Link></li>
                  <li><Link className="dropdown-item" to="/Puma">Puma</Link></li>
                </ul>
              </li>
            </ul>
            <div>
              <span className='badge bg-primary rounded-circle'>{cart?.length}</span>
              <Link to="/cart"><IoCartOutline style={{ fontSize: '30px', marginRight: '80px' }} /></Link>
              <FaHeart 
                size={20} 
                color='red' 
                style={{ fontSize: '30px', marginRight: '80px', cursor: 'pointer' }} 
                onClick={toggleWishlist} 
              />
              {!role ?
              <button onClick={() => localStorage.clear('id')} className="btn btn-outline-dark rounded-pill">
                <Link className="text-dark text-decoration-none" to="/login">{isLogged ? 'Logout' : 'Login'}</Link>
              </button>:
              <button onClick={logout} className="btn btn-outline-dark rounded-pill">
                Logout
              </button>
              }
            </div>
          </div>
        </div>
      </div>

      <Wishlist show={showWishlist} onClose={toggleWishlist} />
    </nav>
  );
}

export default Navbar;
