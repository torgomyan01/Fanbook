import React from 'react';
import { Link, useParams } from 'react-router-dom';
import WhiteLogo from 'assets/images/logo.png';
import { useSelector } from 'react-redux';
import { Avatar } from '@material-ui/core';
import { userAvatarName } from 'utils/helpers';

function NavbarAdmin() {
    const { tabName }: { tabName: string } = useParams();
    const userInfo = useSelector((state: IAuth) => state.sign.user.profile);
    const adminVersion = process.env.REACT_APP_ADMIN_VERSION;

    return (
        <div className="d-flex justify-content-between align-items-center w-100">
            <h1 className="mb-0">
                <Link to="/" className=" d-inline-block mr-2" title="fanbook">
                    <img src={WhiteLogo} alt="logo" />
                </Link>
            </h1>
            <div className="mr-2">
                {tabName.replace(/_/g, ' ').toUpperCase()}
            </div>

            <div className="d-flex">
                <div className="d-flex align-items-center justify-content-between w-100">
                    {/*<span className="fs14 mr-4">v {adminVersion}</span>*/}
                    <Avatar
                        alt={userInfo?.firstName}
                        src={userInfo?.avatarURL || undefined}
                        className="mr-2">
                        {userAvatarName(userInfo)}
                    </Avatar>
                    <h3 className="fs15 d-flex justify-content-start align-items-center mb-0">
                        Hello,{' '}
                        <span className="font-weight-bold ml-2">
                            {userInfo?.firstName}
                        </span>
                    </h3>
                </div>
            </div>
        </div>
    );
}

export default NavbarAdmin;
