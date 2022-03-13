import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import ModalUpload from 'features/upload-photos/modal-upload';
import { useDispatch } from 'react-redux';
import { ModalToUploadImage } from 'redux/modals';
import { UploadAndEdit } from 'utils/helpers';

function UpLoadPhotoSection() {
    const dispatch = useDispatch();
    function openModalUpload() {
        dispatch(ModalToUploadImage(UploadAndEdit.upload));
    }
    return (
        <>
            <div className="row mb-5 mr-0">
                <div className="col-12" style={{ paddingRight: 0, border: 0 }}>
                    <div className="upload-box text-center">
                        <h2 className="f-myriadproreg fs20 mb-4">
                            Attended the event?{' '}
                            <span>Drag &amp; Drop photos here</span>
                        </h2>
                        <p className="c-gray fs20 mb-4 f-myriadproreg">or</p>
                        <button
                            type="button"
                            onClick={openModalUpload}
                            className="btn upload-red-btn d-inline-block text-center position-relative c-white fs17 f-myriadproreg mb-0"
                            data-toggle="modal"
                            data-target="#upload-photo-modal">
                            <FontAwesomeIcon
                                icon={faUpload}
                                className="upLoadPhoto mr-2"
                            />
                            Upload Photos
                        </button>
                    </div>
                </div>
            </div>

            <ModalUpload />
        </>
    );
}

export default UpLoadPhotoSection;
