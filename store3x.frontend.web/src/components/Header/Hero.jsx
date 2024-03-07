import React from 'react';
import Hero1 from '../../assets/hero/hero-1.jpg';
import Hero2 from '../../assets/hero/hero-2.jpg';
import '../../styles/style.css';



const heroItems = [
    {
        backgroundImage: Hero1,
        title: 'Fall - Winter Collections 2030',
        description: 'A specialist label creating luxury essentials. Ethically crafted with an unwavering commitment to exceptional quality.',
        buttonText: 'Shop now',
        socialIcons: ['fa-facebook', 'fa-twitter', 'fa-pinterest', 'fa-instagram'],
    },
    {
        backgroundImage: Hero2,
        title: 'Fall - Winter Collections 2031',
        description: 'Another collection description here.',
        buttonText: 'Explore now',
        socialIcons: ['fa-facebook', 'fa-twitter', 'fa-pinterest', 'fa-instagram'],
    },
    // Add more hero items as needed
];

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero__slider owl-carousel">
                {heroItems.map((item, index) => (
                    <div key={index} className="hero__items set-bg" style={{ backgroundImage: `url(${item.backgroundImage})` }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-5 col-lg-7 col-md-8">
                                    <div className="hero__text">
                                        <h6>Summer Collection</h6>
                                        <h2>{item.title}</h2>
                                        <p>{item.description}</p>
                                        <a href="#" className="primary-btn">{item.buttonText} <span className="arrow_right"></span></a>
                                        <div className="hero__social">
                                            {item.socialIcons.map((icon, iconIndex) => (
                                                <a key={iconIndex} href="#"><i className={`fa ${icon}`}></i></a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Hero;