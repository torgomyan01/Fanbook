import React, { useEffect, useState } from 'react';
import 'assets/css/my-dashboard.css';
import 'react-bootstrap';
import MainTemplate from 'features/main-template/MainTemplate';
import PageTitle from './components/page-title';
import EventsBlock from './components/events-block';
import { Container } from 'react-bootstrap';
import ModalVViewVideo from '../fp-events-list-view/modal-view-video/modal-view-video';
import { setCreateModalEvent, setModalShow } from 'redux/my-event.page';
import { useDispatch, useSelector } from 'react-redux';
import { modalAddPlan, setOpenCreateAlbumDashboard } from 'redux/modals';
import ModalAddAlbumDashboard from './modal/add-album-deashboard';
import { setInformation, setLoading } from 'redux/my-dashboard';
import { AllRequestsForMyEvents, GetMyDashboard } from 'api/all-apis';
import { goToHome, isUserLogin, userIsPublisher } from 'utils/helpers';

function MyDashboard() {
    const dispatch = useDispatch();
    const eventModal = useSelector(
        (state: IMyEventPage) => state.MyEventPage.modalViewVideo
    );

    const modalCreateAlbum = useSelector(
        (state: AllModalSite) => state.AllModalSiteTwo.createAlbumDashboard
    );

    useEffect(() => {
        dispatch(setLoading(true));
        startRequest();
    }, []);

    function startRequest() {
        GetMyDashboard()
            .then((res) => {
                dispatch(setInformation(res.data.data));
                dispatch(setLoading(false));
            })
            .catch((err) => {
                console.log(err);
            });
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
                <div className="header">
                    <MainTemplate
                        blackLogo={true}
                        shopBlock={true}
                        searchBlock={true}
                        style="#f8f8f8">
                        <PageTitle />
                        <section className="dashboard-section">
                            <Container fluid={true} className="wrapper1">
                                <EventsBlock />
                            </Container>
                        </section>
                        {/*<ModalToLoadWindow />*/}
                    </MainTemplate>
                    <ModalVViewVideo
                        eventName={eventModal.event.name}
                        videoLink={eventModal.event.url}
                        closeModal={() => {
                            dispatch(setModalShow(false));
                        }}
                        modalShow={eventModal.modalShow}
                    />
                    <ModalAddAlbumDashboard
                        show={modalCreateAlbum}
                        closeModal={() => {
                            dispatch(setOpenCreateAlbumDashboard(false));
                        }}
                    />
                </div>
            )}
        </>
    );
}

export default MyDashboard;
