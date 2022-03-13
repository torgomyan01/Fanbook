import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import 'assets/css/template-styles/template10.css';
import TemplateBloc from '../block';
import { findStyleParameters } from 'utils/helpers';

const draggingEventClasses = {
    block1: 'template-10-block-1 blocks',
    block1Active: 'template-10-block-1 blocks yes',
    block2: 'template-10-block-2 blocks',
    block2Active: 'template-10-block-2 blocks yes',
    block3: 'template-10-block-3 blocks',
    block3Active: 'template-10-block-3 blocks yes',
    block4: 'template-10-block-4 blocks',
    block4Active: 'template-10-block-4 blocks yes'
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

function Template10({ status, bookPage }: IThisProps) {
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
            <div className="template-10-block">
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
                <TemplateBloc
                    status={status}
                    pageItem={
                        bookPage?.params?.images?.items[1] &&
                        bookPage?.params?.images?.items[1]
                    }
                    className={
                        draggingEvent.start
                            ? draggingEventClasses.block1Active
                            : draggingEventClasses.block1
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
                            ? draggingEventClasses.block1Active
                            : draggingEventClasses.block1
                    }
                    dataBlockName={blockNames.block1}
                />
                <TemplateBloc
                    status={status}
                    pageItem={
                        bookPage?.params?.images?.items[3] &&
                        bookPage?.params?.images?.items[3]
                    }
                    className={
                        draggingEvent.start
                            ? draggingEventClasses.block1Active
                            : draggingEventClasses.block1
                    }
                    dataBlockName={blockNames.block1}
                />
            </div>
        </div>
    );
}

export default Template10;
