import React from 'react';
import { Link } from 'react-router-dom';
import contentImg1 from '../images/content-img-1.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEye,
    faShoppingBag,
    faShoppingCart
} from '@fortawesome/free-solid-svg-icons';

function ContentSection() {
    return (
        <section className="serp-section content-section ">
            <div className="container-fluid">
                <div className="row ">
                    <div className="col-12">
                        <div className="folder-section w-100 p-0">
                            <div className="folder-box d-flex flex-lg-row flex-column align-items-lg-center align-items-start w-100">
                                <p className="fs24 c-black mb-lg-0 mb-3 mr-5 f-omnesMedium">
                                    All Photos
                                </p>
                                <form action="">
                                    <ul className="form-box d-flex flex-lg-nowrap flex-wrap align-items-center mb-0 mr-4">
                                        <li className="radio-item">
                                            <input
                                                id="ra-1"
                                                type="radio"
                                                name="radio-b"
                                            />
                                            <label
                                                htmlFor="ra-1"
                                                className="f-myriadproreg mb-0">
                                                Show all
                                            </label>
                                        </li>
                                        <li className="radio-item">
                                            <input
                                                id="ra-2"
                                                type="radio"
                                                name="radio-b"
                                            />
                                            <label
                                                htmlFor="ra-2"
                                                className="f-myriadproreg mb-0">
                                                Show only favorited
                                            </label>
                                        </li>
                                        <li className="radio-item">
                                            <input
                                                id="ra-3"
                                                type="radio"
                                                name="radio-b"
                                            />
                                            <label
                                                htmlFor="ra-3"
                                                className="f-myriadproreg mb-0">
                                                Show only bought
                                            </label>
                                        </li>
                                        <li className="check-item b-left">
                                            <input id="ch-1" type="checkbox" />
                                            <label
                                                htmlFor="ch-1"
                                                className="f-myriadproreg mb-0">
                                                Show only bought
                                            </label>
                                        </li>
                                        <li className="check-item">
                                            <input id="ch-2" type="checkbox" />
                                            <label
                                                htmlFor="ch-2"
                                                className="f-myriadproreg mb-0">
                                                Show hearts
                                            </label>
                                        </li>
                                    </ul>
                                </form>
                                <ul className="mb-0 d-flex justify-content-end ">
                                    <li className="">
                                        <form
                                            action="#"
                                            method="post"
                                            className="form-box d-flex align-items-center mb-0">
                                            <span>
                                                <i className="fas fa-search c-blue " />
                                            </span>
                                            <input
                                                type="text"
                                                placeholder="Search albums..."
                                            />
                                        </form>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-2 col-lg-4 col-sm-6 col-12 mb-4">
                        <div className="content-box h-100 d-flex justify-content-center align-items-center trans">
                            <div className="more-fild text-center">
                                <p className="fs20 c-black f-myriadproreg mb-2">
                                    Hey Milan,
                                </p>
                                <p className="fs16 c-black f-myriadproreg mb-4">
                                    Adding more photos?
                                </p>
                                <Link
                                    to="#"
                                    className="see-btn fs16 d-inline-block text-center f-myriadproreg trans c-black">
                                    <i className="fas fa-download mr-2" />
                                    Upload
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-4 col-sm-6 col-12  mb-4">
                        <div className="content-box trans">
                            <div
                                className="img-box"
                                style={{
                                    backgroundImage: `url(${contentImg1})`
                                }}>
                                <div className="p-2 d-flex justify-content-between">
                                    <span className="price-box">$25.00</span>
                                    <span className="heart-box">
                                        <i className="fas fa-heart" />
                                    </span>
                                </div>
                            </div>
                            <div className="content-box_txt ">
                                <Link
                                    to="#"
                                    className="preview-btn text-center d-inline-block fs16 c-black f-myriadproreg mr-2 trans m-auto">
                                    <FontAwesomeIcon
                                        icon={faEye}
                                        className="mr-2"
                                    />
                                    Preview
                                </Link>
                                <Link
                                    to="#"
                                    className="buy-btn text-center d-inline-block fs16 c-black f-myriadproreg trans m-auto">
                                    <FontAwesomeIcon icon={faShoppingCart} />
                                    Buy
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-4 col-sm-6 col-12  mb-4">
                        <div className="content-box trans">
                            <div
                                className="img-box"
                                style={{
                                    backgroundImage: `url(${contentImg1})`
                                }}>
                                <div className="p-2 d-flex justify-content-between">
                                    <span className="price-box">$25.00</span>
                                    <span className="heart-box">
                                        <i className="fas fa-heart" />
                                    </span>
                                </div>
                            </div>
                            <div className="content-box_txt ">
                                <Link
                                    to="#"
                                    className="preview-btn text-center d-inline-block fs16 c-black f-myriadproreg mr-2 trans m-auto">
                                    <FontAwesomeIcon
                                        icon={faEye}
                                        className="mr-2"
                                    />
                                    Preview
                                </Link>
                                <Link
                                    to="#"
                                    className="bought-btn text-center d-inline-block fs16 c-black f-myriadproreg trans m-auto">
                                    <FontAwesomeIcon
                                        icon={faShoppingBag}
                                        style={{ color: '#6fd068' }}
                                    />
                                    Bought
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-4 col-sm-6 col-12  mb-4">
                        <div className="content-box trans">
                            <div
                                className="img-box"
                                style={{
                                    backgroundImage: `url(${contentImg1})`
                                }}>
                                <div className="p-2 d-flex justify-content-between">
                                    <span className="price-box">$25.00</span>
                                    <span className="heart-box">
                                        <i className="fas fa-heart" />
                                    </span>
                                </div>
                            </div>
                            <div className="content-box_txt ">
                                <Link
                                    to="#"
                                    className="preview-btn text-center d-inline-block fs16 c-black f-myriadproreg mr-2 trans m-auto">
                                    <FontAwesomeIcon
                                        icon={faEye}
                                        className="mr-2"
                                    />
                                    Preview
                                </Link>
                                <Link
                                    to="#"
                                    className="buy-btn text-center d-inline-block fs16 c-black f-myriadproreg trans m-auto">
                                    <FontAwesomeIcon icon={faShoppingCart} />
                                    Buy
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-4 col-sm-6 col-12  mb-4">
                        <div className="content-box trans">
                            <div
                                className="img-box"
                                style={{
                                    backgroundImage: `url(${contentImg1})`
                                }}>
                                <div className="p-2 d-flex justify-content-between">
                                    <span className="price-box">$25.00</span>
                                    <span className="heart-box">
                                        <i className="fas fa-heart" />
                                    </span>
                                </div>
                            </div>
                            <div className="content-box_txt ">
                                <Link
                                    to="#"
                                    className="preview-btn text-center d-inline-block fs16 c-black f-myriadproreg mr-2 trans m-auto">
                                    <FontAwesomeIcon
                                        icon={faEye}
                                        className="mr-2"
                                    />
                                    Preview
                                </Link>
                                <Link
                                    to="#"
                                    className="buy-btn text-center d-inline-block fs16 c-black f-myriadproreg trans m-auto">
                                    <FontAwesomeIcon icon={faShoppingCart} />
                                    Buy
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-4 col-sm-6 col-12  mb-4">
                        <div className="content-box trans">
                            <div
                                className="img-box"
                                style={{
                                    backgroundImage: `url(${contentImg1})`
                                }}>
                                <div className="p-2 d-flex justify-content-between">
                                    <span className="price-box">$25.00</span>
                                    <span className="heart-box">
                                        <i className="fas fa-heart" />
                                    </span>
                                </div>
                            </div>
                            <div className="content-box_txt ">
                                <Link
                                    to="#"
                                    className="preview-btn text-center d-inline-block fs16 c-black f-myriadproreg mr-2 trans m-auto">
                                    <FontAwesomeIcon
                                        icon={faEye}
                                        className="mr-2"
                                    />
                                    Preview
                                </Link>
                                <Link
                                    to="#"
                                    className="buy-btn text-center d-inline-block fs16 c-black f-myriadproreg trans m-auto">
                                    <FontAwesomeIcon icon={faShoppingCart} />
                                    Buy
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-4 col-sm-6 col-12  mb-4">
                        <div className="content-box trans">
                            <div
                                className="img-box"
                                style={{
                                    backgroundImage: `url(${contentImg1})`
                                }}>
                                <div className="p-2 d-flex justify-content-between">
                                    <span className="price-box">$25.00</span>
                                    <span className="heart-box">
                                        <i className="fas fa-heart" />
                                    </span>
                                </div>
                            </div>
                            <div className="content-box_txt ">
                                <Link
                                    to="#"
                                    className="preview-btn text-center d-inline-block fs16 c-black f-myriadproreg mr-2 trans m-auto">
                                    <FontAwesomeIcon
                                        icon={faEye}
                                        className="mr-2"
                                    />
                                    Preview
                                </Link>
                                <Link
                                    to="#"
                                    className="buy-btn text-center d-inline-block fs16 c-black f-myriadproreg trans m-auto">
                                    <FontAwesomeIcon icon={faShoppingCart} />
                                    Buy
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-4 col-sm-6 col-12  mb-4">
                        <div className="content-box trans">
                            <div
                                className="img-box"
                                style={{
                                    backgroundImage: `url(${contentImg1})`
                                }}>
                                <div className="p-2 d-flex justify-content-between">
                                    <span className="price-box">$25.00</span>
                                    <span className="heart-box">
                                        <i className="fas fa-heart" />
                                    </span>
                                </div>
                            </div>
                            <div className="content-box_txt ">
                                <Link
                                    to="#"
                                    className="preview-btn text-center d-inline-block fs16 c-black f-myriadproreg mr-2 trans m-auto">
                                    <FontAwesomeIcon
                                        icon={faEye}
                                        className="mr-2"
                                    />
                                    Preview
                                </Link>
                                <Link
                                    to="#"
                                    className="buy-btn text-center d-inline-block fs16 c-black f-myriadproreg trans m-auto">
                                    <FontAwesomeIcon icon={faShoppingCart} />
                                    Buy
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-4 col-sm-6 col-12  mb-4">
                        <div className="content-box trans">
                            <div
                                className="img-box"
                                style={{
                                    backgroundImage: `url(${contentImg1})`
                                }}>
                                <div className="p-2 d-flex justify-content-between">
                                    <span className="price-box">$25.00</span>
                                    <span className="heart-box">
                                        <i className="fas fa-heart" />
                                    </span>
                                </div>
                            </div>
                            <div className="content-box_txt ">
                                <Link
                                    to="#"
                                    className="preview-btn text-center d-inline-block fs16 c-black f-myriadproreg mr-2 trans ml-auto mr-auto">
                                    <FontAwesomeIcon
                                        icon={faEye}
                                        className="mr-2"
                                    />
                                    Preview
                                </Link>
                                <Link
                                    to="#"
                                    className="buy-btn text-center d-inline-block fs16 c-black f-myriadproreg trans ml-auto mr-auto">
                                    <FontAwesomeIcon icon={faShoppingCart} />
                                    Buy
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-4 col-sm-6 col-12  mb-4">
                        <div className="content-box trans">
                            <div
                                className="img-box"
                                style={{
                                    backgroundImage: `url(${contentImg1})`
                                }}>
                                <div className="p-2 d-flex justify-content-between">
                                    <span className="price-box">$25.00</span>
                                    <span className="heart-box">
                                        <i className="far fa-heart c-gray" />
                                    </span>
                                </div>
                            </div>
                            <div className="content-box_txt ">
                                <Link
                                    to="#"
                                    className="preview-btn text-center d-inline-block fs16 c-black f-myriadproreg mr-2 trans ml-auto mr-auto">
                                    <FontAwesomeIcon
                                        icon={faEye}
                                        className="mr-2"
                                    />
                                    Preview
                                </Link>
                                <Link
                                    to="#"
                                    className="buy-btn text-center d-inline-block fs16 c-black f-myriadproreg trans ml-auto mr-auto">
                                    <FontAwesomeIcon icon={faShoppingCart} />
                                    Buy
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-4 col-sm-6 col-12  mb-4">
                        <div className="content-box trans">
                            <div
                                className="img-box"
                                style={{
                                    backgroundImage: `url(${contentImg1})`
                                }}>
                                <div className="p-2 d-flex justify-content-between">
                                    <span className="price-box">$25.00</span>
                                    <span className="heart-box">
                                        <i className="far fa-heart c-gray" />
                                    </span>
                                </div>
                            </div>
                            <div className="content-box_txt ">
                                <Link
                                    to="#"
                                    className="preview-btn text-center d-inline-block fs16 c-black f-myriadproreg mr-2 trans ml-auto mr-auto">
                                    <FontAwesomeIcon
                                        icon={faEye}
                                        className="mr-2"
                                    />
                                    Preview
                                </Link>
                                <Link
                                    to="#"
                                    className="buy-btn text-center d-inline-block fs16 c-black f-myriadproreg trans ml-auto mr-auto">
                                    <FontAwesomeIcon icon={faShoppingCart} />
                                    Buy
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-4 col-sm-6 col-12  mb-4">
                        <div className="content-box trans">
                            <div
                                className="img-box"
                                style={{
                                    backgroundImage: `url(${contentImg1})`
                                }}>
                                <div className="p-2 d-flex justify-content-between">
                                    <span className="price-box">$25.00</span>
                                    <span className="heart-box">
                                        <i className="far fa-heart c-gray" />
                                    </span>
                                </div>
                            </div>
                            <div className="content-box_txt ">
                                <Link
                                    to="#"
                                    className="preview-btn text-center d-inline-block fs16 c-black f-myriadproreg mr-2 trans ml-auto mr-auto">
                                    <FontAwesomeIcon
                                        icon={faEye}
                                        className="mr-2"
                                    />
                                    Preview
                                </Link>
                                <Link
                                    to="#"
                                    className="buy-btn text-center d-inline-block fs16 c-black f-myriadproreg trans ml-auto mr-auto">
                                    <FontAwesomeIcon icon={faShoppingCart} />
                                    Buy
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ContentSection;
