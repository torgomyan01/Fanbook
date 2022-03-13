import React, { useState } from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
    setAddBookToModalEditBookStatus,
    setOpenModalEditStatusBook
} from 'redux/modals';
import { EditBook } from 'api/all-apis';
import { setMessageUser } from 'utils/helpers';
import { UM } from 'utils/user-messages';

function EditStatusBookModal() {
    const dispatch = useDispatch();

    const thisModal = useSelector(
        (state: AllModalSite) => state.AllModalSiteTwo.modalEditStatusBook
    );

    const [loading, setLoading] = useState<boolean>(false);

    function SaveChanges() {
        setLoading(true);
        const data = {
            isAvailable: !thisModal.book.isAvailable
        };

        EditBook(thisModal.book.id, data).then(() => {
            setLoading(false);
            dispatch(setMessageUser(UM.BOOK_STATUS_EDITED));
            closeModal();
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        });
    }

    function closeModal() {
        dispatch(setOpenModalEditStatusBook(false));
        dispatch(setAddBookToModalEditBookStatus({}));
    }

    return (
        <Modal
            show={thisModal.openClose}
            onHide={closeModal}
            centered={true}
            className="modal-bg-blur-effect">
            <Modal.Header closeButton>
                <Modal.Title>Change Book Status</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to make {'"'}
                <b>{thisModal.book.name}</b>
                {'"'} event{' '}
                <b>{thisModal.book.isAvailable ? 'Private' : 'Public'}</b>?
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

export default EditStatusBookModal;
