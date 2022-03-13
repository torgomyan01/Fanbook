import React, { useEffect, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { login, setError } from 'redux/auth.slice';
import { useDispatch, useSelector } from 'react-redux';
import GoogleSignUpButton from './components/google-sign-up-button';
import { setUseType } from 'redux/login-reg-user';
import { UserLoginTypes } from 'enums/enums';

export const RememberUserStorage = 'RememberUser';

const SignIn = () => {
    const dispatch = useDispatch();
    const error = useSelector((state: IAuth) => state.sign.error);
    const isLoading = useSelector((state: IAuth) => state.sign.loading);
    const isLoginTo = useSelector((state: IAuth) => state.sign.isLoginTo);
    const [email, setEmail] = useState<string>('');
    const [pass, setPass] = useState<string>('');
    const [checkBoxRememberMe, setCheckBoxRememberMe] = useState(false);

    // LOGIN USER
    function loginUser(e: any) {
        e.preventDefault();
        dispatch(
            login({
                username: email,
                pass,
                isLogin: isLoginTo
            })
        );
        if (checkBoxRememberMe) {
            localStorage.setItem(RememberUserStorage, email);
        } else {
            localStorage.removeItem(RememberUserStorage);
        }
    }

    // GET USER SAVING EMAIL FOR REMEMBER
    const savingEmail: string | null =
        localStorage.getItem(RememberUserStorage);

    useEffect(() => {
        if (savingEmail) {
            setEmail(savingEmail);
            setCheckBoxRememberMe(true);
        }
    }, [savingEmail]);

    function startForgot() {
        dispatch(setUseType(UserLoginTypes.forgotPassword));
    }

    useEffect(() => {
        if (error && error.message.includes('not confirmed')) {
            dispatch(setUseType(UserLoginTypes.signUp));
        }
    }, [error]);

    return (
        <div>
            <>
                <h3 className="modal-right_pretitle">
                    Dont have an account?{' '}
                    <span
                        className="modal-right_link ml-1 f-myriadproreg cursor-pointer"
                        onClick={() =>
                            dispatch(setUseType(UserLoginTypes.signUp))
                        }>
                        Sign up
                    </span>
                </h3>
                <h2 className="modal-right_title">Sign in to Fanbooks</h2>
                <div className="btn-box d-flex justify-content-between">
                    <GoogleSignUpButton />
                </div>
                <div className="or-box">
                    <div className="b-bottom">
                        <span className="or-txt">Or</span>
                    </div>
                </div>
            </>
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error.message}
                </div>
            )}
            <form action="#" onSubmit={loginUser}>
                <div className="mb-3">
                    <label htmlFor="email">Email Address</label>
                    <input
                        id="email"
                        type="email"
                        className="w-100"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="user-pass"
                        type="password"
                        className="w-100"
                        minLength={8}
                        required
                        autoComplete="new-password"
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                    />
                </div>
                <div className="check-item d-flex justify-content-between mb-4 pr-0 pl-0">
                    <input
                        id="ch-1"
                        type="checkbox"
                        onChange={() => {
                            setCheckBoxRememberMe(!checkBoxRememberMe);
                        }}
                        checked={checkBoxRememberMe}
                    />
                    <label
                        htmlFor="ch-1"
                        className="f-myriadproreg mb-0 d-inline c-gray">
                        Remember Me
                    </label>
                    <span
                        onClick={startForgot}
                        className="c-red f-omnesRegular fs16 cursor-pointer">
                        <u>Forgot your password?</u>
                    </span>
                </div>
                <div className="btn-box d-flex justify-content-between">
                    <Button
                        type="submit"
                        className="red-btn position-relative mr-2">
                        Log In
                        {isLoading && (
                            <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default SignIn;
