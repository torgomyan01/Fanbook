import React from 'react';
import HeaderPublisher from './header-publisher';
import FeaturedEvents from './featured-events';
import EventsAndAlbums from './events-and-albums';

function RightBlock() {
    return (
        <div className="col-xl-10 col-12">
            <div className="publisher-right">
                <HeaderPublisher />
                <FeaturedEvents />
                <EventsAndAlbums />
            </div>
        </div>
    );
}

export default RightBlock;
