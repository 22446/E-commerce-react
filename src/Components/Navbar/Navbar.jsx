import React, { useContext } from "react";
import {Link,NavLink, useNavigate} from 'react-router-dom'
import logo from "../../assets/images/freshcart-logo.svg";

import { AddtoCartContext } from "../../Contexts/AddtoCardContext";
import { wishtListContext } from "../../Contexts/AddTowishListcontext";
import { authcontext } from "../../Contexts/AuthContext";
export default function Navbar() {
  const res= useContext(wishtListContext)
  
  const {token,settoken}=useContext(authcontext)


 const navigate=useNavigate()
   const{data}= useContext(AddtoCartContext)
  function handleLogout(){
    localStorage.removeItem('userToken')
    settoken(null)
    navigate('/login')

  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary position-fixed  z-3 w-100">
      <div className="container-fluid">
        <a className="navbar-brand d-flex nowrap align-items-center">
          <div>
            <Link to='/'>
            <img src={logo} alt="" />
            </Link>
          </div>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarNav"
        >
       {token?<> <ul className="navbar-nav pe-lg-2">
            <li className="nav-item">
              <NavLink to={"/"} className="nav-link">
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to={"/products"} className="nav-link">
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={"/categories"} className="nav-link">
                Categories
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={"/brands"} className="nav-link">
                Brands
              </NavLink>
            </li>
            
          </ul>
          <ul className="navbar-nav gap-1  align-items-center">
            <li className="nav-item ">
              <a className="nav-link position-relative">
              <Link to={'/cart'}><i className="fa-solid fa-cart-shopping text-success fs-4">
                <span className="position-absolute bottom-0 h6">{data?.data.numOfCartItems}</span>
                </i>
                  </Link>
              </a>
            </li>
            <li className="nav-item ">
              <a className="nav-link position-relative">
              <Link to={'/wishlist'}>
              <li class="fa-regular fa-heart text-success fs-4">
                <span className="position-absolute bottom-0 h6">{res?.data?.data.count}</span>
                </li>
                  </Link>
              </a>
            </li>
           <li className="nav-item">
              <span onClick={handleLogout} role="button" className="nav-link cursor-pointer">
                LogOut
              </span>
            </li> 
           
            
            
          </ul></>:<ul className="navbar-nav gap-1 ms-auto align-items-center" ><li className="nav-item">
              <NavLink to={"/register"} className="nav-link cursor-pointer">
                Rgister
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={"/login"} className="nav-link cursor-pointer">
                Login
              </NavLink>
            </li></ul>}
        </div>
      </div>
    </nav>
  );
}
