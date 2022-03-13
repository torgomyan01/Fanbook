import React, { useEffect, useRef, useState } from 'react';
import { modalOpenClose, setImage } from 'redux/preveiw-image';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import {
    checkPublisher,
    createImageCanvas,
    goToBuy,
    likeAlbumFile,
    setMessageUser
} from 'utils/helpers';
import { UM } from 'utils/user-messages';
import CheckInCard from 'features/CheckInCard/check-in-card';
import { CircularProgress } from '@material-ui/core';
import { DeleteImage, DownloadFile } from 'api/all-apis';

interface IThisProps {
    album: IAlbum;
    img: IAlbumFiles;
    addLikeArray: any;
}

function AlbumBlock({ img, addLikeArray, album }: IThisProps) {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: IAuth) => state.sign.user.profile);

    const [muLike, setMyLike] = useState<boolean>(false);
    const [likeLoading, setLikeLoading] = useState<boolean>(false);

    const imgBlock = useRef<any>(null);

    useEffect(() => {
        setMyLike(img.isLiked);
        if (imgBlock.current) {
            createImageCanvas(img.url, 500, 400, false).then((res: any) => {
                const canvas = res;
                canvas.classList.add('canvas__album');
                imgBlock?.current?.append(canvas);
            });
        }
    }, [img]);

    function likeProduct() {
        setLikeLoading(true);
        dispatch(setMessageUser(UM.P_W));

        likeAlbumFile(img, muLike, (res: boolean) => {
            setMyLike(res);
            dispatch(setMessageUser(UM.FOR_RATING));
            addLikeArray && addLikeArray();
        });
    }

    function viewPhoto(e: any) {
        e.preventDefault();
        dispatch(modalOpenClose(true));
        dispatch(
            setImage({
                name: img.name,
                url: img.url
            })
        );
    }

    const isEditTable = checkPublisher(album?.userId, userInfo?.id);

    const [buyLoading, setBuyLoading] = useState<boolean>(false);
    const [bayBook, setBayBook] = useState(false);
    function buyThisImage() {
        setBuyLoading(true);
        setBayBook(true);
        setTimeout(() => setBayBook(false), 900);
        dispatch(
            goToBuy(
                album?.userId,
                userInfo?.id,
                {
                    entityType: 'AlbumFile',
                    entityId: img.id,
                    qty: 1
                },
                () => setBuyLoading(false)
            )
        );
    }
    const [buoyed, setBuoyed] = useState<boolean>(false);

    const imgFans = checkPublisher(img?.userId, album?.userEvent?.userId);

    const [downloadLoading, setDownloadLoading] = useState<boolean>(false);
    function downloadImage() {
        setDownloadLoading(true);
        DownloadFile({
            files: [img.id]
        })
            .then((res) => {
                const url = res.data.data.item.url;
                window.open(url, '_target');
                setDownloadLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setDownloadLoading(false);
            });
    }

    const [loadingDeleted, setLoadingDeleted] = useState<boolean>(false);
    function deleteAlbumImages() {
        setLoadingDeleted(true);
        DeleteImage(album.id, {
            ids: [img.id]
        })
            .then((res) => {
                console.log(res);
                setLoadingDeleted(false);
            })
            .catch((err) => {
                console.log(err);
                setLoadingDeleted(false);
            });
    }
    function Block() {
        return (
            <div className="content-box trans">
                <div ref={imgBlock} className="img-box">
                    <div
                        className="p-2 d-flex justify-content-between position-relative"
                        style={{ zIndex: 1 }}>
                        <span className="price-box">${img.price}</span>
                        <span
                            className="heart-box"
                            style={{ color: muLike ? '#b12029' : '#a7a7a7' }}
                            onClick={likeProduct}
                            data-id={img.id}>
                            {likeLoading ? (
                                <Spinner
                                    className="ml-0"
                                    animation="border"
                                    variant="secondary"
                                />
                            ) : (
                                <i className="fas fa-heart" data-id={img.id} />
                            )}
                        </span>
                    </div>
                </div>
                <div className="content-box_txt ">
                    <span
                        onClick={viewPhoto}
                        data-url={img.url}
                        data-name={img.name}
                        style={{
                            width: '50%'
                        }}
                        className="preview-btn text-center d-inline-block fs16 c-black f-myriadproreg mr-2 trans m-auto">
                        <i className="fas fa-eye mr-2" />
                        Preview
                    </span>
                    {img.isBought ? (
                        <span
                            className="buy-btn text-center d-flex justify-content-center align-items-center fs16 c-black f-myriadproreg m-auto"
                            onClick={downloadImage}>
                            {downloadLoading ? (
                                <Spinner
                                    animation="border"
                                    variant="light"
                                    className="mr-2"
                                />
                            ) : (
                                <i className="fas fa-download mr-2" />
                            )}
                            Download
                        </span>
                    ) : (
                        album?.userEvent &&
                        !isEditTable &&
                        imgFans && (
                            <span
                                className={`buy-btn text-center d-flex justify-content-center align-items-center fs16 c-black f-myriadproreg m-auto ${
                                    buoyed && 'bgc-red c-white border-0'
                                }`}
                                onClick={buyThisImage}>
                                {buyLoading ? (
                                    <CircularProgress
                                        size={20}
                                        thickness={5}
                                        className="mr-2"
                                    />
                                ) : (
                                    <i className="fas fa-shopping-cart mr-2" />
                                )}
                                <CheckInCard
                                    productID={img.id}
                                    price={null}
                                    buyName={null}
                                    buoyed={(res: boolean) => setBuoyed(res)}
                                />
                            </span>
                        )
                    )}
                    {img.userId === userInfo?.id && (
                        <span
                            className="buy-btn text-center d-flex justify-content-center align-items-center fs16 c-black f-myriadproreg m-auto"
                            onClick={deleteAlbumImages}>
                            {loadingDeleted ? (
                                <Spinner
                                    animation="border"
                                    variant="dark"
                                    className="mr-2"
                                />
                            ) : (
                                <i className="fas fa-trash-alt mr-2" />
                            )}
                            Delete
                        </span>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div
            key={img.id}
            className="col-xl-2 col-lg-4 col-sm-6 col-12 mb-4 position-relative">
            <Block />
            {bayBook && (
                <div className="buy-block-animation">
                    <Block />
                </div>
            )}
        </div>
    );
}

export default AlbumBlock;
