import React, { useState } from 'react';
import { Modal, Button, Alert, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { createAlbum } from 'api/all-apis';
import { DEF_URL } from 'utils/urls';
import { setOpenCreateModalAlbum } from 'redux/modals';
import { addErr, history, NAME_MIN_LENGTH, responseError } from 'utils/helpers';
import { TextField } from '@material-ui/core';

function ModalAddAlbum() {
    const dispatch = useDispatch();
    const [errorAlert, setErrorAlert] = useState('');
    const event = useSelector((state: IEvents) => state.events.currentEvent);

    const thisModal = useSelector(
        (state: AllModalSite) => state.AllModalSiteTwo.createAlbumModal
    );

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    function addAlbum(e: any) {
        e.preventDefault();
        if (name.length > NAME_MIN_LENGTH) {
            setLoading(true);
            createAlbum({
                userEventId: event.id,
                name,
                description,
                isAvailable: true
            })
                .then((res) => {
                    setLoading(false);
                    history.push(`${DEF_URL.ALBUM}/${res.data.data.item.id}`);
                })
                .catch((err: any) => {
                    setLoading(false);
                    dispatch(responseError(err));
                });
        } else {
            setErrorAlert(
                `Album title characters should not be less than ${NAME_MIN_LENGTH}`
            );
        }
    }

    function closeModal() {
        dispatch(setOpenCreateModalAlbum(false));
    }

    return (
        <Modal
            className="modal-to-setting modal-bg-blur-effect"
            show={thisModal}
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
                    <label htmlFor="inp-to-add-album-name" className="labels">
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
                    </label>

                    <label htmlFor="textarea-to-add-album" className="labels">
                        <TextField
                            label="Description"
                            className="w-100"
                            multiline={true}
                            rows={4}
                            onChange={(e) => {
                                setDescription(e.target.value);
                            }}
                        />
                    </label>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        type="submit"
                        variant="danger"
                        className="btn bgc-red">
                        Create Album
                        {loading && (
                            <Spinner animation="border" variant="light" />
                        )}
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}

export default ModalAddAlbum;
