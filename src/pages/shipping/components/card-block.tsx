import React, { useState } from 'react';
import moment from 'moment';
import { FormControlLabel, Radio, Tooltip } from '@material-ui/core';
import { RemovePaymentsMethods } from 'api/all-apis';
import { Spinner } from 'react-bootstrap';

interface IThisProps {
    card: IPaymentsMethods;
    checked: string;
    remove: any;
}

const cardBrandNames = {
    visa: 'visa',
    master: 'mastercard',
    discover: 'discover'
};

export function cardBrand(brandName: string) {
    switch (brandName) {
        case cardBrandNames.visa:
            return <i className="fab fa-cc-visa" />;
        case cardBrandNames.master:
            return <i className="fab fa-cc-mastercard" />;
        case cardBrandNames.discover:
            return <i className="fab fa-cc-discover" />;
    }
}

function CardBlock({ card, checked, remove }: IThisProps) {
    const [loading, setLoading] = useState<boolean>(false);
    function removeCard() {
        setLoading(true);
        RemovePaymentsMethods(card.id).then(() => {
            setLoading(false);
            remove && remove(card.id);
        });
    }
    return (
        <li className="border-item">
            <div className="form-item d-flex justify-content-between w-100">
                <FormControlLabel
                    value={card.id}
                    control={<Radio />}
                    className="radio-shipping"
                    checked={checked === card.id}
                    label=""
                />
                <span className="payment-icon c-red fs35 mr-2">
                    {cardBrand(card.card.brand)}
                </span>
                <div className="d-flex ml-2 w-100">
                    <div>
                        <p className="big-txt">
                            <span className="card-name">
                                {card.card.brand.toUpperCase()}
                            </span>
                        </p>
                        <p className="small-txt mb-0">
                            <span className="card-name">
                                Expiration: {card.card.expMonth}/
                                {card.card.expYear}
                            </span>
                        </p>
                    </div>
                    <div>
                        <p className="big-txt"> **** {card.card.last4}</p>
                        <p className="small-txt mb-0 ml-2">
                            Added: {moment(card.createdAt).format('ll')}
                        </p>
                    </div>
                </div>
                <span>
                    {loading ? (
                        <Spinner animation="border" variant="danger" />
                    ) : (
                        <Tooltip title="Remove Card" placement="top">
                            <i
                                className="fas fa-trash c-red cursor-pointer"
                                onClick={removeCard}
                            />
                        </Tooltip>
                    )}
                </span>
            </div>
        </li>
    );
}

export default CardBlock;
