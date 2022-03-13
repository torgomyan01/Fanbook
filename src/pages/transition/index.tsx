import React, { useState } from 'react';
import 'assets/css/transition.css';

import { Link } from 'react-router-dom';

import logo from './images/logo-red.png';
import transitioniMG from './images/transition-img.png';
import transitionBG from './images/transition-bg.png';
import { ALL_URL } from 'utils/urls';

const Transition = () => {
    const [opCMMenu, setOpCMMenu] = useState(false);

    function openMobileMenu() {
        setOpCMMenu(true);
    }
    function closeMobileMenu() {
        setOpCMMenu(false);
    }
    return (
        <div className="transition-page">
            <header>
                <div className="header-top">
                    <div className="container-fluid">
                        <nav className="navbar navbar-expand-lg navbar-dark">
                            <h1 className="navbar-brand mb-0">
                                <Link
                                    to={ALL_URL.HOME}
                                    className=" d-inline-block"
                                    title="fanbook">
                                    <img src={logo} alt="logo" />
                                </Link>
                            </h1>
                            <button
                                className="navbar-toggler"
                                type="button"
                                onClick={openMobileMenu}>
                                <i className="navbar-toggler-icon fas fa-bars" />
                            </button>

                            <div
                                className="collapse navbar-collapse "
                                id="collapsibleNavbar">
                                <ul className="navbar-nav ml-auto d-flex align-items-center">
                                    <li className="nav-item">
                                        <Link
                                            className="nav-link font-medium"
                                            to="#">
                                            SOLUTIONS
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link
                                            className="nav-link font-medium"
                                            to="#">
                                            BECOME A PARTNER
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link
                                            className="nav-link font-medium"
                                            to="#">
                                            DOWNLOAD THE APP
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div
                                id="mySidenav"
                                className="sidenav"
                                style={{ width: opCMMenu ? '100%' : '0' }}>
                                <Link
                                    to="#"
                                    className="navbar-toggler closebtn"
                                    onClick={closeMobileMenu}>
                                    <span className="navbar-toggler-icon" />
                                </Link>
                                <ul className=" mb-5 pl-0">
                                    <li className="nav-item  mb-5">
                                        <Link className="nav-link " to="#">
                                            Solutions
                                        </Link>
                                    </li>
                                    <li className="nav-item mb-5">
                                        <Link className="nav-link" to="#">
                                            BECOME A PARTNER
                                        </Link>
                                    </li>
                                    <li className="nav-item mb-5">
                                        <Link className="nav-link" to="#">
                                            DOWNLOAD THE APP
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>

            <section className="transition-main h-100">
                <div className="container-fluid transition-wrapper h-100 ">
                    <div className="row">
                        <div className="col-xl-4 col-lg-6 col-12">
                            <div className="mw-440">
                                <h2 className="transition-main_title font-bold">
                                    Under Transition
                                </h2>
                                <p className="transition-main_txt">
                                    Please check back for a new and Improved
                                    Fanbook experience
                                </p>
                            </div>
                        </div>
                        <div className="col-xl-8 col-lg-6 col-12 pl-4">
                            <span className="text-lg-left text-center d-block">
                                <img src={transitioniMG} alt="" />
                            </span>
                            <span className="text-right d-block text-lg-right text-center pr-4">
                                <img src={transitionBG} alt="" />
                            </span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Transition;
