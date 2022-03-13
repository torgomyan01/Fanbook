import React from 'react';
import { useSelector } from 'react-redux';
import { keyGenerator } from 'utils/helpers';
import EventBlockPublisherPage from './Event-block';
import EventBlockPublisherPageLoading from './event-block-loading';
import BlockPlaceholder from 'features/block-placeholder';

function FeaturedEvents() {
    const PBInformation = useSelector(
        (state: IPublisherProfile) => state.PublisherProfile.data
    );
    const PBPageLoading = useSelector(
        (state: IPublisherProfile) => state.PublisherProfile.loading
    );
    return (
        <div className="featured-section">
            <div className="row">
                <div className="col-12">
                    <h2 className="featured-title">
                        <span className="font-bold mr-2">
                            {PBPageLoading ? (
                                <BlockPlaceholder
                                    width={150}
                                    height={30}
                                    borderRadius={5}
                                    status={true}
                                    count={1}
                                    className="m-0"
                                />
                            ) : (
                                <>
                                    {PBInformation?.item.publisherProfile?.name}
                                    ’s
                                </>
                            )}
                        </span>
                        Featured Events
                    </h2>
                </div>

                {PBPageLoading ? (
                    <>
                        <EventBlockPublisherPageLoading />
                        <EventBlockPublisherPageLoading />
                    </>
                ) : PBInformation && PBInformation.featuredEvents.length > 0 ? (
                    PBInformation?.featuredEvents.map(() => {
                        return (
                            <EventBlockPublisherPage key={keyGenerator(20)} />
                        );
                    })
                ) : (
                    <p className="ml-3"> No Featured Events Yet </p>
                )}
            </div>
        </div>
    );
}

export default FeaturedEvents;
