import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { ALL_URL } from 'utils/urls';
import { setUserLoginMethod } from 'redux/auth.slice';
import { history, isUserLogin, userIsLogin } from 'utils/helpers';
import { setOpenCloseModal, setUseType } from 'redux/login-reg-user';
import { UserLoginTypes } from 'enums/enums';

const BecomePublisherButton = ({ className }: { className?: string }) => {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: IAuth) => state.sign.user.profile);

    const url = window.location.pathname.includes('/publisher');

    function openLoginMethod(e: any) {
        e.preventDefault();
        if (isUserLogin()) {
            url
                ? history.push(ALL_URL.SIGN_UP_PUBLISHER)
                : history.push(ALL_URL.PUBLISHER);
        } else {
            dispatch(setUserLoginMethod(userIsLogin.becomePublisher));
            dispatch(setOpenCloseModal(true));
            dispatch(setUseType(UserLoginTypes.signIn));
        }
    }

    return (
        <Link
            to="#"
            onClick={openLoginMethod}
            className={`red-btn ${className || ''} ${
                userInfo && userInfo.publisherProfile !== null && 'd-none'
            }`}>
            <span>Become Publisher</span>
            <FontAwesomeIcon icon={faUser} />
        </Link>
    );
};

export default BecomePublisherButton;
