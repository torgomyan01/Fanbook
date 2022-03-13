import React from 'react';
import { useSelector } from 'react-redux';

import PublisherBlock from './publisher-block';
import BookBlock from './book-block';
import EventBlock from './event-block';
import { keyGenerator } from 'utils/helpers';

type prodProps = {
    prodClass: boolean;
};

function Products({ prodClass }: prodProps) {
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
            <div className="row mt-3">
                {EventsStatus &&
                    ResultEvents.map((event: any) => {
                        return (
                            <EventBlock
                                key={keyGenerator(30)}
                                event={event}
                                prodClass={prodClass}
                            />
                        );
                    })}

                {PublisherStatus &&
                    ResultPublisher.map((publisher: any) => {
                        return (
                            <PublisherBlock
                                key={keyGenerator(30)}
                                publisher={publisher}
                                prodClass={prodClass}
                            />
                        );
                    })}

                {BookStatus &&
                    ResultBook.map((book: any) => {
                        return (
                            <BookBlock
                                key={keyGenerator(30)}
                                book={book}
                                prodClass={prodClass}
                            />
                        );
                    })}
            </div>
        </>
    );
}

export default Products;
