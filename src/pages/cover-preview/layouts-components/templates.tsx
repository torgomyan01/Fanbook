import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    addActivePageMinBlock,
    TemplateStatus
} from 'pages/edit-covers/helper';
import {
    setBookPage,
    setCurrentTemplate,
    setStartDelete,
    setTabName,
    setUpdateTexts
} from 'redux/edit-book';

import TextBlockPages from './text-block';
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
import { keyGenerator } from 'utils/helpers';
import { pagesTypes } from 'pages/edit-covers/components/main-header';
import { setFrontSpineCover } from 'redux/edit-cover';
import { editorBookTabs } from 'utils/editor-defoult-name';

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

    const UpdateTexts = useSelector(
        (state: IOneBook) => state.ThisBook.UpdateTexts
    );
    const thisBlock: any = useRef();
    function openMaxBlock() {
        if (status === TemplateStatus.min) {
            dispatch(setFrontSpineCover(pagesTypes.page));
            dispatch(setTabName(editorBookTabs.pages));
            dispatch(setCurrentTemplate(bookPage.template));
            dispatch(setBookPage(bookPage));
            addActivePageMinBlock(thisBlock.current);
        }
    }

    const [allText, setAllText] = useState<any[]>([]);

    useEffect(() => {
        const texts: any[] = allText.filter((text) => text?.id !== startDelete);
        setAllText(texts);
        dispatch(setStartDelete(''));
    }, [startDelete]);

    useEffect(() => {
        const texts: any[] = allText.filter(
            (text) => text?.id !== UpdateTexts.id
        );
        setAllText([
            ...texts,
            {
                id: UpdateTexts.id,
                text: UpdateTexts.text,
                style: UpdateTexts.style
            }
        ]);
        dispatch(setUpdateTexts(''));
    }, [UpdateTexts]);

    useEffect(() => {
        setAllText([]);
        bookPage?.params?.images?.items?.map((item: IBookPageItems) => {
            item?.texts?.map((text: IBookPageText) => {
                if (text.content) {
                    setAllText((oldText: any[]) => [
                        ...oldText,
                        {
                            id: keyGenerator(30),
                            text: text.content,
                            style: text.style
                        }
                    ]);
                }
            });
        });
    }, [bookPage]);

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
                style={{
                    zoom: status === TemplateStatus.min ? '14.5%' : '100%'
                }}>
                {test[layoutName]}

                {allText.map((text) => {
                    if (text.text) {
                        return (
                            <TextBlockPages
                                key={keyGenerator(30)}
                                text={text}
                                status={status}
                            />
                        );
                    }
                })}
            </div>
            {status === TemplateStatus.min && (
                <div className="text-center">Page {pageNumber}</div>
            )}
        </>
    );
}

export default AllTemplates;
