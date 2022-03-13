import React from 'react';
import added1 from 'assets/images/added-1.jpg';
import added2 from 'assets/images/added-2.jpg';
import added3 from 'assets/images/added-3.jpg';
import { Link } from 'react-router-dom';

function AddedSection() {
    return (
        <section className="added-section ">
            <div className="container-fluid wrapper1 ">
                <div className="row">
                    <div className="col-12 mb-4">
                        <h2 className="added-title font-bold">
                            Similar Events
                        </h2>
                    </div>
                    <Link
                        to="/event"
                        className="col-lg-4 col-md-6 mb-lg-0 mb-md-5 mb-3 cursor-pointer">
                        <div className="added-box trans">
                            <div
                                className="img-box"
                                style={{
                                    backgroundImage: `url(${added1})`
                                }}
                            />
                            <div className="txt-box ">
                                <p className="date-txt">
                                    1 – 2 June 2019, 10:00 AM
                                </p>
                                <h2 className="event-txt mb-2">
                                    Harley-Davidson Event 2020
                                </h2>
                                <p className="cust-txt mb-0">
                                    *Customize book by adding in photos that you
                                    took at the event.
                                </p>
                            </div>
                        </div>
                    </Link>
                    <Link
                        to="/event"
                        className="col-lg-4 col-md-6 mb-lg-0 mb-md-5 mb-3 cursor-pointer">
                        <div className="added-box trans ml-md-auto mr-md-auto">
                            <div
                                className="img-box"
                                style={{
                                    backgroundImage: `url(${added2})`
                                }}
                            />
                            <div className="txt-box ">
                                <p className="date-txt">
                                    1 – 2 June 2019, 10:00 AM
                                </p>
                                <h2 className="event-txt mb-2">
                                    Harley-Davidson Event 2020
                                </h2>
                                <p className="cust-txt mb-0">
                                    *Customize book by adding in photos that you
                                    took at the event.
                                </p>
                            </div>
                        </div>
                    </Link>
                    <Link
                        to="/event"
                        className="col-lg-4 col-md-6 offset-lg-0 offset-md-3 mb-lg-0 mb-md-5 mb-3 cursor-pointer">
                        <div className="added-box trans ml-auto">
                            <div
                                className="img-box"
                                style={{
                                    backgroundImage: `url(${added3})`
                                }}
                            />
                            <div className="txt-box ">
                                <p className="date-txt">
                                    1 – 2 June 2019, 10:00 AM
                                </p>
                                <h2 className="event-txt mb-2">
                                    Harley-Davidson Event 2020
                                </h2>
                                <p className="cust-txt mb-0">
                                    *Customize book by adding in photos that you
                                    took at the event.
                                </p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default AddedSection;
