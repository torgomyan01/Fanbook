import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Form, Spinner } from 'react-bootstrap';
import { login, setError, setLoading } from 'redux/auth.slice';
import {
    PASSWORD_LENGTH,
    setMessageUser,
    userIsLogin,
    validateEmail
} from 'utils/helpers';
import { ConfirmUserRegister, userRegister } from 'api/all-apis';
import { UM } from 'utils/user-messages';
import { setUseType } from 'redux/login-reg-user';
import GoogleSignUpButton from './components/google-sign-up-button';
import { UserLoginTypes } from 'enums/enums';

const SignUp = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector((state: IAuth) => state.sign.loading);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isCheckedTerms, setIsCheckedTerms] = useState(false);
    const [code, setCode] = useState('');
    const [showVerification, setShowVerification] = useState(false);

    const error = useSelector((state: IAuth) => state.sign.error);
    const VALID = 6;

    const [userEmailValid, setUserEmailValid] = useState<string>('');

    useEffect(() => {
        if (error && error.message.includes('not confirmed')) {
            setShowVerification(true);
            dispatch(setError(null));
        }
    }, [error]);

    const registerUser = useCallback(
        (e) => {
            e.preventDefault();
            const r = /\d+/;
            if (
                password === '' ||
                email === '' ||
                firstName === '' ||
                lastName === ''
            ) {
                dispatch(setMessageUser(UM.FILL_ALL));
            } else if (password.match(r) === null) {
                dispatch(setMessageUser(UM.PASS_NUM));
            } else if (password.length < PASSWORD_LENGTH) {
                dispatch(setMessageUser(UM.PASS_MIN_LENGTH(PASSWORD_LENGTH)));
            } else if (!validateEmail(email)) {
                dispatch(setMessageUser(UM.REG_EMAIL_ADDRESS));
            } else if (!isCheckedTerms) {
                dispatch(setMessageUser(UM.REG_CONFIRM));
            } else {
                dispatch(setError(''));
                dispatch(setLoading(true));

                userRegister({
                    username: email,
                    password,
                    profile: {
                        first_name: firstName,
                        last_name: lastName
                    }
                })
                    .then((res) => {
                        const result = res.data.data.item;
                        setUserEmailValid(
                            result.CodeDeliveryDetails.Destination
                        );
                        setShowVerification(true);
                        dispatch(setError(''));
                        dispatch(setLoading(false));
                    })
                    .catch((err) => {
                        dispatch(setMessageUser(err?.response?.data?.message));
                        dispatch(setError(''));
                        dispatch(setLoading(false));
                    });
            }
        },
        [password, email, firstName, lastName, isCheckedTerms, dispatch]
    );

    const [loadingVerify, setLoadingVerify] = useState<boolean>(false);
    const validateUser = useCallback(
        (e) => {
            e.preventDefault();
            setLoadingVerify(true);

            if (code === '') {
                dispatch(setMessageUser(UM.NO_VER_CODE));
                return;
            } else {
                ConfirmUserRegister({
                    username: email,
                    code
                })
                    .then(() => {
                        setLoadingVerify(false);
                        dispatch(setMessageUser(UM.THANK_REG));
                        setTimeout(() => {
                            dispatch(setMessageUser(UM.P_W));
                            dispatch(
                                login({
                                    username: email,
                                    pass: password,
                                    isLogin: userIsLogin.normalLogin
                                })
                            );
                        }, 1000);
                    })
                    .catch(() => {
                        setLoadingVerify(false);
                    });
            }
        },
        [code, email]
    );

    function ValidateRegistration() {
        return !isCheckedTerms;
    }

    return (
        <>
            <>
                <h3 className="modal-right_pretitle">
                    Dont have an account?{' '}
                    <span
                        className="modal-right_link ml-1 f-myriadproreg cursor-pointer"
                        onClick={() =>
                            dispatch(setUseType(UserLoginTypes.signIn))
                        }>
                        Sign in
                    </span>
                </h3>
                <h2 className="modal-right_title">Sign up to Fanbooks</h2>
                <div className="btn-box d-flex justify-content-between">
                    <GoogleSignUpButton />
                </div>
                <div className="or-box">
                    <div className="b-bottom">
                        <span className="or-txt">Or</span>
                    </div>
                </div>
            </>
            {showVerification ? (
                <>
                    <p className="mt-3">
                        <b>{userEmailValid}</b> has been sent the activation
                        code of your page, please check and enter the code in
                        the specified field
                    </p>
                    <Form className="form-block">
                        {error && (
                            <Alert variant="danger">{error.message}</Alert>
                        )}
                        <div className="d-flex">
                            <div className="w-100 mb-3">
                                <label htmlFor="name">Vefication code</label>
                                <input
                                    id="verification"
                                    type="text"
                                    className="w-100"
                                    maxLength={VALID}
                                    defaultValue={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="btn-box d-flex justify-content-between">
                            <Button
                                onClick={validateUser}
                                className="red-btn position-relative mr-2">
                                Validate
                                {loadingVerify && (
                                    <Spinner
                                        animation="border"
                                        variant="light"
                                    />
                                )}
                            </Button>
                        </div>
                    </Form>
                </>
            ) : (
                <Form className="">
                    {error && <Alert variant="danger">{error.message}</Alert>}

                    <div className="d-flex justify-content-between">
                        <div className="w-48per mr-4per mb-3">
                            <label htmlFor="name">First Name</label>
                            <input
                                id="name"
                                type="text"
                                className="w-100"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="w-48per">
                            <label htmlFor="lname">Last Name</label>
                            <input
                                id="lname"
                                type="text"
                                className="w-100"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </div>
                    </div>
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
                    <div className="mb-3">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            className="w-100"
                            minLength={PASSWORD_LENGTH}
                            // value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="check-box mb-4">
                        <input
                            type="checkbox"
                            id="terms"
                            required
                            checked={isCheckedTerms}
                            onChange={(e) =>
                                setIsCheckedTerms(e.target.checked)
                            }
                        />
                        <div className="terms-checked">
                            <i className="fas fa-check" />
                        </div>
                        <label htmlFor="terms" className="check-txt">
                            Creating an account means you’re okay with our&nbsp;
                            <span className="terms">Terms of Service</span>{' '}
                            and&nbsp;
                            <span className="terms">Privacy Policy.</span>
                        </label>
                    </div>
                    <div className="btn-box d-flex justify-content-between">
                        <Button
                            type="submit"
                            onClick={registerUser}
                            disabled={ValidateRegistration()}
                            className="red-btn position-relative mr-2">
                            Create Account
                            {isLoading && (
                                <Spinner animation="border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </Spinner>
                            )}
                        </Button>
                    </div>
                </Form>
            )}
        </>
    );
};

export default SignUp;
