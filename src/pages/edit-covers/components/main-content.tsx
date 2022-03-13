import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    addClassActiveToIndexNumber,
    getAllDataPage,
    startSaving,
    startSearchActiveNumberToPages,
    TemplateStatus,
    updateBook
} from '../helper';
import { UpdatePageBook } from 'api/all-apis';
import { setUpdatePages } from 'redux/edit-book';
import AllTemplates from '../layouts-components/templates';
import { DEF_URL } from 'utils/urls';
import {
    eventStatus,
    history,
    openCloseEditor,
    setMessageUser
} from 'utils/helpers';
import { editorBookTabs } from 'utils/editor-defoult-name';
import FrontBlock from '../front-back/front-block';
import { pagesTypes } from './main-header';
import BackBlock from '../back-block/back-block';
import { Spinner } from 'react-bootstrap';
import BlockPlaceholder from 'features/block-placeholder';
import { UM } from 'utils/user-messages';

function MainContent() {
    const dispatch = useDispatch();
    const { bookID }: { bookID: string } = useParams();
    const tabName = useSelector((state: IOneBook) => state.ThisBook.tabName);
    const currentTemplateName: string = useSelector(
        (state: IOneBook) => state.ThisBook.currentTemplate.name
    );
    const startSavingAllPages = useSelector(
        (state: IOneBook) => state.ThisBook.startSaveAllPages
    );

    const currentTemplate = useSelector(
        (state: IOneBook) => state.ThisBook.currentTemplate
    );

    const currentTemplatePage = useSelector(
        (state: IOneBook) => state.ThisBook.bookPage
    );

    const thisBook = useSelector(
        (state: IOneBook) => state.ThisBook.currentBook
    );

    const activeBlock = useSelector(
        (state: IEditCover) => state.editCover.frontSpineCover
    );

    const [saveLoading, setSaveLoading] = useState<boolean>(false);
    function saveChanges() {
        startSearchActiveNumberToPages(function (activeNumber: number) {
            setSaveLoading(true);
            openCloseEditor(false);

            // For animation
            setTimeout(() => {
                startSave(function () {
                    setSaveLoading(false);
                    addClassActiveToIndexNumber(activeNumber);
                });
            }, 100);
        });
    }

    function startSave(result: any) {
        const resultDataSavingBlock = getAllDataPage();
        const bookId = resultDataSavingBlock.bookId;
        const pageId = resultDataSavingBlock.pageId;
        const templateId = resultDataSavingBlock.templateId;
        const images = resultDataSavingBlock.params.images;

        const data = {
            templateId,
            params: {
                template: {
                    style: ''
                },
                images
            }
        };
        if (bookId && pageId && data) {
            dispatch(setMessageUser(UM.P_W));
            UpdatePageBook(bookId, pageId, data).then((res) => {
                dispatch(setMessageUser(UM.CHANGES_SAVED));
                dispatch(setUpdatePages(updateBook.stop));
                dispatch(
                    setUpdatePages({
                        status: updateBook.savePage,
                        pageID: pageId,
                        saveNewTemplate: { ...res.data.data.item }
                    })
                );
                result && result(200);
            });
        }
    }

    useEffect(() => {
        if (startSavingAllPages === startSaving.start) {
            startSave(function (res: number) {
                if (res === 200) {
                    dispatch(setUpdatePages(updateBook.stop));
                    history.push(
                        `${DEF_URL.EVENT}/${thisBook.userEvent.id}/${
                            thisBook.userEvent.isAvailable
                                ? eventStatus.public
                                : eventStatus.private
                        }`
                    );
                }
            });
        }
    }, [startSavingAllPages]);

    const pages = thisBook?.pages?.filter(
        (page: IBookPage) => page.type === pagesTypes.page
    );
    function editingBlocks(name: string, activeBlock: string) {
        switch (name) {
            case editorBookTabs.frontBack:
                return FrontSpineBack(activeBlock);
            case editorBookTabs.pages:
                return (
                    <>
                        {thisBook?.name ? (
                            pages.length > 0 ? (
                                <div
                                    id="book-page-content-view"
                                    className="position-relative"
                                    data-book-id={currentTemplatePage.bookId}
                                    data-page-id={currentTemplatePage.id}
                                    data-template-id={currentTemplate.id}>
                                    <AllTemplates
                                        status={TemplateStatus.max}
                                        bookPage={currentTemplatePage}
                                        layoutName={currentTemplateName}
                                        pageNumber={0}
                                    />
                                </div>
                            ) : (
                                <h1
                                    className="no-result-h1"
                                    style={{ padding: '200px 0' }}>
                                    No Pages
                                </h1>
                            )
                        ) : (
                            <div className="d-flex justify-content-center my-5">
                                <BlockPlaceholder
                                    width={500}
                                    height={550}
                                    borderRadius={5}
                                    status={true}
                                    count={1}
                                    className="m-0"
                                />
                            </div>
                        )}
                    </>
                );
            default:
                return;
        }
    }

    function FrontSpineBack(active: string) {
        switch (active) {
            case pagesTypes.coverFront:
                return <FrontBlock />;
            case pagesTypes.coverSpine:
                return 'spine';
            case pagesTypes.coverBack:
                return <BackBlock />;
        }
    }

    return (
        <div className="main-content">
            <div className="mt-3">{editingBlocks(tabName, activeBlock)}</div>

            <div className="bottom-btns">
                <div />
                {tabName === editorBookTabs.pages && pages?.length > 0 && (
                    <div>
                        <Link
                            to={`${DEF_URL.COVER_PREVIEW}/${bookID}`}
                            className=" btn-bottom mr-3">
                            <span className="d-flex align-items-center">
                                <i className="fas fa-eye" />
                                <span className="btn-text">Preview</span>
                            </span>
                        </Link>
                        <span className="btn btn-save" onClick={saveChanges}>
                            <span className="d-flex align-items-center">
                                {saveLoading ? (
                                    <Spinner
                                        animation="border"
                                        variant="light"
                                        className="mr-2"
                                    />
                                ) : (
                                    <i className="far fa-save" />
                                )}
                                Save Changes
                            </span>
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MainContent;
