import React, { useEffect, useState } from 'react';
import 'assets/css/library.css';
import 'react-bootstrap';
import MainTemplate from 'features/main-template/MainTemplate';
import LibrarySearch from './components/search-library';
import LibrarySection from './components/library-section';
import ContentSection from './components/content-section';
import UpLoadPhotoSection from './components/upload-photo';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllLibrary } from 'redux/library';

import { setCurrentEvent } from 'redux/events.slice';
import { setEventID } from 'redux/modals';
import FolderSectionLibrary from './components/folder-section';
import MoveModal from 'features/upload-photos/move-modal';
import ModalEditAlbum from 'features/upload-photos/edit-album';
import { GetEventPublicPrivate } from 'utils/helpers';

function Library() {
    const dispatch = useDispatch();
    const { eventID, status }: { eventID: string; status: string } =
        useParams();

    const event = useSelector((state: IEvents) => state.events.currentEvent);
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        setLoading(true);
        GetEventPublicPrivate(
            eventID,
            status,
            {
                'append[0]': 'user',
                'append[1]': 'albums'
            },
            function (res: any) {
                dispatch(setAllLibrary(res.data.data.item.albums));
                dispatch(setCurrentEvent(res.data.data.item));
                setLoading(false);
            }
        );
        dispatch(
            setEventID({
                id: eventID,
                eventStatus: status
            })
        );
    }, [eventID]);

    return (
        <div className="header">
            <MainTemplate blackLogo={true} shopBlock={true} searchBlock={true}>
                <LibrarySearch />
                <LibrarySection />

                <FolderSectionLibrary loading={loading} />

                <ContentSection loading={loading} />
                {event.allowUserUpload && <UpLoadPhotoSection />}

                {/*modal to move images */}
                <MoveModal />

                <ModalEditAlbum />
            </MainTemplate>
        </div>
    );
}

export default Library;
