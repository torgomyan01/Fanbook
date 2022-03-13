import React from 'react';
import { button } from 'aws-amplify';
import { modalOpenCloseEdit, setImageEdit } from 'redux/edit-image';
import { useDispatch } from 'react-redux';

declare interface IImage {
    name: string;
    url: string;
    id: string;
}

interface IThisProps {
    viewPhoto: (img: IImage) => void;
    img: IImage;
    checked: (id: string, res: boolean) => void;
    checkedImages: string[];
}

function ImageBlockView({
    viewPhoto,
    img,
    checked,
    checkedImages
}: IThisProps) {
    const dispatch = useDispatch();
    const checkedThisImage = checkedImages.some((id: string) => img.id === id);
    function goToEditor() {
        dispatch(modalOpenCloseEdit(true));
        dispatch(setImageEdit(img));
    }
    return (
        <div className="col-xl-3 col-lg-4 col-sm-6 col-12 mb-xl-0 my-col mt-2 mb-2">
            <div className="content-box trans">
                <div
                    className="img-box"
                    style={{
                        backgroundImage: `url(${img.url})`
                    }}>
                    <span
                        className="check-icon c-blue"
                        onClick={() => checked(img.id, checkedThisImage)}>
                        {checkedThisImage && (
                            <i className="fas fa-check-circle" />
                        )}
                    </span>
                </div>
                <div className="img-name">
                    <span className="f-omnesMedium">{img.name}</span>
                </div>
                <div className="content-box_txt">
                    <button
                        type="button"
                        onClick={() => viewPhoto(img)}
                        className="preview-btn text-center d-inline-block fs16 c-black f-myriadproreg trans d-flex justify-content-center align-items-center">
                        <i className="fas fa-eye mr-2" />
                        Preview
                    </button>
                    <button
                        type="button"
                        className="edit-btn text-center d-inline-block fs16 c-black f-myriadproreg trans"
                        data-toggle="modal"
                        data-target="#edit-photo-modal"
                        onClick={goToEditor}>
                        <i className="fas fa-pen mr-3" />
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ImageBlockView;
