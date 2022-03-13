import React from 'react';
import { Link } from 'react-router-dom';
import BlockPlaceholder from 'features/block-placeholder';
import { Fade } from 'react-awesome-reveal';

function LoadingAdded() {
    return (
        <Link to="#" className="col-lg-4 col-md-6 mb-lg-0 mb-md-5 mb-3">
            <Fade>
                <div className="added-box trans">
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
                            <div className="mr-2">
                                <BlockPlaceholder
                                    count={1}
                                    status={true}
                                    height={50}
                                    width={50}
                                    borderRadius={5}
                                    className="m-0 mr-1"
                                />
                            </div>
                            <div className="d-flex flex-column justify-content-between">
                                <p className="redbull-txt mb-0">Publisher</p>
                                <h3 className="redbull-title mb-0">
                                    <BlockPlaceholder
                                        count={1}
                                        status={true}
                                        width={150}
                                        height={20}
                                        borderRadius={5}
                                        className="m-0"
                                    />
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="txt-box ">
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
                        <h2 className="event-txt mb-2">
                            <BlockPlaceholder
                                count={1}
                                status={true}
                                width={150}
                                height={20}
                                borderRadius={5}
                                className="m-0"
                            />
                        </h2>
                        <p className="cust-txt mb-0">
                            <BlockPlaceholder
                                count={1}
                                status={true}
                                width={250}
                                height={8}
                                borderRadius={5}
                                className="m-0"
                            />
                            <BlockPlaceholder
                                count={1}
                                status={true}
                                width={280}
                                height={8}
                                borderRadius={5}
                                className="m-0"
                            />
                            <BlockPlaceholder
                                count={1}
                                status={true}
                                width={300}
                                height={8}
                                borderRadius={5}
                                className="m-0"
                            />
                        </p>
                    </div>
                </div>
            </Fade>
        </Link>
    );
}

export default LoadingAdded;
