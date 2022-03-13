import React from 'react';
import { Link } from 'react-router-dom';
import editCover from '../images/edit-cover.png';
import editCoverA from '../images/edit-cover-active.png';
import pages from '../images/pages.png';
import pagesA from '../images/pages-active.png';
import library from '../images/library.png';
import libraryA from '../images/library.png';
import Layouts from 'assets/images/edit-book/Loyouts.png';
import { useDispatch, useSelector } from 'react-redux';
import { openPages } from 'redux/edit-cover';
import { editorBookTabs } from 'utils/editor-defoult-name';
import { setTabName } from 'redux/edit-book';

function EditToolsSidebar() {
    const dispatch = useDispatch();
    const tabName = useSelector((state: IOneBook) => state.ThisBook.tabName);

    function openPagePanel(e: any) {
        e.preventDefault();
        dispatch(openPages(true));
    }

    function openPagesBlock() {
        dispatch(setTabName(editorBookTabs.pages));
    }
    function openFrontBack() {
        dispatch(setTabName(editorBookTabs.frontBack));
    }
    return (
        <div className="edit-tools-sidebar">
            <ul className="menu-list">
                <li className="menu_item">
                    <Link
                        to="#"
                        onClick={openFrontBack}
                        className={
                            tabName === editorBookTabs.frontBack
                                ? 'menu_item_link active'
                                : 'menu_item_link'
                        }>
                        <img src={editCover} alt="edit" className="db" />
                        <img src={editCoverA} alt="edit" className="dn" />
                        edit cover
                    </Link>
                </li>
                <li className="menu_item">
                    <Link
                        to="#"
                        onClick={openPagesBlock}
                        className={
                            tabName === editorBookTabs.pages
                                ? 'menu_item_link active'
                                : 'menu_item_link'
                        }>
                        <img src={pages} alt="pages" className="db" />
                        <img src={pagesA} alt="pages" className="dn" />
                        PAGES
                    </Link>
                </li>
                {tabName === editorBookTabs.pages && (
                    <li className="menu_item">
                        <Link
                            to="#"
                            onClick={openPagePanel}
                            className="menu_item_link">
                            <img src={Layouts} alt="pages" className="db" />
                            <img src={Layouts} alt="pages" className="dn" />
                            LAYOUT
                        </Link>
                    </li>
                )}
            </ul>
            <ul className="menu-list">
                <li className="menu_item">
                    <Link to="#" className="menu_item_link">
                        <img src={library} alt="content" className="db" />
                        <img src={libraryA} alt="content" className="dn" />
                        LIBRARY
                    </Link>
                </li>
                {/*<li className="menu_item">*/}
                {/*    <Link to="#" className="menu_item_link">*/}
                {/*        <img src={drafts} alt="draft" className="db" />*/}
                {/*        <img src={draftsA} alt="dash" className="dn" />*/}
                {/*        DRAFTS*/}
                {/*    </Link>*/}
                {/*</li>*/}
            </ul>
        </div>
    );
}

export default EditToolsSidebar;
