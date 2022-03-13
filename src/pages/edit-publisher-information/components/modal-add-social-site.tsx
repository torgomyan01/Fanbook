import React, { useEffect, useState } from 'react';
import {
    FormControl,
    InputLabel,
    makeStyles,
    MenuItem,
    Select,
    TextField
} from '@material-ui/core';
import { socialSites } from '../social-sites';
import { keyGenerator, setMessageUser } from 'utils/helpers';
import { useDispatch } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { UM } from 'utils/user-messages';

interface IThisProps {
    openModal: boolean;
    closeModal: any;
    save: any;
}

const useStyles = makeStyles(() => ({
    formControl: {
        width: '100%'
    },
    inputs: {
        width: '100%',
        marginTop: 20
    }
}));

interface IThisProps {
    openModal: boolean;
    closeModal: any;
    save: any;
    added: {
        icon: any;
        name: string;
        serName: string;
    }[];
}

function ModalAddSocialSite({
    openModal,
    closeModal,
    save,
    added
}: IThisProps) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [socialName, setSocialName] = useState<string>('');
    const [userName, setUserName] = useState<string>('');
    const [sites, setSites] = useState<any>([]);

    function saveThisSite(e: any) {
        e.preventDefault();
        const thisSite = socialSites.find((site) => site.name === socialName);
        if (userName === '') {
            dispatch(setMessageUser(UM.FILL_USERNAME));
        } else {
            save({ ...thisSite, serName: userName });
            closeModal();
        }
    }
    useEffect(() => {
        const _networks = socialSites.filter((site) => {
            const _added = added.some((st) => st.name === site.name);

            return _added ? null : site;
        });
        setSites(_networks);
    }, [added]);

    const handleChange = (event: any) => {
        setSocialName(event.target.value);
    };

    function changeUserName(e: any) {
        setUserName(e.target.value);
    }

    return (
        <Modal
            show={openModal}
            onHide={closeModal}
            centered
            size="sm"
            className="modal-bg-blur-effect">
            <form action="#" onSubmit={saveThisSite}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Social Networks</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">
                            Select Site
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={socialName}
                            onChange={handleChange}>
                            {sites.map((social: any) => {
                                return (
                                    <MenuItem
                                        key={keyGenerator(30)}
                                        value={social.name}>
                                        {social.icon}
                                        {social.name}
                                    </MenuItem>
                                );
                            })}
                            <MenuItem value="" className="pl-5">
                                None
                            </MenuItem>
                        </Select>
                    </FormControl>

                    {socialName !== '' && (
                        <TextField
                            className={classes.inputs}
                            id="username"
                            label="Username"
                            onChange={changeUserName}
                        />
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                    <Button variant="danger" type="submit" onClick={closeModal}>
                        Add
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}

export default ModalAddSocialSite;
