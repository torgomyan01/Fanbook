import React from 'react';
import { Link } from 'react-router-dom';
import defaultImage from 'assets/images/fanbookDefault.jpg';

import { history } from 'utils/helpers';
import { DEF_URL } from 'utils/urls';

interface IThisProps {
    publisher: any;
    prodClass: boolean;
}

function PublisherBlock({ publisher, prodClass }: IThisProps) {
    function openPublisherPage() {
        history.push(`${DEF_URL.PUBLISHER_PROFILE}/${publisher.entity?.id}`);
    }
    return (
        <div
            className={
                prodClass
                    ? 'col-sm-6 col-12 mt-3'
                    : 'col-xl-3 col-md-4 col-sm-6'
            }>
            <div className="buy-box text-center h-100 position-relative d-sm-flex flex-column justify-content-between align-items-center">
                <Link to="#" className="event-btn" style={{ width: 'auto' }}>
                    PUBLISHER
                </Link>
                <div
                    className="buy-box_img"
                    style={{
                        backgroundImage: `url(${
                            publisher.entity.publisherProfile.avatarURL
                                ? publisher.entity.publisherProfile.avatarURL
                                : defaultImage
                        })`
                    }}
                />
                <div className="mt-3">
                    <Link
                        to={`${DEF_URL.PUBLISHER_PROFILE}/${publisher.entity.publisherProfile?.id}`}>
                        <h2
                            className="buy-box_title mb-2"
                            onClick={openPublisherPage}>
                            {publisher.entity.publisherProfile.name}
                        </h2>
                    </Link>
                </div>
                <Link
                    to={`${DEF_URL.PUBLISHER_PROFILE}/${publisher.entity.id}`}
                    className="buy-btn"
                    style={{ background: '#b12029' }}>
                    <i className="fas fa-eye mr-2" />
                    View Profile
                </Link>
            </div>
        </div>
    );
}

export default PublisherBlock;
