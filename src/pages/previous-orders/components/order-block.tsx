import React from 'react';
import { history, printEventNameAndDate } from 'utils/helpers';
import FanbookDefault from 'assets/images/fanbookDefault.jpg';
import { modalOpenClose, setImage } from 'redux/preveiw-image';
import { useDispatch } from 'react-redux';
import { Fade } from 'react-awesome-reveal';
import { OrderItemTypes } from 'enums/enums';
import { DEF_URL } from 'utils/urls';

interface IThisProps {
    item: IPublisherOrder;
}

function OrderBlockPublisher({ item }: IThisProps) {
    const dispatch = useDispatch();
    function viewPhoto() {
        if (item.avatarUrl) {
            dispatch(modalOpenClose(true));
            dispatch(
                setImage({
                    name: item.name,
                    url: item.avatarUrl
                })
            );
        }
    }

    function openViewProduct() {
        switch (item.entityType) {
            case OrderItemTypes.Album:
                history.push(`${DEF_URL.ALBUM}/${item.entityId}`);
                break;
            case OrderItemTypes.AlbumFile:
                viewPhoto();
                break;
            case OrderItemTypes.Book:
                history.push(`${DEF_URL.COVER_PREVIEW}/${item.entityId}`);
                break;
            case OrderItemTypes.Poster:
                history.push(`${DEF_URL.POSTER_PREVIEW}/${item.entityId}`);
                break;
            default:
                break;
        }
    }

    return (
        <div className="order-block">
            <Fade>
                <div className="row m-0 pb-order">
                    <div className="one-product border-0">
                        <div className="d-flex w-50">
                            <div
                                className="image cursor-pointer"
                                onClick={viewPhoto}
                                style={{
                                    backgroundImage: `url(${
                                        item.avatarUrl
                                            ? item.avatarUrl
                                            : FanbookDefault
                                    }`
                                }}
                            />
                            <div className="info-bloc-product">
                                <div
                                    className="title-product cursor-pointer"
                                    onClick={openViewProduct}>
                                    {item.entityType}: {item.name}{' '}
                                </div>
                                <div className="product-event-and-status">
                                    <span className="name">
                                        {item.userEvent &&
                                            printEventNameAndDate(item)}
                                    </span>
                                </div>
                                <div className="price c-red font-bold">
                                    Quantity: {item.qty}
                                </div>
                                <div className="price c-red font-bold mt-2">
                                    ${item.price}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fade>
        </div>
    );
}

export default OrderBlockPublisher;
