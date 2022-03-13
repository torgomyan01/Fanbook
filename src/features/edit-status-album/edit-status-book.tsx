import React, { useState } from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
    setAddModalEditStatusAlbum,
    setOpenModalEditStatusAlbum
} from 'redux/modals';
import { EditAlbum } from 'api/all-apis';
import { setMessageUser } from 'utils/helpers';
import { UM } from 'utils/user-messages';

function EditStatusAlbumModal() {
    const dispatch = useDispatch();

    const thisModal = useSelector(
        (state: AllModalSite) => state.AllModalSiteTwo.modalEditStatusAlbum
    );

    const [loading, setLoading] = useState<boolean>(false);

    function SaveChanges() {
        setLoading(true);
        const data = {
            isAvailable: !thisModal.album.isAvailable
        };

        EditAlbum(thisModal.album.id, data).then(() => {
            setLoading(false);
            dispatch(setMessageUser(UM.ALBUM_STATUS_EDITED));
            closeModal();
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        });
    }

    function closeModal() {
        dispatch(setAddModalEditStatusAlbum({}));
        dispatch(setOpenModalEditStatusAlbum(false));
    }

    return (
        <Modal
            show={thisModal.openClose}
            onHide={closeModal}
            centered={true}
            className="modal-bg-blur-effect">
            <Modal.Header closeButton>
                <Modal.Title>Change Album Status</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to make {'"'}
                <b>{thisModal.album.name}</b>
                {'"'} event{' '}
                <b>{thisModal.album.isAvailable ? 'Private' : 'Public'}</b>?
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

export default EditStatusAlbumModal;
