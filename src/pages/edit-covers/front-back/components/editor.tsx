import React, { useState } from 'react';
import {
    Checkbox,
    FormControlLabel,
    Slider,
    Typography
} from '@material-ui/core';
import { CirclePicker } from 'react-color';
import { valueText } from 'utils/helpers';

interface IThisProps {
    closeModal: any;
    thisEditor: boolean;
    ChangeLeftPosition: any;
    ChangeTopPosition: any;
    ChangeZoomPosition: any;
    saveEditing: any;
    deletePhoto: any;
    EditBackground: any;
    openCloseBackground: any;
    getBg: boolean;
}

function CoverEditor({
    closeModal,
    thisEditor,
    ChangeLeftPosition,
    ChangeTopPosition,
    ChangeZoomPosition,
    saveEditing,
    deletePhoto,
    EditBackground,
    openCloseBackground,
    getBg
}: IThisProps) {
    const [bgcColor, setBgcColor] = useState('#e91e63');
    function backgroundChange(e: any) {
        setBgcColor(e.hex);
        EditBackground(e.hex);
    }

    const [bgcOpenClose, setBgcOpenClose] = useState<boolean>(false);
    function openBg() {
        const val = !bgcOpenClose;
        setBgcOpenClose(val);
        openCloseBackground(val);
    }

    return (
        <div
            className="book--cover-editor-block"
            style={{
                right: thisEditor ? 0 : -350
            }}>
            <div className="close-modal">
                <i className="fas fa-times" onClick={saveEditing} />
            </div>
            <div className="book--cover-editor-block-body">
                <Typography style={{ fontFamily: 'unset' }} gutterBottom>
                    Left
                </Typography>
                <Slider
                    defaultValue={50}
                    getAriaValueText={valueText}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={1}
                    color="secondary"
                    marks={false}
                    min={0}
                    disabled={bgcOpenClose || getBg}
                    onChange={ChangeLeftPosition}
                    max={100}
                />
                <Typography style={{ fontFamily: 'unset' }} gutterBottom>
                    Top
                </Typography>
                <Slider
                    defaultValue={50}
                    getAriaValueText={valueText}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={1}
                    marks={false}
                    onChange={ChangeTopPosition}
                    color="secondary"
                    min={0}
                    disabled={bgcOpenClose || getBg}
                    max={100}
                />
                <Typography style={{ fontFamily: 'unset' }} gutterBottom>
                    Zoom
                </Typography>
                <Slider
                    defaultValue={50}
                    getAriaValueText={valueText}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={1}
                    color="secondary"
                    marks={false}
                    min={100}
                    onChange={ChangeZoomPosition}
                    disabled={bgcOpenClose || getBg}
                    max={500}
                />
            </div>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={bgcOpenClose}
                        onChange={openBg}
                        name="checkedB"
                        color="primary"
                    />
                }
                style={{ fontWeight: 'unset' }}
                label="Background"
            />
            {bgcOpenClose && (
                <div className="d-flex justify-content-center w-100 my-3">
                    <CirclePicker
                        onChange={backgroundChange}
                        color={bgcColor}
                        width="100%"
                    />
                </div>
            )}

            {!bgcOpenClose && (
                <button
                    className="btn btn-reset mt-2 height-50"
                    onClick={deletePhoto}>
                    <i className="far fa-trash-alt c-red mr-2" />
                    Delete Photo
                </button>
            )}

            <button
                className="btn w-100 btn-primary mt-2 height-50"
                onClick={saveEditing}>
                <i className="fas fa-print mr-2" />
                Save
            </button>
            <button
                className="btn bgc-red c-white w-100 mt-2 height-50"
                onClick={closeModal}>
                Close
            </button>
        </div>
    );
}

export default CoverEditor;
