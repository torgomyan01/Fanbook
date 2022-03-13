import { useDispatch, useSelector } from 'react-redux';
import { setSelectNewAlbum } from 'redux/modals';
import { textCrop } from 'utils/helpers';
import React from 'react';

interface IAlbumBlockProps {
    album: OneAlbum;
}

function AlbumBlock({ album }: IAlbumBlockProps) {
    const dispatch = useDispatch();
    function selectAlbum() {
        dispatch(
            setSelectNewAlbum({
                eventID: album.userEventId,
                albumID: album.id
            })
        );
    }
    const SelectedAlbum = useSelector(
        (state: AllModalSite) => state.AllModalSiteTwo.selectedAlbumMoveModal
    );

    return (
        <div
            onClick={selectAlbum}
            className={`album-block-accordion-list ${
                SelectedAlbum.albumID === album.id && 'active'
            }`}>
            <i className="fas fa-folder mr-2 c-primary" />
            {textCrop(album.name, 10)}
        </div>
    );
}

export default AlbumBlock;
