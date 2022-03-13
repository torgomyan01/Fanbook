import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import bookBlack from '../images/book-black.png';
import bookBlackActive from '../images/booking-1-active.png';
import posterBlack from '../images/poster-black.png';
import posterBlackActive from '../images/booking-2-active.png';
import DigitalBlack from '../images/digital-black.png';
import DigitalBlackActive from '../images/booking-3-active.png';
import Book from '../images/book.png';

function PostSection() {
    const [buckActive, setBuckActive] = useState('books');

    function blockActiveBooking() {
        setBuckActive('books');
    }
    function blockActivePosters() {
        setBuckActive('posters');
    }
    function blockActiveDownloads() {
        setBuckActive('downloads');
    }

    return (
        <section className="printed-book-section post-section">
            <div className="container-fluid wrapper1">
                <div className="row">
                    <div className="printed-book-list col-12">
                        <ul className="d-flex active flex-sm-row flex-column align-items-center mb-0 w-100 justify-content-center">
                            <li
                                className={
                                    buckActive === 'books'
                                        ? 'printed-book_item text-center active position-relative trans mb-sm-0 mb-3'
                                        : 'printed-book_item text-center position-relative trans mb-sm-0 mb-3'
                                }
                                onClick={blockActiveBooking}>
                                {buckActive === 'books' ? (
                                    <span className="mb-3">
                                        <img
                                            className="mb-3"
                                            src={bookBlackActive}
                                            alt=""
                                        />
                                    </span>
                                ) : (
                                    <span className="mb-3">
                                        <img
                                            className="mb-3"
                                            src={bookBlack}
                                            alt=""
                                        />
                                    </span>
                                )}
                                <span
                                    className={
                                        buckActive === 'books'
                                            ? 'perfect-item_txt text-center c-red'
                                            : 'perfect-item_txt text-center'
                                    }>
                                    Books
                                </span>
                            </li>

                            <li
                                className={
                                    buckActive === 'posters'
                                        ? 'printed-book_item text-center active position-relative trans mb-sm-0 mb-3'
                                        : 'printed-book_item text-center position-relative trans mb-sm-0 mb-3'
                                }
                                onClick={blockActivePosters}>
                                {buckActive === 'posters' ? (
                                    <span className="mb-3">
                                        <img
                                            className="mb-3"
                                            src={posterBlackActive}
                                            alt=""
                                        />
                                    </span>
                                ) : (
                                    <span className="mb-3">
                                        <img
                                            className="mb-3"
                                            src={posterBlack}
                                            alt=""
                                        />
                                    </span>
                                )}
                                <span
                                    className={
                                        buckActive === 'posters'
                                            ? 'perfect-item_txt text-center c-red'
                                            : 'perfect-item_txt text-center'
                                    }>
                                    Posters
                                </span>
                            </li>

                            <li
                                // className="printed-book_item text-center  position-relative trans "
                                className={
                                    buckActive === 'downloads'
                                        ? 'printed-book_item text-center active position-relative trans mb-sm-0 mb-3'
                                        : 'printed-book_item text-center position-relative trans mb-sm-0 mb-3'
                                }
                                onClick={blockActiveDownloads}>
                                {buckActive === 'downloads' ? (
                                    <span className="mb-3">
                                        <img
                                            className="mb-3"
                                            src={DigitalBlackActive}
                                            alt=""
                                        />
                                    </span>
                                ) : (
                                    <span className="mb-3">
                                        <img
                                            className="mb-3"
                                            src={DigitalBlack}
                                            alt=""
                                        />
                                    </span>
                                )}
                                <span
                                    className={
                                        buckActive === 'downloads'
                                            ? 'perfect-item_txt text-center c-red'
                                            : 'perfect-item_txt text-center'
                                    }>
                                    Downloads
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div className="col-12">
                        <div className="book-box d-sm-flex mb-3">
                            <div className="img-box mb-sm-0 mb-2 ">
                                <div
                                    className="book-img mb-3"
                                    style={{
                                        backgroundImage: `url(${Book})`
                                    }}
                                />
                                <h3 className="img-box_title mb-0">
                                    Do it Yourself
                                </h3>
                            </div>
                            <div className="book-txt-box d-flex flex-column justify-content-between w-100">
                                <h3 className="book-box_pretitle">
                                    Book to pre-order
                                </h3>
                                <h2 className="book-box_title">
                                    Blank Do It Yourself Super Bowl Hard Cover
                                </h2>
                                <span className="f-omnesMedium c-red fs35 mb-40">
                                    $19.50
                                </span>
                                <Link
                                    to="#"
                                    className="buy-btn text-center mb-0">
                                    Pre-order now
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default PostSection;
