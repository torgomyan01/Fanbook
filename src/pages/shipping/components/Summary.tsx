import React, { useState } from 'react';
import { setCheckoutBlock } from 'redux/modals';
import { useDispatch, useSelector } from 'react-redux';
import { keyGenerator, textCrop } from 'utils/helpers';
import fanbookDefault from 'assets/images/fanbookDefault.jpg';
import { cardBrand } from './card-block';
import ModalEditShippingAddress from './modal-edit-shippingaddress';
import { Link } from 'react-router-dom';
import ModalEditPaymentInformation from './modal-edit-payment-information';
import { ConfirmCard, UpdateCardInformation } from 'api/all-apis';
import { Spinner } from 'react-bootstrap';
import { setNewCard } from 'redux/site-card';

interface IThisProps {
    onContinue: any;
    confirmedInfo: ISummary | undefined;
    Address: IAddress[];
    saveChangesEditAddress: any;
    PaymentsMethods: IPaymentsMethods[];
}

const Summary = ({
    onContinue,
    confirmedInfo,
    Address,
    saveChangesEditAddress,
    PaymentsMethods
}: IThisProps) => {
    const dispatch = useDispatch();
    const cardProduct = useSelector(
        (state: IShipping) => state.Shipping.orderInformation
    );
    function openCardBlock() {
        dispatch(setCheckoutBlock(true));
    }

    const [modalEditAddress, setModalEditAddress] = useState<boolean>(false);
    function closeModalEditAddress() {
        setModalEditAddress(false);
    }
    function openModalEditAddress() {
        setModalEditAddress(true);
    }

    function changeAddress(res: string) {
        const changesAddress = Address.find(
            (address: IAddress) => address.id === res
        );
        const _confirmedInfo = { ...confirmedInfo };
        saveChangesEditAddress({
            savedAddress: changesAddress,
            savedCard: _confirmedInfo.savedCard
        });
    }

    const [modalEditPaymentInformation, setModalEditPaymentInformation] =
        useState<boolean>(false);

    function _savePaymentsChanges(res: string) {
        const changesCard = PaymentsMethods.find(
            (card: IPaymentsMethods) => card.id === res
        );
        const _confirmedInfo = { ...confirmedInfo };
        saveChangesEditAddress({
            savedAddress: _confirmedInfo.savedAddress,
            savedCard: changesCard
        });
    }

    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
    function confirmOrder() {
        if (confirmedInfo) {
            setConfirmLoading(true);
            UpdateCardInformation({
                giftCode: 'GIFT_FREE_SHIPPING',
                shippingAddressId: confirmedInfo.savedAddress.id,
                paymentMethodStripeId: confirmedInfo.savedCard.id
            })
                .then(() => {
                    EndStepConfirm();
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    function EndStepConfirm() {
        ConfirmCard()
            .then(() => {
                setConfirmLoading(false);
                onContinue(3);
                dispatch(setNewCard(0));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <>
            <section className="summary-section">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="white-box summary-block">
                                <div className="mw-800">
                                    <div className="row">
                                        <div className="col-12">
                                            <h2 className="title">Summary</h2>
                                        </div>
                                    </div>
                                    <div className="row justify-content-between">
                                        <div className="col-5">
                                            <div className="summary-block-inner">
                                                <div>
                                                    <div className="mw-310">
                                                        <h2 className="card-list-title">
                                                            Your Order
                                                            <a href="#">
                                                                <span className="icon-pen-angled" />
                                                                <span
                                                                    className="b-bottom"
                                                                    onClick={
                                                                        openCardBlock
                                                                    }>
                                                                    Edit
                                                                </span>
                                                            </a>
                                                        </h2>
                                                        <ul className="card-list">
                                                            {cardProduct.items.map(
                                                                (
                                                                    item: ICartBookInfo
                                                                ) => {
                                                                    return (
                                                                        <li
                                                                            key={keyGenerator(
                                                                                30
                                                                            )}
                                                                            className="card-item">
                                                                            <div className="d-flex">
                                                                                <div
                                                                                    className="img-box"
                                                                                    style={{
                                                                                        backgroundImage: `url(${
                                                                                            item.avatarUrl
                                                                                                ? item.avatarUrl
                                                                                                : fanbookDefault
                                                                                        })`
                                                                                    }}
                                                                                />
                                                                                <div className="txt-box">
                                                                                    <p className="fs15 c-gray mb-1">
                                                                                        {
                                                                                            item.entityType
                                                                                        }
                                                                                    </p>
                                                                                    <h2 className="f-omnesMedium fs19 mb-2">
                                                                                        {textCrop(
                                                                                            item.name,
                                                                                            10
                                                                                        )}
                                                                                    </h2>
                                                                                    <span className="fs15 border px-2 d-inline-block mb-1">
                                                                                        {
                                                                                            item.qty
                                                                                        }
                                                                                    </span>
                                                                                    <p className="fs15 c-red f-omnesMedium mb-2">
                                                                                        $
                                                                                        {
                                                                                            item.price
                                                                                        }
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </li>
                                                                    );
                                                                }
                                                            )}
                                                        </ul>
                                                    </div>
                                                    <ul className="txt-list mb-5">
                                                        <li className="txt-item">
                                                            Items (without tax)
                                                            <span>
                                                                $
                                                                {
                                                                    cardProduct.subtotal
                                                                }
                                                            </span>
                                                        </li>
                                                        <li className="txt-item">
                                                            Shipping &amp;
                                                            Handling
                                                            <span>
                                                                $
                                                                {
                                                                    cardProduct.shipping
                                                                }
                                                            </span>
                                                        </li>
                                                        <li className="txt-item">
                                                            Tax
                                                            <span>
                                                                $
                                                                {
                                                                    cardProduct.tax
                                                                }
                                                            </span>
                                                        </li>

                                                        <li className="txt-item">
                                                            Total
                                                            <span>
                                                                $
                                                                {
                                                                    cardProduct.total
                                                                }
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div
                                                    onClick={confirmOrder}
                                                    className="checkout-big-btn red btn mw-100">
                                                    Confirm Your Order
                                                    {confirmLoading && (
                                                        <Spinner
                                                            animation="border"
                                                            variant="light"
                                                            className="ml-2"
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="summary-block-inner">
                                                <div>
                                                    <h2 className="card-list-title">
                                                        Shipping Information
                                                        <Link
                                                            to="#"
                                                            onClick={
                                                                openModalEditAddress
                                                            }>
                                                            <span className="b-bottom">
                                                                Edit
                                                            </span>
                                                        </Link>
                                                    </h2>
                                                    <ul className="mb-5">
                                                        <li className="small-txt mb-2">
                                                            {
                                                                confirmedInfo
                                                                    ?.savedAddress
                                                                    .name
                                                            }
                                                        </li>
                                                        <li className="small-txt mb-2">
                                                            {
                                                                confirmedInfo
                                                                    ?.savedAddress
                                                                    .address1
                                                            }
                                                        </li>
                                                        {confirmedInfo
                                                            ?.savedAddress
                                                            .address2 && (
                                                            <li className="small-txt mb-2">
                                                                {
                                                                    confirmedInfo
                                                                        ?.savedAddress
                                                                        .address2
                                                                }
                                                            </li>
                                                        )}
                                                        <li className="small-txt mb-2">
                                                            <span>
                                                                {
                                                                    confirmedInfo
                                                                        ?.savedAddress
                                                                        .city
                                                                }
                                                                ,{' '}
                                                                {
                                                                    confirmedInfo
                                                                        ?.savedAddress
                                                                        .countryCode
                                                                }
                                                            </span>
                                                            <span className="round">
                                                                .
                                                            </span>
                                                            <span>
                                                                {
                                                                    confirmedInfo
                                                                        ?.savedAddress
                                                                        .zip
                                                                }
                                                            </span>
                                                            <span className="round">
                                                                .
                                                            </span>
                                                            <span>
                                                                {
                                                                    confirmedInfo
                                                                        ?.savedAddress
                                                                        .country
                                                                }
                                                            </span>
                                                        </li>
                                                    </ul>
                                                    <h2 className="card-list-title">
                                                        Payment Information
                                                        <Link
                                                            to="#"
                                                            onClick={() =>
                                                                setModalEditPaymentInformation(
                                                                    true
                                                                )
                                                            }>
                                                            <span className="icon-pen-angled" />
                                                            <span className="b-bottom">
                                                                Edit
                                                            </span>
                                                        </Link>
                                                    </h2>
                                                    <p className="small-txt mb-5">
                                                        <span className="card-icon">
                                                            {confirmedInfo &&
                                                                cardBrand(
                                                                    confirmedInfo
                                                                        ?.savedCard
                                                                        .card
                                                                        .brand
                                                                )}
                                                        </span>
                                                        {confirmedInfo?.savedCard.card.brand.toUpperCase()}{' '}
                                                        Ending in ***********
                                                        {
                                                            confirmedInfo
                                                                ?.savedCard.card
                                                                .last4
                                                        }
                                                    </p>
                                                </div>
                                                <div
                                                    onClick={() =>
                                                        onContinue(1)
                                                    }
                                                    className="checkout-big-btn  btn mw-100">
                                                    Go back
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ModalEditShippingAddress
                show={modalEditAddress}
                closeModal={closeModalEditAddress}
                address={Address}
                activeID={confirmedInfo ? confirmedInfo.savedAddress.id : ''}
                changeAddress={changeAddress}
            />

            <ModalEditPaymentInformation
                closeModal={() => setModalEditPaymentInformation(false)}
                show={modalEditPaymentInformation}
                paymentsMethods={PaymentsMethods}
                activeMethods={confirmedInfo ? confirmedInfo.savedCard.id : ''}
                savePaymentsChanges={_savePaymentsChanges}
            />
        </>
    );
};

export default Summary;
