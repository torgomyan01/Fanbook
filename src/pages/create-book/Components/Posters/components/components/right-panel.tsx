import React, { Fragment, useCallback } from 'react';
import { Slider, Typography } from '@material-ui/core';
import { defaultPositionImageEditor } from '../editor-poster-page';
import { useDispatch, useSelector } from 'react-redux';
import { setMessageUser } from 'utils/helpers';
import { UM } from 'utils/user-messages';

interface IThsProps {
    textMode: boolean;
    onChangeTextMode: any;
    startEditTop: any;
    startEditLeft: any;
    startEditZoom: any;
    startEditRotate: any;
}

function valuetext(value: number) {
    return `${value}%`;
}

function EditorPosterPageRightPanel({
    textMode,
    onChangeTextMode,
    startEditTop,
    startEditLeft,
    startEditZoom,
    startEditRotate
}: IThsProps) {
    const dispatch = useDispatch();
    const imageURL = useSelector(
        (state: IPosters) => state.Posters.editorPage.imageURL
    );
    const rightPanelClassName = useCallback(() => {
        return textMode ? 'show-right-panel' : 'hide-right-panel';
    }, [textMode]);

    function changeInputToLeft(e: any, newValue: number | number[]) {
        if (imageURL) {
            startEditLeft(newValue);
        } else {
            dispatch(setMessageUser(UM.SELECT_IMAGES));
        }
    }

    function changeInputToTop(e: any, newValue: number | number[]) {
        if (imageURL) {
            startEditTop(newValue);
        } else {
            dispatch(setMessageUser(UM.SELECT_IMAGES));
        }
    }
    function changeInputToZoom(e: any, newValue: number | number[]) {
        if (imageURL) {
            startEditZoom(newValue);
        } else {
            dispatch(setMessageUser(UM.SELECT_IMAGES));
        }
    }
    function changeInputToRotate(e: any, newValue: number | number[]) {
        if (imageURL) {
            startEditRotate(newValue);
        } else {
            dispatch(setMessageUser(UM.SELECT_IMAGES));
        }
    }
    return (
        <Fragment>
            <div className={`edit-right-panel ${rightPanelClassName()}`}>
                <div className="h-100">
                    <div className="d-flex justify-content-between flex-column h-100 pt-5">
                        <div>
                            <div className="text-center">
                                <div
                                    onClick={() => {
                                        onChangeTextMode(false);
                                    }}
                                    className="text-mode-btn"
                                    id="exitTextModeRight">
                                    <span className="cursor-pointer d-flex justify-content-end align-items-center">
                                        <span className="mr-1 btn-text">
                                            EXIT
                                        </span>
                                        <i className="far fa-times-circle exit-icon" />
                                    </span>
                                </div>
                            </div>
                            <div>
                                {/*<p className="txt-caption">CAPTION</p>*/}
                                {/*<div className="text-mode-tools">*/}
                                {/*    <div className="form-group">*/}
                                {/*        <label*/}
                                {/*            htmlFor="captionFont"*/}
                                {/*            className="label">*/}
                                {/*            Font*/}
                                {/*        </label>*/}
                                {/*    </div>*/}
                                {/*</div>*/}

                                <div className="mt-3">
                                    <Typography
                                        id="discrete-slider"
                                        gutterBottom>
                                        Left
                                    </Typography>
                                    <Slider
                                        defaultValue={
                                            defaultPositionImageEditor.left
                                        }
                                        getAriaValueText={valuetext}
                                        aria-labelledby="discrete-slider"
                                        valueLabelDisplay="auto"
                                        step={1}
                                        onChange={changeInputToLeft}
                                        marks={false}
                                        min={-50}
                                        max={50}
                                    />
                                </div>

                                <div className="mt-3">
                                    <Typography
                                        id="discrete-slider"
                                        gutterBottom>
                                        Top
                                    </Typography>
                                    <Slider
                                        defaultValue={
                                            defaultPositionImageEditor.top
                                        }
                                        getAriaValueText={valuetext}
                                        aria-labelledby="discrete-slider"
                                        valueLabelDisplay="auto"
                                        step={1}
                                        marks={false}
                                        onChange={changeInputToTop}
                                        min={-50}
                                        max={50}
                                    />
                                </div>

                                <div className="mt-3">
                                    <Typography
                                        id="discrete-slider"
                                        gutterBottom>
                                        Zoom
                                    </Typography>
                                    <Slider
                                        defaultValue={
                                            defaultPositionImageEditor.zoom
                                        }
                                        getAriaValueText={valuetext}
                                        aria-labelledby="discrete-slider"
                                        valueLabelDisplay="auto"
                                        step={1}
                                        marks={false}
                                        onChange={changeInputToZoom}
                                        min={0}
                                        max={200}
                                    />
                                </div>

                                <div className="mt-3">
                                    <Typography
                                        id="discrete-slider"
                                        gutterBottom>
                                        Rotate
                                    </Typography>
                                    <Slider
                                        defaultValue={0}
                                        getAriaValueText={valuetext}
                                        aria-labelledby="discrete-slider"
                                        valueLabelDisplay="auto"
                                        step={90}
                                        onChange={changeInputToRotate}
                                        marks
                                        min={0}
                                        max={360}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default EditorPosterPageRightPanel;
