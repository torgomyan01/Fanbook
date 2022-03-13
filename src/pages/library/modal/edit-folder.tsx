import React, { useEffect, useState } from 'react';
import { Modal, Button, Alert, Spinner } from 'react-bootstrap';
import { AxiosResponse } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { OpenCloseModal } from 'redux/edit-folder';
import { EditAlbum } from 'api/all-apis';
import { OpenCloseModalForDelete } from 'redux/delete-folder';

function ModalEditFolder() {
    const dispatch = useDispatch();
    const [errorAlert, setErrorAlert] = useState('');

    const modalEvent = useSelector((state: IEditFolder) => state.EditFolder);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setName(modalEvent?.file.name);
        setDescription(modalEvent?.file.description);
    }, [modalEvent]);

    function addFolder(e: any) {
        e.preventDefault();
        setLoading(true);

        if (name === '') {
            setErrorAlert('Please be sure to fill in the name of the folder');
        } else {
            EditAlbum(modalEvent?.file.id, {
                name,
                description
            })
                .then(function (response: AxiosResponse) {
                    if (response.status === 200) {
                        window.location.reload();
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    function closeModal() {
        dispatch(OpenCloseModal(false));
    }

    function openDeleteFolderModal() {
        dispatch(OpenCloseModalForDelete(true));
    }

    return (
        <Modal
            className="modal-to-setting modal-bg-blur-effect"
            show={modalEvent.OpenCloseModal}
            onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Album</Modal.Title>
            </Modal.Header>
            <form action="" onSubmit={addFolder}>
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
                        <p className="title-inputs mb-0">Album name*</p>
                        <input
                            id="inp-to-add-album-name"
                            className="inputs-to-setting-modal"
                            defaultValue={modalEvent?.file.name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                            type="text"
                        />
                    </label>

                    <label htmlFor="textarea-to-add-album" className="labels">
                        <p className="title-inputs mb-0">
                            Album Description(Optional)
                        </p>
                        <textarea
                            id="textarea-to-add-album"
                            defaultValue={modalEvent?.file.description}
                            onChange={(e) => {
                                setDescription(e.target.value);
                            }}
                            style={{ height: '120px', padding: '5px' }}
                            className="inputs-to-setting-modal"
                        />
                    </label>
                    <select
                        className="form-select form-group w-100 mb-4 pt-2 pb-2"
                        style={{
                            color: '#000',
                            fontWeight: 600,
                            paddingLeft: '10px'
                        }}
                        aria-label="Default select example">
                        <option defaultValue="39">39 $</option>
                        <option defaultValue="1">One</option>
                        <option defaultValue="2">Two</option>
                        <option defaultValue="3">Three</option>
                    </select>
                </Modal.Body>
                <Modal.Footer>
                    {/*<span*/}
                    {/*    className="f-myriadproreg fs15 c-red delete-folder"*/}
                    {/*    onClick={openDeleteFolderModal}>*/}
                    {/*    Delete Album <i className="fas fa-trash ml-2" />*/}
                    {/*</span>*/}
                    <Button
                        type="submit"
                        variant="danger"
                        className="btn bgc-red">
                        Save Changes
                        {loading && (
                            <Spinner animation="border" variant="light" />
                        )}
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}

export default ModalEditFolder;
