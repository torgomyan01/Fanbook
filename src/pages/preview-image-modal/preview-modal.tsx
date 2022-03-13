import React, { useState } from 'react';
import deleteIcon from 'assets/images/settings/delete-icon.png';
import previewImage from 'assets/images/edit-image/edit-photo-img.png';
import { useDispatch, useSelector } from 'react-redux';
import { ImagesList } from 'pages/preview-image-modal/components/images-list';
import { TagsList } from 'pages/preview-image-modal/components/tags-list';
import { useHistory, useLocation } from 'react-router-dom';

export const PreviewImageModal: React.FC = () => {
    const [activeImage, setActiveImage] = useState<number>(1);
    const [caption, setCaption] = useState<string>('');
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const images = useSelector(
        (state: IEditImage) => state.editImage.imagesList
    );
    const currentImage: any = useSelector(
        (state: IEditImage) => state.editImage.image
    );
    const [openPrice, setOpenPrice] = useState<boolean>(false);
    const togglePriceDropdown = () => {
        setOpenPrice(!openPrice);
    };
    const removeTagFromImage = (id: number) => {
        // dispatch(removeTagFromImageTH(id));
    };
    return (
        <div
            className="modal fade show"
            id="edit-photo-modal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div className="modal-dialog " role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="b-bottom w-100 d-flex align-items-center justify-content-between">
                            <h2 className="upload-modal_title f-omnesMedium">
                                Edit Photo
                            </h2>
                            <ul className="d-flex align-items-center mb-0">
                                <li
                                    className="f-omnesMedium fs15 cursor-pointer"
                                    onClick={() => {
                                        history.push(location.pathname);
                                    }}>
                                    <div className="c-black">
                                        <i className="fas fa-arrow-left mr-2" />
                                        Return to Album
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="modal-body ">
                        <div className="row mb-3">
                            <div className="col-md-7 col-12 mb-md-0 mb-3">
                                <div
                                    className="img-box"
                                    style={{
                                        backgroundImage: `url(${previewImage})`
                                    }}
                                />
                            </div>
                            <div className="col-md-5 col-12 my-col">
                                <form
                                    action="#"
                                    method="post"
                                    className="form-block">
                                    <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                        <h2 className="fs22 f-omnesMedium mb-sm-0 mb-2">
                                            IMG_0123.JPG
                                        </h2>
                                        <span className="f-myriadproreg fs16 c-red lh-14 cursor-pointer ">
                                            Delete Photo
                                            <img
                                                src={deleteIcon}
                                                alt="delete"
                                                className="delete-icon ml-2"
                                            />
                                        </span>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="cp">Caption</label>
                                        <input
                                            id="cp"
                                            type="text"
                                            placeholder="This is an example caption of the photo"
                                            value={caption}
                                            onChange={(e) =>
                                                setCaption(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Price (Individual)</label>
                                        <div className="dropdown">
                                            <button
                                                onClick={togglePriceDropdown}
                                                className="btn price-btn text-left"
                                                type="button"
                                                id="dropdownprice"
                                                data-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false">
                                                $2,00
                                            </button>
                                            <ul
                                                className={`dropdown-menu ${
                                                    openPrice ? 'show' : ''
                                                }`}
                                                aria-labelledby="dropdownprice">
                                                <li className="dropdown-item">
                                                    Action
                                                </li>
                                                <li className="dropdown-item">
                                                    Another action
                                                </li>
                                                <li className="dropdown-item">
                                                    Something else here
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <TagsList
                                        tags={currentImage.tags}
                                        removeTagFromImage={removeTagFromImage}
                                    />
                                    <div className="form-group">
                                        <label>Edit</label>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <ImagesList
                            imagesList={images}
                            activeImage={activeImage}
                            setActiveImage={setActiveImage}
                        />
                    </div>
                    <div
                        className="modal-footer d-flex align-items-center justify-content-end"
                        onClick={() => {
                            history.push(location.pathname);
                        }}>
                        <button type="button" className="btn save-btn">
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
