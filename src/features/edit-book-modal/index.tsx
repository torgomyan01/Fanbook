import React, { useEffect, useState } from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenModalBookEdit, setSetAddBookBookEditModal } from 'redux/modals';
import { Link } from 'react-router-dom';
import { DEF_URL } from 'utils/urls';
import { EditBook } from 'api/all-apis';
import { setMessageUser } from 'utils/helpers';
import { UM } from 'utils/user-messages';

function EditBookModal() {
    const dispatch = useDispatch();
    const openClose = useSelector(
        (state: AllModalSite) => state.AllModalSiteTwo.editBookModal.openClose
    );
    const Book = useSelector(
        (state: AllModalSite) => state.AllModalSiteTwo.editBookModal.book
    );

    function handleClose() {
        dispatch(setOpenModalBookEdit(false));
        dispatch(setSetAddBookBookEditModal({}));
    }

    const [loading, setLoading] = useState<boolean>(false);

    const [bookName, setBookName] = useState<string>('');
    const [bookDescription, setBookDescription] = useState<string>('');

    useEffect(() => {
        setBookName(Book.name);
        setBookDescription(Book.description);
    }, [Book]);

    function changeDescription(e: any) {
        const value = e.target.value;
        setBookDescription(value);
    }

    function changeName(e: any) {
        const value = e.target.value;
        setBookName(value);
    }

    function startDeleteEvent() {
        if (Book.id) {
            if (bookName !== '' && bookDescription !== '') {
                setLoading(true);
                dispatch(setMessageUser(UM.P_W));
                const data = {
                    name: bookName,
                    description: bookDescription
                };
                EditBook(Book.id, data)
                    .then(() => {
                        dispatch(setMessageUser(UM.BOOK_EDITED));
                        setLoading(false);
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else {
                dispatch(setMessageUser(UM.FILL_ALL));
            }
        } else {
            dispatch(setMessageUser(UM.TREE_AGAIN));
        }
    }

    return (
        <Modal
            show={openClose}
            onHide={handleClose}
            className="modal-bg-blur-effect">
            <Modal.Header closeButton>
                <Modal.Title className="font-bold">Edit Book</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <label htmlFor="book-name">Book Name</label>
                    <input
                        type="text"
                        id="book-name"
                        className="pl-2 inputs-to-setting-modal"
                        onChange={changeName}
                        defaultValue={bookName}
                        placeholder="Book Name"
                    />
                </div>
                <div className="mt-3">
                    <label htmlFor="book-description">Book Description</label>
                    <textarea
                        id="book-description"
                        className="pl-2 edit-book-modal"
                        defaultValue={bookDescription}
                        onChange={changeDescription}
                        placeholder="Book Description"
                    />
                </div>
                <p className="mt-2 text-right">
                    <Link to={`${DEF_URL.EDIT_BOOK}/${Book.id}`}>
                        Go to book Editor
                        <i className="fas fa-arrow-right ml-2" />
                    </Link>
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
                    Save
                    {loading && <Spinner animation="border" variant="light" />}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditBookModal;
