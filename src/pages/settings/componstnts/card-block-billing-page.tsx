import React, { useState } from 'react';
import { cardBrand } from 'pages/shipping/components/card-block';
import moment from 'moment';
import { RemovePaymentsMethods } from 'api/all-apis';
import { Spinner } from 'react-bootstrap';

interface IThisProps {
    card: IPaymentsMethods;
    removed: any;
}

function CardBlockBillingPage({ card, removed }: IThisProps) {
    const [removedLoading, setRemovedLoading] = useState(false);
    function removeThisCardBlock() {
        setRemovedLoading(true);
        RemovePaymentsMethods(card.id)
            .then(() => {
                setRemovedLoading(false);
                removed(card.id);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className="accordion-card collapsed border-bottom">
            <div className="d-flex align-items-center justify-content-between">
                <div className="d-sm-flex align-items-center">
                    <span className="mr-4 mb-sm-0 mb-2 fs40 c-red">
                        {cardBrand(card.card.brand)}
                    </span>
                    <div className="accord-txt-box d-flex flex-column justify-content-between mr-4 mb-sm-0 mb-2">
                        <h3 className="card-title">{card.card.brand}</h3>
                        <p className="card-pretitle">
                            Expiration: {card.card.expMonth}/{card.card.expYear}
                        </p>
                    </div>
                    <div className="d-flex flex-column justify-content-between">
                        <h3 className="card-title"> **** {card.card.last4}</h3>
                        <p className="card-pretitle">
                            Added: {moment(card.createdAt).format('ll')}
                        </p>
                    </div>
                </div>
                <div>
                    <span
                        className="fs20 c-red cursor-pointer"
                        onClick={removeThisCardBlock}>
                        {removedLoading ? (
                            <Spinner animation="border" variant="danger" />
                        ) : (
                            <i className="fas fa-trash" />
                        )}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default CardBlockBillingPage;
