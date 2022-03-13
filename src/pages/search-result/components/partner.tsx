import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { publisherGroups, viewUserStatus } from 'utils/helpers';

function Partner() {
    const userStatus = viewUserStatus(publisherGroups.publisher);

    return (
        <>
            {!userStatus && (
                <section className="partner-section position-relative">
                    <div className="container-fluid wrapper1">
                        <div className="row">
                            <div className="col-12">
                                <div className="mw-56 text-center">
                                    <h2 className="partner-title">
                                        Become a Fanbooks partner
                                    </h2>
                                    <p className="partner-txt ml-auto mr-auto">
                                        You could be promoting your Fanbooks for
                                        sale and generating revenue very
                                        quickly.
                                    </p>
                                    <Link
                                        to="/"
                                        className="red-btn ml-auto mr-auto">
                                        <span>Become Publisher</span>{' '}
                                        <FontAwesomeIcon
                                            icon={faUser}
                                            className="Publisher-color-white"
                                        />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*<div className="load-box d-flex">*/}
                    {/*    <div*/}
                    {/*        className="left-box mr-2"*/}
                    {/*        style={{ backgroundImage: `url(${eventBox})` }}*/}
                    {/*    />*/}
                    {/*    <div className="right-box d-flex flex-column justify-content-between">*/}
                    {/*        <h3 className="right-box_title">*/}
                    {/*            Harley-Davidson Event 2020*/}
                    {/*        </h3>*/}
                    {/*        <p className="right-box_txt block-ellipsis">*/}
                    {/*            Our BLANK DIY book allows you to add 30 of your*/}
                    {/*            favorite photos. Choose between{' '}*/}
                    {/*            <Link to="#" className="more-link">*/}
                    {/*                Read More*/}
                    {/*            </Link>*/}
                    {/*        </p>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </section>
            )}
        </>
    );
}

export default Partner;
