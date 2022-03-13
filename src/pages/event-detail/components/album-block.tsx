import React, { useCallback, useState } from 'react';
import {
    checkPublisher,
    isUserLogin,
    keyGenerator,
    userIsLogin
} from 'utils/helpers';
import { Accordion, Card, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages } from '@fortawesome/free-regular-svg-icons';
import { DEF_URL } from 'utils/urls';
import SingleImage from './single-image.component';
import { OpenCloseModal, SetFile } from 'redux/edit-folder';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { history } from 'utils/helpers';
import {
    setAddAlbumFormDeleteModal,
    setAddModalEditStatusAlbum,
    setOpenCloseModalDeleteAlbum,
    setOpenModalEditStatusAlbum
} from 'redux/modals';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import { Tooltip } from '@material-ui/core';
import FinallyImageAlbum from './finally-image';
import { setUserLoginMethod } from 'redux/auth.slice';
import { setOpenCloseModal, setUseType } from 'redux/login-reg-user';
import { UserLoginTypes } from 'enums/enums';

interface IThisProps {
    album: OneAlbum;
    event: IEvent;
}

function AlbumBlock({ album, event }: IThisProps) {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: IAuth) => state.sign.user.profile);
    const isEditPublisher = checkPublisher(event.userId, userInfo?.id);
    const isEditFun = checkPublisher(album?.userId, userInfo?.id);

    function isEdit() {
        return isEditPublisher || isEditFun;
    }

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
    const thisKey = `album__${album.id}`;
    const [activeAcc, setActiveAcc] = useState(false);

    const decoratedOnClick = useAccordionToggle(thisKey, () => {
        setActiveAcc(!activeAcc);
    });

    function openModalChangeStatus() {
        dispatch(setAddModalEditStatusAlbum(album));
        dispatch(setOpenModalEditStatusAlbum(true));
    }

    function openAlbum() {
        if (isUserLogin()) {
            history.push(`${DEF_URL.ALBUM}/${album.id}`);
        } else {
            dispatch(setUserLoginMethod(userIsLogin.normalLogin));
            dispatch(setOpenCloseModal(true));
            dispatch(setUseType(UserLoginTypes.signIn));
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
                            <span onClick={openAlbum}>
                                {getAlbumName(album)}
                            </span>
                        </h3>
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
                        onClick={decoratedOnClick}>
                        <i className="fas fa-chevron-down" />
                    </span>
                </Tooltip>
                {isEdit() && (
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
                                <i className="fas fa-lock c-red" />
                            )}
                        </div>
                    </Tooltip>
                )}
            </Card.Header>
            <Accordion.Collapse eventKey={thisKey}>
                <Card.Body className="py-1">
                    <div className="shared-body ">
                        <div className="row my-row">
                            {album?.albumFiles.length > 0 ? (
                                album?.albumFiles.map((e: any, x: any) => {
                                    return x === 9 &&
                                        album.albumFilesCount > 10 ? (
                                        <FinallyImageAlbum
                                            key={keyGenerator(30)}
                                            img={e}
                                            albumId={album.id}
                                            allImages={album.albumFilesCount}
                                        />
                                    ) : (
                                        <SingleImage
                                            key={keyGenerator(30)}
                                            img={e}
                                            index={x}
                                            album={album}
                                        />
                                    );
                                })
                            ) : (
                                <h1 className="no-result-my-event-search mt-0">
                                    No Images
                                </h1>
                            )}
                        </div>
                    </div>
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    );
}

export default AlbumBlock;
