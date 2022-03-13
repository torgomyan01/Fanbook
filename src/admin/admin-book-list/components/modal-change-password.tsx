import React from 'react';
import { Modal } from 'react-bootstrap';
import { InputAdornment, TextField } from '@material-ui/core';

interface IThisProps {
    show: boolean;
    close: () => void;
}

function ModalChangePassword({ show, close }: IThisProps) {
    return (
        <Modal show={show} onHide={close} className="modal-bg-blur-effect">
            <Modal.Header closeButton>
                <Modal.Title>Change Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <TextField
                        type="password"
                        className="w-100"
                        label="Old Password"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <i className="fas fa-key" />
                                </InputAdornment>
                            )
                        }}
                    />
                </div>
                <div>
                    <TextField
                        type="password"
                        className="w-100 mt-3"
                        label="New Password"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <i className="fas fa-key" />
                                </InputAdornment>
                            )
                        }}
                    />
                </div>
                <div className="mt-3 mb-3">
                    <TextField
                        type="password"
                        className="w-100"
                        label="Repeat Password"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <i className="fas fa-redo" />
                                </InputAdornment>
                            )
                        }}
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-danger bgc-red border-0">
                    Save Changes
                </button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalChangePassword;
