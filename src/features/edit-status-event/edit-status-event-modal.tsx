import React, { useState } from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
    setEventStatusEdit,
    setOpenCloseModalEventStatusEvent
} from 'redux/modals';
import { EditEvent } from 'api/all-apis';
import { eventStatus, history, setMessageUser } from 'utils/helpers';
import { DEF_URL } from 'utils/urls';
import { UM } from 'utils/user-messages';

function EditStatusEventModal() {
    const dispatch = useDispatch();

    const thisModal = useSelector(
        (state: AllModalSite) => state.AllModalSiteTwo.modalEditStatusEvent
    );

    const [loading, setLoading] = useState<boolean>(false);

    function SaveChanges() {
        setLoading(true);
        const data = {
            isAvailable: !thisModal.event.isAvailable
        };
        EditEvent(thisModal.event.id, data).then(function () {
            setLoading(false);
            dispatch(setMessageUser(UM.EVENT_STATUS_EDITED));
            closeModal();
            setTimeout(() => {
                history.push(
                    `${DEF_URL.EVENT}/${thisModal.event.id}/${
                        thisModal.event.isAvailable
                            ? eventStatus.private
                            : eventStatus.public
                    }`
                );
            }, 2000);
        });
    }

    function closeModal() {
        dispatch(setOpenCloseModalEventStatusEvent(false));
        dispatch(setEventStatusEdit({}));
    }

    return (
        <Modal
            show={thisModal.openClose}
            onHide={closeModal}
            centered={true}
            className="modal-bg-blur-effect">
            <Modal.Header closeButton>
                <Modal.Title>Change Event Status</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to make {'"'}
                <b>{thisModal.event.name}</b>
                {'"'} event{' '}
                <b>{thisModal.event.isAvailable ? 'Private' : 'Public'}</b>?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Close
                </Button>
                <Button variant="danger" onClick={SaveChanges}>
                    Change
                    {loading && <Spinner animation="border" variant="light" />}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditStatusEventModal;
