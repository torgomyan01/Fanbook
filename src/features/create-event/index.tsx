import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Modal, Row, Spinner } from 'react-bootstrap';
import settingImg from 'pages/event-detail/images/stting-img.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowDown,
    faPause,
    faPlay,
    faSearch,
    faUpload
} from '@fortawesome/free-solid-svg-icons';
import { GOOGLE_API_KEY_MAP, googleMapView } from 'utils/google';
import {
    createEvent,
    startUploadingVideoAmazon,
    uploadVideoEvent
} from 'api/all-apis';
import { useDispatch } from 'react-redux';
import useGoogle from 'react-google-autocomplete/lib/usePlacesAutocompleteService';

import { DEF_URL } from 'utils/urls';
import {
    eventStatus,
    history,
    keyGenerator,
    setMessageUser
} from 'utils/helpers';
import moment from 'moment';
import { TextField } from '@material-ui/core';
import { KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers';
import { UM } from 'utils/user-messages';

interface EventsProps {
    openModal: boolean;
    closeModal: any;
}

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
export const minWidthImage = 1800;

function CreateEventModal({ openModal, closeModal }: EventsProps) {
    const dispatch = useDispatch();
    const [eventName, setEventName] = useState('');
    const [EventAbout, setEventAbout] = useState('');
    const [EventChecked, setEventChecked] = useState(true);
    const [EventLocation, setEventLocation] = useState('Armenia');
    const [lodaingCreate, setLodaingCreate] = useState(false);

    const [EventDateTimeFrom, setEventDateTimeFrom] = useState(new Date());
    const [EventDateTimeTo, setEventDateTimeTo] = useState(new Date());

    const [loc, setLoc] = useState('');
    const [PlaceID, setPlaceID] = useState<string>('');

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
        viewFile();
    }, [file]);

    function viewFile() {
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
                dispatch(setMessageUser(UM.PL_CH_V_PH));
            }
        } else {
            setCoverImageToUpLoaded('');
        }
    }

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

    const uploadedVideoRef = useRef<any>(null);
    const [playStop, setplayStop] = useState<boolean>(true);

    function playStopVideo() {
        if (playStop) {
            uploadedVideoRef.current?.play();
            setplayStop(false);
        } else if (!playStop) {
            uploadedVideoRef.current?.pause();
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
        dispatch(setMessageUser(UM.P_W));
        if (
            eventName !== '' &&
            EventDateTimeFrom &&
            EventDateTimeTo &&
            EventAbout !== '' &&
            EventLocation !== '' &&
            file
        ) {
            setLodaingCreate(true);
            const dataFrom = moment(EventDateTimeFrom).utc().format();

            const dataTo = moment(EventDateTimeTo).utc().format();

            if (EventAbout.length < minLengthDescription) {
                dispatch(
                    setMessageUser(UM.EVENT_DESC_LIMIT(minLengthDescription))
                );
                setLodaingCreate(false);
                return;
            }
            if (file.type.includes(defImgVideo.video)) {
                const data = {
                    name: eventName,
                    description: EventAbout,
                    cover: '',
                    isAvailable: false,
                    isFeatured: false,
                    allowUserUpload: EventChecked,
                    dateFrom: dataFrom,
                    dateTo: dataTo,
                    embeddedVideoURL: '',
                    geolocation: EventLocation
                };

                createEvent(data)
                    .then(function (response: any) {
                        uploadVideoEvent(response.data.data.item.id, file.name)
                            .then(function (res: any) {
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
                        console.log('error user profile ->', error);
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
                        isAvailable: false,
                        isFeatured: false,
                        allowUserUpload: EventChecked,
                        dateFrom: dataFrom,
                        dateTo: dataTo,
                        embeddedVideoURL: '',
                        geolocation: EventLocation
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
                            createEvent(data)
                                .then(function (response: any) {
                                    history.push(
                                        `${DEF_URL.EVENT}/${response.data.data.item.id}/${eventStatus.private}`
                                    );
                                    closeModal();
                                })
                                .catch(function (error) {
                                    console.log('error user profile ->', error);
                                });
                        }
                    };
                    image.src = result;
                };
                reader.readAsDataURL(file);
            }
        } else {
            dispatch(setMessageUser(UM.FILL_ALL));
        }
    }
    const { placePredictions, getPlacePredictions, isPlacePredictionsLoading } =
        useGoogle({
            apiKey: GOOGLE_API_KEY_MAP
        });

    useEffect(() => {
        setLoc(googleMapView(PlaceID) as any);
    }, [EventLocation]);

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

    function setValueInputMap(e: any) {
        const description = e.target.getAttribute('data-description');
        const placeId = e.target.getAttribute('data-place-id');
        setEventLocation(description);
        setPlaceID(placeId);
        getPlacePredictions({
            input: ''
        });
    }

    const eventAboutLength =
        (EventAbout?.length > 0 && EventAbout?.length < minLengthDescription) ||
        EventAbout?.length > maxLengthDescription;
    return (
        <>
            <Modal
                className="modal-to-setting modal-bg-blur-effect"
                size="lg"
                show={openModal}
                onHide={closeModal}>
                <Modal.Header className="border-bottom" closeButton>
                    <Modal.Title>Create Event</Modal.Title>
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
                                    <KeyboardDatePicker
                                        format="MM/dd/yyyy"
                                        margin="normal"
                                        style={{ width: 160 }}
                                        id="date-to-sett-modal"
                                        label="Start Date"
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
                                        onChange={(e: any) => {
                                            setEventDateTimeFrom(e);
                                            console.log(e);
                                        }}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change time'
                                        }}
                                    />
                                </div>

                                <div className="d-flex justify-content-between">
                                    <KeyboardDatePicker
                                        format="MM/dd/yyyy"
                                        margin="normal"
                                        style={{ width: 160 }}
                                        id="date-to-sett-modal"
                                        label="End Date"
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
                                </div>

                                <label
                                    htmlFor="text-to-sett-modal"
                                    className="labels mt-0">
                                    {EventAbout?.length > 0 && (
                                        <p
                                            className={`title-inputs text-right mb-0 ${
                                                eventAboutLength
                                                    ? 'c-red'
                                                    : 'c-green'
                                            }`}>
                                            {EventAbout?.length}/
                                            {maxLengthDescription}
                                        </p>
                                    )}
                                </label>
                                <TextField
                                    multiline
                                    rows={6}
                                    aria-valuemax={3}
                                    className="w-100"
                                    label="About This Event"
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
                                    {uploadedType === defImgVideo.image && (
                                        <div
                                            className="img-setting-modal mt-1"
                                            style={{
                                                backgroundImage:
                                                    coverImageToUpLoaded !== ''
                                                        ? coverImageToUpLoaded
                                                        : `url(${settingImg})`,
                                                backgroundPosition: bgPosition
                                            }}>
                                            {fileUp && (
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
                                            )}
                                        </div>
                                    )}
                                    {uploadedType === defImgVideo.video && (
                                        <div className="img-setting-modal d-flex justify-content-center align-items-center mt-1">
                                            <video
                                                ref={uploadedVideoRef}
                                                width={'100%'}>
                                                <source
                                                    src={videoSrc.name}
                                                    type={videoSrc.type}
                                                />
                                            </video>
                                            <div className="icons-top-and-down">
                                                {playStop ? (
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
                                            style={{ border: 0 }}
                                            loading="lazy"
                                            allowFullScreen
                                            src={loc}
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
                            Create Event
                            {lodaingCreate && (
                                <Spinner animation="border" variant="light" />
                            )}
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}

export default CreateEventModal;
