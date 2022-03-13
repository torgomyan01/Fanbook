import React from 'react';

import Prof1 from 'assets/images/landing/prof-1.png';
import Prof2 from 'assets/images/landing/prof-2.png';
import Prof3 from 'assets/images/landing/prof-3.png';
import Prof4 from 'assets/images/landing/prof-4.png';
import { ALL_URL } from 'utils/urls';
import { Link } from 'react-router-dom';
import { Fade } from 'react-awesome-reveal';

const CaseSection = () => {
    return (
        <section className="profess-section">
            <div className="container-fluid wrapper1">
                <div className="row">
                    <div className="col-12">
                        <h2 className="profess-title">Who Is Fanbooks For?</h2>
                        <p className="profess-txt">Case Studies </p>
                    </div>
                    <div className="col-lg-3 col-sm-6 mb-lg-0 mb-4 ">
                        <Fade direction="left">
                            <div className="profess-box trans ml-lg-auto m-auto h-100 d-flex flex-column justify-content-between">
                                <div>
                                    <div className="profess-box_header">
                                        <img src={Prof1} alt="" />
                                    </div>
                                    <div className="profess-box_headertxt">
                                        <h3 className="profess-box_pretitle">
                                            Case Study 1
                                        </h3>
                                        <h2 className="profess-box_title">
                                            For Events
                                        </h2>
                                        <p className="profess-box_txt">
                                            Pede ante dolor eget aliquet vitae
                                            ut donec sem etiam arcu. Eget dolor
                                            aenean cum quam eu ut nulla ligula
                                            ullamcorper vivamus mus adipiscing.{' '}
                                        </p>
                                    </div>
                                </div>

                                <div className="profess-box_body">
                                    <Link
                                        to={ALL_URL.SIGN_UP}
                                        className="book-btn ">
                                        *See Case Study
                                    </Link>
                                    <p className="text-center note-txt">
                                        *Created by our Publishers
                                    </p>
                                </div>
                            </div>
                        </Fade>
                    </div>
                    <div className="col-lg-3 col-sm-6 mb-lg-0 mb-4 ">
                        <Fade>
                            <div className="profess-box ml-auto mr-auto trans h-100 d-flex flex-column justify-content-between">
                                <div>
                                    <div className="profess-box_header">
                                        <img src={Prof2} alt="" />
                                    </div>
                                    <div className="profess-box_headertxt">
                                        <h3 className="profess-box_pretitle">
                                            Case Study 2
                                        </h3>
                                        <h2 className="profess-box_title">
                                            For Brands
                                        </h2>
                                        <p className="profess-box_txt">
                                            Pede ante dolor eget aliquet vitae
                                            ut donec sem etiam arcu. Eget dolor
                                            aenean cum quam eu ut nulla ligula
                                            ullamcorper vivamus mus adipiscing.{' '}
                                        </p>
                                    </div>
                                </div>

                                <div className="profess-box_body">
                                    <Link
                                        to={ALL_URL.SIGN_UP}
                                        className="book-btn ">
                                        *See Case Study
                                    </Link>
                                    <p className="text-center note-txt">
                                        *Created by our Publishers
                                    </p>
                                </div>
                            </div>
                        </Fade>
                    </div>
                    <div className="col-lg-3 col-sm-6 mb-lg-0 mb-4 ">
                        <Fade>
                            <div className="profess-box ml-lg-auto mr-lg-auto m-auto trans h-100 d-flex flex-column justify-content-between">
                                <div>
                                    <div className="profess-box_header">
                                        <img src={Prof3} alt="" />
                                    </div>
                                    <div className="profess-box_headertxt">
                                        <h3 className="profess-box_pretitle">
                                            Case Study 3
                                        </h3>
                                        <h2 className="profess-box_title">
                                            For Photographers
                                        </h2>
                                        <p className="profess-box_txt">
                                            Pede ante dolor eget aliquet vitae
                                            ut donec sem etiam arcu. Eget dolor
                                            aenean cum quam eu ut nulla ligula
                                            ullamcorper vivamus mus adipiscing.{' '}
                                        </p>
                                    </div>
                                </div>

                                <div className="profess-box_body">
                                    <Link
                                        to={ALL_URL.SIGN_UP}
                                        className="book-btn ">
                                        *See Case Study
                                    </Link>
                                    <p className="text-center note-txt">
                                        *Created by our Publishers
                                    </p>
                                </div>
                            </div>
                        </Fade>
                    </div>
                    <div className="col-lg-3 col-sm-6 mb-lg-0 mb-4">
                        <Fade direction="right">
                            <div className="profess-box ml-lg-auto m-auto trans h-100 d-flex flex-column justify-content-between">
                                <div>
                                    <div className="profess-box_header">
                                        <img src={Prof4} alt="" />
                                    </div>
                                    <div className="profess-box_headertxt">
                                        <h3 className="profess-box_pretitle">
                                            Case Study 4
                                        </h3>
                                        <h2 className="profess-box_title">
                                            For Teams
                                        </h2>
                                        <p className="profess-box_txt">
                                            Pede ante dolor eget aliquet vitae
                                            ut donec sem etiam arcu. Eget dolor
                                            aenean cum quam eu ut nulla ligula
                                            ullamcorper vivamus mus adipiscing.{' '}
                                        </p>
                                    </div>
                                </div>

                                <div className="profess-box_body">
                                    <Link
                                        to={ALL_URL.SIGN_UP}
                                        className="book-btn ">
                                        *See Case Study
                                    </Link>
                                    <p className="text-center note-txt">
                                        *Created by our Publishers
                                    </p>
                                </div>
                            </div>
                        </Fade>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CaseSection;
