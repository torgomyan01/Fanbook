import React, { useEffect, useRef, useState } from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { faFolder } from '@fortawesome/free-regular-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { clearFilesModalUpload, ModalToUploadImage } from 'redux/modals';
import { modalOpenClose, setImage } from 'redux/preveiw-image';
import {
    createStyles,
    FormControl,
    FormHelperText,
    InputLabel,
    makeStyles,
    MenuItem,
    Select,
    Theme
} from '@material-ui/core';
import {
    GetEventPublicPrivate,
    keyGenerator,
    setMessageUser,
    startUploadFiles,
    UploadAndEdit
} from 'utils/helpers';
import { button } from 'aws-amplify';
import CrateAlbumModalUploadModal from './crate-album-modal-upload-modal';
import { UM } from 'utils/user-messages';
import ImageBlockView from './components/image';
import EditImageForUpload from '../edit-image/edit-image-for-upload';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: { display: 'block', marginTop: theme.spacing(2) },
        formControl: { margin: theme.spacing(1), minWidth: 200 }
    })
);

let AllImages: any[] = [];

interface IImage {
    id: string;
    url: string;
    name: string;
    size: {
        width: number;
        height: number;
        size: number;
    };
}

function ModalUpload() {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: IAuth) => state.sign.user.profile);
    const [openClose, setOpenClose] = useState(false);
    const modalType: any = useSelector(
        (state: AllModalSite) => state.AllModalSiteTwo.modalToUploadImagesAlbum
    );
    const [albums, setAlbums] = useState<IAlbum[]>([]);
    const [loading, setLoading] = useState(false);
    const [AllUploadedImages, setAllUploadedImages] = useState<IImage[]>([]);

    const event = useSelector(
        (state: AllModalSite) => state.AllModalSiteTwo.eventToModal
    );
    const [loadingAlbums, setLoadingAlbums] = useState<boolean>(false);
    const [checkedImages, setCheckedImages] = useState<string[]>([]);

    useEffect(() => {
        setLoadingAlbums(true);
        GetEventPublicPrivate(
            event.id,
            event.eventStatus,
            {
                'append[0]': 'albums'
            },
            function (res: any) {
                const myAlbums = res.data.data.item.albums?.filter(
                    (album: OneAlbum) => album.userId === userInfo?.id
                );
                setAlbums(myAlbums);
                setLoadingAlbums(false);
            }
        );
    }, [event]);

    // FOR SELECT
    const classes = useStyles();
    const [folderID, setFolderId] = React.useState<any | number>('');
    const [open, setOpen] = React.useState(false);

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const value: any = event.target.value;
        setFolderId(value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    useEffect(() => {
        if (modalType === UploadAndEdit.upload) {
            setOpenClose(true);
        }
        if (modalType === UploadAndEdit.close) {
            setOpenClose(false);
        }
    }, [modalType]);

    function closeModal() {
        dispatch(ModalToUploadImage(UploadAndEdit.close));
        dispatch(clearFilesModalUpload([]));
    }

    function imageWidthHeight(file: any, url: string, name: string) {
        const size = file.size / 1024 / 1024;
        const img = new Image();
        img.onload = function <imageObj>() {
            const image = {
                id: keyGenerator(30),
                url,
                name,
                size: {
                    width: this.width,
                    height: this.height,
                    size: size.toFixed(3)
                }
            };
            setAllUploadedImages((oldArray: any[]) => [...oldArray, image]);
        };
        img.src = URL.createObjectURL(file);
    }

    function upLoadFile(e: any) {
        const file = e.target.files;
        AllImages = file;
        startImagesView(file);
    }

    function startImagesView(file: any) {
        setLoading(true);
        if (file) {
            setCheckedImages([]);
            setAllUploadedImages([]);

            for (let i = 0; i < file.length; i++) {
                if (
                    file[i].type === 'image/jpeg' ||
                    file[i].type === 'image/jpg' ||
                    file[i].type === 'image/png'
                ) {
                    const reader = new FileReader();
                    reader.onloadend = function (result: any) {
                        imageWidthHeight(
                            file[i],
                            result.target?.result,
                            file[i].name
                        );

                        //end loop to uploaded
                        if (i === file.length - 1) {
                            setLoading(false);
                            dispatch(ModalToUploadImage(UploadAndEdit.edit));
                        }
                    };
                    reader.readAsDataURL(file[i]);
                }
            }
        }
    }

    const [alertForFolder, setAlertForFolder] = useState<boolean>(false);
    const [choseFile, setChoseFile] = useState<boolean>(false);

    function uploadAllPhotos() {
        if (folderID) {
            if (AllUploadedImages.length > 0) {
                setLoading(true);
                StartUploadAllFimes();
            } else {
                setChoseFile(true);
                setTimeout(() => {
                    setChoseFile(false);
                }, 300);
            }
        } else {
            setAlertForFolder(true);
            setTimeout(() => {
                setAlertForFolder(false);
            }, 300);
        }

        function StartUploadAllFimes() {
            dispatch(setMessageUser(UM.P_W));
            const uploadedArray: any = [];
            AllUploadedImages.map((images: any, index: number) => {
                uploadedArray.push(
                    startUploadFiles(
                        folderID,
                        images.name,
                        images.url,
                        index,
                        AllUploadedImages
                    )
                );

                if (index === AllUploadedImages.length - 1) {
                    startUploadedPromise(uploadedArray);
                }
            });
        }
    }

    function startUploadedPromise(files: any) {
        Promise.all(files);
    }

    function viewPhoto(e: any) {
        dispatch(modalOpenClose(true));
        dispatch(setImage(e));
    }

    const uploadBlock = useRef<any>(null);

    function dragImage(e: any) {
        e.preventDefault();
        e.stopPropagation();
        startImagesView(e.dataTransfer.files);
        uploadBlock.current.classList.remove('enter');
    }

    function stopProp(e: any) {
        e.preventDefault();
        e.stopPropagation();
    }

    function thisDragEnter(e: any) {
        e.preventDefault();
        e.stopPropagation();
        uploadBlock.current?.classList.add('enter');
    }

    const [modalCreateAlbum, setModalCreateAlbum] = useState<boolean>(false);
    function openModalCrateAlbum() {
        setModalCreateAlbum(true);
    }

    function getNewAlbum(album: OneAlbum) {
        setModalCreateAlbum(false);
        setAlbums((oldArray: any[]) => [...oldArray, album]);
    }

    function CheckImages(id: string, res: boolean) {
        const __oldImages = [...checkedImages];
        if (res) {
            __oldImages.splice(__oldImages.indexOf(id), 1);
        } else {
            __oldImages.push(id);
        }
        setCheckedImages(__oldImages);
    }

    function deleteCheckingPhotos() {
        const checkers = [...checkedImages];
        const _images = [...AllUploadedImages];
        checkers.map((id: string) => {
            const _img = _images.find((img: IImage) => img.id === id);
            _img && _images.splice(_images.indexOf(_img), 1);
        });
        setAllUploadedImages(_images);
        setCheckedImages([]);
    }

    function saveChanges(res: string, id: string) {
        const getImg = (img: IImage) => img.id === id;
        const _images = [...AllUploadedImages];
        const _img = { ...(_images.find(getImg) || {}) };
        const _imgIndex = _images.findIndex(getImg);
        _img.url = res;
        _images[_imgIndex] = _img as IImage;
        setAllUploadedImages(_images);
    }

    function deleteImage(id: string) {
        const _images = [...AllUploadedImages];
        const _imgIndex = _images.findIndex((img: IImage) => img.id === id);
        _images.splice(_imgIndex, 1);
        setAllUploadedImages(_images);
    }

    return (
        <>
            <Modal
                size="xl"
                show={openClose}
                onHide={closeModal}
                className="modal-bg-blur-effect"
                animation={true}>
                <Modal.Header closeButton>
                    <Modal.Title className="d-flex justify-content-between align-items-center w-100">
                        <span className="font-bold editModalTitle">
                            Upload Photos
                        </span>
                        <div className="d-flex fs16 mr-4">
                            {checkedImages.length > 0 && (
                                <span
                                    className="c-red cursor-pointer"
                                    onClick={deleteCheckingPhotos}>
                                    <i className="fas fa-trash-alt mr-2" />
                                    Delete
                                </span>
                            )}
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modalType === UploadAndEdit.upload ? (
                        <div className="row mb-5" style={{ maxWidth: '100%' }}>
                            <div className="col-12">
                                <div
                                    ref={uploadBlock}
                                    className="upload-box text-center"
                                    onDragEnter={thisDragEnter}
                                    onDrag={stopProp}
                                    onDragStart={stopProp}
                                    onDragEnd={stopProp}
                                    onDragOver={stopProp}
                                    onDragLeave={stopProp}
                                    onDrop={dragImage}>
                                    <h2 className="f-myriadproreg fs20 mb-4">
                                        Attended the event?{' '}
                                        <span>Drag &amp; Drop photos here</span>
                                    </h2>
                                    <p className="c-gray fs20 mb-4 f-myriadproreg">
                                        or
                                    </p>

                                    <form
                                        action="#"
                                        className={
                                            choseFile
                                                ? 'form-to-chose-file true'
                                                : 'orm-to-chose-file false'
                                        }>
                                        <label
                                            htmlFor="uploadPhotoLibrary"
                                            className={`btn border-0 upload-red-btn d-inline-block text-center position-relative c-white fs17 f-myriadproreg mb-0 ${
                                                albums.length === 0 &&
                                                'disabled'
                                            }`}
                                            data-toggle="modal"
                                            data-target="#upload-photo-modal">
                                            <input
                                                type="file"
                                                onChange={upLoadFile}
                                                multiple
                                                disabled={albums.length === 0}
                                                accept="image/jpeg, image/jpg, image/png"
                                                id="uploadPhotoLibrary"
                                                style={{ display: 'none' }}
                                            />
                                            <i className="fas fa-upload mr-2" />
                                            Upload Photos
                                        </label>
                                    </form>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div
                            className="modal-body content-section"
                            ref={uploadBlock}
                            onDragEnter={thisDragEnter}
                            onDrag={stopProp}
                            onDragStart={stopProp}
                            onDragEnd={stopProp}
                            onDragOver={stopProp}
                            onDragLeave={stopProp}
                            onDrop={dragImage}
                            style={{ height: '40rem', overflow: 'auto' }}>
                            <div
                                className="scroll-vertical"
                                data-mcs-theme="dark">
                                <div className="container-fluid">
                                    <div className="row">
                                        {AllUploadedImages.length > 0 &&
                                            AllUploadedImages.map((e: any) => {
                                                return (
                                                    <ImageBlockView
                                                        key={keyGenerator(20)}
                                                        img={e}
                                                        viewPhoto={viewPhoto}
                                                        checked={CheckImages}
                                                        checkedImages={
                                                            checkedImages
                                                        }
                                                    />
                                                );
                                            })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </Modal.Body>
                {!loadingAlbums && (
                    <Modal.Footer className="d-flex align-items-start justify-content-between">
                        <div className="d-flex justify-content-between align-items-start flex-column">
                            <div>
                                <button
                                    className="tn save-btn upload-modal_disable px-5 ml-3"
                                    onClick={openModalCrateAlbum}>
                                    Create Album
                                </button>
                            </div>
                            <FormControl className={classes.formControl}>
                                {albums.length > 0 ? (
                                    <>
                                        <InputLabel id="demo-controlled-open-select-label">
                                            <FontAwesomeIcon
                                                icon={faFolder}
                                                className="mr-2"
                                            />
                                            {albums?.length > 0
                                                ? 'Album Name'
                                                : 'No Albums'}
                                        </InputLabel>
                                        <Select
                                            labelId="folder-name-to-upload-image"
                                            id="folder-name-to-upload-image"
                                            open={open}
                                            onClose={handleClose}
                                            onOpen={handleOpen}
                                            value={folderID}
                                            onChange={handleChange}
                                            className={
                                                alertForFolder
                                                    ? 'alert-folder-select true'
                                                    : 'alert-folder-select false'
                                            }>
                                            {albums?.map((album: any) => {
                                                return (
                                                    <MenuItem
                                                        key={keyGenerator(30)}
                                                        value={album.id}>
                                                        {album.name}
                                                    </MenuItem>
                                                );
                                            })}
                                        </Select>
                                        <FormHelperText>
                                            Select From Your Albums
                                        </FormHelperText>
                                    </>
                                ) : (
                                    <p className="c-gray ml-2">
                                        Please create an <b>Album</b> to upload
                                        photos
                                    </p>
                                )}
                            </FormControl>
                        </div>

                        {modalType === UploadAndEdit.edit && (
                            <label
                                htmlFor="uploadPhotoLibrary"
                                className="btn add-btn">
                                <FontAwesomeIcon
                                    icon={faUpload}
                                    className="mr-2"
                                />
                                Add Photos
                                <input
                                    type="file"
                                    onChange={upLoadFile}
                                    multiple
                                    accept="image/jpeg, image/jpg, image/png"
                                    id="uploadPhotoLibrary"
                                    style={{ display: 'none' }}
                                />
                            </label>
                        )}

                        <button
                            type="button"
                            className={`tn save-btn upload-modal_disable ${
                                albums.length === 0 && 'disabled'
                            }`}
                            disabled={albums.length === 0}
                            onClick={uploadAllPhotos}>
                            Upload
                            {loading && (
                                <Spinner
                                    animation="border"
                                    className="ml-2"
                                    variant="light"
                                />
                            )}
                        </button>
                    </Modal.Footer>
                )}
            </Modal>
            <CrateAlbumModalUploadModal
                show={modalCreateAlbum}
                closeModal={() => {
                    setModalCreateAlbum(false);
                }}
                event={event}
                created={getNewAlbum}
            />
            <EditImageForUpload
                saveChanges={saveChanges}
                deleteImage={deleteImage}
            />
        </>
    );
}

export default ModalUpload;
