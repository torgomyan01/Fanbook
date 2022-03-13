import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ReactPlayer from 'react-player';
import ModalVViewVideo from 'pages/fp-events-list-view/modal-view-video/modal-view-video';
import randomBackground, {
    eventUrlPublicPrivate,
    setMessageUser,
    userAvatarName
} from 'utils/helpers';
import { DEF_URL } from 'utils/urls';
import { AddAllImagesEventToCart } from 'api/all-apis';
import CheckInCard from 'features/CheckInCard/check-in-card';
import { UM } from 'utils/user-messages';
import { allProducts, setNewCard } from 'redux/site-card';
import { Spinner } from 'react-bootstrap';

interface IThisAlbum {
    albums: OneAlbum[];
}

function EventBlockDigital({ albums }: IThisAlbum) {
    const dispatch = useDispatch();
    const thisEvent = useSelector(
        (state: IEvents) => state.events.currentEvent
    );
    const myPlan = useSelector((state: IAuth) => state.sign.myPlans);
    const [modalShow, setModalShow] = useState(false);
    const [videoURl, setVideoUrl] = useState('');
    const [evName, setEvName] = useState('');

    function playVideo() {
        setModalShow(true);
        setVideoUrl(thisEvent.videoURL);
        setEvName(thisEvent.name);
    }

    const [albumCount, setAlbumCount] = useState(0);
    useEffect(() => {
        setAlbumCount(0);
        let total = 0;
        albums?.map((album: OneAlbum) => {
            total = total + album.albumFiles.length;
            setAlbumCount(total);
        });
    }, [albums]);

    const [buoyed, setBuoyed] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);
    function AddAllImagesEventToCard(e: any) {
        e.preventDefault();
        setLoading(true);
        AddAllImagesEventToCart({
            groups: [
                {
                    type: 'EventOfficialAlbums',
                    options: {
                        userEventId: thisEvent.id
                    }
                }
            ]
        })
            .then((res) => {
                setLoading(false);
                dispatch(setMessageUser(UM.PROD_ADDED_CARD));
                dispatch(setNewCard(res.data.data.item.items.length));
                dispatch(allProducts(res.data.data.item.items));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className="book-block">
            <div className="container-fluid wrapper1">
                <div className="row">
                    <div className="col-lg-4 col-sm-7 col-12 order-md-0 ">
                        {thisEvent?.coverURL ? (
                            <div
                                className="img-box"
                                style={{
                                    backgroundImage: `url(${thisEvent.coverURL})`
                                }}
                            />
                        ) : (
                            <div className="img-box create-book-video-block">
                                <ReactPlayer
                                    height="100%"
                                    url={thisEvent.videoURL}
                                />
                                <i
                                    className="fas fa-play-circle"
                                    onClick={playVideo}
                                />
                            </div>
                        )}
                    </div>
                    <div className="col-md-5  order-lg-1 order-sm-2  ">
                        <div className="snorkel-box">
                            <p className="snorkel-box-title fs35 f-omnesMedium mb-3">
                                {thisEvent.name}
                            </p>

                            <p className="fs17 f-myriadprolight lh-14 mb-5">
                                {thisEvent.description}
                            </p>

                            <div className="d-flex flex-column justify-content-between ">
                                {/*<h2 className="fs20 lh-07 mb-2 f-omnesMedium">*/}
                                {/*    {thisEvent.name}*/}
                                {/*</h2>*/}
                                <Link
                                    to={`${DEF_URL.PUBLISHER_PROFILE}/${thisEvent?.user?.id}`}>
                                    <p className="library-txt fs18 mb-3">
                                        {' '}
                                        By:
                                        <span className="c-red b-bottom ml-2">
                                            {
                                                thisEvent?.user.publisherProfile
                                                    ?.name
                                            }
                                        </span>
                                    </p>
                                </Link>

                                <Link
                                    to={eventUrlPublicPrivate(thisEvent)}
                                    className="event-btn fs17 trans">
                                    Go to Event page
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-5   order-lg-2 order-sm-1 ">
                        <div className="total-box">
                            <div className="d-flex justify-content-between mb-3">
                                <div className="total-box_txt">
                                    <h3 className="total-box_title f-omnesMedium">
                                        Total Photos
                                    </h3>
                                    <span className="fs23 f-myriadproreg mb-4 d-inline-block">
                                        {albumCount}
                                    </span>
                                    <h3 className="total-box_title f-omnesMedium">
                                        Price from:
                                    </h3>
                                    <span className="d-inline-block fs23 c-red f-omnesMedium">
                                        $23.50
                                    </span>
                                </div>
                                <div
                                    className="total-box_img"
                                    style={{
                                        background:
                                            thisEvent?.user?.publisherProfile
                                                ?.avatarURL !== null
                                                ? `url(${thisEvent?.user?.publisherProfile?.avatarURL})`
                                                : randomBackground(),
                                        boxShadow: 'unset'
                                    }}>
                                    {!thisEvent?.user?.publisherProfile
                                        ?.avatarURL &&
                                        userAvatarName(thisEvent?.user)}
                                </div>
                            </div>
                            {myPlan?.options?.digitalDownloads && (
                                <Link
                                    to="#"
                                    className={`event-btn fs17 trans ${
                                        buoyed ? 'bgc-red c-white' : 'c-red'
                                    }`}
                                    onClick={AddAllImagesEventToCard}>
                                    {loading ? (
                                        <Spinner
                                            animation="border"
                                            variant="danger"
                                            className="mr-3"
                                        />
                                    ) : (
                                        <i className="fas fa-book mr-3" />
                                    )}

                                    <CheckInCard
                                        productID={thisEvent.id}
                                        price={null}
                                        buyName="Buy All Photos"
                                        buoyed={(res: boolean) =>
                                            setBuoyed(res)
                                        }
                                    />
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <ModalVViewVideo
                eventName={evName}
                videoLink={videoURl}
                closeModal={() => {
                    setModalShow(false);
                }}
                modalShow={modalShow}
            />
        </div>
    );
}

export default EventBlockDigital;
