import React from 'react';
import { Link } from 'react-router-dom';
import { keyGenerator, textCrop } from 'utils/helpers';
import fanbookDefault from 'assets/images/fanbookDefault.jpg';
import { useSelector } from 'react-redux';
import { cardBrand } from './card-block';

interface IThisProps {
    confirmedInfo: ISummary | undefined;
}

const OrderConfirmed = ({ confirmedInfo }: IThisProps) => {
    const cardProduct = useSelector(
        (state: IShipping) => state.Shipping.orderInformation
    );
    return (
        <section className="summary-section">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="white-box summary-block">
                            <div className="mw-800">
                                <div className="row">
                                    <div className="col-12">
                                        <h2 className="title">
                                            Order Confirmed
                                        </h2>
                                        <p className="txt">
                                            Thank you for your order! We hope
                                            you enjoy the items you have
                                            purchased. You will also receive an
                                            email with this confirmation and
                                            more details about your order.
                                            <a href="#" className="d-block">
                                                <u>
                                                    Do you have any questions
                                                    about your order? Contact
                                                    Support
                                                </u>
                                            </a>
                                        </p>
                                    </div>
                                </div>
                                <div className="row justify-content-between">
                                    <div className="col-5">
                                        <div className="summary-block-inner">
                                            <div>
                                                <div className="mw-310">
                                                    <h2 className="card-list-title">
                                                        Your Order
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
                                                        Shipping &amp; Handling
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
                                                            ${cardProduct.tax}
                                                        </span>
                                                    </li>

                                                    <li className="txt-item">
                                                        Total
                                                        <span>
                                                            ${cardProduct.total}
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                            <Link
                                                to="/"
                                                className="checkout-big-btn red btn mw-100">
                                                Go Back to Fanbooks
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="summary-block-inner">
                                            <div>
                                                <h2 className="card-list-title">
                                                    Shipping Address
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
                                                    {confirmedInfo?.savedAddress
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
                                                </h2>
                                                <p className="small-txt mb-5">
                                                    <span className="card-icon">
                                                        {confirmedInfo &&
                                                            cardBrand(
                                                                confirmedInfo
                                                                    ?.savedCard
                                                                    .card.brand
                                                            )}
                                                    </span>
                                                    {
                                                        confirmedInfo?.savedCard
                                                            .card.brand
                                                    }{' '}
                                                    ending in ************
                                                    {
                                                        confirmedInfo?.savedCard
                                                            .card.last4
                                                    }
                                                </p>
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
    );
};

export default OrderConfirmed;
