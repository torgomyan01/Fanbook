import React, { useEffect, useRef, useState } from 'react';
import {
    addLikeAlbumImages,
    DownloadFile,
    RemoveLikeAlbumImages
} from 'api/all-apis';
import { modalOpenClose, setImage } from 'redux/preveiw-image';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import {
    checkPublisher,
    createImageCanvas,
    goToBuy,
    setMessageUser
} from 'utils/helpers';
import { UM } from 'utils/user-messages';
import CheckInCard from 'features/CheckInCard/check-in-card';

interface IThisProps {
    img: IAlbumFiles;
    albumID: string;
    goLike: any;
}

function AlbumBlockDigital({ img, albumID, goLike }: IThisProps) {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: IAuth) => state.sign.user.profile);

    const [muLike, setMyLike] = useState<boolean>(img.isLiked);
    const [likeLoading, setLikeLoading] = useState<boolean>(false);

    function likeProduct() {
        const FileID = img.id;

        if (muLike) {
            setLikeLoading(true);
            dispatch(setMessageUser(UM.P_W));
            RemoveLikeAlbumImages(albumID, FileID).then(() => {
                setLikeLoading(false);
                setMyLike(false);
                dispatch(setMessageUser(UM.FOR_RATING));
                goLike(img);
            });
        } else {
            setLikeLoading(true);
            dispatch(setMessageUser(UM.P_W));

            addLikeAlbumImages(albumID, FileID).then(() => {
                setLikeLoading(false);
                setMyLike(true);
                dispatch(setMessageUser(UM.FOR_RATING));
                goLike(img);
            });
        }
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
    const isEditTable = checkPublisher(img?.userId, userInfo?.id);

    const [buyLoading, setBuyLoading] = useState<boolean>(false);
    function BuyImage() {
        setBuyLoading(true);
        dispatch(
            goToBuy(
                img?.userId,
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

    const imgBlock = useRef<any>(null);

    useEffect(() => {
        if (imgBlock.current) {
            createImageCanvas(img.url, 500, 400, false).then((res: any) => {
                const canvas = res;
                canvas.classList.add('canvas__album');
                imgBlock?.current?.append(canvas);
            });
        }
    }, [img]);

    return (
        <div key={img.id} className="col-xl-3 col-lg-3 col-sm-5 col-12  mb-4">
            <div className="content-box trans">
                <div ref={imgBlock} className="img-box">
                    <div
                        className="p-2 d-flex justify-content-between position-relative"
                        style={{ zIndex: 1 }}>
                        <span className="price-box">${img.price}</span>
                        <span
                            className="heart-box"
                            style={{ color: muLike ? '#b02029' : '#a7a7a7' }}
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
                            width: img.isBought
                                ? '50%'
                                : isEditTable
                                ? '100%'
                                : '50%'
                        }}
                        className="preview-btn text-center d-inline-block fs16 c-black f-myriadproreg mr-2 trans m-auto">
                        <i className="far fa-eye mr-2" />
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
                        !isEditTable && (
                            <span
                                className={`buy-btn text-center d-inline-block fs16 c-black f-myriadproreg trans m-auto ${
                                    buoyed && 'bgc-red c-white border-0'
                                }`}
                                onClick={BuyImage}>
                                {buyLoading ? (
                                    <Spinner
                                        animation="border"
                                        variant="light"
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
                </div>
            </div>
        </div>
    );
}

export default AlbumBlockDigital;
