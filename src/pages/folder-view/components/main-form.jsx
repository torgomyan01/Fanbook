import React from 'react';
import { Link } from 'react-router-dom';
import publisher from '../images/publisher.png';
import redArrowLeft from '../images/red-arrow-left.png';
import flag from '../images/flag.png';

function MainForm() {
    return (
        <div className="main-form w-100">
            <div className="back-box">
                <div className="container-fluid wrapper1">
                    <div className="row">
                        <div className="col-12 ">
                            <div className="d-flex flex-md-row  flex-column align-items-center justify-content-md-start justify-content-center">
                                <ul className="d-flex mb-0 fs15">
                                    <li className="c-black mr-1">
                                        Library Name
                                    </li>
                                    <li className="c-black mr-1">&gt;</li>
                                    <li className="c-gray">Folder Name</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="folder-part">
                <div className="container-fluid wrapper1">
                    <div className="row">
                        <div className="col-sm-6 col-12">
                            <h2 className="fs35 mb-4 text-sm-left text-center">
                                <i className="far fa-folder mr-3" />
                                Folder name
                            </h2>
                            <div className="total-box">
                                <div className="d-flex justify-content-between mb-3">
                                    <div className="total-box_txt">
                                        <h3 className="total-box_title f-omnesMedium fs16 c-gray">
                                            Total Photos
                                        </h3>
                                        <span className="fs23 mb-4 d-inline-block f-omnesMedium">
                                            1,145
                                        </span>
                                        <h3 className="total-box_title f-omnesMedium fs16 c-gray">
                                            Total Price
                                        </h3>
                                        <span className="d-inline-block fs23 c-red f-omnesMedium">
                                            $845.50
                                        </span>
                                    </div>
                                    <div
                                        className="total-box_img"
                                        style={{
                                            backgroundImage: `url(${publisher})`
                                        }}
                                    />
                                </div>
                                <Link
                                    to="#"
                                    className="event-btn fs17 trans c-red">
                                    <i className="fas fa-shopping-cart mr-3" />
                                    Buy All Photos
                                </Link>
                            </div>
                        </div>
                        <div className="col-sm-6 col-12">
                            <div className="folder-box-right library-section">
                                <div className="d-flex">
                                    <div
                                        className="box mr-3"
                                        style={{
                                            backgroundImage: `url(${publisher})`
                                        }}
                                    />

                                    <div className="d-flex flex-column ">
                                        <h2 className="fs20 lh-07 mb-2">
                                            Library name
                                        </h2>
                                        <p className="library-txt fs16 mb-4 ">
                                            {' '}
                                            By:
                                            <span className="c-red b-bottom ml-2">
                                                MotoGP
                                            </span>
                                        </p>
                                        <ul className="d-flex flex-column mb-4">
                                            <li className="f-myriadprolight fs16 mr-3 mb-3">
                                                1 – 2 June 2019, 10:00 AM
                                            </li>
                                            <li className="fs16">
                                                <img
                                                    src={flag}
                                                    alt=""
                                                    className="mr-1"
                                                />
                                                <Link
                                                    to="#"
                                                    className="b-bottom c-black">
                                                    Erzberg, Österreich
                                                </Link>
                                            </li>
                                        </ul>
                                        <Link
                                            to="#"
                                            className="event-btn fs17 trans">
                                            Go to Event page
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainForm;
