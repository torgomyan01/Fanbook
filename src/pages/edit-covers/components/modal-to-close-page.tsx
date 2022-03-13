import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { history } from 'utils/helpers';
import { setOpenModalBookEdit, setSetAddBookBookEditModal } from 'redux/modals';
import { useDispatch } from 'react-redux';

interface IThisProps {
    show: boolean;
    closeModal: any;
    event: IEvent;
}

function ModalToClosePage({ show, closeModal, event }: IThisProps) {
    const dispatch = useDispatch();
    function GoToEvent() {
        history.go(-1);
        dispatch(setOpenModalBookEdit(false));
        dispatch(setSetAddBookBookEditModal({}));
    }
    return (
        <Modal show={show} onHide={closeModal} className="modal-bg-blur-effect">
            <Modal.Header closeButton>
                <Modal.Title>Close Editor</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Check if you want to exit the editor{"'"}s page, have you saved
                all the changes?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={GoToEvent}>
                    Yes Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalToClosePage;
