import React from 'react';
import { Link } from 'react-router-dom';
import plusImg from 'assets/images/edit-book/plus-icon.png';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentTemplate } from 'redux/edit-book';
import { TEMPLATE_NAME } from '../helper';

function FrontBack() {
    const dispatch = useDispatch();
    const thisBook = useSelector(
        (state: IOneBook) => state.ThisBook.currentBook
    );
    function createFrontPage() {
        dispatch(
            setCurrentTemplate({
                name: TEMPLATE_NAME.CREATE_FRONT
            })
        );
    }
    return (
        <ul className="list-pages scroll-list">
            <li className="list-pages-li">
                <Link
                    to="#"
                    className="list-pages-link active"
                    onClick={createFrontPage}>
                    {thisBook.frontCover ? (
                        <div
                            className="edit-book-page-images-front-back"
                            style={{
                                backgroundImage: `url(${thisBook.frontCover})`
                            }}
                        />
                    ) : (
                        <div
                            className="edit-book-page-images-front-back"
                            style={{
                                backgroundImage: `url(${plusImg})`,
                                backgroundSize: '35px'
                            }}
                        />
                    )}
                </Link>
                Front Cover
            </li>
            <li className="list-pages-li">
                <Link to="#" className="list-pages-link ">
                    {thisBook.backCover ? (
                        <div
                            className="edit-book-page-images-front-back"
                            style={{
                                backgroundImage: `url(${thisBook.backCover})`
                            }}
                        />
                    ) : (
                        <div
                            className="edit-book-page-images-front-back"
                            style={{
                                backgroundImage: `url(${plusImg})`,
                                backgroundSize: '35px'
                            }}
                        />
                    )}
                </Link>
                Back Cover
            </li>
        </ul>
    );
}

export default FrontBack;
