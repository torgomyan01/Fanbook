import React, { useEffect, useRef, useState } from 'react';
import FrontBack from './front-backblock';
import { useDispatch, useSelector } from 'react-redux';
import { editorBookTabs } from 'utils/editor-defoult-name';
import { creatingPage, getAllPagesBook } from 'api/all-apis';
import { useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

import {
    moveItemInArrayFromIndexToIndex,
    savePagesToChanges,
    startSearchActiveNumberToPages,
    TemplateStatus,
    updateBook
} from '../helper';
import AllTemplates from '../layouts-components/templates';
import {
    setBookPage,
    setCurrentBook,
    setCurrentTemplate,
    setUpdatePages
} from 'redux/edit-book';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { removeAndAddActivePreviewPage } from 'pages/cover-preview/helper';
import BlockPlaceholder from 'features/block-placeholder';
import { keyGenerator, setMessageUser } from 'utils/helpers';
import { UM } from 'utils/user-messages';
import { modalAddPlan } from 'redux/modals';

export const pagesTypes = {
    coverSpine: 'cover_spine',
    coverBack: 'cover_back',
    coverFront: 'cover_front',
    page: 'page'
};

function MainHeader() {
    const dispatch = useDispatch();
    const myPlan = useSelector((state: IAuth) => state.sign.myPlans);
    const tabName = useSelector((state: IOneBook) => state.ThisBook.tabName);
    const { bookID }: { bookID: string } = useParams();

    const [loading, setLoading] = useState<boolean>(false);
    const [pages, setPages] = useState<IBookPage[]>([]);

    const startUpdatePages = useSelector(
        (state: IOneBook) => state.ThisBook.updatePages
    );
    const Layouts = useSelector(
        (state: IOneBook) => state.ThisBook.bookTemplates
    );
    const thisBook = useSelector(
        (state: IOneBook) => state.ThisBook.currentBook
    );
    useEffect(() => {
        dispatch(setCurrentTemplate(pages[0] ? pages[0].template : {}));
        dispatch(setBookPage(pages[0] ? pages[0] : {}));
    }, [pages]);

    useEffect(() => {
        getAllPages();
    }, [bookID]);

    useEffect(() => {
        switch (startUpdatePages.status) {
            case updateBook.start:
                updateStart();
                break;
            case updateBook.savePage:
                savePages();
                break;
        }
    }, [startUpdatePages]);

    function updateStart() {
        const pageID = startUpdatePages.pageID;
        const deletingPageNumber = pages.findIndex(
            (page: IBookPage) => page.id === pageID
        );
        const _pages = [...pages];
        _pages.splice(deletingPageNumber, 1);
        setPages(_pages);
        dispatch(savePagesToChanges(pages, thisBook.id));
        dispatch(setUpdatePages(updateBook.stop));
    }

    function savePages() {
        const _pages = [...pages];
        const newPageArray: any[] = [];
        _pages.map((page: IBookPage, index: number) => {
            if (page.id === startUpdatePages.pageID) {
                newPageArray.push(startUpdatePages.saveNewTemplate);
            } else {
                newPageArray.push(page);
            }
            index === _pages.length - 1 && setPages(newPageArray);
        });
        dispatch(savePagesToChanges(newPageArray, thisBook.id));
    }

    // CREATING PAGE
    function createPage() {
        if (pages.length - 5 < myPlan.options?.books?.maxPages) {
            startSearchActiveNumberToPages(function (activeNumber: number) {
                if (activeNumber < 0 && pages.length > 0) {
                    dispatch(setMessageUser(UM.ADD_BOOK_PAGES));
                    return;
                }

                if (pages.length === 0) {
                    setLoading(true);
                    dispatch(setMessageUser(UM.P_W));
                    creatingPage(bookID).then((res) => {
                        addPageToThisBook(res.data.data.item);
                        const _pages: IBookPage[] = [];
                        _pages.push({
                            ...res.data.data.item,
                            template: Layouts[0]
                        });
                        setPages(_pages);
                        setLoading(false);
                        dispatch(setMessageUser(UM.PAGE_CREATED));
                        // addClassActiveToIndexNumber(0);
                        setPagesInputValue(0);
                        dispatch(savePagesToChanges(_pages, thisBook.id));
                    });
                    return;
                }

                if (pages.length > 0) {
                    setLoading(true);
                    dispatch(setMessageUser(UM.P_W));
                    creatingPage(bookID).then((res) => {
                        addPageToThisBook(res.data.data.item);
                        const _pages: IBookPage[] = [];
                        pages.map((page: IBookPage, index: number) => {
                            _pages.push(page);
                            if (index === activeNumber) {
                                _pages.push({
                                    ...res.data.data.item,
                                    template: Layouts[0]
                                });
                            }
                        });
                        setPages(_pages);
                        setLoading(false);
                        dispatch(setMessageUser(UM.PAGE_CREATED));
                        // addClassActiveToIndexNumber(activeNumber + 1);
                        setPagesInputValue((activeNumber) => activeNumber + 1);
                        dispatch(savePagesToChanges(_pages, thisBook.id));
                    });
                    return;
                }
            });
        } else {
            dispatch(
                modalAddPlan({
                    openClose: true
                })
            );
        }
    }
    function addPageToThisBook(page: IBookPage) {
        const _thisBook = { ...thisBook };
        const _thisBookPages = [..._thisBook.pages];
        _thisBookPages.push(page);
        _thisBook.pages = _thisBookPages;
        dispatch(setCurrentBook(_thisBook));
    }

    const [preorderStatus, setPreorderStatus] = useState(true);
    function getAllPages() {
        getAllPagesBook(bookID).then((res) => {
            const pages = res.data.data.items
                .filter((page: IBookPage) => page.type === pagesTypes.page)
                ?.slice()
                .sort((a: IBookPage, b: IBookPage) => a.order - b.order);
            setPages(pages);
            setPreorderStatus(false);
        });
    }

    const [pagesInputValue, setPagesInputValue] = useState<number>(1);

    useEffect(() => {
        viewPageAndAddActive(pagesInputValue);
    }, [pagesInputValue]);

    function onBeforeCapture(e: any) {
        const newIndex = e.destination.index;
        const oldIndex = e.source.index;
        const oldPage = pages[oldIndex];
        const newPage = pages[newIndex];

        dispatch(setMessageUser(UM.P_W));

        const newArr = moveItemInArrayFromIndexToIndex(
            pages,
            oldIndex,
            newIndex
        );
        setPages(newArr);
        dispatch(savePagesToChanges(newArr, oldPage.bookId));
        setPagesInputValue(newIndex);
    }

    const pageNum: any = useRef();
    function viewPagePreview(e: any) {
        e.preventDefault();
        const inpValue = Number(pageNum.current?.value) - 1;
        if (inpValue > pages.length - 1) {
            dispatch(setMessageUser(UM.NO_PAGE_BOOK));
            return;
        }
        setPagesInputValue(inpValue);
    }

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
                    {tabName === editorBookTabs.frontBack ? (
                        <FrontBack />
                    ) : (
                        <>
                            <form action="#" onSubmit={viewPagePreview}>
                                <div className="form-group mr-sm-3 mb-2">
                                    <label
                                        htmlFor="inputPage"
                                        className="label ml-1 mt-4">
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
                                            defaultValue={pagesInputValue}
                                        />
                                        <button
                                            type="submit"
                                            className="btn btn-go d-block">
                                            GO
                                        </button>
                                    </div>
                                </div>
                            </form>
                            <div className="d-flex w-100">
                                <span
                                    className="plus-page cursor-pointer mt-2"
                                    onClick={createPage}>
                                    {loading ? (
                                        <Spinner
                                            animation="border"
                                            variant="danger"
                                            className="mr-2"
                                        />
                                    ) : (
                                        <i className="fas fa-plus-circle mr-1" />
                                    )}
                                    Page
                                </span>
                                <div id="header-block-to-editor-pages-view">
                                    <DragDropContext
                                        onDragEnd={onBeforeCapture}>
                                        <Droppable
                                            droppableId="droppable-1"
                                            type="PERSON"
                                            direction="horizontal">
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    className="d-flex"
                                                    {...provided.droppableProps}>
                                                    {pages.length > 0 &&
                                                        pages.map(
                                                            (
                                                                bookPage: IBookPage,
                                                                index: number
                                                            ) => {
                                                                return (
                                                                    <Draggable
                                                                        key={keyGenerator(
                                                                            30
                                                                        )}
                                                                        draggableId={`draggable-${
                                                                            index +
                                                                            1
                                                                        }`}
                                                                        index={
                                                                            index
                                                                        }>
                                                                        {(
                                                                            provided
                                                                        ) => (
                                                                            <div
                                                                                ref={
                                                                                    provided.innerRef
                                                                                }
                                                                                {...provided.draggableProps}
                                                                                {...provided.dragHandleProps}>
                                                                                <AllTemplates
                                                                                    pageNumber={
                                                                                        index +
                                                                                        1
                                                                                    }
                                                                                    key={keyGenerator(
                                                                                        30
                                                                                    )}
                                                                                    status={
                                                                                        TemplateStatus.min
                                                                                    }
                                                                                    bookPage={
                                                                                        bookPage
                                                                                    }
                                                                                    layoutName={
                                                                                        bookPage
                                                                                            ?.template
                                                                                            ?.name
                                                                                    }
                                                                                />
                                                                            </div>
                                                                        )}
                                                                    </Draggable>
                                                                );
                                                            }
                                                        )}

                                                    {provided.placeholder}
                                                </div>
                                            )}
                                        </Droppable>
                                    </DragDropContext>

                                    <BlockPlaceholder
                                        width={110}
                                        height={110}
                                        borderRadius={5}
                                        status={preorderStatus}
                                        count={5}
                                        className="m-0 mr-2"
                                    />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MainHeader;
