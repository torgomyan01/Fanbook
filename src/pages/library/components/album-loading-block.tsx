import React from 'react';
import { Link } from 'react-router-dom';
import BlockPlaceholder from 'features/block-placeholder';

function AlbumLoadingBlock() {
    return (
        <div className="col-xl-3 col-lg-4 col-sm-6 col-12 mb-xl-0 mb-3 mt-3 mr-3">
            <div className="photo-box trans">
                <div className="d-flex mt-2">
                    <BlockPlaceholder
                        width={140}
                        height={100}
                        borderRadius={10}
                        status={true}
                        count={2}
                        className="m-0 mr-2"
                    />
                </div>
                <div className="d-flex mt-2">
                    <BlockPlaceholder
                        width={140}
                        height={100}
                        borderRadius={10}
                        status={true}
                        count={2}
                        className="m-0 mr-2"
                    />
                </div>
                <div className="d-flex align-items-center justify-content-between pt-2">
                    <Link
                        to="#"
                        className="d-flex c-black flex-column justify-content-between">
                        <h3 className="mb-0 fs18 f-omnesMedium">
                            <BlockPlaceholder
                                width={160}
                                height={20}
                                borderRadius={5}
                                status={true}
                                count={1}
                                className="m-0 mb-2"
                            />
                        </h3>
                        <span className="c-gray fs15 f-myriadproreg">
                            <BlockPlaceholder
                                width={120}
                                height={18}
                                borderRadius={5}
                                status={true}
                                count={1}
                                className="m-0"
                            />
                        </span>
                    </Link>
                    <div className="d-flex align-items-center" />
                </div>
            </div>
        </div>
    );
}

export default AlbumLoadingBlock;
