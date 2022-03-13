import React from 'react';
import FanbookDefault from 'assets/images/fanbookDefault.jpg';
import { PrintCreateTime, textCrop } from 'utils/helpers';
import { modalOpenClose, setImage } from 'redux/preveiw-image';
import { useDispatch } from 'react-redux';
import EventNameBlock from './event-name-block';
import {
    setOpenModalBookDelete,
    setOpenModalBookEdit,
    setSetAddBookBookDeleteModal,
    setSetAddBookBookEditModal
} from 'redux/modals';
import { Dropdown } from 'react-bootstrap';
import { DEF_URL } from 'utils/urls';
import { Link } from 'react-router-dom';

interface IThisProps {
    book: IBookInfo;
}

function BookBlockDraft({ book }: IThisProps) {
    const dispatch = useDispatch();
    function viewPhoto() {
        if (book.avatarUrl) {
            dispatch(modalOpenClose(true));
            dispatch(
                setImage({
                    name: book.name,
                    url: book.avatarUrl
                })
            );
        }
    }

    function editBookModal() {
        dispatch(setOpenModalBookEdit(true));
        dispatch(setSetAddBookBookEditModal(book));
    }

    function deleteThisBook() {
        dispatch(setOpenModalBookDelete(true));
        dispatch(setSetAddBookBookDeleteModal(book));
    }
    return (
        <div className="book-block-drafts position-relative">
            <div className="avatar-block">
                <div
                    className="img-block cursor-pointer"
                    onClick={viewPhoto}
                    style={{
                        backgroundImage: `url(${
                            book.avatarUrl ? book.avatarUrl : FanbookDefault
                        })`
                    }}
                />
            </div>
            <div>
                <div className="title">
                    <Link
                        to={`${DEF_URL.COVER_PREVIEW}/${book.id}`}
                        className="book-box_title mb-1 c-black">
                        {book.name}
                    </Link>
                </div>
                <div className="book-description w-75 mb-3">
                    {textCrop(book.description, 150)}
                </div>
                <div className="event-name-draft">Book Size: {book.size}</div>
                {book.userEvent && (
                    <div className="event-name-draft mt-1">
                        Event Name: <EventNameBlock event={book.userEvent} />
                    </div>
                )}
                <p className="mt-1">
                    Created:{' '}
                    <span className="c-gray">
                        {PrintCreateTime(book.createdAt)}
                    </span>
                </p>
            </div>
            <div className="my-event-page-d-m" style={{ top: '10px' }}>
                <Dropdown>
                    <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
                        <i className="fas fa-ellipsis-v" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#" onClick={editBookModal}>
                            <i className="far fa-edit mr-2 c-red" />
                            Edit
                        </Dropdown.Item>
                        <Dropdown.Item href="#" onClick={deleteThisBook}>
                            <i className="fas fa-trash mr-2 c-red" />
                            Delete
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    );
}

export default BookBlockDraft;
