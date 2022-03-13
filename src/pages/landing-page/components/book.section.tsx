import React from 'react';

import Book3 from 'assets/images/landing/book-3.png';
import Book4 from 'assets/images/landing/book-4.png';
import { Link } from 'react-router-dom';
import { userInfo } from 'os';
import { ALL_URL } from 'utils/urls';
import { Fade } from 'react-awesome-reveal';

const BookSection = () => {
    const url = window.location.pathname.includes(ALL_URL.PUBLISHER);

    return (
        <section className="book-section">
            <div className="container-fluid wrapper1">
                <div className="row mb-60">
                    <div className="col-12">
                        <h2 className="book-section_title">Books & Prints </h2>
                        <p className="book-section_txt">
                            Created by Publishers. Available in our store.{' '}
                        </p>
                    </div>
                    <div className="col-lg-6 col-12 mb-lg-0 mb-4">
                        <Fade direction="left">
                            <div className="book-box trans  m-auto">
                                <div
                                    className="img-box w-100 h-100"
                                    style={{
                                        backgroundImage: `url(${Book3})`
                                    }}>
                                    <div className="price-box ">
                                        <ul className="w-100 mb-0">
                                            <li className="d-flex justify-content-between align-items-center">
                                                <h3 className="price-pretitle">
                                                    Book by Harley Davidson
                                                </h3>
                                                <span className="old-price">
                                                    <del>$35.50</del>
                                                </span>
                                            </li>
                                            <li className="d-flex justify-content-between align-items-center">
                                                <h2 className="price-title">
                                                    Harley-Davidson Event 2020
                                                </h2>
                                                <span className="new-price">
                                                    $29.50
                                                </span>
                                            </li>
                                            <li className="d-flex justify-content-between align-items-center flex-sm-row flex-column">
                                                <p className="price-txt mb-sm-0 mb-2">
                                                    Pede ante dolor eget aliquet
                                                    vitae ut donec sem etiam
                                                    arcu. Eget dolor aenean cum
                                                    quam eu ut nulla.
                                                </p>
                                                <Link
                                                    to={ALL_URL.SIGN_UP}
                                                    className="buy-btn">
                                                    BUY NOW
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </Fade>
                    </div>
                    <div className="col-lg-6 col-12 mb-lg-0 mb-4">
                        <Fade direction="right">
                            <div className="book-box trans m-auto">
                                <div
                                    className="img-box w-100 h-100"
                                    style={{
                                        backgroundImage: `url(${Book4})`
                                    }}>
                                    <div className="price-box ">
                                        <ul className="w-100 mb-0">
                                            <li className="d-flex justify-content-between align-items-center">
                                                <h3 className="price-pretitle">
                                                    Book by Cycling 80
                                                </h3>
                                                <span className="old-price">
                                                    <del>$30.00</del>
                                                </span>
                                            </li>
                                            <li className="d-flex justify-content-between align-items-center">
                                                <h2 className="price-title">
                                                    Cycling Austria Event 2020
                                                </h2>
                                                <span className="new-price">
                                                    $23.50
                                                </span>
                                            </li>
                                            <li className="d-flex justify-content-between align-items-center  flex-sm-row flex-column">
                                                <p className="price-txt mb-sm-0 mb-2">
                                                    Pede ante dolor eget aliquet
                                                    vitae ut donec sem etiam
                                                    arcu. Eget dolor aenean cum
                                                    quam eu ut nulla.
                                                </p>
                                                <Link
                                                    to={ALL_URL.SIGN_UP}
                                                    className="buy-btn">
                                                    BUY NOW
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </Fade>
                    </div>
                </div>
                <div className="row flex-column justify-content-center align-items-center">
                    <div className="col-lg-6 col-12 text-lg-left text-center mb-lg-0 mb-2">
                        <Fade direction="left">
                            <Link
                                to={
                                    !userInfo
                                        ? ALL_URL.SIGN_UP
                                        : url
                                        ? ALL_URL.SIGN_UP_PUBLISHER
                                        : ALL_URL.PUBLISHER
                                }>
                                <span className="book-btn">
                                    See All Books & Prints
                                </span>
                            </Link>
                        </Fade>
                    </div>
                    <div className="col-lg-6 col-12 d-flex align-items-center justify-content-center">
                        <Fade direction="right">
                            <p className="add-txt mb-0">
                                You can add your book too.
                            </p>
                        </Fade>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BookSection;
