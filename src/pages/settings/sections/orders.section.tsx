import React, { useEffect, useState } from 'react';
import { GetOrder } from 'api/all-apis';
import { keyGenerator } from 'utils/helpers';
import OrderHistoryLoading from './order-history-loading';
import OrderBlock from './order-block';
import InputMask from 'react-input-mask';
import MaskedInput from 'react-text-mask';

const defPagination = {
    from: 0,
    limit: 0,
    page: 0,
    pages: 0,
    to: 0,
    total: 0
};

const OrdersSection = () => {
    const [orders, setOrders] = useState<IOrder[]>([]);

    const [ordersLoading, setOrdersLoading] = useState(true);

    const [pagination, setPagination] = useState(defPagination);
    const [pageNumber, setPageNumber] = useState<number>(1);

    useEffect(() => {
        setOrdersLoading(true);
        GetOrder({
            'page[number]': pageNumber,
            'page[size]': 10,
            sort: '-createdAt',
            'append[0]': 'items',
            'append[1]': 'timeline',
            'append[2]': 'items.userEvent'
        }).then((res) => {
            setPagination(res.data.data.pagination);
            setPageNumber(res.data.data.pagination.page);
            setOrders(res.data.data.items);
            setOrdersLoading(false);
        });
    }, [pageNumber]);

    function minusPage() {
        setPageNumber((pageNumber: number) => pageNumber - 1);
    }

    function plusPage() {
        setPageNumber((pageNumber: number) => pageNumber + 1);
    }

    function setPageInput(e: any) {
        const pageNum = Number(e.target.value);
        pageNum <= pagination.pages && setPageNumber(pageNum);
    }

    return (
        <div id="order" className="tab-pane plans-block fade active show">
            <h2 className="plans-title font-bold">Order History</h2>
            <section className="list-view-section">
                <div className="container-fluid wrapper1">
                    {ordersLoading ? (
                        <>
                            <OrderHistoryLoading />
                            <OrderHistoryLoading />
                        </>
                    ) : (
                        orders.map((order: IOrder) => {
                            if (order.items.length > 0) {
                                return (
                                    <OrderBlock
                                        key={keyGenerator(30)}
                                        order={order}
                                    />
                                );
                            }
                        })
                    )}
                    {pagination.pages > 1 && (
                        <div className="events-pagination mt-3">
                            <button
                                className="btn btn-pagination"
                                onClick={minusPage}
                                disabled={pagination.page === 1}
                                id="btn-prev">
                                <i className="icon-step-arrow-left" />
                            </button>
                            <div className="events-pagination-pages">
                                <MaskedInput
                                    mask={[/\d/, /\d/]}
                                    placeholderChar={'\u2000'}
                                    showMask
                                    value={pageNumber}
                                    onChange={setPageInput}
                                />
                                <p className="d-flex">
                                    /
                                    <span className="events-pages-number ml-2">
                                        {pagination.pages}
                                    </span>
                                </p>
                            </div>
                            <button
                                className="btn btn-pagination"
                                id="btn-next"
                                disabled={pagination.page >= pagination.pages}
                                onClick={plusPage}>
                                <i className="icon-step-arrow-right" />
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default OrdersSection;
