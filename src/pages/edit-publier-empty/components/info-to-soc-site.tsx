import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

function EditUserNames() {
    return (
        <div className="offset-xl-2 col-xl-10 col-12">
            <div className="publisher-right">
                <div className="social-block">
                    <div className="row">
                        <div className="col-md-5 col-12">
                            <form
                                action=""
                                method="post"
                                className="d-flex flex-column align-items--end align-items-start">
                                <div className="form-group fill">
                                    <span className="count mr-2">#1</span>
                                    <div className="form-item">
                                        <div className="left-part">
                                            <FontAwesomeIcon
                                                icon={faExternalLinkAlt}
                                                className="mr-2 c-red"
                                            />
                                            <span className="http-txt">
                                                http://
                                            </span>
                                        </div>
                                        <input
                                            type="text"
                                            defaultValue="example.com"
                                        />
                                        <ul className="right-part d-flex align-items-center mb-0">
                                            <li className="mr-2">
                                                <span className="check-it">
                                                    <svg
                                                        fill="#b12029"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="15.37"
                                                        height="15.375"
                                                        viewBox="0 0 15.37 15.375">
                                                        <path
                                                            d="M4951.14,788.962a7.683,7.683,0,1,0,7.68,7.683A7.709,7.709,0,0,0,4951.14,788.962Zm-1.58,11.78-3.94-3.938,1.1-1.105,2.84,2.837,5.99-5.987,1.1,1.1Z"
                                                            transform="translate(-4943.44 -788.969)">
                                                            {''}
                                                        </path>
                                                    </svg>
                                                </span>
                                            </li>
                                            <li>
                                                <span className="close-item cp">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="15.09"
                                                        height="15.062"
                                                        viewBox="0 0 15.09 15.062">
                                                        <path
                                                            fill="#4e4e4e"
                                                            d="M4976.95,788.962a7.538,7.538,0,1,0,7.54,7.538A7.507,7.507,0,0,0,4976.95,788.962Zm3.77,10.252-1.05,1.055-2.72-2.714-2.71,2.714-1.06-1.055,2.72-2.714-2.72-2.714,1.06-1.055,2.71,2.714,2.72-2.714,1.05,1.055-2.71,2.714Z"
                                                            transform="translate(-4969.41 -788.969)">
                                                            {''}
                                                        </path>
                                                    </svg>
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <span className="count mr-2">#2</span>
                                    <div className="form-item">
                                        <div className="left-part">
                                            <FontAwesomeIcon
                                                icon={faExternalLinkAlt}
                                                className="mr-2 c-red"
                                            />
                                            <span className="http-txt">
                                                http://
                                            </span>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="example.com"
                                        />
                                        <ul className="right-part d-flex align-items-center mb-0">
                                            <li className="mr-2">
                                                <Link
                                                    to="#"
                                                    className="check-it">
                                                    <svg
                                                        fill="#b12029"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="15.37"
                                                        height="15.375"
                                                        viewBox="0 0 15.37 15.375">
                                                        <path
                                                            d="M4951.14,788.962a7.683,7.683,0,1,0,7.68,7.683A7.709,7.709,0,0,0,4951.14,788.962Zm-1.58,11.78-3.94-3.938,1.1-1.105,2.84,2.837,5.99-5.987,1.1,1.1Z"
                                                            transform="translate(-4943.44 -788.969)">
                                                            {''}
                                                        </path>
                                                    </svg>
                                                </Link>
                                            </li>
                                            <li>
                                                <span className="close-item cp">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="15.09"
                                                        height="15.062"
                                                        viewBox="0 0 15.09 15.062">
                                                        <path
                                                            fill="#4e4e4e"
                                                            d="M4976.95,788.962a7.538,7.538,0,1,0,7.54,7.538A7.507,7.507,0,0,0,4976.95,788.962Zm3.77,10.252-1.05,1.055-2.72-2.714-2.71,2.714-1.06-1.055,2.72-2.714-2.72-2.714,1.06-1.055,2.71,2.714,2.72-2.714,1.05,1.055-2.71,2.714Z"
                                                            transform="translate(-4969.41 -788.969)">
                                                            {''}
                                                        </path>
                                                    </svg>
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-7 col-12">
                            <form
                                action=""
                                method="post"
                                className="d-flex flex-column align-items-md-end align-items-start">
                                <div className="form-group">
                                    <span className="count mr-2">#1</span>
                                    <div className="form-item d-flex justify-content-start align-items-center">
                                        <ul
                                            className="publisher-list d-flex mb-0 justify-content-between align-items-center  w-100"
                                            style={{
                                                margin: '0 19px',
                                                marginRight: '30px'
                                            }}>
                                            <li className="publisher-item fb-item trans">
                                                <Link
                                                    to=""
                                                    className="fab c-red fa-facebook-f">
                                                    {''}
                                                </Link>
                                            </li>
                                            <li className="publisher-item tw-item trans">
                                                <Link
                                                    to=""
                                                    className="fab c-red fa-twitter">
                                                    {''}
                                                </Link>
                                            </li>
                                            <li className="publisher-item ln-item trans">
                                                <Link
                                                    to=""
                                                    className="fab c-red fa-linkedin-in d-inline-block">
                                                    {''}
                                                </Link>
                                            </li>
                                            <li className="publisher-item in-item trans">
                                                <Link
                                                    to=""
                                                    className="fab c-red fa-instagram d-inline-block">
                                                    {''}
                                                </Link>
                                            </li>
                                            <li className="publisher-item tiktok-item trans">
                                                <Link
                                                    to=""
                                                    className="d-inline-block">
                                                    <svg
                                                        fill="#b12029"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        height="21px"
                                                        viewBox="-32 0 512 512"
                                                        width="18px">
                                                        <path d="m432.734375 112.464844c-53.742187 0-97.464844-43.722656-97.464844-97.464844 0-8.285156-6.714843-15-15-15h-80.335937c-8.28125 0-15 6.714844-15 15v329.367188c0 31.59375-25.707032 57.296874-57.300782 57.296874s-57.296874-25.703124-57.296874-57.296874c0-31.597657 25.703124-57.300782 57.296874-57.300782 8.285157 0 15-6.714844 15-15v-80.335937c0-8.28125-6.714843-15-15-15-92.433593 0-167.632812 75.203125-167.632812 167.636719 0 92.433593 75.199219 167.632812 167.632812 167.632812 92.433594 0 167.636719-75.199219 167.636719-167.632812v-145.792969c29.851563 15.917969 63.074219 24.226562 97.464844 24.226562 8.285156 0 15-6.714843 15-15v-80.335937c0-8.28125-6.714844-15-15-15zm0 0">
                                                            {''}
                                                        </path>
                                                    </svg>
                                                </Link>
                                            </li>
                                        </ul>
                                        <span className="right-part close-icon">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="15.09"
                                                height="15.062"
                                                viewBox="0 0 15.09 15.062">
                                                <path
                                                    fill="#4e4e4e"
                                                    d="M4976.95,788.962a7.538,7.538,0,1,0,7.54,7.538A7.507,7.507,0,0,0,4976.95,788.962Zm3.77,10.252-1.05,1.055-2.72-2.714-2.71,2.714-1.06-1.055,2.72-2.714-2.72-2.714,1.06-1.055,2.71,2.714,2.72-2.714,1.05,1.055-2.71,2.714Z"
                                                    transform="translate(-4969.41 -788.969)">
                                                    {''}
                                                </path>
                                            </svg>
                                        </span>
                                    </div>
                                </div>

                                <div className="form-group fb-form fill">
                                    <span className="count mr-2">#2</span>
                                    <div className="form-item social-item d-flex justify-content-between align-items-center">
                                        <div className="left-part">
                                            <Link
                                                to=""
                                                className="fab fa-facebook-f">
                                                {''}
                                            </Link>
                                            <span className="http-txt">@</span>
                                        </div>
                                        <input
                                            type="text"
                                            defaultValue="Your profile name…"
                                        />
                                        <ul className="right-part d-flex align-items-center mb-0">
                                            <li className="mr-2">
                                                <span className="check-it">
                                                    <svg
                                                        fill="#b12029"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="15.37"
                                                        height="15.375"
                                                        viewBox="0 0 15.37 15.375">
                                                        <path
                                                            d="M4951.14,788.962a7.683,7.683,0,1,0,7.68,7.683A7.709,7.709,0,0,0,4951.14,788.962Zm-1.58,11.78-3.94-3.938,1.1-1.105,2.84,2.837,5.99-5.987,1.1,1.1Z"
                                                            transform="translate(-4943.44 -788.969)">
                                                            {''}
                                                        </path>
                                                    </svg>
                                                </span>
                                            </li>
                                            <li>
                                                <span className="close-item cp">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="15.09"
                                                        height="15.062"
                                                        viewBox="0 0 15.09 15.062">
                                                        <path
                                                            fill="#4e4e4e"
                                                            d="M4976.95,788.962a7.538,7.538,0,1,0,7.54,7.538A7.507,7.507,0,0,0,4976.95,788.962Zm3.77,10.252-1.05,1.055-2.72-2.714-2.71,2.714-1.06-1.055,2.72-2.714-2.72-2.714,1.06-1.055,2.71,2.714,2.72-2.714,1.05,1.055-2.71,2.714Z"
                                                            transform="translate(-4969.41 -788.969)">
                                                            {''}
                                                        </path>
                                                    </svg>
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="form-group fb-form">
                                    <span className="count mr-2">#3</span>
                                    <div className="form-item social-item">
                                        <div className="left-part">
                                            <Link
                                                to=""
                                                className="fab fa-facebook-f">
                                                {''}
                                            </Link>
                                            <span className="http-txt">@</span>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="example.com"
                                        />
                                        <ul className="right-part d-flex align-items-center mb-0">
                                            <li className="mr-2">
                                                <Link
                                                    to="#"
                                                    className="check-it">
                                                    <svg
                                                        fill="#b12029"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="15.37"
                                                        height="15.375"
                                                        viewBox="0 0 15.37 15.375">
                                                        <path
                                                            d="M4951.14,788.962a7.683,7.683,0,1,0,7.68,7.683A7.709,7.709,0,0,0,4951.14,788.962Zm-1.58,11.78-3.94-3.938,1.1-1.105,2.84,2.837,5.99-5.987,1.1,1.1Z"
                                                            transform="translate(-4943.44 -788.969)">
                                                            {''}
                                                        </path>
                                                    </svg>
                                                </Link>
                                            </li>
                                            <li>
                                                <span className="close-item cp">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="15.09"
                                                        height="15.062"
                                                        viewBox="0 0 15.09 15.062">
                                                        <path
                                                            fill="#4e4e4e"
                                                            d="M4976.95,788.962a7.538,7.538,0,1,0,7.54,7.538A7.507,7.507,0,0,0,4976.95,788.962Zm3.77,10.252-1.05,1.055-2.72-2.714-2.71,2.714-1.06-1.055,2.72-2.714-2.72-2.714,1.06-1.055,2.71,2.714,2.72-2.714,1.05,1.055-2.71,2.714Z"
                                                            transform="translate(-4969.41 -788.969)">
                                                            {''}
                                                        </path>
                                                    </svg>
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="form-group tw-form fill">
                                    <span className="count mr-2">#3</span>
                                    <div className="form-item social-item fb-form">
                                        <div className="left-part">
                                            <Link
                                                to=""
                                                className="fab fa-twitter">
                                                {''}
                                            </Link>
                                            <span className="http-txt">@</span>
                                        </div>
                                        <input
                                            type="text"
                                            defaultValue="Your profile name…"
                                        />
                                        <ul className="right-part d-flex align-items-center mb-0">
                                            <li className="mr-2">
                                                <Link
                                                    to="#"
                                                    className="check-it">
                                                    <svg
                                                        fill="#b12029"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="15.37"
                                                        height="15.375"
                                                        viewBox="0 0 15.37 15.375">
                                                        <path
                                                            d="M4951.14,788.962a7.683,7.683,0,1,0,7.68,7.683A7.709,7.709,0,0,0,4951.14,788.962Zm-1.58,11.78-3.94-3.938,1.1-1.105,2.84,2.837,5.99-5.987,1.1,1.1Z"
                                                            transform="translate(-4943.44 -788.969)">
                                                            {''}
                                                        </path>
                                                    </svg>
                                                </Link>
                                            </li>
                                            <li>
                                                <span className="close-item cp">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="15.09"
                                                        height="15.062"
                                                        viewBox="0 0 15.09 15.062">
                                                        <path
                                                            fill="#4e4e4e"
                                                            d="M4976.95,788.962a7.538,7.538,0,1,0,7.54,7.538A7.507,7.507,0,0,0,4976.95,788.962Zm3.77,10.252-1.05,1.055-2.72-2.714-2.71,2.714-1.06-1.055,2.72-2.714-2.72-2.714,1.06-1.055,2.71,2.714,2.72-2.714,1.05,1.055-2.71,2.714Z"
                                                            transform="translate(-4969.41 -788.969)">
                                                            {''}
                                                        </path>
                                                    </svg>
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="form-group tw-form">
                                    <span className="count mr-2">#3</span>
                                    <div className="form-item social-item fb-form">
                                        <div className="left-part">
                                            <Link
                                                to=""
                                                className="fab fa-twitter">
                                                {''}
                                            </Link>
                                            <span className="http-txt">@</span>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="example.com"
                                        />
                                        <ul className="right-part d-flex align-items-center mb-0">
                                            <li className="mr-2">
                                                <Link
                                                    to="#"
                                                    className="check-it">
                                                    <svg
                                                        fill="#b12029"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="15.37"
                                                        height="15.375"
                                                        viewBox="0 0 15.37 15.375">
                                                        {/**/}
                                                        <path
                                                            d="M4951.14,788.962a7.683,7.683,0,1,0,7.68,7.683A7.709,7.709,0,0,0,4951.14,788.962Zm-1.58,11.78-3.94-3.938,1.1-1.105,2.84,2.837,5.99-5.987,1.1,1.1Z"
                                                            transform="translate(-4943.44 -788.969)">
                                                            {''}
                                                        </path>
                                                    </svg>
                                                </Link>
                                            </li>
                                            <li>
                                                <span className="close-item cp">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="15.09"
                                                        height="15.062"
                                                        viewBox="0 0 15.09 15.062">
                                                        <path
                                                            fill="#4e4e4e"
                                                            d="M4976.95,788.962a7.538,7.538,0,1,0,7.54,7.538A7.507,7.507,0,0,0,4976.95,788.962Zm3.77,10.252-1.05,1.055-2.72-2.714-2.71,2.714-1.06-1.055,2.72-2.714-2.72-2.714,1.06-1.055,2.71,2.714,2.72-2.714,1.05,1.055-2.71,2.714Z"
                                                            transform="translate(-4969.41 -788.969)">
                                                            {''}
                                                        </path>
                                                    </svg>
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="form-group ln-form fill">
                                    <span className="count mr-2">#3</span>
                                    <div className="form-item social-item fb-form">
                                        <div className="left-part">
                                            <Link
                                                to=""
                                                className="fab fa-linkedin-in d-inline-block">
                                                {''}
                                            </Link>
                                            <span className="http-txt">@</span>
                                        </div>
                                        <input
                                            type="text"
                                            defaultValue="Your profile name…"
                                        />
                                        <ul className="right-part d-flex align-items-center mb-0">
                                            <li className="mr-2">
                                                <Link
                                                    to="#"
                                                    className="check-it">
                                                    <svg
                                                        fill="#b12029"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="15.37"
                                                        height="15.375"
                                                        viewBox="0 0 15.37 15.375">
                                                        {/**/}
                                                        <path
                                                            d="M4951.14,788.962a7.683,7.683,0,1,0,7.68,7.683A7.709,7.709,0,0,0,4951.14,788.962Zm-1.58,11.78-3.94-3.938,1.1-1.105,2.84,2.837,5.99-5.987,1.1,1.1Z"
                                                            transform="translate(-4943.44 -788.969)">
                                                            {''}
                                                        </path>
                                                    </svg>
                                                </Link>
                                            </li>
                                            <li>
                                                <span className="close-item cp">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="15.09"
                                                        height="15.062"
                                                        viewBox="0 0 15.09 15.062">
                                                        <path
                                                            fill="#4e4e4e"
                                                            d="M4976.95,788.962a7.538,7.538,0,1,0,7.54,7.538A7.507,7.507,0,0,0,4976.95,788.962Zm3.77,10.252-1.05,1.055-2.72-2.714-2.71,2.714-1.06-1.055,2.72-2.714-2.72-2.714,1.06-1.055,2.71,2.714,2.72-2.714,1.05,1.055-2.71,2.714Z"
                                                            transform="translate(-4969.41 -788.969)">
                                                            {''}
                                                        </path>
                                                    </svg>
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="form-group ln-form">
                                    <span className="count mr-2">#3</span>
                                    <div className="form-item social-item fb-form">
                                        <div className="left-part">
                                            <Link
                                                to=""
                                                className="fab fa-linkedin-in d-inline-block">
                                                {''}
                                            </Link>
                                            <span className="http-txt">@</span>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="example.com"
                                        />
                                        <ul className="right-part d-flex align-items-center mb-0">
                                            <li className="mr-2">
                                                <Link
                                                    to="#"
                                                    className="check-it">
                                                    <svg
                                                        fill="#b12029"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="15.37"
                                                        height="15.375"
                                                        viewBox="0 0 15.37 15.375">
                                                        {/**/}
                                                        <path
                                                            d="M4951.14,788.962a7.683,7.683,0,1,0,7.68,7.683A7.709,7.709,0,0,0,4951.14,788.962Zm-1.58,11.78-3.94-3.938,1.1-1.105,2.84,2.837,5.99-5.987,1.1,1.1Z"
                                                            transform="translate(-4943.44 -788.969)">
                                                            {''}
                                                        </path>
                                                    </svg>
                                                </Link>
                                            </li>
                                            <li>
                                                <span className="close-item">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="15.09"
                                                        height="15.062"
                                                        viewBox="0 0 15.09 15.062">
                                                        <path
                                                            fill="#4e4e4e"
                                                            d="M4976.95,788.962a7.538,7.538,0,1,0,7.54,7.538A7.507,7.507,0,0,0,4976.95,788.962Zm3.77,10.252-1.05,1.055-2.72-2.714-2.71,2.714-1.06-1.055,2.72-2.714-2.72-2.714,1.06-1.055,2.71,2.714,2.72-2.714,1.05,1.055-2.71,2.714Z"
                                                            transform="translate(-4969.41 -788.969)">
                                                            {''}
                                                        </path>
                                                    </svg>
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="form-group tiktok-form fill">
                                    <span className="count mr-2">#3</span>
                                    <div className="form-item social-item fb-form">
                                        <div className="left-part">
                                            <Link
                                                to=""
                                                className="d-inline-block">
                                                <svg
                                                    fill="#b12029"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    height="21px"
                                                    viewBox="-32 0 512 512"
                                                    width="18px">
                                                    <path d="m432.734375 112.464844c-53.742187 0-97.464844-43.722656-97.464844-97.464844 0-8.285156-6.714843-15-15-15h-80.335937c-8.28125 0-15 6.714844-15 15v329.367188c0 31.59375-25.707032 57.296874-57.300782 57.296874s-57.296874-25.703124-57.296874-57.296874c0-31.597657 25.703124-57.300782 57.296874-57.300782 8.285157 0 15-6.714844 15-15v-80.335937c0-8.28125-6.714843-15-15-15-92.433593 0-167.632812 75.203125-167.632812 167.636719 0 92.433593 75.199219 167.632812 167.632812 167.632812 92.433594 0 167.636719-75.199219 167.636719-167.632812v-145.792969c29.851563 15.917969 63.074219 24.226562 97.464844 24.226562 8.285156 0 15-6.714843 15-15v-80.335937c0-8.28125-6.714844-15-15-15zm0 0">
                                                        {''}
                                                    </path>
                                                </svg>
                                            </Link>
                                            <span className="http-txt">@</span>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="example.com"
                                        />
                                        <ul className="right-part d-flex align-items-center mb-0">
                                            <li className="mr-2">
                                                <Link
                                                    to="#"
                                                    className="check-it">
                                                    <svg
                                                        fill="#b12029"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="15.37"
                                                        height="15.375"
                                                        viewBox="0 0 15.37 15.375">
                                                        <path
                                                            d="M4951.14,788.962a7.683,7.683,0,1,0,7.68,7.683A7.709,7.709,0,0,0,4951.14,788.962Zm-1.58,11.78-3.94-3.938,1.1-1.105,2.84,2.837,5.99-5.987,1.1,1.1Z"
                                                            transform="translate(-4943.44 -788.969)">
                                                            {''}
                                                        </path>
                                                    </svg>
                                                </Link>
                                            </li>
                                            <li>
                                                <span className="close-item">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="15.09"
                                                        height="15.062"
                                                        viewBox="0 0 15.09 15.062">
                                                        <path
                                                            fill="#4e4e4e"
                                                            d="M4976.95,788.962a7.538,7.538,0,1,0,7.54,7.538A7.507,7.507,0,0,0,4976.95,788.962Zm3.77,10.252-1.05,1.055-2.72-2.714-2.71,2.714-1.06-1.055,2.72-2.714-2.72-2.714,1.06-1.055,2.71,2.714,2.72-2.714,1.05,1.055-2.71,2.714Z"
                                                            transform="translate(-4969.41 -788.969)">
                                                            {''}
                                                        </path>
                                                    </svg>
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="form-group tiktok-form">
                                    <span className="count mr-2">#3</span>
                                    <div className="form-item social-item fb-form">
                                        <div className="left-part">
                                            <Link
                                                to=""
                                                className="d-inline-block">
                                                <svg
                                                    fill="#b12029"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    height="21px"
                                                    viewBox="-32 0 512 512"
                                                    width="18px">
                                                    <path d="m432.734375 112.464844c-53.742187 0-97.464844-43.722656-97.464844-97.464844 0-8.285156-6.714843-15-15-15h-80.335937c-8.28125 0-15 6.714844-15 15v329.367188c0 31.59375-25.707032 57.296874-57.300782 57.296874s-57.296874-25.703124-57.296874-57.296874c0-31.597657 25.703124-57.300782 57.296874-57.300782 8.285157 0 15-6.714844 15-15v-80.335937c0-8.28125-6.714843-15-15-15-92.433593 0-167.632812 75.203125-167.632812 167.636719 0 92.433593 75.199219 167.632812 167.632812 167.632812 92.433594 0 167.636719-75.199219 167.636719-167.632812v-145.792969c29.851563 15.917969 63.074219 24.226562 97.464844 24.226562 8.285156 0 15-6.714843 15-15v-80.335937c0-8.28125-6.714844-15-15-15zm0 0">
                                                        {''}
                                                    </path>
                                                </svg>
                                            </Link>
                                            <span className="http-txt">@</span>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="example.com"
                                        />
                                        <ul className="right-part d-flex align-items-center mb-0">
                                            <li className="mr-2">
                                                <Link
                                                    to="#"
                                                    className="check-it">
                                                    <svg
                                                        fill="#b12029"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="15.37"
                                                        height="15.375"
                                                        viewBox="0 0 15.37 15.375">
                                                        <path
                                                            d="M4951.14,788.962a7.683,7.683,0,1,0,7.68,7.683A7.709,7.709,0,0,0,4951.14,788.962Zm-1.58,11.78-3.94-3.938,1.1-1.105,2.84,2.837,5.99-5.987,1.1,1.1Z"
                                                            transform="translate(-4943.44 -788.969)">
                                                            {''}
                                                        </path>
                                                    </svg>
                                                </Link>
                                            </li>
                                            <li>
                                                <span className="close-item">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="15.09"
                                                        height="15.062"
                                                        viewBox="0 0 15.09 15.062">
                                                        <path
                                                            fill="#4e4e4e"
                                                            d="M4976.95,788.962a7.538,7.538,0,1,0,7.54,7.538A7.507,7.507,0,0,0,4976.95,788.962Zm3.77,10.252-1.05,1.055-2.72-2.714-2.71,2.714-1.06-1.055,2.72-2.714-2.72-2.714,1.06-1.055,2.71,2.714,2.72-2.714,1.05,1.055-2.71,2.714Z"
                                                            transform="translate(-4969.41 -788.969)">
                                                            {''}
                                                        </path>
                                                    </svg>
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditUserNames;
