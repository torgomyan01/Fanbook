import React, { useState } from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
    setOpenModalBookDelete,
    setSetAddBookBookDeleteModal
} from 'redux/modals';
import { DeleteBook } from 'api/all-apis';
import { setMessageUser } from 'utils/helpers';
import { UM } from 'utils/user-messages';

function DeleteBookModal() {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: IAuth) => state.sign.user.profile);
    const openClose = useSelector(
        (state: AllModalSite) => state.AllModalSiteTwo.deleteBookModal.openClose
    );
    const Book = useSelector(
        (state: AllModalSite) => state.AllModalSiteTwo.deleteBookModal.book
    );

    function handleClose() {
        dispatch(setOpenModalBookDelete(false));
        dispatch(setSetAddBookBookDeleteModal({}));
    }

    const [loading, setLoading] = useState(false);
    function startDeleteEvent() {
        if (Book.id) {
            setLoading(true);
            dispatch(setMessageUser(UM.P_W));
            DeleteBook(Book.id).then(() => {
                setLoading(false);
                dispatch(setMessageUser(UM.BOOK_DELETED));
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
                    to delete this <b>{Book.name}</b> book ?
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

export default DeleteBookModal;
