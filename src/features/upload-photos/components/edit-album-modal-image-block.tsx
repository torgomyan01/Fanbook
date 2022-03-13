import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { modalOpenClose, setImage } from 'redux/preveiw-image';
import { modalOpenCloseEdit, setImageEdit } from 'redux/edit-image';
import { keyGenerator } from 'utils/helpers';

interface IThisProps {
    image: IAlbumFiles;
    checkedThis: any;
    checkoutArray: { imageID: string }[];
}

function EditAlbumModalImageBlock({
    image,
    checkedThis,
    checkoutArray
}: IThisProps) {
    const dispatch = useDispatch();

    function viewPhoto(e: any) {
        e.preventDefault();
        dispatch(modalOpenClose(true));
        dispatch(
            setImage({
                name: image.name,
                url: image.url
            })
        );
    }
    function openModalEditImages() {
        const newImage = new Image();
        newImage.src = image.url;
        newImage.crossOrigin = 'anonymous';
        newImage.addEventListener('load', function () {
            const canvas = document.createElement('canvas');
            const ctx: any = canvas.getContext('2d');
            canvas.width = newImage.naturalWidth;
            canvas.height = newImage.naturalHeight;
            ctx.drawImage(newImage, 0, 0);
            const img = canvas.toDataURL('image/jpg');
            const imageObj = {
                id: keyGenerator(30),
                url: img,
                name: image.name,
                size: {
                    width: 500,
                    height: 500,
                    size: 5
                }
            };
            dispatch(modalOpenCloseEdit(true));
            dispatch(setImageEdit(imageObj));
        });
    }

    const [thisChecked, setThisChecked] = useState(false);

    useEffect(() => {
        const viewThisStatus = checkoutArray.some(
            (img) => img.imageID === image.id
        );
        setThisChecked(viewThisStatus);
    }, [checkoutArray]);

    function startSelected() {
        checkedThis(image.id);
        setThisChecked(!thisChecked);
    }

    return (
        <div className="col-xl-3 col-lg-4 col-sm-6 col-12 mb-xl-0 my-col mt-2 mb-2">
            <div className="content-box trans">
                <div
                    className="img-box"
                    onClick={startSelected}
                    style={{
                        backgroundImage: `url(${image.url})`
                    }}>
                    <span className="check-icon cursor-pointer">
                        {thisChecked && (
                            <i className="fas fa-check-circle c-blue" />
                        )}
                    </span>
                </div>
                <div className="img-name">
                    <span className="f-omnesMedium">{image.name}</span>
                </div>
                <div className="content-box_txt">
                    <button
                        type="button"
                        onClick={viewPhoto}
                        data-name={'Test'}
                        className="preview-btn text-center d-inline-block fs16 c-black f-myriadproreg trans d-flex justify-content-center align-items-center">
                        <i className="far fa-eye mr-2 mCS_img_loaded" />
                        Preview
                    </button>
                    <button
                        type="button"
                        className="edit-btn text-center d-inline-block fs16 c-black f-myriadproreg trans"
                        data-toggle="modal"
                        data-target="#edit-photo-modal"
                        onClick={openModalEditImages}>
                        <i className="far fa-edit mr-2 mCS_img_loaded" />
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditAlbumModalImageBlock;
