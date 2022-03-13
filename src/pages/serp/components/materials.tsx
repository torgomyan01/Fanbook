import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEye,
    faShoppingBag,
    faShoppingCart
} from '@fortawesome/free-solid-svg-icons';

import { useDispatch, useSelector } from 'react-redux';
import { modalOpenClose, setImage } from 'redux/preveiw-image';
import { keyGenerator } from 'utils/helpers';

interface ThisProps {
    Bought: boolean;
    file: any;
}

function Materials({ Bought, file }: ThisProps) {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: IAuth) => state.sign.user.profile);

    function viewPhotos() {
        dispatch(modalOpenClose(true));
        dispatch(setImage(file));
    }

    return (
        <div
            key={keyGenerator(30)}
            className="col-xl-2 col-lg-4 col-sm-6 col-12  mb-4">
            <div className="content-box trans">
                <div
                    className="img-box"
                    style={{ backgroundImage: `url(${file.url})` }}
                    data-toggle="modal"
                    data-target="#buy-modal"
                />
                <div className="content-box_txt ">
                    <Link
                        onClick={viewPhotos}
                        to="#"
                        className={
                            userInfo?.id !== file.userId
                                ? 'preview-btn text-center d-inline-block fs16 c-black f-myriadproreg mr-2 trans m-auto'
                                : 'preview-btn text-center d-inline-block fs16 c-black f-myriadproreg mr-2 trans m-auto w-100'
                        }>
                        <FontAwesomeIcon
                            icon={faEye}
                            className="mr-2 c-primary"
                        />
                        Preview
                    </Link>
                    {userInfo?.id !== file.userId && (
                        <Link
                            to="#"
                            className="buy-btn text-center d-inline-block fs16 c-black f-myriadproreg trans m-auto">
                            {Bought ? (
                                <>
                                    <FontAwesomeIcon
                                        icon={faShoppingBag}
                                        className="mr-2 green-shop"
                                        color="#6fd068"
                                    />
                                    Bought
                                </>
                            ) : (
                                <>
                                    <FontAwesomeIcon
                                        icon={faShoppingCart}
                                        className="mr-2 c-primary"
                                    />
                                    Buy
                                </>
                            )}
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Materials;
