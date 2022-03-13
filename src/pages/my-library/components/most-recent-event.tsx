import React, { useEffect } from 'react';
import LibraryImg from 'assets/images/MyLibrary/librari-img.png';
import moment from 'moment';
import { Link } from 'react-router-dom';
import AlbumBlock from './album-block';

import { setCurrentEvent } from 'redux/events.slice';
import { useDispatch } from 'react-redux';
import ReactPlayer from 'react-player';
import { setModalShow, setModalViewVideo } from 'redux/my-event.page';
import BlockPlaceholder from 'features/block-placeholder';
import { setOpenCreateModalAlbum } from 'redux/modals';
import { eventUrlPublicPrivate, keyGenerator } from 'utils/helpers';

interface IThisProps {
    event: IEvent;
    status: boolean;
}

function MostRecentEvent({ event, status }: IThisProps) {
    const dispatch = useDispatch();

    function openModalCreateAlbum() {
        dispatch(setOpenCreateModalAlbum(true));
        dispatch(setCurrentEvent(event));
    }

    useEffect(() => {
        dispatch(setCurrentEvent(event));
    }, [event]);

    function playVideo() {
        dispatch(setModalShow(true));
        dispatch(
            setModalViewVideo({
                name: event?.name,
                url: event?.videoURL
            })
        );
    }

    return (
        <div className="recent-event-block">
            <h2 className="recent-event_title f-omnesMedium mb-3">
                Most Recent Event
            </h2>
            <div className="d-sm-flex  mb-4 pl-3">
                {status ? (
                    <BlockPlaceholder
                        width={300}
                        height={200}
                        borderRadius={5}
                        status={true}
                        count={1}
                        className=""
                    />
                ) : (
                    <>
                        {event?.coverURL ? (
                            <div
                                className="img-part mb-sm-0 mb-2"
                                style={{
                                    backgroundImage: `url(${
                                        event?.coverURL
                                            ? event?.coverURL
                                            : LibraryImg
                                    })`
                                }}
                            />
                        ) : (
                            <div className="event-img">
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
                    </>
                )}

                <div className="d-flex flex-column justify-content-center  w-100">
                    <h2 className="fs35 c-black mb-md-4 mb-3">
                        {status ? (
                            <BlockPlaceholder
                                width={300}
                                height={30}
                                borderRadius={5}
                                status={true}
                                count={1}
                                className=""
                            />
                        ) : (
                            event?.name
                        )}
                    </h2>
                    <h3 className="fs24 mb-md-3 mb-2">
                        {status ? (
                            <BlockPlaceholder
                                width={200}
                                height={25}
                                borderRadius={5}
                                status={true}
                                count={1}
                                className="m-0 ml-2"
                            />
                        ) : (
                            <>
                                {moment(event?.createdAt).format('Do MMM YY')} ·{' '}
                                {event?.albums.length > 1
                                    ? `${event?.albums.length} Albums`
                                    : `${event?.albums.length} Album`}
                            </>
                        )}
                    </h3>
                    <div className="recent-event_txt fs20 mb-md-4 mb-3">
                        {status ? (
                            <BlockPlaceholder
                                width={180}
                                height={20}
                                borderRadius={5}
                                status={true}
                                count={1}
                                className="m-0 ml-2"
                            />
                        ) : (
                            <>
                                Last Edited on{' '}
                                {moment(event?.updatedAt).format('Do MMM YY')}
                            </>
                        )}
                    </div>
                    <div className="d-lg-flex">
                        <Link
                            to="#"
                            onClick={openModalCreateAlbum}
                            className="btn library-btn mb-lg-0 mb-2">
                            <i className="fas fa-plus mr-2" />
                            New Album
                        </Link>
                        <Link
                            to={event ? eventUrlPublicPrivate(event) : '#'}
                            className="btn event-btn">
                            Go to Event{' '}
                            <i className="fas fa-long-arrow-alt-right ml-3" />
                        </Link>
                    </div>
                </div>
            </div>
            <div className="folder-section">
                <div
                    className="scroll-horizontal mCustomScrollbar _mCS_1 mCS_no_scrollbar"
                    data-mcs-theme="dark">
                    <table className="folder-table w-100">
                        <tbody>
                            {event?.albums.length > 0 &&
                                event.albums.map((album: OneAlbum) => {
                                    return (
                                        <AlbumBlock
                                            album={album}
                                            key={keyGenerator(30)}
                                        />
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default MostRecentEvent;
