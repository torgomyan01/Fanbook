import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LocationImg from 'assets/images/icons/location.png';
import randomBackground, {
    countryFlag,
    getEventDate,
    setMessageUser
} from 'utils/helpers';
import ModalSetting from './modal-setting-event';
import { GOOGLE_API_KEY_MAP, MAP_PATH } from 'utils/google';
import ReactPlayer from 'react-player';
import GoogleMapReact from 'google-map-react';
import mapGeo from 'assets/images/map-geo.png';
import {
    setAddIdDeleteEventModal,
    setEventStatusEdit,
    setOpenCloseModalDeleteEvent,
    setOpenCloseModalEventStatusEvent,
    setOpenModalEventEdit
} from 'redux/modals';
import { setCurrentEvent } from 'redux/events.slice';
import BlockPlaceholder from 'features/block-placeholder';
import { Tooltip } from '@material-ui/core';
import EditStatusEventModal from 'features/edit-status-event/edit-status-event-modal';
import { modalOpenClose, setImage } from 'redux/preveiw-image';
import { UM } from 'utils/user-messages';
import { Link } from 'react-router-dom';
import { DEF_URL } from 'utils/urls';

const AnyReactComponent = ({ text }: any) => (
    <>
        <div className="marker-event">
            <img src={mapGeo} alt="" />
        </div>
    </>
);

