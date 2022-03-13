import React from 'react';
import { Modal } from 'react-bootstrap';
import ReactPlayer from 'react-player';

interface thisPros {
    modalShow: boolean;
    closeModal: any;
    videoLink: string;
    eventName: string;
}

function ModalVViewVideo({
    modalShow,
    closeModal,
    videoLink,
    eventName
}: thisPros) {
    return (
        <Modal
            size="lg"
            show={modalShow}
            onHide={closeModal}
            className="modal-bg-blur-effect">
            <Modal.Header closeButton>
                <Modal.Title>{eventName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="modal-video-view">
                    <ReactPlayer
                        width="100%"
                        height="435px"
                        url={videoLink}
                        playing={true}
                        controls
                    />
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default ModalVViewVideo;
