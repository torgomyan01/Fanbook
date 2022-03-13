import React, { useEffect } from 'react';
import MainTemplate from 'features/main-template/MainTemplate';
import TabHeader from './Components/tab-header';
import Book from './Components/Book/book';
import Posters from './Components/Posters/posterts';
import Digital from './Components/Digital/digital';
import { useDispatch, useSelector } from 'react-redux';
import { TAB_NAMES } from './settings/tab-names';

// CSS
import 'assets/css/create-book.css';
import { useHistory, useParams } from 'react-router-dom';
import { setCurrentEvent } from 'redux/events.slice';
import { GetEventPublicPrivate, goToHome, isUserLogin } from 'utils/helpers';

function CreateBook() {
    const dispatch = useDispatch();
    const history = useHistory();

    const tabName = useSelector(
        (state: ICreateBook) => state.CreateBook.tabValue
    );
    const { eventID, eventStatus }: { eventID: string; eventStatus: string } =
        useParams();

    useEffect(() => {
        GetEventPublicPrivate(
            eventID,
            eventStatus,
            {
                'append[0]': 'user',
                'append[1]': 'albums',
                'append[2]': 'books',
                'append[3]': 'likes',
                'append[4]': 'posters'
            },
            function (res: any) {
                dispatch(setCurrentEvent(res.data.data.item));
            }
        );
    }, [eventID, history]);

    return (
        <>
            {isUserLogin((res: boolean) => !res && goToHome()) && (
                <div className="event-details-page librari-list-page book-option">
                    <MainTemplate blackLogo={true} shopBlock={true}>
                        <div className="tab-line-section">
                            <TabHeader />
                            {tabName === TAB_NAMES.BOOK && <Book />}
                            {tabName === TAB_NAMES.POSTERS && <Posters />}
                            {tabName === TAB_NAMES.DIGITAL && <Digital />}
                        </div>
                    </MainTemplate>
                </div>
            )}
        </>
    );
}

export default CreateBook;
