import React, { useEffect, useRef } from 'react';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { modalOpenClose } from 'redux/preveiw-image';
import { createImageCanvas } from 'utils/helpers';

const thisClasses = {
    imgPrevBody: 'img-prev-body',
    imagePrevBlockShow: 'image-prev-block show',
    imagePrevBlockHide: 'image-prev-block hide'
};
function PreviewImage() {
    const imageViewModal = useSelector(
        (state: IImageView) => state.ViewImageModal.modalOpenClose
    );
    const image = useSelector(
        (state: IImageView) => state.ViewImageModal.image
    );
    const imgBlock = useRef<any>(null);
    useEffect(() => {
        createImageCanvas(image.url, 800, 800, false).then((res: any) => {
            imgBlock!.current!.innerHTML = '';
            imgBlock?.current?.append(res);
        });
    }, [imageViewModal, image]);

    const dispatch = useDispatch();
    function closeModal() {
        dispatch(modalOpenClose(false));
    }

    function thisModal(e: any) {
        const className = e.target.className;
        if (
            className === thisClasses.imagePrevBlockShow ||
            className === thisClasses.imgPrevBody
        ) {
            closeModal();
        }
    }
    return (
        <div
            className={
                imageViewModal
                    ? thisClasses.imagePrevBlockShow
                    : thisClasses.imagePrevBlockHide
            }
            onClick={thisModal}
            style={{ opacity: imageViewModal ? 1 : 0 }}>
            <div
                ref={imgBlock}
                className={thisClasses.imgPrevBody}
                style={{ opacity: imageViewModal ? 1 : 0 }}>
                {/*<img src={image.url} alt="image Prev" />*/}
            </div>
            <i className="fas fa-times" onClick={closeModal} />
        </div>
    );
}

export default PreviewImage;
