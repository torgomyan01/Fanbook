import React from 'react';

import EventBoxImg from '../../assets/images/landing/event-box-img.png';

const LoadBox = () => {
    return (
        <div className="load-box d-flex">
            <div className="left-box mr-2">
                <img src={EventBoxImg} alt="" />
            </div>
            <div className="right-box d-flex flex-column justify-content-between">
                <h3 className="right-box_title">Harley-Davidson Event 2020</h3>
                <p className="right-box_txt block-ellipsis">
                    Our BLANK DIY book allows you to add 30 of your favorite
                    photos. Choose between{' '}
                    <span className="more-link">Read More</span>
                </p>
            </div>
        </div>
    );
};

export default LoadBox;
