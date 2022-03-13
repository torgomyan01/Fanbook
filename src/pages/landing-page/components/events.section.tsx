import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalVViewVideo from 'pages/fp-events-list-view/modal-view-video/modal-view-video';
import EventBlockLandingPage from './event-block';
import { getPublicEvents } from 'api/all-apis';
import { keyGenerator } from 'utils/helpers';
import { setModalShow } from 'redux/my-event.page';
import LoadingBlockEventLandingPage from './loading-block-event';

const EventsSection = () => {
    const dispatch = useDispatch();
    const eventModal = useSelector(
        (state: IMyEventPage) => state.MyEventPage.modalViewVideo
    );

    const [result, setResult] = useState<IEvent[]>([]);
    const [loadingEvents, setLoadingEvents] = useState<boolean>(true);

    useEffect(() => {
        getPublicEvents({
            'page[number]': '1',
            'page[size]': '3',
            sort: '-createdAt',
            'append[0]': 'albums',
            'append[1]': 'user'
        })
            .then((res) => {
                setResult(res.data.data.items);
                setLoadingEvents(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <section className="event-section">
            <div className="container-fluid wrapper1">
                <div className="row">
                    <div className="col-12">
                        <h2 className="event-section_title">Latest Events</h2>
                        <p className="event-section_txt">
                            Customize your book by adding in photos that you
                            took at the event.
                        </p>
                    </div>
                    {loadingEvents ? (
                        <>
                            <LoadingBlockEventLandingPage />
                            <LoadingBlockEventLandingPage />
                            <LoadingBlockEventLandingPage />
                        </>
                    ) : (
                        result.map((event: IEvent) => {
                            return (
                                <EventBlockLandingPage
                                    event={event}
                                    key={keyGenerator(30)}
                                />
                            );
                        })
                    )}
                </div>
            </div>
            <ModalVViewVideo
                eventName={eventModal.event.name}
                videoLink={eventModal.event.url}
                closeModal={() => {
                    dispatch(setModalShow(false));
                }}
                modalShow={eventModal.modalShow}
            />
        </section>
    );
};

export default EventsSection;
