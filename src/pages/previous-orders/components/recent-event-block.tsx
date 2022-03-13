import React from 'react';
import AllOrdersBlock from './all-orders-block';

interface IThisProps {
    RecentEvent: IPublisherOrder[];
}

function RecentEventBlock({ RecentEvent }: IThisProps) {
    return (
        <div className="recent-event-block">
            <h2 className="recent-event_title f-omnesMedium">
                Most Recent Order
            </h2>
            <AllOrdersBlock order={RecentEvent || []} />
        </div>
    );
}

export default RecentEventBlock;
