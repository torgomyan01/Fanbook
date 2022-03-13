import React, { FormEvent, useState } from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import { TextField } from '@material-ui/core';
import { createAlbum } from 'api/all-apis';
import { useDispatch } from 'react-redux';
import { addErr, NAME_MIN_LENGTH, setMessageUser } from 'utils/helpers';
import { UM } from 'utils/user-messages';

interface IThisProps {
    show: boolean;
    closeModal: any;
    event: {
        id: string;
        eventStatus: string;
    };
    created: any;
}

function CrateAlbumModalUploadModal({
    show,
    closeModal,
    event,
    created
}: IThisProps) {
    const dispatch = useDispatch();
    const [albumName, setAlbumName] = useState<string>('');
    const [albumDescription, setAlbumDescription] = useState<string>('');

    const [loading, setLoading] = useState<boolean>(false);
    function StartCreateAlbum(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (albumName.length > NAME_MIN_LENGTH) {
            setLoading(true);
            createAlbum({
                userEventId: event.id,
                name: albumName,
                description: albumDescription,
                isAvailable: true
            }).then((res) => {
                created(res.data.data.item);
                setLoading(false);
            });
        } else {
            dispatch(setMessageUser(UM.PL_CH_V_PH));
        }
    }
    return (
        <Modal
            show={show}
            onHide={closeModal}
            className="modal-bg-blur-effect"
            centered={true}>
            <Modal.Header closeButton>
                <Modal.Title>Add Album</Modal.Title>
            </Modal.Header>
            <form action="#" onSubmit={StartCreateAlbum}>
                <Modal.Body>
                    <div className="mt-3">
                        <TextField
                            label="Album Name"
                            className="w-100"
                            value={albumName}
                            required={true}
                            error={addErr(albumName)}
                            onChange={(e) => {
                                setAlbumName(e.target.value);
                            }}
                        />
                    </div>
                    <div className="mb-4 mt-4">
                        <TextField
                            label="Album Description"
                            className="w-100"
                            multiline={true}
                            rows={4}
                            onChange={(e) =>
                                setAlbumDescription(e.target.value)
                            }
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        type="submit"
                        className="btn btn-danger bgc-red border-0">
                        Create
                        {loading && (
                            <Spinner
                                animation="border"
                                className="ml-2"
                                variant="light"
                            />
                        )}
                    </button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}

export default CrateAlbumModalUploadModal;
