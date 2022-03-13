import React from 'react';
import { Link } from 'react-router-dom';
import libraryImg from '../images/librari-img.png';
import publisher from '../images/publisher.png';
import flag from '../images/flag.png';

function LibrarySection() {
    return (
        <section className="library-section">
            <div className="container-fluid wrapper1">
                <div className="row">
                    <div className="col-xl-5 col-md-6 col-12 mb-xl-0 mb-3">
                        <div
                            className="img-box h-100"
                            style={{
                                backgroundImage: `url(${libraryImg})`
                            }}
                        />
                    </div>
                    <div className="col-xl-5 col-md-6 col-12">
                        <div className="d-flex mb-40">
                            <div
                                className="box mr-3"
                                style={{
                                    backgroundImage: `url(${publisher})`
                                }}
                            />
                            <div className="d-flex flex-column ">
                                <h2 className="fs35 lh-07 mb-3 f-omnesMedium">
                                    Event name
                                </h2>
                                <p className="library-txt fs18 mb-0">
                                    By:
                                    <span className="c-red b-bottom ml-2">
                                        MotoGP
                                    </span>
                                </p>
                            </div>
                        </div>
                        <p className="fs17 f-myriadprolight lh-13 mb-4">
                            Pitch gamification low hanging fruit value
                            proposition twitter research &amp; development
                            innovator agile development. Assets success virality
                            lean startup value proposition disruptive funding
                            churn rate metrics. Assets success virality lean
                            startup value proposition disruptive funding churn
                            rate metrics.
                        </p>
                        <ul className="d-sm-flex mb-4">
                            <li className="f-myriadprolight fs16 mr-3 mb-sm-0 mb-2">
                                1 – 2 June 2019, 10:00 AM
                            </li>
                            <li className="fs16">
                                <img src={flag} alt="" className="mr-1" />
                                <Link to="#" className="b-bottom c-black">
                                    Erzberg, Österreich
                                </Link>
                            </li>
                        </ul>
                        <Link to="#" className="event-btn fs17 trans">
                            Go to Event page
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LibrarySection;
