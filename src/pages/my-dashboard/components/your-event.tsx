import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import CreateEventModal from 'features/create-event';
import { useDispatch, useSelector } from 'react-redux';
import ReactPlayer from 'react-player';
import {
    setCreateModalEvent,
    setModalShow,
    setModalViewVideo
} from 'redux/my-event.page';

import { ALL_URL } from 'utils/urls';
import {
    eventUrlPublicPrivate,
    history,
    keyGenerator,
    textCrop
} from 'utils/helpers';
import BlockPlaceholder from 'features/block-placeholder';
import { AllRequestsForMyEvents } from 'api/all-apis';
import { modalAddPlan } from 'redux/modals';
import { CircularProgress } from '@material-ui/core';

const eventNameLength = 10;

function YourEvent() {
    const dispatch = useDispatch();
    const myPlan = useSelector((state: IAuth) => state.sign.myPlans);
    const userInfo = useSelector((state: IAuth) => state.sign.user.profile);

    const loading = useSelector(
        (state: IMyDashboard) => state.MyDashboard.loading
    );

    const dashboardInfo = useSelector(
        (state: IMyDashboard) => state.MyDashboard.information
    );
    const [openCloseModalToAddModal, setOpenCloseModalToAddModal] =
        useState(false);

    function closeModalAddEvent() {
        setOpenCloseModalToAddModal(false);
    }
    function playVideo(e: any) {
        e.preventDefault();
        e.stopPropagation();
        const name = e.target.getAttribute('data-name');
        const Url = e.target.getAttribute('data-url');
        dispatch(setModalShow(true));
        dispatch(
            setModalViewVideo({
                name,
                url: Url
            })
        );
    }
    const [loadingCreated, setLoadingCreated] = useState<boolean>(false);

    function openModalCreateEvent() {
        if (userInfo && myPlan) {
            setLoadingCreated(true);
            AllRequestsForMyEvents({
                'page[number]': '1',
                'page[size]': '1000',
                sort: '-date',
                'filter[userId]': userInfo.id
            }).then((res) => {
                const events = res.data.data.items;
                if (events.length < myPlan.options.events.limit) {
                    setOpenCloseModalToAddModal(true);
                } else {
                    dispatch(
                        modalAddPlan({
                            openClose: true
                        })
                    );
                }
                setLoadingCreated(false);
            });
        }
    }

    return (
        <div className="proj-event-box box">
            <h2 className="event-box_title f-omnesMedium">
                Your Events{' '}
                <span className="c-red ml-3">{dashboardInfo.eventsCount}</span>
            </h2>

            <ul className="event-list">
                {loading ? (
                    <BlockPlaceholder
                        width={155}
                        height={138}
                        borderRadius={5}
                        status={true}
                        count={5}
                        className="m-0 mr-3 mb-2"
                    />
                ) : (
                    dashboardInfo.events?.slice(0, 5).map((event: IEvent) => {
                        if (event?.coverURL) {
                            return (
                                <li
                                    key={keyGenerator(30)}
                                    className="event-item cursor-pointer"
                                    onClick={() => {
                                        history.push(
                                            eventUrlPublicPrivate(event)
                                        );
                                    }}
                                    style={{
                                        backgroundImage: `url(${event.coverURL})`
                                    }}>
                                    <div className="event-item_txt">
                                        <span className="f-myriadproreg c-white fs18 ">
                                            {textCrop(
                                                event.name,
                                                eventNameLength
                                            )}
                                        </span>
                                    </div>
                                </li>
                            );
                        } else {
                            return (
                                <div
                                    key={keyGenerator(30)}
                                    className="event-item img-box my-dashboard-video-block cursor-pointer"
                                    onClick={() => {
                                        history.push(
                                            eventUrlPublicPrivate(event)
                                        );
                                    }}>
                                    <ReactPlayer
                                        height="100%"
                                        url={event?.videoURL}
                                    />
                                    <i
                                        className="fas fa-play-circle"
                                        onClick={playVideo}
                                        data-name={event.name}
                                        data-url={event.videoURL}
                                    />
                                    <div className="event-item_txt">
                                        <span className="f-myriadproreg c-white fs18 ">
                                            {textCrop(
                                                event.name,
                                                eventNameLength
                                            )}
                                        </span>
                                    </div>
                                </div>
                            );
                        }
                    })
                )}

                <li
                    className="event-item more-item"
                    onClick={openModalCreateEvent}>
                    {loadingCreated ? (
                        <CircularProgress style={{ color: '#fff' }} />
                    ) : (
                        <i className="fas fa-plus" />
                    )}
                </li>
            </ul>
            <div className="text-right">
                <Link
                    to={`${ALL_URL.FP_EVENT_LIST}`}
                    className="fs21 c-red f-myriadproreg">
                    More
                    <FontAwesomeIcon icon={faChevronRight} className="ml-2" />
                </Link>
            </div>
            <CreateEventModal
                openModal={openCloseModalToAddModal}
                closeModal={closeModalAddEvent}
            />
        </div>
    );
}

export default YourEvent;
