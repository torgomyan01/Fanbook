import React, { useCallback, useState } from 'react';
import {
    checkPublisher,
    history,
    isUserLogin,
    keyGenerator
} from 'utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { DEF_URL } from 'utils/urls';
import { Card, Dropdown } from 'react-bootstrap';
import { OpenCloseModal, SetFile } from 'redux/edit-folder';
import moment from 'moment';
import {
    setAddAlbumFormDeleteModal,
    setAddModalEditStatusAlbum,
    setOpenCloseModalDeleteAlbum,
    setOpenModalEditStatusAlbum
} from 'redux/modals';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages } from '@fortawesome/free-regular-svg-icons';
import { Collapse, Paper, Tooltip } from '@material-ui/core';
import { modalOpenClose, setImage } from 'redux/preveiw-image';
import EventNameBlock from './event-name-block';

interface IThisProps {
    album: OneAlbum;
}

function AlbumBlockDraft({ album }: IThisProps) {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: IAuth) => state.sign.user.profile);

    const isEditFun = checkPublisher(album?.userId, userInfo?.id);

    function opnModalEditFolder() {
        dispatch(OpenCloseModal(true));
        dispatch(SetFile(album));
    }

    const getAlbumName = useCallback((album) => {
        return `${moment(album.createdAt).format('MMM D, YYYY')} - ${
            album.name
        }`;
    }, []);

    function openModalDelete() {
        dispatch(setOpenCloseModalDeleteAlbum(true));
        dispatch(setAddAlbumFormDeleteModal(album));
    }

    const [activeAcc, setActiveAcc] = useState(false);

    function openModalChangeStatus() {
        dispatch(setAddModalEditStatusAlbum(album));
        dispatch(setOpenModalEditStatusAlbum(true));
    }

    function viewPhoto(url: string, name: string) {
        if (url) {
            dispatch(modalOpenClose(true));
            dispatch(
                setImage({
                    name,
                    url
                })
            );
        }
    }
    return (
        <Card className="mt-3">
            <Card.Header>
                <div className="d-sm-flex mb-sm-0 mb-2">
                    <div className="shared-box_img mr-sm-2">
                        <FontAwesomeIcon
                            icon={faImages}
                            className="c-blue fs21"
                        />
                    </div>
                    <div className="d-flex flex-column justify-content-center">
                        <h3 className="shared-box_title mb-1">
                            <span
                                onClick={() =>
                                    history.push(`${DEF_URL.ALBUM}/${album.id}`)
                                }>
                                {getAlbumName(album)}
                            </span>
                        </h3>
                        {album.userEvent && (
                            <div className="mb-2">
                                Event:{' '}
                                <EventNameBlock event={album.userEvent} />
                            </div>
                        )}
                        <p className="shared-box_txt mb-0">
                            {album.albumFilesCount > 1
                                ? `${album.albumFilesCount} Images`
                                : `${album.albumFilesCount} Image`}
                        </p>
                    </div>
                </div>
                <Tooltip title="View Images" placement="top">
                    <span
                        className={`event-page-al-acc-open-btn ${
                            activeAcc && 'active'
                        }`}
                        onClick={() => setActiveAcc(!activeAcc)}>
                        <i className="fas fa-chevron-down" />
                    </span>
                </Tooltip>
                {isEditFun && (
                    <div
                        className="my-event-page-d-m"
                        style={{ top: '10px', right: '10px' }}>
                        <Dropdown>
                            <Dropdown.Toggle
                                variant="outline-dark"
                                id="dropdown-basic">
                                <i className="fas fa-ellipsis-v" />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {isEditFun && (
                                    <Dropdown.Item
                                        href="#"
                                        onClick={opnModalEditFolder}>
                                        <i className="far fa-edit mr-2 c-red" />
                                        Edit
                                    </Dropdown.Item>
                                )}

                                <Dropdown.Item
                                    href="#"
                                    onClick={openModalDelete}>
                                    <i className="fas fa-trash mr-2 c-red" />
                                    Delete
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                )}
                {isUserLogin() && checkPublisher(album.userId, userInfo?.id) && (
                    <Tooltip
                        title={album.isAvailable ? 'Public' : 'Private'}
                        placement="top">
                        <div
                            className="album-public-private"
                            onClick={openModalChangeStatus}>
                            {album.isAvailable ? (
                                <i className="fas fa-lock-open c-green" />
                            ) : (
                                <i className="fas fa-lock c-gray" />
                            )}
                        </div>
                    </Tooltip>
                )}
            </Card.Header>
            <Collapse in={activeAcc}>
                <Paper
                    elevation={4}
                    style={{
                        width: 'calc(100% - 30px)',
                        background: 'rgb(247 247 247 / 35%)',
                        marginLeft: '15px',
                        borderRadius: '0'
                    }}>
                    <div className="shared-body ">
                        <div className="row my-row pt-3">
                            {album?.albumFiles.length > 0 ? (
                                album?.albumFiles
                                    .slice(0, 15)
                                    .map((e: IAlbumFiles) => {
                                        return (
                                            <div
                                                className="col-20 col-lg-3 col-sm-4 col-6 my-col text-center"
                                                key={keyGenerator(30)}>
                                                <div className="img-box trans">
                                                    <div
                                                        className="album-images-event-view-page"
                                                        onClick={() =>
                                                            viewPhoto(
                                                                e.url,
                                                                e.name
                                                            )
                                                        }
                                                        style={{
                                                            backgroundImage: `url(${e.url})`
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })
                            ) : (
                                <h1 className="no-result-my-event-search mt-0">
                                    No Images
                                </h1>
                            )}
                        </div>
                    </div>
                </Paper>
            </Collapse>
        </Card>
    );
}

export default AlbumBlockDraft;
