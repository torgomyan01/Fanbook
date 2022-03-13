import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { viewSearchResult } from 'api/all-apis';
import { Link } from 'react-router-dom';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Spinner } from 'react-bootstrap';
import { openAlert } from 'redux/alert-site';
import {
    setSearchResult,
    setResultEvents,
    setResultPublisher,
    setResultBook,
    setPublisherStatus,
    setBookStatus,
    setEventsStatus
} from 'redux/search-result-page';
import { setMessageUser } from 'utils/helpers';
import { UM } from 'utils/user-messages';

function Filter() {
    const dispatch = useDispatch();
    const allEvents = useSelector((state: IEvents) => state.events.events);
    const result = localStorage.getItem('search-value')
        ? JSON.parse(localStorage.getItem('search-value') as string)
        : '';

    const AllStatusRef = useRef<any>(null);
    const EventStatusRef = useRef<any>(null);
    const BookStatusRef = useRef<any>(null);
    const PublisherStatusRef = useRef<any>(null);

    useEffect(() => {
        dispatch(setSearchResult(result));
    }, [allEvents, result, search]);

    const ResultEvents = useSelector(
        (state: ISearchResultPage) => state.searchResultPageK
    ).setResultEvents;

    const ResultPublisher = useSelector(
        (state: ISearchResultPage) => state.searchResultPageK
    ).setResultPublisher;

    const ResultBook = useSelector(
        (state: ISearchResultPage) => state.searchResultPageK
    ).setResultBook;
    const [loadingSearch, setLoadingSearch] = useState(false);

    const EventsStatusStore = useSelector(
        (state: ISearchResultPage) => state.searchResultPageK.eventStatus
    );

    const PublisherStatusStore = useSelector(
        (state: ISearchResultPage) => state.searchResultPageK.publishStatus
    );

    const BookStatusStore = useSelector(
        (state: ISearchResultPage) => state.searchResultPageK.bookStatus
    );

    useEffect(() => {
        if (EventsStatusStore && PublisherStatusStore && BookStatusStore) {
            AllStatusRef.current?.classList.add('active');
            EventStatusRef.current?.classList.remove('active');
            BookStatusRef.current?.classList.remove('active');
            PublisherStatusRef.current?.classList.remove('active');
        }
    }, [EventsStatusStore, PublisherStatusStore, BookStatusStore]);

    function searchSite(e: any) {
        if (e.key === 'Enter' && e.target.value !== '') {
            dispatch(setResultEvents([]));
            dispatch(setResultPublisher([]));
            dispatch(setResultBook([]));
            setLoadingSearch(true);

            search(e.target.value);
            const valueSearching: string = JSON.stringify(e.target.value);
            localStorage.setItem('search-value', valueSearching);

            dispatch(setMessageUser(UM.P_W));
        }
    }

    useEffect(() => {
        dispatch(setResultEvents([]));

        dispatch(setResultPublisher([]));

        dispatch(setResultBook([]));
        search(result as string);
    }, [result]);

    function search(value: string) {
        viewSearchResult({
            q: value,
            'page[number]': '1',
            'page[size]': '200',
            sort: '-score',
            'filter[userId]': null
        }).then((res: any) => {
            console.log(res);
            setLoadingSearch(false);
            dispatch(openAlert(false));
            const user_event = res.data.data.items.filter(
                (res: any) => res.entityType === 'user_event'
            );
            const user = res.data.data.items.filter(
                (res: any) => res.entityType === 'publisher'
            );
            const book = res.data.data.items.filter(
                (res: any) => res.entityType === 'book'
            );

            dispatch(setResultEvents(user_event));

            dispatch(setResultPublisher(user));

            dispatch(setResultBook(book));
        });
    }

    function PublisherStatus() {
        dispatch(setPublisherStatus(true));
        dispatch(setBookStatus(false));
        dispatch(setEventsStatus(false));
        AllStatusRef.current?.classList.remove('active');
        EventStatusRef.current?.classList.remove('active');
        BookStatusRef.current?.classList.remove('active');
        PublisherStatusRef.current?.classList.add('active');
    }

    function EventsStatus() {
        dispatch(setPublisherStatus(false));
        dispatch(setBookStatus(false));
        dispatch(setEventsStatus(true));
        AllStatusRef.current?.classList.remove('active');
        EventStatusRef.current?.classList.add('active');
        BookStatusRef.current?.classList.remove('active');
        PublisherStatusRef.current?.classList.remove('active');
    }

    function BookStatus() {
        dispatch(setPublisherStatus(false));
        dispatch(setBookStatus(true));
        dispatch(setEventsStatus(false));
        AllStatusRef.current?.classList.remove('active');
        EventStatusRef.current?.classList.remove('active');
        BookStatusRef.current?.classList.add('active');
        PublisherStatusRef.current?.classList.remove('active');
    }

    function AllStatus() {
        dispatch(setPublisherStatus(true));
        dispatch(setBookStatus(true));
        dispatch(setEventsStatus(true));
        AllStatusRef.current?.classList.add('active');
        EventStatusRef.current?.classList.remove('active');
        BookStatusRef.current?.classList.remove('active');
        PublisherStatusRef.current?.classList.remove('active');
    }

    return (
        <div className="main-form w-100">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 d-lg-flex">
                        <div className="mr-lg-4 mr-0 mb-lg-0 mb-3">
                            <div className="position-relative d-inline-block ">
                                <input
                                    type="text"
                                    placeholder="Name and Enter"
                                    defaultValue={result}
                                    onKeyDown={searchSite}
                                />
                                <div className="input-close_icon position-absolute">
                                    {loadingSearch ? (
                                        <Spinner
                                            animation="border"
                                            variant="dark"
                                        />
                                    ) : (
                                        <FontAwesomeIcon icon={faTimes} />
                                    )}
                                </div>
                            </div>
                        </div>
                        <ul className="d-sm-flex d-flex flex-wrap justify-content-between mb-0">
                            <li className="mr-2 mb-sm-0 mb-3">
                                <Link
                                    ref={AllStatusRef}
                                    onClick={AllStatus}
                                    to="#"
                                    className="form-btn trans">
                                    All{' '}
                                    <span className="number-txt ml-1">
                                        (
                                        {ResultPublisher.length +
                                            ResultEvents.length +
                                            ResultBook.length}
                                        )
                                    </span>
                                </Link>
                            </li>
                            <li className="mr-2 mb-sm-0 mb-3">
                                <Link
                                    ref={EventStatusRef}
                                    onClick={EventsStatus}
                                    to="#"
                                    className="form-btn trans">
                                    Events{' '}
                                    <span className="number-txt ml-1">
                                        ({ResultEvents.length})
                                    </span>
                                </Link>
                            </li>
                            <li className="mr-2 mb-sm-0 mb-3">
                                <Link
                                    ref={PublisherStatusRef}
                                    to="#"
                                    onClick={PublisherStatus}
                                    className="form-btn trans">
                                    Publishers{' '}
                                    <span className="number-txt ml-1">
                                        ({ResultPublisher.length})
                                    </span>
                                </Link>
                            </li>
                            <li className="mr-2 mb-sm-0 mb-3">
                                <Link
                                    ref={BookStatusRef}
                                    onClick={BookStatus}
                                    to="#"
                                    className="form-btn trans">
                                    Books{' '}
                                    <span className="number-txt ml-1">
                                        ({ResultBook.length})
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Filter;
