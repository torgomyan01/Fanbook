import React, { useState } from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
    setModalEditPosterStatusOpenClose,
    setModalEditPosterStatusPoster
} from 'redux/modals';
import { UpdatePoster } from 'api/all-apis';
import { eventStatus, history, setMessageUser } from 'utils/helpers';
import { DEF_URL } from 'utils/urls';
import { UM } from 'utils/user-messages';

function EditStatusPoster() {
    const dispatch = useDispatch();

    const thisModal = useSelector(
        (state: AllModalSite) => state.AllModalSiteTwo.modalEditPosterStatus
    );

    const [loading, setLoading] = useState<boolean>(false);

    function SaveChanges() {
        setLoading(true);
        const data = {
            isAvailable: !thisModal.poster.isAvailable
        };
        UpdatePoster(thisModal.poster.id, data).then(function () {
            setLoading(false);
            dispatch(setMessageUser(UM.POSTER_EDITED));
            closeModal();
            setTimeout(() => {
                history.push(
                    `${DEF_URL.EVENT}/${thisModal.poster.userEventId}/${
                        thisModal.poster.isAvailable
                            ? eventStatus.private
                            : eventStatus.public
                    }`
                );
            }, 2000);
        });
    }

    function closeModal() {
        dispatch(setModalEditPosterStatusOpenClose(false));
        dispatch(setModalEditPosterStatusPoster({}));
    }

    return (
        <Modal
            show={thisModal.openClose}
            onHide={closeModal}
            centered={true}
            className="modal-bg-blur-effect">
            <Modal.Header closeButton>
                <Modal.Title>Change Poster Status</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to make {'"'}
                <b>{thisModal.poster.name}</b>
                {'"'} event{' '}
                <b>{thisModal.poster.isAvailable ? 'Private' : 'Public'}</b>?
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

export default EditStatusPoster;
