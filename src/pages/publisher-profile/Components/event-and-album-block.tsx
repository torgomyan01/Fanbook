import React from 'react';
import { Link } from 'react-router-dom';
import {
    eventUrlPublicPrivate,
    getEventDate,
    keyGenerator
} from 'utils/helpers';
import DefaultFanbbok from 'assets/images/fanbookDefault.jpg';
import { DEF_URL } from 'utils/urls';
import ReactPlayer from 'react-player';
import { setModalShow, setModalViewVideo } from 'redux/my-event.page';
import { useDispatch } from 'react-redux';
import { Fade } from 'react-awesome-reveal';

interface IThisProps {
    event: IEvent;
}

function EventAndAlbumBlock({ event }: IThisProps) {
    const dispatch = useDispatch();

    function playVideo(e: any) {
        e.preventDefault();
        e.stopPropagation();
        dispatch(setModalShow(true));
        dispatch(
            setModalViewVideo({
                name: event.name,
                url: event.videoURL
            })
        );
    }

    return (
        <div className="col-12">
            <Fade>
                <div className="album-box">
                    <div className="mr-3 mb-sm-0 mb-3">
                        {event.coverURL ? (
                            <div
                                className="img-icon"
                                style={{
                                    backgroundImage: `url(${event.coverURL})`
                                }}
                            />
                        ) : (
                            <div className="create-book-video-block-publisher">
                                <ReactPlayer
                                    height="100%"
                                    url={event.videoURL}
                                />
                                <i
                                    className="fas fa-play-circle"
                                    onClick={playVideo}
                                />
                            </div>
                        )}

                        <Link
                            to={eventUrlPublicPrivate(event)}
                            className="see-btn">
                            See More
                        </Link>
                    </div>
                    <div className="txt-box">
                        <p className="txt-box_txt">{getEventDate(event)}</p>
                        <h2 className="txt-box_title">{event.name}</h2>
                        <ul className="mb-0">
                            {event.albums.length > 0 &&
                                event.albums
                                    .slice(0, 3)
                                    .map((album: OneAlbum) => {
                                        return (
                                            <li
                                                key={keyGenerator(30)}
                                                className="d-flex album-list_item">
                                                <div className="d-flex">
                                                    <div
                                                        className="txt-img-box"
                                                        style={{
                                                            backgroundImage:
                                                                album.albumFiles
                                                                    .length > 0
                                                                    ? `url(${album.albumFiles[0].url})`
                                                                    : `url(${DefaultFanbbok})`
                                                        }}
                                                    />
                                                    <div className="d-flex flex-column justify-content-between mr-3">
                                                        <span className="album-txt font-bold">
                                                            {album.name}
                                                        </span>
                                                        <span className="photo-txt ">
                                                            {album.albumFiles
                                                                .length > 0
                                                                ? `${album.albumFiles.length} photos`
                                                                : `${album.albumFiles.length} photo`}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-column justify-content-end">
                                                    <Link
                                                        to={`${DEF_URL.ALBUM}/${album.id}`}
                                                        className="see-link">
                                                        See All Photos
                                                    </Link>
                                                </div>
                                            </li>
                                        );
                                    })}
                        </ul>
                    </div>
                </div>
            </Fade>
        </div>
    );
}

export default EventAndAlbumBlock;
