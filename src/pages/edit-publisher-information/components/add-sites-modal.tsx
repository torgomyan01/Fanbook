import React, { useState } from 'react';
import { makeStyles, TextField } from '@material-ui/core';
import { Button, Modal } from 'react-bootstrap';

interface IThisProps {
    openModal: boolean;
    closeModal: any;
    save: any;
}

const useStyles = makeStyles(() => ({
    inputs: {
        width: '100%',
        marginTop: 0
    }
}));

function AddSitesModal({ openModal, save, closeModal }: IThisProps) {
    const classes = useStyles();

    const [inpValue, setInpValue] = useState<string>('');

    function inpChange(e: any) {
        setInpValue(e.target.value);
    }

    function saveThisSite(e: any) {
        e.preventDefault();
        save(inpValue);
        closeModal();
    }

    return (
        <Modal
            show={openModal}
            onHide={closeModal}
            size="sm"
            centered
            className="modal-bg-blur-effect">
            <form action="#" onSubmit={saveThisSite}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Site</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TextField
                        className={classes.inputs}
                        id="YourSiteName"
                        onChange={inpChange}
                        label="Your Site Name"
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                    <Button variant="danger" type="submit">
                        Add
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}

export default AddSitesModal;
