import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import img from 'assets/images/front-cover-2.png';
import { useDispatch, useSelector } from 'react-redux';
import { setDraggingImgUrl, setDragStart } from 'redux/edit-book';
import { keyGenerator } from 'utils/helpers';
import ModalUploadAlbumsPage from 'features/modal-upload-image-album-page/modal-upload-albums';

interface thisProps {
    show: boolean;
    oneAlbumId: string;
}

const scrollingTypes = {
    top: 'top',
    bottom: 'bottom'
};

const scrollInterval = 100;

function Images({ show, oneAlbumId }: thisProps) {
    const dispatch = useDispatch();
    const [albumFiles, etAlbumFiles] = useState<any>([]);
    const thisAlbums = useSelector(
        (state: IOneBook) => state.ThisBook.thisAlbums
    );

    useEffect(() => {
        const OneAlbum = thisAlbums.find(
            (album: OneAlbum) => album.id === oneAlbumId
        );
        etAlbumFiles(OneAlbum);
    }, [oneAlbumId, thisAlbums]);

    const [modalUpload, setModalUpload] = useState(false);
    function openModalUpload() {
        setModalUpload(true);
    }

    function closeModalUpload() {
        setModalUpload(false);
    }

    function startDragFanbookBookImage(e: any) {
        const imgUrl = e.target.getAttribute('data-img-url');
        dispatch(setDragStart(true));
        dispatch(setDraggingImgUrl(imgUrl));
    }
    function StopDragging() {
        dispatch(setDragStart(false));
    }
    function startScrollingSite(status: string) {
        window.scrollTo({
            top:
                status === scrollingTypes.top
                    ? window.scrollY - 7
                    : window.scrollY + 7,
            behavior: 'smooth'
        });
    }

    function dragOver(e: any) {
        const scrollSection = window.scrollY + scrollInterval;
        const scrollYAndWindowHeight = window.scrollY + window.innerHeight;
        if (e.pageY > window.scrollY && e.pageY < scrollSection) {
            startScrollingSite(scrollingTypes.top);
        }
        if (
            e.pageY > scrollYAndWindowHeight - scrollInterval &&
            e.pageY < scrollYAndWindowHeight
        ) {
            startScrollingSite(scrollingTypes.bottom);
        }
    }

    window.ondragover = dragOver;

    return (
        <>
            <div className={`drag-drop-block ${show ? 'show' : 'hide'}`}>
                <ul className="list-folders mb-3">
                    {albumFiles &&
                        albumFiles?.albumFiles?.map((url: any) => {
                            return (
                                <li
                                    key={keyGenerator(30)}
                                    className="list-folder-item">
                                    <Link
                                        to="#"
                                        draggable={true}
                                        onDragStart={startDragFanbookBookImage}
                                        onDragEnd={StopDragging}
                                        data-img-url={url.url}
                                        className="list-folder-link">
                                        <img
                                            src={url.url}
                                            data-img-url={url.url}
                                            alt="icon"
                                        />
                                    </Link>
                                </li>
                            );
                        })}
                </ul>
                {/*<div className="text-center">*/}
                {/*    <Link to="#" className="photo-more-link mb-3">+ 226</Link>*/}
                {/*</div>*/}
                <div className="drag-upload">
                    {/*<span className="mr-3">*/}
                    {/*    <span className="mr-3">Drag Photos here </span> or*/}
                    {/*</span>*/}
                    <div className="btn-upload-block">
                        <div
                            onClick={openModalUpload}
                            className="btn-img btn-img-upload mb-0">
                            <i className="fas fa-upload mr-1" />
                            <span className="btn-text">Upload Photos</span>
                        </div>
                    </div>
                </div>
            </div>

            <ModalUploadAlbumsPage
                closeModal={closeModalUpload}
                showHide={modalUpload}
                albumID={oneAlbumId}
            />
        </>
    );
}

export default Images;
