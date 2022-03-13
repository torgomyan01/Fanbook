import React, { useState } from 'react';
import { setMessageUser, textCrop } from 'utils/helpers';
import { CircularProgress } from '@material-ui/core';
import AlbumIcon from 'assets/images/poster/album-icon.png';
import { UM } from 'utils/user-messages';
import { GetAlbumFiles } from 'api/all-apis';
import { useDispatch } from 'react-redux';

interface IThisProps {
    folderOpen: any;
    album: OneAlbum;
}

function FolderBlocks({ folderOpen, album }: IThisProps) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);

    function openFolder() {
        setLoading(true);
        dispatch(setMessageUser(UM.P_W));

        GetAlbumFiles(album.id, {
            'page[number]': '1',
            'page[size]': '500',
            sort: 'name'
        })
            .then((res) => {
                folderOpen(res, album.name, album.id);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    return (
        <li className="list-album-item">
            <div className="list-album-link" onClick={openFolder}>
                {loading ? (
                    <CircularProgress
                        style={{
                            color: '#0079ff'
                        }}
                        className="mb-2"
                    />
                ) : (
                    <img src={AlbumIcon} alt="icon" />
                )}

                {textCrop(album.name, 10)}
            </div>
        </li>
    );
}

export default FolderBlocks;
