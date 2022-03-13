import React, { useEffect, useState } from 'react';

import {
    findStyleParameters,
    fullColorHex,
    keyGenerator,
    openCloseEditor,
    RemoveDisabled,
    setMessageUser,
    viewNumbersRbg
} from 'utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { setStartDelete, setUpdateTexts } from 'redux/edit-book';
import { editBackground, inputFontSizeDefValue } from '../helper';
import { UM } from 'utils/user-messages';

interface IThisProps {
    currentText: any;
    style: string;
    thisBlock: any;
    closeEditor: any;
    pageID: string;
}

function EditRightPanelForText({
    currentText,
    style,
    thisBlock,
    closeEditor,
    pageID
}: IThisProps) {
    const dispatch = useDispatch();
    const [thisText, setThisText] = useState(thisBlock.current.innerText);

    const [leftValue, setLeftValue] = useState<string | undefined>('');
    const [topValue, setTopValue] = useState<string | undefined>('');
    const [rotateValue, setRotateValue] = useState<string | undefined>('');
    const [LineHeightValue, setLineHeightValue] = useState<string | undefined>(
        ''
    );
    const [LetterSpacingValue, setLetterSpacingValue] = useState<
        string | undefined
    >('');
    const [fontSizeValue, setFontSizeValue] = useState<string | undefined>();
    const [BackgroundValue, setBackgroundValue] = useState<string | undefined>(
        ''
    );
    const [ColorValue, setColorValue] = useState<string>('');

    const [background, setBackground] = useState('');
    const [opacity, setOpacity] = useState<number>(0);

    useEffect(() => {
        const text = currentText.text;
        setThisText(text);
    }, [currentText]);

    useEffect(() => {
        const allStyles = findStyleParameters(currentText.style);
        thisBlock.current.style.left = allStyles.left;
    }, [thisBlock]);

    useEffect(() => {
        const allStyles = findStyleParameters(style);

        // FOR GET PARAM TEXT LEFT
        setLeftValue(allStyles.left);

        // // FOR GET PARAM TEXT TOP
        setTopValue(allStyles.top);

        // // FOR GET PARAM TEXT ROTATE
        setRotateValue(allStyles.transform);

        // // FOR GET PARAM TEXT LINE HEIGHT
        setLineHeightValue(allStyles.lineHeight);

        // // FOR GET PARAM TEXT LETTER SPACING
        setLetterSpacingValue(allStyles.letterSpacing);
        setFontSizeValue(
            allStyles.fontSize === '0' ? '11' : allStyles.fontSize
        );

        // GET PARAM TEXT BACKGROUND
        const colorArrayBg = viewNumbersRbg(allStyles.backgroundColor);
        const colorBg = fullColorHex(
            Number(colorArrayBg[0]),
            Number(colorArrayBg[1]),
            Number(colorArrayBg[2])
        );
        setBackgroundValue(`#${colorBg}`);
        setBackground(`#${colorBg}`);
        const opacity = Number(colorArrayBg[3]?.split('.')[1]);
        setOpacity(opacity ? opacity : 100);

        // GET PARAM TEXT COLOR
        const colorArray = viewNumbersRbg(allStyles.color);
        const color = fullColorHex(
            Number(colorArray[0]),
            Number(colorArray[1]),
            Number(colorArray[2])
        );
        setColorValue(`#${color}`);
    }, [style]);

    // FOR EDIT TEXT
    function EditText(e: any) {
        thisBlock.current.innerText = e.target.value;
    }

    // CHANGE LEFT POSITION TEXT
    function leftValueChange(e: any) {
        const value = e.target.value;
        setLeftValue(value);
        thisBlock.current.style.left = `${value}%`;
    }

    // CHANGE TOP POSITION TEXT
    function topValueChange(e: any) {
        const value = e.target.value;
        setTopValue(value);
        thisBlock.current.style.top = `${value}%`;
    }

    // CHANGE ROTATE TEXT
    function rotateValueChange(e: any) {
        const value = e.target.value;
        setRotateValue(value);
        thisBlock.current.style.transform = `rotate(${value}deg)`;
    }

    // CHANGE LINE HEIGHT TEXT
    function LineHeightValueChange(e: any) {
        const value = e.target.value;
        setLineHeightValue(value);
        thisBlock.current.style.lineHeight = `${value}px`;
    }

    // CHANGE LINE LETTER SPACING
    function LetterSpacingValueChange(e: any) {
        const value = e.target.value;
        setLetterSpacingValue(value);
        thisBlock.current.style.letterSpacing = `${value}px`;
    }

    function editFontSize(e: any) {
        const value = e.target.value;

        if (Number(value) < inputFontSizeDefValue.min) {
            dispatch(
                setMessageUser(
                    UM.MIN_FONT_SIZE_POSTER(inputFontSizeDefValue.min)
                )
            );
        } else if (Number(value) > inputFontSizeDefValue.max) {
            dispatch(
                setMessageUser(
                    UM.MAX_FONT_SIZE_POSTER(inputFontSizeDefValue.max)
                )
            );
        } else {
            setFontSizeValue(value);
        }
        thisBlock.current.style.fontSize = `${value}px`;
    }

    function closeEditorBlock() {
        closeEditor({
            status: false,
            style: thisBlock.current.getAttribute('style'),
            text: thisBlock.current.innerText
        });
        RemoveDisabled('blocks');
        RemoveDisabled('book-page-text');
        openCloseEditor(false);
    }

    function saveChanges() {
        closeEditor({
            status: false,
            style: thisBlock.current.getAttribute('style'),
            text: thisBlock.current.innerText
        });
        RemoveDisabled('blocks');
        RemoveDisabled('book-page-text');
        dispatch(
            setUpdateTexts({
                pageID,
                id: currentText.id,
                style: thisBlock.current.getAttribute('style'),
                text: thisBlock.current.innerText
            })
        );
        openCloseEditor(false);
    }

    const googleFonts = useSelector(
        (state: IGoogleFonts) => state.GoogleFonts.AllFonts
    );

    function selectFonts(e: any) {
        thisBlock.current.style.fontFamily = e.target.value;
    }

    function deleteText() {
        dispatch(setStartDelete(currentText.id));
        RemoveDisabled('blocks');
        RemoveDisabled('book-page-text');
        openCloseEditor(false);
    }

    function editColorText(e: any) {
        setColorValue(e.target.value);
        thisBlock.current.style.color = e.target.value;
    }

    useEffect(() => {
        thisBlock.current.style.backgroundColor = editBackground(
            background,
            opacity
        );
    }, [opacity, background]);

    function editBackgroundText(e: any) {
        setBackground(e.target.value);
        setBackgroundValue(e.target.value);
    }

    function editTransparency(e: any) {
        setOpacity(e.target.value);
    }

    return (
        <div className="edit-right-panel">
            <div className="text-mode-styles h-100">
                <div className="d-flex justify-content-between flex-column h-100">
                    <div>
                        <div className="text-center mt-4">
                            <span
                                className="text-mode-btn cursor-pointer"
                                id="exitTextModeRight">
                                <span
                                    className="btn-add-text"
                                    onClick={closeEditorBlock}>
                                    <span className="mr-1 btn-text">
                                        EXIT ‘TEXT MODE’
                                    </span>
                                    <i className="far fa-times-circle exit-icon" />
                                </span>
                            </span>
                        </div>
                        <div className="mb-5">
                            <p className="txt-caption">CAPTION</p>
                            <div className="text-mode-tools">
                                <div className="form-group">
                                    <label
                                        htmlFor="captionText"
                                        className="label">
                                        Enter Your Caption
                                    </label>
                                    <textarea
                                        className="form-control"
                                        defaultValue={thisText}
                                        onChange={EditText}
                                        id="captionText"
                                    />
                                </div>
                                <div className="d-flex justify-content-between">
                                    <div className="form-group">
                                        <label
                                            htmlFor="captionFont"
                                            className="label">
                                            Text Color
                                        </label>
                                        <input
                                            type="color"
                                            value={ColorValue}
                                            className="input-color-text"
                                            onChange={editColorText}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label
                                            htmlFor="captionFont"
                                            className="label">
                                            BG Color
                                        </label>
                                        <input
                                            type="color"
                                            value={BackgroundValue}
                                            className="input-color-text"
                                            onChange={editBackgroundText}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="slider-opacity">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <h4 className="text c-gray">
                                                BG TRANSPARENCY
                                            </h4>
                                            <p className="text c-black">
                                                <span id="transparency">
                                                    {opacity ? opacity : 100}
                                                </span>
                                                %
                                            </p>
                                        </div>
                                        <div className="slidecontainer">
                                            <input
                                                type="range"
                                                min={0}
                                                max={100}
                                                value={opacity ? opacity : 100}
                                                onChange={editTransparency}
                                                className="slider range mb-2"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label
                                        htmlFor="captionFont"
                                        className="label">
                                        Font
                                    </label>
                                    <div className="d-flex align-items-center justify-content-between">
                                        {/*<div className="dropdown w-100">*/}
                                        {/*    <button*/}
                                        {/*        className="btn dropdown-toggle"*/}
                                        {/*        type="button">*/}
                                        {/*        Playfair Display*/}
                                        {/*        <i className="fas fa-chevron-down" />*/}
                                        {/*    </button>*/}
                                        {/*    <div*/}
                                        {/*        className="dropdown-menu"*/}
                                        {/*        aria-labelledby="dropdownMenuButton">*/}
                                        {/*        <span className="dropdown-item">*/}
                                        {/*            text*/}
                                        {/*        </span>*/}
                                        {/*        <span className="dropdown-item">*/}
                                        {/*            text*/}
                                        {/*        </span>*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}
                                        <select
                                            className="select-for-fonts"
                                            onChange={selectFonts}>
                                            <option
                                                key={keyGenerator(30)}
                                                value="">
                                                Select Font
                                            </option>
                                            {googleFonts.map(
                                                (e: IGoogleFontsItem) => {
                                                    return (
                                                        <option
                                                            key={keyGenerator(
                                                                30
                                                            )}
                                                            style={{
                                                                fontFamily:
                                                                    e.family ||
                                                                    ''
                                                            }}
                                                            value={
                                                                e.family || ''
                                                            }>
                                                            {e.family}
                                                        </option>
                                                    );
                                                }
                                            )}
                                        </select>
                                        <input
                                            type="number"
                                            min={11}
                                            max={72}
                                            className="form-control font-input"
                                            id="captionFont"
                                            defaultValue={fontSizeValue}
                                            onChange={editFontSize}
                                        />
                                    </div>
                                </div>
                                <div className="form-grop">
                                    <div className="slider-opacity">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <h4 className="text c-gray">
                                                LEFT
                                            </h4>
                                            <p className="text c-black">
                                                <span id="height">
                                                    {leftValue}%
                                                </span>
                                            </p>
                                        </div>
                                        <div className="slidecontainer">
                                            <input
                                                type="range"
                                                min={0}
                                                max={100}
                                                value={leftValue}
                                                onChange={leftValueChange}
                                                className="slider range mb-4"
                                            />
                                        </div>
                                    </div>
                                    <div className="slider-opacity">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <h4 className="text c-gray">TOP</h4>
                                            <p className="text c-black">
                                                <span id="height">
                                                    {topValue}%
                                                </span>
                                            </p>
                                        </div>
                                        <div className="slidecontainer">
                                            <input
                                                type="range"
                                                min={0}
                                                max={100}
                                                value={topValue}
                                                onChange={topValueChange}
                                                className="slider range mb-4"
                                            />
                                        </div>
                                    </div>
                                    <div className="slider-opacity">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <h4 className="text c-gray">
                                                ROTATE DEG
                                            </h4>
                                            <p className="text c-black">
                                                <span id="height">
                                                    {rotateValue} deg
                                                </span>
                                            </p>
                                        </div>
                                        <div className="slidecontainer">
                                            <input
                                                type="range"
                                                min={0}
                                                max={360}
                                                value={rotateValue}
                                                onChange={rotateValueChange}
                                                className="slider range mb-4"
                                            />
                                        </div>
                                    </div>
                                    <div className="slider-opacity">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <h4 className="text c-gray">
                                                LINE HEIGHT
                                            </h4>
                                            <p className="text c-black">
                                                <span id="height">
                                                    {LineHeightValue}
                                                </span>
                                            </p>
                                        </div>
                                        <div className="slidecontainer">
                                            <input
                                                type="range"
                                                min={0}
                                                max={100}
                                                value={LineHeightValue}
                                                onChange={LineHeightValueChange}
                                                className="slider range mb-4"
                                                id="myRange1"
                                            />
                                        </div>
                                    </div>
                                    <div className="slider-opacity">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <h4 className="text c-gray">
                                                LETTER SPACING
                                            </h4>
                                            <p className="text c-black">
                                                <span id="spacing">
                                                    {LetterSpacingValue}
                                                </span>
                                            </p>
                                        </div>
                                        <div className="slidecontainer">
                                            <input
                                                type="range"
                                                min={0}
                                                max={50}
                                                value={LetterSpacingValue}
                                                onChange={
                                                    LetterSpacingValueChange
                                                }
                                                className="slider range mb-4"
                                                id="myRange2"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <span
                                    className="btn btn-reset c-white bgc-blue"
                                    onClick={saveChanges}>
                                    <i className="far fa-save c-white" />
                                    Save Changes
                                </span>
                                <span
                                    className="btn btn-reset border-red mt-2"
                                    onClick={deleteText}>
                                    <i className="far fa-trash-alt c-red" />
                                    Delete Caption
                                </span>
                            </div>
                        </div>
                    </div>
                    {/*<span className="btn btn-reset bg-red mt-3">*/}
                    {/*    <i className="fas fa-plus-circle" />*/}
                    {/*    New Caption*/}
                    {/*</span>*/}
                </div>
            </div>
        </div>
    );
}

export default EditRightPanelForText;
