import React, { useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setError } from 'redux/auth.slice';
import { setUseType } from 'redux/login-reg-user';
import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { PASSWORD_LENGTH, setMessageUser } from 'utils/helpers';
import { UM } from 'utils/user-messages';
import { UserLoginTypes } from 'enums/enums';

function ForgotPassword() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState<string>('');
    const [verStart, setVerStart] = useState(false);
    const [verCode, setVErCode] = useState<string>('');
    const [newPass, setNewPass] = useState<string>('');
    const [repeatPassword, setRepeatPassword] = useState<string>('');
    const [loadingToSave, setLoadingToSave] = useState<boolean>(false);
    const [congitoThis, setCongitoThis] = useState<any>();
    const [sendCodeLoading, setSendCodeLoading] = useState<boolean>(false);

    const POOL_ID: any = process.env.REACT_APP_POOL_ID;
    const CLIENT_ID: any = process.env.REACT_APP_CLIENT_ID;

    const poolData = {
        UserPoolId: POOL_ID,
        ClientId: CLIENT_ID
    };
    const userPool = new CognitoUserPool(poolData);

    function getUser() {
        return new CognitoUser({
            Username: email,
            Pool: userPool
        });
    }

    function forgotPasswordF(e: any) {
        e.preventDefault();
        setSendCodeLoading(true);
        if (email) {
            // call forgotPassword on cognitoUser
            getUser().forgotPassword({
                onSuccess() {
                    dispatch(setMessageUser(UM.PASS_CHANGES));
                    dispatch(setUseType(UserLoginTypes.signIn));
                    setSendCodeLoading(false);
                },
                onFailure(err) {
                    dispatch(setError(err));
                },
                inputVerificationCode() {
                    setVerStart(true);
                    setSendCodeLoading(false);
                    setCongitoThis(this);
                }
            });
        }
    }

    function saveNewPassword(e: any) {
        e.preventDefault();
        if (newPass !== repeatPassword) {
            dispatch(setMessageUser(UM.PASS_NOT_MATCH));
            return;
        }
        if (newPass.length < PASSWORD_LENGTH) {
            dispatch(setMessageUser(UM.PASS_MIN_LENGTH(PASSWORD_LENGTH)));
            return;
        }
        setLoadingToSave(true);
        getUser().confirmPassword(verCode, newPass, congitoThis);
    }
    return (
        <div>
            <div className="mb-5">
                <span
                    className="c-blue f-myriadproreg cursor-pointer"
                    onClick={() => dispatch(setUseType(UserLoginTypes.signIn))}>
                    Back To Login
                </span>
            </div>
            {verStart ? (
                <>
                    <h2 className="modal-right_title">Request Sent!</h2>
                    <p>
                        If your email {`"${email}"`} matches with a user, we
                        will send the validation code to that email address.
                    </p>
                    <form action="#">
                        <div className="mb-3">
                            <label htmlFor="ver-code">Verification Code</label>
                            <input
                                type="text"
                                className="w-100"
                                required
                                value={verCode}
                                onChange={(e) => setVErCode(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="new-pass">New Password</label>
                            <input
                                type="password"
                                className="w-100"
                                required
                                min={PASSWORD_LENGTH}
                                value={newPass}
                                onChange={(e) => setNewPass(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="new-pass">Repeat Password</label>
                            <input
                                type="password"
                                className="w-100"
                                required
                                min={PASSWORD_LENGTH}
                                value={repeatPassword}
                                onChange={(e) =>
                                    setRepeatPassword(e.target.value)
                                }
                            />
                        </div>
                        <div className="btn-box d-flex justify-content-between">
                            <Button
                                type="submit"
                                onClick={saveNewPassword}
                                className="red-btn position-relative mr-2">
                                Save
                                {loadingToSave && (
                                    <Spinner animation="border" role="status">
                                        <span className="sr-only">
                                            Loading...
                                        </span>
                                    </Spinner>
                                )}
                            </Button>
                        </div>
                    </form>
                </>
            ) : (
                <>
                    <h2 className="modal-right_title">Forgot Your Password?</h2>
                    <p>
                        To reset your password, please enter your email’s
                        account below. We will send you instructions to recover
                        your account.
                    </p>
                    <form action="#" onSubmit={forgotPasswordF}>
                        <div className="mb-3">
                            <label htmlFor="email">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                className="w-100"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="btn-box d-flex justify-content-between">
                            <Button
                                type="submit"
                                className="red-btn position-relative mr-2">
                                Send code
                                {sendCodeLoading && (
                                    <Spinner
                                        animation="border"
                                        role="status"
                                        className="ml-2"
                                    />
                                )}
                            </Button>
                        </div>
                    </form>
                </>
            )}
        </div>
    );
}

export default ForgotPassword;
