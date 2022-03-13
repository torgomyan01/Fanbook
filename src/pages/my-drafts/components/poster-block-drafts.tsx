import React from 'react';
import { useDispatch } from 'react-redux';
import { modalOpenClose, setImage } from 'redux/preveiw-image';
import FanbookDefault from 'assets/images/fanbookDefault.jpg';
import { PrintCreateTime, textCrop } from 'utils/helpers';
import EventNameBlock from './event-name-block';
import { Link } from 'react-router-dom';
import { DEF_URL } from 'utils/urls';
import {
    modalDeletePoster,
    modalDeletePosterOpenClose,
    setAddPosterToEditPoster,
    setOpenModalEditPoster
} from 'redux/modals';
import { Dropdown } from 'react-bootstrap';

interface IThisProps {
    poster: IPosterInfo;
}

function PosterBlockDrafts({ poster }: IThisProps) {
    const dispatch = useDispatch();
    function viewPhoto() {
        if (poster.avatarUrl) {
            dispatch(modalOpenClose(true));
            dispatch(
                setImage({
                    name: poster.name,
                    url: poster.avatarUrl
                })
            );
        }
    }
    function openModalEditPoster() {
        dispatch(setOpenModalEditPoster(true));
        dispatch(setAddPosterToEditPoster(poster));
    }

    function openModalDeletePoster() {
        dispatch(modalDeletePoster(poster));
        dispatch(modalDeletePosterOpenClose(true));
    }

    return (
        <div className="row position-relative border-bottom pb-4 poster-block-body book-block-drafts">
            <div
                className="col-lg-2 col-md-4 col-sm-5"
                style={{ maxWidth: 180 }}>
                <div
                    className="poster-avatar-block cursor-pointer"
                    onClick={viewPhoto}>
                    <div
                        className="prod-img-block"
                        style={{
                            backgroundImage: `url(${
                                poster.avatarUrl
                                    ? poster.avatarUrl
                                    : FanbookDefault
                            })`
                        }}
                    />
                </div>
            </div>
            <div className="col-lg-10 col-md-8 col-sm-6 position-relative">
                <Link to={`${DEF_URL.POSTER_PREVIEW}/${poster.id}`}>
                    <h1 className="title">{poster.name}</h1>
                </Link>
                <p className="book-description w-75 mb-3">
                    {textCrop(poster.description, 100)}
                </p>
                <p className="mb-1">
                    Size: <span className="c-gray">{poster.size}</span>
                </p>
                {poster.userEvent && (
                    <div className="mb-1">
                        Event: <EventNameBlock event={poster.userEvent} />
                    </div>
                )}
                <p className="mb-1">
                    Created:{' '}
                    <span className="c-gray">
                        {PrintCreateTime(poster.createdAt)}
                    </span>
                </p>
            </div>
            <Dropdown
                className="position-absolute"
                style={{ top: 0, right: 30 }}>
                <Dropdown.Toggle
                    variant="outline-light"
                    className="edit-icon m-0 edit-icon-my-drafts">
                    <i className="fas fa-ellipsis-v" />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#" onClick={openModalEditPoster}>
                        <i className="far fa-edit mr-2 c-red" />
                        Edit
                    </Dropdown.Item>
                    <Dropdown.Item href="#" onClick={openModalDeletePoster}>
                        <i className="fas fa-trash mr-2 c-red" />
                        Delete
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}

export default PosterBlockDrafts;
