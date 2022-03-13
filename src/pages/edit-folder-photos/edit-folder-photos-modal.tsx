import React, { ReactNode, useCallback, useMemo } from 'react';
import deleteIcon from 'assets/images/settings/delete-icon.png';
import eyeIcon from 'assets/images/eye-icon.png';
import moveIcon from 'assets/images/move-down.png';
import editIcon from 'assets/images/edit-blue-icon.png';
import { ImageItem } from './components/image-item';
import { useDispatch, useSelector } from 'react-redux';
import {
    handleSelectForBatchActions,
    handleUploadPhotoIntoFolder
} from 'redux/edit-folder-images.slice';
import { useHistory, useLocation } from 'react-router-dom';
import { keyGenerator } from 'utils/helpers';

declare interface actionType {
    image: ReactNode;
    name: string;
    style: any;
    event?: () => void;
}
export const EditFolderPhotosModal = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const history = useHistory();
    const images = useSelector(
        (state: EditFolderPhotosState) => state.editFolderImages.images
    );
    const actions: actionType[] = useMemo(
        () => [
            {
                event: () => {},
                style: {
                    cursor: 'pointer'
                },
                name: 'Move',
                image: <img src={moveIcon} alt="move" className="ml-2" />
            },
            {
                event: () => {},
                style: {
                    cursor: 'pointer'
                },
                name: 'Preview',
                image: <img src={eyeIcon} alt="preview" className="ml-2" />
            },
            {
                event: () => {},
                style: {
                    cursor: 'pointer'
                },
                name: 'Edit',
                image: <img src={editIcon} alt="preview" className="ml-2" />
            },
            {
                event: () => {},
                style: {
                    cursor: 'pointer'
                },
                name: 'Delete',
                image: (
                    <img
                        src={deleteIcon}
                        alt="delete"
                        className="delete-icon ml-2"
                    />
                )
            },
            {
                event: () => {
                    history.push(location.pathname);
                },
                style: {
                    cursor: 'pointer'
                },
                name: 'Exit',
                image: <i className="fas fa-times ml-2 font-light" />
            }
        ],
        [history, location]
    );
    const handleUpload = (e: any) => {
        dispatch(handleUploadPhotoIntoFolder(e.target.files[0]));
    };
    const handleSelectImage = (image: folderImageType) => {
        dispatch(handleSelectForBatchActions(image));
    };
    const renderModalActions = useCallback(() => {
        return (
            <>
                {actions.map((action, idx) => {
                    return (
                        <li
                            className="mr-4 f-myriadproreg fs15"
                            key={keyGenerator(40)}>
                            <span
                                className="move-bnt c-black"
                                style={{ ...action.style }}
                                onClick={action.event}>
                                {action.name}
                                {action.image}
                            </span>
                        </li>
                    );
                })}
            </>
        );
    }, [actions]);
    return (
        <div
            className="modal fade show edit-folder-modal"
            id="edit-folder-modal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="b-bottom w-100 d-flex align-items-center justify-content-between">
                            <h2 className="upload-modal_title f-omnesMedium">
                                Edit Album Photos
                            </h2>
                            <ul className="d-flex align-items-center mb-0">
                                {renderModalActions()}
                            </ul>
                        </div>
                    </div>
                    <div className="modal-body content-section">
                        <div
                            className="scroll-vertical overflow-y-scroll"
                            data-mcs-theme="dark">
                            <div className="container-fluid">
                                <div className="row">
                                    {images.map((image) => {
                                        return (
                                            <div
                                                className="col-xl-2 col-lg-4 col-sm-6 col-12 mb-xl-0 my-col mb-2"
                                                key={keyGenerator(40)}
                                                onClick={() =>
                                                    handleSelectImage(image)
                                                }>
                                                <ImageItem
                                                    src={image.src}
                                                    name={image.name}
                                                    isSelected={
                                                        image.isSelected
                                                    }
                                                    id={image.id}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer d-flex align-items-center justify-content-between">
                        <div
                            className="btn add-btn"
                            style={{ cursor: 'pointer' }}>
                            <label
                                htmlFor="upload_photo_into_folder"
                                style={{ cursor: 'pointer' }}>
                                <i className="fas fa-upload mr-3" /> Add Photos
                            </label>
                            <input
                                type="file"
                                hidden
                                id="upload_photo_into_folder"
                                onChange={handleUpload}
                            />
                        </div>
                        <button
                            type="button"
                            className="btn save-btn upload-modal_disable">
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
