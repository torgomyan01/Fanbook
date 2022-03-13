import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ReactPlayer from 'react-player';
import ModalVViewVideo from 'pages/fp-events-list-view/modal-view-video/modal-view-video';
import randomBackground, {
    eventUrlPublicPrivate,
    scrollToBlock,
    setMessageUser,
    userAvatarName
} from 'utils/helpers';
import { setBookInfo } from 'redux/create-book';
import { TextField } from '@material-ui/core';
import { DEF_URL } from 'utils/urls';
import { step_one_create_poster_page } from './step-section';
import { setPoster } from 'redux/posters';
import { UM } from 'utils/user-messages';

interface IThisProps {
    open: any;
}

const booDefNameLength = 5;

function BookBlockPoster({ open }: IThisProps) {
    const dispatch = useDispatch();
    const thisEvent = useSelector(
        (state: IEvents) => state.events.currentEvent
    );
    const [openDisabledButton, setOpenDisabledButton] =
        useState<boolean>(false);

    const [modalShow, setModalShow] = useState(false);
    const [videoURl, setVideoUrl] = useState('');
    const [evName, setEvName] = useState('');

    function playVideo() {
        setModalShow(true);
        setVideoUrl(thisEvent.videoURL);
        setEvName(thisEvent.name);
    }

    const bookInfo = useSelector(
        (state: ICreateBook) => state.CreateBook.bookCreateInfo
    );

    const [startTextValue, setStartTextValue] = useState('');
    const [startTextG, setStartTextG] = useState('');

    useEffect(() => {
        setOpenDisabledButton(
            Boolean(startTextValue === '' || startTextG === '')
        );
    }, [startTextValue, startTextG]);

    const posterInfo = useSelector(
        (state: IPosters) => state.Posters.posterCreateInfo
    );

    function openHowItWorkBlock() {
        if (bookInfo.name === '') {
            dispatch(setMessageUser(UM.FILL_POSTER_NAME));
        } else if (bookInfo.description === '') {
            dispatch(setMessageUser(UM.FILL_POSTER_DESC));
        } else if (bookInfo.name.length < booDefNameLength) {
            dispatch(
                setMessageUser(UM.POSTER_NAME_MIN_LENGTH(booDefNameLength))
            );
        } else {
            const posterObj = { ...posterInfo };
            posterObj.description = bookInfo.description;
            posterObj.name = bookInfo.name;
            dispatch(setPoster(posterObj));
            open(true);
            scrollToBlock(step_one_create_poster_page);
        }
    }

    useEffect(() => {
        dispatch(
            setBookInfo({
                name: startTextValue,
                description: startTextG
            })
        );
    }, [startTextValue, startTextG]);

    function DescriptionValue(e: any) {
        setStartTextG(e.target.value);
    }

    const [bookNameError, setBookNameError] = useState<boolean>(false);
    function changeBookName(e: any) {
        const value = e.target.value;
        if (value.length < booDefNameLength) {
            setBookNameError(true);
            return;
        }

        setStartTextValue(e.target.value);
        setBookNameError(false);
    }

    return (
        <div className="book-block">
            <div className="container-fluid wrapper1">
                <div className="row">
                    <div className="col-lg-4 col-sm-7 col-12 order-md-0 ">
                        {thisEvent?.coverURL ? (
                            <div
                                className="img-box"
                                style={{
                                    backgroundImage: `url(${thisEvent.coverURL})`
                                }}
                            />
                        ) : (
                            <div className="img-box create-book-video-block">
                                <ReactPlayer
                                    height="100%"
                                    url={thisEvent.videoURL}
                                />
                                <i
                                    className="fas fa-play-circle"
                                    onClick={playVideo}
                                />
                            </div>
                        )}
                    </div>
                    <div className="col-md-5  order-lg-1 order-sm-2  ">
                        <div className="snorkel-box">
                            <div className="mb-3">
                                <TextField
                                    error={bookNameError}
                                    id="Poster-name"
                                    label="Poster Name"
                                    onChange={changeBookName}
                                />
                            </div>
                            <div className="mb-5">
                                <TextField
                                    id="Poster-description"
                                    label="Poster Description"
                                    minRows={6}
                                    className="snorkel-box-title"
                                    multiline
                                    onChange={DescriptionValue}
                                />
                            </div>

                            <div className="d-flex flex-column justify-content-between ">
                                <h2 className="fs20 lh-07 mb-2 f-omnesMedium">
                                    {thisEvent.name}
                                </h2>
                                <p className="library-txt fs18 mb-3">
                                    {' '}
                                    By:
                                    <Link
                                        to={`${DEF_URL.PUBLISHER_PROFILE}/${thisEvent?.user.id}`}
                                        target="_blank"
                                        className="c-red b-bottom ml-2">
                                        {thisEvent?.user.publisherProfile?.name}
                                    </Link>
                                </p>
                                <Link
                                    to={eventUrlPublicPrivate(thisEvent)}
                                    className="event-btn fs17 trans">
                                    Go to Event page
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-5   order-lg-2 order-sm-1 ">
                        <div className="total-box">
                            <div className="d-flex justify-content-between mb-3">
                                <div className="total-box_txt">
                                    <h3 className="total-box_title f-omnesMedium">
                                        Total Posters
                                    </h3>
                                    <span className="fs23 f-myriadproreg mb-4 d-inline-block">
                                        {thisEvent.posters.length}
                                    </span>
                                    <h3 className="total-box_title f-omnesMedium">
                                        Price from:
                                    </h3>
                                    <span className="d-inline-block fs23 c-red f-omnesMedium">
                                        $23.50
                                    </span>
                                </div>
                                <div
                                    className="total-box_img"
                                    style={{
                                        background:
                                            thisEvent?.user?.publisherProfile
                                                ?.avatarURL !== null
                                                ? `url(${thisEvent?.user?.publisherProfile?.avatarURL})`
                                                : randomBackground(),
                                        boxShadow: 'unset'
                                    }}>
                                    {!thisEvent?.user?.publisherProfile
                                        ?.avatarURL &&
                                        userAvatarName(thisEvent?.user)}
                                </div>
                            </div>
                            <button
                                className="btn event-btn fs17 trans c-red"
                                onClick={openHowItWorkBlock}
                                disabled={openDisabledButton}>
                                <i className="fas fa-book mr-3" />
                                Create a Poster
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ModalVViewVideo
                eventName={evName}
                videoLink={videoURl}
                closeModal={() => {
                    setModalShow(false);
                }}
                modalShow={modalShow}
            />
        </div>
    );
}

export default BookBlockPoster;
