import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import Events from './event';
import { setCreateModalEvent } from 'redux/my-event.page';
import { keyGenerator } from 'utils/helpers';
import LoadingProcessEvent from './loading-process-event';

interface IThisProps {
    AllEvents: IEvent[];
    loadingProcess: boolean;
}

function EventBlock({ AllEvents, loadingProcess }: IThisProps) {
    const dispatch = useDispatch();
    const date = new Date();
    function openModalCreateEvent() {
        dispatch(setCreateModalEvent(true));
    }

    return (
        <div className="event-block">
            <div className="event-header">
                <h2 className="event-header-title f-omnesMedium">
                    Upcoming Event
                </h2>
            </div>
            {loadingProcess ? (
                <ul className="events-list">
                    <LoadingProcessEvent />
                    <LoadingProcessEvent />
                </ul>
            ) : (
                <>
                    {AllEvents.length === 0 && (
                        <p className="empty-events">
                            You don’t have any upcoming events.
                            <Link to="#" onClick={openModalCreateEvent}>
                                {' '}
                                Create your first one pressing here.
                            </Link>
                        </p>
                    )}

                    {AllEvents.length > 0 && (
                        <ul className="events-list">
                            {AllEvents.map((event: IEvent) => {
                                const toDay = moment(date).unix();
                                const eventDate = moment(event.dateFrom).unix();
                                if (eventDate >= toDay) {
                                    return (
                                        <Events
                                            key={keyGenerator(30)}
                                            event={event}
                                        />
                                    );
                                }
                            })}
                        </ul>
                    )}
                </>
            )}
        </div>
    );
}

export default EventBlock;
