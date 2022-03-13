import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import 'assets/css/template-styles/template1.css';
import TemplateBloc from '../block';
import { findStyleParameters } from 'utils/helpers';

const draggingEventClasses = {
    draggingEventLeftActive: 'template-1-block__left-block blocks yes',
    draggingEventLeft: 'template-1-block__left-block blocks'
};

const blockNames = {
    block1: 'block-1',
    block2: 'block-2'
};

interface IThisProps {
    status: string;
    bookPage: IBookPage;
}

function Template1({ status, bookPage }: IThisProps) {
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
            <div className="template-1-block">
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
            </div>
        </div>
    );
}

export default Template1;
