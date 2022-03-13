import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import 'assets/css/template-styles/template8.css';
import TemplateBloc from '../block';
import { findStyleParameters } from 'utils/helpers';

const draggingEventClasses = {
    draggingEventLeftActive: 'template-2-block__left-block blocks',
    draggingEventLeft: 'template-2-block__left-block blocks',
    draggingEventRightActive: 'template-2-block__right-block__body blocks',
    draggingEventRight: 'template-2-block__right-block__body blocks'
};

const blockNames = {
    block1: 'block-1',
    block2: 'block-2',
    block3: 'block-3',
    block4: 'block-4'
};

interface IThisProps {
    status: string;
    bookPage: IBookPage;
}

function Template8({ status, bookPage }: IThisProps) {
    const draggingEvent = useSelector((state: IOneBook) => state.ThisBook.drag);

    const [borderColor, setBorderColor] = useState('0, 121, 255');

    useEffect(() => {
        const borderStyle = findStyleParameters(bookPage.params.images.style);
        setBorderColor(borderStyle.borderColor);
    }, [bookPage]);
    return (
        <div
            className="slider-item"
            style={{
                borderColor: `rgb(${borderColor})`
            }}>
            <div className="template-2-block">
                <TemplateBloc
                    status={status}
                    pageItem={
                        bookPage?.params?.images?.items[0] &&
                        bookPage?.params?.images?.items[0]
                    }
                    className={
                        draggingEvent.start
                            ? draggingEventClasses.draggingEventLeftActive
                            : draggingEventClasses.draggingEventLeft
                    }
                    dataBlockName={blockNames.block1}
                />
                <div className="template-2-block__right-block">
                    <TemplateBloc
                        status={status}
                        pageItem={
                            bookPage?.params?.images?.items[1] &&
                            bookPage?.params?.images?.items[1]
                        }
                        className={
                            draggingEvent.start
                                ? draggingEventClasses.draggingEventRightActive
                                : draggingEventClasses.draggingEventRight
                        }
                        dataBlockName={blockNames.block2}
                    />
                    <TemplateBloc
                        status={status}
                        pageItem={
                            bookPage?.params?.images?.items[2] &&
                            bookPage?.params?.images?.items[2]
                        }
                        className={
                            draggingEvent.start
                                ? draggingEventClasses.draggingEventRightActive
                                : draggingEventClasses.draggingEventRight
                        }
                        dataBlockName={blockNames.block3}
                    />
                    <TemplateBloc
                        status={status}
                        pageItem={
                            bookPage?.params?.images?.items[3] &&
                            bookPage?.params?.images?.items[3]
                        }
                        className={
                            draggingEvent.start
                                ? draggingEventClasses.draggingEventRightActive
                                : draggingEventClasses.draggingEventRight
                        }
                        dataBlockName={blockNames.block4}
                    />
                </div>
            </div>
        </div>
    );
}

export default Template8;
