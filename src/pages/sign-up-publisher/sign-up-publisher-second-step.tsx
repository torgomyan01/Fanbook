import React, { useState } from 'react';
import 'assets/css/sign-up-publisher.css';
import { useDispatch, useSelector } from 'react-redux';
import { setStep } from 'redux/become-publisher';
import { BecomePublisher } from 'api/all-apis';
import { Spinner } from 'react-bootstrap';
import { setUser } from 'redux/auth.slice';
import { setMessageUser } from 'utils/helpers';
import { UM } from 'utils/user-messages';

interface IThisProps {
    step: number;
}

export const SignUpPublisherSecondStep = ({ step }: IThisProps) => {
    const dispatch = useDispatch();
    const [checked, setChecked] = useState<boolean>(false);
    const toggleCheck = () => {
        setChecked(!checked);
    };

    const publisherInfo = useSelector(
        (state: IBecomePublisher) => state.BecomePublisher.publisherProfile
    );

    const [loading, setLoading] = useState(false);
    function setPublisher(e: any) {
        e.preventDefault();
        if (!checked) {
            dispatch(setMessageUser(UM.CONFIRM_NEXT));
        } else {
            setLoading(true);

            BecomePublisher(publisherInfo)
                .then((res) => {
                    const newProfile = res.data.data.item;
                    setLoading(false);
                    dispatch(setStep(3));
                    localStorage.setItem('user', JSON.stringify(newProfile));
                    dispatch(
                        setUser({
                            profile: { ...newProfile }
                        })
                    );
                })
                .catch((err) => {
                    setLoading(false);
                    console.log(err);
                });
        }
    }

    function prevStep() {
        dispatch(setStep(1));
    }

    return (
        <section
            className="form-section"
            style={{ display: step === 2 ? 'block' : 'none' }}>
            <div className="container mb-3">
                <div className="c-red cursor-pointer" onClick={prevStep}>
                    <i className="fas fa-arrow-left mr-2" />
                    Prev
                </div>
            </div>
            <div className="container-fluid">
                <div className="terms-block">
                    <div className="row">
                        <div className="col-6">
                            <div className="register-box h-100">
                                <h2 className="register-title fs28">
                                    Terms & Conditions
                                </h2>
                                <form action="" method="">
                                    <div className="form-item-mode">
                                        <input
                                            id="ch-1"
                                            type="checkbox"
                                            hidden
                                            onChange={toggleCheck}
                                        />
                                        <input
                                            id="ch"
                                            type="checkbox"
                                            hidden
                                            onChange={toggleCheck}
                                        />
                                        <label
                                            htmlFor="ch"
                                            className={`formLabel ${
                                                checked ? 'formLabelAfter' : ''
                                            }`}>
                                            I agree to the Fanbooks Publishing
                                            terms of service{' '}
                                            <span className="b-bottom d-inline-block c-blue">
                                                Read
                                            </span>
                                        </label>
                                    </div>
                                    <button
                                        onClick={setPublisher}
                                        className={`signup-btn mt-4 ${
                                            !checked && 'disable-btn'
                                        }`}>
                                        Confirm Registration
                                        {loading && (
                                            <Spinner
                                                animation="border"
                                                variant="light"
                                            />
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="print-block h-100">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h2 className="mb-0 print-title fs28 c-gray">
                                        Terms Of Service
                                    </h2>
                                    {/*<ul className="d-flex mb-0">*/}
                                    {/*    <li className="mr-4">*/}
                                    {/*        <span className="icons">*/}
                                    {/*            <img src={mailICON} alt="" />*/}
                                    {/*        </span>*/}
                                    {/*    </li>*/}
                                    {/*    <li>*/}
                                    {/*        <span className="icons">*/}
                                    {/*            <img src={printICON} alt="" />*/}
                                    {/*        </span>*/}
                                    {/*    </li>*/}
                                    {/*</ul>*/}
                                </div>
                                <div className="print-box">
                                    <div className="print-list">
                                        <ul className="mb-0 pr-2">
                                            <li>
                                                <p className="mb-1">
                                                    1. YOUR AGREEMENT
                                                </p>
                                                <p className="mb-4">
                                                    By using this Site, you
                                                    agree to be bound by, and to
                                                    comply with, these Terms and
                                                    Conditions. If you do not
                                                    agree to these Terms and
                                                    Conditions, please do not
                                                    use this site.
                                                </p>
                                                <p className="mb-4">
                                                    PLEASE NOTE: We reserve the
                                                    right, at our sole
                                                    discretion, to change,
                                                    modify or otherwise alter
                                                    these Terms and Conditions
                                                    at any time. Unless
                                                    otherwise indicated,
                                                    amendments will become
                                                    effective immediately.
                                                    Please review these Terms
                                                    and Conditions periodically.
                                                    Your continued use of the
                                                    Site following the posting
                                                    of changes and/or
                                                    modifications will
                                                    constitute your acceptance
                                                    of the revised Terms and
                                                    Conditions and the
                                                    reasonableness of these
                                                    standards for notice of
                                                    changes. For your
                                                    information, this page was
                                                    last updated as of the date
                                                    at the top of these terms
                                                    and conditions.
                                                </p>
                                            </li>
                                            <li>
                                                <p className="mb-1">
                                                    2. YOUR AGREEMENT
                                                </p>
                                                <p className="mb-4">
                                                    By using this Site, you
                                                    agree to be bound by, and to
                                                    comply with, these Terms and
                                                    Conditions. If you do not
                                                    agree to these Terms and
                                                    Conditions, please do not
                                                    use this site.
                                                </p>
                                                <p className="mb-4">
                                                    PLEASE NOTE: We reserve the
                                                    right, at our sole
                                                    discretion, to change,
                                                    modify or otherwise alter
                                                    these Terms and Conditions
                                                    at any time. Unless
                                                    otherwise indicated,
                                                    amendments will become
                                                    effective immediately.
                                                    Please review these Terms
                                                    and Conditions periodically.
                                                    Your continued use of the
                                                    Site following the posting
                                                    of changes and/or
                                                    modifications will
                                                    constitute your acceptance
                                                    of the revised Terms and
                                                    Conditions and the
                                                    reasonableness of these
                                                    standards for notice of
                                                    changes. For your
                                                    information, this page was
                                                    last updated as of the date
                                                    at the top of these terms
                                                    and conditions.
                                                </p>
                                            </li>
                                            <li>
                                                <p className="mb-1">
                                                    3. YOUR AGREEMENT
                                                </p>
                                                <p className="mb-4">
                                                    By using this Site, you
                                                    agree to be bound by, and to
                                                    comply with, these Terms and
                                                    Conditions. If you do not
                                                    agree to these Terms and
                                                    Conditions, please do not
                                                    use this site.
                                                </p>
                                                <p className="mb-4">
                                                    PLEASE NOTE: We reserve the
                                                    right, at our sole
                                                    discretion, to change,
                                                    modify or otherwise alter
                                                    these Terms and Conditions
                                                    at any time. Unless
                                                    otherwise indicated,
                                                    amendments will become
                                                    effective immediately.
                                                    Please review these Terms
                                                    and Conditions periodically.
                                                    Your continued use of the
                                                    Site following the posting
                                                    of changes and/or
                                                    modifications will
                                                    constitute your acceptance
                                                    of the revised Terms and
                                                    Conditions and the
                                                    reasonableness of these
                                                    standards for notice of
                                                    changes. For your
                                                    information, this page was
                                                    last updated as of the date
                                                    at the top of these terms
                                                    and conditions.
                                                </p>
                                            </li>
                                            <li>
                                                <p className="mb-1">
                                                    4. PRIVACY
                                                </p>
                                                <p className="mb-4">
                                                    Please review our Privacy
                                                    Policy, which also governs
                                                    your visit to this Site, to
                                                    understand our practices.
                                                </p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
