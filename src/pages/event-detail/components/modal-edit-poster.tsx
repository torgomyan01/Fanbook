import React, { FormEvent, useEffect, useState } from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import { TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { setAddPosterToEditPoster, setOpenModalEditPoster } from 'redux/modals';
import { UpdatePoster } from 'api/all-apis';
import { eventStatus, history } from 'utils/helpers';
import { DEF_URL } from 'utils/urls';
import { useParams } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { setCurrentEvent } from 'redux/events.slice';

function ModalEditPoster() {
    const dispatch = useDispatch();
    const { id, status }: { id: string; status: string } = useParams();
    const editPosterModal = useSelector(
        (state: AllModalSite) => state.AllModalSiteTwo.modalEditPoster
    );
    const [posterName, setPosterName] = useState<string>('');
    const [posterDescription, setPosterDescription] = useState<string>('');

    const currentEvent = useSelector(
        (state: IEvents) => state.events.currentEvent
    );
    useEffect(() => {
        editPosterModal.poster.name &&
            setPosterName(editPosterModal.poster.name);
        editPosterModal.poster.description &&
            setPosterDescription(editPosterModal.poster.description);
    }, [editPosterModal]);

    function closeModal() {
        dispatch(setOpenModalEditPoster(false));
        dispatch(setAddPosterToEditPoster({}));
    }
    const [loading, setLoading] = useState<boolean>(false);

    function saveChanges(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        UpdatePoster(editPosterModal.poster.id, {
            name: posterName,
            description: posterDescription
        })
            .then((res: AxiosResponse) => {
                const newPoster = res.data.data.item;
                const _currentEvent = { ...currentEvent };
                const _posters = [..._currentEvent.posters];
                const _thisPoster = _posters.find(
                    (poster: IPoster) => poster.id === editPosterModal.poster.id
                );
                const _posterIndexOf =
                    _thisPoster && _posters.indexOf(_thisPoster);
                if (_posterIndexOf !== undefined) {
                    _posters.splice(_posterIndexOf, 1);
                    _posters.push(newPoster);
                    _currentEvent.posters = _posters;
                    dispatch(setCurrentEvent(_currentEvent));
                }
                setLoading(false);
                closeModal();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function goToEditor() {
        const thisEvent = editPosterModal.poster?.userEvent?.isAvailable
            ? eventStatus.public
            : eventStatus.private;
        const forDinamicStatus = status ? status : thisEvent;
        history.push(
            `${DEF_URL.EDITOR_POSTER_PAGE}/${editPosterModal.poster.userEventId}/${editPosterModal.poster.id}/${forDinamicStatus}`
        );
        closeModal();
    }

    return (
        <Modal
            show={editPosterModal.openClose}
            onHide={closeModal}
            className="modal-bg-blur-effect">
            <Modal.Header closeButton>
                <Modal.Title>Edit Poster</Modal.Title>
            </Modal.Header>
            <form action="#" onSubmit={saveChanges}>
                <Modal.Body>
                    <div>
                        <TextField
                            className="w-100"
                            required={true}
                            value={posterName}
                            onChange={(e) => setPosterName(e.target.value)}
                            label="Poster Name"
                        />
                    </div>
                    <div className="mt-3">
                        <TextField
                            label="Poster Description"
                            className="w-100"
                            onChange={(e) =>
                                setPosterDescription(e.target.value)
                            }
                            value={posterDescription}
                            multiline={true}
                            rows={4}
                        />
                    </div>
                    <div
                        className="d-flex justify-content-end align-items-center mt-2 cursor-pointer c-blue font-bold"
                        onClick={goToEditor}>
                        Go To Editor
                        <i className="fas fa-arrow-right ml-2" />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        type="submit"
                        className="btn btn-danger bgc-red border-0">
                        Save Changes
                        {loading && (
                            <Spinner
                                animation="border"
                                variant="light"
                                className="ml-2"
                            />
                        )}
                    </button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}
export default ModalEditPoster;
