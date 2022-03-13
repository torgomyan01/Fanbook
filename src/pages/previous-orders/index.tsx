import React, { useEffect, useState } from 'react';
import 'assets/css/previous-orders.css';
import 'react-bootstrap';
import MainTemplate from 'features/main-template/MainTemplate';

import RecentEventBlock from './components/recent-event-block';
import FolderSection from './components/folder-section';
import { GetPublisherOrders } from 'api/all-apis';
import LoadingOrderBlock from './components/loading-order-block';
import { keyGenerator } from 'utils/helpers';
import MaskedInput from 'react-text-mask';

const PAGE_COUNT = 5;

function PreviousOrders() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loadingPage, setLoadingPage] = useState(true);

    const [mostRecent, setMostRecent] = useState<IPublisherOrder[] | undefined>(
        []
    );
    const [mostRecentLoading, setMostRecentLoading] = useState<boolean>(true);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [pagination, setPagination] = useState({
        from: 0,
        limit: 0,
        page: 0,
        pages: 0,
        to: 0,
        total: 0
    });

    useEffect(() => {
        GetPublisherOrders({
            'page[number]': 1,
            'page[size]': 1,
            'append[0]': 'userEvent',
            sort: '-createdAt',
            'filter[orderId]': 'any',
            mode: 'order'
        })
            .then((res) => {
                setMostRecent(res.data?.data?.items[0]);
                setMostRecentLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        setLoadingPage(true);
        GetPublisherOrders({
            'page[number]': pageNumber,
            'page[size]': PAGE_COUNT,
            'append[0]': 'userEvent',
            sort: '-createdAt',
            'filter[orderId]': 'any',
            mode: 'order'
        })
            .then((res) => {
                setPagination(res.data.data.pagination);
                setOrders(res.data.data.items);
                setLoadingPage(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [pageNumber]);

    const AllOrders = orders?.filter(
        (order) => mostRecent && order[0]?.id !== mostRecent[0]?.id
    );

    function setPageInput(e: any) {
        const pageNum = Number(e.target.value);
        pageNum <= pagination.pages && setPageNumber(pageNum);
    }

    function minusPage() {
        setPageNumber((pageNumber) => pageNumber - 1);
    }

    function plusPage() {
        setPageNumber((pageNumber) => pageNumber + 1);
    }

    return (
        <div className="event-details-page list-view previous-orders my-library">
            <MainTemplate
                blackLogo={true}
                shopBlock={true}
                searchBlock={true}
                style="#f8f8f8">
                <section className="list-view-section">
                    <div className="container-fluid wrapper1">
                        <div className="fs28 c-black d-flex align-items-center mt-3">
                            <i
                                className="fas fa-shopping-bag mr-2"
                                style={{ color: '#032e6d' }}
                            />
                            My Orders
                        </div>
                        <div className="row">
                            <div className="col-12">
                                {mostRecentLoading ? (
                                    <div className="recent-event-block">
                                        <h2 className="recent-event_title f-omnesMedium">
                                            Most Recent Order
                                        </h2>
                                        <LoadingOrderBlock />
                                    </div>
                                ) : (
                                    mostRecent && (
                                        <RecentEventBlock
                                            RecentEvent={mostRecent}
                                        />
                                    )
                                )}
                                {loadingPage ? (
                                    <section className="folder-section my-order">
                                        <div className="folder-box d-flex flex-sm-row flex-column  justify-content-between align-items-sm-center align-items-start w-100">
                                            <p className="fs24 c-black mb-sm-0 mb-3 font-bold">
                                                All Orders
                                            </p>
                                        </div>
                                        {[
                                            ...Array.from(
                                                Array(PAGE_COUNT).keys()
                                            )
                                        ].map(() => (
                                            <LoadingOrderBlock
                                                key={keyGenerator(20)}
                                            />
                                        ))}
                                    </section>
                                ) : orders.length > 0 ? (
                                    <FolderSection orders={AllOrders} />
                                ) : (
                                    <h1 className="no-result-h1">No Orders</h1>
                                )}
                                <div className="d-flex justify-content-center">
                                    {pagination.pages > 1 && (
                                        <div className="events-pagination">
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
                                                disabled={
                                                    pagination.page >=
                                                    pagination.pages
                                                }
                                                onClick={plusPage}>
                                                <i className="icon-step-arrow-right" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </MainTemplate>
        </div>
    );
}

export default PreviousOrders;
