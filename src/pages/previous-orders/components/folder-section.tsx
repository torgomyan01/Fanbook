import React from 'react';
import { keyGenerator } from 'utils/helpers';
import AllOrdersBlock from './all-orders-block';

interface IThisProps {
    orders: any[];
}

function FolderSection({ orders }: IThisProps) {
    return (
        <section className="folder-section my-order">
            <div className="folder-box d-flex flex-sm-row flex-column  justify-content-between align-items-sm-center align-items-start w-100">
                <p className="fs24 c-black mb-sm-0 mb-3 font-bold">
                    All Orders
                </p>
            </div>
            {orders.map((order: IPublisherOrder[]) => (
                <AllOrdersBlock key={keyGenerator(20)} order={order} />
            ))}
        </section>
    );
}

export default FolderSection;
