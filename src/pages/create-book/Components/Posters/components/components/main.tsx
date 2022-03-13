import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    checkPublisher,
    GetStyleImage,
    history,
    keyGenerator,
    setMessageUser
} from 'utils/helpers';
import Standart from './types/standart';
import { UpdatePoster } from 'api/all-apis';
import { setAddUrlToStartDragImages } from 'redux/posters';
import InsetArea from './types/inset-area';
import InsetArea2 from './types/inset-area-2';
import { Link, useParams } from 'react-router-dom';
import BlockPlaceholder from 'features/block-placeholder';
import ModalUploadAlbumsPage from 'features/modal-upload-image-album-page/modal-upload-albums';
import { setOpenCreateModalAlbum } from 'redux/modals';
import ModalAddAlbum from 'pages/event-detail/modal/add-album';
import { Spinner } from 'react-bootstrap';
import { setCurrentEvent } from 'redux/events.slice';
import { DEF_URL } from 'utils/urls';
import { UM } from 'utils/user-messages';
import FolderBlocks from './folder-blocks';

interface IThsProps {
    textMode: boolean;
    posterTypes: PosterTemplate[];
    thisPoster: IPoster | undefined;
    thisEvent: IEvent | undefined;
    posterSizes: {
        width: number;
        height: number;
    };
    changeParamBackground: {
        left: number;
        top: number;
        zoom: number;
        rotate: number;
    };
    onChangeTextMode: any;
    openCloseLibraryBlock: boolean;
}

const scrollingTypes = {
    top: 'top',
    bottom: 'bottom'
};

const scrollInterval = 100;

export const posterTypeName = {
    Standart: 'Standart',
    'Inset Area': 'Inset Area',
    'Inset Area x2': 'Inset Area x2'
};

export const TextBlocksIdName = {
    block1: 'inset-area-text-block-1',
    block2: 'inset-area-text-block-2',
    block3: 'inset-area-text-block-3',
    imageID: 'inset-area-text-block-image'
};

