import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

function PreBlock() {
    return (
        <div className="pre-block">
            <div className="container-fluid wrapper1">
                <div className="row">
                    <div className="col-sm-6 col-12 mb-sm-0 mb-3">
                        <h2 className="mb-2 f-omnesMedium">Your pre-order</h2>
                        <Link to="#" className="btn buy-btn">
                            Buy Now
                            <FontAwesomeIcon
                                icon={faShoppingCart}
                                className="c-white ml-1"
                            />
                        </Link>
                    </div>
                    <div className="col-sm-6 col-12 text-right d-flex justify-content-sm-end justify-content-start align-items-center">
                        <Link to="#" className="btn create-btn">
                            Create New Pre-order
                            <FontAwesomeIcon icon={faPlus} className="ml-3" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PreBlock;
