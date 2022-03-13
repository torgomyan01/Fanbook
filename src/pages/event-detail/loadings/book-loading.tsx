import React from 'react';
import BlockPlaceholder from 'features/block-placeholder';

function BookLoading() {
    return (
        <div className="book-box d-sm-flex mb-3">
            <div className="img-box mb-sm-0 mb-2 ">
                <BlockPlaceholder
                    width={110}
                    height={110}
                    borderRadius={5}
                    status={true}
                    count={1}
                    className="m-0 mb-2"
                />
                <h3 className="img-box_title mb-0">
                    <BlockPlaceholder
                        width={100}
                        height={8}
                        borderRadius={5}
                        status={true}
                        count={1}
                        className="m-0 mb-2"
                    />
                </h3>
            </div>
            <div className="book-txt-box d-flex flex-column w-100">
                <h2 className="book-box_title mb-2">
                    <BlockPlaceholder
                        width={200}
                        height={25}
                        borderRadius={5}
                        status={true}
                        count={1}
                        className="m-0 mb-2"
                    />
                </h2>
                <h3 className="book-box_pretitle">
                    <BlockPlaceholder
                        width={200}
                        height={8}
                        borderRadius={5}
                        status={true}
                        count={5}
                        className="m-0 mb-2 w-100"
                    />
                </h3>
                <div className="d-flex">
                    <span className="buy-btn text-center mr-2 cursor-pointer buy-button-event-page">
                        <BlockPlaceholder
                            width={110}
                            height={15}
                            borderRadius={5}
                            status={true}
                            count={1}
                            className="m-0"
                        />
                    </span>
                </div>
            </div>
        </div>
    );
}

export default BookLoading;
