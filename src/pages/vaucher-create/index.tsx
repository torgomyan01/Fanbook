import React, { Component } from 'react';
import 'assets/css/vaucher-create.css';
import 'react-bootstrap';
import MainTemplate from 'features/main-template/MainTemplate';
import { Link } from 'react-router-dom';

class VucherCreate extends Component {
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
                                <div className="vaucher-block mt-5 mb-5">
                                    <h2 className="vaucher-block_title">
                                        Create a coupon
                                    </h2>
                                    <p className="vaucher-block_txt">
                                        Coupons can be used to dicuount entire
                                        customers accounts.
                                    </p>
                                    <form
                                        action="#"
                                        method="post"
                                        className="vaucher-form-block">
                                        <div className="form-group">
                                            <label>For events</label>
                                            <select className="custom-select">
                                                <option>
                                                    Creating for specific
                                                    events, enter names
                                                    separated by comma
                                                </option>
                                                <option>Bottom/right</option>
                                                <option>Top/Left</option>
                                                <option>Top/right</option>
                                            </select>
                                        </div>
                                        <div className="form-group mb-sm-5 mb-3">
                                            <label className="mb-4">
                                                For category
                                            </label>
                                            <ul className="check-list d-flex flex-sm-row flex-column mb-0">
                                                <li className="check-item">
                                                    <input
                                                        id="ch-1"
                                                        type="checkbox"
                                                    />
                                                    <label htmlFor="ch-1">
                                                        Albums
                                                    </label>
                                                </li>
                                                <li className="check-item">
                                                    <input
                                                        id="ch-2"
                                                        type="checkbox"
                                                    />
                                                    <label htmlFor="ch-2">
                                                        Books
                                                    </label>
                                                </li>
                                                <li className="check-item">
                                                    <input
                                                        id="ch-3"
                                                        type="checkbox"
                                                    />
                                                    <label htmlFor="ch-3">
                                                        Posters
                                                    </label>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                placeholder="Enter coupon name"
                                                className="w-100 mw-100"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <div className="row">
                                                <div className="col-md-6 col-12 mb-md-0 mb-3">
                                                    <div className="position-relative datepicker-input">
                                                        <input
                                                            type="date"
                                                            placeholder="Select start date"
                                                            className="mw-100"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-12">
                                                    <div className="position-relative datepicker-input ml-md-auto">
                                                        <input
                                                            type="date"
                                                            placeholder="Select End date"
                                                            className="mw-100"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Coupon usage</label>

                                            <div className="row">
                                                <div className="col-md-4 col-12 mb-md-0 mb-3">
                                                    <input
                                                        type="text"
                                                        placeholder="Enter coupon name"
                                                        className="coupon-input mr-md-auto"
                                                    />
                                                </div>
                                                <div className="col-md-4 col-12 mb-md-0 mb-3">
                                                    <div
                                                        className="dropdown m-md-auto"
                                                        style={{ right: '0' }}>
                                                        <select
                                                            name=""
                                                            className="user-dropdown"
                                                            id="">
                                                            <option defaultValue="">
                                                                By users
                                                            </option>
                                                            <option defaultValue="">
                                                                Another
                                                            </option>
                                                            <option defaultValue="">
                                                                Something
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 col-12 mb-md-0 mb-3">
                                                    <div
                                                        className="dropdown ml-md-auto"
                                                        style={{ right: '0' }}>
                                                        <select
                                                            name=""
                                                            className="user-dropdown"
                                                            id="">
                                                            <option defaultValue="">
                                                                Shipping options
                                                            </option>
                                                            <option defaultValue="">
                                                                Another
                                                            </option>
                                                            <option defaultValue="">
                                                                Something
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <ul className="mb-0">
                                            <li className="d-inline-block">
                                                <Link
                                                    to="#"
                                                    className="cancel-btn btn">
                                                    cancel
                                                </Link>
                                            </li>
                                            <li className="d-inline-block">
                                                <Link
                                                    to="#"
                                                    className="create-btn btn">
                                                    Create coupon
                                                </Link>
                                            </li>
                                        </ul>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </MainTemplate>
            </div>
        );
    }
}

export default VucherCreate;
