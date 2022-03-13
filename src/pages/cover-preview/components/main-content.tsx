import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { TemplateStatus } from '../helper';
import AllTemplates from '../layouts-components/templates';
import { pagesTypes } from 'pages/edit-covers/components/main-header';
import { editorBookTabs } from 'utils/editor-defoult-name';
import BackBlockPreview from '../front-back-preview/back-block/back-block';
import FrontBlockPreview from '../front-back-preview/front-back/front-block';
import { textCrop } from 'utils/helpers';

function MainContent() {
    const tabName = useSelector((state: IOneBook) => state.ThisBook.tabName);
    const activeBlock = useSelector(
        (state: IEditCover) => state.editCover.frontSpineCover
    );
    const currentTemplateName: string = useSelector(
        (state: IOneBook) => state.ThisBook.currentTemplate.name
    );

    const currentTemplate = useSelector(
        (state: IOneBook) => state.ThisBook.currentTemplate
    );

    const currentTemplatePage = useSelector(
        (state: IOneBook) => state.ThisBook.bookPage
    );

    const currentBook = useSelector(
        (state: IOneBook) => state.ThisBook.currentBook
    );

    function editingBlocks(name: string, activeBlock: string) {
        switch (name) {
            case editorBookTabs.frontBack:
                return FrontSpineBack(activeBlock);
            case editorBookTabs.pages:
                return (
                    <div
                        id="book-page-content-view"
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
                );
            default:
                return;
        }
    }

    function FrontSpineBack(active: string) {
        switch (active) {
            case pagesTypes.coverFront:
                return <FrontBlockPreview />;
            case pagesTypes.coverSpine:
                return 'spine';
            case pagesTypes.coverBack:
                return <BackBlockPreview />;
        }
    }
    const [openCloseDescription, setOpenCloseDescription] =
        useState<boolean>(false);

    return (
        <div className="main-content">
            <div className="mt-3">{editingBlocks(tabName, activeBlock)}</div>
            <div className="bottom-btns">
                <div />
                <div>
                    <div className="preview-info-box" style={{ minWidth: 300 }}>
                        <ul className="mb-0">
                            <li>
                                <h4>Book Name</h4>
                                <p>{currentBook.name}</p>
                            </li>
                            <li>
                                <h4>Book Description</h4>
                                <p>
                                    {openCloseDescription
                                        ? currentBook?.description
                                        : textCrop(
                                              currentBook?.description,
                                              20
                                          )}
                                    <span
                                        onClick={() =>
                                            setOpenCloseDescription(
                                                !openCloseDescription
                                            )
                                        }
                                        className="c-blue ml-2 cursor-pointer font-light">
                                        {openCloseDescription
                                            ? 'See Less'
                                            : 'See More'}
                                    </span>
                                </p>
                            </li>
                            <li className="mb-3">
                                <h4>Dimension</h4>
                                <p>{currentBook.size}</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainContent;