const ImgSection = () => {
    const dispatch = useDispatch();
    const [playPauseVideoSet, setPlayPauseVideoSet] = useState(false);

    const isEditable = useSelector(
        (state: IEvents) => state.events.currentEvent?.isEditable
    );
    const event = useSelector((state: IEvents) => state.events.currentEvent);

    function openModalSettings() {
        dispatch(setOpenModalEventEdit(true));
        dispatch(setCurrentEvent(event));
    }

    function openMapsNewWindow() {
        window.open(
            `${MAP_PATH}/${event?.geolocation.country},${
                event.geolocation.city ? event?.geolocation.city : ''
            }`,
            '_blank'
        );
    }

    function playPauseVideo() {
        if (playPauseVideoSet) {
            setPlayPauseVideoSet(false);
        } else {
            setPlayPauseVideoSet(true);
        }
    }

    function openModalDeleteEvent() {
        if (event.id) {
            dispatch(setOpenCloseModalDeleteEvent(true));
            dispatch(setAddIdDeleteEventModal(event));
        } else {
            dispatch(setMessageUser(UM.TREE_AGAIN));
        }
    }

    function openModalEditStatusEvent() {
        dispatch(setOpenCloseModalEventStatusEvent(true));
        dispatch(setEventStatusEdit(event));
    }
    function viewPhoto() {
        if (event?.user?.publisherProfile?.avatarURL) {
            dispatch(modalOpenClose(true));
            dispatch(
                setImage({
                    name: 'image',
                    url: event.user.publisherProfile?.avatarURL
                })
            );
        }
    }

    function PublisherAvatar() {
        return {
            background: event?.user?.publisherProfile?.avatarURL
                ? `url(${event?.user?.publisherProfile?.avatarURL})`
                : randomBackground()
        };
    }

    return (
        <section
            className={`img-section ${!event?.user?.firstName && 'loading'}`}
            style={
                event?.coverURL
                    ? {
                          backgroundImage: `url(${event?.coverURL})`
                      }
                    : {
                          backgroundColor: 'grey'
                      }
            }>
            {event?.videoURL && (
                <div className="forVideo">
                    <ReactPlayer
                        url={event?.videoURL}
                        width="100%"
                        playing={playPauseVideoSet}
                    />
                    {playPauseVideoSet ? (
                        <i
                            className="far fa-pause-circle"
                            onClick={playPauseVideo}
                        />
                    ) : (
                        <i
                            className="far fa-play-circle"
                            onClick={playPauseVideo}
                        />
                    )}
                </div>
            )}
            <div className="container-fluid wrapper1 h-100">
                <div className="row h-100">
                    <div className="col-12 ">
                        <div className="d-flex flex-column justify-content-end h-100">
                            {/*<div*/}
                            {/*    className="more-box"*/}
                            {/*    style={{*/}
                            {/*        display: !closeMoreBox ? 'none' : 'block'*/}
                            {/*    }}>*/}
                            {/*    <i*/}
                            {/*        className="fas fa-times close-icon"*/}
                            {/*        onClick={closeMassangeEventPage}*/}
                            {/*    />*/}
                            {/*</div>*/}
                            <div className="redbull-box">
                                <div className="redbull-top d-sm-flex justify-content-between ">
                                    <div className="d-flex mb-sm-0 mb-2">
                                        <div className="img-box mr-3">
                                            {event?.user?.firstName ? (
                                                <div
                                                    className="PublishAvatar"
                                                    onClick={viewPhoto}
                                                    style={PublisherAvatar()}>
                                                    {event?.user
                                                        ?.publisherProfile
                                                        ?.avatarURL
                                                        ? ''
                                                        : event?.user?.firstName[0]?.toLocaleUpperCase() +
                                                          event?.user?.lastName[0]?.toLocaleUpperCase()}
                                                </div>
                                            ) : (
                                                <BlockPlaceholder
                                                    width={100}
                                                    height={100}
                                                    status={true}
                                                    borderRadius={5}
                                                    count={1}
                                                    className="m-0"
                                                />
                                            )}
                                        </div>
                                        <div className="d-flex flex-column">
                                            <p className="redbull-title mb-2">
                                                Publisher
                                            </p>
                                            <Link
                                                to={`${DEF_URL.PUBLISHER_PROFILE}/${event?.user?.id}`}>
                                                <h3 className="redbull-txt mb-1">
                                                    {event?.user
                                                        ?.publisherProfile
                                                        ?.name === '' ? (
                                                        <BlockPlaceholder
                                                            width={150}
                                                            height={30}
                                                            status={true}
                                                            borderRadius={5}
                                                            count={1}
                                                            className="m-0"
                                                        />
                                                    ) : (
                                                        <>
                                                            {
                                                                event?.user
                                                                    ?.publisherProfile
                                                                    ?.name
                                                            }
                                                        </>
                                                    )}
                                                </h3>
                                            </Link>

                                            <div className="d-flex">
                                                {isEditable && (
                                                    <Tooltip
                                                        title="Edit Event"
                                                        placement="top">
                                                        <span className="d-inline-block">
                                                            <span
                                                                onClick={
                                                                    openModalSettings
                                                                }
                                                                className="edit-btn ml-1 event-view-page-mini-buttons">
                                                                <i className="far fa-edit c-red" />
                                                            </span>
                                                        </span>
                                                    </Tooltip>
                                                )}
                                                {isEditable && (
                                                    <>
                                                        <Tooltip
                                                            title="Delete Event"
                                                            placement="top">
                                                            <span className="d-inline-block">
                                                                <span
                                                                    onClick={
                                                                        openModalDeleteEvent
                                                                    }
                                                                    className="edit-btn ml-1 event-view-page-mini-buttons">
                                                                    <i className="fas fa-trash c-red" />
                                                                </span>
                                                            </span>
                                                        </Tooltip>
                                                        <Tooltip
                                                            title={`${
                                                                event.isAvailable
                                                                    ? 'Public'
                                                                    : 'Private'
                                                            } Event`}
                                                            placement="top">
                                                            <span className="d-inline-block">
                                                                <span
                                                                    onClick={
                                                                        openModalEditStatusEvent
                                                                    }
                                                                    className="edit-btn ml-1 event-view-page-mini-buttons">
                                                                    {event.isAvailable ? (
                                                                        <i className="fas fa-lock-open c-red" />
                                                                    ) : (
                                                                        <i className="fas fa-lock c-red" />
                                                                    )}
                                                                </span>
                                                            </span>
                                                        </Tooltip>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <ul className="list-unstyled mb-0 d-flex align-items-end" />
                                </div>
                                <div className="redbull-bottom ">
                                    <div className="d-lg-flex flex-lg-row flex-column justify-content-between">
                                        <div className="mb-lg-0 mb-3">
                                            <h2 className="redbull-bottom_title">
                                                {event?.name === '' ? (
                                                    <BlockPlaceholder
                                                        width={300}
                                                        height={35}
                                                        status={true}
                                                        borderRadius={5}
                                                        count={1}
                                                        className={''}
                                                    />
                                                ) : (
                                                    <>{event?.name}</>
                                                )}
                                            </h2>
                                            <ul className="redbull-bottom_list  d-xl-flex mb-0 d-inline-block">
                                                <li className="redbull-bottom_item mr-xl-2 mb-xl-0 mb-1">
                                                    <span className="font-light">
                                                        {event?.name === '' ? (
                                                            <BlockPlaceholder
                                                                width={300}
                                                                height={15}
                                                                status={true}
                                                                borderRadius={5}
                                                                count={1}
                                                                className={''}
                                                            />
                                                        ) : (
                                                            <>
                                                                {getEventDate(
                                                                    event as any
                                                                )}
                                                            </>
                                                        )}
                                                    </span>
                                                </li>
                                                <li className="redbull-bottom_item ">
                                                    {event?.name === '' ? (
                                                        <BlockPlaceholder
                                                            width={200}
                                                            height={15}
                                                            status={true}
                                                            borderRadius={5}
                                                            count={1}
                                                            className={''}
                                                        />
                                                    ) : (
                                                        <span>
                                                            <img
                                                                style={{
                                                                    width: '25px'
                                                                }}
                                                                src={countryFlag(
                                                                    event
                                                                )}
                                                                alt="event country flag"
                                                            />
                                                            <span className="ml-2 b-bottom">
                                                                {`${
                                                                    event
                                                                        ?.geolocation
                                                                        ?.city
                                                                        ? `${event?.geolocation?.city},`
                                                                        : ''
                                                                }`}{' '}
                                                                {
                                                                    event
                                                                        ?.geolocation
                                                                        ?.country
                                                                }
                                                            </span>
                                                        </span>
                                                    )}
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="map-box position-relative d-inline-block">
                                            {event?.name ? (
                                                <>
                                                    {event?.geolocation
                                                        ?.latitude &&
                                                        event?.geolocation
                                                            ?.longitude && (
                                                            <div
                                                                style={{
                                                                    width: '440px',
                                                                    height: '140px',
                                                                    borderRadius:
                                                                        '3px',
                                                                    overflow:
                                                                        'hidden'
                                                                }}>
                                                                <GoogleMapReact
                                                                    bootstrapURLKeys={{
                                                                        key: GOOGLE_API_KEY_MAP
                                                                    }}
                                                                    defaultCenter={{
                                                                        lat: event
                                                                            ?.geolocation
                                                                            ?.latitude,
                                                                        lng: event
                                                                            ?.geolocation
                                                                            ?.longitude
                                                                    }}
                                                                    defaultZoom={
                                                                        8
                                                                    }>
                                                                    <AnyReactComponent
                                                                        lat={
                                                                            event
                                                                                ?.geolocation
                                                                                ?.latitude as number
                                                                        }
                                                                        lng={
                                                                            event
                                                                                ?.geolocation
                                                                                .longitude
                                                                        }
                                                                    />
                                                                </GoogleMapReact>
                                                            </div>
                                                        )}
                                                    <span className="location-box">
                                                        <img
                                                            className="cursor-pointer"
                                                            onClick={
                                                                openMapsNewWindow
                                                            }
                                                            src={LocationImg}
                                                            alt="location"
                                                        />
                                                    </span>
                                                </>
                                            ) : (
                                                <BlockPlaceholder
                                                    width={400}
                                                    height={120}
                                                    status={true}
                                                    borderRadius={5}
                                                    count={1}
                                                    className={''}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*<ModalInvite*/}
            {/*    openModal={openModal}*/}
            {/*    closeModal={() => {*/}
            {/*        setOpenModal(false);*/}
            {/*    }}*/}
            {/*/>*/}
            <EditStatusEventModal />

            <ModalSetting />
        </section>
    );
};

export default ImgSection;
