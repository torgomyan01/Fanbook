import React from 'react';
import { eventUrlPublicPrivate, keyGenerator } from 'utils/helpers';
import { Link } from 'react-router-dom';
import defaultImage from 'assets/images/default-image.jpg';

interface IThisProps {
    event: IEvent;
}

function EventBlockList({ event }: IThisProps) {
    return (
        <>
            {event && (
                <div key={keyGenerator(30)} className="col-12 mt-3">
                    <div className="publisher-box list text-center h-100 position-relative d-sm-flex flex-row justify-content-between align-items-center ">
                        <Link
                            to="#"
                            className="event-btn"
                            style={{ width: 'auto' }}>
                            EVENT
                        </Link>
                        <div className="publisher-info-block-list">
                            <div
                                className="publisher-avatar-list"
                                style={{
                                    backgroundImage: `url(${
                                        event.coverURL
                                            ? event?.coverURL
                                            : defaultImage
                                    })`
                                }}
                            />
                        </div>
                        <div>
                            <p className="fs26 font-bold">{event?.name}</p>
                        </div>

                        <Link
                            to={eventUrlPublicPrivate(event)}
                            className="follow-btn">
                            Go To Event
                            <i className="fas fa-arrow-right ml-2" />
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
}

export default EventBlockList;
