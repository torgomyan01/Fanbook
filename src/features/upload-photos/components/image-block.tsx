import React, { useEffect, useState } from 'react';
import { keyGenerator, textCrop } from 'utils/helpers';
import { Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { GetAlbum } from 'api/all-apis';
import { removeClassActiveEventsMenus } from '../helper-modal-move';

function ProductsBlock() {
    const SelectedAlbum = useSelector(
        (state: AllModalSite) => state.AllModalSiteTwo.selectedAlbumMoveModal
    );

    const [currentAlbum, setCurrentAlbum] = useState<IAlbumFiles[]>([]);
    const [loadingImages, setLoadingImages] = useState<boolean>(false);

    useEffect(() => {
        setLoadingImages(true);
        setCurrentAlbum([]);
        if (SelectedAlbum.eventID) {
            GetAlbum(SelectedAlbum.albumID, {
                'append[0]': 'files'
            })
                .then((res) => {
                    console.log(res.data.data.item.albumFiles);

                    setLoadingImages(false);
                    const _currentAlbum: OneAlbum = res.data.data.item;
                    setCurrentAlbum(_currentAlbum.albumFiles);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [SelectedAlbum]);

    function endDraging() {
        removeClassActiveEventsMenus();
    }

    return (
        <>
            {currentAlbum.length > 0 ? (
                currentAlbum.map((albumImage: IAlbumFiles) => {
                    return (
                        <div
                            key={keyGenerator(30)}
                            draggable={true}
                            onDragEnd={endDraging}
                            className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mt-2 p-1 trans">
                            <div className="move-modal-photo-body move-modal-photo-col">
                                <div
                                    className="move-modal-photos"
                                    style={{
                                        backgroundImage: `url(${albumImage.url})`
                                    }}
                                />
                                <div className="ok-move-modal">
                                    <FontAwesomeIcon
                                        icon={faCheckCircle}
                                        style={{ color: '#0079ff' }}
                                    />
                                </div>
                                <div className="image-name">
                                    {textCrop(albumImage.name, 30)}
                                </div>
                            </div>
                        </div>
                    );
                })
            ) : (
                <>
                    {SelectedAlbum.albumID ? (
                        <>
                            {loadingImages ? (
                                <div className="w-100 d-flex justify-content-center align-items-center">
                                    <Spinner
                                        animation="border"
                                        variant="primary"
                                    />
                                </div>
                            ) : (
                                <h1 className="no-result-my-event-search">
                                    No Images
                                </h1>
                            )}
                        </>
                    ) : (
                        <h1 className="no-result-my-event-search">
                            Select Album
                        </h1>
                    )}
                </>
            )}
        </>
    );
}

export default ProductsBlock;
