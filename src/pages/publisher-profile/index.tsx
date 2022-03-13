import React, { useEffect } from 'react';
import 'assets/css/publisher-profile.css';
import MainTemplate from 'features/main-template/MainTemplate';
import LeftBlock from './Components/left-block';
import RightBlock from './Components/right-block';
import { useParams } from 'react-router-dom';
import { GetPublisher } from 'api/all-apis';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setProfileData } from 'redux/publisher-profile';
import ModalUploadAvatarPublisher from 'features/modal-upload-avatar-publisher/modal-upload-avatar-publisher';
import { setModalShow } from 'redux/my-event.page';
import ModalVViewVideo from 'pages/fp-events-list-view/modal-view-video/modal-view-video';

function PublisherProfile() {
    const dispatch = useDispatch();
    const { publisherID }: { publisherID: string } = useParams();

    useEffect(() => {
        dispatch(setLoading(true));
        startRequest();
    }, [publisherID]);

    function startRequest() {
        GetPublisher(publisherID).then((res) => {
            dispatch(setProfileData(res.data.data));
            dispatch(setLoading(false));
        });
    }

    const eventModal = useSelector(
        (state: IMyEventPage) => state.MyEventPage.modalViewVideo
    );

    return (
        <div className="publisher-section">
            <MainTemplate blackLogo={true} shopBlock={true} searchBlock={true}>
                <div className="container-fluid wrapper1 mt-5">
                    <div className="row">
                        <LeftBlock />
                        <RightBlock />
                    </div>
                    <ModalUploadAvatarPublisher />
                    <ModalVViewVideo
                        eventName={eventModal.event.name}
                        videoLink={eventModal.event.url}
                        closeModal={() => {
                            dispatch(setModalShow(false));
                        }}
                        modalShow={eventModal.modalShow}
                    />
                </div>
            </MainTemplate>
        </div>
    );
}

export default PublisherProfile;
