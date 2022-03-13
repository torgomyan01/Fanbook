import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function SelectBox({ title, subTitle, price }) {
    return (
        <div className="col-lg-4 col-12 mb-lg-0 mb-md-5 mb-3">
            <div className="select-box text-center h-100 d-flex flex-column justify-content-between trans">
                <div className="mb-xl-5 mb-3">
                    <FontAwesomeIcon icon={faBookOpen} />
                </div>
                <div>
                    <h3 className="fs35 f-omnesMedium">{title}</h3>
                    <p className="fs18 lh-14 mb-4 f-myriadproreg">
                        {subTitle}{' '}
                    </p>
                    <Link
                        href="#"
                        className="btn buy-btn w-100 mw-100 position-relative">
                        Pre-order
                        <span className="price-txt f-myriadproreg font-bold">
                            ${price}
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SelectBox;
