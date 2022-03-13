import React from 'react';
import { Link } from 'react-router-dom';
import BlockPlaceholder from 'features/block-placeholder';

function ProductsLoading() {
    return (
        <li className="card-item">
            <div className="d-flex">
                <BlockPlaceholder
                    width={90}
                    height={90}
                    borderRadius={5}
                    status={true}
                    count={1}
                    className="m-0 mr-3"
                />
                <div className="txt-box">
                    <Link to="#" className="fs15 c-gray mb-1">
                        <BlockPlaceholder
                            width={150}
                            height={14}
                            borderRadius={5}
                            status={true}
                            count={1}
                            className="m-0"
                        />
                    </Link>
                    <Link to="#" className="c-black">
                        <h2 className="f-omnesMedium fs19 mb-2 mt-1">
                            <BlockPlaceholder
                                width={120}
                                height={14}
                                borderRadius={5}
                                status={true}
                                count={1}
                                className="m-0"
                            />
                        </h2>
                    </Link>
                    <p className="fs15 c-red f-omnesMedium mb-2">
                        <BlockPlaceholder
                            width={30}
                            height={14}
                            borderRadius={5}
                            status={true}
                            count={1}
                            className="m-0"
                        />
                    </p>
                    <div className="d-flex justify-content-start align-items-center mt-2">
                        <BlockPlaceholder
                            width={110}
                            height={16}
                            borderRadius={5}
                            status={true}
                            count={1}
                            className="m-0"
                        />
                    </div>
                </div>
            </div>
            <ul>
                <li className="mb-1">
                    <BlockPlaceholder
                        width={100}
                        height={28}
                        borderRadius={5}
                        status={true}
                        count={1}
                        className="m-0"
                    />
                </li>
                <li>
                    <BlockPlaceholder
                        width={100}
                        height={28}
                        borderRadius={5}
                        status={true}
                        count={1}
                        className="m-0"
                    />
                </li>
            </ul>
        </li>
    );
}

export default ProductsLoading;
