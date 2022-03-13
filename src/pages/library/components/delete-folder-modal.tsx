import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Modal, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { OpenCloseModalForDelete } from 'redux/delete-folder';
import { AxiosResponse } from 'axios';
import {
    deleteAlbum,
    getEventAllAlbumFiles,
    returnRemoveAlbum
} from 'api/all-apis';
import { setAllLibrary } from 'redux/library';
import { setMessageUser } from 'utils/helpers';
import { UM } from 'utils/user-messages';

function ModalToDeleteFolder() {
    const dispatch = useDispatch();
    const { eventID }: { eventID: string } = useParams();

    const [show, setShow] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const thisModal = useSelector((state: IDeleteFolder) => state.DeleteFolder);

    const handleShow = () => setShow(true);
    const handleClose = () => {
        dispatch(OpenCloseModalForDelete(false));
        setShow(false);
    };

    function onClose() {
        dispatch(OpenCloseModalForDelete(false));
    }

    function deleteFolder() {
        setLoading(true);
        dispatch(setMessageUser(UM.P_W));
        deleteAlbum(thisModal?.file?.id).then(function (res: AxiosResponse) {
            if (res.status === 200) {
                handleShow();
                setLoading(false);
                getNewStatusesAlbum();
            }
        });
    }
    // UPDATE STATUS ALUMS DELETED
    function getNewStatusesAlbum() {
        setAllLibrary([]);
        getEventAllAlbumFiles(eventID, 'all', true, true, true, true).then(
            (res) => {
                dispatch(setAllLibrary(res.data.data.albums));
            }
        );
    }

    function returnRemoved() {
        setLoading(true);
        dispatch(setMessageUser(UM.P_W));
        returnRemoveAlbum(thisModal?.file?.id).then(function () {
            setLoading(false);
            handleClose();
            getNewStatusesAlbum();
        });
    }

    return (
        <>
            <Modal
                show={thisModal.OpenCloseModal}
                onHide={onClose}
                className="modal-bg-blur-effect">
                <Modal.Header closeButton>{''}</Modal.Header>
                <Modal.Body className="deleteFolderModal">
                    <div className="modal-content">
                        <div className="upload-box text-center">
                            <h2 className="fs24 mb-3 f-omnesMedium">
                                Delete Images
                            </h2>
                            <p className="delet-modal_txt">
                                Are you sure you want to delete{' '}
                                {thisModal.file.albumFiles
                                    ? thisModal.file.albumFiles.length
                                    : 0}{' '}
                                images?
                            </p>
                            <Link
                                to="#"
                                onClick={deleteFolder}
                                className="btn delete-btn">
                                <FontAwesomeIcon
                                    icon={faTrash}
                                    style={{ color: '#b12029' }}
                                    className="mr-2"
                                />
                                Delete
                                {loading && (
                                    <Spinner
                                        animation="border"
                                        variant="danger"
                                    />
                                )}
                            </Link>
                            <p className="lh-14 fs15 mt-4 f-myriadprolight">
                                Tip: you can recover your deleted photos within
                                48 hours on the
                                <Link to="#" className="c-red b-bottom">
                                    &nbsp; “Recently Deleted” &nbsp;
                                </Link>
                                folder
                            </p>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            {/*modal two to deleted */}
            <Modal
                show={show}
                onHide={handleClose}
                className="modal-bg-blur-effect">
                <Modal.Header>{''}</Modal.Header>
                <Modal.Body>
                    <div className="modal-content">
                        <div
                            className="upload-box text-center"
                            style={{ padding: '1rem 0' }}>
                            <h2 className="fs24 mb-3 f-omnesMedium">
                                Are you sure?
                            </h2>
                            <p className="delet-modal_txt">
                                Your changes won’t be saved
                            </p>
                            <Link
                                to="#"
                                onClick={handleClose}
                                className="btn bgc-red delete-btn c-white"
                                data-toggle="modal"
                                data-target="#close-modal">
                                Close
                            </Link>
                            <Link
                                to="#"
                                onClick={returnRemoved}
                                className="c-red mt-4 border-bottom d-inline-block"
                                data-toggle="modal"
                                data-target="#close-modal">
                                Return to Edit Mode
                                {loading && (
                                    <Spinner
                                        animation="border"
                                        variant="danger"
                                    />
                                )}
                            </Link>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            {/*modal two to deleted */}
        </>
    );
}

export default ModalToDeleteFolder;
