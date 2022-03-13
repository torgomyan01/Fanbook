import React, { useEffect, useState } from 'react';
import BlackLogo from 'assets/images/black-logo.png';
import BlockPlaceholder from 'features/block-placeholder';
import { Link } from 'react-router-dom';
import {
    checkPublisher,
    eventUrlPublicPrivate,
    history,
    setMessageUser
} from 'utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { UM } from 'utils/user-messages';
import { Spinner } from 'react-bootstrap';
import { AddProductToCart } from 'api/all-apis';
import { setCheckoutBlock } from 'redux/modals';
import { ALL_URL } from 'utils/urls';

interface IThisProps {
    thisPoster: IPoster | undefined;
    loading: boolean;
}

function EditorPosterPageHeader({ thisPoster, loading }: IThisProps) {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: IAuth) => state.sign.user.profile);

    const AllProducts = useSelector(
        (state: ISiteCard) => state.SiteCard.allProducts
    );

    const iPublisher = checkPublisher(userInfo?.id, thisPoster?.userId);
    const ApproveAndContinue = checkPublisher(
        thisPoster?.userEvent.userId,
        userInfo?.id
    );

    const [buyLoading, setBuyLoading] = useState<boolean>(false);
    const [Purchased, stePurchased] = useState<boolean>(false);
    function buyProduct() {
        if (thisPoster) {
            setBuyLoading(true);
            dispatch(setMessageUser(UM.P_W));

            AddProductToCart({
                items: [
                    {
                        entityType: 'Poster',
                        entityId: thisPoster?.id,
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
            (product: ICartBookInfo) => product.entityId === thisPoster?.id
        );
        stePurchased(checkProduct);
    }, [thisPoster]);

    function closeEditor() {
        !iPublisher
            ? history.push(ALL_URL.MY_DRAFTS)
            : history.push(eventUrlPublicPrivate(thisPoster?.userEvent));
    }

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
                                            src={BlackLogo}
                                            alt="logo"
                                            className="img-logo"
                                        />
                                    </Link>
                                </h1>
                                <span className="banner-editor mt-2">
                                    poster editor
                                </span>
                            </div>
                            <div className="editor-parametres">
                                <div className="dropdown drop-book-editor">
                                    <label
                                        htmlFor="dropBookName"
                                        className="d-block label-book-editor">
                                        Event Name
                                    </label>
                                    <Link
                                        className="dropdown-toggle mr-2"
                                        to={eventUrlPublicPrivate(
                                            thisPoster?.userEvent
                                        )}
                                        data-toggle="dropdown"
                                        id="dropBookName">
                                        <span className="mr-2">
                                            {loading ? (
                                                <BlockPlaceholder
                                                    width={100}
                                                    height={20}
                                                    borderRadius={5}
                                                    status={true}
                                                    count={1}
                                                    className="m-0"
                                                />
                                            ) : (
                                                thisPoster?.userEvent.name
                                            )}
                                        </span>
                                    </Link>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <Link to="#">text</Link>
                                        </li>
                                        <li>
                                            <Link to="#">text</Link>
                                        </li>
                                    </ul>
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
                                <li onClick={closeEditor}>
                                    <div className="btn btn-edit-head white">
                                        <span className="d-flex align-items-center">
                                            <i className="fas fa-times" />
                                            Close
                                        </span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default EditorPosterPageHeader;
