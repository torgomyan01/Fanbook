import React, { useEffect, useState } from 'react';
import { Button, Col, Modal, Row, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import settingImg from '../images/stting-img.png';
import {
    faArrowDown,
    faPause,
    faPlay,
    faSearch,
    faUpload
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import ReactPlayer from 'react-player';
import {
    EditEvent,
    startUploadingVideoAmazon,
    uploadVideoEvent
} from 'api/all-apis';

import useGoogle from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
import { GOOGLE_API_KEY_MAP, googleMapView } from 'utils/google';
import { keyGenerator, setMessageUser } from 'utils/helpers';
import { setOpenModalEventEdit } from 'redux/modals';
import { minWidthImage } from 'features/create-event';
import { KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { TextField } from '@material-ui/core';
import { UM } from 'utils/user-messages';

const defImgVideo = {
    image: 'image',
    video: 'video'
};

const positionCover = {
    top: 50,
    left: 50
};
const maxLengthDescription = 1000;
const minLengthDescription = 100;

function ModalSetting() {
    const dispatch = useDispatch();
    const event = useSelector((state: IEvents) => state.events.currentEvent);

    const openCloseModal = useSelector(
        (state: AllModalSite) => state.AllModalSiteTwo.editEventModal
    );

    const [eventName, setEventName] = useState('');

    const [EventDateTimeFrom, setEventDateTimeFrom] = useState('');
    const [EventDateTimeTo, setEventDateTimeTo] = useState('');

    const [EventAbout, setEventAbout] = useState('');
    const [EventChecked, setEventChecked] = useState(false);
    const [EventLocation, setEventLocation] = useState('Armenia');
    const [lodaingCreate, setLodaingCreate] = useState(false);

    const [loc, setLoc] = useState('');
    const [PlaceID, setPlaceID] = useState<string>('');
    useEffect(() => {
        setLoc(googleMapView(PlaceID) as any);
    }, [EventLocation]);

    const [coverImageToUpLoaded, setCoverImageToUpLoaded] = useState('');
    const [uploadedType, setUploadedType] = useState(defImgVideo.image);
    const [fileUp, setFile] = useState<any>();
    const [bgPosition, setBgPosition] = useState(
        `${positionCover.left}% ${positionCover.top}%`
    );
    const [videoSrc, setVideoSrc] = useState<any>({
        name: '',
        type: ''
    });

    const [file, setFiles] = useState<any>();

    useEffect(() => {
        setEventName(event?.name);

        setEventDateTimeFrom(event?.dateFrom);
        setEventDateTimeTo(event?.dateTo);

        setEventAbout(event?.description);
        setEventChecked(event?.isEditable);
        setEventLocation(
            `${event?.geolocation?.country} ${
                event?.geolocation?.city ? `,${event?.geolocation?.city}` : ''
            }`
        );
        setUploadedType(
            event?.coverURL ? defImgVideo.image : defImgVideo.video
        );

        if (event?.coverURL) {
            setCoverImageToUpLoaded(event?.coverURL);
        } else {
            setVideoSrc({
                name: event?.videoURL,
                type: 'video/mp4'
            });
        }
    }, [event]);

    useEffect(() => {
        if (file) {
            setplayStop(true);
            setFile(file);
            const fileInfo = {
                size: file.size / 1024 / 1024,
                type: file.type
            };
            if (fileInfo.type.includes(defImgVideo.image)) {
                setUploadedType(defImgVideo.image);
                const reader = new FileReader();
                reader.onload = (evt: any) => {
                    const result = btoa(evt.target?.result);
                    setCoverImageToUpLoaded(
                        `url('data:${fileInfo.type};base64,${result}')`
                    );
                };
                reader.readAsBinaryString(file);
            } else if (fileInfo.type.includes(defImgVideo.video)) {
                setVideoSrc({
                    name: URL.createObjectURL(file),
                    type: file.type
                });
                setUploadedType(defImgVideo.video);
            } else {
                alert('Video AND Photo');
            }
        } else {
            setCoverImageToUpLoaded('');
        }
    }, [file]);

    const UpLoadCover = function (e: any) {
        setFiles(e.target.files[0]);
    };

    function positionTop() {
        positionCover.top = positionCover.top - 5;
        setBgPosition(`${positionCover.left}% ${positionCover.top}%`);
    }

    function positionBottom() {
        positionCover.top = positionCover.top + 5;
        setBgPosition(`${positionCover.left}% ${positionCover.top}%`);
    }

    const [playStop, setplayStop] = useState<boolean>(false);

    function playStopVideo() {
        if (playStop) {
            setplayStop(false);
        } else if (!playStop) {
            setplayStop(true);
        }
    }

    function deleteFile() {
        setFiles('');
        setFile('');
        setUploadedType(defImgVideo.image);
        setplayStop(true);
        setCoverImageToUpLoaded('');
    }

    function createEventF(e: any) {
        e.preventDefault();
        if (
            eventName !== '' &&
            EventDateTimeFrom &&
            EventDateTimeTo &&
            EventAbout !== '' &&
            EventLocation !== ''
        ) {
            setLodaingCreate(true);

            if (EventAbout.length < minLengthDescription) {
                dispatch(
                    setMessageUser(UM.EVENT_DESC_LIMIT(minLengthDescription))
                );
                setLodaingCreate(false);
                return;
            }

            const dataFrom = moment(EventDateTimeFrom).utc().format();

            const dataTo = moment(EventDateTimeTo).utc().format();
            if (file) {
                if (file.type.includes(defImgVideo.video)) {
                    dispatch(setMessageUser(UM.WAIT_VIDEO_UPLOAD));
                    const data = {
                        name: eventName,
                        description: EventAbout,
                        cover: null,
                        isFeatured: false,
                        allowUserUpload: EventChecked,
                        dateFrom: dataFrom,
                        dateTo: dataTo,
                        embeddedVideoURL: '',
                        geolocation: EventLocation
                    };
                    EditEvent(event.id, data)
                        .then(function () {
                            // video upload
                            uploadVideoEvent(event.id, file.name)
                                .then(function (res: any) {
                                    console.log(res);

                                    const formData = new FormData();
                                    Object.keys(res.data.data.fields).forEach(
                                        (key) => {
                                            formData.append(
                                                key,
                                                res.data.data.fields[key]
                                            );
                                        }
                                    );
                                    // Actual file has to be appended last.
                                    formData.append('file', file);

                                    dispatch(
                                        startUploadingVideoAmazon(
                                            res.data.data.url,
                                            formData
                                        )
                                    );
                                })
                                .catch((err) => {
                                    console.log(err);
                                });
                        })
                        .catch(function (error) {
                            console.log(error);
                            setLodaingCreate(false);
                        });
                }

                if (file.type.includes(defImgVideo.image)) {
                    const reader = new FileReader();
                    reader.onload = (evt: any) => {
                        const result = evt.target?.result;
                        const data = {
                            name: eventName,
                            description: EventAbout,
                            cover: result,
                            isFeatured: false,
                            allowUserUpload: EventChecked,
                            dateFrom: dataFrom,
                            dateTo: dataTo,
                            embeddedVideoURL: null,
                            geolocation: EventLocation,
                            video: null,
                            videoURL: null
                        };

                        const image = new Image();
                        image.onload = function () {
                            if (image.width < minWidthImage) {
                                dispatch(
                                    setMessageUser(
                                        UM.MIN_LENGTH_IMAGES(minWidthImage)
                                    )
                                );
                                setLodaingCreate(false);
                            } else {
                                EditEvent(event.id, data)
                                    .then(function () {
                                        dispatch(
                                            setMessageUser(UM.EVENT_EDITED)
                                        );
                                        setLodaingCreate(false);
                                        window.location.reload();
                                    })
                                    .catch(function (error) {
                                        console.log(error);
                                        setLodaingCreate(false);
                                    });
                            }
                        };
                        image.src = result;
                    };
                    reader.readAsDataURL(file);
                }
            } else {
                const data = {
                    name: eventName,
                    description: EventAbout,
                    isFeatured: false,
                    allowUserUpload: EventChecked,
                    dateFrom: dataFrom,
                    dateTo: dataTo,
                    embeddedVideoURL: '',
                    geolocation: EventLocation
                };
                EditEvent(event.id, data)
                    .then(function () {
                        dispatch(setMessageUser(UM.EVENT_EDITED));
                        setLodaingCreate(false);
                        window.location.reload();
                    })
                    .catch(function (error) {
                        console.log(error);
                        setLodaingCreate(false);
                    });
            }
        } else {
            dispatch(setMessageUser(UM.IMAGE_OR_VIDEO));
        }
    }

    function bgEvent() {
        return coverImageToUpLoaded !== ''
            ? coverImageToUpLoaded.includes('base64')
                ? coverImageToUpLoaded
                : `url(${coverImageToUpLoaded})`
            : `url(${settingImg})`;
    }
    const { placePredictions, getPlacePredictions, isPlacePredictionsLoading } =
        useGoogle({
            apiKey: GOOGLE_API_KEY_MAP
        });

    function setValueInputMap(e: any) {
        const description = e.target.getAttribute('data-description');
        const placeId = e.target.getAttribute('data-place-id');
        setEventLocation(description);
        setPlaceID(placeId);
        getPlacePredictions({
            input: ''
        });
    }
    window.onclick = function (e: any) {
        const classStatus = e.path.some(
            (path: any) => path.className === 'view-result-searching'
        );
        if (!classStatus) {
            getPlacePredictions({
                input: ''
            });
        }
    };

    function closeModal() {
        dispatch(setOpenModalEventEdit(false));
    }

    const eventAboutLength =
        EventAbout?.length < minLengthDescription ||
        EventAbout?.length > maxLengthDescription;

    return (
        <>
            <Modal
                className="modal-to-setting modal-bg-blur-effect"
                size="lg"
                show={openCloseModal}
                onHide={closeModal}>
                <Modal.Header className="border-bottom" closeButton>
                    <Modal.Title>Edit Event</Modal.Title>
                </Modal.Header>
                <form action="#" onSubmit={createEventF}>
                    <Modal.Body>
                        <Row>
                            <Col>
                                <label
                                    htmlFor="email-to-sett-modal"
                                    className="labels">
                                    <TextField
                                        id="standard-basic"
                                        className="w-100"
                                        label="Event Name"
                                        value={eventName}
                                        onChange={(e) => {
                                            setEventName(e.target.value);
                                        }}
                                    />
                                </label>

                                <div className="d-flex justify-content-between">
                                    <MuiPickersUtilsProvider
                                        utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            format="MM/dd/yyyy"
                                            margin="normal"
                                            style={{ width: 160 }}
                                            id="date-to-sett-modal"
                                            label="Start Event Date"
                                            value={EventDateTimeFrom}
                                            onChange={(e: any) =>
                                                setEventDateTimeFrom(e)
                                            }
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date'
                                            }}
                                        />

                                        <KeyboardTimePicker
                                            margin="normal"
                                            id="date-to-sett-modal"
                                            label="Time To Start"
                                            style={{ width: 160 }}
                                            value={EventDateTimeFrom}
                                            onChange={(e: any) =>
                                                setEventDateTimeFrom(e)
                                            }
                                            KeyboardButtonProps={{
                                                'aria-label': 'change time'
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                </div>

                                <div className="d-flex justify-content-between">
                                    <MuiPickersUtilsProvider
                                        utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            format="MM/dd/yyyy"
                                            margin="normal"
                                            style={{ width: 160 }}
                                            id="date-to-sett-modal"
                                            label="Start Event Date"
                                            value={EventDateTimeTo}
                                            onChange={(e: any) =>
                                                setEventDateTimeTo(e)
                                            }
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date'
                                            }}
                                        />

                                        <KeyboardTimePicker
                                            margin="normal"
                                            id="ate-to-sett-modal"
                                            label="Time To End"
                                            style={{ width: 160 }}
                                            value={EventDateTimeTo}
                                            onChange={(e: any) =>
                                                setEventDateTimeTo(e)
                                            }
                                            KeyboardButtonProps={{
                                                'aria-label': 'change time'
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                </div>

                                <label
                                    htmlFor="text-to-sett-modal"
                                    className="labels mt-0">
                                    <p
                                        className={`title-inputs text-right mb-0 ${
                                            eventAboutLength
                                                ? 'c-red'
                                                : 'c-green'
                                        }`}>
                                        {EventAbout?.length}/
                                        {maxLengthDescription}
                                    </p>
                                </label>
                                <TextField
                                    multiline
                                    rows={6}
                                    aria-valuemax={3}
                                    className="w-100"
                                    label="About this Events"
                                    value={EventAbout}
                                    error={eventAboutLength}
                                    onChange={(e) => {
                                        setEventAbout(e.target.value);
                                    }}
                                />
                                <label
                                    htmlFor="checkbox-to-sett-modal"
                                    className="labels d-flex justify-content-start align-items-center mt-3">
                                    <input
                                        type="checkbox"
                                        id="checkbox-to-sett-modal"
                                        checked={EventChecked}
                                        onChange={() => {
                                            setEventChecked(!EventChecked);
                                        }}
                                    />
                                    Allow User{"'"}s Uploaded Photos.
                                </label>
                            </Col>
                            <Col>
                                <div className="labels">
                                    <p className="title-inputs mb-0">
                                        Cover Photo / Video
                                    </p>
                                    {uploadedType === defImgVideo.image ? (
                                        <div
                                            className="img-setting-modal mt-1"
                                            style={{
                                                backgroundImage: bgEvent(),
                                                backgroundPosition: bgPosition
                                            }}>
                                            {fileUp ? (
                                                <div className="icons-top-and-down">
                                                    <FontAwesomeIcon
                                                        icon={faArrowDown}
                                                        style={{
                                                            transform:
                                                                'rotate(180deg)'
                                                        }}
                                                        onClick={positionTop}
                                                    />
                                                    <FontAwesomeIcon
                                                        icon={faArrowDown}
                                                        className="mt-2"
                                                        onClick={positionBottom}
                                                    />
                                                </div>
                                            ) : (
                                                ''
                                            )}
                                        </div>
                                    ) : (
                                        ''
                                    )}
                                    {uploadedType === defImgVideo.video ? (
                                        <div className="img-setting-modal d-flex justify-content-center align-items-center mt-1">
                                            <ReactPlayer
                                                url={videoSrc.name}
                                                width="100%"
                                                playing={playStop}
                                            />
                                            <div className="icons-top-and-down">
                                                {!playStop ? (
                                                    <FontAwesomeIcon
                                                        icon={faPlay}
                                                        onClick={playStopVideo}
                                                    />
                                                ) : (
                                                    <FontAwesomeIcon
                                                        icon={faPause}
                                                        className="mt-2"
                                                        onClick={playStopVideo}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        ''
                                    )}
                                    <div className="d-flex justify-content-end align-items-center mt-2">
                                        {fileUp ? (
                                            <>
                                                <label
                                                    htmlFor="upload-cover-to-add-event"
                                                    className="btn bgc-red c-white mr-3 pl-4 pr-4 mt-2">
                                                    <input
                                                        type="file"
                                                        multiple
                                                        accept="image/*"
                                                        style={{
                                                            display: 'none'
                                                        }}
                                                        onChange={UpLoadCover}
                                                        id="upload-cover-to-add-event"
                                                    />
                                                    Change
                                                </label>
                                                <button
                                                    type="button"
                                                    onClick={deleteFile}
                                                    className="btn border-red c-red  pl-4 pr-4">
                                                    Delete
                                                </button>
                                            </>
                                        ) : (
                                            <label
                                                htmlFor="upload-cover-to-add-event"
                                                className="btn bgc-red c-white mr-3 pl-4 pr-4">
                                                <FontAwesomeIcon
                                                    icon={faUpload}
                                                    className="mr-2"
                                                />
                                                Upload Cover
                                                <input
                                                    type="file"
                                                    multiple
                                                    accept="image/*, video/mp4"
                                                    style={{ display: 'none' }}
                                                    onChange={UpLoadCover}
                                                    id="upload-cover-to-add-event"
                                                />
                                            </label>
                                        )}
                                    </div>
                                </div>
                                <label className="labels">
                                    <TextField
                                        className="w-100"
                                        label="Location"
                                        value={EventLocation}
                                        onChange={(e) => {
                                            setEventLocation(e.target.value);
                                            getPlacePredictions({
                                                input: e.target.value
                                            });
                                        }}
                                    />

                                    {isPlacePredictionsLoading ? (
                                        <Spinner
                                            animation="border"
                                            variant="secondary"
                                            className="fa-search"
                                        />
                                    ) : (
                                        <FontAwesomeIcon icon={faSearch} />
                                    )}
                                </label>
                                {placePredictions.length > 0 && (
                                    <div className="position-relative">
                                        <div className="view-result-searching">
                                            {placePredictions?.map(
                                                (res: any) => {
                                                    return (
                                                        <div
                                                            onClick={
                                                                setValueInputMap
                                                            }
                                                            data-description={
                                                                res.description
                                                            }
                                                            data-place-id={
                                                                res.place_id
                                                            }
                                                            key={keyGenerator(
                                                                30
                                                            )}
                                                            className="results-item">
                                                            <i className="fas fa-map-marker-alt mr-2 c-red" />
                                                            {res.description}
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>
                                    </div>
                                )}
                                <label className="labels">
                                    <p className="title-inputs mb-1">
                                        Map Preview
                                    </p>
                                    <div className="img-setting-modal">
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src={loc}
                                            frameBorder="0"
                                            scrolling="no"
                                            loading="lazy"
                                        />
                                    </div>
                                </label>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="outline"
                            type="submit"
                            className="bgc-red c-white">
                            Save Changes
                            {lodaingCreate ? (
                                <Spinner animation="border" variant="light" />
                            ) : (
                                ''
                            )}
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}

export default ModalSetting;
