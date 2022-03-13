import React, { useState } from 'react';
import { keyGenerator, PrintCreateTime } from 'utils/helpers';
import moment from 'moment';
import OrderItemBlock from './order-item-block';
import { Collapse, Paper } from '@material-ui/core';

interface IThisProps {
    order: IOrder;
}

function OrderBlock({ order }: IThisProps) {
    const [AllItems, setAllItems] = useState(false);

    function openCloseAllItems() {
        setAllItems(!AllItems);
    }

    return (
        <div className="order-block">
            <div className="row">
                <h4 className="order-number-profile-page fs15">
                    Order number <span className="font-bold">{order.id}</span>
                </h4>
            </div>
            <div className="row order-information-my-profile-page">
                <div>
                    <span className="ordered-on">Ordered on</span>
                    <span className="data">
                        {PrintCreateTime(order?.timeline[0]?.createdAt)}
                    </span>
                    <span className="price">
                        Price:{' '}
                        <span className="c-red font-bold">${order.total}</span>
                    </span>
                </div>
                <div className="fs20">
                    <span className="c-green font-bold">Status: </span>
                    <span
                        style={{ textTransform: 'capitalize' }}
                        className="c-gray">
                        {order.status}
                    </span>
                </div>
            </div>
            <OrderItemBlock
                key={keyGenerator(30)}
                item={order.items[0]}
                order={order}
            />
            {order.items.length > 1 && (
                <>
                    <Collapse in={AllItems}>
                        <Paper
                            elevation={4}
                            style={{
                                width: '100%'
                            }}>
                            {order.items
                                .slice(1, order.items.length)
                                .map((item: ICartBookInfo) => {
                                    return (
                                        <OrderItemBlock
                                            key={keyGenerator(30)}
                                            item={item}
                                            order={order}
                                        />
                                    );
                                })}
                        </Paper>
                    </Collapse>
                    <button
                        onClick={openCloseAllItems}
                        className="btn"
                        style={{ marginLeft: -15 }}>
                        See All
                        <i
                            className="fas fa-chevron-down ml-2 trans"
                            style={{
                                transform: `rotate(${AllItems ? 180 : 0}deg)`
                            }}
                        />
                    </button>
                </>
            )}

            <div className="row justify-content-end border-bottom w-100">
                <div className="mr-4 text-right">
                    {/*<p className="c-gray font-bold">*/}
                    {/*    Delivery:*/}
                    {/*</p>*/}
                    <p className="c-red font-bold">Total Order Value:</p>
                </div>
                <div className="text-left">
                    {/*<p className="c-gray font-bold">*/}
                    {/*    Free Delivery*/}
                    {/*</p>*/}
                    <p className="c-red font-bold">${order.total}</p>
                </div>
            </div>
        </div>
    );
}

export default OrderBlock;
