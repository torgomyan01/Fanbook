import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

import { ALL_URL } from 'utils/urls';
import { setModalShow, setModalViewVideo } from 'redux/my-event.page';
import { useDispatch } from 'react-redux';
import {
    eventUrlPublicPrivate,
    history,
    keyGenerator,
    textCrop,
    userIsLogin
} from 'utils/helpers';
import { Fade } from 'react-awesome-reveal';
import { setUserLoginMethod } from 'redux/auth.slice';
import { setOpenCloseModal, setUseType } from 'redux/login-reg-user';
import { UserLoginTypes } from 'enums/enums';

interface IThisProps {
    event: IEvent;
}

function EventBlockLandingPage({ event }: IThisProps) {
    const dispatch = useDispatch();
    const [albumFiles, setAlbumFiles] = useState<IAlbumFiles[]>([]);

    useEffect(() => {
        const allFiles: IAlbumFiles[] = [];
        event?.albums?.map((album: OneAlbum) => {
            album.albumFiles.map((file: IAlbumFiles) => {
                allFiles.push(file);
            });
        });
        setAlbumFiles(allFiles);
    }, [event]);

    // FOR PLAY VIDEO MODAL EVENT
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

    // FOR OPEN MODAL LOGIN
    function openLoginModal(e: any) {
        e.preventDefault();
        e.stopPropagation();
        history.push(ALL_URL.SIGN_IN);
    }

    const yourPhoto = albumFiles?.slice(0, 3).map((albumFile: IAlbumFiles) => {
        return (
            <div
                key={keyGenerator(30)}
                className="your-photo"
                style={{
                    backgroundImage: `url(${albumFile.url})`
                }}
            />
        );
    });

    function openEventViewPage() {
        history.push(eventUrlPublicPrivate(event));
    }

    function openModalSignUp(e: any) {
        e.preventDefault();
        e.stopPropagation();
        dispatch(setUserLoginMethod(userIsLogin.normalLogin));
        dispatch(setOpenCloseModal(true));
        dispatch(setUseType(UserLoginTypes.signIn));
    }
    return (
        <div className="col-xl-4 col-md-6 col-12 mb-xl-0 mb-5">
            <Fade>
                <div onClick={openEventViewPage}>
                    <div className="event-box h-100 trans mr-lg-auto m-auto  d-flex flex-column justify-content-between">
                        <div>
                            {event?.coverURL ? (
                                <div
                                    className="event-box-header"
                                    style={{
                                        background: event.coverURL
                                            ? `url(${event?.coverURL})`
                                            : 'grey'
                                    }}
                                />
                            ) : (
                                <div className="video-block-logout-page">
                                    <ReactPlayer
                                        height="100%"
                                        url={event?.videoURL}
                                    />
                                    <i
                                        className="fas fa-play-circle"
                                        onClick={playVideo}
                                    />
                                </div>
                            )}

                            <div className="event-box_headertxt">
                                {/*<h3 className="event-box_pretitle">Event Name</h3>*/}
                                <h2 className="event-box_title">
                                    {event.name}
                                </h2>
                                <p className="event-box_txt block-ellipsis">
                                    {textCrop(event.description, 90)}{' '}
                                    {event.description?.length > 70 && (
                                        <span className="more-link">
                                            More Details
                                        </span>
                                    )}
                                </p>
                            </div>
                        </div>
                        <div className="event-box_body">
                            <div className="your-photo-box d-flex mb-3 justify-content-between">
                                {yourPhoto}
                                <div
                                    className="your-photo empty-box"
                                    onClick={openLoginModal}>
                                    <span className="your-photo_link">
                                        Your Photo?
                                    </span>
                                </div>
                            </div>
                            <button
                                className="book-btn"
                                onClick={openModalSignUp}>
                                *Customize Your Book
                            </button>
                            <p className="note-txt mb-0">
                                *Customize book by adding in photos that you
                                took at the event.
                            </p>
                        </div>
                    </div>
                </div>
            </Fade>
        </div>
    );
}

export default EventBlockLandingPage;
