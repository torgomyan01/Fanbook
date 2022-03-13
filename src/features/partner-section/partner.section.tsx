import React from 'react';
import { BecomePublisherButton } from '../components';
import { userIsPublisher } from 'utils/helpers';
import { Fade } from 'react-awesome-reveal';

const PartnerSection = () => {
    return (
        <>
            {!userIsPublisher((_P: boolean) => {}) && (
                <section className="partner-section position-relative">
                    <div className="container-fluid wrapper1">
                        <div className="row">
                            <div className="col-12">
                                <div className="mw-56 text-center">
                                    <Fade direction="left">
                                        <h2 className="partner-title">
                                            Become a Fanbooks partner
                                        </h2>
                                    </Fade>
                                    <Fade direction="right">
                                        <p className="partner-txt ml-auto mr-auto">
                                            You could be promoting your Fanbooks
                                            for sale and generating revenue very
                                            quickly.
                                        </p>
                                    </Fade>
                                    <Fade>
                                        <BecomePublisherButton className="ml-auto mr-auto" />
                                    </Fade>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*<LoadBox />*/}
                </section>
            )}
        </>
    );
};

export default PartnerSection;
