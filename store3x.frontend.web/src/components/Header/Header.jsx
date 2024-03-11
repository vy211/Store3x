// Header.jsx

import React from 'react';
import logo from '../../assets/logo.png';
import search from '../../assets/icon/search.png';
import cart from '../../assets/icon/cart.png';
import heart from '../../assets/icon/heart.png';
import '../../styles/style.css';
import '../../styles/bootstrap.min.css';
import { Link } from 'react-router-dom';
import Login from '../../components/Login/LoginPage';



const Header = () => {
    return (
        <header className="header">
            
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-3">
                        <div className="header__logo">
                           <h3>Store3X</h3>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <nav className="header__menu mobile-menu">
                            <ul>
                                <li className="active"><Link>Home</Link></li>
                                <li><Link to="/product">Shop</Link></li>
                                <li><a href="#">Pages</a>
                                    <ul className="dropdown">
                                        <li><a href="./about.html">About Us</a></li>
                                        <li><a href="./shop-details.html">Shop Details</a></li>
                                        <li><a href="./shopping-cart.html">Shopping Cart</a></li>
                                        <li><a href="./checkout.html">Check Out</a></li>
                                        <li><a href="./blog-details.html">Blog Details</a></li>
                                    </ul>
                                </li>
                                <li><a href="./blog.html">Blog</a></li>
                                <li><a href="./contact.html">Contacts</a></li>
                            </ul>
                        </nav>
                    </div>
                    <div className="col-lg-3 col-md-3">
                        <div className="header__nav__option">
                            <a href="#" className="search-switch"><img src={search} alt="" /></a>
                            <a href="#"><img src={heart} alt="" /></a>
                            <a href="#"><img src={cart} alt="" /> <span>0</span></a>
                            <div className="price">₹0.00</div>
                           <a></a>
                            <Link  to="/login">Sign In</Link>

                        </div>

                        
                    </div>
                </div>
                <div className="canvas__open"><i className="fa fa-bars"></i></div>
                
            </div>
        </header>
    );
};

export default Header;
