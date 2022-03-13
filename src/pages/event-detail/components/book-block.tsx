import React, { useState } from 'react';
import defaultImg from 'assets/images/fanbookDefault.jpg';
import { Link, useParams } from 'react-router-dom';
import { DEF_URL } from 'utils/urls';
import { useDispatch, useSelector } from 'react-redux';
import {
    checkPublisher,
    goToBuy,
    history,
    isUserLogin,
    userIsLogin
} from 'utils/helpers';
import { Dropdown, Spinner } from 'react-bootstrap';
import {
    setAddBookToModalEditBookStatus,
    setOpenModalBookDelete,
    setOpenModalBookEdit,
    setOpenModalEditStatusBook,
    setSetAddBookBookDeleteModal,
    setSetAddBookBookEditModal
} from 'redux/modals';
import { Tooltip } from '@material-ui/core';
import CheckInCard from 'features/CheckInCard/check-in-card';
import { setUserLoginMethod } from 'redux/auth.slice';
import { setOpenCloseModal, setUseType } from 'redux/login-reg-user';
import { UserLoginTypes } from 'enums/enums';
import { CloneBook } from 'api/all-apis';
import { AxiosResponse } from 'axios';

interface IThisProps {
    book: IThisBook;
    event: IEvent;
}

export const storageName = 'site-card';

function BookBlock({ book, event }: IThisProps) {
    const dispatch = useDispatch();
    const { status }: { status: string } = useParams();
    const userInfo = useSelector((state: IAuth) => state.sign.user.profile);
    const [bayBook, setBayBook] = useState(false);

    const isEditable = checkPublisher(userInfo?.id, book.userId);

    function buyThisBook() {
        setBayBook(true);
        setTimeout(() => setBayBook(false), 900);
        dispatch(
            goToBuy(book.userId, userInfo?.id, {
                entityType: 'Book',
                entityId: book.id,
                qty: 1
            })
        );
    }

    function openBookPreview() {
        history.push(`${DEF_URL.COVER_PREVIEW}/${book.id}`);
    }

    function deleteThisBook() {
        dispatch(setOpenModalBookDelete(true));
        dispatch(setSetAddBookBookDeleteModal(book));
    }

    function editBookModal() {
        dispatch(setOpenModalBookEdit(true));
        dispatch(setSetAddBookBookEditModal(book));
    }
    const bookDescription =
        book.description.length > 120
            ? `${book.description.substring(0, 120)}...`
            : book.description;

    function openModalEditStatusEven() {
        dispatch(setOpenModalEditStatusBook(true));
        dispatch(setAddBookToModalEditBookStatus(book));
    }

    const [buoyed, setBuoyed] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false);
    function DoItYourSelf() {
        if (isUserLogin()) {
            setLoading(true);
            CloneBook(book.id)
                .then((res: AxiosResponse) => {
                    const newBook: ICurrentBook = res.data.data.item;
                    history.push(`${DEF_URL.EDIT_BOOK}/${newBook.id}`);
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            dispatch(setUserLoginMethod(userIsLogin.normalLogin));
            dispatch(setOpenCloseModal(true));
            dispatch(setUseType(UserLoginTypes.signIn));
        }
    }

    function Block() {
        return (
            <div className="book-box d-sm-flex mb-3 position-relative mt-3">
                <Tooltip title={`View ${book.name} book`} placement="top">
                    <div
                        className="img-box mb-sm-0 mb-2 cursor-pointer"
                        onClick={openBookPreview}>
                        <div
                            className="book-img mb-3"
                            style={{
                                backgroundImage: book.avatarUrl
                                    ? `url(${book.avatarUrl})`
                                    : `url(${defaultImg})`
                            }}
                        />
                        <h3 className="img-box_title mb-0">Prebuilt</h3>
                    </div>
                </Tooltip>

                <div className="book-txt-box d-flex flex-column">
                    <Link
                        to={`${DEF_URL.COVER_PREVIEW}/${book.id}`}
                        className="book-box_title mb-1">
                        {book.name}
                    </Link>
                    <h3 className="book-box_pretitle mb-2">
                        {bookDescription}
                    </h3>

                    {isEditable ? (
                        <p className="font-bold fs18 c-red">${book.price}</p>
                    ) : (
                        <div className="d-flex">
                            <span
                                className={`buy-btn-event text-center mr-2 w180px  ${
                                    buoyed && 'bgc-red c-white'
                                }`}
                                style={{
                                    whiteSpace: 'nowrap'
                                }}
                                onClick={buyThisBook}>
                                <i className="fas fa-shopping-cart mx-2" />
                                <CheckInCard
                                    productID={book.id}
                                    price={book.price}
                                    buyName={null}
                                    buoyed={(res: boolean) => setBuoyed(res)}
                                />
                            </span>
                            <button
                                className="buy-btn-event text-center border-0 px-2"
                                onClick={DoItYourSelf}>
                                {loading ? (
                                    <Spinner
                                        animation="border"
                                        variant="light"
                                        className="mr-2"
                                    />
                                ) : (
                                    <i className="fas fa-plus mr-2" />
                                )}
                                Do It Yourself
                            </button>
                        </div>
                    )}
                </div>
                {isEditable && (
                    <div className="my-event-page-d-m" style={{ top: '10px' }}>
                        <Dropdown>
                            <Dropdown.Toggle
                                variant="outline-dark"
                                id="dropdown-basic">
                                <i className="fas fa-ellipsis-v" />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#" onClick={editBookModal}>
                                    <i className="far fa-edit mr-2 c-red" />
                                    Edit
                                </Dropdown.Item>
                                <Dropdown.Item
                                    href="#"
                                    onClick={deleteThisBook}>
                                    <i className="fas fa-trash mr-2 c-red" />
                                    Delete
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                )}

                {isEditable && (
                    <Tooltip
                        title={book.isAvailable ? 'Public' : 'Private'}
                        placement="top">
                        <div
                            className="public-private-book"
                            onClick={openModalEditStatusEven}>
                            {book.isAvailable ? (
                                <i className="fas fa-lock-open c-green" />
                            ) : (
                                <i className="fas fa-lock c-red" />
                            )}
                        </div>
                    </Tooltip>
                )}
            </div>
        );
    }

    return (
        <div className="position-relative">
            <Block />
            {bayBook && (
                <div className="buy-block-animation">
                    <Block />
                </div>
            )}
        </div>
    );
}

export default BookBlock;
