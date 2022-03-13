import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPagesBook } from 'api/all-apis';
import { useParams } from 'react-router-dom';

import {
    removeAndAddActivePreviewPage,
    TemplateStatus,
    updateBook
} from '../helper';
import AllTemplates from '../layouts-components/templates';
import {
    setBookPage,
    setCurrentTemplate,
    setUpdatePages
} from 'redux/edit-book';
import BlockPlaceholder from 'features/block-placeholder';
import { keyGenerator, setMessageUser } from 'utils/helpers';
import { pagesTypes } from 'pages/edit-covers/components/main-header';
import FrontBack from 'pages/edit-covers/components/front-backblock';
import { UM } from 'utils/user-messages';

function MainHeader() {
    const dispatch = useDispatch();
    const { bookID }: { bookID: string } = useParams();
    const [pages, setPages] = useState<IBookPage[]>([]);

    const startUpdatePages = useSelector(
        (state: IOneBook) => state.ThisBook.updatePages
    );

    const [pagesLoading, setPagesLoading] = useState(false);
    useEffect(() => {
        dispatch(setCurrentTemplate(pages[0] ? pages[0].template : {}));
        dispatch(setBookPage(pages[0] ? pages[0] : {}));
    }, [pages]);

    useEffect(() => {
        getAllPages();
    }, [bookID]);

    useEffect(() => {
        if (startUpdatePages.status === updateBook.start) {
            getAllPages();
            dispatch(setUpdatePages(updateBook.stop));
        }
    }, [startUpdatePages]);

    function getAllPages() {
        setPages([]);
        setPagesLoading(true);

        getAllPagesBook(bookID).then((res) => {
            const pages = res.data.data.items
                .filter((page: IBookPage) => page.type === pagesTypes.page)
                ?.slice()
                .sort((a: IBookPage, b: IBookPage) => a.order - b.order);
            setPages(pages);
            setPagesLoading(false);
        });
    }

    const pageNum: any = useRef();
    function viewPagePreview(e: any) {
        e.preventDefault();
        const inpValue = Number(pageNum.current?.value) - 1;
        if (inpValue > pages.length - 1) {
            dispatch(setMessageUser(UM.NO_PAGE));
            return;
        }
        const thisPages = pages.find(
            (page: IBookPage, index: number) => index === inpValue
        );
        dispatch(setCurrentTemplate(thisPages?.template));
        dispatch(setBookPage(thisPages));
    }

    function addNumberInput() {
        const inpValue = Number(pageNum.current?.value) - 1;
        viewPageAndAddActive(inpValue);
    }

    useEffect(() => {
        viewPageAndAddActive(1);
    }, [pages]);

    function viewPageAndAddActive(Value: number) {
        if (Value >= 0 && Value < pages.length) {
            const thisPages = pages.find(
                (page: IBookPage, index: number) => index === Value
            );
            dispatch(setCurrentTemplate(thisPages?.template));
            dispatch(setBookPage(thisPages));
            removeAndAddActivePreviewPage(Value);
        }
    }

    return (
        <div className="main-header">
            <div className="d-flex w-100">
                <div
                    className="scroll-horizontal scroll-page-list d-flex justify-content-start align-items-start"
                    data-mcs-theme="dark">
                    <form action="#" onSubmit={viewPagePreview}>
                        <div className="form-group mr-sm-3 mb-2">
                            <label
                                htmlFor="inputPage"
                                className="label ml-1 mt-5">
                                Page
                            </label>
                            <div className="form-inline">
                                <input
                                    type="number"
                                    className="form-control text-center  ml-1"
                                    id="inputPagePreview"
                                    ref={pageNum}
                                    min={1}
                                    max={pages.length}
                                    defaultValue={1}
                                    onChange={addNumberInput}
                                />
                                <button
                                    type="submit"
                                    className="btn btn-go d-block">
                                    GO
                                </button>
                            </div>
                        </div>
                    </form>
                    <FrontBack />
                    <div
                        id="header-block-to-editor-pages-view"
                        className="d-flex">
                        {pagesLoading ? (
                            <>
                                <BlockPlaceholder
                                    width={110}
                                    height={110}
                                    borderRadius={5}
                                    status={true}
                                    count={5}
                                    className="m-0 mr-2"
                                />
                            </>
                        ) : (
                            pages.length > 0 &&
                            pages.map((bookPage: IBookPage, index: number) => (
                                <div
                                    key={keyGenerator(40)}
                                    className="page-block-preview">
                                    <AllTemplates
                                        pageNumber={index + 1}
                                        key={keyGenerator(40)}
                                        status={TemplateStatus.min}
                                        bookPage={bookPage}
                                        layoutName={bookPage.template.name}
                                    />
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainHeader;
