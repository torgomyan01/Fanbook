import React, { useState } from 'react';
import {
    checkPublisher,
    goToBuy,
    posterGetImageUrl,
    textCrop
} from 'utils/helpers';
import fanbookDefault from 'assets/images/fanbookDefault.jpg';
import { DEF_URL } from 'utils/urls';
import { useDispatch, useSelector } from 'react-redux';
import {
    modalDeletePoster,
    modalDeletePosterOpenClose,
    setAddPosterToEditPoster,
    setModalEditPosterStatusOpenClose,
    setModalEditPosterStatusPoster,
    setOpenModalEditPoster
} from 'redux/modals';
import { Dropdown, Spinner } from 'react-bootstrap';
import CheckInCard from 'features/CheckInCard/check-in-card';
import { Link } from 'react-router-dom';
import _st from 'assets/css/poster-block.module.css';

interface IThisProps {
    poster: IPoster;
}

function PosterBlock({ poster }: IThisProps) {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: IAuth) => state.sign.user.profile);
    const [buyLoading, setBuyLoading] = useState<boolean>(false);
    const isEdit = checkPublisher(userInfo?.id, poster.userId);

    const style = poster?.params?.images?.items[0]?.style
        ? poster?.params?.images?.items[0]?.style
        : '';

    const StyleArray = posterGetImageUrl(style);
    const [buoyed, setBuoyed] = useState<boolean>(false);
    const [bayBook, setBayBook] = useState(false);

    function buyProduct() {
        if (poster?.userId && userInfo?.id) {
            setBuyLoading(true);
            setBayBook(true);
            setTimeout(() => setBayBook(false), 900);
            dispatch(
                goToBuy(
                    poster?.userId,
                    userInfo?.id,
                    {
                        entityType: 'Poster',
                        entityId: poster.id,
                        qty: 1
                    },
                    () => setBuyLoading(false)
                )
            );
        }
    }

    function openModalEditPoster() {
        dispatch(setOpenModalEditPoster(true));
        dispatch(setAddPosterToEditPoster(poster));
    }

    function openEditStatus() {
        dispatch(setModalEditPosterStatusOpenClose(true));
        dispatch(setModalEditPosterStatusPoster(poster));
    }

    function openModalDeletePoster() {
        dispatch(modalDeletePoster(poster));
        dispatch(modalDeletePosterOpenClose(true));
    }

    function Block() {
        return (
            <div className={_st.posterBlock}>
                <div
                    className={_st.image}
                    style={{
                        backgroundImage: `url(${
                            StyleArray ? StyleArray : fanbookDefault
                        })`
                    }}>
                    {isEdit && (
                        <Dropdown>
                            <Dropdown.Toggle
                                variant="link"
                                className="edit-icon m-0 poster-edit-dropdown">
                                <i className="fas fa-ellipsis-v" />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item
                                    href="#"
                                    onClick={openModalEditPoster}>
                                    <i className="far fa-edit mr-2 c-red" />
                                    Edit
                                </Dropdown.Item>
                                <Dropdown.Item
                                    href="#"
                                    onClick={openModalDeletePoster}>
                                    <i className="fas fa-trash mr-2 c-red" />
                                    Delete
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    )}
                    {isEdit && <div className={_st.price}>${poster.price}</div>}
                </div>
                <Link to={`${DEF_URL.POSTER_PREVIEW}/${poster.id}`}>
                    <h4 className={_st.title}>{textCrop(poster.name, 13)}</h4>
                </Link>
                <p
                    className={_st.posterDescription}
                    style={{ height: isEdit ? 80 : 50 }}>
                    {textCrop(poster.description, isEdit ? 100 : 50)}
                </p>
                {!isEdit && (
                    <button
                        className={`${_st.buyButton} ${buoyed && 'bgc-red'}`}
                        onClick={buyProduct}>
                        {buyLoading ? (
                            <Spinner
                                animation="border"
                                variant="light"
                                className="mr-2"
                            />
                        ) : (
                            <i className="fas fa-shopping-cart mr-2" />
                        )}
                        <CheckInCard
                            productID={poster.id}
                            price={poster.price}
                            buyName={null}
                            buoyed={(res: boolean) => setBuoyed(res)}
                        />
                    </button>
                )}
                {isEdit && (
                    <div className="d-flex justify-content-end pr-2">
                        {poster.isAvailable ? (
                            <i
                                className="fas fa-lock-open c-green cursor-pointer"
                                onClick={openEditStatus}
                            />
                        ) : (
                            <i
                                className="fas fa-lock c-red cursor-pointer"
                                onClick={openEditStatus}
                            />
                        )}
                    </div>
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

export default PosterBlock;
