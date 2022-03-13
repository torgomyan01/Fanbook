import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCheckCircle,
    faExternalLinkAlt,
    faTimesCircle
} from '@fortawesome/free-solid-svg-icons';

function ExternalWebsiteBlock(props) {
    return (
        <div className="col-md-5 col-12">
            <form
                action=""
                method="post"
                className="d-flex flex-column align-items--end align-items-start">
                <div className="form-group fill">
                    <span className="count mr-2">#1</span>
                    <div className="form-item">
                        <div className="left-part">
                            <FontAwesomeIcon
                                icon={faExternalLinkAlt}
                                className="mr-2 c-red"
                            />
                            <span className="http-txt">http://</span>
                        </div>
                        <input type="text" defaultValue="example.com" />
                        <ul className="right-part d-flex align-items-center mb-0">
                            <li className="mr-2">
                                <span className="check-it">
                                    <FontAwesomeIcon
                                        icon={faCheckCircle}
                                        className="c-red"
                                    />
                                </span>
                            </li>
                            <li>
                                <span className="close-item cp">
                                    <FontAwesomeIcon icon={faTimesCircle} />
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="form-group">
                    <span className="count mr-2">#2</span>
                    <div className="form-item">
                        <div className="left-part">
                            <FontAwesomeIcon
                                icon={faExternalLinkAlt}
                                className="mr-2 c-red"
                            />
                            <span className="http-txt">http://</span>
                        </div>
                        <input type="text" placeholder="example.com" />
                        <ul className="right-part d-flex align-items-center mb-0">
                            <li className="mr-2">
                                <span className="check-it">
                                    <FontAwesomeIcon
                                        icon={faCheckCircle}
                                        className="c-red"
                                    />
                                </span>
                            </li>
                            <li>
                                <span className="close-item cp">
                                    <FontAwesomeIcon icon={faTimesCircle} />
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ExternalWebsiteBlock;
