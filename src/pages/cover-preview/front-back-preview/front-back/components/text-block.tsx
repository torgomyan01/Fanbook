import React, { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { openCloseEditor } from 'utils/helpers';
import FrontTextEditor from './text-editor';

interface IThisProps {
    text: {
        text: string;
        style: string;
        id: string;
        param: {
            x: number;
            y: number;
        };
    };
    saveThisText: any;
    parentParam: {
        width: number;
        height: number;
    };
}

function TextBlock({ text, saveThisText, parentParam }: IThisProps) {
    const [draggingPosition, setDraggingPosition] = useState({
        width: parentParam.width - 100,
        height: parentParam.height - 50
    });
    const thisTextBlock = useRef<any>();
    const [positionX, setPositionX] = useState<number>(0);
    const [positionY, setPositionY] = useState<number>(0);
    const [oldStyle, setOldStyle] = useState<string>('');
    const [thisText, setThisText] = useState(text.text);
    const [openCloseTextEditor, setOpenCloseTextEditor] =
        useState<boolean>(false);

    function textDragLogger(e: any, params: any) {
        setPositionX(params.x);
        setPositionY(params.y);
    }

    function checkPos() {
        const textBlockWidth =
            parentParam.width - thisTextBlock.current.offsetWidth;
        const textBlockHeight =
            parentParam.height - thisTextBlock.current.offsetHeight;
        setDraggingPosition({
            width: textBlockWidth,
            height: textBlockHeight
        });
    }

    useEffect(() => {
        thisTextBlock.current?.setAttribute('style', text.style);
    }, [text]);

    // EDITOR
    function openEditor() {
        openCloseEditor(true);
        setOpenCloseTextEditor(true);
        setOldStyle(thisTextBlock.current?.getAttribute('style'));
    }
    function CloseEditor() {
        openCloseEditor(false);
        setOpenCloseTextEditor(false);
        thisTextBlock.current.setAttribute('style', oldStyle);
        checkPos();
    }

    function TextChange(e: any) {
        setThisText(e.target.value);
        checkPos();
    }

    function changeLineHeight(e: any, value: number) {
        thisTextBlock.current.style.lineHeight = `${value}px`;
        checkPos();
    }

    function changeLetterSpacing(e: any, value: number) {
        thisTextBlock.current.style.letterSpacing = `${value}px`;
        checkPos();
    }

    function changeTextColor(e: string) {
        thisTextBlock.current.style.color = e;
    }

    const [textBg, setTextBg] = useState<string>('#000');
    function OpenCloseBgFunction(e: boolean) {
        thisTextBlock.current.style.backgroundColor = e ? textBg : null;
    }

    function changeFontFamily(e: any, val: any) {
        thisTextBlock.current.style.fontFamily = val?.family || null;
        checkPos();
    }

    function changeFontSize(e: any, val: number) {
        thisTextBlock.current.style.fontSize = `${val}px`;
        checkPos();
    }

    function changeTextBgc(e: string) {
        thisTextBlock.current.style.backgroundColor = e;
        setTextBg(e);
    }

    function SaveChanges() {
        openCloseEditor(false);
        setOpenCloseTextEditor(false);
        const param = {
            style: thisTextBlock.current.getAttribute('style'),
            id: text.id,
            text: thisText,
            param: {
                x: positionX,
                y: positionY
            }
        };
        saveThisText(param);
    }

    return (
        <>
            <Draggable
                bounds={{
                    top: 0,
                    left: 0,
                    right: draggingPosition.width,
                    bottom: draggingPosition.height
                }}
                defaultPosition={{ x: text.param.x, y: text.param.y }}
                onDrag={textDragLogger}>
                <div
                    className="front-back-book--text"
                    ref={thisTextBlock}
                    onClick={openEditor}>
                    {thisText}
                    <span className="remove-text">
                        <i className="fas fa-times" />
                    </span>
                </div>
            </Draggable>

            {openCloseTextEditor && (
                <FrontTextEditor
                    text={thisText}
                    TextChange={TextChange}
                    changeLineHeight={changeLineHeight}
                    changeLetterSpacing={changeLetterSpacing}
                    onChangeTextColor={changeTextColor}
                    OpenCloseBgFunction={OpenCloseBgFunction}
                    changeFontFamily={changeFontFamily}
                    changeFontSize={changeFontSize}
                    changeTextBgc={changeTextBgc}
                    CloseEditor={CloseEditor}
                    SaveChanges={SaveChanges}
                />
            )}
        </>
    );
}

export default TextBlock;
