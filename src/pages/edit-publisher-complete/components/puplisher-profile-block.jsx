import React from 'react';
import userImg from '../images/fanbook-user-img.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

function PublisherImgBlock() {
    const userInfo: any = useSelector((state: any) => state.sign.user.profile);
    const avatarUrl = userInfo ? userInfo.avatarURL : userImg;

    console.log(userInfo);
    return (
        <div className="col-xl-2 col-12">
            <div className="mr-md-0 mr-3 d-flex flex-md-column justify-content-between h-100 w-100">
                <div className="mr-md-0 mr-3">
                    <div
                        className="user-box"
                        style={{ backgroundImage: `url(${avatarUrl})` }}>
                        <span className="camera-box trans ml-3">
                            <FontAwesomeIcon icon={faCamera} className="fs30" />
                        </span>
                    </div>
                    <p className="publisher-left_txt ">Publisher Name</p>
                    <h2 className="publisher-left_title font-bold">
                        {userInfo
                            ? `${userInfo.firstName} ${userInfo.lastName}`
                            : ''}
                    </h2>
                </div>
                <div className="text-right">{''}</div>
            </div>
        </div>
    );
}

export default PublisherImgBlock;
