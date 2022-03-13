import React from 'react';
import userImg from '../images/user-img.png';

function ActivityFeed() {
    return (
        <div
            className="how-box-proj box how-box position-relative pr-0"
            style={{ height: '937.953px' }}>
            <h2 className="event-box_title f-omnesMedium mb-4 mr-4">
                Activity Feed
            </h2>
            <ul className="video-block scroll-vertical mb-0 pr-1">
                <li className="d-flex mb-3">
                    <span
                        className="active-user-icon"
                        style={{ backgroundImage: `url(${userImg})` }}
                    />
                    <div>
                        <p className="fs16 mb-2 f-omnesMedium">
                            Anna added photos to “Charity Match” event
                        </p>
                        <p className="fs15 f-myriadprolight mb-0">
                            2 minutes ago
                        </p>
                    </div>
                </li>
                <li className="d-flex mb-3">
                    <span
                        className="active-user-icon"
                        style={{ backgroundImage: `url(${userImg})` }}
                    />
                    <div>
                        <p className="fs16 mb-2 f-omnesMedium">
                            Anna added photos to “Charity Match” event
                        </p>
                        <p className="fs15 f-myriadprolight mb-0">
                            2 minutes ago
                        </p>
                    </div>
                </li>
                <li className="d-flex mb-3">
                    <span
                        className="active-user-icon"
                        style={{ backgroundImage: `url(${userImg})` }}
                    />
                    <div>
                        <p className="fs16 mb-2 f-omnesMedium">
                            Anna added photos to “Charity Match” event
                        </p>
                        <p className="fs15 f-myriadprolight mb-0">
                            2 minutes ago
                        </p>
                    </div>
                </li>
                <li className="d-flex mb-3">
                    <span
                        className="active-user-icon"
                        style={{ backgroundImage: `url(${userImg})` }}
                    />
                    <div>
                        <p className="fs16 mb-2 f-omnesMedium">
                            Anna added photos to “Charity Match” event
                        </p>
                        <p className="fs15 f-myriadprolight mb-0">
                            2 minutes ago
                        </p>
                    </div>
                </li>
                <li className="d-flex mb-3">
                    <span
                        className="active-user-icon"
                        style={{ backgroundImage: `url(${userImg})` }}
                    />
                    <div>
                        <p className="fs16 mb-2 f-omnesMedium">
                            Anna added photos to “Charity Match” event
                        </p>
                        <p className="fs15 f-myriadprolight mb-0">
                            2 minutes ago
                        </p>
                    </div>
                </li>
                <li className="d-flex mb-3">
                    <span
                        className="active-user-icon"
                        style={{ backgroundImage: `url(${userImg})` }}
                    />
                    <div>
                        <p className="fs16 mb-2 f-omnesMedium">
                            Anna added photos to “Charity Match” event
                        </p>
                        <p className="fs15 f-myriadprolight mb-0">
                            2 minutes ago
                        </p>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default ActivityFeed;
