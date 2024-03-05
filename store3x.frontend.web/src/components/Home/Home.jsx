// Home.jsx

import React from 'react';
// Make sure the path is correct
import Hero from '../Header/Hero';
import Banner from '../Header/Banner';
import Product from '../Product/Product';
import Instagram from '../Header/Instagram';
import Header from '../Header/Header';


import Latest from '../Header/Latest';
import Footer from '../Header/Footer';

const Home = () => {
    return (
        <div>
           
            <Header />
                    <Hero />


            <Banner />
            <Product />
            <Instagram />
            <Latest/>
            <Footer/>
        
            
            {/* Add more sections or components for your home content */}
        </div>
    );
};

export default Home;
