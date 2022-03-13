import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setOneBlock } from 'redux/create-book';
import step1 from 'assets/images/poster/step1.svg';
import step2 from 'assets/images/book/step2.svg';
import step3 from 'assets/images/book/step3.svg';
import { keyGenerator } from 'utils/helpers';

function StepSection() {
    const dispatch = useDispatch();
    const openHowTo = useSelector(
        (state: ICreateBook) => state.CreateBook.howIWork
    );

    function openIneStep() {
        dispatch(setOneBlock(true));
    }

    const blockStep = useRef<HTMLElement>(null);

    useEffect(() => {
        openHowTo &&
            window.scrollTo({
                top: blockStep.current?.offsetTop,
                left: 0,
                behavior: 'smooth'
            });
    }, [openHowTo]);

    const stepInfo = [
        {
            stepNumber: 1,
            image: <img src={step1} alt="" />,
            title: 'Select your Book Size',
            description:
                'Choose the book size you want. Number of pages and dimensions.'
        },
        {
            stepNumber: 2,
            image: <img src={step2} alt="" />,
            title: 'Choose a Template',
            description:
                'Select a template that mixes your own content with that of the organizer.'
        },
        {
            stepNumber: 3,
            image: <img src={step3} alt="" />,
            title: 'Select Photos & Content',
            description:
                'Choose which photos you want to include in the book, fitting your template'
        }
    ];

    return (
        <section
            className="step-section"
            ref={blockStep}
            style={{
                height: openHowTo ? 'auto' : 0,
                padding: openHowTo ? '15px' : '0'
            }}>
            <div className="container-fluid wrapper1">
                <div className="row">
                    <div className="col-12 text-center">
                        <h2 className="step-section_title f-omnesMedium">
                            How it Works
                        </h2>
                        <p className="step-section_txt f-myriadprolight lh-13">
                            Steps on how the process of creating a book work
                        </p>
                    </div>
                    {stepInfo.map((step) => {
                        return (
                            <div
                                key={keyGenerator(20)}
                                className="col-md-4 col-12 mb-md-0 mb-3">
                                <div className="step-box ml-md-auto m-auto d-flex flex-column justify-content-between h-100">
                                    <div>
                                        <span className="step-txt text-left mb-2 d-inline-block">
                                            STEP {step.stepNumber}:
                                        </span>
                                        <div className="step-box-img">
                                            {step.image}
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="fs23 f-omnesMedium mb-3 text-center">
                                            {step.title}
                                        </h2>
                                        <p className="text-center">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    <div className="col-12">
                        <div className="btn-box text-center">
                            <Link
                                to="#"
                                className="btn red-btn"
                                onClick={openIneStep}>
                                Get Started Now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default StepSection;