function EditorPosterPageMainPanel({
    textMode,
    posterTypes,
    thisPoster,
    thisEvent,
    posterSizes,
    changeParamBackground,
    onChangeTextMode,
    openCloseLibraryBlock
}: IThsProps) {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: IAuth) => state.sign.user.profile);

    const imageURL = useSelector(
        (state: IPosters) => state.Posters.editorPage.imageURL
    );
    function openClosePhotoEditor(e: boolean) {
        onChangeTextMode(e);
    }
    const PosterTypeNames: any = {
        Standart: (
            <Standart
                posterSizes={posterSizes}
                thisPoster={thisPoster}
                openClosePhotoEditor={openClosePhotoEditor}
                changeParamBackground={changeParamBackground}
            />
        ),
        'Inset Area': (
            <InsetArea
                posterSizes={posterSizes}
                thisPoster={thisPoster}
                openClosePhotoEditor={openClosePhotoEditor}
                changeParamBackground={changeParamBackground}
            />
        ),
        'Inset Area x2': (
            <InsetArea2
                posterSizes={posterSizes}
                thisPoster={thisPoster}
                openClosePhotoEditor={openClosePhotoEditor}
                changeParamBackground={changeParamBackground}
            />
        ),
        default: (
            <BlockPlaceholder
                width={450}
                height={600}
                borderRadius={5}
                status={true}
                count={1}
                className="d-block m-auto"
            />
        )
    };

    const [types, setTypes] = useState<string | undefined>('');
    const [thisAlbums, setThisAlbums] = useState<OneAlbum[]>([]);
    const [selectAlbumStatus, setSelectedAlbumStatus] = useState(false);
    const [selectingAlbum, setSelectingAlbum] = useState<IAlbumFiles[]>([]);
    const [selectingFolderName, setSelectingFolderName] = useState<string>('');

    const currentEvent = useSelector(
        (state: IEvents) => state.events.currentEvent
    );
    useEffect(() => {
        setThisAlbums(thisEvent ? thisEvent.albums : []);
    }, [thisEvent]);

    const middleMainClassName = useCallback(() => {
        return textMode ? 'middle-main-textmode' : 'middle-main';
    }, [textMode]);

    useEffect(() => {
        setTypes(thisPoster?.template.name);
    }, [thisPoster]);

    const handleChange = (event: any) => {
        setTypes(event.target.value);
    };

    const [openModalUpLoadImage, setOpenModalUpLoadImage] =
        useState<boolean>(false);
    const [uploadingAlbumId, setUploadingAlbumId] = useState<string>('');

    function FolderOpen(res: any, folderName: string, albumID: string) {
        setSelectedAlbumStatus(true);
        const files = res.data.data.items;
        setSelectingAlbum(files);
        setSelectingFolderName(folderName);

        setUploadingAlbumId(albumID);
    }

    function closeOpeningAlbum() {
        setSelectingAlbum([]);
        setSelectingFolderName('');
        setSelectedAlbumStatus(false);
    }

    function startDrag(e: any) {
        const imageUrl = e.target.getAttribute('data-image-url');
        dispatch(setAddUrlToStartDragImages(imageUrl));
    }

    function startScrollingSite(status: string) {
        window.scrollTo({
            top:
                status === scrollingTypes.top
                    ? window.scrollY - 7
                    : window.scrollY + 7,
            behavior: 'smooth'
        });
    }

    function dragOver(e: any) {
        const scrollSection = window.scrollY + scrollInterval;
        const scrollYAndWindowHeight = window.scrollY + window.innerHeight;
        if (e.pageY > window.scrollY && e.pageY < scrollSection) {
            startScrollingSite(scrollingTypes.top);
        }
        if (
            e.pageY > scrollYAndWindowHeight - scrollInterval &&
            e.pageY < scrollYAndWindowHeight
        ) {
            startScrollingSite(scrollingTypes.bottom);
        }
    }

    window.ondragover = dragOver;

    const [loadingSave, setLoadingSave] = useState(false);
    function saveChanges() {
        setLoadingSave(true);
        startSave(function () {
            setLoadingSave(false);
            dispatch(setMessageUser(UM.POSTER_SAVING));
        });
    }

    function startSave(callBack: any) {
        const posterText: { content: string; style: string }[] = [];
        const texts = document.querySelectorAll('.front-back-book--text');
        texts.forEach((child: any) => {
            const text: string = child.innerText;
            const style: string = child.getAttribute('style');
            if (text && style) {
                posterText.push({
                    content: text,
                    style
                });
            }
        });
        const data = {
            name: thisPoster?.name,
            description: thisPoster?.description,
            params: {
                template: {
                    style: ''
                },
                images: {
                    style: '',
                    items: [
                        {
                            tag: 'image0',
                            style: GetStyleImage(
                                imageURL,
                                TextBlocksIdName.imageID
                            ),
                            texts: []
                        }
                    ]
                },
                texts: posterText
            },
            isAvailable: true
        };
        dispatch(setMessageUser(UM.P_W));
        UpdatePoster(thisPoster ? thisPoster.id : '', data)
            .then((res) => {
                callBack(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function openModalUploadImageAlbum() {
        setOpenModalUpLoadImage(true);
    }

    function closeModalUploadImageAlbum() {
        setOpenModalUpLoadImage(false);
    }

    function openModalToAddAlbum() {
        dispatch(setMessageUser(UM.P_W));
        dispatch(setCurrentEvent(thisEvent));
        dispatch(setOpenCreateModalAlbum(true));
    }

    const [loadingPreview, setLoadingPreview] = useState(false);
    function startPreviewPoster() {
        setLoadingPreview(true);
        startSave(function (res: any) {
            setLoadingPreview(false);
            const data = res.data.data;
            history.push(`${DEF_URL.POSTER_PREVIEW}/${data.item.id}`);
        });
    }

    const iAmCreator =
        checkPublisher(currentEvent.userId, userInfo?.id) ||
        thisEvent?.allowUserUpload;
    return (
        <Fragment>
            <div className={middleMainClassName()}>
                <div className="main-content">
                    <div>
                        <div className="text-mode-head d-flex align-items-end justify-content-between text-left">
                            <div className="dropdown drop-book-editor main-drop mr-3">
                                {/*<label*/}
                                {/*    htmlFor="dropPosterType"*/}
                                {/*    className="d-block label-book-editor">*/}
                                {/*    Poster Type*/}
                                {/*</label>*/}
                                {/*<FormControl className={classes.formControl}>*/}
                                {/*    <Select*/}
                                {/*        labelId="demo-simple-select-label"*/}
                                {/*        id="demo-simple-select"*/}
                                {/*        value={types ? types : ''}*/}
                                {/*        onChange={handleChange}>*/}
                                {/*        {posterTypes.map(*/}
                                {/*            (e: PosterTemplate) => {*/}
                                {/*                return (*/}
                                {/*                    <MenuItem*/}
                                {/*                        key={keyGenerator(10)}*/}
                                {/*                        value={e.name}>*/}
                                {/*                        {e.name}*/}
                                {/*                    </MenuItem>*/}
                                {/*                );*/}
                                {/*            }*/}
                                {/*        )}*/}
                                {/*    </Select>*/}
                                {/*</FormControl>*/}
                            </div>
                            {/*<span className="alert-text-mode">*/}
                            {/*    <i className="fas fa-info-circle mr-2 fs20" />{' '}*/}
                            {/*    You are in the ‘text mode’. To add photos and*/}
                            {/*    edit layout, please exit ‘text mode’ first.*/}
                            {/*</span>*/}
                        </div>
                    </div>
                    <div className="mt-4 mb-4" id="middle-main">
                        {PosterTypeNames[types ? types : 'default']}
                    </div>
                    <div className="bottom-btns">
                        <div>
                            {/* <a href="#" className=" btn-bottom ">
                                <span className="d-flex align-items-center">
                                    <i className="far fa-sticky-note"></i>
                                    <span className="btn-text">
                                        Save as DRAFT
                                    </span>
                                </span>
                            </a> */}
                        </div>
                        <div>
                            <Link to="#" className="btn-bottom mr-3">
                                <span
                                    className="d-flex align-items-center"
                                    onClick={startPreviewPoster}>
                                    {loadingPreview ? (
                                        <Spinner
                                            animation="border"
                                            variant="dark"
                                            className="mr-2"
                                        />
                                    ) : (
                                        <i className="fas fa-eye" />
                                    )}
                                    <span className="btn-text">Preview</span>
                                </span>
                            </Link>
                            <button
                                className="btn btn-save cursor-pointer"
                                onClick={saveChanges}>
                                <span className="d-flex align-items-center">
                                    {loadingSave ? (
                                        <Spinner
                                            animation="border"
                                            variant="light"
                                            className="mr-2"
                                        />
                                    ) : (
                                        <i className="fas fa-print" />
                                    )}
                                    Save
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
                <div
                    className="main-footer trans"
                    style={{ bottom: openCloseLibraryBlock ? '0' : '-400px' }}>
                    <div className="text-right">
                        <span className="txt-gray folder-open">
                            <span
                                className="library-link cursor-pointer"
                                onClick={closeOpeningAlbum}>
                                Library {selectingFolderName && '>'}
                            </span>{' '}
                            {selectingFolderName}
                        </span>
                    </div>
                    <div>
                        <h4 className="txt-drad-drop mb-1">
                            DRAG & DROP PHOTOS
                        </h4>
                        {selectAlbumStatus ? (
                            <p className="txt-gray folder-open">
                                {selectingAlbum.length} photos in{' '}
                                <span className="c-black">
                                    ‘{selectingFolderName}’
                                </span>
                            </p>
                        ) : (
                            <p className="txt-gray folder-close">
                                Select album to add photos
                            </p>
                        )}
                        {thisEvent ? (
                            selectAlbumStatus ? (
                                <div className=" drag-drop-block ">
                                    <ul className="list-folders mb-3">
                                        {selectingAlbum.map(
                                            (file: IAlbumFiles) => {
                                                return (
                                                    <li
                                                        key={keyGenerator(30)}
                                                        className="list-folder-item">
                                                        <span
                                                            className="list-folder-link"
                                                            draggable
                                                            onDragStart={
                                                                startDrag
                                                            }
                                                            data-image-url={
                                                                file.url
                                                            }
                                                            style={{
                                                                backgroundImage: `url(${file.url})`
                                                            }}
                                                        />
                                                    </li>
                                                );
                                            }
                                        )}
                                    </ul>
                                    <div className="drag-upload">
                                        <div className="btn-upload-block">
                                            <span
                                                className="btn-img btn-img-upload mb-0"
                                                onClick={
                                                    openModalUploadImageAlbum
                                                }>
                                                <i className="fas fa-upload mr-1" />
                                                <span className="btn-text">
                                                    Upload Photos
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <Fragment>
                                    <div
                                        className="scroll-horizontal scroll-album-list"
                                        data-mcs-theme="dark">
                                        <ul className="list-album mb-3 folder-close">
                                            {thisAlbums.map(
                                                (album: OneAlbum) => {
                                                    return (
                                                        <FolderBlocks
                                                            key={keyGenerator(
                                                                30
                                                            )}
                                                            album={album}
                                                            folderOpen={
                                                                FolderOpen
                                                            }
                                                        />
                                                    );
                                                }
                                            )}
                                            {iAmCreator && (
                                                <li
                                                    className="list-album-item"
                                                    onClick={
                                                        openModalToAddAlbum
                                                    }>
                                                    <div className="list-album-link">
                                                        <i className="fas fa-plus" />
                                                        Create Album
                                                    </div>
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                </Fragment>
                            )
                        ) : (
                            <BlockPlaceholder
                                width={123}
                                height={123}
                                borderRadius={5}
                                status={true}
                                count={6}
                                className="m-0 mr-2 mt-3"
                            />
                        )}
                    </div>
                </div>
            </div>
            <ModalUploadAlbumsPage
                albumID={uploadingAlbumId}
                closeModal={closeModalUploadImageAlbum}
                showHide={openModalUpLoadImage}
            />
            <ModalAddAlbum />
        </Fragment>
    );
}

export default EditorPosterPageMainPanel;
