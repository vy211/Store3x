import React from 'react';
import calender from '../../assets/icon/calendar.png';
import '../../styles/style.css';
import '../../styles/bootstrap.min.css';
import blog1 from '../../assets/blog/blog-1.jpg';
import blog2 from '../../assets/blog/blog-2.jpg';
import blog3 from '../../assets/blog/blog-3.jpg';

const Latest = () => {
    return (
        <section className="latest spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-title">
                            <span>Latest News</span>
                            <h2>Fashion New Trends</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 col-md-6 col-sm-6">
                        <div className="blog__item">
                            <div className="blog__item__pic set-bg" style={{ backgroundImage: `url(${blog1})` }}></div>
                            <div className="blog__item__text">
                                <span><img src={calender} alt="" /> 05 March 2024</span>
                                <h5>What Curling Irons Are The Best Ones</h5>
                                <a href="#">Read More</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-6">
                        <div className="blog__item">
                            <div className="blog__item__pic set-bg" style={{ backgroundImage: `url(${blog2})` }}></div>
                            <div className="blog__item__text">
                                <span><img src={calender} alt="" /> 08 March 2024</span>
                                <h5>Eternity Bands Do Last Forever</h5>
                                <a href="#">Read More</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-6">
                        <div className="blog__item">
                            <div className="blog__item__pic set-bg" style={{ backgroundImage: `url(${blog3})` }}></div>
                            <div className="blog__item__text">
                                <span><img src={calender} alt="" /> 09 March 2020</span>
                                <h5>The Health Benefits Of Sunglasses</h5>
                                <a href="#">Read More</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Latest;
