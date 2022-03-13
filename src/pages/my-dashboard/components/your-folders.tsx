import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';

import { history, keyGenerator, textCrop } from 'utils/helpers';
import { ALL_URL, DEF_URL } from 'utils/urls';
import { setOpenCreateAlbumDashboard } from 'redux/modals';
import FanbookDefault from 'assets/images/fanbookDefault.jpg';
import BlockPlaceholder from 'features/block-placeholder';
import { GetAlbumList } from 'api/all-apis';

function YourFolder() {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: IAuth) => state.sign.user.profile);
    const dashboardInfo = useSelector(
        (state: IMyDashboard) => state.MyDashboard.information
    );

    function openModalCreateAlbum() {
        dispatch(setOpenCreateAlbumDashboard(true));
    }

    const [albums, setAlbums] = useState<OneAlbum[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        if (userInfo && dashboardInfo.albumsCount > 0) {
            setLoading(true);
            GetAlbumList({
                'page[number]': 1,
                'page[size]': dashboardInfo.albumsCount || 5,
                sort: '-createdAt',
                'append[2]': 'user',
                'append[3]': 'userEvent',
                'append[4]': 'files',
                'filter[userId]': userInfo.id
            }).then((res) => {
                const albums: OneAlbum[] = res.data.data.items.filter(
                    (album: OneAlbum) =>
                        dashboardInfo.events?.some(
                            (event: IEvent) => album.userEventId === event.id
                        )
                );
                setAlbums(albums);
                setLoading(false);
            });
        }
    }, [userInfo, dashboardInfo.albumsCount]);

    return (
        <div className="folder-box-proj box ">
            <h2 className="event-box_title f-omnesMedium">
                Your Albums
                <span className="c-red ml-3">{dashboardInfo.albumsCount}</span>
            </h2>
            <ul className="event-list">
                {loading ? (
                    <BlockPlaceholder
                        width={155}
                        height={138}
                        borderRadius={5}
                        status={true}
                        count={6}
                        className="m-0 mr-3 mb-2"
                    />
                ) : (
                    albums.map((album: OneAlbum) => {
                        return (
                            <li
                                key={keyGenerator(30)}
                                className="event-item cursor-pointer"
                                onClick={() => {
                                    history.push(
                                        `${DEF_URL.ALBUM}/${album.id}`
                                    );
                                }}
                                style={{
                                    backgroundImage: `url(${
                                        album.albumFiles[0]?.url
                                            ? album.albumFiles[0]?.url
                                            : FanbookDefault
                                    })`
                                }}>
                                <div className="event-item_txt">
                                    <span className="title-album f-myriadproreg c-white fs18 d-block mb-1 position-relative">
                                        {textCrop(album.name, 10)}
                                    </span>
                                </div>
                            </li>
                        );
                    })
                )}

                <li
                    className="event-item more-item"
                    onClick={openModalCreateAlbum}>
                    <FontAwesomeIcon icon={faPlus} />
                </li>
            </ul>
            <div className="text-right">
                <Link
                    to={ALL_URL.MY_LIBRARY}
                    className="fs21 c-red f-myriadproreg">
                    More
                    <FontAwesomeIcon icon={faChevronRight} className="ml-2" />
                </Link>
            </div>
        </div>
    );
}

export default YourFolder;
