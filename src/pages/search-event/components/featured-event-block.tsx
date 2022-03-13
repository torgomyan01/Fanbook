import React from 'react';
import randomBackground, {
    eventUrlPublicPrivate,
    getEventDate,
    history,
    PrintPublisherName
} from 'utils/helpers';
import { Link } from 'react-router-dom';
import Featured1 from 'assets/images/search-event/featured-1.png';
import { DEF_URL } from 'utils/urls';
import { Fade } from 'react-awesome-reveal';

interface IThisProps {
    event: IEvent;
}

function FeaturedEventBlock({ event }: IThisProps) {
    function openPublisherProfile(e: any) {
        e.preventDefault();
        history.push(`${DEF_URL.PUBLISHER_PROFILE}/${event.user.id}`);
    }
    return (
        <div className="col-md-6 col-12 mb-md-0 mb-5">
            <Fade>
                <Link to={eventUrlPublicPrivate(event)}>
                    <div className="featured-box trans">
                        <div
                            className="img-box"
                            style={{
                                backgroundImage: `url(${
                                    event.coverURL ? event.coverURL : Featured1
                                })`
                            }}>
                            <div className="redbull-box">
                                <div className="mr-2">
                                    <div
                                        className="mr-2"
                                        onClick={openPublisherProfile}>
                                        {event.user?.publisherProfile
                                            ?.avatarURL !== null ? (
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
                                                    background:
                                                        randomBackground()
                                                }}>
                                                {PrintPublisherName(event.user)}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="d-flex flex-column justify-content-between">
                                    <p className="redbull-txt mb-0">
                                        Publisher
                                    </p>
                                    <span
                                        onClick={() =>
                                            history.push(
                                                `${DEF_URL.PUBLISHER_PROFILE}/${event?.user?.id}`
                                            )
                                        }>
                                        <h3
                                            className="redbull-title mb-0"
                                            onClick={openPublisherProfile}>
                                            {event.user.publisherProfile?.name}
                                        </h3>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="txt-box d-lg-flex flex-lg-row flex-column align-items-center justify-content-between">
                            <div>
                                <p className="date-txt">
                                    {getEventDate(event)}
                                </p>
                                <h2 className="event-txt mb-lg-0 mb-3">
                                    {event?.name}
                                </h2>
                            </div>
                            <div>
                                <p className="cust-txt text-lg-right text-left mb-0">
                                    *Customize book by adding in photos that you
                                    took at the event.
                                </p>
                            </div>
                        </div>
                    </div>
                </Link>
            </Fade>
        </div>
    );
}

export default FeaturedEventBlock;
