import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import { keyGenerator } from 'utils/helpers';
import { cardBrand } from './card-block';
import moment from 'moment';

interface IThisProps {
    show: boolean;
    closeModal: any;
    paymentsMethods: IPaymentsMethods[];
    activeMethods: string;
    savePaymentsChanges: any;
}

function ModalEditPaymentInformation({
    show,
    closeModal,
    paymentsMethods,
    activeMethods,
    savePaymentsChanges
}: IThisProps) {
    const [cardChecked, setCardChecked] = useState<string>('');

    useEffect(() => {
        setCardChecked(activeMethods);
    }, [activeMethods]);

    function saveThisChangesMethods() {
        closeModal();
        savePaymentsChanges(cardChecked);
    }

    return (
        <Modal
            show={show}
            onHide={closeModal}
            centered={true}
            size="lg"
            className="modal-bg-blur-effect">
            <Modal.Header closeButton>
                <Modal.Title>Edit Payments Methods</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ul className="bordered-list">
                    <RadioGroup
                        aria-label="saving-address"
                        name="Address"
                        value={cardChecked}
                        onChange={(event, value) => setCardChecked(value)}>
                        {paymentsMethods.map((card: IPaymentsMethods) => {
                            return (
                                <li
                                    key={keyGenerator(20)}
                                    className="border-item">
                                    <div className="form-item d-flex justify-content-between w-100">
                                        <FormControlLabel
                                            value={card.id}
                                            control={<Radio />}
                                            className="radio-shipping"
                                            checked={cardChecked === card.id}
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
                                                        Expiration:{' '}
                                                        {card.card.expMonth}/
                                                        {card.card.expYear}
                                                    </span>
                                                </p>
                                            </div>
                                            <div>
                                                <p className="big-txt">
                                                    **** {card.card.last4}
                                                </p>
                                                <p className="small-txt mb-0 ml-2">
                                                    Added:
                                                    {moment(
                                                        card.createdAt
                                                    ).format('ll')}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </RadioGroup>
                </ul>
            </Modal.Body>
            <Modal.Footer>
                <button
                    className="btn btn-danger bgc-red border-0"
                    onClick={saveThisChangesMethods}>
                    Save Method
                </button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalEditPaymentInformation;
