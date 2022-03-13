import React from 'react';

import Fans1 from 'assets/images/landing/fans-1.png';
import Fans2 from 'assets/images/landing/fans-2.png';
import Fans3 from 'assets/images/landing/fans-3.png';
import { Fade } from 'react-awesome-reveal';

const FansSection = () => {
    return (
        <section className="fans-section">
            <div className="container-fluid wrapper1">
                <div className="row">
                    <div className="col-12">
                        <Fade direction="left">
                            <h2 className="fans-title text-center">
                                Fans take photos, we do the rest
                            </h2>
                        </Fade>
                        <Fade direction="right">
                            <p className="fans-txt text-center mw-41">
                                <span className="d-block">
                                    *Fanbooks manages printing, support, and
                                    commission payouts.
                                </span>
                                <span className="d-block">
                                    We work with leading binderies in the United
                                    States and Europe to create a{' '}
                                </span>
                                <span className="d-block">
                                    consistent, high-quality soft and hard cover
                                    book that fans will treasure for years.
                                </span>
                            </p>
                        </Fade>
                    </div>
                    <div className="col-xl-4 col-md-6 col-12 mb-xl-0 mb-5">
                        <Fade direction="left">
                            <div
                                className="fans-img_box trans d-flex align-items-center justify-content-center"
                                style={{
                                    backgroundImage: `url(${Fans1})`
                                }}>
                                <p className="print-xtx mb-0">Printing</p>
                            </div>
                        </Fade>
                    </div>
                    <div className="col-xl-4 col-md-6 col-12 mb-xl-0 mb-5">
                        <Fade direction="up">
                            <div
                                className="fans-img_box trans d-flex align-items-center justify-content-center"
                                style={{
                                    backgroundImage: `url(${Fans2})`
                                }}>
                                <p className="print-xtx mb-0">Support</p>
                            </div>
                        </Fade>
                    </div>
                    <div className="col-xl-4 col-md-6 col-12 offset-xl-0 offset-md-3 offset-0 mb-xl-0 mb-5 ">
                        <Fade direction="right">
                            <div
                                className="fans-img_box trans d-flex align-items-center justify-content-center"
                                style={{
                                    backgroundImage: `url(${Fans3})`
                                }}>
                                <p className="print-xtx mb-0">Payouts</p>
                            </div>
                        </Fade>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FansSection;
