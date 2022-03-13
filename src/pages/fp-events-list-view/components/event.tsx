import React from 'react';
import editPhoto1 from '../images/edit-photo-1.png';
import {
    eventUrlPublicPrivate,
    getEventDate,
    keyGenerator,
    setMessageUser
} from 'utils/helpers';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setModalShow, setModalViewVideo } from 'redux/my-event.page';
import ReactPlayer from 'react-player';
import { Dropdown } from 'react-bootstrap';
import {
    setAddIdDeleteEventModal,
    setOpenCloseModalDeleteEvent,
    setOpenModalEventEdit
} from 'redux/modals';
import { setCurrentEvent } from 'redux/events.slice';
import { Tooltip } from '@material-ui/core';
import { DEF_URL } from 'utils/urls';
import EventImagesBlock from './min-images-block';
import { UM } from 'utils/user-messages';
import { Fade } from 'react-awesome-reveal';

interface IThisProps {
    event: IEvent;
}

const MyEventsAlbumLength = 16;

function Events({ event }: IThisProps) {
    const dispatch = useDispatch();
    function playVideo() {
        dispatch(setModalShow(true));
        dispatch(
            setModalViewVideo({
                name: event.name,
                url: event.videoURL
            })
        );
    }

    const myEventAlbumUrl: any = [];
    if (event.albums.length > 0) {
        event.albums.map((albums: any) => {
            if (albums?.albumFiles.length > 0) {
                albums.albumFiles.map((files: any) => {
                    myEventAlbumUrl.push(files.url);
                });
            } else {
                return false;
            }
        });
    }

    function deleteEvent() {
        if (event.id) {
            dispatch(setOpenCloseModalDeleteEvent(true));
            dispatch(setAddIdDeleteEventModal(event));
        } else {
            dispatch(setMessageUser(UM.TREE_AGAIN));
        }
    }

    function openModalEditEvent() {
        if (event.id) {
            dispatch(setOpenModalEventEdit(true));
            dispatch(setCurrentEvent(event));
        } else {
            dispatch(setMessageUser(UM.TREE_AGAIN));
        }
    }

    return (
        <Fade>
            <li>
                {event.coverURL ? (
                    <div
                        className="event-img"
                        style={{
                            backgroundImage: `url(${
                                event.coverURL ? event.coverURL : editPhoto1
                            })`
                        }}
                    />
                ) : (
                    <div className="event-img">
                        <ReactPlayer height="100%" url={event.videoURL} />
                        <i
                            className="fas fa-play-circle"
                            onClick={playVideo}
                            data-url={event.videoURL}
                            data-name={event.name}
                        />
                    </div>
                )}

                <div className="event-info">
                    <Link to={eventUrlPublicPrivate(event)}>
                        <h3 className="event-info-title">{event.name}</h3>
                    </Link>
                    <p className="event-info-calendar">
                        <span>
                            <i className="icon-calendar mr-2" />
                        </span>
                        {getEventDate(event)}
                    </p>
                    {event.geolocation && (
                        <p className="event-info-location">
                            <span>
                                <i className="icon-location mr-2" />
                            </span>
                            {event.geolocation.country}
                        </p>
                    )}
                    <p className="event-info-gallery">
                        <span>
                            <i className="icon-gallery mr-2 " />
                        </span>
                        {event.albums.length > 0 ? (
                            <>
                                {event.albums.length <= 1
                                    ? `${event.albums.length} Album,`
                                    : `${event.albums.length} Albums,`}{' '}
                                {myEventAlbumUrl.length <= 1
                                    ? `${myEventAlbumUrl.length} Photo`
                                    : `${myEventAlbumUrl.length} Photos`}
                            </>
                        ) : (
                            'No Photos Yet'
                        )}
                    </p>
                </div>
                {event.albums.length ? (
                    <ul className="events-gallery-list">
                        {myEventAlbumUrl.length > 0 &&
                            myEventAlbumUrl.map((url: any, index: number) => {
                                if (index < 16) {
                                    return (
                                        <EventImagesBlock
                                            key={keyGenerator(20)}
                                            url={url}
                                        />
                                    );
                                }
                            })}
                    </ul>
                ) : (
                    <div className="event-info-file">
                        {/*<i className="icon-file mr-2" />*/}
                        {/*<div className="event-info-file-text">*/}
                        {/*    <p>{event.description}</p>*/}
                        {/*</div>*/}
                    </div>
                )}

                {
                    <Link
                        to={`${DEF_URL.SERP}/${event.id}`}
                        className="btn ml-2 btn-open-gallery mt-lg-5">
                        {myEventAlbumUrl.length > MyEventsAlbumLength
                            ? `+${myEventAlbumUrl.length - MyEventsAlbumLength}`
                            : ' '}
                        {/*{calcAlbumImage(e.albums) > 16 ? calcAlbumImage(e.albums) - 16 : ''}*/}
                    </Link>
                }

                <div className="end-block-event-list">
                    <div className="my-event-page-d-m">
                        <Dropdown>
                            <Dropdown.Toggle variant="outline-dark">
                                <i className="fas fa-ellipsis-v" />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item
                                    href="#"
                                    onClick={openModalEditEvent}>
                                    <i className="far fa-edit c-red mr-2" />
                                    Edit Event
                                </Dropdown.Item>
                                <Dropdown.Item
                                    className="mt-2"
                                    href="#"
                                    onClick={deleteEvent}>
                                    <i className="fas fa-trash c-red mr-2" />
                                    Delete Event
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <Tooltip
                        title={`${
                            event.isAvailable ? 'Public' : 'Private'
                        } Event`}
                        placement="top">
                        {event.isAvailable ? (
                            <span className="c-gray mt-4 public-private-status-event">
                                <i className="fas c-green fa-lock-open" />
                            </span>
                        ) : (
                            <span className="c-gray mt-4 public-private-status-event">
                                <i className="fas c-red fa-lock" />
                            </span>
                        )}
                    </Tooltip>
                </div>
            </li>
        </Fade>
    );
}

export default Events;
