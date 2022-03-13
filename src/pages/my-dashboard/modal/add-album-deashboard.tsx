import React, { useEffect, useState } from 'react';
import { Modal, Button, Alert, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { createAlbum } from 'api/all-apis';
import { addErr, history, NAME_MIN_LENGTH } from 'utils/helpers';

import { DEF_URL } from 'utils/urls';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

interface propsAddAlbum {
    show: boolean;
    closeModal: any;
}

function ModalAddAlbumDashboard({ show, closeModal }: propsAddAlbum) {
    const [errorAlert, setErrorAlert] = useState('');

    const [myEvents, setMyEvents] = useState<IEvent[]>([]);
    const dashboardInfo = useSelector(
        (state: IMyDashboard) => state.MyDashboard.information
    );

    useEffect(() => {
        setMyEvents(dashboardInfo.events ? dashboardInfo.events : []);
    }, [dashboardInfo]);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [Event, setEvent] = useState<IEvent>();
    const [loading, setLoading] = useState(false);

    function addAlbum(e: any) {
        e.preventDefault();
        setLoading(true);
        if (name.length > NAME_MIN_LENGTH && Event) {
            createAlbum({
                userEventId: Event.id,
                name,
                description,
                isAvailable: true
            })
                .then((res) => {
                    setLoading(false);
                    history.push(`${DEF_URL.ALBUM}/${res.data.data.item.id}`);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            setErrorAlert('Please be sure to fill in the name of the album');
        }
    }

    function selectEventsName(e: any, value: any) {
        setEvent(value);
    }

    return (
        <Modal
            className="modal-to-setting modal-bg-blur-effect"
            show={show}
            onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Add Album</Modal.Title>
            </Modal.Header>
            <form action="" onSubmit={addAlbum}>
                <Modal.Body>
                    {errorAlert && (
                        <Alert variant="danger" className="position-relative">
                            {errorAlert}
                            <FontAwesomeIcon
                                icon={faTimes}
                                className="alert-error"
                                onClick={() => {
                                    setErrorAlert('');
                                }}
                            />
                        </Alert>
                    )}
                    <Autocomplete
                        options={myEvents}
                        getOptionLabel={(option) => option.name}
                        style={{ width: '100%' }}
                        onChange={selectEventsName}
                        renderInput={(params) => (
                            <TextField {...params} label="Select Event" />
                        )}
                    />
                    <div className="mt-3">
                        <TextField
                            label="Album Name"
                            className="w-100"
                            value={name}
                            required={true}
                            error={addErr(name)}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                    </div>
                    <div className="mb-4 mt-4">
                        <TextField
                            label="Album Description"
                            className="w-100"
                            multiline={true}
                            rows={4}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        type="submit"
                        variant="danger"
                        className="btn bgc-red">
                        Create Album
                        {loading ? (
                            <Spinner animation="border" variant="light" />
                        ) : (
                            ''
                        )}
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}

export default ModalAddAlbumDashboard;
