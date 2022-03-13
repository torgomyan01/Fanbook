import React, { useState } from 'react';
import checkWhiteIcon from 'assets/images/check-white-circle.png';
import eyeIcon from 'assets/images/eye-icon.png';
import editIcon from 'assets/images/edit-blue-icon.png';
import warningIcon from 'assets/images/warning-icon.png';
import img from 'assets/images/albums/publisher.png';
export const ImageItem = ({ src, name, isSelected }: folderImageType) => {
    const [openDropdown, setOpenDropdown] = useState<boolean>(false);
    return (
        <div className="content-box trans">
            <div
                className="img-box position-relative"
                style={{ backgroundImage: `url(${src})` }}>
                {isSelected && (
                    <span className="check-icon">
                        <img src={checkWhiteIcon} alt="check" />
                    </span>
                )}
            </div>
            <div className="img-name d-flex align-items-center justify-content-between">
                <span className="f-omnesMedium">{name}</span>
                <div className="dropdown warning-box">
                    <span
                        id="dropdownwarning"
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpenDropdown(!openDropdown);
                        }}>
                        <img src={warningIcon} alt="warning" />
                    </span>
                    <div
                        className={`dropdown-menu ${
                            openDropdown ? 'show' : ''
                        }`}
                        aria-labelledby="dropdownwarning">
                        <h2 className="fs18">
                            <span className="mr-1">
                                <img src={warningIcon} alt="warning" />
                            </span>
                            Warning
                        </h2>
                        <p className="warning-box_txt">
                            This image may not be suitable for prints and
                            posters because of its low resolution.
                        </p>
                    </div>
                </div>
            </div>
            <div className="content-box_txt ">
                <span className="preview-btn text-center d-inline-block fs16 c-black f-myriadproreg trans ">
                    <img src={eyeIcon} alt="eye" className="mr-2" />
                    Preview
                </span>
                <span className="edit-btn text-center d-inline-block fs16 c-black f-myriadproreg trans ">
                    <img src={editIcon} alt="edit" className="mr-2" />
                    Edit
                </span>
            </div>
        </div>
    );
};
