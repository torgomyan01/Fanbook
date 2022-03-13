import React, { useEffect } from 'react';

import 'assets/css/options.css';

//COMPONENTS
import { SignUpPublisherFirstStep } from './sign-up-publisher-first-step';
import { SignUpPublisherHeader } from './sign-up-publisher-header';
import { SignUpPublisherInformation } from './sign-up-publisher-information';
import { useDispatch, useSelector } from 'react-redux';
import { setStepEditInfo } from 'redux/edit-pablisher-information';

export const EditPublisherInformation = () => {
    const dispatch = useDispatch();
    const step = useSelector(
        (state: IEditPublisherInfo) => state.EditPublisherInfo.step
    );
    useEffect(() => {
        dispatch(setStepEditInfo(0));
    }, []);

    return (
        <>
            <SignUpPublisherHeader />
            <SignUpPublisherInformation step={step} />
            <SignUpPublisherFirstStep step={step} />
        </>
    );
};
