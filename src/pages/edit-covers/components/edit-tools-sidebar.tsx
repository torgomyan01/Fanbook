import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import editCover from '../images/edit-cover.png';
import editCoverA from '../images/edit-cover-active.png';
import pagesImg from '../images/pages.png';
import pagesA from '../images/pages-active.png';
import library from '../images/library.png';
import libraryA from '../images/library.png';
import Layouts from 'assets/images/edit-book/Loyouts.png';
import { useDispatch, useSelector } from 'react-redux';
import { openPages } from 'redux/edit-cover';
import { editorBookTabs } from 'utils/editor-defoult-name';
import { setOpenCloseLibraryBlock, setTabName } from 'redux/edit-book';
import { pagesTypes } from './main-header';

function EditToolsSidebar() {
    const dispatch = useDispatch();
    const thisBook = useSelector(
        (state: IOneBook) => state.ThisBook.currentBook
    );
    const tabName = useSelector((state: IOneBook) => state.ThisBook.tabName);
    const OpenCloseLayouts = useSelector(
        (state: IEditCover) => state.editCover.pages
    );

    const [pages, setPages] = useState<IBookPage[]>([]);
    useEffect(() => {
        const _pages = thisBook?.pages?.filter(
            (page: IBookPage) => page.type === pagesTypes.page
        );
        _pages && setPages(_pages);
    }, [thisBook]);
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

    const libraryStatus = useSelector(
        (state: IOneBook) => state.ThisBook.openCloseLibraryBlock
    );

    function openCLoseLibraryBlock(e: any) {
        e.preventDefault();
        dispatch(setOpenCloseLibraryBlock(!libraryStatus));
    }

    console.log(thisBook.pages);
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
                        <img src={pagesImg} alt="pages" className="db" />
                        <img src={pagesA} alt="pages" className="dn" />
                        PAGES
                    </Link>
                </li>
                {tabName === editorBookTabs.pages && pages.length > 0 && (
                    <li className="menu_item">
                        <Link
                            to="#"
                            onClick={openPagePanel}
                            className={
                                OpenCloseLayouts
                                    ? 'menu_item_link active'
                                    : 'menu_item_link'
                            }>
                            <img src={Layouts} alt="pages" className="db" />
                            <img src={Layouts} alt="pages" className="dn" />
                            LAYOUTS
                        </Link>
                    </li>
                )}
            </ul>
            <ul className="menu-list">
                <li className="menu_item">
                    <Link
                        to="#"
                        className={
                            libraryStatus
                                ? 'menu_item_link'
                                : 'menu_item_link active'
                        }
                        onClick={openCLoseLibraryBlock}>
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
