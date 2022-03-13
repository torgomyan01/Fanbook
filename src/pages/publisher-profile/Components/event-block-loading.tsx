import React from 'react';
import DropDownPublisher from './dropdown-p';
import BlockPlaceholder from 'features/block-placeholder';

function EventBlockPublisherPageLoading() {
    return (
        <div className="col-md-6 col-12 mb-md-0 mb-5">
            <div className="featured-box trans ">
                <BlockPlaceholder
                    width={189}
                    height={8}
                    borderRadius={5}
                    status={true}
                    count={1}
                    className="img-box m-0 w-100"
                />
                <div className="txt-box d-lg-flex flex-lg-row flex-column justify-content-between">
                    <div>
                        <p className="date-txt">
                            <BlockPlaceholder
                                width={250}
                                height={20}
                                borderRadius={5}
                                status={true}
                                count={1}
                                className="m-0"
                            />
                        </p>
                        <h2 className="event-txt mb-lg-0 mb-3">
                            <BlockPlaceholder
                                width={300}
                                height={25}
                                borderRadius={5}
                                status={true}
                                count={1}
                                className="m-0"
                            />
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
        </div>
    );
}

export default EventBlockPublisherPageLoading;
