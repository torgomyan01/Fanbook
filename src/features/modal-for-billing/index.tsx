import React, { FormEvent, useState } from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenCreateBilling } from 'redux/modals';
import { Link } from 'react-router-dom';
import 'assets/css/settings.css';
import card from 'assets/images/settings/white-credit-card.png';
import { TextField } from '@material-ui/core';
import InputMask from 'react-input-mask';
import CartValid from '../card-valid/card-valid';
import { CreatePaymentsMethods } from 'api/all-apis';
import { AlertSiteTypes } from 'enums/enums';
import { setMessageUser } from 'utils/helpers';
import { UM } from 'utils/user-messages';

interface IThisProps {
    addedNew: any;
}

function ModalForBilling({ addedNew }: IThisProps) {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: IAuth) => state.sign.user.profile);
    const modalShow = useSelector(
        (state: AllModalSite) => state.AllModalSiteTwo.modalBilling
    );

    function closeModal() {
        dispatch(setOpenCreateBilling(false));
    }
    const [cardName, setCardName] = useState<string>('');
    const [cardNumber, setCardNumber] = useState<string>('');
    const [expirationDate, setExpirationDate] = useState<string>('');
    const [csv, setCsv] = useState<string>('');
    const [addCartLoading, setAddCartLoading] = useState(false);

    function cratePayment(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const expSplit = expirationDate.split('/');
        const expMonth = expSplit[0];
        const expYear = expSplit[1];

        if (!cardName && !cardNumber && !expirationDate && !csv) {
            dispatch(setMessageUser(UM.FILL_ALL));
            return;
        }
        setAddCartLoading(true);
        const data = {
            type: 'card',
            billingDetails: {
                email: userInfo?.email,
                name: userInfo?.lastName
            },
            card: {
                number: cardNumber.replace(/-/g, ''),
                expMonth: Number(expMonth),
                expYear: Number(expYear),
                cvc: csv
            }
        };
        CreatePaymentsMethods(data)
            .then((res) => {
                addedNew(res.data.data.item);
                setAddCartLoading(false);
            })
            .catch((err) => {
                setAddCartLoading(false);
                if (err.response.status === 500) {
                    dispatch(
                        setMessageUser([
                            err.response.data.message,
                            AlertSiteTypes.error
                        ])
                    );
                }
            });
    }
    return (
        <Modal
            show={modalShow}
            onHide={closeModal}
            centered={true}
            className="modal-bg-blur-effect">
            <Modal.Header closeButton>
                <Modal.Title>Add a Payment Method</Modal.Title>
            </Modal.Header>
            <form action="#" className="w-100" onSubmit={cratePayment}>
                <Modal.Body>
                    <TextField
                        className="my-2 w-100"
                        label="Name on Card"
                        required={true}
                        value={cardName.toUpperCase()}
                        onChange={(e) => setCardName(e.target.value)}
                    />
                    <div className="position-relative">
                        <InputMask
                            mask="9999-9999-9999-9999"
                            onChange={(e) => setCardNumber(e.target.value)}
                            disabled={false}>
                            {() => (
                                <TextField
                                    className="my-2 w-100"
                                    label="Credit Card Number"
                                    required={true}
                                />
                            )}
                        </InputMask>
                        <CartValid
                            cc={cardNumber}
                            className="cc-icon-for-shipping"
                        />
                    </div>
                    <div className="row mt-3">
                        <div className="col-6">
                            <InputMask
                                mask="99/99"
                                disabled={false}
                                onChange={(e) =>
                                    setExpirationDate(e.target.value)
                                }>
                                {() => (
                                    <TextField
                                        className="my-2 w-100"
                                        label="Expiration Date"
                                        required={true}
                                    />
                                )}
                            </InputMask>
                        </div>
                        <div className="col-6">
                            <InputMask
                                mask="999"
                                disabled={false}
                                onChange={(e) => setCsv(e.target.value)}>
                                {() => (
                                    <TextField
                                        className="my-2 w-100"
                                        label="CSV"
                                        required={true}
                                    />
                                )}
                            </InputMask>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-danger">
                        Add Card
                        {addCartLoading && (
                            <Spinner
                                animation="border"
                                variant="light"
                                className="ml-2"
                            />
                        )}
                    </button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}

export default ModalForBilling;
