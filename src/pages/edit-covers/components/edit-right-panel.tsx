import React, { useState } from 'react';

import noImage from 'assets/images/edit-book/no-photo-blue.png';
import {
    BookEditorTextColors,
    openCloseEditor,
    valueText
} from 'utils/helpers';
import { Slider } from '@material-ui/core';
import { CirclePicker } from 'react-color';

interface IThisProps {
    status: boolean;
    changeStatus: any;
    currentBlock: any;
}

function EditRightPanel({ status, changeStatus, currentBlock }: IThisProps) {
    const [borderChanges, setBorderChanges] = useState<string>('#fff');
    const [backgroundChanges, setBackgroundChanges] = useState(false);
    const [backgroundUrl, setBackgroundUrl] = useState('');

    function editBorderColor(e: any) {
        const color = e.hex;
        currentBlock.current.style.border = `5px solid ${color}`;
        setBorderChanges(color);
    }

    function closeEditing() {
        if (borderChanges) {
            currentBlock.current.style.border = null;
        }
        if (backgroundChanges) {
            currentBlock.current.style.backgroundImage = backgroundUrl;
            currentBlock.current.style.backgroundRepeat = 'no-repeat';
            currentBlock.current.style.backgroundSize = '100%';
            currentBlock.current.style.backgroundPosition = 'center center';
        }
        changeStatus(false);
        openCloseEditor(false);
    }
    function deleteBackground() {
        setBackgroundUrl(currentBlock.current.style.backgroundImage);
        currentBlock.current.style.backgroundImage = `url(${noImage})`;
        currentBlock.current.style.backgroundRepeat = 'no-repeat';
        currentBlock.current.style.backgroundSize = '40px';
        currentBlock.current.style.backgroundPosition = 'center center';
        setBackgroundChanges(true);
    }

    function editImageZoom(e: any, val: any) {
        currentBlock.current.style.backgroundSize = `${val}%`;
    }

    function saveChangesImages() {
        changeStatus(false);
        openCloseEditor(false);
    }
    return (
        <div
            className="edit-right-panel pt-4"
            style={{ right: status ? '0' : '-350px' }}>
            <div className="slider-opacity">
                <div className="d-flex align-items-center justify-content-between">
                    <h4 className="text c-black">ZOOM IMAGE</h4>
                </div>
                <Slider
                    defaultValue={0}
                    getAriaValueText={valueText}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={1}
                    color="secondary"
                    marks={false}
                    min={100}
                    onChange={editImageZoom}
                    max={500}
                />
            </div>

            <div className="slider-opacity">
                <div className="d-flex align-items-center justify-content-between">
                    <h4 className="text c-black">BORDER COLOR</h4>
                </div>
                <div className="d-flex justify-content-center w-100 my-3">
                    <CirclePicker
                        onChange={editBorderColor}
                        color={borderChanges}
                        colors={BookEditorTextColors}
                        width="100%"
                    />
                </div>
            </div>
            <div>
                <button
                    className="btn btn-reset height-50"
                    onClick={deleteBackground}>
                    <i className="far fa-trash-alt c-red mr-2" />
                    Delete Photo
                </button>
            </div>
            <button
                className="btn btn-save w-100 right-block-toll-bar height-50 mt-2"
                onClick={saveChangesImages}>
                <i className="far fa-save mr-2" />
                Save
            </button>
            <button
                className="btn bgc-red c-white w-100 mt-2 height-50"
                onClick={closeEditing}>
                <i className="fas fa-times mr-2" />
                Close
            </button>
        </div>
    );
}

export default EditRightPanel;
