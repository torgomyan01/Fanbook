import React from 'react';
import { history } from 'utils/helpers';
import { DEF_URL } from 'utils/urls';

function FinallyImageAlbum({
    img,
    allImages,
    albumId
}: {
    img: IAlbumFiles;
    allImages: number;
    albumId: string;
}) {
    return (
        <div
            className="col-20 col-lg-3 col-sm-4 col-6 my-col text-center"
            onClick={() => history.push(`${DEF_URL.ALBUM}/${albumId}`)}>
            <div className="img-box trans">
                <div
                    className="album-images-event-view-page"
                    style={{ backgroundImage: `url(${img.url})` }}
                />
                <div
                    className="img-box_hover trans"
                    style={{ background: '#b12029bf' }}>
                    <ul className="list-unstyled mb-0">
                        <span className="c-white">+{allImages - 10}</span>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default FinallyImageAlbum;
