import React from 'react';
import Accordion from './accordion';
import { keyGenerator } from 'utils/helpers';

interface IThisProps {
    events: IEvent[];
}

function AllEvents({ events }: IThisProps) {
    return (
        <div className="all-events_block">
            <h2 className="recent-event_title f-omnesMedium">All Events</h2>
            <div className="folder-section">
                <div className="scroll-horizontal">
                    <ul className="folder-table w-100">
                        {events.slice(1, events.length).map((event: IEvent) => {
                            return (
                                <Accordion
                                    event={event}
                                    key={keyGenerator(30)}
                                />
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default AllEvents;
