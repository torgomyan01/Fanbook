import React from 'react';
import { keyGenerator } from 'utils/helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { setOpenCreateModalAlbum } from 'redux/modals';
import { useDispatch } from 'react-redux';
import AlbumBlock from './album-block';

interface IThisProps {
    albums: OneAlbum[];
}

function CardBodyAlbumMoveModal({ albums }: IThisProps) {
    const dispatch = useDispatch();

    // TO OPEN MODAL CREATE ALBUM
    function openCreateAlbum() {
        dispatch(setOpenCreateModalAlbum(true));
    }

    return (
        <>
            {albums.length > 0 ? (
                albums?.map((album: OneAlbum) => {
                    return <AlbumBlock key={keyGenerator(30)} album={album} />;
                })
            ) : (
                <div className="d-flex justify-content-start align-items-center c-primary mt-2  ml-4 new-folder-block mb-3">
                    No Album
                </div>
            )}
            <div
                className="d-flex justify-content-start align-items-center c-primary mt-2  ml-4 new-folder-block"
                onClick={openCreateAlbum}>
                <span className="bg-primary rounded-circle c-white  mr-2 add-new-folder-icon">
                    <FontAwesomeIcon icon={faPlus} />
                </span>
                New Album...
            </div>
        </>
    );
}

export default CardBodyAlbumMoveModal;
