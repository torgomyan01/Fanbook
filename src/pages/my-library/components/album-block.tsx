import React from 'react';
import photoImg from 'assets/images/MyLibrary/photo-img.png';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { DEF_URL } from 'utils/urls';

import { keyGenerator } from 'utils/helpers';

interface IThisProps {
    album: OneAlbum;
}

function AlbumBlock({ album }: IThisProps) {
    return (
        <tr className="trans">
            <td>
                <div className="d-flex">
                    <span className="img-box mr-2 img-box-my-library">
                        <i className="far fa-images" />
                    </span>
                    <div className="d-flex flex-column justify-content-center">
                        <h3 className="mb-2 fs20 f-omnesMedium">
                            {album.name}
                        </h3>
                        <span className="c-gray fs16 f-myriadproreg">
                            Last Edited: {moment(album.updatedAt).format('LL')}
                        </span>
                    </div>
                </div>
            </td>
            <td>
                <ul className="mb-0 d-flex">
                    {album.albumFiles.length > 0 &&
                        album.albumFiles.map(
                            (file: IAlbumFiles, index: number) => {
                                if (index < 7) {
                                    return (
                                        <li
                                            key={keyGenerator(30)}
                                            className="img-box mr-1"
                                            style={{
                                                backgroundImage: `url(${file.url})`
                                            }}
                                        />
                                    );
                                }
                            }
                        )}
                    <li className="img-box mr-1">
                        {album.albumFiles.length > 7 && (
                            <Link
                                to={`${DEF_URL.SERP}/${album.userEventId}`}
                                className="c-red fs16 b-bottom f-myriadproreg">
                                +{album.albumFiles.length - 6}
                            </Link>
                        )}
                    </li>
                </ul>
            </td>
            <td>
                <div className=" d-flex align-items-center justify-content-end">
                    <Link
                        to={`${DEF_URL.ALBUM}/${album.id}`}
                        className="libary-txt f-omnesMedium">
                        Go to Album{' '}
                        <i className="fas fa-long-arrow-alt-right ml-2" />
                    </Link>
                </div>
            </td>
        </tr>
    );
}

export default AlbumBlock;
