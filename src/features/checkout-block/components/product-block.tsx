import React, { useState } from 'react';
import {
    eventStatus,
    eventUrlPublicPrivate,
    history,
    textCrop
} from 'utils/helpers';
import { Link } from 'react-router-dom';
import { DEF_URL } from 'utils/urls';
import { Spinner } from 'react-bootstrap';
import { RemoveProductToCart, UpdateProductToCart } from 'api/all-apis';
import { TAB_NAMES } from 'pages/create-book/settings/tab-names';
import FanbookDefault from 'assets/images/fanbookDefault.jpg';
import { modalOpenClose, setImage } from 'redux/preveiw-image';
import { useDispatch } from 'react-redux';
import { setCheckoutBlock } from 'redux/modals';
import { cartProductType } from 'enums/enums';

interface IThisProps {
    product: ICartBookInfo;
    countChange: any;
}

function ProductBlock({ product, countChange }: IThisProps) {
    const dispatch = useDispatch();
    const [productCount, setProductCount] = useState<number>(product.qty);
    const [loadingMinus, setLoadingMinus] = useState<boolean>(false);
    const [loadingPlus, setLoadingPlus] = useState<boolean>(false);
    function PlusCount() {
        const count = productCount + 1;
        setLoadingPlus(true);
        UpdateProductToCart({
            items: [
                {
                    id: product.id,
                    qty: count
                }
            ]
        }).then((res) => {
            setProductCount(count);
            setLoadingPlus(false);
            countChange(res);
        });
    }

    function MinusCount() {
        if (productCount > 1) {
            const count = productCount - 1;
            setLoadingMinus(true);
            UpdateProductToCart({
                items: [
                    {
                        id: product.id,
                        qty: count
                    }
                ]
            }).then((res) => {
                setProductCount(count);
                setLoadingMinus(false);
                countChange(res);
            });
        }
    }

    const [removeLoading, setRemoveLoading] = useState(false);
    function RemoveThisProduct() {
        setRemoveLoading(true);
        RemoveProductToCart({
            ids: [product.id]
        })
            .then((res) => {
                setRemoveLoading(false);
                countChange(res);
            })
            .catch((err) => {
                setRemoveLoading(false);
                console.log(err);
            });
    }

    function goAdd(type: string) {
        return `${DEF_URL.CREATE_BOOK}/${product.userEventId}/${type}/${
            product.userEvent.isAvailable
                ? eventStatus.public
                : eventStatus.private
        }`;
    }

    function closeCheckout() {
        dispatch(setCheckoutBlock(false));
    }

    function buttonsProduct() {
        switch (product.entityType) {
            case cartProductType.poster:
                return (
                    <ul>
                        <li className="mb-1">
                            <Link
                                to={goAdd(TAB_NAMES.BOOK)}
                                onClick={closeCheckout}
                                className="add-new-btn btn">
                                Add Book
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={goAdd(TAB_NAMES.DIGITAL)}
                                onClick={closeCheckout}
                                className="add-new-btn btn">
                                Add Digital
                            </Link>
                        </li>
                    </ul>
                );
            case cartProductType.book:
                return (
                    <ul>
                        <li className="mb-1">
                            <Link
                                to={goAdd(TAB_NAMES.POSTERS)}
                                onClick={closeCheckout}
                                className="add-new-btn btn">
                                Add Poster
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={goAdd(TAB_NAMES.DIGITAL)}
                                onClick={closeCheckout}
                                className="add-new-btn btn">
                                Add Digital
                            </Link>
                        </li>
                    </ul>
                );
            case cartProductType.album:
                return (
                    <ul>
                        <li className="mb-1">
                            <Link
                                to={goAdd(TAB_NAMES.POSTERS)}
                                onClick={closeCheckout}
                                className="add-new-btn btn">
                                Add Poster
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={goAdd(TAB_NAMES.BOOK)}
                                onClick={closeCheckout}
                                className="add-new-btn btn">
                                Add Book
                            </Link>
                        </li>
                    </ul>
                );
            case cartProductType.albumFile:
                return (
                    <ul>
                        <li className="mb-1">
                            <Link
                                to={goAdd(TAB_NAMES.POSTERS)}
                                onClick={closeCheckout}
                                className="add-new-btn btn">
                                Add Poster
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={goAdd(TAB_NAMES.BOOK)}
                                onClick={closeCheckout}
                                className="add-new-btn btn">
                                Add Book
                            </Link>
                        </li>
                    </ul>
                );
        }
    }

    function goToPreviewPage() {
        switch (product.entityType) {
            case cartProductType.poster:
                history.push(`${DEF_URL.POSTER_PREVIEW}/${product.entityId}`);
                break;
            case cartProductType.album:
                history.push(`${DEF_URL.ALBUM}/${product.entityId}`);
                break;
            case cartProductType.albumFile:
                dispatch(modalOpenClose(true));
                dispatch(
                    setImage({
                        name: '',
                        url: product.avatarUrl
                    })
                );
                break;
            case cartProductType.book:
                history.push(`${DEF_URL.COVER_PREVIEW}/${product.entityId}`);
                break;
            default:
                break;
        }
        dispatch(setCheckoutBlock(false));
    }

    return (
        <li className="card-item">
            <span className="close-icon">
                {removeLoading ? (
                    <Spinner animation="border" variant="secondary" />
                ) : (
                    <i className="fas fa-times" onClick={RemoveThisProduct} />
                )}
            </span>
            <div className="d-flex">
                <div
                    className="img-box position-relative"
                    onClick={goToPreviewPage}
                    style={{
                        cursor: 'pointer',
                        backgroundImage: `url(${
                            product.avatarUrl
                                ? product.avatarUrl
                                : FanbookDefault
                        })`
                    }}>
                    <span>{product.entityType}</span>
                </div>
                <div className="txt-box">
                    <Link
                        to={eventUrlPublicPrivate(product.userEvent)}
                        className="fs15 c-gray mb-1">
                        {product.userEvent.name}
                    </Link>
                    <Link
                        to={`${DEF_URL.COVER_PREVIEW}/${product.entityId}`}
                        className="c-black">
                        <h2 className="f-omnesMedium fs19 mb-2 mt-1">
                            {textCrop(product.name, 20)}
                        </h2>
                    </Link>
                    <p className="fs15 c-red f-omnesMedium mb-2">
                        ${product.price}
                    </p>
                    <div className="d-flex justify-content-start align-items-center mt-2">
                        {loadingMinus ? (
                            <Spinner
                                animation="border"
                                variant="danger"
                                className="m-0"
                            />
                        ) : (
                            <i
                                className="fas fa-minus cursor-pointer trans"
                                onClick={MinusCount}
                            />
                        )}

                        <span
                            className="c-gray mx-2 text-center border"
                            style={{ width: 30 }}>
                            {productCount}
                        </span>
                        {loadingPlus ? (
                            <Spinner
                                animation="border"
                                variant="danger"
                                className="m-0"
                            />
                        ) : (
                            <i
                                className="fas fa-plus cursor-pointer trans"
                                onClick={PlusCount}
                            />
                        )}
                    </div>
                </div>
            </div>
            {buttonsProduct()}
        </li>
    );
}

export default ProductBlock;
