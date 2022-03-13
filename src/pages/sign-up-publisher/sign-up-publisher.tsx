import React, { useEffect } from 'react';

import 'assets/css/options.css';

//COMPONENTS
import { SignUpPublisherFirstStep } from './sign-up-publisher-first-step';
import { SignUpPublisherSecondStep } from './sign-up-publisher-second-step';
import { SignUpPublisherComplated } from './sign-up-publisher-completed';
import { SignUpPublisherHeader } from './sign-up-publisher-header';
import { SignUpPublisherInformation } from './sign-up-publisher-information';
import { useDispatch, useSelector } from 'react-redux';
import { setStep } from 'redux/become-publisher';

export const SignUpPublisherContainer = () => {
    const dispatch = useDispatch();
    const step = useSelector(
        (state: IBecomePublisher) => state.BecomePublisher.step
    );
    useEffect(() => {
        dispatch(setStep(0));
    }, []);

    return (
        <>
            <SignUpPublisherHeader />
            <SignUpPublisherInformation step={step} />
            <SignUpPublisherFirstStep step={step} />
            <SignUpPublisherSecondStep step={step} />
            <SignUpPublisherComplated step={step} />
        </>
    );
};
