import React, { useEffect, useRef, useState } from 'react';

import { Link } from 'react-router-dom';
import { DEF_URL } from 'utils/urls';
import { Dropdown, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { keyGenerator, setMessageUser, userProfile } from 'utils/helpers';
import DefaultImage from '../images/default-image.jpg';
import { returnRemoveAlbum } from 'api/all-apis';
import { UM } from 'utils/user-messages';

interface IThisProps {
    files: any;
    deletedId: any;
}

function GridBlockModal({ files, deletedId }: IThisProps) {
    const dispatch = useDispatch();
    const User = userProfile();
    const [image, setImage] = useState<any>([]);

    useEffect(() => {
        setImage([
            `${files?.albumFiles[0] ? files.albumFiles[0].url : DefaultImage}`,
            `${files?.albumFiles[1] ? files.albumFiles[1].url : DefaultImage}`,
            `${files?.albumFiles[2] ? files.albumFiles[2].url : DefaultImage}`,
            `${files?.albumFiles[3] ? files.albumFiles[3].url : DefaultImage}`
        ]);
    }, [files]);

    const [Loading, setLoading] = useState(false);
    const thisBlock = useRef<any>(null);
    function ReturnDeleted() {
        setLoading(true);
        dispatch(setMessageUser(UM.P_W));
        returnRemoveAlbum(files.id).then(function () {
            setLoading(false);
            deletedId(files.id);
            dispatch(setMessageUser(UM.THANK_TRUSTING));
        });
    }

    return (
        <div
            ref={thisBlock}
            key={keyGenerator(30)}
            className="col-xl-3 col-lg-4 col-sm-6 col-12 mb-xl-0 mb-3 mt-3">
            <div className="photo-box trans">
                <div className="d-flex mt-2">
                    <span
                        className="photo-img mr-2"
                        style={{
                            backgroundImage: `url(${image[0]})`
                        }}
                    />
                    <span
                        className="photo-img"
                        style={{
                            backgroundImage: `url(${image[1]})`
                        }}
                    />
                </div>
                <div className="d-flex mt-2">
                    <span
                        className="photo-img mr-2"
                        style={{
                            backgroundImage: `url(${image[2]})`
                        }}
                    />
                    <span
                        className="photo-img"
                        style={{
                            backgroundImage: `url(${image[3]})`
                        }}
                    />
                    {/*<span className="c-white fs19 f-myriadproreg">+130</span>*/}
                </div>
                <div className="d-flex align-items-center justify-content-between pt-2">
                    <Link
                        to={`${DEF_URL.ALBUM}/${files.id}`}
                        className="d-flex c-black flex-column justify-content-between">
                        <h3 className="mb-0 fs18 f-omnesMedium">
                            {files.name.length > 12
                                ? `${files.name.substr(0, 12)}...`
                                : files.name}
                        </h3>
                        <span className="c-gray fs15 f-myriadproreg">
                            {files.albumFiles?.length} photos
                        </span>
                    </Link>
                    <div className="d-flex align-items-center">
                        {files.userId === User?.id && (
                            <Dropdown>
                                <Dropdown.Toggle variant="outline-light">
                                    <FontAwesomeIcon
                                        icon={faEllipsisV}
                                        className="c-gray fs18"
                                    />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item
                                        to="#"
                                        onClick={ReturnDeleted}>
                                        {Loading ? (
                                            <Spinner
                                                animation="border"
                                                variant="danger"
                                            />
                                        ) : (
                                            <i className="fas fa-undo-alt mr-2 c-red" />
                                        )}
                                        Return Deleted
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GridBlockModal;
