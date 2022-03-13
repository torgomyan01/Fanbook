import React, { useEffect, useRef, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { addLikeAlbumImages, RemoveLikeAlbumImages } from 'api/all-apis';
import { checkPublisher, createImageCanvas, goToBuy } from 'utils/helpers';
import { useDispatch, useSelector } from 'react-redux';

const SingleImage = ({
    img,
    index,
    album
}: {
    img: IAlbumFiles;
    index: number;
    album: OneAlbum;
}) => {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: IAuth) => state.sign.user.profile);
    const event = useSelector((state: IEvents) => state.events.currentEvent);
    const [LikeProcessAlbum, setLikeProcessAlbum] = useState(false);
    const [BuyLoading, setBuyLoading] = useState<boolean>(false);
    const [Like, setLike] = useState(img.isLiked);
    const iAmBuoyed = checkPublisher(userInfo?.id, album?.userId);

    function likeAlbumFile() {
        setLikeProcessAlbum(true);
        if (Like) {
            RemoveLikeAlbumImages(img.albumId, img.id).then(() => {
                setLike(false);
                setLikeProcessAlbum(false);
            });
        } else {
            addLikeAlbumImages(img.albumId, img.id).then(() => {
                setLike(true);
                setLikeProcessAlbum(false);
            });
        }
    }

    function buyThisImage() {
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
                function () {
                    setBuyLoading(false);
                }
            )
        );
    }

    const imgBlock = useRef<any | HTMLElement>(null);
    useEffect(() => {
        imgBlock.current!.innerHTML = '';
        if (imgBlock && imgBlock.current) {
            createImageCanvas(img.url, 300, 300, false).then((res: any) => {
                imgBlock?.current?.append(res);
            });
        }
    }, [img, imgBlock]);

    return (
        <div
            className="col-20 col-lg-3 col-sm-4 col-6 my-col text-center"
            key={index}>
            <div className="img-box trans">
                <div ref={imgBlock} className="album-images-event-view-page" />
                <div className="img-box_hover trans">
                    <ul className="list-unstyled mb-0">
                        {event.id && !iAmBuoyed && (
                            <li className="d-inline-block mr-1">
                                <span className="round">
                                    {BuyLoading ? (
                                        <Spinner
                                            animation="border"
                                            variant="danger"
                                            className="m-0"
                                        />
                                    ) : (
                                        <i
                                            className="fas fa-shopping-cart c-blue"
                                            onClick={buyThisImage}
                                        />
                                    )}
                                </span>
                            </li>
                        )}

                        <li className="d-inline-block">
                            <span className="round">
                                {LikeProcessAlbum ? (
                                    <Spinner
                                        animation="border"
                                        variant="danger"
                                        className="ml-0"
                                    />
                                ) : (
                                    <i
                                        className={`fas fa-heart ${
                                            Like ? 'c-red' : 'c-gray'
                                        }`}
                                        onClick={likeAlbumFile}
                                    />
                                )}
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SingleImage;
