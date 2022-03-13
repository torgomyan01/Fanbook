import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/black-logo.png';
import { useDispatch, useSelector } from 'react-redux';
import BlockPlaceholder from 'features/block-placeholder';
import {
    checkPublisher,
    eventUrlPublicPrivate,
    setMessageUser
} from 'utils/helpers';
import ModalToClosePage from './modal-to-close-page';
import { Spinner } from 'react-bootstrap';
import { UM } from 'utils/user-messages';
import { AddProductToCart } from 'api/all-apis';
import { setCheckoutBlock } from 'redux/modals';

function Header() {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: IAuth) => state.sign.user.profile);
    const thisBook = useSelector(
        (state: IOneBook) => state.ThisBook.currentBook
    );
    const AllProducts = useSelector(
        (state: ISiteCard) => state.SiteCard.allProducts
    );

    const ApproveAndContinue = checkPublisher(
        thisBook?.userEvent.userId,
        userInfo?.id
    );

    const [closeModal, setCloseModal] = useState(false);
    function saveAllPages() {
        setCloseModal(true);
    }

    const [buyLoading, setBuyLoading] = useState<boolean>(false);
    const [Purchased, stePurchased] = useState<boolean>(false);
    function buyProduct() {
        if (thisBook) {
            setBuyLoading(true);
            dispatch(setMessageUser(UM.P_W));

            AddProductToCart({
                items: [
                    {
                        entityType: 'Book',
                        entityId: thisBook?.id,
                        qty: 1
                    }
                ]
            }).then(() => {
                dispatch(setCheckoutBlock(true));
                setBuyLoading(false);
                stePurchased(true);
                dispatch(setMessageUser(UM.PROD_ADDED_CARD));
            });
        }
    }

    useEffect(() => {
        const checkProduct = AllProducts.some(
            (product: ICartBookInfo) => product.entityId === thisBook?.id
        );
        stePurchased(checkProduct);
    }, [thisBook]);

    return (
        <header>
            <div className="header-top">
                <div className="container-fluid">
                    <nav className="navbar navbar-expand-lg navbar-dark">
                        <div className="header-left d-flex align-items-center">
                            <div className="d-flex align-items-center">
                                <h1 className="navbar-brand">
                                    <Link
                                        to="/"
                                        className="d-inline-block"
                                        title="fanbook">
                                        <img
                                            src={logo}
                                            alt="logo"
                                            className="img-logo"
                                        />
                                    </Link>
                                </h1>
                                <span className="banner-editor mt-2">
                                    book editor
                                </span>
                            </div>
                            <div className="editor-parametres">
                                <div className="mr-5">
                                    <h4 className="label-book-editor">
                                        Book Name
                                    </h4>
                                    <div className="dimension-size">
                                        <Link
                                            className="c-black"
                                            to={eventUrlPublicPrivate(
                                                thisBook.userEvent
                                            )}>
                                            {thisBook.name === '' ? (
                                                <BlockPlaceholder
                                                    width={150}
                                                    height={20}
                                                    status={true}
                                                    count={1}
                                                    borderRadius={3}
                                                    className="m-0"
                                                />
                                            ) : (
                                                thisBook.name
                                            )}
                                        </Link>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="label-book-editor">
                                        Dimension
                                    </h4>
                                    <div className="dimension-size">
                                        {thisBook.size === '' ? (
                                            <BlockPlaceholder
                                                width={60}
                                                height={20}
                                                status={true}
                                                count={1}
                                                borderRadius={3}
                                                className="m-0"
                                            />
                                        ) : (
                                            thisBook.size
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <ul className="list-unstyled btns-list">
                                {!ApproveAndContinue && (
                                    <li onClick={buyProduct}>
                                        <Link
                                            to="#"
                                            className={`btn btn-edit-head ${
                                                Purchased
                                                    ? 'bgc-red c-white'
                                                    : 'green'
                                            } `}>
                                            <span className="d-flex align-items-center">
                                                {buyLoading ? (
                                                    <Spinner
                                                        animation="border"
                                                        variant="light"
                                                        className="mr-2"
                                                    />
                                                ) : (
                                                    <i className="fas fa-cart-plus mr-2" />
                                                )}
                                                {Purchased
                                                    ? 'In Card'
                                                    : 'Approve and Continue'}
                                            </span>
                                        </Link>
                                    </li>
                                )}
                                <li>
                                    <span
                                        className="btn btn-edit-head white cursor-pointer"
                                        onClick={saveAllPages}>
                                        <span className="d-flex align-items-center">
                                            <i className="fas fa-times" />
                                            Close
                                        </span>
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
            <ModalToClosePage
                show={closeModal}
                event={thisBook.userEvent}
                closeModal={() => {
                    setCloseModal(false);
                }}
            />
        </header>
    );
}

export default Header;
