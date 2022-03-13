import React from 'react';
import 'assets/css/components.css';
import 'react-bootstrap';

import Filter from './components/filter';
import GreySection from './components/grey-section';
import Partner from './components/partner';
import MainTemplate from 'features/main-template/MainTemplate';
import { setOpenModalToView } from 'redux/modals';
import ModalVViewVideo from '../fp-events-list-view/modal-view-video/modal-view-video';
import { useDispatch, useSelector } from 'react-redux';

const SearchResult = () => {
    const dispatch = useDispatch();
    const modalVideoView = useSelector(
        (state: AllModalSite) => state.AllModalSiteTwo.modalVideVideo
    );
    return (
        <div className="header">
            <MainTemplate blackLogo={true} shopBlock={true}>
                <Filter />
                <GreySection />
                <Partner />
                <ModalVViewVideo
                    eventName={modalVideoView.eventName}
                    videoLink={modalVideoView.videoLink}
                    modalShow={modalVideoView.modalShow}
                    closeModal={() => {
                        dispatch(
                            setOpenModalToView({
                                eventName: '',
                                videoLink: '',
                                modalShow: false
                            })
                        );
                    }}
                />
            </MainTemplate>
        </div>
    );
};

export default SearchResult;
