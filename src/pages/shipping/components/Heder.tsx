import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../edit-covers/images/black-logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

interface Props {
    step: number;
}

const HeaderShipping: FC<Props> = ({ step }) => {
    return (
        <header>
            <div className="header-top border-0">
                <div className="container-fluid wrapper1">
                    <div className="row d-flex align-items-center justify-content-between">
                        <div className="col-28 my-col mb-0">
                            <h1 className="navbar-brand mb-0">
                                <Link
                                    to="/"
                                    className=" d-inline-block"
                                    title="fanbook">
                                    <img src={logo} alt="logo" />
                                </Link>
                            </h1>
                        </div>
                        <div className="col-43 my-col mb-0">
                            <div className="pl-3 pr-3">
                                <ul className="cond-list d-flex align-items-center">
                                    {step > 1 ? (
                                        <li className="check-btn">
                                            <span className="check-active" />
                                        </li>
                                    ) : (
                                        <li className="round-btn active">
                                            <span />
                                        </li>
                                    )}

                                    <li className="cond-line" />
                                    {step === 3 ? (
                                        <li className="check-btn">
                                            <span className="check-active" />
                                        </li>
                                    ) : (
                                        <li className="round-btn active">
                                            <span />
                                        </li>
                                    )}
                                    {/* <li className="round-btn active">
                                        <span className="" />
                                    </li>
                                    <li className="cond-line"></li>
                                    <li className="round-btn">
                                        <span className="" />
                                    </li> */}
                                </ul>
                                <div className="d-flex justify-content-between">
                                    <span className="fs16 f-omnesRegular">
                                        Shipping &amp; Payment Info
                                    </span>
                                    <span className="fs16 f-omnesRegular">
                                        Confirm Order
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-28 my-col mb-0">
                            <ul className="navbar-nav d-flex align-items-center flex-row justify-content-end mt-2">
                                <li className="mr-2">
                                    <Link
                                        className="nav-link d-flex align-items-center fs16"
                                        to="">
                                        <FontAwesomeIcon icon={faArrowLeft} />
                                    </Link>
                                </li>
                                <li>
                                    <Link className="nav-link fs16" to="/">
                                        Return to Fanbooks
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default HeaderShipping;
