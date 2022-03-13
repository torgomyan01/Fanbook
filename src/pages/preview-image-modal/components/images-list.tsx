import React from 'react';
import { keyGenerator } from 'utils/helpers';

interface PropsType {
    imagesList: ImageType[];
    activeImage: number;
    setActiveImage: (id: number) => void;
}
export const ImagesList = ({
    imagesList,
    activeImage,
    setActiveImage
}: PropsType) => {
    return (
        <div className="row">
            <div className="col-12">
                <div
                    className="scroll-horizontal scroll-page-list images-scroll-list"
                    data-mcs-theme="dark">
                    <ul className="img-list">
                        {imagesList.map((image) => {
                            return (
                                <li
                                    className={`mr-2 ${
                                        image.id === activeImage ? 'active' : ''
                                    }`}
                                    key={keyGenerator(30)}
                                    onClick={() => {
                                        setActiveImage(image.id);
                                    }}>
                                    <div
                                        className="img-item"
                                        style={{
                                            backgroundImage: `url(${image.src})`
                                        }}
                                    />
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};
