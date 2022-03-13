import React from 'react';
import { Link } from 'react-router-dom';
import ExploreBoxImage from '../images/explore-box-img.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

function ExpoloreSection() {
    return (
        <section className="explore-section">
            <div className="container-fluid wrapper1">
                <div className="col-12 ">
                    <div className="explore-box">
                        <Link href="#" className="close-icon">
                            <FontAwesomeIcon icon={faWindowClose} />
                        </Link>
                        <div className="explore-box_img">
                            <img src={ExploreBoxImage} alt="explore" />
                        </div>

                        <div className="explore-box_txt">
                            <h2 className="fs30 f-omnesMedium">
                                Explore pre-orders
                            </h2>
                            <p className="fs21 lh-14 mb-4">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt. Lorem ipsum dolor sit amet,
                                consectetur adipiscing elit, sed do eiusmod
                                tempor incididunt.{' '}
                            </p>
                            <p className="fs21 lh-14 mb-0">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit
                            </p>
                        </div>
                    </div>
                    <div className="text-center">
                        <h2 className="fs70 f-omnesMedium mb-4">
                            You have no-preorders
                        </h2>
                        <Link href="#" className="btn buy-btn">
                            Buy Now
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ExpoloreSection;
