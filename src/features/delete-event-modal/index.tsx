import React, { useState } from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
    setAddIdDeleteEventModal,
    setOpenCloseModalDeleteEvent
} from 'redux/modals';
import { deleteEvent } from 'api/all-apis';
import { ALL_URL } from 'utils/urls';
import { history, setMessageUser } from 'utils/helpers';
import { UM } from 'utils/user-messages';

function DeleteEventModal() {
    const dispatch = useDispatch();
    const openClose = useSelector(
        (state: AllModalSite) =>
            state.AllModalSiteTwo.deleteEventModal.openClose
    );
    const Event = useSelector(
        (state: AllModalSite) => state.AllModalSiteTwo.deleteEventModal.event
    );

    function handleClose() {
        dispatch(setOpenCloseModalDeleteEvent(false));
        dispatch(setAddIdDeleteEventModal({}));
    }

    const [loading, setLoading] = useState(false);
    function startDeleteEvent() {
        if (Event.id) {
            setLoading(true);
            dispatch(setMessageUser(UM.P_W));
            deleteEvent(Event.id).then(() => {
                setLoading(false);
                dispatch(setMessageUser(UM.EVENT_DELETED));
                setTimeout(() => {
                    dispatch(setOpenCloseModalDeleteEvent(false));
                    dispatch(setAddIdDeleteEventModal({}));
                    history.push(ALL_URL.FP_EVENT_LIST);
                }, 2000);
            });
        } else {
            dispatch(setMessageUser(UM.TREE_AGAIN));
        }
    }

    return (
        <Modal
            show={openClose}
            onHide={handleClose}
            className="modal-bg-blur-effect">
            <Modal.Header closeButton />
            <Modal.Body>
                <p className="fs20 text-center">
                    Dear {Event?.user?.firstName} {Event?.user?.lastName}, do
                    you want to delete this <b>{Event?.name}</b> event ?
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button
                    variant="danger"
                    className="bgc-red"
                    onClick={startDeleteEvent}>
                    Yes Delete
                    {loading && <Spinner animation="border" variant="light" />}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DeleteEventModal;
