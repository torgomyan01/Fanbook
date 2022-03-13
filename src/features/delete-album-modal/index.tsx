import React, { useState } from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
    setAddAlbumFormDeleteModal,
    setOpenCloseModalDeleteAlbum
} from 'redux/modals';
import { DeleteAlbum } from 'api/all-apis';
import { setMessageUser } from 'utils/helpers';
import { UM } from 'utils/user-messages';

function DeleteAlbumModal() {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: IAuth) => state.sign.user.profile);
    const openClose = useSelector(
        (state: AllModalSite) =>
            state.AllModalSiteTwo.deleteAlbumModal.openClose
    );
    const Album = useSelector(
        (state: AllModalSite) => state.AllModalSiteTwo.deleteAlbumModal.album
    );

    function handleClose() {
        dispatch(setOpenCloseModalDeleteAlbum(false));
        dispatch(setAddAlbumFormDeleteModal({}));
    }

    const [loading, setLoading] = useState(false);
    function startDeleteAlbum() {
        if (Album.id) {
            setLoading(true);
            dispatch(setMessageUser(UM.P_W));
            DeleteAlbum(Album.id).then(() => {
                setLoading(false);
                dispatch(setMessageUser(UM.ALBUM_DELETED));
                setTimeout(() => {
                    window.location.reload();
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
                    Dear {userInfo?.firstName} {userInfo?.lastName}, do you want
                    to delete this <b>{Album.name}</b> album ?
                </p>
                <p className="fs20 text-center">
                    It will last for another 48 hours, during which you can
                    restore it. Do you want to delete it?
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button
                    variant="danger"
                    className="bgc-red"
                    onClick={startDeleteAlbum}>
                    Yes Delete
                    {loading && <Spinner animation="border" variant="light" />}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DeleteAlbumModal;
