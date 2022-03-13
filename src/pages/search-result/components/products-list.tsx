import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { keyGenerator } from 'utils/helpers';
import BookBlockList from './book-block-list';
import PublisherBlockList from './publisher-block-list';
import EventBlockList from './event-block-list';

function ProductsList() {
    const ResultEvents = useSelector(
        (state: ISearchResultPage) => state.searchResultPageK
    ).setResultEvents;
    const ResultPublisher = useSelector(
        (state: ISearchResultPage) => state.searchResultPageK
    ).setResultPublisher;

    const ResultBook = useSelector(
        (state: ISearchResultPage) => state.searchResultPageK
    ).setResultBook;

    const EventsStatus = useSelector(
        (state: ISearchResultPage) => state.searchResultPageK.eventStatus
    );

    const PublisherStatus = useSelector(
        (state: ISearchResultPage) => state.searchResultPageK.publishStatus
    );

    const BookStatus = useSelector(
        (state: ISearchResultPage) => state.searchResultPageK.bookStatus
    );
    return (
        <>
            <div className="row">
                {EventsStatus &&
                    ResultEvents.map((event: any) => {
                        return (
                            <EventBlockList
                                key={keyGenerator(30)}
                                event={event.entity}
                            />
                        );
                    })}

                {PublisherStatus &&
                    ResultPublisher.map((publisher: any) => {
                        return (
                            <PublisherBlockList
                                key={keyGenerator(30)}
                                publisher={publisher.entity}
                            />
                        );
                    })}

                {BookStatus &&
                    ResultBook.map((book: any) => {
                        return (
                            <BookBlockList
                                key={keyGenerator(30)}
                                book={book.entity}
                            />
                        );
                    })}
            </div>
        </>
    );
}

export default ProductsList;
