import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

const Balance = () => {
    const userInfo = useSelector((state: IAuth) => state.sign.user.profile);
    return (
        <Fragment>
            <ul className="d-flex mb-3 align-items-center mt-4">
                <li className="mr-5 fs26">
                    <p className="mb-0 font-bold">Balance</p>
                </li>
            </ul>
            <span className="d-block fs30 mb-4">${userInfo?.balance}</span>
        </Fragment>
    );
};

export default Balance;
