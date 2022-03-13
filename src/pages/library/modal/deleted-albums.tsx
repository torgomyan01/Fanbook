import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { GetDeletedAlbums } from 'api/all-apis';
import { setAllLibrary } from 'redux/library';
import { GetEventPublicPrivate, keyGenerator } from 'utils/helpers';
import GridBlockModalForDeleteModal from './library-grid-block-delete-modal';
import { useParams } from 'react-router-dom';
import AlbumLoadingBlock from '../components/album-loading-block';

interface IThisProps {
    show: boolean;
    onClose: any;
}

function DeletedAlbums({ show, onClose }: IThisProps) {
    const dispatch = useDispatch();
    const { status }: { status: string } = useParams();
    const [removedAlbums, setRemovedAlbums] = useState<OneAlbum[]>([]);

    const AllFiles: any = useSelector(
        (state: ILibrary) => state.Library.AllFiles
    );

    useEffect(() => {
        const deletedAlbums = AllFiles.filter(
            (album: OneAlbum) => album.deletedAt
        );
        setRemovedAlbums(deletedAlbums);
    }, [AllFiles]);

    const event = useSelector(
        (state: AllModalSite) => state.AllModalSiteTwo.eventToModal
    );

    function returnDeletedAlbum(e: any) {
        const deletedAlbums = removedAlbums.filter(
            (album: OneAlbum) => album.id !== e
        );
        setRemovedAlbums(deletedAlbums);
        GetEventPublicPrivate(
            event.id,
            status,
            {
                'append[1]': 'albums'
            },
            function (res: any) {
                dispatch(setAllLibrary(res.data.data.item.albums));
            }
        );
    }

    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        setLoading(true);

        GetDeletedAlbums().then((res) => {
            setRemovedAlbums(res.data.data.items);
            setLoading(false);
        });
    }, [show]);

    return (
        <>
            <Modal
                size="lg"
                show={show}
                onHide={onClose}
                className="modal-view-deleted-albums modal-bg-blur-effect">
                <Modal.Header closeButton>
                    <Modal.Title>Recently Deleted Albums</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex flex-wrap justify-content-start mb-4">
                        {loading ? (
                            <>
                                <div>
                                    <AlbumLoadingBlock />
                                </div>
                                <div>
                                    <AlbumLoadingBlock />
                                </div>
                            </>
                        ) : removedAlbums.length > 0 ? (
                            removedAlbums.map((files: any) => {
                                return (
                                    <div key={keyGenerator(30)}>
                                        <GridBlockModalForDeleteModal
                                            deletedId={returnDeletedAlbum}
                                            files={files}
                                        />
                                    </div>
                                );
                            })
                        ) : (
                            <h1 className="no-result-h1">No Deleted Albums</h1>
                        )}
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default DeletedAlbums;
