import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenCloseModalUploadPublisherCover } from 'redux/modals';
import ReactCrop from 'react-image-crop';
import { GetPublisher, UpdateProfilePublisher } from 'api/all-apis';
import { Modal, Spinner } from 'react-bootstrap';
import { setProfileData } from 'redux/publisher-profile';
import { CropImage } from 'utils/helpers';

function ModalUploadCoverPublisher() {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: IAuth) => state.sign.user.profile);
    const thisModalInfo = useSelector(
        (state: AllModalSite) => state.AllModalSiteTwo.modalPublisherCoverUpload
    );

    const [upImg, setUpImg] = useState<any>();
    const imgRef = useRef<any>();
    const previewCanvasRef: any = useRef();
    const [crop, setCrop] = useState<any>({
        unit: '%',
        width: 30,
        aspect: 16 / 9
    });
    const [completedCrop, setCompletedCrop] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleClose = () => {
        setLoading(true);
        const jpegUrl = previewCanvasRef.current.toDataURL('image/jpeg');

        if (jpegUrl) {
            UpdateProfilePublisher({
                publisherProfile: {
                    cover: jpegUrl
                }
            }).then(() => {
                setLoading(false);

                if (userInfo?.id) {
                    GetPublisher(userInfo.id).then((res) => {
                        dispatch(setProfileData(res.data.data));
                        dispatch(
                            setOpenCloseModalUploadPublisherCover({
                                publisherID: '',
                                openClose: false
                            })
                        );
                    });
                }
            });
        }
    };

    function saveImages(e: any) {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () => setUpImg(reader.result));
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    const onLoad = useCallback((img) => {
        imgRef.current = img;
    }, []);

    useEffect(() => {
        if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
            return;
        }
        const image: any = imgRef.current;
        const canvas = previewCanvasRef.current;
        CropImage(image, canvas, completedCrop);
    }, [completedCrop, previewCanvasRef]);

    function closeModalUploadCover() {
        dispatch(
            setOpenCloseModalUploadPublisherCover({
                publisherID: '',
                openClose: false
            })
        );
    }

    return (
        <Modal
            show={thisModalInfo.openClose}
            onHide={closeModalUploadCover}
            className="modal-bg-blur-effect"
            backdrop="static"
            centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    <b>Upload Your Profile Cover</b>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex justify-content-center">
                    <button className="btn btn-danger bgc-red border-0">
                        <label
                            htmlFor="upload-cover-modal-publisher"
                            className="cursor-pointer m-0">
                            <i className="fas fa-upload mr-2" />
                            Upload
                        </label>
                    </button>
                </div>
                <input
                    type="file"
                    id="upload-cover-modal-publisher"
                    onChange={saveImages}
                    className="d-none"
                />
                <ReactCrop
                    src={upImg}
                    onImageLoaded={onLoad}
                    crop={crop}
                    onChange={(c) => setCrop(c)}
                    onComplete={(c) => setCompletedCrop(c)}
                    className="rounded mt-3"
                />
                <div className="d-none">
                    <canvas
                        ref={previewCanvasRef}
                        style={{
                            width: Math.round(
                                imgRef?.current?.naturalWidth ?? 0
                            ),
                            height: Math.round(
                                imgRef?.current?.naturalHeight ?? 0
                            )
                        }}
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button
                    className="btn btn-danger bgc-red border-0"
                    onClick={handleClose}>
                    Save Changes
                    {loading && <Spinner animation="border" variant="light" />}
                </button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalUploadCoverPublisher;
