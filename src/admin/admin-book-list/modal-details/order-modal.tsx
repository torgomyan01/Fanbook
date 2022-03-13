import React, { useState } from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import { Avatar, TextField, Tooltip } from '@material-ui/core';
import { setMessageUser, userAvatarName } from 'utils/helpers';
import { UM } from 'utils/user-messages';
import { useDispatch } from 'react-redux';
import CopyToClipboard from 'react-copy-to-clipboard';
import { GoConfirmOrder, GoPrintOrder } from 'api/all-apis';
import moment from 'moment';

interface IThisProps {
    modal: {
        openClose: boolean;
        order: IOrder | null;
    };
    close: () => void;
}

function MoreDetailsOrder({ modal, close }: IThisProps) {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState<boolean>(false);
    function PrintOrder() {
        setLoading(true);
        if (modal.order?.id) {
            GoPrintOrder(modal.order.id)
                .then((res) => {
                    console.log(res);
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
        }
    }

    const [loadingConfirm, setLoadingConfirm] = useState<boolean>(false);

    function ConfirmOrder() {
        setLoadingConfirm(true);
        GoConfirmOrder(modal.order?.id || '')
            .then((res) => {
                console.log(res);
                setLoadingConfirm(false);
            })
            .catch((err) => {
                console.log(err);
                setLoadingConfirm(false);
            });
    }

    return (
        <Modal
            size="xl"
            style={{ zIndex: 1000 }}
            show={modal.openClose}
            onHide={close}
            className="book-details-modal modal-bg-blur-effect">
            <Modal.Body>
                <div className="modal-body p-0">
                    <div className="left-part">
                        <div className="left-part_inner h-100 pr-2">
                            <h2 className="modal-title">
                                Order{' '}
                                <Tooltip title="Copy ID" placement="top">
                                    <CopyToClipboard
                                        text={modal.order?.id || ''}
                                        onCopy={() =>
                                            dispatch(setMessageUser(UM.COPIED))
                                        }>
                                        <span
                                            style={{
                                                cursor: 'pointer',
                                                color: '#b12029'
                                            }}>
                                            {modal.order?.id}{' '}
                                            <i className="fas fa-copy ml-2" />
                                        </span>
                                    </CopyToClipboard>
                                </Tooltip>
                            </h2>
                            <div className="d-flex justify-content-start align-items-start">
                                <div className="mr-3">
                                    <Avatar
                                        alt={modal.order?.user.firstName}
                                        src={
                                            modal.order?.user.avatarURL ||
                                            undefined
                                        }
                                        style={{
                                            width: 120,
                                            height: 120,
                                            fontSize: 30
                                        }}>
                                        {userAvatarName(modal.order?.user)}
                                    </Avatar>
                                </div>
                                <div>
                                    <h3 className="font-bold">
                                        {modal.order?.user.firstName}{' '}
                                        {modal.order?.user.lastName}
                                    </h3>
                                    <p>
                                        {modal.order?.user.plan.toUpperCase()}
                                    </p>
                                </div>
                            </div>
                            <h2 className="modal-title mt-5 mb-0">
                                Order Details
                            </h2>
                            <div className="d-flex justify-content-start align-items-center mt-3">
                                <TextField
                                    label="Total"
                                    className="mr-2 w-50"
                                    value={`$${modal.order?.total}`}
                                    disabled={true}
                                />
                                <TextField
                                    label="Discount"
                                    className="w-50"
                                    value={`$${modal.order?.discount}`}
                                    disabled={true}
                                />
                            </div>
                            <div className="d-flex justify-content-start align-items-center mt-3">
                                <TextField
                                    label="Subtotal"
                                    className="mr-2 w-50"
                                    value={`$${modal.order?.subtotal}`}
                                    disabled={true}
                                />
                                <TextField
                                    label="Tax"
                                    className="w-50"
                                    value={`$${modal.order?.tax}`}
                                    disabled={true}
                                />
                            </div>
                            <h2 className="modal-title mt-5 mb-0">
                                Payment Information
                            </h2>
                            <div className="d-flex justify-content-start align-items-center mt-2">
                                <TextField
                                    label="Status"
                                    value={modal.order?.status || 'None'}
                                    disabled={true}
                                    className="mr-2 w-50"
                                />
                                <TextField
                                    label="Created At"
                                    value={moment(
                                        modal.order?.createdAt
                                    ).format('lll')}
                                    disabled={true}
                                    className="w-50"
                                />
                            </div>
                            <div className="d-flex justify-content-start align-items-center mt-2">
                                <TextField
                                    label="Email"
                                    value={
                                        modal.order?.paymentMethod
                                            ?.billingDetails?.email || 'None'
                                    }
                                    disabled={true}
                                    className="mr-2 w-50"
                                />
                                <TextField
                                    label="Name"
                                    className="w-50"
                                    value={
                                        modal.order?.paymentMethod
                                            ?.billingDetails?.name || 'None'
                                    }
                                    disabled={true}
                                />
                            </div>
                            <h2 className="modal-title mt-5 mb-0">Card</h2>
                            <div className="d-flex justify-content-start align-items-center mt-3">
                                <TextField
                                    label="Brand"
                                    className="mr-2 w-50"
                                    value={
                                        modal.order?.paymentMethod?.card?.brand.toUpperCase() ||
                                        'None'
                                    }
                                    disabled={true}
                                />
                                <TextField
                                    label="Card Number"
                                    className="w-50"
                                    value={`************${
                                        modal.order?.paymentMethod?.card
                                            ?.last4 || ' None'
                                    }`}
                                    disabled={true}
                                />
                            </div>
                            <div className="d-flex justify-content-start align-items-center mt-3">
                                <TextField
                                    label="Exp Month"
                                    className="w-50 mr-2"
                                    value={
                                        modal.order?.paymentMethod?.card
                                            ?.expMonth || 'None'
                                    }
                                    disabled={true}
                                />
                                <TextField
                                    label="Exp Year"
                                    className="w-50"
                                    value={
                                        modal.order?.paymentMethod?.card
                                            ?.expYear || 'None'
                                    }
                                    disabled={true}
                                />
                            </div>
                            <h2 className="modal-title mt-5 mb-0">
                                Shipping Address
                            </h2>
                            <div className="d-flex justify-content-start align-items-center mt-3">
                                <TextField
                                    label="Address 1"
                                    className="mr-2 w-50"
                                    value={
                                        modal.order?.shippingAddress
                                            ?.address1 || 'None'
                                    }
                                    disabled={true}
                                />
                                <TextField
                                    label="Address 2"
                                    className="w-50"
                                    value={
                                        modal.order?.shippingAddress
                                            ?.address2 || 'None'
                                    }
                                    disabled={true}
                                />
                            </div>
                            <div className="d-flex justify-content-start align-items-center mt-3">
                                <TextField
                                    label="Country"
                                    className="mr-2 w-50"
                                    value={
                                        modal.order?.shippingAddress?.country ||
                                        'None'
                                    }
                                    disabled={true}
                                />
                                <TextField
                                    label="City"
                                    className="w-50"
                                    value={
                                        modal.order?.shippingAddress?.city ||
                                        'None'
                                    }
                                    disabled={true}
                                />
                            </div>
                            <div className="d-flex justify-content-start align-items-center mt-3">
                                <TextField
                                    label="Name"
                                    className="mr-2 w-50"
                                    value={
                                        modal.order?.shippingAddress?.name ||
                                        'None'
                                    }
                                    disabled={true}
                                />
                                <TextField
                                    label="Region"
                                    className="w-50"
                                    value={
                                        modal.order?.shippingAddress?.region ||
                                        'None'
                                    }
                                    disabled={true}
                                />
                            </div>
                            <div className="d-flex justify-content-start align-items-center mt-3">
                                <TextField
                                    label="ZIP"
                                    className="mr-2 w-50"
                                    value={
                                        modal.order?.shippingAddress?.zip ||
                                        'None'
                                    }
                                    disabled={true}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="right-part">
                        <span className="close-icon" onClick={close}>
                            <i className="fas fa-times" />
                        </span>

                        <div className="d-flex flex-column justify-content-between h-100">
                            <div>
                                <h2 className="modal-title">Actions</h2>
                                <button
                                    className="checkout-btn btn white mw-100 mb-4 btn-modal-admin-book-list"
                                    onClick={ConfirmOrder}>
                                    {loadingConfirm && (
                                        <Spinner
                                            animation="border"
                                            variant="danger"
                                            className="mr-2"
                                        />
                                    )}
                                    Confirm Order
                                </button>
                                <button
                                    className="checkout-btn btn white mw-100 mb-4 btn-modal-admin-book-list"
                                    onClick={PrintOrder}>
                                    {loading && (
                                        <Spinner
                                            animation="border"
                                            variant="danger"
                                            className="mr-2"
                                        />
                                    )}
                                    Send To Bindery
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default MoreDetailsOrder;
