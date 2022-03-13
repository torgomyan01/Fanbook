import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import noImage from 'assets/images/edit-book/no-photo-blue.png';
import { TemplateStatus } from '../helper';
import { setCurrentBlockInformation } from 'redux/edit-book';
import EditRightPanel from '../components/edit-right-panel';
import {
    AddDisabled,
    openCloseEditor,
    removeAllClass,
    RemoveDisabled
} from 'utils/helpers';
import { defImage } from 'api/creating-book-default-data';

interface IThisProps {
    dataBlockName: string;
    className: any;
    pageItem: IBookPageItems;
    status: string;
}

const noImageStyle = {
    backgroundImage: `url(${noImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: ' 40px',
    backgroundPosition: 'center center'
};

function TemplateBloc({
    dataBlockName,
    className,
    pageItem,
    status
}: IThisProps) {
    const dispatch = useDispatch();
    const draggingEvent = useSelector((state: IOneBook) => state.ThisBook.drag);

    const Block1 = useRef<any | HTMLElement>(null);

    function dragEnter(e: any) {
        e.target.classList.add('enter');
    }
    function dragLeave(e: any) {
        e.preventDefault();
        e.target.classList.remove('enter');
    }
    function dropImages(e: any) {
        e.preventDefault();
        e.target.style.backgroundImage = `url(${draggingEvent.imgUrl})`;
        e.target.style.backgroundPosition = '50% 50%';
        e.target.style.backgroundSize = '100%';
        e.target.style.backgroundRepeat = 'no-repeat';
    }

    function dragOver(e: any) {
        e.preventDefault();
    }

    useEffect(() => {
        const defStyle = `background-image: url(${defImage}); background-repeat: no-repeat; background-position:center; background-size: auto;`;
        const useDefault = pageItem?.style?.includes('default.png');
        Block1.current.setAttribute(
            'style',
            pageItem ? (useDefault ? defStyle : pageItem.style) : defStyle
        );
    }, [pageItem]);

    const [thisEditor, setThisEditor] = useState(false);

    useEffect(() => {
        if (!thisEditor) {
            RemoveDisabled('blocks');
            RemoveDisabled('book-page-text');
            removeAllClass();
        }
    }, [thisEditor]);

    function thisBlockEnter(e: any) {
        const viewStatus = e.target.getAttribute('class')?.includes('Disabled');
        if (viewStatus) {
            return;
        }
        removeAllClass();
        AddDisabled('blocks');
        AddDisabled('book-page-text');
        // removeAllClassRightBlock();
        e.target.classList.remove('hide');
        e.target.classList.remove('Disabled');
        e.target.classList.add('yes');
        setThisEditor(true);

        dispatch(
            setCurrentBlockInformation({
                name: dataBlockName,
                style: Block1.current.getAttribute('style')
            })
        );
        openCloseEditor(true);
    }

    return (
        <>
            {status === TemplateStatus.min ? (
                <div
                    ref={Block1}
                    data-block-name={dataBlockName}
                    className={className}
                    style={noImageStyle}
                />
            ) : (
                <>
                    <div
                        onDragEnter={dragEnter}
                        onDragLeave={dragLeave}
                        onDrop={dropImages}
                        onDragOver={dragOver}
                        onClick={thisBlockEnter}
                        ref={Block1}
                        data-block-name={dataBlockName}
                        className={className}
                        style={noImageStyle}
                    />
                    {status === TemplateStatus.max && (
                        <EditRightPanel
                            status={thisEditor}
                            changeStatus={(e: boolean) => setThisEditor(e)}
                            currentBlock={Block1}
                        />
                    )}
                </>
            )}
        </>
    );
}

export default TemplateBloc;
