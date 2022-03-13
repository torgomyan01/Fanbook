import React, { useState } from 'react';
import { BookEditorTextColors, valueText } from 'utils/helpers';
import { CirclePicker } from 'react-color';
import {
    Checkbox,
    FormControlLabel,
    Slider,
    TextField,
    Typography
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { useSelector } from 'react-redux';

interface IThisProps {
    text: string;
    TextChange: any;
    changeLineHeight: any;
    changeLetterSpacing: any;
    onChangeTextColor: any;
    OpenCloseBgFunction: any;
    changeFontFamily: any;
    changeFontSize: any;
    changeTextBgc: any;
    CloseEditor: any;
    SaveChanges: any;
}

function FrontTextEditor({
    text,
    TextChange,
    changeLineHeight,
    changeLetterSpacing,
    onChangeTextColor,
    OpenCloseBgFunction,
    changeFontFamily,
    changeFontSize,
    changeTextBgc,
    CloseEditor,
    SaveChanges
}: IThisProps) {
    const googleFonts = useSelector(
        (state: IGoogleFonts) => state.GoogleFonts.AllFonts
    );
    const [textColor, setTextColor] = useState<string>();

    function changeTextColor(e: any) {
        const val = e.hex;
        setTextColor(val);
        onChangeTextColor(val);
    }

    const [textBgc, setTextBgc] = useState<boolean>(false);
    function openCloseTextBgc() {
        const val = !textBgc;
        setTextBgc(val);
        OpenCloseBgFunction(val);
    }

    const [textBgColor, setTextBgColor] = useState('#000');
    function changeTextBgColor(e: any) {
        const val = e.hex;
        setTextBgColor(val);
        changeTextBgc(val);
    }

    return (
        <div className="book--cover-editor-block">
            <div className="book--cover-editor-block-body">
                <textarea
                    className="form-control"
                    onChange={TextChange}
                    defaultValue={text}
                />
                <div className="d-flex align-items-center justify-content-between">
                    <Autocomplete
                        className="mt-2 w-100"
                        options={googleFonts}
                        getOptionLabel={(option) => option.family}
                        onChange={changeFontFamily}
                        style={{ fontFamily: 'unset' }}
                        renderOption={(option) => (
                            <React.Fragment>
                                <span style={{ fontFamily: option.family }}>
                                    {option.family}
                                </span>
                            </React.Fragment>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                style={{ fontFamily: 'unset' }}
                                label="Select Font Family"
                                variant="standard"
                            />
                        )}
                    />
                </div>
                <Typography style={{ fontFamily: 'unset' }} className="mt-3">
                    Font Size
                </Typography>
                <Slider
                    defaultValue={20}
                    getAriaValueText={valueText}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={1}
                    color="secondary"
                    marks={false}
                    min={11}
                    onChange={changeFontSize}
                    max={70}
                />
                <Typography style={{ fontFamily: 'unset' }} className="mt-3">
                    Line Height
                </Typography>
                <Slider
                    defaultValue={0}
                    getAriaValueText={valueText}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={1}
                    color="secondary"
                    marks={false}
                    min={0}
                    onChange={changeLineHeight}
                    max={100}
                />
                <Typography style={{ fontFamily: 'unset' }} className="mt-2">
                    Letter Spacing
                </Typography>
                <Slider
                    defaultValue={0}
                    getAriaValueText={valueText}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={1}
                    color="secondary"
                    marks={false}
                    min={0}
                    onChange={changeLetterSpacing}
                    max={10}
                />
            </div>
            <Typography style={{ fontFamily: 'unset' }} className="mt-2">
                TEXT COLOR
            </Typography>
            <div className="d-flex justify-content-center w-100 my-3">
                <CirclePicker
                    onChange={changeTextColor}
                    color={textColor}
                    colors={BookEditorTextColors}
                    width="100%"
                />
            </div>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={textBgc}
                        onChange={openCloseTextBgc}
                        name="checkedB"
                        color="primary"
                    />
                }
                style={{ fontWeight: 'unset' }}
                label="TEXT BACKGROUND"
            />
            {textBgc && (
                <div className="d-flex justify-content-center w-100 my-3">
                    <CirclePicker
                        color={textBgColor}
                        colors={BookEditorTextColors}
                        width="100%"
                        onChange={changeTextBgColor}
                    />
                </div>
            )}

            <button
                className="btn w-100 btn-primary mt-2 height-50"
                onClick={SaveChanges}>
                <i className="fas fa-print mr-2" />
                Save
            </button>
            <button
                className="btn bgc-red c-white w-100 mt-2 height-50"
                onClick={CloseEditor}>
                <i className="fas fa-times mr-2" />
                Close
            </button>
        </div>
    );
}

export default FrontTextEditor;
