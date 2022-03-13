import React, { useEffect, useState } from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateProfilePublisher } from 'api/all-apis';
import { setMessageUser } from 'utils/helpers';
import { UM } from 'utils/user-messages';

interface IThisProps {
    showHide: boolean;
    closeModal: any;
}

function ModalEditDescription({ showHide, closeModal }: IThisProps) {
    const dispatch = useDispatch();
    const PBInformation = useSelector(
        (state: IPublisherProfile) => state.PublisherProfile.data
    );

    const [text, setText] = useState<string>('');
    const DefText = PBInformation?.item?.publisherProfile?.description;

    useEffect(() => {
        if (PBInformation?.item?.publisherProfile?.description) {
            setText(PBInformation.item.publisherProfile.description);
        }
    }, [PBInformation]);

    function handleChange(e: any) {
        setText(e.target.value);
    }

    const [loading, setLoading] = useState<boolean>(false);
    function saveChanges() {
        if (text === DefText) {
            dispatch(setMessageUser(UM.EDIT_DESC));
            return;
        }
        setLoading(true);
        UpdateProfilePublisher({
            publisherProfile: {
                description: text
            }
        }).then(() => {
            setLoading(false);
            window.location.reload();
        });
    }

    return (
        <Modal
            show={showHide}
            onHide={closeModal}
            centered
            className="modal-bg-blur-effect">
            <Modal.Header closeButton>
                <Modal.Title>Edit Your Description</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <textarea
                    className="textarea-edit-description"
                    value={text}
                    onChange={handleChange}>
                    {text}
                </textarea>
            </Modal.Body>
            <Modal.Footer>
                <button
                    className="btn btn-danger bgc-red border-0"
                    onClick={saveChanges}>
                    Save Changes
                    {loading && <Spinner animation="border" variant="light" />}
                </button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalEditDescription;
