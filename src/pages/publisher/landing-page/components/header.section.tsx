import React from 'react';
import { Carousel } from 'react-bootstrap';

import SliderLeftArrow from 'assets/images/icons/slider-left-arrow.png';
import SliderRightArrow from 'assets/images/icons/slider-right-arrow.png';
import { BecomePublisherButton } from 'features/components';

const Header = () => {
    return (
        <div className="header-bottom">
            <div className="row">
                <div className="col-12  d-block w-100">
                    <div className="txt-box mb-lg-0 mb-5 text-center">
                        <h2 className="txt-box_title">
                            Fanbooks for Publishers
                        </h2>
                        <p className="txt-box_txt">
                            New revenues and engagement
                        </p>
                        <BecomePublisherButton className="m-auto" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
