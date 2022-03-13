import React from 'react';
import BlockPlaceholder from 'features/block-placeholder';

function OrderHistoryLoading() {
    return (
        <div className="order-block">
            <div className="row">
                <h4 className="order-number-profile-page fs15">
                    Order number{' '}
                    <span className="font-bold">
                        <BlockPlaceholder
                            width={200}
                            height={20}
                            borderRadius={5}
                            status={true}
                            count={1}
                            className="m-0 ml-3"
                        />
                    </span>
                </h4>
            </div>
            <div className="row order-information-my-profile-page">
                <span className="ordered-on">Ordered on</span>
                <span className="data">
                    <BlockPlaceholder
                        width={110}
                        height={20}
                        borderRadius={5}
                        status={true}
                        count={1}
                        className="m-0 ml-1"
                    />
                </span>
                <span className="price">
                    Price:{' '}
                    <span className="c-red font-bold">
                        <BlockPlaceholder
                            width={60}
                            height={20}
                            borderRadius={5}
                            status={true}
                            count={1}
                            className="m-0"
                        />
                    </span>
                </span>
            </div>
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
                                width={100}
                                height={20}
                                borderRadius={5}
                                status={true}
                                count={1}
                                className="m-0"
                            />
                        </div>
                        <div className="product-event-and-status">
                            <span className="name">
                                <BlockPlaceholder
                                    width={300}
                                    height={20}
                                    borderRadius={5}
                                    status={true}
                                    count={1}
                                    className="m-0"
                                />
                            </span>
                        </div>
                        <div className="price c-red font-bold mt-1">
                            <BlockPlaceholder
                                width={50}
                                height={20}
                                borderRadius={5}
                                status={true}
                                count={1}
                                className="m-0"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="row justify-content-end border-bottom w-100">
                <div className="mr-4 text-right">
                    {/*<p className="c-gray font-bold">*/}
                    {/*    Delivery:*/}
                    {/*</p>*/}
                    <p className="c-red font-bold">Total Order Value:</p>
                </div>
                <div className="text-left mr-5">
                    {/*<p className="c-gray font-bold">*/}
                    {/*    Free Delivery*/}
                    {/*</p>*/}
                    <p className="c-red font-bold">
                        <BlockPlaceholder
                            width={50}
                            height={20}
                            borderRadius={5}
                            status={true}
                            count={1}
                            className="m-0"
                        />
                    </p>
                </div>
            </div>
        </div>
    );
}

export default OrderHistoryLoading;
