import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCheckCircle,
    faTimesCircle,
    faTrash
} from '@fortawesome/free-solid-svg-icons';
import { faTiktok } from '@fortawesome/free-brands-svg-icons';

function AddSocialNetwork() {
    return (
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
                            style={{ margin: '0 19px', marginRight: '30px' }}>
                            <li className="publisher-item fb-item trans">
                                <Link to="" className="fab c-red fa-facebook-f">
                                    {''}
                                </Link>
                            </li>
                            <li className="publisher-item tw-item trans">
                                <Link to="" className="fab c-red fa-twitter">
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
                                <Link to="" className="d-inline-block">
                                    <FontAwesomeIcon icon={faTiktok} />
                                </Link>
                            </li>
                        </ul>
                        <span className="right-part close-icon">
                            <FontAwesomeIcon
                                icon={faTimesCircle}
                                className="mr-2"
                            />
                        </span>
                    </div>
                </div>

                <div className="form-group fb-form fill">
                    <span className="count mr-2">#2</span>
                    <div className="form-item social-item d-flex justify-content-between align-items-center">
                        <div className="left-part">
                            <Link to="" className="fab fa-facebook-f">
                                {''}
                            </Link>
                            <span className="http-txt">@</span>
                        </div>
                        <input type="text" defaultValue="Your profile name…" />
                        <ul className="right-part d-flex align-items-center mb-0">
                            <li className="mr-2">
                                <FontAwesomeIcon
                                    icon={faCheckCircle}
                                    className="c-red"
                                />
                            </li>
                            <li>
                                <FontAwesomeIcon
                                    icon={faTimesCircle}
                                    className="mr-2"
                                />
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faTrash} />
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="form-group fb-form">
                    <span className="count mr-2">#3</span>
                    <div className="form-item social-item">
                        <div className="left-part">
                            <Link to="" className="fab fa-facebook-f">
                                {''}
                            </Link>
                            <span className="http-txt">@</span>
                        </div>
                        <input type="text" placeholder="example.com" />
                        <ul className="right-part d-flex align-items-center mb-0">
                            <li className="mr-2">
                                <FontAwesomeIcon
                                    icon={faCheckCircle}
                                    className="c-red"
                                />
                            </li>
                            <li>
                                <FontAwesomeIcon
                                    icon={faTimesCircle}
                                    className="mr-2"
                                />
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faTrash} />
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="form-group tw-form fill">
                    <span className="count mr-2">#3</span>
                    <div className="form-item social-item fb-form">
                        <div className="left-part">
                            <Link to="" className="fab fa-twitter">
                                {''}
                            </Link>
                            <span className="http-txt">@</span>
                        </div>
                        <input type="text" defaultValue="Your profile name…" />
                        <ul className="right-part d-flex align-items-center mb-0">
                            <li className="mr-2">
                                <FontAwesomeIcon
                                    icon={faCheckCircle}
                                    className="c-red"
                                />
                            </li>
                            <li>
                                <FontAwesomeIcon
                                    icon={faTimesCircle}
                                    className="mr-2"
                                />
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faTrash} />
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="form-group tw-form">
                    <span className="count mr-2">#3</span>
                    <div className="form-item social-item fb-form">
                        <div className="left-part">
                            <Link to="" className="fab fa-twitter">
                                {''}
                            </Link>
                            <span className="http-txt">@</span>
                        </div>
                        <input type="text" placeholder="example.com" />
                        <ul className="right-part d-flex align-items-center mb-0">
                            <li className="mr-2">
                                <FontAwesomeIcon
                                    icon={faCheckCircle}
                                    className="c-red"
                                />
                            </li>
                            <li>
                                <FontAwesomeIcon
                                    icon={faTimesCircle}
                                    className="mr-2"
                                />
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faTrash} />
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
                        <input type="text" defaultValue="Your profile name…" />
                        <ul className="right-part d-flex align-items-center mb-0">
                            <li className="mr-2">
                                <FontAwesomeIcon
                                    icon={faCheckCircle}
                                    className="c-red"
                                />
                            </li>
                            <li>
                                <FontAwesomeIcon
                                    icon={faTimesCircle}
                                    className="mr-2"
                                />
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faTrash} />
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
                        <input type="text" placeholder="example.com" />
                        <ul className="right-part d-flex align-items-center mb-0">
                            <li className="mr-2">
                                <FontAwesomeIcon
                                    icon={faCheckCircle}
                                    className="c-red"
                                />
                            </li>
                            <li>
                                <FontAwesomeIcon
                                    icon={faTimesCircle}
                                    className="mr-2"
                                />
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faTrash} />
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="form-group tiktok-form fill">
                    <span className="count mr-2">#3</span>
                    <div className="form-item social-item fb-form">
                        <div className="left-part">
                            <Link to="" className="d-inline-block">
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
                        <input type="text" placeholder="example.com" />
                        <ul className="right-part d-flex align-items-center mb-0">
                            <li className="mr-2">
                                <FontAwesomeIcon
                                    icon={faCheckCircle}
                                    className="c-red"
                                />
                            </li>
                            <li>
                                <FontAwesomeIcon
                                    icon={faTimesCircle}
                                    className="mr-2"
                                />
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faTrash} />
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="form-group tiktok-form">
                    <span className="count mr-2">#3</span>
                    <div className="form-item social-item fb-form">
                        <div className="left-part">
                            <Link to="" className="d-inline-block">
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
                        <input type="text" placeholder="example.com" />
                        <ul className="right-part d-flex align-items-center mb-0">
                            <li className="mr-2">
                                <FontAwesomeIcon
                                    icon={faCheckCircle}
                                    className="c-red"
                                />
                            </li>
                            <li>
                                <FontAwesomeIcon
                                    icon={faTimesCircle}
                                    className="mr-2"
                                />
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faTrash} />
                            </li>
                        </ul>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddSocialNetwork;
