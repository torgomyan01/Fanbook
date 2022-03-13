import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import randomBackground, {
    countryFlag,
    eventUrlPublicPrivate,
    getEventDate,
    UploadAndEdit,
    userProfile
} from 'utils/helpers';
import { Link } from 'react-router-dom';
import { MAP_PATH } from 'utils/google';
import { ModalToUploadImage, setOpenModalToView } from 'redux/modals';
import uploadIcon from '../images/upload-icon.png';
import ReactPlayer from 'react-player';
import ModalVViewVideo from 'pages/fp-events-list-view/modal-view-video/modal-view-video';
import BlockPlaceholder from 'features/block-placeholder';
import { DEF_URL } from 'utils/urls';

function LibrarySection() {
    const dispatch = useDispatch();
    const event = useSelector((state: IEvents) => state.events.currentEvent);
    const AllFiles = useSelector((state: ILibrary) => state.Library.AllFiles);
    const User = userProfile();

    const modalVideoView = useSelector(
        (state: AllModalSite) => state.AllModalSiteTwo.modalVideVideo
    );

    const [allPhotoLength, setAllPhotoLength] = useState({
        folder: 0,
        images: 0
    });
    useEffect(() => {
        let allLength = 0;
        let AllFolder = 0;
        AllFiles?.map((folder: any) => {
            AllFolder++;
            allLength += folder.albumFiles.length;
            setAllPhotoLength({
                folder: AllFolder,
                images: allLength
            });
        });
    }, [AllFiles]);

    const [YourContent, setYourContent] = useState(0);
    const [OtherUsers, setOtherUsers] = useState(0);

    useEffect(() => {
        let YourContent = 0;
        let OtherUsers = 0;
        AllFiles.map((folder: any) => {
            folder.albumFiles.map((album: OneAlbum) => {
                if (album.userId === User?.id) {
                    YourContent++;
                    setYourContent(YourContent);
                } else {
                    OtherUsers++;
                    setOtherUsers(OtherUsers);
                }
            });
        });
    }, [AllFiles, User?.id]);

    function openModalUpload() {
        dispatch(ModalToUploadImage(UploadAndEdit.upload));
    }

    function openMapsNewWindow() {
        window.open(
            `${MAP_PATH}/${event?.geolocation.country},${
                event.geolocation.city ? event?.geolocation.city : ''
            }`,
            '_blank'
        );
    }

    function playVideo() {
        dispatch(
            setOpenModalToView({
                eventName: event.name,
                videoLink: event.videoURL,
                modalShow: true
            })
        );
    }
    return (
        <section className="library-section pt-5 pb-5">
            <div className="container-fluid wrapper1">
                <div className="row">
                    <div className="col-lg-5 col-12 mb-xl-0 mb-3">
                        {event.name === '' ? (
                            <BlockPlaceholder
                                width={490}
                                height={500}
                                borderRadius={5}
                                status={true}
                                count={1}
                                className="m-0 w-100"
                            />
                        ) : event?.coverURL ? (
                            <div
                                className="img-box h-100"
                                style={{
                                    backgroundImage: `URL(${event.coverURL})`
                                }}
                            />
                        ) : (
                            <div className="event-img-for-library">
                                <ReactPlayer
                                    height="100%"
                                    url={event?.videoURL}
                                />
                                <i
                                    className="fas fa-play-circle"
                                    onClick={playVideo}
                                    data-url={event?.videoURL}
                                    data-name={event?.name}
                                />
                            </div>
                        )}
                    </div>
                    <div className="col-lg-7 col-12">
                        <div className="d-flex mb-40">
                            {event.name === '' ? (
                                <BlockPlaceholder
                                    width={110}
                                    height={110}
                                    borderRadius={10}
                                    status={true}
                                    count={1}
                                    className="m-0 mr-3"
                                />
                            ) : event?.user?.avatarURL ? (
                                <div
                                    className="box mr-3 publisher-img"
                                    style={{
                                        backgroundImage: `URL(${event?.user?.publisherProfile?.avatarURL})`
                                    }}
                                />
                            ) : (
                                <div
                                    className="box mr-3 publisher-img"
                                    style={{ background: randomBackground() }}>
                                    {event?.user?.publisherProfile?.name[0]?.toLocaleUpperCase()}
                                </div>
                            )}

                            <div className="d-flex flex-column">
                                <h2 className="fs35 lh-07 mb-3">
                                    {event.name === '' ? (
                                        <BlockPlaceholder
                                            width={200}
                                            height={25}
                                            borderRadius={5}
                                            status={true}
                                            count={1}
                                            className="m-0"
                                        />
                                    ) : (
                                        event.name
                                    )}
                                </h2>
                                <Link
                                    to={`${DEF_URL.PUBLISHER_PROFILE}/${event?.user?.id}`}>
                                    <p className="library-txt fs18 mb-0">
                                        By:
                                        <span className="c-red b-bottom ml-2">
                                            {event.name === '' ? (
                                                <BlockPlaceholder
                                                    width={100}
                                                    height={15}
                                                    borderRadius={5}
                                                    status={true}
                                                    count={1}
                                                    className="m-0"
                                                />
                                            ) : (
                                                event?.user?.publisherProfile
                                                    ?.name
                                            )}
                                        </span>
                                    </p>
                                </Link>

                                {/*<div className="d-flex mb-sm-0 mb-2">*/}
                                {/*    <Link to="#" className="redbull-btn mr-1">*/}
                                {/*        <img*/}
                                {/*            src={plusCircle}*/}
                                {/*            alt="plus-circle"*/}
                                {/*        />*/}
                                {/*        <span className="ml-2">Follow</span>*/}
                                {/*    </Link>*/}
                                {/*    <Link*/}
                                {/*        to={`${ALL_URL.PUBLISHER}/${event?.publisher.id}`}*/}
                                {/*        className="edit-btn">*/}
                                {/*        <img src={edit} alt="edit" />*/}
                                {/*    </Link>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                        <ul className="librari-list d-sm-flex">
                            <li className="librari-item d-flex flex-column justify-content-between mb-sm-0 mb-2">
                                <p className="f-omnesMedium mb-2 fs20">
                                    Official Photos
                                </p>
                                <p className="f-omnesMedium l-infoPhotos mb-0 fs20">
                                    {allPhotoLength.images}{' '}
                                    <span className="fs15 pl-1 c-gray">
                                        ({allPhotoLength.folder} Albums)
                                    </span>
                                </p>
                            </li>
                            <li className="librari-item d-flex flex-column justify-content-between mb-sm-0 mb-2">
                                <p className="f-omnesMedium mb-2 fs20">
                                    Your Content
                                </p>
                                <p className="f-omnesMedium mb-0 fs20 d-flex align-items-center">
                                    {YourContent}
                                    <img
                                        src={uploadIcon}
                                        alt="upload"
                                        className="ml-2"
                                    />
                                    <span
                                        className="fs15 cursor-pointer ml-1 c-red b-bottom"
                                        onClick={openModalUpload}>
                                        Upload
                                    </span>
                                </p>
                            </li>
                            <li className="librari-item d-flex flex-column justify-content-between mb-sm-0 mb-2">
                                <p className="f-omnesMedium mb-2 fs20">
                                    Other Users
                                </p>
                                <p className="f-omnesMedium mb-0 fs20">
                                    {OtherUsers}
                                </p>
                            </li>
                        </ul>
                        <h3 className="f-myriadproreg c-gray fs16 mb-2">
                            Event:
                        </h3>
                        <h2 className="fs24 f-omnesMedium mb-3">
                            RedBull Enduro 2019
                        </h2>
                        <p className="fs17 f-myriadprolight lh-13 mb-4">
                            {event.name === '' ? (
                                <BlockPlaceholder
                                    width={100}
                                    height={10}
                                    borderRadius={5}
                                    status={true}
                                    count={8}
                                    className="m-0 w-100"
                                />
                            ) : (
                                event?.description
                            )}
                        </p>
                        <ul className="d-sm-flex mb-4">
                            <li className="f-myriadprolight fs16 mr-3 mb-sm-0 mb-2 d-flex align-items-center">
                                {event.name === '' ? (
                                    <BlockPlaceholder
                                        width={300}
                                        height={25}
                                        borderRadius={5}
                                        status={true}
                                        count={1}
                                        className="m-0"
                                    />
                                ) : (
                                    getEventDate(event as any)
                                )}
                            </li>
                            <li className="fs16">
                                {event.name === '' ? (
                                    <BlockPlaceholder
                                        width={200}
                                        height={25}
                                        borderRadius={5}
                                        status={true}
                                        count={1}
                                        className="m-0"
                                    />
                                ) : (
                                    <>
                                        <img
                                            className="mr-2"
                                            style={{ width: '25px' }}
                                            src={countryFlag(event)}
                                            alt="event country flag"
                                        />
                                        <Link
                                            onClick={openMapsNewWindow}
                                            to="#"
                                            className="b-bottom c-black">
                                            {event?.geolocation.country}{' '}
                                            {event?.geolocation.city
                                                ? `,${event?.geolocation.city}`
                                                : ''}
                                        </Link>
                                    </>
                                )}
                            </li>
                        </ul>
                        <Link
                            to={eventUrlPublicPrivate(event)}
                            className="event-btn fs17 trans">
                            Go to Event page
                        </Link>
                    </div>
                </div>
            </div>
            <ModalVViewVideo
                eventName={modalVideoView.eventName}
                videoLink={modalVideoView.videoLink}
                modalShow={modalVideoView.modalShow}
                closeModal={() => {
                    dispatch(
                        setOpenModalToView({
                            eventName: '',
                            videoLink: '',
                            modalShow: false
                        })
                    );
                }}
            />
        </section>
    );
}

export default LibrarySection;
