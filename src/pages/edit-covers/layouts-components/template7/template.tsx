import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import 'assets/css/template-styles/template7.css';
import TemplateBloc from '../block';
import { findStyleParameters } from 'utils/helpers';

const draggingEventClasses = {
    block1: 'template-7-block-1 blocks yes',
    block1Active: 'template-7-block-1 blocks',
    block2: 'template-7-block-2 blocks yes',
    block2Active: 'template-7-block-2 blocks',
    block3: 'template-7-block-3 blocks yes',
    block3Active: 'template-7-block-3 blocks',
    block4: 'template-7-block-4 blocks yes',
    block4Active: 'template-7-block-4 blocks'
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

function Template7({ status, bookPage }: IThisProps) {
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
            <div className="template-7-block">
                <TemplateBloc
                    status={status}
                    pageItem={
                        bookPage?.params?.images?.items[0] &&
                        bookPage?.params?.images?.items[0]
                    }
                    className={
                        draggingEvent.start
                            ? draggingEventClasses.block1Active
                            : draggingEventClasses.block1
                    }
                    dataBlockName={blockNames.block1}
                />
                <div className="bottom-block">
                    <TemplateBloc
                        status={status}
                        pageItem={
                            bookPage?.params?.images?.items[1] &&
                            bookPage?.params?.images?.items[1]
                        }
                        className={
                            draggingEvent.start
                                ? draggingEventClasses.block2Active
                                : draggingEventClasses.block2
                        }
                        dataBlockName={blockNames.block1}
                    />
                    <TemplateBloc
                        status={status}
                        pageItem={
                            bookPage?.params?.images?.items[2] &&
                            bookPage?.params?.images?.items[2]
                        }
                        className={
                            draggingEvent.start
                                ? draggingEventClasses.block3Active
                                : draggingEventClasses.block3
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
                                ? draggingEventClasses.block4Active
                                : draggingEventClasses.block4
                        }
                        dataBlockName={blockNames.block4}
                    />
                </div>
            </div>
        </div>
    );
}

export default Template7;
