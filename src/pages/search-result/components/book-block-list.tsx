import React, { useState } from 'react';
import { checkPublisher, goToBuy } from 'utils/helpers';
import { Link } from 'react-router-dom';
import defaultImage from 'assets/images/default-image.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { DEF_URL } from 'utils/urls';
import CheckInCard from 'features/CheckInCard/check-in-card';
import { Spinner } from 'react-bootstrap';

interface IThisProps {
    book: IThisBook;
}

function BookBlockList({ book }: IThisProps) {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: IAuth) => state.sign.user.profile);
    const iAmCreator = checkPublisher(userInfo?.id, book.userId);

    const [buoyed, setBuoyed] = useState<boolean>(false);
    const [buyLoading, setBuyLoading] = useState<boolean>(false);

    function buyThisBook(e: any) {
        e.preventDefault();
        setBuyLoading(true);
        dispatch(
            goToBuy(
                book.userId,
                userInfo?.id,
                {
                    entityType: 'Book',
                    entityId: book.id,
                    qty: 1
                },
                () => setBuyLoading(false)
            )
        );
    }
    return (
        <div className="col-12 mt-3">
            <div className="publisher-box list text-center h-100 position-relative d-sm-flex flex-row justify-content-between align-items-center ">
                <Link to="#" className="event-btn" style={{ width: 'auto' }}>
                    BOOK
                </Link>
                <div className="publisher-info-block-list">
                    <div
                        className="publisher-avatar-list"
                        style={{
                            backgroundImage: `url(${
                                book.avatarUrl ? book.avatarUrl : defaultImage
                            })`
                        }}
                    />
                </div>
                <div>
                    <Link to={`${DEF_URL.COVER_PREVIEW}/${book.id}`}>
                        <p className="fs26 font-bold">{book?.name}</p>
                    </Link>
                </div>

                {iAmCreator ? (
                    <Link to="#" className="buy-btn">
                        <i className="fas fa-shopping-cart mr-2" />${book.price}
                    </Link>
                ) : (
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
                            productID={book.id}
                            price={book.price}
                            buyName={null}
                            buoyed={(res: boolean) => setBuoyed(res)}
                        />
                    </Link>
                )}
            </div>
        </div>
    );
}

export default BookBlockList;
