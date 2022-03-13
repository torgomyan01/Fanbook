import React from 'react';
import { Link } from 'react-router-dom';

function SettingsSectionA() {
    return (
        <section className="settings-section">
            <div className="container-fluid wrapper1">
                <div className="row">
                    <div className="col-lg-6 col-12 d-flex align-items-center mb-lg-0 mb-3">
                        <h2 className="settings-title font-bold mb-0 d-inline-block mr-5">
                            Publisher Settings
                        </h2>
                        <ul className="d-flex align-items-center mb-0">
                            <li className="mr-2">
                                <span className="fs15">Settings</span>
                            </li>
                            <li className="mr-2">
                                <span className="c-gray"> &gt;</span>
                            </li>
                            <li>
                                <span
                                    id="settings-fild"
                                    className="fs15 c-gray">
                                    Embeddable Settings
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-6 col-12">
                        <div className="text-lg-right text-left">
                            <Link to="" className="btn view-btn c-black">
                                <i className="fas fa-question-circle mr-2 c-red" />
                                View our help desk article on embedding Fanbooks
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SettingsSectionA;
