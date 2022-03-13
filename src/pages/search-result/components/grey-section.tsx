import React, { useEffect, useState } from 'react';
import Products from './products';
import Maps from './maps';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import ProductsList from './products-list';
import { openCloseMapRX } from 'redux/search-result-page';
import { openCloseMapStorage } from 'utils/helpers';
import {
    faMapMarkerAlt,
    faThLarge,
    faThList
} from '@fortawesome/free-solid-svg-icons';

function GreySection() {
    const dispatch = useDispatch();
    const ResultEvents = useSelector(
        (state: ISearchResultPage) => state.searchResultPageK
    ).setResultEvents;

    const ResultPublisher = useSelector(
        (state: ISearchResultPage) => state.searchResultPageK
    ).setResultPublisher;

    const ResultBook = useSelector(
        (state: ISearchResultPage) => state.searchResultPageK
    ).setResultBook;

    const openCloseMBlock = useSelector(
        (state: ISearchResultPage) => state.searchResultPageK.closeMapMessage
    );
    const openCloseMap = useSelector(
        (state: ISearchResultPage) => state.searchResultPageK.openCloseMap
    );

    const EventsStatus = useSelector(
        (state: ISearchResultPage) => state.searchResultPageK.eventStatus
    );

    const PublisherStatus = useSelector(
        (state: ISearchResultPage) => state.searchResultPageK.publishStatus
    );

    const BookStatus = useSelector(
        (state: ISearchResultPage) => state.searchResultPageK.bookStatus
    );

    useEffect(() => {
        dispatch(openCloseMapRX(Boolean(openCloseMapStorage)));
    }, [dispatch]);

    function openCloseMaps() {
        if (openCloseMap) {
            dispatch(openCloseMapRX(false));
            localStorage.setItem('open-close-map', 'false');
        } else {
            dispatch(openCloseMapRX(true));
            localStorage.setItem('open-close-map', 'true');
        }
    }

    const [prodGridList, setProdGridList] = useState(
        localStorage.getItem('search-result-product-grid-list')
            ? localStorage.getItem('search-result-product-grid-list')
            : 'grid'
    );

    function toList() {
        setProdGridList('list');
        localStorage.setItem('search-result-product-grid-list', 'list');
    }

    function toGrid() {
        setProdGridList('grid');
        localStorage.setItem('search-result-product-grid-list', 'grid');
    }

    const searchResEvent = EventsStatus ? ResultEvents.length : 0;
    const searchResPublisher = PublisherStatus ? ResultPublisher.length : 0;
    const searchResBook = BookStatus ? ResultBook.length : 0;

    const allResult =
        ResultEvents.length + ResultPublisher.length + ResultBook.length;
    const searchResult = searchResEvent + searchResPublisher + searchResBook;

    function sectionPosition(status: boolean) {
        return status
            ? {
                  height: '100vh',
                  overflow: 'scroll',
                  paddingBottom: 50
              }
            : {};
    }

    return (
        <>
            <div className="d-flex">
                <section
                    className="grey-section"
                    style={{
                        width: openCloseMap ? '40%' : '100%',
                        ...sectionPosition(openCloseMap)
                    }}>
                    <div className="container-fluid wrapper1">
                        <div className="row" style={{ marginBottom: 35 }}>
                            <div className="col-6 d-flex align-items-center">
                                <p className="result-txt mb-0">
                                    Showing {searchResult} - {allResult} results
                                </p>
                            </div>
                            <div className="col-6 text-right">
                                <ul className="mb-0 d-flex justify-content-end align-items-center">
                                    <li
                                        className="mr-2 cursor-pointer"
                                        onClick={toGrid}>
                                        <FontAwesomeIcon
                                            icon={faThLarge}
                                            className={
                                                prodGridList === 'grid'
                                                    ? 'c-blue'
                                                    : 'c-gray'
                                            }
                                        />
                                    </li>
                                    <li
                                        className="mr-2 cursor-pointer"
                                        onClick={toList}>
                                        <FontAwesomeIcon
                                            icon={faThList}
                                            className={
                                                prodGridList === 'list'
                                                    ? 'c-blue'
                                                    : 'c-gray'
                                            }
                                        />
                                    </li>
                                    {prodGridList === 'grid' && (
                                        <>
                                            <li className="mr-2">
                                                <Link
                                                    to="#"
                                                    className="maps-icon">
                                                    <FontAwesomeIcon
                                                        icon={faMapMarkerAlt}
                                                    />
                                                </Link>
                                            </li>
                                            <li className="d-flex justify-content-center align-items-center">
                                                <label
                                                    htmlFor="top-check"
                                                    className="swichBox"
                                                    style={
                                                        openCloseMap
                                                            ? {
                                                                  border: '1px solid #0079ff'
                                                              }
                                                            : {
                                                                  border: '1px solid #00000054'
                                                              }
                                                    }>
                                                    <input
                                                        onChange={openCloseMaps}
                                                        className="d-none"
                                                        type="checkbox"
                                                        id="top-check"
                                                    />
                                                    <div
                                                        className="swich-Round"
                                                        style={
                                                            openCloseMap
                                                                ? {
                                                                      left: 25,
                                                                      background:
                                                                          '#0079ff'
                                                                  }
                                                                : {
                                                                      left: 0,
                                                                      background:
                                                                          '#00000054'
                                                                  }
                                                        }
                                                    />
                                                </label>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </div>
                        </div>
                        {prodGridList === 'grid' ? (
                            <Products prodClass={openCloseMap} />
                        ) : (
                            <ProductsList />
                        )}
                    </div>
                </section>
                <Maps openClose={openCloseMap} />
            </div>
        </>
    );
}

export default GreySection;
