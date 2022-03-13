import React, { useState } from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { createStyles, makeStyles, TextField, Theme } from '@material-ui/core';
import { UserInformationSave } from 'api/all-apis';
import { useDispatch } from 'react-redux';
import { setMessageUser } from 'utils/helpers';
import { UM } from 'utils/user-messages';

interface IThisPros {
    show: boolean;
    closeModal: any;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '100%'
            }
        }
    })
);

function ModalSettingUser({ show, closeModal }: IThisPros) {
    const dispatch = useDispatch();
    const classes = useStyles();

    const [FirstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [loading, setLoading] = useState(false);

    function saveUserInformation() {
        setLoading(true);
        const data = {
            firstName: FirstName,
            lastName
        };
        UserInformationSave(data).then((res) => {
            if (res.data.data.firstName && res.data.data.lastName) {
                setLoading(false);
                dispatch(setMessageUser(UM.THANK_REG));
                localStorage.setItem('user', JSON.stringify(res.data.data));
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }
        });
    }

    return (
        <Modal show={show} onHide={closeModal} className="modal-bg-blur-effect">
            <Modal.Header>
                <Modal.Title>First Name and Last Name</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="modal-form-block-to-setting">
                    <form
                        className={classes.root}
                        noValidate
                        autoComplete="off">
                        <TextField
                            id="user-first-name-for-setting-modal"
                            label="First Name"
                            onChange={(e) => {
                                setFirstName(e.target.value);
                            }}
                        />
                        <TextField
                            id="user-last-name-for-setting-modal"
                            label="Last Name"
                            onChange={(e) => {
                                setLastName(e.target.value);
                            }}
                        />
                    </form>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={saveUserInformation}>
                    Save
                    {loading && <Spinner animation="border" variant="light" />}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalSettingUser;
