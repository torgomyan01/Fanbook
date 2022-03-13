import React from 'react';
import randomBackground, {
    eventUrlPublicPrivate,
    getEventDate,
    history,
    PrintPublisherName
} from 'utils/helpers';
import VideoBlock from './videoBlock';
import { Link } from 'react-router-dom';
import { DEF_URL } from 'utils/urls';
import { Fade } from 'react-awesome-reveal';

interface IThisProps {
    event: IEvent;
}

function AddedEventBlock({ event }: IThisProps) {
    function openPublisherProfile(e: any) {
        e.preventDefault();
        history.push(`${DEF_URL.PUBLISHER_PROFILE}/${event.user.id}`);
    }
    return (
        <Link
            to={eventUrlPublicPrivate(event)}
            className="col-lg-4 col-md-6 mb-lg-0 mb-md-5 mb-3">
            <Fade>
                <div className="added-box trans">
                    <div
                        className="img-box"
                        style={
                            event.coverURL
                                ? {
                                      backgroundImage: `url(${event.coverURL})`
                                  }
                                : {
                                      backgroundColor: 'grey'
                                  }
                        }>
                        {event?.videoURL && !event.coverURL && (
                            <VideoBlock videoUrl={event?.videoURL} />
                        )}

                        <div className="redbull-box">
                            <div
                                className="mr-2"
                                onClick={openPublisherProfile}>
                                {event.user?.publisherProfile?.avatarURL ? (
                                    <div
                                        className="publisher-img-block"
                                        style={{
                                            backgroundImage: `url(${event.user?.publisherProfile?.avatarURL})`
                                        }}
                                    />
                                ) : (
                                    <div
                                        className="publisher-img-block"
                                        onClick={openPublisherProfile}
                                        style={{
                                            background: randomBackground()
                                        }}>
                                        {PrintPublisherName(event.user)}
                                    </div>
                                )}
                            </div>
                            <div className="d-flex flex-column justify-content-between">
                                <p className="redbull-txt mb-0">Publisher</p>
                                <span
                                    onClick={() =>
                                        history.push(
                                            `${DEF_URL.PUBLISHER_PROFILE}/${event?.user?.id}`
                                        )
                                    }>
                                    <h3
                                        className="redbull-title mb-0"
                                        onClick={openPublisherProfile}>
                                        {event.user?.publisherProfile?.name}
                                    </h3>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="txt-box ">
                        <p className="date-txt">{getEventDate(event)}</p>
                        <h2 className="event-txt mb-2">{event.name}</h2>
                        <p className="cust-txt mb-0">
                            {event.description?.length > 100 &&
                                `${event.description?.substring(0, 200)}...`}
                        </p>
                    </div>
                </div>
            </Fade>
        </Link>
    );
}

export default AddedEventBlock;
