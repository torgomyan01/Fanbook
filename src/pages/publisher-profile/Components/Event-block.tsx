import React from 'react';
import publisherBgImg from 'assets/images/publisher-profile/publisher-1.png';
import DropDownPublisher from './dropdown-p';
import { Fade } from 'react-awesome-reveal';

function EventBlockPublisherPage() {
    return (
        <div className="col-md-6 col-12 mb-md-0 mb-5">
            <Fade>
                <div className="featured-box trans ">
                    <div
                        className="img-box"
                        style={{
                            backgroundImage: `url(${publisherBgImg})`
                        }}
                    />
                    <div className="txt-box d-lg-flex flex-lg-row flex-column justify-content-between">
                        <div>
                            <p className="date-txt">
                                1 – 2 June 2019, 10:00 AM
                            </p>
                            <h2 className="event-txt mb-lg-0 mb-3">
                                Harley-Davidson Event 2020
                            </h2>
                        </div>
                        <div className="text-right position-relative">
                            <p className="cust-txt text-lg-right text-left mb-0">
                                *Customize book
                            </p>
                            <span className="d-flex justify-content-end">
                                <DropDownPublisher />
                            </span>
                        </div>
                    </div>
                </div>
            </Fade>
        </div>
    );
}

export default EventBlockPublisherPage;
