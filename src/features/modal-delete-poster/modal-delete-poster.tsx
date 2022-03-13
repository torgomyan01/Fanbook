import React, { useState } from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { modalDeletePoster, modalDeletePosterOpenClose } from 'redux/modals';
import { RemovePoster } from 'api/all-apis';
import { setMessageUser } from 'utils/helpers';
import { UM } from 'utils/user-messages';

function ModalDeletePoster() {
    const dispatch = useDispatch();
    const thisModal = useSelector(
        (state: AllModalSite) => state.AllModalSiteTwo.modalDeletePoster
    );
    const userInfo = useSelector((state: IAuth) => state.sign.user.profile);

    function CloseModal() {
        dispatch(modalDeletePoster({}));
        dispatch(modalDeletePosterOpenClose(false));
    }
    const [loading, setLoading] = useState<boolean>(false);

    function removePoster() {
        dispatch(setMessageUser(UM.P_W));
        setLoading(true);
        RemovePoster(thisModal.poster.id)
            .then(() => {
                dispatch(setMessageUser(UM.POSTER_DELETED));
                setLoading(false);
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    return (
        <Modal
            show={thisModal.openClose}
            onHide={CloseModal}
            centered={true}
            className="modal-bg-blur-effect">
            <Modal.Header closeButton />
            <Modal.Body>
                <p className="fs20 text-center">
                    Dear {userInfo?.firstName} {userInfo?.lastName}, do you want
                    to delete this <b>{thisModal.poster.name}</b> poster ?
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={CloseModal}>
                    No Close
                </Button>
                <Button variant="danger" onClick={removePoster}>
                    Yes Delete
                    {loading && (
                        <Spinner
                            animation="border"
                            variant="light"
                            className="ml-2"
                        />
                    )}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalDeletePoster;
