import React from 'react';
import userImgBG from '../images/fanbook-img-bg.png';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCamera,
    faExternalLinkAlt,
    faPlus,
    faShareAlt
} from '@fortawesome/free-solid-svg-icons';

function AboutBox() {
    return (
        <div className="about-box">
            <div
                className="img-box"
                style={{ backgroundImage: `url(${userImgBG})` }}>
                <span className="camera-box trans">
                    <FontAwesomeIcon icon={faCamera} className="fs30" />
                </span>
                <div className="about-note c-white">
                    <div className="b-bottom h-100">
                        <h2 className="about-note_title font-bold">
                            About the Publisher
                        </h2>
                        {/*<p className="about-note_txt mb-0">Add a description about you…</p>*/}
                        <textarea
                            className="about-note_txt mb-0"
                            name=""
                            id=""
                            placeholder="Add a description about you…"
                        />
                    </div>
                </div>
            </div>

            <div className="social-box">
                <div className="mb-sm-0 mb-2">
                    <div className="social-box d-lg-flex align-items-center justify-content-between">
                        <div className="mb-2 d-flex flex-sm-nowrap flex-wrap">
                            <Link
                                to="#"
                                className="redbull-btn mr-2 disable-btn mb-sm-0 mb-2">
                                <FontAwesomeIcon
                                    icon={faPlus}
                                    className="mr-2"
                                />
                                <span className="ml-2">Follow</span>
                            </Link>
                            <Link
                                to="#"
                                className="add-btn disable-btn btn d-flex align-items-center">
                                <FontAwesomeIcon
                                    icon={faExternalLinkAlt}
                                    className="mr-2"
                                />
                                example.com
                            </Link>
                        </div>
                        <Link
                            to="#"
                            className="add-btn disable-btn btn d-flex align-items-center">
                            <FontAwesomeIcon
                                icon={faShareAlt}
                                className="mr-2"
                            />
                            Add a social network…
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutBox;
