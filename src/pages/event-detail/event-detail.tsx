import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import 'assets/css/event-detail.style.css';
import MainTemplate from 'features/main-template/MainTemplate';
import { setCurrentEvent } from 'redux/events.slice';
import AttendedSection from './components/attended.section';
import ImgSection from './components/img.section';
import PostSection from './components/post.section';
import { setEventID } from 'redux/modals';
import ModalEditFolder from 'pages/library/modal/edit-folder';
import DeleteEventModal from 'features/delete-event-modal';
import DeleteBookModal from 'features/delete-book-modal';
import EditBookModal from 'features/edit-book-modal';
import ModalAddAlbum from './modal/add-album';
import DeleteAlbumModal from 'features/delete-album-modal';
import { eventEmptyData } from 'utils/empty-event-data';
import { GetEventPublicPrivate, isUserLogin } from 'utils/helpers';
import EditStatusBookModal from 'features/edit-status-book/edit-status-book';
import EditStatusAlbumModal from 'features/edit-status-album/edit-status-book';
import { AxiosResponse } from 'axios';
import EditStatusPoster from 'features/edit-status-poster/edit-status-event-modal';
import ModalDeletePoster from 'features/modal-delete-poster/modal-delete-poster';

const EventDetail = () => {
    const dispatch = useDispatch();
    const { id, status }: { id: string; status: string } = useParams();
    const event = useSelector((state: IEvents) => state.events.currentEvent);
    const [uploadImages, setUploadImages] = useState<boolean>(false);
    useEffect(() => {
        setUploadImages(event.allowUserUpload);
    }, [event]);

    useEffect(() => {
        dispatch(setEventID(id));
    }, [id]);

    useEffect(() => {
        dispatch(
            setCurrentEvent({
                ...eventEmptyData,
                isEditable: false
            })
        );
    }, []);

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        dispatch(setCurrentEvent(eventEmptyData));
        setLoading(false);
    }, []);

    useEffect(() => {
        GetEventPublicPrivate(
            id,
            status,
            {
                'append[0]': 'user',
                'append[1]': 'albums',
                'append[2]': 'books',
                'append[3]': 'likes',
                'append[4]': 'posters'
            },
            function (res: AxiosResponse) {
                dispatch(setCurrentEvent(res.data.data.item));
            }
        );
    }, [status]);

    return (
        <div className="event-details-page">
            {!loading && (
                <>
                    <MainTemplate blackLogo={true} shopBlock={true}>
                        <ImgSection />
                        <PostSection />
                        {isUserLogin() && uploadImages && <AttendedSection />}
                        <ModalEditFolder />
                    </MainTemplate>
                    <DeleteEventModal />
                    <DeleteBookModal />
                    <EditBookModal />
                    <ModalAddAlbum />
                    <DeleteAlbumModal />
                    <EditStatusBookModal />
                    <EditStatusAlbumModal />
                    <EditStatusPoster />
                    <ModalDeletePoster />
                </>
            )}
        </div>
    );
};

export default EventDetail;
