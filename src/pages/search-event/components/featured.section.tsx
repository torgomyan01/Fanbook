import React, { useEffect, useState } from 'react';
import { keyGenerator } from 'utils/helpers';
import LoaderFeatures from './loaderFetures';
import FeaturedEventBlock from './featured-event-block';
import { getPublicEvents } from 'api/all-apis';

const FeaturedSection = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [events, setEvents] = useState<IEvent[]>([]);

    useEffect(() => {
        setLoading(true);
        getPublicEvents({
            'page[number]': '1',
            'page[size]': '2',
            sort: '-createdAt',
            'append[0]': 'albums',
            'append[1]': 'user',
            'filter[isFeatured]': true
        })
            .then((res) => {
                setEvents(res.data.data.items);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <section className="featured-section">
            <div className="row">
                <div className="col-12">
                    <h2 className="featured-title">Featured Events</h2>
                </div>
                {loading ? (
                    <>
                        <LoaderFeatures />
                        <LoaderFeatures />
                    </>
                ) : (
                    events.map((event) => {
                        return (
                            <FeaturedEventBlock
                                key={keyGenerator(30)}
                                event={event}
                            />
                        );
                    })
                )}
            </div>
        </section>
    );
};

export default FeaturedSection;
