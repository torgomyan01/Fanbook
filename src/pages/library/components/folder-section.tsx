import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    faBorderAll,
    faFolder,
    faImages,
    faSearch,
    faThList
} from '@fortawesome/free-solid-svg-icons';

import imgPluse from '../images/plus-icon.png';
import LibraryList from './library-list';
import { useDispatch, useSelector } from 'react-redux';

import { ModalToUploadImage, setOpenCreateModalAlbum } from 'redux/modals';
import ModalAddAlbum from 'pages/event-detail/modal/add-album';
import ModalEditFolder from '../modal/edit-folder';
import ModalToDeleteFolder from './delete-folder-modal';
import DeletedAlbums from '../modal/deleted-albums';
import { checkPublisher, keyGenerator, UploadAndEdit } from 'utils/helpers';
import AlbumLoadingBlock from './album-loading-block';

const GridListDef = {
    grid: 'grid',
    list: 'list'
};

interface IThisProps {
    loading: boolean;
}

function FolderSectionLibrary({ loading }: IThisProps) {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: IAuth) => state.sign.user.profile);

    const event = useSelector((state: IEvents) => state.events.currentEvent);
    const AllFiles: any = useSelector(
        (state: ILibrary) => state.Library.AllFiles
    );
    const isLoggedIn = useSelector(
        (state: IAuth) => state.sign.user.isLoggedIn
    );

    const [dropCreateFolderAnd, setDropCreateFolderAnd] =
        useState<boolean>(false);

    function openCloseDropUploadAndCreate() {
        setDropCreateFolderAnd(!dropCreateFolderAnd);
    }

    const gridAndList: any = localStorage.getItem('grid-list-library')
        ? localStorage.getItem('grid-list-library')
        : GridListDef.grid;
    const [listGird, setListGrid] = useState<string>('');

    useEffect(() => {
        setListGrid(gridAndList);
    }, [gridAndList]);

    const [AllFilesGet, setAllFilesGet] = useState([]);
    useEffect(() => {
        setAllFilesGet(AllFiles);
    }, [AllFiles]);

    function goGrid() {
        setListGrid('grid');
        localStorage.setItem('grid-list-library', GridListDef.grid);
    }

    function goList() {
        setListGrid('list');
        localStorage.setItem('grid-list-library', GridListDef.list);
    }

    const searchFolderInput = useRef<HTMLInputElement>(null);

    function searchFolder() {
        const value: string | undefined =
            searchFolderInput.current?.value.toLowerCase();
        const result: any = value
            ? AllFiles.filter((file: any) =>
                  file.name.toLowerCase().includes(value)
              )
            : AllFiles;
        setAllFilesGet(result);
    }

    function openModalUpload() {
        dispatch(ModalToUploadImage(UploadAndEdit.upload));
    }

    function openModalAddFolder() {
        dispatch(setOpenCreateModalAlbum(true));
    }

    const [modalViewDeletedAlbums, setModalViewDeletedAlbums] =
        useState<boolean>(false);

    function openModalViewDeletedAlbums() {
        setModalViewDeletedAlbums(true);
    }

    function closeModalViewDeletedAlbums() {
        setModalViewDeletedAlbums(false);
    }

    const isEditTable =
        event.id && checkPublisher(userInfo?.id, event?.user?.id);

    const myAlbums = AllFilesGet.filter(
        (file: any) => file.userId === event.userId
    );
    const otherAlbums = AllFilesGet.filter(
        (file: any) => file.userId !== event.userId
    );
    return (
        <section className="folder-section pt-5 position-relative">
            <div className="container-fluid wrapper1">
                <div className="row mb-60">
                    <div className="col-12">
                        <div className="folder-box d-sm-flex justify-content-between align-items-center w-100">
                            <p className="fs24 c-black mb-sm-0 mb-2">
                                All Albums
                            </p>
                            <ul className="mb-0 d-flex justify-content-end align-items-center">
                                <li className="mr-3">
                                    <div className="form-box d-flex align-items-center mb-0">
                                        <span className="mr-2">
                                            <FontAwesomeIcon
                                                style={{ color: '#0084ff' }}
                                                icon={faSearch}
                                            />
                                        </span>
                                        <input
                                            type="text"
                                            ref={searchFolderInput}
                                            placeholder="Search albums..."
                                            onChange={searchFolder}
                                        />
                                    </div>
                                </li>
                                {isEditTable && (
                                    <li>
                                        <div
                                            className="deleted-albums"
                                            onClick={
                                                openModalViewDeletedAlbums
                                            }>
                                            <i className="fas fa-folder" />
                                        </div>
                                    </li>
                                )}
                                <li className="mr-2">
                                    <button
                                        className="btn"
                                        onClick={goGrid}
                                        style={{
                                            color:
                                                listGird === GridListDef.grid
                                                    ? '#0084ff'
                                                    : 'rgba(0,0,0,0.83)'
                                        }}>
                                        <FontAwesomeIcon icon={faBorderAll} />
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="btn"
                                        onClick={goList}
                                        style={{
                                            color:
                                                listGird === GridListDef.list
                                                    ? '#0084ff'
                                                    : 'rgba(0,0,0,0.83)'
                                        }}>
                                        <FontAwesomeIcon icon={faThList} />
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <ul className="d-flex align-items-center mb-3">
                            <li className="mr-2">
                                <i className="fas fa-folder" />
                            </li>
                            <li className="mr-2 fs20 f-omnesMedium">
                                Official Photos
                            </li>
                        </ul>
                    </div>

                    {loading ? (
                        <>
                            <AlbumLoadingBlock />
                            <AlbumLoadingBlock />
                            <AlbumLoadingBlock />
                        </>
                    ) : myAlbums.length > 0 ? (
                        myAlbums.map((files: any) => {
                            return (
                                <LibraryList
                                    key={keyGenerator(30)}
                                    files={files}
                                    type={listGird}
                                />
                            );
                        })
                    ) : (
                        <p className="ml-3 mt-3">
                            There are no photos added yet.
                        </p>
                    )}
                </div>

                <div className="row">
                    <div className="col-12">
                        <ul className="d-flex align-items-center mb-3">
                            <li className="mr-2">
                                <i className="fas fa-folder" />
                            </li>
                            <li className="mr-2 fs20 f-omnesMedium">
                                Content by Others
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    {loading ? (
                        <>
                            <AlbumLoadingBlock />
                            <AlbumLoadingBlock />
                        </>
                    ) : otherAlbums.length > 0 ? (
                        otherAlbums.map((files: any) => {
                            return (
                                <LibraryList
                                    key={keyGenerator(30)}
                                    files={files}
                                    type={listGird}
                                />
                            );
                        })
                    ) : (
                        <p className="ml-3 mt-3">
                            There are no photos added yet.
                        </p>
                    )}
                </div>
            </div>

            {isLoggedIn && (
                <div className="dropdown plus-box plus-block">
                    <button
                        type="button"
                        className="btn"
                        onClick={openCloseDropUploadAndCreate}>
                        <img src={imgPluse} alt="plus" />
                    </button>
                    {dropCreateFolderAnd && (
                        <div className="dropdown-menu x-class">
                            <Link
                                to="#"
                                className="dropdown-part f-omnesMedium d-flex align-items-center"
                                data-toggle="modal"
                                data-target="#upload-modal">
                                <span
                                    className="dropdown-line"
                                    onClick={openModalUpload}>
                                    <FontAwesomeIcon
                                        icon={faImages}
                                        className="mr-3 fs21"
                                    />
                                    Upload Photos
                                </span>
                            </Link>

                            <Link
                                className="dropdown-part f-omnesMedium d-flex align-items-center"
                                to="#">
                                <span
                                    className="dropdown-line"
                                    onClick={openModalAddFolder}>
                                    <FontAwesomeIcon
                                        icon={faFolder}
                                        className="mr-3 fs21"
                                    />
                                    Create Album
                                </span>
                            </Link>
                        </div>
                    )}
                </div>
            )}

            <ModalAddAlbum />

            <ModalEditFolder />

            <ModalToDeleteFolder />

            {/*modal view deleted albums*/}
            <DeletedAlbums
                show={modalViewDeletedAlbums}
                onClose={closeModalViewDeletedAlbums}
            />
        </section>
    );
}

export default FolderSectionLibrary;
