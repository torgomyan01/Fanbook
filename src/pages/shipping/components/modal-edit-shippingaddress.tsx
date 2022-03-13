import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import {
    FormControlLabel,
    Radio,
    RadioGroup,
    Tooltip
} from '@material-ui/core';
import { keyGenerator } from 'utils/helpers';

interface IThisProps {
    show: boolean;
    closeModal: any;
    address: IAddress[];
    activeID: string;
    changeAddress: any;
}

function ModalEditShippingAddress({
    show,
    closeModal,
    address,
    activeID,
    changeAddress
}: IThisProps) {
    const [checked, setChecked] = useState<string>('');

    useEffect(() => {
        setChecked(activeID);
    }, [activeID]);

    function changesAddressAndClose() {
        closeModal();
        changeAddress(checked);
    }
    return (
        <Modal
            show={show}
            onHide={closeModal}
            centered={true}
            size="lg"
            className="modal-bg-blur-effect">
            <Modal.Header closeButton>
                <Modal.Title>Edit Shipping Address</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ul className="bordered-list">
                    <RadioGroup
                        aria-label="saving-address"
                        name="Address"
                        value={checked}
                        onChange={(event, value) => setChecked(value)}>
                        {address.map((address: IAddress) => {
                            return (
                                <li
                                    key={keyGenerator(20)}
                                    className="border-item d-flex justify-content-between w-100">
                                    <div className="form-item text-no-wrap">
                                        <FormControlLabel
                                            value={address.id}
                                            control={<Radio />}
                                            className="radio-shipping"
                                            checked={checked === address.id}
                                            label=""
                                        />
                                        <ul>
                                            <li className="big-txt">
                                                <span className="text-no-wrap">
                                                    {address.name} ·{' '}
                                                    {address.address1} ·{' '}
                                                    {address.address2}
                                                </span>
                                            </li>
                                            <li className="small-txt">
                                                <span>
                                                    {address.country} ·{' '}
                                                    {address.city} ·{' '}
                                                    {address.region} ·{' '}
                                                    {address.zip}
                                                </span>
                                            </li>
                                        </ul>
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
                    onClick={changesAddressAndClose}>
                    Save Address
                </button>
            </Modal.Footer>
        </Modal>
    );
}
export default ModalEditShippingAddress;
