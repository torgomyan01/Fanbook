import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/ModalHeader';

function ModalToLoadWindow() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    window.onload = () => setShow(true);

    return (
        <>
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                className="modal-my-dashboard modal-bg-blur-effect"
                centered
                show={show}
                onHide={handleClose}>
                <ModalHeader closeButton>{''}</ModalHeader>
                <Modal.Body>
                    <h2 className="welcome-modal_title f-omnesMedium">
                        Welcome to Fanbooks!
                    </h2>
                    <p className="welcome-modal_txt">
                        We want you to get up-to-speed as soon as possible, so
                        we want to give you a few tips before starting
                    </p>
                    <div className="mb-3 row pr-3 pl-3 justify-content-start align-items-center">
                        <Link
                            to="#"
                            onClick={handleClose}
                            className="col-md-4 welcome-btn bgc-red c-white btn red-btn mr-md-5">
                            Sure, let’s go!
                        </Link>
                        <Link
                            to="#"
                            onClick={handleClose}
                            className=" fs20 c-red b-bottom mt-1rem">
                            Thanks, but I can do it alone
                        </Link>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ModalToLoadWindow;
