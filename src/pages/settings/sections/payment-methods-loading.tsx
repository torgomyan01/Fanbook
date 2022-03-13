import React from 'react';
import BlockPlaceholder from 'features/block-placeholder';

function PaymentMethodsLoading() {
    return (
        <div className="accordion-card collapsed border-bottom">
            <div className="d-flex align-items-center justify-content-between">
                <div className="d-sm-flex align-items-center">
                    <span className="mr-4 mb-sm-0 mb-2 fs40 c-red">
                        <BlockPlaceholder
                            width={60}
                            height={40}
                            borderRadius={5}
                            status={true}
                            count={1}
                            className="m-0"
                        />
                    </span>
                    <div className="accord-txt-box d-flex flex-column justify-content-between mr-4 mb-sm-0 mb-2">
                        <h3 className="card-title">
                            <BlockPlaceholder
                                width={110}
                                height={20}
                                borderRadius={5}
                                status={true}
                                count={1}
                                className="m-0"
                            />
                        </h3>
                        <p className="card-pretitle">
                            Expiration:{' '}
                            <BlockPlaceholder
                                width={50}
                                height={20}
                                borderRadius={5}
                                status={true}
                                count={1}
                                className="m-0 ml-1"
                            />
                        </p>
                    </div>
                    <div className="d-flex flex-column justify-content-between">
                        <h3 className="card-title">
                            {' '}
                            ****
                            <BlockPlaceholder
                                width={40}
                                height={20}
                                borderRadius={5}
                                status={true}
                                count={1}
                                className="m-0 ml-1"
                            />
                        </h3>
                        <p className="card-pretitle">
                            Added:{' '}
                            <BlockPlaceholder
                                width={110}
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
        </div>
    );
}

export default PaymentMethodsLoading;
