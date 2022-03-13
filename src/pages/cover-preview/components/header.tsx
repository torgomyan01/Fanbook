import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/black-logo.png';

function Header() {
    return (
        <header>
            <div className="header-top">
                <div className="container-fluid">
                    <nav
                        className="navbar navbar-expand-lg navbar-dark"
                        style={{ marginTop: 10 }}>
                        <div />
                        <div className="header-left">
                            <div className="d-flex align-items-center">
                                <h1 className="navbar-brand">
                                    <Link
                                        to="/"
                                        className="d-inline-block"
                                        title="fanbook">
                                        <img
                                            src={logo}
                                            alt="logo"
                                            className="img-logo"
                                        />
                                    </Link>
                                </h1>
                                <span className="banner-editor bg-blue mt-2">
                                    preview mode
                                </span>
                            </div>
                        </div>
                        <div>
                            <ul className="list-unstyled btns-list">
                                <li
                                    onClick={() => {
                                        history.go(-1);
                                    }}
                                    className="cursor-pointer fs25">
                                    <i className="fas fa-times" />
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;
