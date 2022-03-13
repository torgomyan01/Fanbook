import React, { useEffect, useState } from 'react';
import {
    checkPublisher,
    goToBuy,
    keyGenerator,
    likeAlbumFile,
    setMessageUser
} from 'utils/helpers';
import { Link } from 'react-router-dom';
import { modalOpenClose, setImage } from 'redux/preveiw-image';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { UM } from 'utils/user-messages';
import CheckInCard from 'features/CheckInCard/check-in-card';

interface IThisProps {
    image: IAlbumFiles;
}

function ImageBlockLibraryPage({ image }: IThisProps) {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: IAuth) => state.sign.user.profile);
    function viewPhoto(e: any) {
        e.preventDefault();
        dispatch(modalOpenClose(true));
        dispatch(
            setImage({
                name: 'image',
                url: image.url
            })
        );
    }

    const [buyProdLoading, setBuyProdLoading] = useState<boolean>(false);
    function buyThisImage() {
        setBuyProdLoading(true);
        dispatch(
            goToBuy(
                image?.userId,
                userInfo?.id,
                {
                    entityType: 'AlbumFile',
                    entityId: image.id,
                    qty: 1
                },
                () => setBuyProdLoading(false)
            )
        );
    }

    const [muLike, setMyLike] = useState<boolean>(false);
    const [likeLoading, setLikeLoading] = useState<boolean>(false);

    useEffect(() => {
        setMyLike(image.isLiked);
    }, [image]);

    function likeProduct() {
        setLikeLoading(true);
        dispatch(setMessageUser(UM.P_W));

        likeAlbumFile(image, muLike, (res: boolean) => {
            dispatch(setMessageUser(UM.FOR_RATING));
            setMyLike(res);
            setLikeLoading(false);
        });
    }
    const isEditTable = checkPublisher(image?.userId, userInfo?.id);

    const [buoyed, setBuoyed] = useState<boolean>(false);
    return (
        <div
            key={keyGenerator(30)}
            className="col-xl-2 col-lg-4 col-sm-6 col-12 mb-xl-0 mb-2">
            <div className="content-box trans">
                <div
                    className="img-box"
                    style={{
                        backgroundImage: `url(${image?.url})`
                    }}>
                    <div className="p-2 d-flex justify-content-between">
                        <span className="price-box">${image.price}</span>
                        <span
                            className="heart-box"
                            style={{ color: muLike ? '#b12029' : '#a7a7a7' }}
                            onClick={likeProduct}
                            data-id={image.id}>
                            {likeLoading ? (
                                <Spinner
                                    className="ml-0"
                                    animation="border"
                                    variant="secondary"
                                />
                            ) : (
                                <i
                                    className="fas fa-heart"
                                    data-id={image.id}
                                />
                            )}
                        </span>
                    </div>
                </div>
                <div className="content-box_txt">
                    <Link
                        to="#"
                        onClick={viewPhoto}
                        data-url={image?.url}
                        className={`preview-btn text-center d-inline-block fs16 c-black f-myriadproreg mr-2 trans m-auto ${
                            isEditTable && 'w-100'
                        }`}>
                        <i className="far fa-eye mr-2 c-black" />
                        Preview
                    </Link>
                    {!isEditTable && (
                        <span
                            className={`buy-btn text-center d-inline-block fs16 c-black f-myriadproreg trans m-auto ${
                                buoyed && 'bgc-red c-white'
                            }`}
                            onClick={buyThisImage}>
                            {buyProdLoading ? (
                                <Spinner
                                    animation="border"
                                    variant="danger"
                                    className="mr-2"
                                />
                            ) : (
                                <i className="fas fa-shopping-cart mr-2" />
                            )}
                            <CheckInCard
                                productID={image.id}
                                price={null}
                                buyName={null}
                                buoyed={(res: boolean) => setBuoyed(res)}
                            />
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ImageBlockLibraryPage;
