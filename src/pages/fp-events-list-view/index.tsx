import React, { useEffect, useState } from 'react';
import 'assets/css/fp-events-list-view.css';
import 'react-bootstrap';
import MainTemplate from 'features/main-template/MainTemplate';
import HeaderBlockEventList from './components/hedaer-block-event-list';
import EventBlock from './components/event-block';
import PastEvent from './components/past-events';
import CreateEventModal from 'features/create-event';
import ModalVViewVideo from './modal-view-video/modal-view-video';
import { useDispatch, useSelector } from 'react-redux';
import { setCreateModalEvent, setModalShow } from 'redux/my-event.page';
import moment from 'moment';
import DeleteEventModal from 'features/delete-event-modal';
import ModalSetting from '../event-detail/components/modal-setting-event';
import { AllRequestsForMyEvents } from 'api/all-apis';
import { goToHome, isUserLogin, userIsPublisher } from 'utils/helpers';
import { CircularProgress } from '@material-ui/core';
import { modalAddPlan } from 'redux/modals';

function FpEventsList() {
    const dispatch = useDispatch();
    const myPlan = useSelector((state: IAuth) => state.sign.myPlans);
    const userInfo = useSelector((state: IAuth) => state.sign.user.profile);

    const eventModal = useSelector(
        (state: IMyEventPage) => state.MyEventPage.modalViewVideo
    );
    const ModalCreate = useSelector(
        (state: IMyEventPage) => state.MyEventPage.modalCreateEvent
    );
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
                    dispatch(setCreateModalEvent(true));
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
    function closeModalCreateEvent() {
        dispatch(setCreateModalEvent(false));
    }

    const [upcomingEvents, setUpcomingEvents] = useState<IEvent[]>([]);
    const [LoadingUpcoming, setLoadingUpcoming] = useState(true);

    useEffect(() => {
        startRequest();
    }, [userInfo]);

    function startRequest() {
        if (userInfo) {
            const toDay = moment().format();
            AllRequestsForMyEvents({
                'page[number]': '1',
                'page[size]': '100',
                sort: '-date',
                'append[0]': 'user',
                'append[1]': 'albums',
                'append[2]': 'files',
                'filter[userId]': userInfo.id,
                'filter[date][from]': toDay
            }).then((res) => {
                setUpcomingEvents(res.data.data.items);
                setLoadingUpcoming(false);
            });
        }
    }

    const openPage =
        isUserLogin((ULog: boolean) => {
            !ULog && goToHome();
        }) &&
        userIsPublisher((_P: boolean) => {
            !_P && goToHome();
        });

    return (
        <>
            {openPage && (
                <div className="event-details-page">
                    <MainTemplate
                        blackLogo={true}
                        shopBlock={true}
                        searchBlock={true}
                        style="#fff">
                        <div className="container-fluid wrapper-1447 mt-3">
                            <HeaderBlockEventList />

                            <EventBlock
                                loadingProcess={LoadingUpcoming}
                                AllEvents={upcomingEvents}
                            />

                            <PastEvent />
                        </div>
                        <button
                            className="btn btn-floating-add"
                            onClick={openModalCreateEvent}>
                            {loadingCreated ? (
                                <CircularProgress
                                    style={{
                                        color: '#fff',
                                        width: 22,
                                        height: 22
                                    }}
                                />
                            ) : (
                                <i className="fas fa-plus" />
                            )}
                        </button>
                    </MainTemplate>
                    <CreateEventModal
                        closeModal={closeModalCreateEvent}
                        openModal={ModalCreate}
                    />
                    <ModalVViewVideo
                        eventName={eventModal.event.name}
                        videoLink={eventModal.event.url}
                        closeModal={() => {
                            dispatch(setModalShow(false));
                        }}
                        modalShow={eventModal.modalShow}
                    />
                    <DeleteEventModal />
                    <ModalSetting />
                </div>
            )}
        </>
    );
}

export default FpEventsList;
