import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { setUser } from 'redux/auth.slice';
import { DeleteAvatarSetting, UploadAvatarSetting } from 'api/all-apis';
import { TextField } from '@material-ui/core';

interface objImg {
    name: string;
    url: any;
}

const ProfileSection = () => {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: IAuth) => state.sign.user.profile);
    const Avatar64: any = localStorage.getItem('avatar-base64');
    const avatarData = JSON.parse(Avatar64);

    const [userName, setUserName] = useState('');
    const [userLastName, setUerLastName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userImage, setUSerImage] = useState<objImg>(
        avatarData ? avatarData : {}
    );
    const [loadnig, setLoading] = useState(false);

    useEffect(() => {
        if (userInfo) {
            setUserName(userInfo.firstName);
            setUerLastName(userInfo.lastName);
            setUserEmail(userInfo.email);
        }
    }, [userInfo]);

    function upLoadPhotoSettingProfile(e: any) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const result: any = e.target?.result;
                setUSerImage({
                    name: file.name,
                    url: result
                });
                localStorage.setItem(
                    'avatar-base64',
                    JSON.stringify({
                        name: file.name,
                        url: result
                    })
                );
            };
            reader.readAsDataURL(file);
        }
    }

    function settingAccaunt(e: any) {
        e.preventDefault();
        setLoading(true);

        const userData: any = {};

        if (userEmail !== '') {
            userData['email'] = userEmail;
        }
        if (userName !== '') {
            userData['firstName'] = userName;
        }
        if (userLastName !== '') {
            userData['lastName'] = userLastName;
        }
        if (userImage.url) {
            userData['avatar'] = userImage.url;
        }
        UploadAvatarSetting(userData).then(function (res) {
            const profile = res.data.data.item;
            localStorage.setItem('user', JSON.stringify(profile));
            dispatch(
                setUser({
                    profile
                })
            );
            setLoading(false);
        });
    }

    function DeleteImageToServer(e: any) {
        e.preventDefault();
        DeleteAvatarSetting().then(() => {
            const userInfo: UserInfo = {
                ...JSON.parse(localStorage.getItem('user') as string)
            };
            userInfo.avatarURL = null;
            localStorage.setItem('user', JSON.stringify(userInfo));
            dispatch(
                setUser({
                    profile: userInfo
                })
            );
        });
    }

    function DeleteImgLocalPrev(e: any) {
        e.preventDefault();
        setUSerImage({
            name: '',
            url: null
        });
    }

    return (
        <div id="profile" className="tab-pane profile-block fade active show">
            <h2 className="profile-title font-bold">Profile</h2>
            <form action="#" className="profile-form" onSubmit={settingAccaunt}>
                <div className="mb-3">
                    <TextField
                        label="First Name"
                        value={userName}
                        required={true}
                        onChange={(e) => {
                            setUserName(e.target.value);
                        }}
                    />
                </div>
                <div className="mb-3">
                    <TextField
                        label="Last Name"
                        value={userLastName}
                        required={true}
                        onChange={(e) => {
                            setUerLastName(e.target.value);
                        }}
                    />
                </div>
                <div>
                    <TextField
                        label="Email Address"
                        value={userEmail}
                        required={true}
                        onChange={(e) => {
                            setUserEmail(e.target.value);
                        }}
                    />
                </div>

                <h3 className="profile-pretitle mt-4">Profile Image</h3>

                {userInfo && userInfo.avatarURL === null && (
                    <>
                        {userImage?.url ? (
                            <div className="d-flex align-items-center mb-40">
                                <div
                                    className="user-settigs_img"
                                    style={{
                                        backgroundImage: `url('data:${userImage.url}')`
                                    }}
                                />
                                <div className="">
                                    <p className="profile-pretitle mb-1">
                                        {userImage.name}
                                    </p>
                                    <a
                                        href="/#"
                                        onClick={DeleteImgLocalPrev}
                                        className="delete-link">
                                        Delete
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <div className="mb-4">
                                <label
                                    htmlFor="upload-profile-image"
                                    className="mr-2 btn save-btn">
                                    Upload Profile Image
                                    <i className="fas fa-upload ml-2" />
                                    <input
                                        type="file"
                                        accept="image/jpeg,image/jpg,image/png,image"
                                        id="upload-profile-image"
                                        style={{ display: 'none' }}
                                        onChange={upLoadPhotoSettingProfile}
                                    />
                                </label>
                            </div>
                        )}
                    </>
                )}

                {userInfo && userInfo.avatarURL !== null && (
                    <div className="d-flex align-items-center mb-40">
                        <div
                            className="user-settigs_img"
                            style={{
                                backgroundImage: `url('${userInfo.avatarURL}')`
                            }}
                        />
                        <div className="">
                            <a
                                href="/#"
                                className="delete-link"
                                onClick={DeleteImageToServer}>
                                Delete
                            </a>
                        </div>
                    </div>
                )}

                <button type="submit" className="save-btn">
                    Save Changes
                    {loadnig && <Spinner animation="border" variant="light" />}
                </button>
            </form>
        </div>
    );
};

export default ProfileSection;
