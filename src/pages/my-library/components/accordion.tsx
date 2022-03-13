import React, { useEffect, useState } from 'react';
import arrowDropdownBlue from 'assets/images/MyLibrary/arrow-dropdown-blue.png';
import arrowDownBlueArrowDownBlue from 'assets/images/MyLibrary/arrow-down-blue.png';
import moment from 'moment';
import ReactPlayer from 'react-player';
import { setModalShow, setModalViewVideo } from 'redux/my-event.page';
import { useDispatch } from 'react-redux';
import { setCurrentEvent } from 'redux/events.slice';
import { setOpenCreateModalAlbum } from 'redux/modals';
import { Link } from 'react-router-dom';
import { DEF_URL } from 'utils/urls';
import AlbumBlock from './album-block';
import { eventUrlPublicPrivate, keyGenerator } from 'utils/helpers';

const accordionProcessingNames = {
    show: 'collapse show',
    hide: 'collapse hide'
};

interface IThisProps {
    event: IEvent;
}

function Accordion({ event }: IThisProps) {
    const dispatch = useDispatch();
    const [accordionEvent, setAccordionEvent] = useState<boolean>(false);
    const [allAlbumsImages, setAllAlbumsImages] = useState<IAlbumFiles[]>([]);

    // FOR TAKE ALL IMAGES EVENT
    useEffect(() => {
        setAllAlbumsImages([]);
        event.albums.map((album: OneAlbum) => {
            album.albumFiles.length > 0 &&
                album.albumFiles.map((files: IAlbumFiles) => {
                    setAllAlbumsImages((oldArray: any[]) => [
                        ...oldArray,
                        files
                    ]);
                });
        });
    }, [event]);

    // OPEN CLOSE ACCORDION BLOCK
    function openCloseAccordion(e: any) {
        e.preventDefault();
        setAccordionEvent(!accordionEvent);
    }
    // TO PLAY VIDEO EVENT
    function playVideo() {
        dispatch(setModalShow(true));
        dispatch(
            setModalViewVideo({
                name: event?.name,
                url: event?.videoURL
            })
        );
    }

    // TO OPEN MODAL CREATE EVENT
    function openModalCreateAlbum(e: any) {
        e.preventDefault();
        dispatch(setOpenCreateModalAlbum(true));
        dispatch(setCurrentEvent(event));
    }

    return (
        <li
            className="trans mt-3"
            style={{ opacity: accordionEvent ? 1 : 0.5 }}>
            <div
                className="item d-flex align-items-center position-relative"
                onClick={openCloseAccordion}>
                <div className="d-flex w-30">
                    {event?.coverURL ? (
                        <span
                            className="all-event-user img-box mr-3"
                            style={{
                                backgroundImage: `url(${event?.coverURL})`
                            }}
                        />
                    ) : (
                        <div className="event-img all-event-user">
                            <ReactPlayer height="100%" url={event?.videoURL} />
                            <i
                                className="fas fa-play-circle"
                                onClick={playVideo}
                                data-url={event?.videoURL}
                                data-name={event?.name}
                            />
                        </div>
                    )}
                    <div className="d-flex flex-column justify-content-center">
                        <h3 className="all-user-title mb-2 fs20 f-omnesMedium">
                            {event.name}
                        </h3>
                        <span className="c-gray fs16 f-myriadproreg mb-2">
                            Created: {moment(event?.createdAt).format('LL')}
                        </span>
                        <span className="c-gray fs16 f-myriadproreg">
                            Last Edited: {moment(event?.updatedAt).format('LL')}
                        </span>
                    </div>
                </div>
                <div className="w-48">
                    <ul className="mb-0 d-flex">
                        <li className="all-event-img img-box mr-1" />
                        {allAlbumsImages.length > 0 ? (
                            allAlbumsImages
                                .slice(0, 6)
                                .map((albumFiles: IAlbumFiles) => {
                                    return (
                                        <li
                                            key={keyGenerator(30)}
                                            className="all-event-img img-box mr-1"
                                            style={{
                                                backgroundImage: `url(${albumFiles.url})`
                                            }}
                                        />
                                    );
                                })
                        ) : (
                            <h4 className="w-50 d-flex justify-content-center align-items-center">
                                <span className="c-gray d-flex justify-content-center align-items-center" />
                            </h4>
                        )}
                        <li className="all-event-img img-box mr-1">
                            <Link
                                to={`${DEF_URL.SERP}/${event.id}`}
                                className="c-red fs16 b-bottom f-myriadproreg">
                                {allAlbumsImages.length > 7 &&
                                    `+${allAlbumsImages.length - 6}`}
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="w-22">
                    <div className=" d-flex align-items-center justify-content-end">
                        <Link
                            to="#"
                            className="libary-txt f-omnesMedium fs16 dn">
                            Expand{' '}
                            <span className="ml-3 open-icon d-inline-block">
                                <img src={arrowDropdownBlue} alt="" />
                            </span>
                        </Link>
                        <Link
                            to="/"
                            onClick={openCloseAccordion}
                            className="libary-txt f-omnesMedium fs16 dib">
                            <span className="ml-3 open-icon d-inline-block">
                                <i
                                    className="fas fa-chevron-down trans fs20 mr-3"
                                    style={{
                                        transform: `rotate(${
                                            accordionEvent ? -180 : 0
                                        }deg)`
                                    }}
                                />
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
            <div
                className={
                    accordionEvent
                        ? accordionProcessingNames.show
                        : accordionProcessingNames.hide
                }>
                <div className="card-body mb-4">
                    <div className="btn-box ">
                        <Link
                            to="#"
                            onClick={openModalCreateAlbum}
                            className="btn library-btn">
                            <i className="fas fa-plus mr-2" />
                            New Album
                        </Link>
                        <Link
                            to={eventUrlPublicPrivate(event)}
                            className="btn event-btn">
                            Go to Event{' '}
                            <i className="fas fa-long-arrow-alt-right ml-3" />
                        </Link>
                    </div>
                    <table className="folder-table w-100">
                        <tbody>
                            {event.albums.length > 0 ? (
                                event.albums.map((album: OneAlbum) => {
                                    return (
                                        <AlbumBlock
                                            key={keyGenerator(30)}
                                            album={album}
                                        />
                                    );
                                })
                            ) : (
                                <tr className="p-0">
                                    <td className="w-100 p-0">
                                        <p className="m-0 p-0 pl-2 c-red text-center">
                                            There are no albums created yet.
                                        </p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </li>
    );
}

export default Accordion;
