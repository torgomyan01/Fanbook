import React from 'react';
import { history, keyGenerator } from 'utils/helpers';
import { Link } from 'react-router-dom';
import defaultImage from 'assets/images/default-image.jpg';
import { DEF_URL } from 'utils/urls';

interface IThisProps {
    publisher: UserInfo;
}

function PublisherBlockList({ publisher }: IThisProps) {
    function openPublisherPage() {
        history.push(`${DEF_URL.PUBLISHER_PROFILE}/${publisher.id}`);
    }
    return (
        <div key={keyGenerator(30)} className="col-12 mt-3">
            <div className="publisher-box list text-center h-100 position-relative d-sm-flex flex-row justify-content-between align-items-center ">
                <Link to="#" className="event-btn" style={{ width: 'auto' }}>
                    PUBLISHER
                </Link>
                <div className="publisher-info-block-list">
                    <div
                        className="publisher-avatar-list"
                        style={{
                            backgroundImage: `url(${
                                publisher.publisherProfile?.avatarURL
                                    ? publisher.publisherProfile.avatarURL
                                    : defaultImage
                            })`
                        }}
                    />
                </div>
                <div>
                    <Link to={`${DEF_URL.PUBLISHER_PROFILE}/${publisher?.id}`}>
                        <p className="fs26 font-bold">
                            {publisher.publisherProfile?.name}
                        </p>
                    </Link>
                </div>

                <Link to="#" className="follow-btn" onClick={openPublisherPage}>
                    <i className="fas fa-eye mr-2" />
                    View Profile
                </Link>
            </div>
        </div>
    );
}

export default PublisherBlockList;
