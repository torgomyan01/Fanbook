import React, { useEffect } from 'react';
import 'assets/css/edit-covers.css';
import 'react-bootstrap';
import Header from './components/header';
import EditToolsSidebar from './components/edit-tools-sidebar';
import MiddleMain from './components/middle-main';
import PageLayoutSidePanel from './components/page-layout-sidepanel';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllTemplates, getBook, getGoogleFont } from 'api/all-apis';
import {
    setBookTemplates,
    setCurrentBook,
    setThisAlbums
} from 'redux/edit-book';
import { setAllFonts } from 'redux/google-fonts';
import { addAllFontsBody } from './helper';
import {
    eventStatus,
    GetEventPublicPrivate,
    getPlans,
    updateMyPlans,
    usersPlansStorage
} from 'utils/helpers';
import { setCurrentEvent } from 'redux/events.slice';
import { decodingString } from 'utils/codingDecoding';

let thisDefaultStyle = `
    body{
        min-width: 992px;
        width: 100%;
   }`;

function EditCovers() {
    const dispatch = useDispatch();
    const { bookID }: { bookID: string } = useParams();
    const userInfo = useSelector((state: IAuth) => state.sign.user.profile);
    const thisBook = useSelector(
        (state: IOneBook) => state.ThisBook.currentBook
    );

    useEffect(() => {
        // GET THIS EVENTS INFORMATION
        getBook(bookID).then((res) => {
            dispatch(setCurrentBook(res.data.data.item));
        });

        // GET ALL GOOGLE FONTS
        getGoogleFont().then((res) => {
            const items: IGoogleFontsItem[] = res.data.items.slice(0, 150);
            dispatch(setAllFonts(items));
            thisDefaultStyle += addAllFontsBody(items);
        });
    }, [bookID]);

    // GET THIS EVENTS ALL ALBUMS FILES
    useEffect(() => {
        if (thisBook.userEventId !== '') {
            const _thisStatus = thisBook.userEvent.isAvailable
                ? eventStatus.public
                : eventStatus.private;
            GetEventPublicPrivate(
                thisBook.userEventId,
                _thisStatus,
                {
                    'append[0]': 'user',
                    'append[1]': 'albums',
                    'append[2]': 'books'
                },
                function (res: any) {
                    dispatch(setThisAlbums(res.data.data.item.albums));
                    dispatch(setCurrentEvent(res.data.data.item));
                }
            );

            getAllTemplates().then((res) => {
                dispatch(setBookTemplates(res.data.data.items));
            });
        }
    }, [thisBook]);

    const plans = localStorage.getItem(usersPlansStorage);
    function startGetPlans() {
        if (userInfo) {
            const decodingPlans: IPlans[] | null = plans
                ? JSON.parse(decodingString(plans))
                : null;
            if (decodingPlans) {
                dispatch(updateMyPlans(decodingPlans, userInfo));
            }
            getPlans(userInfo);
        }
    }

    useEffect(() => {
        startGetPlans();
    }, [plans, userInfo]);

    return (
        <div className="editor-tools-page edit-covers">
            <style>{thisDefaultStyle}</style>
            <Header />
            <EditToolsSidebar />
            <PageLayoutSidePanel />

            <MiddleMain />
        </div>
    );
}

export default EditCovers;
