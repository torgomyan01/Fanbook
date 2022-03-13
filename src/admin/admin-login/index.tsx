import React from 'react';
import './index.css';
import bgLogin from './images/login-bg-img.png';
import blackLogin from './images/black-logo.png';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

function AdminLogin() {
    return (
        <div
            className="login-block bg-img"
            style={{ backgroundImage: `url(${bgLogin})` }}>
            <p className="go-back-txt">
                Go Back to Fanbooks
                <FontAwesomeIcon icon={faExternalLinkAlt} className="ml-2" />
            </p>
            <div className="login-box">
                <Link to="#" title="Fanbook" className="logo">
                    <img src={blackLogin} alt="logo" />
                </Link>
                <div className="form-group mb-2">
                    <label htmlFor="uname">Username</label>
                    <input id="uname" type="text" placeholder="" />
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="pass">Password</label>
                    <input id="pass" type="password" placeholder="" />
                </div>
                <button
                    type="submit"
                    className="checkout-btn btn red mb-3 mw-100">
                    Log In
                </button>
                <Link to="#" className="gray-link">
                    <u>Forgot Password?</u>
                </Link>
            </div>
        </div>
    );
}

export default AdminLogin;
