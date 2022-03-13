import React from 'react';
import { keyGenerator } from 'utils/helpers';
import { Link } from 'react-router-dom';
import BlockPlaceholder from 'features/block-placeholder';
import { Fade } from 'react-awesome-reveal';

function LoaderFeatures() {
    return (
        <div className="col-md-6 col-12 mb-md-0 mb-5">
            <Fade>
                <Link to="/">
                    <div className="featured-box trans">
                        <div className="img-box position-relative">
                            <BlockPlaceholder
                                count={1}
                                status={true}
                                height={80}
                                width={80}
                                borderRadius={5}
                                className="m-0 w-100 h-100 position-absolute"
                            />
                            <div className="redbull-box">
                                <BlockPlaceholder
                                    count={1}
                                    status={true}
                                    height={50}
                                    width={50}
                                    borderRadius={5}
                                    className="m-0 mr-3"
                                />
                                <div className="d-flex flex-column justify-content-between">
                                    <p className="redbull-txt mb-0">
                                        Publisher
                                    </p>
                                    <h3 className="redbull-title mb-0">
                                        <BlockPlaceholder
                                            count={1}
                                            status={true}
                                            height={25}
                                            width={150}
                                            borderRadius={5}
                                            className="m-0"
                                        />
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div className="txt-box d-lg-flex flex-lg-row flex-column align-items-center justify-content-between">
                            <div>
                                <p className="date-txt">
                                    <BlockPlaceholder
                                        count={1}
                                        status={true}
                                        width={250}
                                        height={20}
                                        borderRadius={5}
                                        className="m-0"
                                    />
                                </p>
                                <h2 className="event-txt mb-lg-0 mb-3">
                                    <BlockPlaceholder
                                        count={1}
                                        status={true}
                                        width={180}
                                        height={20}
                                        borderRadius={5}
                                        className="m-0"
                                    />
                                </h2>
                            </div>
                            <div>
                                <p className="cust-txt text-lg-right text-left mb-0">
                                    *Customize book by adding in photos that you
                                    took at the event.
                                </p>
                            </div>
                        </div>
                    </div>
                </Link>
            </Fade>
        </div>
    );
}

export default LoaderFeatures;
