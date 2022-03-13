import React, { useEffect, useState } from 'react';
import Images from './images';
import img from 'assets/images/front-cover-2.png';
import albumIcon from 'assets/images/album-icon.png';
import { useDispatch, useSelector } from 'react-redux';

import { checkPublisher, keyGenerator, textCrop } from 'utils/helpers';
import ModalAddAlbum from 'pages/event-detail/modal/add-album';
import { setOpenCreateModalAlbum } from 'redux/modals';

function MainFooter() {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: IAuth) => state.sign.user.profile);
    const thisBook = useSelector(
        (state: IOneBook) => state.ThisBook.currentBook
    );
    const currentEvent = useSelector(
        (state: IEvents) => state.events.currentEvent
    );
    const thisAlbums = useSelector(
        (state: IOneBook) => state.ThisBook.thisAlbums
    );
    const libraryStatus = useSelector(
        (state: IOneBook) => state.ThisBook.openCloseLibraryBlock
    );
    const [openImages, setOpenImages] = useState(false);
    const [thisAlbumID, setThisAlbumID] = useState('');

    const [albumLength, setAlbumLength] = useState(0);
    const [oneAlbum, setOneAlbum] = useState<OneAlbum>();

    const iAmCreator = checkPublisher(currentEvent?.userId, userInfo?.id);

    useEffect(() => {
        setAlbumLength(0);
        const OneAlbum: any = thisAlbums.find(
            (album: OneAlbum) => album.id === thisAlbumID
        );
        setOneAlbum(OneAlbum);

        setAlbumLength(OneAlbum?.albumFiles.length);
    }, [albumLength, thisAlbumID, thisAlbums]);

    function openModalToAddAlbum() {
        dispatch(setOpenCreateModalAlbum(true));
    }

    const toUpload = thisBook?.userEvent?.allowUserUpload || iAmCreator;
    return (
        <div
            className="main-footer"
            style={{ bottom: libraryStatus ? '-25rem' : '0' }}>
            <div className="text-right">
                {openImages ? (
                    <span
                        className="txt-gray folder-open cursor-pointer"
                        onClick={() => {
                            setOpenImages(!openImages);
                        }}>
                        <span className="library-link mr-1">Library &gt; </span>
                        {oneAlbum?.name}
                    </span>
                ) : (
                    <span className="txt-gray folder-close">Library</span>
                )}
            </div>
            <div>
                <h4 className="txt-drad-drop mb-1">DRAG &amp; DROP PHOTOS</h4>
                {thisAlbums.length > 0 &&
                    (openImages ? (
                        <p className="txt-gray folder-open">
                            {albumLength} photos in{' '}
                            <span className="c-black">‘{oneAlbum?.name}’</span>
                        </p>
                    ) : (
                        <p className="txt-gray folder-close">
                            Select album to add photos
                        </p>
                    ))}

                <div
                    className="scroll-horizontal scroll-album-list"
                    style={{ display: !openImages ? 'block' : 'none' }}
                    data-mcs-theme="dark">
                    <ul className="list-album mb-3 folder-close">
                        {thisAlbums.map((album: OneAlbum) => {
                            return (
                                <li
                                    key={keyGenerator(30)}
                                    className="list-album-item cursor-pointer">
                                    <span
                                        className="list-album-link"
                                        onClick={() => {
                                            setOpenImages(true);
                                            setThisAlbumID(album.id);
                                        }}>
                                        <img src={albumIcon} alt="icon" />
                                        {textCrop(album?.name, 11)}
                                    </span>
                                </li>
                            );
                        })}
                        {toUpload && (
                            <li
                                className="list-album-item cursor-pointer"
                                onClick={openModalToAddAlbum}>
                                <span className="list-album-link">
                                    <i className="fas fa-plus" />
                                    Add Album
                                </span>
                            </li>
                        )}
                    </ul>
                </div>

                <Images show={openImages} oneAlbumId={thisAlbumID} />
            </div>
            <ModalAddAlbum />
        </div>
    );
}

export default MainFooter;
