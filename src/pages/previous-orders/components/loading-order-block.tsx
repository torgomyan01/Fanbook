import React from 'react';
import BlockPlaceholder from 'features/block-placeholder';

function LoadingOrderBlock() {
    return (
        <>
            <div className="row m-0">
                <h4 className="order-number-profile-page fs15">
                    Order number
                    <BlockPlaceholder
                        width={300}
                        height={20}
                        borderRadius={5}
                        status={true}
                        count={1}
                        className="m-0 ml-2"
                    />
                </h4>
            </div>
            <div className="row order-information-my-profile-page m-0">
                <div>
                    <span className="ordered-on">Ordered on</span>
                    <span className="data">
                        <BlockPlaceholder
                            width={80}
                            height={20}
                            borderRadius={5}
                            status={true}
                            count={1}
                            className="m-0 ml-2"
                        />
                    </span>
                    <span className="price">
                        Price:{' '}
                        <span className="c-red font-bold">
                            $
                            <BlockPlaceholder
                                width={80}
                                height={20}
                                borderRadius={5}
                                status={true}
                                count={1}
                                className="m-0 ml-2"
                            />
                        </span>
                    </span>
                </div>
            </div>
            <div className="order-block">
                <div className="row m-0 pb-order">
                    <div className="one-product border-0">
                        <div className="d-flex w-50">
                            <BlockPlaceholder
                                width={80}
                                height={100}
                                borderRadius={5}
                                status={true}
                                count={1}
                                className="m-0 mr-2"
                            />
                            <div className="info-bloc-product">
                                <div className="title-product">
                                    <BlockPlaceholder
                                        width={300}
                                        height={20}
                                        borderRadius={5}
                                        status={true}
                                        count={1}
                                        className="m-0 image"
                                    />
                                </div>
                                <div className="product-event-and-status">
                                    <span className="name">
                                        <BlockPlaceholder
                                            width="50%"
                                            height={20}
                                            borderRadius={5}
                                            status={true}
                                            count={1}
                                            className="m-0"
                                        />
                                    </span>
                                </div>
                                <div className="price c-red font-bold">
                                    Quantity:
                                    <BlockPlaceholder
                                        width={100}
                                        height={15}
                                        borderRadius={5}
                                        status={true}
                                        count={1}
                                        className="m-0 ml-2"
                                    />
                                </div>
                                <div className="price c-red font-bold mt-2">
                                    $
                                    <BlockPlaceholder
                                        width={50}
                                        height={15}
                                        borderRadius={5}
                                        status={true}
                                        count={1}
                                        className="m-0 ml-2"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoadingOrderBlock;
