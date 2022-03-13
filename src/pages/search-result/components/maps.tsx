import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import { GOOGLE_API_KEY_MAP } from 'utils/google';
import mapGeo from 'assets/images/map-geo.png';
import { Link } from 'react-router-dom';

import {
    countryFlag,
    eventUrlPublicPrivate,
    getEventDate,
    keyGenerator
} from 'utils/helpers';
import { setOpenModalToView } from 'redux/modals';
import ReactPlayer from 'react-player';
import { history } from 'utils/helpers';

type PropsMaps = {
    openClose?: boolean;
};

const openCLosMapsBlock = {
    active: 'map-event event-box',
    none: 'map-event event-box d-none'
};

const AnyReactComponent = ({ event }: any) => {
    const dispatch = useDispatch();
    const [openClose, setOpenClose] = useState(false);
    function openCloseBlock() {
        setOpenClose(!openClose);
    }

    /**
     *
     * @param e
     */
    function playVideo(e: any) {
        const ThisVideoURL = e.target.getAttribute('data-url');
        const eventName = e.target.getAttribute('data-name');
        dispatch(
            setOpenModalToView({
                eventName,
                videoLink: ThisVideoURL,
                modalShow: true
            })
        );
    }
    function openEventPage() {
        history.push(eventUrlPublicPrivate(event));
    }
    return (
        <>
            <div
                className={
                    openClose
                        ? openCLosMapsBlock.active
                        : openCLosMapsBlock.none
                }>
                {event.coverURL ? (
                    <div
                        className="img-part"
                        style={{ backgroundImage: `url(${event.coverURL})` }}>
                        <Link to="#" className="event-btn">
                            EVENT
                        </Link>
                    </div>
                ) : (
                    <div className="event-img-for-search">
                        <ReactPlayer height="100%" url={event.videoURL} />
                        <i
                            className="fas fa-play-circle"
                            onClick={playVideo}
                            data-url={event.videoURL}
                            data-name={event.name}
                        />
                    </div>
                )}
                <div className="txt-part">
                    <h3 className="txt-part_txt">{getEventDate(event)}</h3>
                    <h2 className="txt-part_title" onClick={openEventPage}>
                        {event.name}
                    </h2>
                    <p className="flag-txt mb-0">
                        <img
                            style={{ width: '25px' }}
                            className="mr-2"
                            src={countryFlag(event)}
                            alt="event country flag"
                        />
                        <span className="b-bottom">
                            {event.geolocation?.country}
                        </span>
                    </p>
                </div>
            </div>
            <div className="marker-event" onClick={openCloseBlock}>
                <img src={mapGeo} alt="" />
            </div>
        </>
    );
};

function Maps({ openClose }: PropsMaps) {
    const ResultEvents = useSelector(
        (state: ISearchResultPage) => state.searchResultPageK
    ).setResultEvents;

    const ResultBook = useSelector(
        (state: ISearchResultPage) => state.searchResultPageK
    ).setResultBook;

    const [geos, setGeos] = useState<IEvent[]>([]);

    useEffect(() => {
        setGeos([]);
        ResultEvents.map((event: any) => {
            if (event.entity) {
                setGeos((oldArray) => [...oldArray, { ...event.entity }]);
            }
        });

        ResultBook.map((book: any) => {
            if (book.entity.userEvent) {
                setGeos((oldArray) => [
                    ...oldArray,
                    { ...book.entity.userEvent }
                ]);
            }
        });
    }, [ResultEvents]);

    function printGeoCenter(array: IEvent[]) {
        const oneEvent = array.find(
            (event: IEvent) =>
                event.geolocation.longitude && event.geolocation.latitude
        );
        return oneEvent
            ? {
                  lat: oneEvent.geolocation.latitude || 0,
                  lng: oneEvent.geolocation.longitude || 0
              }
            : {
                  lat: 0,
                  lng: 0
              };
    }

    return (
        <section
            className="maps-to-search"
            style={{ width: openClose ? '60%' : 0 }}>
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '3px',
                    overflow: 'hidden'
                }}>
                <GoogleMapReact
                    bootstrapURLKeys={{
                        key: GOOGLE_API_KEY_MAP
                    }}
                    defaultCenter={printGeoCenter(geos)}
                    defaultZoom={0}>
                    {geos.map((event: IEvent) => {
                        return (
                            <AnyReactComponent
                                key={keyGenerator(30)}
                                lat={
                                    event.geolocation
                                        ? event.geolocation.latitude
                                        : 0
                                }
                                lng={
                                    event.geolocation
                                        ? event.geolocation.longitude
                                        : 0
                                }
                                event={event}
                            />
                        );
                    })}
                </GoogleMapReact>
            </div>
        </section>
    );
}

export default Maps;
