import React, { useEffect, useState } from 'react';
import 'assets/css/my-library.css';
import MainTemplate from 'features/main-template/MainTemplate';
import MyLibraryHeader from './components/header';
import MostRecentEvent from './components/most-recent-event';
import AllEvents from './components/all-events';
import { useDispatch, useSelector } from 'react-redux';
import { setModalShow } from 'redux/my-event.page';
import ModalVViewVideo from 'pages/fp-events-list-view/modal-view-video/modal-view-video';
import ModalUpload from 'features/upload-photos/modal-upload';
import { AllRequestsForMyEvents } from 'api/all-apis';
import ModalAddAlbum from '../event-detail/modal/add-album';
import { goToHome, isUserLogin, userIsPublisher } from 'utils/helpers';

const MyLibrary = () => {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: IAuth) => state.sign.user.profile);

    const eventModal = useSelector(
        (state: IMyEventPage) => state.MyEventPage.modalViewVideo
    );

    const [MyAllEventsAlsoFile, setMyAllEventsAlsoFile] = useState<IEvent[]>(
        []
    );

    const [Loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        userInfo?.id && startRequest();
    }, [userInfo]);

    function startRequest() {
        AllRequestsForMyEvents({
            'page[number]': '1',
            'page[size]': '100',
            sort: '-date',
            'append[0]': 'user',
            'append[1]': 'albums',
            'append[2]': 'files',
            'filter[userId]': userInfo?.id
        })
            .then((res) => {
                setMyAllEventsAlsoFile(res.data.data.items);
                setLoading(false);
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    startRequest();
                }
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
                <div className="event-details-page list-view-section p-0 folder-section list-view my-library">
                    <MainTemplate
                        blackLogo={true}
                        shopBlock={true}
                        style="#f8f8f8">
                        <div className="wrapper1 container-fluid">
                            <MyLibraryHeader />
                            <MostRecentEvent
                                event={MyAllEventsAlsoFile[0]}
                                status={Loading}
                            />
                            <AllEvents events={MyAllEventsAlsoFile} />
                        </div>
                    </MainTemplate>
                    <ModalVViewVideo
                        eventName={eventModal.event.name}
                        videoLink={eventModal.event.url}
                        closeModal={() => {
                            dispatch(setModalShow(false));
                        }}
                        modalShow={eventModal.modalShow}
                    />
                    <ModalAddAlbum />
                    <ModalUpload />
                </div>
            )}
        </>
    );
};

export default MyLibrary;
