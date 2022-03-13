import React from 'react';
import { Link } from '@material-ui/core';
import { getGoogleAuthURL } from 'utils/google';

const GoogleSignUpButton = () => {
    return (
        <Link
            href={getGoogleAuthURL()}
            className="blue-btn-google position-relative w-100">
            Sign in with Google
        </Link>
    );
};

export default GoogleSignUpButton;
