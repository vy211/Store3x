import React from 'react';
import instagram1 from '../../assets/instagram/instagram-1.jpg';
import instagram2 from '../../assets/instagram/instagram-2.jpg';
import instagram3 from '../../assets/instagram/instagram-3.jpg';
import instagram4 from '../../assets/instagram/instagram-4.jpg';
import instagram5 from '../../assets/instagram/instagram-5.jpg';
import instagram6 from '../../assets/instagram/instagram-6.jpg';
import '../../styles/style.css';
import '../../styles/bootstrap.min.css';


const InstagramSection = () => {
    return (
        <section className="instagram spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="instagram__pic">
                            <div className="instagram__pic__item" style={{ backgroundImage: `url(${instagram1})` }}></div>
                            <div className="instagram__pic__item" style={{ backgroundImage: `url(${instagram2})` }}></div>
                            <div className="instagram__pic__item" style={{ backgroundImage: `url(${instagram3})` }}></div>
                            <div className="instagram__pic__item" style={{ backgroundImage: `url(${instagram4})` }}></div>
                            <div className="instagram__pic__item" style={{ backgroundImage: `url(${instagram5})` }}></div>
                            <div className="instagram__pic__item" style={{ backgroundImage: `url(${instagram6})` }}></div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="instagram__text">
                            <h2>Instagram</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            <h3>#Store3X</h3>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InstagramSection;
