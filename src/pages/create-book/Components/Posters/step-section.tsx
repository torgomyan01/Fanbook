import React from 'react';
import { Link } from 'react-router-dom';
import step1 from 'assets/images/poster/step1.svg';
import step2 from 'assets/images/poster/step2.svg';
import step3 from 'assets/images/poster/step3.svg';
import { scrollToBlock } from 'utils/helpers';
import { two_step_create_poster } from './select-book-section';

interface IThisProps {
    status: boolean;
    open: any;
}

export const step_one_create_poster_page = 'step-one-create-poster-page';

function StepSection({ status, open }: IThisProps) {
    function openStep1() {
        open(true);
        scrollToBlock(two_step_create_poster);
    }
    return (
        <section
            className="step-section"
            id={step_one_create_poster_page}
            style={{
                height: status ? 'unset' : '0',
                padding: status ? '4.375rem 0' : 'unset'
            }}>
            <div className="container-fluid wrapper1">
                <div className="row">
                    <div className="col-12 text-center">
                        <h2 className="step-section_title f-omnesMedium">
                            How it Works
                        </h2>
                        <p className="step-section_txt f-myriadprolight lh-13">
                            Steps on how the process of creating a poster work
                        </p>
                    </div>
                    <div className="col-md-4 col-12 mb-md-0 mb-3 mb-">
                        <div className="step-box mr-md-auto m-auto  d-flex flex-column justify-content-between h-100 position-relative">
                            <div>
                                <span className="step-txt text-left mb-2 d-inline-block">
                                    STEP 1:
                                </span>
                                <div className="step-box-img">
                                    <img
                                        src={step1}
                                        alt="step one to crate poster"
                                    />
                                </div>
                            </div>
                            <div>
                                <h2 className="fs23 f-omnesMedium mb-3 text-center">
                                    Choose a Poster Size
                                </h2>
                                <p className="fs17 f-myriadprolight lh-14 text-center mb-0 lh-13">
                                    Select a poster size that your photo will be
                                    printend on. 18”x24”, 24”x36”...
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-12 mb-md-0 mb-3">
                        <div className="step-box m-auto d-flex flex-column justify-content-between h-100 position-relative">
                            <div>
                                <span className="step-txt text-left mb-2 d-inline-block">
                                    STEP 2:
                                </span>
                                <div className="step-box-img">
                                    <img
                                        src={step2}
                                        alt="step one to crate poster"
                                    />
                                </div>
                            </div>
                            <div>
                                <h2 className="fs23 f-omnesMedium mb-3 text-center">
                                    Select your Poster Type
                                </h2>
                                <p className="fs17 f-myriadprolight lh-14 text-center mb-0 lh-13">
                                    Choose the poster type you want.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-12 mb-md-0 mb-3">
                        <div className="step-box ml-md-auto m-auto d-flex flex-column justify-content-between h-100 position-relative">
                            <div>
                                <span className="step-txt text-left mb-2 d-inline-block">
                                    STEP 3:
                                </span>
                                <div className="step-box-img">
                                    <img
                                        src={step3}
                                        alt="step 3 from create poster"
                                    />
                                </div>
                            </div>
                            <div>
                                <h2 className="fs23 f-omnesMedium mb-3 text-center">
                                    Select &amp; Crop Photo
                                </h2>
                                <p className="fs17 f-myriadprolight lh-14 text-center mb-0">
                                    Choose which photo you want to include in
                                    the poster, fitting your poster size.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="btn-box text-center">
                            <Link
                                to="#"
                                className="btn red-btn"
                                onClick={openStep1}>
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
