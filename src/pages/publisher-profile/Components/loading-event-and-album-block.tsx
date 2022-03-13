import React from 'react';
import { Link } from 'react-router-dom';
import BlockPlaceholder from 'features/block-placeholder';

function LoadingEventAndAlbumBlock() {
    return (
        <div className="col-12">
            <div className="album-box">
                <div className="mr-3 mb-sm-0 mb-3" style={{ width: '180px' }}>
                    <BlockPlaceholder
                        width={180}
                        height={180}
                        borderRadius={5}
                        status={true}
                        count={1}
                        className="img-icon m-0 mb-2"
                    />
                    <Link to="" className="see-btn">
                        See More
                    </Link>
                </div>
                <div className="txt-box">
                    <p className="txt-box_txt">
                        <BlockPlaceholder
                            width={200}
                            height={20}
                            borderRadius={5}
                            status={true}
                            count={1}
                            className="m-0"
                        />
                    </p>
                    <h2 className="txt-box_title">
                        <BlockPlaceholder
                            width={350}
                            height={25}
                            borderRadius={5}
                            status={true}
                            count={1}
                            className="m-0"
                        />
                    </h2>
                    <ul className="mb-0">
                        <li className="d-flex album-list_item">
                            <BlockPlaceholder
                                width={50}
                                height={50}
                                borderRadius={5}
                                status={true}
                                count={1}
                                className="m-0 mr-2"
                            />
                            <div className="d-flex flex-column justify-content-between mr-3">
                                <span className="album-txt font-bold">
                                    <BlockPlaceholder
                                        width={120}
                                        height={20}
                                        borderRadius={5}
                                        status={true}
                                        count={1}
                                        className="m-0"
                                    />
                                </span>
                                <span className="photo-txt ">
                                    <BlockPlaceholder
                                        width={100}
                                        height={20}
                                        borderRadius={5}
                                        status={true}
                                        count={1}
                                        className="m-0"
                                    />
                                </span>
                            </div>
                            <div className="d-flex flex-column justify-content-end">
                                <Link to="#" className="see-link">
                                    See All Photos
                                </Link>
                            </div>
                        </li>
                        <li className="d-flex album-list_item">
                            <BlockPlaceholder
                                width={50}
                                height={50}
                                borderRadius={5}
                                status={true}
                                count={1}
                                className="m-0 mr-2"
                            />
                            <div className="d-flex flex-column justify-content-between mr-3">
                                <span className="album-txt font-bold">
                                    <BlockPlaceholder
                                        width={120}
                                        height={20}
                                        borderRadius={5}
                                        status={true}
                                        count={1}
                                        className="m-0"
                                    />
                                </span>
                                <span className="photo-txt ">
                                    <BlockPlaceholder
                                        width={100}
                                        height={20}
                                        borderRadius={5}
                                        status={true}
                                        count={1}
                                        className="m-0"
                                    />
                                </span>
                            </div>
                            <div className="d-flex flex-column justify-content-end">
                                <Link to="#" className="see-link">
                                    See All Photos
                                </Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default LoadingEventAndAlbumBlock;
