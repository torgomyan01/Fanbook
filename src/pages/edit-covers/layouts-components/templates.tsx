import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    addActivePageMinBlock,
    defaultTextStyle,
    TemplateStatus,
    updateBook
} from 'pages/edit-covers/helper';
import {
    setBookPage,
    setCurrentBook,
    setCurrentTemplate,
    setStartDelete,
    setUpdatePages
} from 'redux/edit-book';

import TextBlockPages from './text-block';
import { Link } from 'react-router-dom';
import addTextIcon from 'assets/images/add-text-icon.png';
import Template2 from './template2/template2';
import Template1 from './template1/template';
import Template3 from './template3/template';
import Template4 from './template4/template';
import Template5 from './template5/template';
import Template6 from './template6/template';
import Template7 from './template7/template';
import Template8 from './template8/template2';
import Template9 from './template9/template';
import Template10 from './template10/template';
import { RemovePageBook } from 'api/all-apis';
import { Spinner } from 'react-bootstrap';
import EditMaxBlock from './edit-max-block';
import {
    findStyleParameters,
    INCH_ONE_PIXEL,
    keyGenerator,
    MINIMISE_IMAGE_BLOCK,
    openCloseEditor,
    setMessageUser
} from 'utils/helpers';
import TextBlock from '../front-back/components/text-block';
import { UM } from 'utils/user-messages';

interface IThisProps {
    status: string;
    bookPage: IBookPage;
    layoutName: string;
    pageNumber: number;
}

