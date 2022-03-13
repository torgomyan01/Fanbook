import React, { useState } from 'react';
import { keyGenerator, PrintCreateTime, setMessageUser } from 'utils/helpers';
import OrderBlockPublisher from './order-block';
import { Collapse, Paper, Tooltip } from '@material-ui/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { UM } from 'utils/user-messages';
import { useDispatch } from 'react-redux';

interface IThisProps {
    order: IPublisherOrder[];
}

function AllOrdersBlock({ order }: IThisProps) {
    const dispatch = useDispatch();
    const [checked, setChecked] = useState<boolean>(false);

    function openCloseItems() {
        setChecked(!checked);
    }
    const nextOrders = order?.slice(1, order.length);

    const reducer = (total: any, num: IPublisherOrder) => {
        return total + num.subtotal;
    };
    const allPrice = order.reduce(reducer, 0);

    function servicePercent(percent: number, price: number) {
        return Number(((price * percent) / 100).toFixed(2));
    }

    function priceMinusPercent(price: number, percent: number) {
        return (price - percent).toFixed(2);
    }

    return (
        <>
            <div className="row m-0">
                <h4 className="order-number-profile-page fs15">
                    Order number{' '}
                    <Tooltip title="Copy ID" placement="top">
                        <CopyToClipboard
                            text={order[0]?.orderId}
                            onCopy={() => dispatch(setMessageUser(UM.COPIED))}>
                            <span
                                style={{
                                    textDecoration: 'underline',
                                    fontWeight: 600,
                                    color: 'rgb(177 32 41)',
                                    cursor: 'pointer'
                                }}>
                                {order[0]?.orderId}
                            </span>
                        </CopyToClipboard>
                    </Tooltip>
                </h4>
            </div>
            <div className="row order-information-my-profile-page m-0">
                <div>
                    <span className="ordered-on">Ordered on</span>
                    <span className="data">
                        {PrintCreateTime(order[0]?.createdAt)}
                    </span>
                    <span className="price">
                        Price:{' '}
                        <span className="c-red font-bold">
                            ${allPrice.toFixed(2)}
                        </span>
                    </span>
                </div>
            </div>
            <OrderBlockPublisher item={order[0]} />
            {nextOrders.length > 0 && (
                <>
                    <Collapse in={checked}>
                        <Paper elevation={4} style={{ marginLeft: 8 }}>
                            {nextOrders.map((orderItem: IPublisherOrder) => (
                                <OrderBlockPublisher
                                    key={keyGenerator(20)}
                                    item={orderItem}
                                />
                            ))}
                        </Paper>
                    </Collapse>
                    <button className="btn" onClick={openCloseItems}>
                        See All
                        <i
                            className="fas fa-chevron-down ml-2 trans"
                            style={{
                                transform: `rotate(${checked ? 180 : 0}deg)`
                            }}
                        />
                    </button>
                </>
            )}
            <div className="row justify-content-end w-100 m-0">
                <div className="mr-4 text-right">
                    <p className="c-red font-bold">Items (without tax):</p>
                </div>
                <div className="text-left">
                    <p className="c-red font-bold">${allPrice.toFixed(2)}</p>
                </div>
            </div>
            <div className="row justify-content-end w-100 m-0">
                <div className="mr-4 text-right">
                    <p className="c-red font-bold">Service Percent:</p>
                </div>
                <div className="text-left">
                    <p className="c-red font-bold">
                        ${servicePercent(order[0].servicePercent, allPrice)}
                    </p>
                </div>
            </div>
            <div className="row justify-content-end border-bottom w-100 m-0">
                <div className="mr-4 text-right">
                    <p className="c-red font-bold">Total:</p>
                </div>
                <div className="text-left">
                    <p className="c-red font-bold">
                        $
                        {priceMinusPercent(
                            allPrice,
                            servicePercent(order[0].servicePercent, allPrice)
                        )}
                    </p>
                </div>
            </div>
        </>
    );
}

export default AllOrdersBlock;
