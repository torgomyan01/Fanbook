import React from 'react';
import fanbookDefault from 'assets/images/fanbookDefault.jpg';

import { Link } from 'react-router-dom';
import _st from 'assets/css/poster-block.module.css';
import { eventStatus, history, isUserLogin, userIsLogin } from 'utils/helpers';
import { DEF_URL } from 'utils/urls';
import { setUserLoginMethod } from 'redux/auth.slice';
import { setOpenCloseModal, setUseType } from 'redux/login-reg-user';
import { useDispatch } from 'react-redux';
import { TAB_NAMES } from 'pages/create-book/settings/tab-names';
import { UserLoginTypes } from 'enums/enums';

interface IThisProps {
    event: IEvent;
}

function PosterBlockDoItYourself({ event }: IThisProps) {
    const dispatch = useDispatch();

    const posterOptionPageUrl = `${DEF_URL.CREATE_BOOK}/${event?.id}/${
        TAB_NAMES.POSTERS
    }/${event?.isAvailable ? eventStatus.public : eventStatus.private}`;

    function openStartNow() {
        if (isUserLogin()) {
            history.push(posterOptionPageUrl);
        } else {
            dispatch(setUserLoginMethod(userIsLogin.normalLogin));
            dispatch(setOpenCloseModal(true));
            dispatch(setUseType(UserLoginTypes.signIn));
        }
    }
    return (
        <div className={_st.posterBlock}>
            <div
                className={_st.image}
                style={{
                    backgroundImage: `url(${fanbookDefault})`
                }}
            />
            <Link to="#">
                <h4 className={_st.title}>Do It Yourself</h4>
            </Link>
            <p className={_st.posterDescription}>
                Start creating your own poster by pressing the button below.
            </p>
            <button className={_st.buyButton} onClick={openStartNow}>
                Start Now
            </button>
        </div>
    );
}

export default PosterBlockDoItYourself;
