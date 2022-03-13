import React from 'react';
import { useSelector } from 'react-redux';
import { keyGenerator } from 'utils/helpers';
import EventAndAlbumBlock from './event-and-album-block';
import LoadingEventAndAlbumBlock from './loading-event-and-album-block';
import BlockPlaceholder from 'features/block-placeholder';

function EventsAndAlbums() {
    const PBInformation = useSelector(
        (state: IPublisherProfile) => state.PublisherProfile.data
    );
    const PBPageLoading = useSelector(
        (state: IPublisherProfile) => state.PublisherProfile.loading
    );

    return (
        <div className="album-block">
            <div className="row">
                <div className="col-12">
                    <h2 className="album-title">
                        <span className="font-bold mr-2">
                            {PBPageLoading ? (
                                <BlockPlaceholder
                                    width={100}
                                    height={25}
                                    borderRadius={5}
                                    status={true}
                                    count={1}
                                    className="m-0 mr-2"
                                />
                            ) : (
                                <>
                                    {PBInformation?.item.publisherProfile?.name}
                                    ’s
                                </>
                            )}
                        </span>
                        Events &amp; Albums
                    </h2>
                </div>
                {PBPageLoading ? (
                    <>
                        <LoadingEventAndAlbumBlock />
                        <LoadingEventAndAlbumBlock />
                    </>
                ) : PBInformation && PBInformation.latestEvents.length > 0 ? (
                    PBInformation.latestEvents.map((event: IEvent) => {
                        return (
                            <EventAndAlbumBlock
                                event={event}
                                key={keyGenerator(20)}
                            />
                        );
                    })
                ) : (
                    <p className="ml-3"> No Events And Albums Created Yet </p>
                )}
            </div>
        </div>
    );
}

// ) : (
//     <p className="ml-3"> No Featured Events Yet </p>
// )

export default EventsAndAlbums;
