import React, { useCallback, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { modalOpenCloseEdit, setImageEdit } from 'redux/edit-image';
import _st from 'assets/css/edit-images.module.css';
import Cropper from 'react-easy-crop';
import getCroppedImg from './help';
import { modalOpenClose, setImage } from 'redux/preveiw-image';

interface IThisProps {
    saveChanges: (image: string, id: string) => void;
    deleteImage: (id: string) => void;
}

function EditImageForUpload({ saveChanges, deleteImage }: IThisProps) {
    const dispatch = useDispatch();
    const thisModal = useSelector((state: IEditImage) => state.editImage);

    const [imageUrl, setImageUrl] = useState<string>('');

    useEffect(() => {
        setImageUrl(thisModal.image?.url || '');
    }, [thisModal]);

    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [rotation, setRotation] = useState(0);
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<{
        height: number;
        width: number;
        x: number;
        y: number;
    } | null>(null);

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const showCroppedImage = async () => {
        try {
            const croppedImage: any = await getCroppedImg(
                imageUrl,
                croppedAreaPixels,
                rotation
            );
            return croppedImage;
        } catch (e) {
            console.error(e);
        }
    };

    const save = () => {
        showCroppedImage().then((res) => {
            closeModal();
            saveChanges(res, thisModal.image?.id || '');
        });
    };

    const viewPhoto = () => {
        showCroppedImage().then((res) => {
            dispatch(modalOpenClose(true));
            dispatch(
                setImage({
                    name: thisModal.image?.name,
                    url: res
                })
            );
        });
    };

    function closeModal() {
        dispatch(modalOpenCloseEdit(false));
        dispatch(setImageEdit(null));
        setImageUrl('');
        setZoom(1);
        setRotation(0);
        setCrop({ x: 0, y: 0 });
        setCroppedAreaPixels(null);
    }

    function deleteImages() {
        closeModal();
        deleteImage(thisModal.image?.id || '');
    }

    const imageSize = Number(thisModal.image?.size?.size);
    return (
        <Modal
            size="xl"
            centered={true}
            show={thisModal.modalOpenClose}
            onHide={closeModal}
            className="modal-bg-blur-effect modal-Content">
            <Modal.Body className="p-0">
                <div className={_st.modalBody}>
                    <div className={_st.cropBlock}>
                        <div className={_st.cropperBlock}>
                            <Cropper
                                image={imageUrl}
                                crop={crop}
                                rotation={rotation}
                                zoom={zoom}
                                aspect={4 / 3}
                                onCropChange={setCrop}
                                onRotationChange={setRotation}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                            />
                        </div>
                    </div>
                    <div className={_st.infoBlock}>
                        <div>
                            <div className="d-flex justify-content-end mt-2">
                                <i
                                    className="fas fa-times cursor-pointer"
                                    onClick={closeModal}
                                />
                            </div>
                            <p className={_st.functionName}>Zoom In/Out</p>
                            <div className="mt-3 d-flex justify-content-between align-items-center">
                                <input
                                    style={{ width: 280 }}
                                    type="range"
                                    value={zoom}
                                    min={1}
                                    max={10}
                                    className={_st.slider}
                                    onChange={(e) =>
                                        setZoom(e.target.valueAsNumber)
                                    }
                                />
                                {zoom.toFixed()}x
                            </div>
                            <p className={_st.functionName}>Rotate</p>
                            <div className="mt-3 d-flex justify-content-between align-items-center">
                                <input
                                    style={{ width: 280 }}
                                    type="range"
                                    min={0}
                                    value={rotation}
                                    max={360}
                                    className={_st.slider}
                                    onChange={(e) =>
                                        setRotation(e.target.valueAsNumber)
                                    }
                                />
                                {rotation}
                            </div>
                            <div className="mt-4">
                                <button
                                    className="btn btn-outline-danger"
                                    onClick={viewPhoto}>
                                    <i className="fas fa-eye mr-2" />
                                    Preview
                                </button>
                            </div>
                        </div>
                        <div>
                            <div className="d-flex justify-content-between align-items-center">
                                <button
                                    className="btn btn-danger bgc-red border-0"
                                    onClick={save}>
                                    <i className="fas fa-eye mr-2" />
                                    Save Changes
                                </button>
                                <span
                                    className="c-red cursor-pointer"
                                    onClick={deleteImages}>
                                    <i className="fas fa-trash mr-2" />
                                    Delete Image
                                </span>
                            </div>
                            <div className="d-flex mt-3">
                                <div className="mr-3">
                                    <p className={_st.infoTitle}>Size</p>
                                    <p className={_st.infoText}>
                                        {imageSize}MB
                                    </p>
                                </div>
                                <div className="mr-3">
                                    <p className={_st.infoTitle}>
                                        Original Resolution
                                    </p>
                                    <p className={_st.infoText}>
                                        {thisModal?.image?.size?.width}x
                                        {thisModal?.image?.size?.height}
                                    </p>
                                </div>
                                <div>
                                    <p className={_st.infoTitle}>
                                        Cropped Resolution
                                    </p>
                                    <p className={_st.infoText}>
                                        {croppedAreaPixels?.width}x
                                        {croppedAreaPixels?.height}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default EditImageForUpload;