function AllTemplates({
    status,
    bookPage,
    layoutName,
    pageNumber
}: IThisProps) {
    const dispatch = useDispatch();

    const startDelete = useSelector(
        (state: IOneBook) => state.ThisBook.deleteText
    );

    const thisBook = useSelector(
        (state: IOneBook) => state.ThisBook.currentBook
    );

    const [bookWidth, setBookWidth] = useState<number>(500);
    const [bookHeight, setBookHeight] = useState<number>(500);

    const [openCloseMaxEditor, setOpenCloseMaxEditor] = useState(false);
    const thisBlock: any = useRef();
    function openMaxBlock(e: any) {
        if (status === TemplateStatus.min) {
            dispatch(setCurrentTemplate(bookPage.template));
            dispatch(setBookPage(bookPage));
            addActivePageMinBlock(thisBlock.current);
        } else if (e.target.className === 'carousel-item-bg') {
            setOpenCloseMaxEditor(true);
            openCloseEditor(true);
        }
    }

    const [allText, setAllText] = useState<any[]>([]);

    useEffect(() => {
        const texts: any[] = allText.filter((text) => text?.id !== startDelete);
        setAllText(texts);
        dispatch(setStartDelete(''));
    }, [startDelete]);

    useEffect(() => {
        setAllText([]);
        bookPage?.params?.images?.items?.map((item: IBookPageItems) => {
            item?.texts?.map((text: IBookPageText) => {
                if (text.content) {
                    const transformPosition = findStyleParameters(
                        text.style
                    ).transform.split(',');
                    setAllText((oldText: any[]) => [
                        ...oldText,
                        {
                            id: keyGenerator(30),
                            text: text.content,
                            style: text.style,
                            param: {
                                x: transformPosition
                                    ? Number(transformPosition[0])
                                    : 0,
                                y: transformPosition
                                    ? Number(transformPosition[1])
                                    : 0
                            }
                        }
                    ]);
                }
            });
        });
    }, [bookPage]);

    useEffect(() => {
        const BookSize = thisBook.size.split('x');
        setBookWidth(Number(BookSize[0]));
        setBookHeight(Number(BookSize[1]));
    }, [thisBook]);

    function addText() {
        setAllText((oldArray: any[]) => [...oldArray, { ...defaultTextStyle }]);
    }

    const test: any = {
        'Blank Page': <Template1 status={status} bookPage={bookPage} />,
        'Layout 2': <Template2 status={status} bookPage={bookPage} />,
        'Layout 3': <Template3 status={status} bookPage={bookPage} />,
        'Layout 4': <Template4 status={status} bookPage={bookPage} />,
        'Layout 5': <Template5 status={status} bookPage={bookPage} />,
        'Layout 6': <Template6 status={status} bookPage={bookPage} />,
        'Layout 7': <Template7 status={status} bookPage={bookPage} />,
        'Layout 8': <Template8 status={status} bookPage={bookPage} />,
        'Layout 9': <Template9 status={status} bookPage={bookPage} />,
        'Layout 10': <Template10 status={status} bookPage={bookPage} />
    };

    const [loadingDeleted, setLoadingDeleted] = useState(false);
    function deleteThisPages() {
        setLoadingDeleted(true);
        dispatch(setMessageUser(UM.P_W));
        RemovePageBook(bookPage.bookId, bookPage.id).then((res) => {
            if (res.status === 200) {
                setLoadingDeleted(false);
                dispatch(setMessageUser(UM.DELETED));
                dispatch(
                    setUpdatePages({
                        status: updateBook.start,
                        pageID: bookPage.id
                    })
                );
                deletePageToThisBook(bookPage);
            }
        });
    }
    function deletePageToThisBook(page: IBookPage) {
        const _thisBook = { ...thisBook };
        const _thisBookPages = [..._thisBook.pages];
        const indexPage = _thisBookPages.indexOf(page);
        if (_thisBookPages) {
            _thisBookPages.splice(indexPage, 1);
            _thisBook.pages = _thisBookPages;
            dispatch(setCurrentBook(_thisBook));
        }
    }

    function saveTextChange(param: IText) {
        const _texts = [...allText];
        const _currentText = _texts.find((text: IText) => text.id === param.id);
        if (_currentText) {
            const indexThisText = _texts.indexOf(_currentText);
            _texts.splice(indexThisText, 1);
            _texts.push(param);
            setAllText(_texts);
        }
    }

    const BlockWidth = (bookWidth * INCH_ONE_PIXEL) / MINIMISE_IMAGE_BLOCK;
    const BlockHeight = (bookHeight * INCH_ONE_PIXEL) / MINIMISE_IMAGE_BLOCK;

    function BlockWidthHeight(st: string) {
        switch (st) {
            case TemplateStatus.min:
                return {
                    zoom: '14.5%'
                };
            case TemplateStatus.max:
                return {
                    zoom: '100%',
                    width: BlockWidth,
                    height: BlockHeight
                };
            default:
                return {};
        }
    }

    function removeThisText(id: string) {
        const _texts = [...allText].filter((texts: IText) => texts.id !== id);
        setAllText(_texts);
    }
    return (
        <>
            <div
                ref={thisBlock}
                className={
                    status === TemplateStatus.min
                        ? 'carousel-item-bg block-min cursor-pointer mr-5'
                        : 'carousel-item-bg'
                }
                onClick={openMaxBlock}
                style={BlockWidthHeight(status)}>
                {status === TemplateStatus.max && (
                    <EditMaxBlock
                        thisBlock={thisBlock}
                        openClose={openCloseMaxEditor}
                        handleClose={() => {
                            setOpenCloseMaxEditor(false);
                            openCloseEditor(false);
                        }}
                    />
                )}

                {test[layoutName]}

                {allText.map((text) => {
                    if (text.text) {
                        return status === TemplateStatus.max ? (
                            <TextBlock
                                key={keyGenerator(30)}
                                text={text}
                                saveThisText={saveTextChange}
                                removeText={removeThisText}
                                parentParam={{
                                    width: BlockWidth,
                                    height: BlockHeight
                                }}
                            />
                        ) : (
                            <TextBlockPages
                                key={keyGenerator(30)}
                                text={text}
                            />
                        );
                    }
                })}

                {status === TemplateStatus.min && (
                    <div
                        className="remove-page-button"
                        onClick={deleteThisPages}>
                        {loadingDeleted ? (
                            <Spinner animation="border" variant="light" />
                        ) : (
                            <i className="fas fa-times" />
                        )}
                    </div>
                )}
                {status === TemplateStatus.max && (
                    <div
                        className="text-right add-text-button-to-template"
                        onClick={addText}>
                        <span className="d-inline-block cursor-pointer">
                            <span className="btn-add-text">
                                <img
                                    src={addTextIcon}
                                    alt="icon"
                                    className="mb-2"
                                />
                                Add text
                            </span>
                        </span>
                    </div>
                )}
            </div>
            {status === TemplateStatus.min && (
                <div className="text-center">Page {pageNumber}</div>
            )}
        </>
    );
}

export default AllTemplates;
