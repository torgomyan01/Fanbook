import React, { useEffect } from 'react';
import 'assets/css/cover-preview.css';
import 'react-bootstrap';
import Header from './components/header';
import MiddleMain from './components/middle-main';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllTemplates, getBook, getGoogleFont } from 'api/all-apis';
import { setBookTemplates, setCurrentBook } from 'redux/edit-book';
import { setAllFonts } from 'redux/google-fonts';
import { addAllFontsBody } from '../edit-covers/helper';

let thisDefaultStyle = `
    body{
        min-width: 992px;
        width: 100%;
   }`;

function BookPreview() {
    const dispatch = useDispatch();
    const { bookID }: { bookID: string } = useParams();
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
            const items: IGoogleFontsItem[] = res.data.items.slice(0, 30);
            dispatch(setAllFonts(items));
            thisDefaultStyle += addAllFontsBody(items);
        });
    }, [dispatch, bookID]);

    // GET THIS EVENTS ALL ALBUMS FILES
    useEffect(() => {
        if (thisBook.userEventId !== '') {
            getAllTemplates().then((res) => {
                dispatch(setBookTemplates(res.data.data.items));
            });
        }
    }, [dispatch, thisBook.userEventId]);

    return (
        <div className="editor-tools-page edit-covers">
            <Header />

            <MiddleMain />
            <style>{thisDefaultStyle}</style>
        </div>
    );
}

export default BookPreview;
