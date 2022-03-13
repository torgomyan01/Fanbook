import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { modalAddPlan } from 'redux/modals';
import { history } from 'utils/helpers';
import { ALL_URL } from 'utils/urls';

function ModalUserMessagesForPan() {
    const dispatch = useDispatch();
    const thisModal = useSelector(
        (state: AllModalSite) => state.AllModalSiteTwo.addPlan
    );

    function CloseModal() {
        history.push(ALL_URL.SETTINGS);
        dispatch(
            modalAddPlan({
                openClose: false
            })
        );
    }
    return (
        <Modal
            show={thisModal.openClose}
            onHide={() => {
                dispatch(
                    modalAddPlan({
                        openClose: false
                    })
                );
            }}
            className="modal-bg-blur-effect">
            <Modal.Header closeButton>
                <Modal.Title>
                    <b>Upgrade Plan</b>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="text-center mb-0">
                    You have reached the limit of your Plan!
                </p>
                <p className="text-center">
                    Please upgrade now to enjoy more features.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <button
                    className="btn btn-danger bgc-red border-0"
                    onClick={CloseModal}>
                    Learn More
                </button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalUserMessagesForPan;
