import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import photo1 from '../images/photo-1.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCamera,
    faEdit,
    faFolder,
    faTrash
} from '@fortawesome/free-solid-svg-icons';
import faCr from '../images/info-circle.png';
import { Dropdown } from 'react-bootstrap';
import ModalToDeleteFolder from 'pages/library/components/delete-folder-modal';

function FolderSection() {
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [openModalToEdit, setOpenModalToEdit] = useState(false);
    const [deleteFolder, setDeleteFolder] = useState(false);

    return (
        <section className="folder-section">
            <div className="container-fluid wrapper1">
                <div className="row mb-60">
                    <div className="col-12">
                        <ul className="d-flex align-items-center mb-3">
                            <li className="mr-2">
                                <FontAwesomeIcon
                                    icon={faFolder}
                                    className="mr-2"
                                />
                            </li>
                            <li className="mr-2 fs20 f-omnesMedium">
                                Other folders from this event
                            </li>
                            <li>
                                <Link to="">
                                    <img src={faCr} alt="info" />
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="col-xl-3 col-lg-4 col-sm-6 col-12 mb-xl-0 mt-3">
                        <div className="photo-box trans">
                            <div className="d-flex">
                                <span
                                    className="photo-img"
                                    style={{
                                        backgroundImage: `url(${photo1})`
                                    }}
                                />
                                <span
                                    className="photo-img"
                                    style={{
                                        backgroundImage: `url(${photo1})`
                                    }}
                                />
                            </div>
                            <div className="d-flex">
                                <span
                                    className="photo-img"
                                    style={{
                                        backgroundImage: `url(${photo1})`
                                    }}
                                />
                                <span
                                    className="photo-img"
                                    style={{
                                        backgroundImage: `url(${photo1})`
                                    }}
                                />
                            </div>
                            <div className="d-flex align-items-center justify-content-between pt-2">
                                <div className="d-flex flex-column justify-content-between">
                                    <h3 className="mb-0 fs18 f-omnesMedium">
                                        Folder name
                                    </h3>
                                    <span className="c-gray fs15 f-myriadproreg">
                                        133 photos
                                    </span>
                                </div>
                                <div className="d-flex align-items-center">
                                    <Link
                                        to="#"
                                        className="buy-btn d-inline-block text-center fs16 f-omnesMedium trans">
                                        $99.00 Buy
                                    </Link>
                                    <div className="dropdown">
                                        <Dropdown>
                                            <Dropdown.Toggle
                                                variant="outline"
                                                id="dropdown-to-edit-prod"
                                                style={{
                                                    padding: '0',
                                                    position: 'relative',
                                                    left: '10px'
                                                }}>
                                                <i className="fas fa-ellipsis-v c-gray fs18" />
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item
                                                    href="#"
                                                    onClick={() => {
                                                        setOpenModalEdit(true);
                                                    }}>
                                                    <FontAwesomeIcon
                                                        icon={faEdit}
                                                        className="mr-2 c-blue"
                                                    />
                                                    Edit Album
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                    href="#"
                                                    onClick={() => {
                                                        setOpenModalToEdit(
                                                            true
                                                        );
                                                    }}>
                                                    <FontAwesomeIcon
                                                        icon={faCamera}
                                                        className="mr-2 c-blue"
                                                    />
                                                    Edit Photos
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                    href="#"
                                                    onClick={() => {
                                                        setDeleteFolder(true);
                                                    }}>
                                                    <FontAwesomeIcon
                                                        icon={faTrash}
                                                        className="mr-2 c-red"
                                                    />
                                                    Delete Album
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*<ModalToEditFolder type={openModalEdit} onClose={()=>{setOpenModalEdit(false)}}/>*/}

            {/*<ModalToEditUploadPhotos*/}
            {/*    proto="edit"*/}
            {/*    type={openModalToEdit}*/}
            {/*    onClose={() => {*/}
            {/*        setOpenModalToEdit(false);*/}
            {/*    }}*/}
            {/*/>*/}

            {/*<ModalToDeleteFolder*/}
            {/*    type={deleteFolder}*/}
            {/*    onClose={() => {*/}
            {/*        setDeleteFolder(false);*/}
            {/*    }}*/}
            {/*/>*/}
        </section>
    );
}

export default FolderSection;
