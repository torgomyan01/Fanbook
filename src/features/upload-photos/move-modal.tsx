import { Accordion, Col, Modal, Row, Spinner } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowRight,
    faFolder,
    faImages
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { keyGenerator } from 'utils/helpers';
import { setModalToMoveAlbumId, setOpenModalToMove } from 'redux/modals';
import ProductsBlock from './components/image-block';
import EventBlockMoveModal from './components/event-block-move-modal';
import { GetMyEvents } from 'redux/events.slice';
import { AllRequestsForMyEvents } from 'api/all-apis';

interface IActiveAlbum {
    albumName: string;
    eventName: string;
}

function MoveModal() {
    const dispatch = useDispatch();
    const modalType = useSelector(
        (state: AllModalSite) => state.AllModalSiteTwo.MoveModal
    );

    const userInfo = useSelector((state: IAuth) => state.sign.user.profile);
    const MyEvents = useSelector((state: IEvents) => state.events.myEvents);

    const SelectedAlbum = useSelector(
        (state: AllModalSite) => state.AllModalSiteTwo.selectedAlbumMoveModal
    );

    const [ActiveAlbum, setActiveAlbum] = useState<IActiveAlbum>();

    useEffect(() => {
        const currentEvent: IEvent = MyEvents?.find(
            (event: IEvent) => event.id === SelectedAlbum.eventID
        );
        const currentAlbum = currentEvent?.albums.find(
            (album: OneAlbum) => album.id === SelectedAlbum.albumID
        );
        if (currentAlbum) {
            setActiveAlbum({
                eventName: currentEvent.name,
                albumName: currentAlbum.name
            });
        }
    }, [SelectedAlbum]);

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        AllRequestsForMyEvents({
            'page[number]': '1',
            'page[size]': '500',
            sort: '-date',
            'append[1]': 'albums',
            'append[2]': 'files',
            'filter[userId]': userInfo?.id
        })
            .then((res) => {
                dispatch(GetMyEvents(res.data.data.items));
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    function closeModalMove() {
        dispatch(setOpenModalToMove(false));
        dispatch(setModalToMoveAlbumId(''));
    }
    return (
        <>
            <Modal
                size="xl"
                show={modalType}
                animation={true}
                className="modal-bg-blur-effect"
                onHide={closeModalMove}>
                <Modal.Header closeButton>
                    <Modal.Title className="d-flex justify-content-between align-items-center w-100">
                        <span className="font-bold editModalTitle">
                            Move Photos
                        </span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="h-75">
                    <Row className="pl-2 pr-2 pb-5 bt-5 h-100">
                        <Col lg={9}>
                            <Row className="pr-blocks">
                                <ProductsBlock />
                            </Row>
                        </Col>
                        <Col
                            lg={3}
                            className="border rounded p-2 f-r-modal-move">
                            <h3 className="ml-3 mt-2">Origin Album</h3>
                            <Row className="mr-2 ml-2 mt-3">
                                <Col className="c-primary fs15 p-0 d-flex justify-content-center align-items-center">
                                    <FontAwesomeIcon
                                        icon={faImages}
                                        className="mr-2"
                                    />
                                    {ActiveAlbum?.eventName}
                                </Col>
                                <Col className="col-3 c-primary d-flex justify-content-center align-items-center">
                                    <FontAwesomeIcon icon={faArrowRight} />
                                </Col>
                                <Col className="c-primary fs15 p-0 d-flex justify-content-center align-items-center">
                                    <FontAwesomeIcon
                                        icon={faFolder}
                                        className="mr-2 c-primary"
                                    />
                                    {ActiveAlbum?.albumName}
                                </Col>
                            </Row>
                            <h3 className="ml-3 mt-3">Destination Album</h3>
                            <Accordion defaultActiveKey="0">
                                {loading ? (
                                    <div className="d-flex justify-content-center align-items-center mt-5">
                                        <Spinner
                                            animation="border"
                                            variant="danger"
                                        />
                                    </div>
                                ) : (
                                    MyEvents?.map((event: IEvent) => {
                                        return (
                                            <EventBlockMoveModal
                                                event={event}
                                                key={keyGenerator(30)}
                                            />
                                        );
                                    })
                                )}
                            </Accordion>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer className="d-flex align-items-center justify-content-end">
                    <button
                        onClick={closeModalMove}
                        type="button"
                        className="btn save-btn upload-modal_disable float-right">
                        Save changes
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default MoveModal;
