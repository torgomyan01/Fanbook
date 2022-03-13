import React from 'react';
import { Link } from 'react-router-dom';
import { ALL_URL } from 'utils/urls';
import BlockPlaceholder from 'features/block-placeholder';
import { Fade } from 'react-awesome-reveal';

function LoadingBlockEventLandingPage() {
    return (
        <div className="col-xl-4 col-md-6 col-12 mb-xl-0 mb-5">
            <Fade>
                <div>
                    <div className="event-box h-100 trans mr-lg-auto m-auto  d-flex flex-column justify-content-between">
                        <div className="w-100 mb-2" style={{ height: '450px' }}>
                            <BlockPlaceholder
                                count={1}
                                status={true}
                                height={350}
                                width={150}
                                borderRadius={5}
                                className="m-0 w-100"
                            />

                            <div className="event-box_headertxt mt-0 pt-3">
                                <div className="event-box_title">
                                    <BlockPlaceholder
                                        count={1}
                                        status={true}
                                        width={230}
                                        height={25}
                                        borderRadius={5}
                                        className="m-0"
                                    />
                                </div>
                                <div className="event-box_txt block-ellipsis mt-3 mb-3">
                                    <BlockPlaceholder
                                        count={1}
                                        status={true}
                                        width={150}
                                        height={8}
                                        borderRadius={5}
                                        className="m-0 d-block"
                                    />
                                    <BlockPlaceholder
                                        count={1}
                                        status={true}
                                        width={180}
                                        height={8}
                                        borderRadius={5}
                                        className="m-0 d-block mt-2"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="event-box_body">
                            <div className="your-photo-box d-flex mb-3 justify-content-between">
                                <BlockPlaceholder
                                    count={3}
                                    status={true}
                                    width={200}
                                    height={86}
                                    borderRadius={5}
                                    className="m-0 mr-2"
                                />
                                <div className="your-photo empty-box">
                                    <span className="your-photo_link">
                                        Your Photo?
                                    </span>
                                </div>
                            </div>
                            <Link to={ALL_URL.SIGN_UP} className="book-btn">
                                *Customize Your Books
                            </Link>
                            <p className="note-txt mb-0">
                                *Customize book by adding in photos that you
                                took at the event.
                            </p>
                        </div>
                    </div>
                </div>
            </Fade>
        </div>
    );
}

export default LoadingBlockEventLandingPage;
