import React from 'react';
import VideoBlock from 'pages/search-event/components/videoBlock';
import { Link } from 'react-router-dom';
import {
    countryFlag,
    eventUrlPublicPrivate,
    getEventDate,
    textCrop
} from 'utils/helpers';
import { useDispatch } from 'react-redux';
import { modalOpenClose, setImage } from 'redux/preveiw-image';

interface IThisProps {
    event: IEvent;
    enterEventBlock: any;
    onLeave: any;
    eventBlockLayer: {
        layerX: number;
        layerY: number;
    };
}

function DraftEventBlock({
    event,
    enterEventBlock,
    onLeave,
    eventBlockLayer
}: IThisProps) {
    const dispatch = useDispatch();
    function viewPhoto() {
        if (event.coverURL) {
            dispatch(modalOpenClose(true));
            dispatch(
                setImage({
                    name: event.name,
                    url: event.coverURL
                })
            );
        }
    }
    return (
        <div
            className="position-absolute event-hover-block"
            onMouseEnter={enterEventBlock}
            onMouseLeave={onLeave}
            style={{
                left: eventBlockLayer.layerX,
                top: eventBlockLayer.layerY
            }}>
            <div
                style={{
                    backgroundImage: `url(${event.coverURL})`
                }}
                onClick={viewPhoto}
                className="cover-block-event cursor-pointer">
                {!event.coverURL && event?.videoURL && (
                    <VideoBlock videoUrl={event?.videoURL} />
                )}
            </div>

            <div className="px-2">
                <h2 className="mt-2 c-red font-bold">
                    <Link to={eventUrlPublicPrivate(event)} className="c-red">
                        {event.name}
                    </Link>
                </h2>
                <p className="mt-1 c-gray">
                    {textCrop(event.description, 100)}
                </p>
                <div className="redbull-bottom_item">{getEventDate(event)}</div>
                <div className="redbull-bottom_item mt-2">
                    <span>
                        <img
                            style={{
                                width: '25px'
                            }}
                            src={countryFlag(event)}
                            alt="event country flag"
                        />
                        <span className="ml-2 b-bottom">
                            {`${
                                event?.geolocation?.city
                                    ? `${event?.geolocation?.city},`
                                    : ''
                            }`}{' '}
                            {event?.geolocation?.country}
                        </span>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default DraftEventBlock;
