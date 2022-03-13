import React from 'react';
import { Link } from 'react-router-dom';
import {
    countryFlag,
    eventUrlPublicPrivate,
    getEventDate,
    history
} from 'utils/helpers';
import ReactPlayer from 'react-player';
import { setOpenModalToView } from 'redux/modals';
import { useDispatch } from 'react-redux';

interface IThisProps {
    event: any;
    prodClass: boolean;
}

function EventBlock({ event, prodClass }: IThisProps) {
    const dispatch = useDispatch();

    function playVideo(e: any) {
        e.preventDefault();
        const ThisVideoURL = e.target.getAttribute('data-url');
        const eventName = e.target.getAttribute('data-name');
        dispatch(
            setOpenModalToView({
                eventName,
                videoLink: ThisVideoURL,
                modalShow: true
            })
        );
    }

    return (
        <div
            key={event.entity?.id}
            className={
                prodClass
                    ? 'col-sm-6 col-12 mt-3'
                    : 'col-xl-3 col-md-4 col-sm-6'
            }>
            <div className="event-box h-100">
                {event.entity?.coverURL ? (
                    <div
                        className="img-part"
                        style={{
                            backgroundImage: `url(${event.entity?.coverURL})`
                        }}>
                        <Link to="#" className="event-btn">
                            EVENT
                        </Link>
                    </div>
                ) : (
                    <div className="event-img-for-search">
                        <ReactPlayer
                            height="100%"
                            url={event.entity?.videoURL}
                        />
                        <i
                            className="fas fa-play-circle"
                            onClick={playVideo}
                            data-url={event.entity?.videoURL}
                            data-name={event.entity?.name}
                        />
                        <span className="event-name">EVENT</span>
                    </div>
                )}

                <div className="txt-part">
                    <h3 className="txt-part_txt">
                        {getEventDate(event.entity ? event.entity : '')}
                    </h3>
                    <h2
                        onClick={() => {
                            history.push(eventUrlPublicPrivate(event.entity));
                        }}
                        className="txt-part_title">
                        {event.entity?.name}
                    </h2>
                    <p className="flag-txt mb-0">
                        <img
                            style={{ width: '25px' }}
                            className="mr-2"
                            src={countryFlag(event.entity)}
                            alt="event country flag"
                        />

                        <span className="b-bottom">
                            {event.entity?.geolocation !== null
                                ? event.entity?.geolocation?.country
                                : 'Armenia'}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default EventBlock;
