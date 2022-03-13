import React, { Component } from 'react';
import 'assets/css/vaucher-managment.css';
import 'react-bootstrap';
import MainTemplate from 'features/main-template/MainTemplate';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCheck,
    faPen,
    faPlus,
    faSearch
} from '@fortawesome/free-solid-svg-icons';

class VaucherManagment extends Component {
    render() {
        return (
            <div className="vaucher-section">
                {/* eslint-disable-next-line react/style-prop-object */}
                <MainTemplate
                    blackLogo={true}
                    shopBlock={true}
                    searchBlock={true}
                    style="#f8f8f8">
                    <div className="container-fluid wrapper1">
                        <div className="row">
                            <div className="col-12">
                                <div className="vaucher-managment-block mt-5 mb-5">
                                    <div className="form-line">
                                        <div className="row">
                                            <div className="col-sm-6 col-12 mb-sm-0 mb-3">
                                                <form
                                                    action="#"
                                                    method="post"
                                                    className="search-form">
                                                    <div className="search-form-box">
                                                        <input
                                                            type="text"
                                                            placeholder="Search..."
                                                            className="w-100"
                                                        />
                                                        <span className="search-icon d-inline-block">
                                                            <FontAwesomeIcon
                                                                icon={faSearch}
                                                            />
                                                        </span>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="col-sm-6 col-12 text-sm-right text-left">
                                                <Link
                                                    to="/vaucher-create"
                                                    className="btn new-btn">
                                                    <FontAwesomeIcon
                                                        icon={faPlus}
                                                        className="mr-2 fs15"
                                                    />
                                                    Create New
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <table className="vaucher-managment-table mt-5">
                                        <tbody>
                                            <tr>
                                                <th>Vaucher code</th>
                                                <th>category</th>
                                                <th>Events</th>
                                                <th>redemption</th>
                                                <th>expires</th>
                                                <th>Free shipping</th>
                                                <th />
                                            </tr>
                                            <tr>
                                                <td>s2t0e20</td>
                                                <td>Album</td>
                                                <td>MotoGP, Downhil</td>
                                                <td>1</td>
                                                <td>03/26/2020</td>
                                                <td>
                                                    <Link
                                                        to="#"
                                                        className="d-inline-block">
                                                        <FontAwesomeIcon
                                                            icon={faCheck}
                                                            className="c-black"
                                                        />
                                                    </Link>
                                                </td>
                                                <td>
                                                    <Link
                                                        to="#"
                                                        className="d-inline-block">
                                                        <FontAwesomeIcon
                                                            icon={faPen}
                                                            className="c-black"
                                                        />
                                                    </Link>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>s2t0e20</td>
                                                <td>Album</td>
                                                <td>MotoGP, Downhil</td>
                                                <td>1</td>
                                                <td>03/26/2020</td>
                                                <td>
                                                    <Link
                                                        to="#"
                                                        className="d-inline-block">
                                                        <FontAwesomeIcon
                                                            icon={faCheck}
                                                            className="c-black"
                                                        />
                                                    </Link>
                                                </td>
                                                <td>
                                                    <Link
                                                        to="#"
                                                        className="d-inline-block">
                                                        <FontAwesomeIcon
                                                            icon={faPen}
                                                            className="c-black"
                                                        />
                                                    </Link>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>s2t0e20</td>
                                                <td>Album</td>
                                                <td>MotoGP, Downhil</td>
                                                <td>1</td>
                                                <td>03/26/2020</td>
                                                <td>
                                                    <Link
                                                        to="#"
                                                        className="d-inline-block">
                                                        <FontAwesomeIcon
                                                            icon={faCheck}
                                                            className="c-black"
                                                        />
                                                    </Link>
                                                </td>
                                                <td>
                                                    <Link
                                                        to="#"
                                                        className="d-inline-block">
                                                        <FontAwesomeIcon
                                                            icon={faPen}
                                                            className="c-black"
                                                        />
                                                    </Link>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>s2t0e20</td>
                                                <td>Album</td>
                                                <td>MotoGP, Downhil</td>
                                                <td>1</td>
                                                <td>03/26/2020</td>
                                                <td>
                                                    <Link
                                                        to="#"
                                                        className="d-inline-block">
                                                        <FontAwesomeIcon
                                                            icon={faCheck}
                                                            className="c-black"
                                                        />
                                                    </Link>
                                                </td>
                                                <td>
                                                    <Link
                                                        to="#"
                                                        className="d-inline-block">
                                                        <FontAwesomeIcon
                                                            icon={faPen}
                                                            className="c-black"
                                                        />
                                                    </Link>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>s2t0e20</td>
                                                <td>Album</td>
                                                <td>MotoGP, Downhil</td>
                                                <td>1</td>
                                                <td>03/26/2020</td>
                                                <td>
                                                    <Link
                                                        to="#"
                                                        className="d-inline-block">
                                                        <FontAwesomeIcon
                                                            icon={faCheck}
                                                            className="c-black"
                                                        />
                                                    </Link>
                                                </td>
                                                <td>
                                                    <Link
                                                        to="#"
                                                        className="d-inline-block">
                                                        <FontAwesomeIcon
                                                            icon={faPen}
                                                            className="c-black"
                                                        />
                                                    </Link>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="pagination-box mt-5">
                                        <div className="row">
                                            <div className="col-md-6 col-12 d-flex align-items-center mb-md-0 mb-3">
                                                <p className="result-txt fs18">
                                                    16 <span>results</span>
                                                </p>
                                            </div>
                                            <div className="col-md-6 col-12">
                                                <ul className="pagination-list d-flex justify-content-md-end flex-md-nowrap flex-wrap mb-0">
                                                    <li className="prev-item">
                                                        <Link
                                                            to="#"
                                                            className="trans">
                                                            Previous
                                                        </Link>
                                                    </li>
                                                    <li className="pagination-item ">
                                                        <Link
                                                            to="#"
                                                            className="trans">
                                                            1
                                                        </Link>
                                                    </li>
                                                    <li className="pagination-item ">
                                                        <Link
                                                            to="#"
                                                            className="trans">
                                                            2
                                                        </Link>
                                                    </li>
                                                    <li className="pagination-item ">
                                                        <Link
                                                            to="#"
                                                            className="trans">
                                                            3
                                                        </Link>
                                                    </li>
                                                    <li className="next-item">
                                                        <Link
                                                            to="#"
                                                            className="trans">
                                                            Next
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </MainTemplate>
            </div>
        );
    }
}

export default VaucherManagment;
