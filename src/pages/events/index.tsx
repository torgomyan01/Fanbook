import React, { useEffect, useState } from 'react';
import 'assets/css/events.css';
import 'react-bootstrap';
import MainTemplate from 'features/main-template/MainTemplate';
import { Link } from 'react-router-dom';
import Header from './components/header';
import { useDispatch, useSelector } from 'react-redux';
import { GetMyEvents } from 'redux/events.slice';

import { setCreateModalEvent, setModalShow } from 'redux/my-event.page';
import ModalVViewVideo from '../fp-events-list-view/modal-view-video/modal-view-video';
import CreateEventModal from 'features/create-event';
import EventBlock from './components/event-block';
import { keyGenerator } from 'utils/helpers';
import { AllRequestsForMyEvents } from 'api/all-apis';
import { CircularProgress } from '@material-ui/core';
import { modalAddPlan } from 'redux/modals';
import { Spinner } from 'react-bootstrap';

function Events() {
    const dispatch = useDispatch();
    const MyEvents = useSelector((state: IEvents) => state.events.myEvents);
    const AllEvents = useSelector((state: IEvents) => state.events).events;
    const userInfo = useSelector((state: IAuth) => state.sign.user.profile);
    const myPlan = useSelector((state: IAuth) => state.sign.myPlans);

    const eventModal = useSelector(
        (state: IMyEventPage) => state.MyEventPage.modalViewVideo
    );
    const ModalCreate = useSelector(
        (state: IMyEventPage) => state.MyEventPage.modalCreateEvent
    );
    const SearchValue: string | null = localStorage.getItem(
        'search-my-events-page'
    )
        ? localStorage.getItem('search-my-events-page')
        : '';

    const [loadingProcess, setLoadingProcess] = useState(true);

    useEffect(() => {
        if (userInfo?.id) {
            AllRequestsForMyEvents({
                'page[number]': '1',
                'page[size]': '10',
                sort: '-createdAt',
                'append[0]': 'user',
                'append[1]': 'albums',
                'append[2]': 'files',
                'filter[userId]': userInfo?.id
            })
                .then((res) => {
                    const events = res.data.data.items;
                    const myEvents = events.filter(
                        (event: IEvent) => event.user.id === userInfo?.id
                    );
                    dispatch(GetMyEvents(myEvents));
                    setLoadingProcess(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [userInfo]);

    useEffect(() => {
        const myEvents = AllEvents.filter(
            (event: IEvent) => event.user.id === userInfo?.id
        );
        dispatch(GetMyEvents(myEvents));
    }, [AllEvents, dispatch, userInfo]);

    const [inputValue, setInputValue] = useState<string>(SearchValue as string);
    const [SearchingEvents, setSearchingEvents] = useState<IEvent[]>([]);

    useEffect(() => {
        setSearchingEvents([]);
        const searchingEvents = MyEvents.filter(
            (event: IEvent) =>
                event.name.toLowerCase().includes(inputValue.toLowerCase()) ||
                event.description
                    .toLowerCase()
                    .includes(inputValue.toLowerCase())
        );
        setSearchingEvents(searchingEvents);
    }, [inputValue, SearchValue, MyEvents]);

    function searchEvents(e: any) {
        const thisValue = e.target.value;
        setInputValue(thisValue);
        localStorage.setItem('search-my-events-page', thisValue);
    }

    function closeModalCreateEvent() {
        dispatch(setCreateModalEvent(false));
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
    return (
        <div className="create-event-section">
            <MainTemplate blackLogo={true} shopBlock={true} searchBlock={true}>
                <Header />

                <div className="create-event-form">
                    <div className="container-fluid wrapper1">
                        <div className="row">
                            <div className="col-12">
                                <form
                                    action="#"
                                    method="post"
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                    }}
                                    className="form-block">
                                    <input
                                        id="sch"
                                        type="text"
                                        onChange={searchEvents}
                                        defaultValue={inputValue}
                                        placeholder="Search your events"
                                        className="w-100"
                                    />
                                    <label htmlFor="sch">
                                        {loadingProcess ? (
                                            <CircularProgress
                                                className="mt-4"
                                                size={30}
                                            />
                                        ) : (
                                            <i className="fas fa-search mr-2" />
                                        )}
                                    </label>
                                </form>
                            </div>
                            <div className="col-md-6 col-12 d-flex align-items-center mb-3 mb-md-0">
                                <p className="create-txt">
                                    {!loadingProcess && MyEvents.length <= 0 && (
                                        <>
                                            You do not have any events.{''}
                                            <span className="font-bold fs20 ml-2">
                                                Create one now?
                                            </span>
                                        </>
                                    )}
                                </p>
                            </div>
                            <div className="col-md-6 col-12 text-md-right text-left">
                                <Link
                                    to="#"
                                    onClick={openModalCreateEvent}
                                    className="btn new-event-btn">
                                    <span className="plus-icon">
                                        {loadingCreated ? (
                                            <Spinner
                                                animation="border"
                                                variant="secondary"
                                            />
                                        ) : (
                                            <i className="fas fa-plus" />
                                        )}
                                    </span>
                                    Add New Event
                                </Link>
                            </div>

                            {!loadingProcess &&
                                (SearchingEvents.length > 0 ? (
                                    SearchingEvents.map((event: IEvent) => {
                                        return (
                                            <EventBlock
                                                key={keyGenerator(30)}
                                                event={event}
                                            />
                                        );
                                    })
                                ) : (
                                    <h1 className="no-result-my-event-search">
                                        No Result
                                    </h1>
                                ))}
                        </div>
                    </div>
                </div>
                <ModalVViewVideo
                    eventName={eventModal.event.name}
                    videoLink={eventModal.event.url}
                    closeModal={() => {
                        dispatch(setModalShow(false));
                    }}
                    modalShow={eventModal.modalShow}
                />
                <CreateEventModal
                    closeModal={closeModalCreateEvent}
                    openModal={ModalCreate}
                />
            </MainTemplate>
        </div>
    );
}

export default Events;
