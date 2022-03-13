import React, { useState } from 'react';
import {
    AuthenticationDetails,
    CognitoUser,
    CognitoUserPool
} from 'amazon-cognito-identity-js';
import { useDispatch, useSelector } from 'react-redux';
import { TextField } from '@material-ui/core';
import { PASSWORD_LENGTH, setMessageUser } from 'utils/helpers';
import { Spinner } from 'react-bootstrap';
import { UM } from 'utils/user-messages';

const passwordTypes = {
    old: 'old',
    new: 'new',
    repeat: 'repeat'
};

const SecuritySection = () => {
    const dispatch = useDispatch();

    const userInfo = useSelector((state: IAuth) => state.sign.user.profile);

    const [oldPassword, setOldPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [RepeatPassword, setRepeatPassword] = useState<string>('');

    const [oldPasswordError, setOldPasswordError] = useState<boolean>(false);
    const [newPasswordError, setNewPasswordError] = useState<boolean>(false);
    const [RepeatPasswordError, setRepeatPasswordError] =
        useState<boolean>(false);

    const [oldPasswordView, setOldPasswordView] = useState<boolean>(false);
    const [newPasswordView, setNewPasswordView] = useState<boolean>(false);
    const [RepeatPasswordView, setRepeatPasswordView] =
        useState<boolean>(false);

    function openText(Name: string) {
        switch (Name) {
            case passwordTypes.old:
                setOldPasswordView(true);
                break;
            case passwordTypes.new:
                setNewPasswordView(true);
                break;
            case passwordTypes.repeat:
                setRepeatPasswordView(true);
                break;
            default:
                break;
        }
    }

    function closeText(Name: string) {
        switch (Name) {
            case passwordTypes.old:
                setOldPasswordView(false);
                break;
            case passwordTypes.new:
                setNewPasswordView(false);
                break;
            case passwordTypes.repeat:
                setRepeatPasswordView(false);
                break;
            default:
                break;
        }
    }

    function passwordChange(e: any) {
        const r = /\d+/;
        const value = e.target.value;
        if (value === '') {
            dispatch(setMessageUser(UM.FILL_ALL));
            setNewPasswordError(true);
        } else if (value.match(r) === null) {
            dispatch(setMessageUser(UM.PASS_ONE_CHARACTER));
            setNewPasswordError(true);
        } else if (value.length < PASSWORD_LENGTH) {
            dispatch(setMessageUser(UM.PASS_MIN_LENGTH(PASSWORD_LENGTH)));
            setNewPasswordError(true);
        } else {
            setNewPasswordError(false);
            setNewPassword(value);
        }
    }

    function changeOldPassword(e: any) {
        const value = e.target.value;
        setOldPassword(value);
    }

    function changeRepeatPassword(e: any) {
        const value = e.target.value;
        setRepeatPassword(value);
    }

    const [loading, setLoading] = useState(false);

    function startChangePassword(event: any) {
        event.preventDefault();
        if (userInfo?.email) {
            if (oldPassword === '') {
                setOldPasswordError(true);
                return;
            } else {
                setOldPasswordError(false);
            }

            if (newPassword === '') {
                setNewPasswordError(true);
                return;
            } else {
                setNewPasswordError(false);
            }

            if (RepeatPassword === '') {
                setRepeatPasswordError(true);
                return;
            } else {
                setRepeatPasswordError(false);
            }

            if (newPassword !== RepeatPassword) {
                dispatch(setMessageUser(UM.NEW_PASS_MATCH));
                return;
            }

            const CLIENT_ID: any = process.env.REACT_APP_CLIENT_ID;
            const CLIENT_POOL_ID: any = process.env.REACT_APP_POOL_ID;

            const cognitoUserPool = new CognitoUserPool({
                ClientId: CLIENT_ID,
                UserPoolId: CLIENT_POOL_ID
            });
            console.log(userInfo.email, oldPassword);
            const authenticationDetails = new AuthenticationDetails({
                Username: userInfo.email,
                Password: oldPassword
            });
            const cognitoUser = new CognitoUser({
                Username: userInfo.email,
                Pool: cognitoUserPool
            });
            setLoading(true);

            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess() {
                    cognitoUser.changePassword(
                        oldPassword,
                        newPassword,
                        (err, result) => {
                            console.log(result);
                            if (result) {
                                dispatch(setMessageUser(UM.PASSWORD_CHANGES));
                                setLoading(false);
                            }
                        }
                    );
                },
                onFailure(err) {
                    console.log(err);
                }
            });
        }
    }

    return (
        <div
            id="security"
            className="tab-pane  security-block fade active show">
            <h2 className="security-title font-bold">Change Password</h2>
            <form
                action=""
                method="post"
                className="security-form"
                onSubmit={startChangePassword}>
                {/*<h2 className="form-title">Change Password</h2>*/}
                <div className="settings-page-inputs">
                    <TextField
                        variant="standard"
                        label="Old Password"
                        type={oldPasswordView ? 'text' : 'password'}
                        error={oldPasswordError}
                        onChange={changeOldPassword}
                        helperText="Enter your current password"
                        style={{ width: 300 }}
                    />
                    {oldPasswordView ? (
                        <i
                            className="far fa-eye-slash settings-page"
                            onClick={() => {
                                closeText(passwordTypes.old);
                            }}
                        />
                    ) : (
                        <i
                            className="far fa-eye settings-page"
                            onClick={() => {
                                openText(passwordTypes.old);
                            }}
                        />
                    )}
                </div>
                <div className="mt-4 settings-page-inputs">
                    <TextField
                        type={newPasswordView ? 'text' : 'password'}
                        label="New Password"
                        error={newPasswordError}
                        onChange={passwordChange}
                        helperText="Enter your new password"
                        style={{ width: 300 }}
                    />
                    {newPasswordView ? (
                        <i
                            className="far fa-eye-slash settings-page"
                            onClick={() => {
                                closeText(passwordTypes.new);
                            }}
                        />
                    ) : (
                        <i
                            className="far fa-eye settings-page"
                            onClick={() => {
                                openText(passwordTypes.new);
                            }}
                        />
                    )}
                </div>
                <div className="mt-4 settings-page-inputs">
                    <TextField
                        type={RepeatPasswordView ? 'text' : 'password'}
                        label="Repeat Password"
                        error={RepeatPasswordError}
                        onChange={changeRepeatPassword}
                        helperText="Repeat your new password"
                        style={{ width: 300 }}
                    />
                    {RepeatPasswordView ? (
                        <i
                            className="far fa-eye-slash settings-page"
                            onClick={() => {
                                closeText(passwordTypes.repeat);
                            }}
                        />
                    ) : (
                        <i
                            className="far fa-eye settings-page"
                            onClick={() => {
                                openText(passwordTypes.repeat);
                            }}
                        />
                    )}
                </div>
                <button type="submit" className="pass-btn mt-5">
                    Change Password
                    {loading && (
                        <Spinner
                            animation="border"
                            variant="light"
                            className="ml-2"
                        />
                    )}
                </button>
            </form>
        </div>
    );
};

export default SecuritySection;
