import React from 'react';
import userImg from '../images/fanbook-user-img.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faSave } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function PublisherImgBlock() {
    return (
        <div className="col-xl-2 col-12">
            <div className="mr-md-0 mr-3 d-flex flex-md-column justify-content-between h-100 w-100">
                <div className="mr-md-0 mr-3">
                    <div
                        className="user-box"
                        style={{ backgroundImage: `url(${userImg})` }}>
                        <span className="camera-box trans ml-3">
                            <FontAwesomeIcon icon={faCamera} className="fs30" />
                        </span>
                    </div>
                    <p className="publisher-left_txt ">Publisher Name</p>
                    <h2 className="publisher-left_title font-bold">MotoGP</h2>
                </div>
                <div className="text-right">
                    <Link to="" className="btn save-btn">
                        <FontAwesomeIcon icon={faSave} className="mr-2" />
                        Save Profile
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default PublisherImgBlock;
