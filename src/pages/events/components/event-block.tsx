import React from 'react';
import { setModalShow, setModalViewVideo } from 'redux/my-event.page';
import { MAP_PATH } from 'utils/google';

import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import randomBackground, {
    eventUrlPublicPrivate,
    getEventDate,
    keyGenerator,
    textCrop,
    userAvatarName
} from 'utils/helpers';
import { useDispatch } from 'react-redux';
import { DEF_URL } from 'utils/urls';

interface IThisProps {
    event: IEvent;
}

const EVENT_DESCRIPTION_LENGTH = 300;

function EventBlock({ event }: IThisProps) {
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
    function openMapsNewWindow() {
        window.open(
            `${MAP_PATH}/${event?.geolocation.country},${
                event?.geolocation.city || ''
            }`,
            '_blank'
        );
    }
    return (
        <div className="col-12 border-top mt-3 mb-3 pt-4 pb-4 bgc-while">
            <div className="row px-2">
                {event.coverURL ? (
                    <div
                        style={{
                            backgroundImage: `url(${event.coverURL})`
                        }}
                        className="col-md-3 event-image-to-search-event-pag"
                    />
                ) : (
                    <div className="event-img-search-my-event-page col-md-3">
                        <ReactPlayer height="100%" url={event.videoURL} />
                        <i
                            className="fas fa-play-circle"
                            onClick={playVideo}
                            data-url={event.videoURL}
                            data-name={event.name}
                        />
                    </div>
                )}
                <div className="col-md-6 d-flex flex-column align-items-start position-relative">
                    <Link
                        to={eventUrlPublicPrivate(event)}
                        className="font-bold fs30 mt-1 search-p-event-name my-2">
                        {event.name}
                    </Link>
                    <h5 className="mb-5">
                        {event.description.length > EVENT_DESCRIPTION_LENGTH
                            ? textCrop(
                                  event.description,
                                  EVENT_DESCRIPTION_LENGTH
                              )
                            : event.description}
                    </h5>
                    <div className="information-block-events">
                        <div className="c-gray fs20">{getEventDate(event)}</div>
                        <div
                            onClick={openMapsNewWindow}
                            className="c-gray fs20 cursor-pointer">
                            <i className="fas fa-map-marker-alt mr-2 c-red mt-4" />
                            See On Map
                        </div>
                    </div>
                </div>
                <div className="col-md-3 d-flex flex-column justify-content-center align-items-center">
                    {event.user.avatarURL ? (
                        <div
                            className="publisher-image-to-search-event-page event-image-to-search-event-page"
                            style={{
                                backgroundImage: `url(${event.user.publisherProfile?.avatarURL})`
                            }}
                        />
                    ) : (
                        <div
                            className="publisher-no-image-to-search-event-page"
                            style={{ backgroundColor: randomBackground() }}>
                            {event.user.publisherProfile?.name[0]}
                        </div>
                    )}

                    <span className="mt-3 fs15 c-gray">Publisher</span>
                    <Link
                        to={`${DEF_URL.PUBLISHER_PROFILE}/${event?.user?.id}`}>
                        <p className="mt-2 fs20 font-bold">
                            {event.user.publisherProfile?.name}
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default EventBlock;
