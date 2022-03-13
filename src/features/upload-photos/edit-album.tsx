import React, { useEffect, useRef, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { keyGenerator } from 'utils/helpers';
import moveDown from 'assets/images/move-down.png';
import {
    setAddIdModalEdit,
    setModalToMoveAlbumId,
    setOpenEditAlbumModal,
    setOpenModalToMove
} from 'redux/modals';
import EditAlbumModalImageBlock from './components/edit-album-modal-image-block';
import { OpenCloseModal, SetFile } from 'redux/edit-folder';

export let deletingAlbum: { imageID: string }[] = [];

function ModalEditAlbum() {
    const dispatch = useDispatch();
    const openClose = useSelector(
        (state: AllModalSite) =>
            state.AllModalSiteTwo.editAlbumModal.openCloseAlbumEditModal
    );
    const albumId = useSelector(
        (state: AllModalSite) => state.AllModalSiteTwo.editAlbumModal.albumID
    );

    const AllFiles: any = useSelector(
        (state: ILibrary) => state.Library.AllFiles
    );

    const [currentAlbum, setCurrentAlbum] = useState<IAlbumFiles[]>([]);

    // FOR OPEN MODAL EDIT ALBUM INFO AND DELETE MODALS
    const [thisAlbum, setThisAlbum] = useState<OneAlbum>();

    useEffect(() => {
        const thisAlbum: OneAlbum = AllFiles.find(
            (album: OneAlbum) => album.id === albumId
        );
        setThisAlbum(thisAlbum);
        setCurrentAlbum(thisAlbum?.albumFiles);
    }, [AllFiles, albumId]);

    const uploadBlock = useRef<any>(null);

    function closeModal() {
        dispatch(setOpenEditAlbumModal(false));
        dispatch(setAddIdModalEdit(''));
    }

    function removeThisAlbum() {
        console.log(deletingAlbum);
    }

    function editCurrentAlbum() {
        dispatch(OpenCloseModal(true));
        dispatch(SetFile(thisAlbum));
    }

    function openMoveModal() {
        dispatch(setOpenModalToMove(true));
        dispatch(setModalToMoveAlbumId(albumId));
    }
    function startAddThisChanges(albumID: any) {
        const _newArray = [...deletingAlbum];
        const searchImages = _newArray.find((img) => img.imageID === albumID);

        if (searchImages) {
            const thisIndexOf = _newArray.indexOf(searchImages);
            _newArray.splice(thisIndexOf, 1);
            deletingAlbum = _newArray;
        } else {
            deletingAlbum.push({ imageID: albumID });
        }
    }

    return (
        <>
            <Modal
                size="xl"
                show={openClose}
                onHide={closeModal}
                animation={true}
                className="modal-bg-blur-effect">
                <Modal.Header closeButton={false}>
                    <Modal.Title className="d-flex justify-content-between align-items-center w-100">
                        <span className="font-bold editModalTitle">
                            Edit Album Photos
                        </span>
                        <ul className="d-flex align-items-center mb-0">
                            {/*<li className="mr-4 f-myriadproreg fs15">*/}
                            {/*    <Link*/}
                            {/*        to="#"*/}
                            {/*        className="move-bnt c-black"*/}
                            {/*        onClick={openMoveModal}>*/}
                            {/*        Move*/}
                            {/*        <img*/}
                            {/*            src={moveDown}*/}
                            {/*            alt="move"*/}
                            {/*            className="ml-2"*/}
                            {/*        />*/}
                            {/*    </Link>*/}
                            {/*</li>*/}
                            {/*<li className="mr-4 f-myriadproreg fs15">*/}
                            {/*    <Link*/}
                            {/*        to="#"*/}
                            {/*        className="c-black"*/}
                            {/*        onClick={editCurrentAlbum}>*/}
                            {/*        Edit*/}
                            {/*        <i className="far fa-edit c-blue ml-2" />*/}
                            {/*    </Link>*/}
                            {/*</li>*/}
                            <li className="mr-5 f-myriadproreg fs15">
                                <span
                                    className="c-black cursor-pointer"
                                    onClick={removeThisAlbum}>
                                    Delete
                                    <i className="fas fa-trash-alt c-red ml-2" />
                                </span>
                            </li>
                            <li className="f-myriadproreg fs20 c-gray mr-2">
                                <span
                                    className="c-black cursor-pointer"
                                    onClick={closeModal}>
                                    <i className="fas fa-times" />
                                </span>
                            </li>
                        </ul>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div
                        className="modal-body content-section"
                        ref={uploadBlock}
                        style={{ height: '40rem' }}>
                        <div className="scroll-vertical" data-mcs-theme="dark">
                            <div className="container-fluid">
                                <div className="row">
                                    {currentAlbum?.map((image: IAlbumFiles) => {
                                        return (
                                            <EditAlbumModalImageBlock
                                                key={keyGenerator(40)}
                                                image={image}
                                                checkedThis={
                                                    startAddThisChanges
                                                }
                                                checkoutArray={deletingAlbum}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ModalEditAlbum;
