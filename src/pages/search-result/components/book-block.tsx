import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import defaultImage from 'assets/images/default-image.jpg';

import { goToBuy, history } from 'utils/helpers';
import { DEF_URL } from 'utils/urls';
import { useDispatch, useSelector } from 'react-redux';
import CheckInCard from 'features/CheckInCard/check-in-card';
import { Spinner } from 'react-bootstrap';

interface IThisProps {
    book: any;
    prodClass: boolean;
}

function BookBlock({ book, prodClass }: IThisProps) {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: IAuth) => state.sign.user.profile);
    function openBookBlock() {
        history.push(`${DEF_URL.COVER_PREVIEW}/${book.entity?.id}`);
    }

    const [buoyed, setBuoyed] = useState<boolean>(false);
    const [buyLoading, setBuyLoading] = useState<boolean>(false);

    function buyThisBook(e: any) {
        e.preventDefault();
        setBuyLoading(true);
        dispatch(
            goToBuy(
                book.entity.userId,
                userInfo?.id,
                {
                    entityType: 'Book',
                    entityId: book.entity.id,
                    qty: 1
                },
                () => setBuyLoading(false)
            )
        );
    }
    return (
        <div
            className={
                prodClass
                    ? 'col-sm-6 col-12 mt-3'
                    : 'col-xl-3 col-md-4 col-sm-6'
            }>
            <div className="buy-box text-center h-100 position-relative d-sm-flex flex-column justify-content-between align-items-center">
                <Link to="#" className="event-btn" style={{ width: 'auto' }}>
                    BOOK
                </Link>
                <div
                    className="buy-box_img"
                    style={{
                        backgroundImage: `url(${
                            book.entity.frontCoverURL
                                ? book.entity.frontCoverURL
                                : defaultImage
                        })`
                    }}
                />
                <div className="mt-3" onClick={openBookBlock}>
                    <h2 className="buy-box_title mb-2">{book.entity.name}</h2>
                </div>
                <Link
                    to="#"
                    className={`buy-btn ${buoyed && 'bgc-red'}`}
                    onClick={buyThisBook}>
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
                        productID={book.entity.id}
                        price={book.entity.price}
                        buyName={null}
                        buoyed={(res: boolean) => setBuoyed(res)}
                    />
                </Link>
            </div>
        </div>
    );
}

export default BookBlock;
